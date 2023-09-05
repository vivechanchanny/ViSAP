using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Excel.Visap.DataAccessLayer;
using Excel.Visap.Common.Utilities;
using Excel.Visap.Log;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using Excel.Visap.Common.ServiceUtility;
using DataAccessLayer;
using Excel.Visap.StoreConsants;
using Excel.Visap.VideoAccess;
using System.Text.RegularExpressions;
using System.ComponentModel;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Excel.Visap.MetaDataAccess
{
    public class VideoMetaData : EditableBaseEntity
    {

        #region Constructor
        private const string _collection ="MetaData";
        public VideoMetaData()
            : base(_collection)
        {
            
        }

        #endregion

        #region GetVideosByID
        /// <summary>
        /// Gets videos based on Guid
        /// </summary>
        /// <param name="Id">Unique Guid</param>
        /// <returns>list of videos</returns>
        public string GetVideosByID(string Id)
        {

            string value = "[]";
            try
            {
                MongoDBconnection objcon = new MongoDBconnection(_collection);
                var col = objcon.GetMongoCollection();              
               // VisapLogger.LogDebug("VideoMetaData:GetVideosBySrc:Getting videos by the source");
                var query = Query.EQ("_id", Id);
                MongoCursor<BsonDocument> videosList = col.FindAs<BsonDocument>(query);
                if (videosList != null)
                    value = Utility.GetAllDocuments(videosList);
            }
            catch (VisapException ex)
            {
                VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.GetVideosByID ~ VideoId : "+ Id +" ~ "+ex.Message);
                throw new VisapException("VideoMetaData:GetVideosBySrc:Error Ocurred while getting data.Please Contact Admin");
            }
            return value;
        }

        #endregion

        #region GetVideoMataDataByUser
        /// <summary>
        /// Gets the Metadata of the videos for user
        /// </summary>
        /// <param name="userid">userid</param>
        /// <returns>list of videos</returns>
        public string GetVideoMataDataByUser(string userid)
        {
            string value = "[]";
            try
            {
            	VisapLogger.LogDebug("MetaData:GetVideoMataDataByUser:Get MetaData for the user:"+userid);
                IMongoQuery query = GetUsernameQuery(userid);
                MongoCursor<BsonDocument> result = GetAllDocumentsSortedbyDate(query);
             if (result != null && result.Count() > 0)
             {
                 value = Utility.GetAllDocuments(result);
             }
            }
            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.GetVideoMataDataByUser ~ userid : "+ userid +" ~ "+ex.Message);
                throw new VisapException("VideoMetaData:GetVideoByUser:Get MetaData from the user");
            }
            return value;

        }
         #endregion

        #region FormatToSave
        /// <summary>
        /// Formatting the data for metadata excluding tittle,desc and t 
        /// </summary>        
        /// <param name="currentbsonDocument">Bsondocument</param>
        protected override void FormatToSave(ref BsonDocument currentbsonDocument)
        {            
            currentbsonDocument.Remove("title");
            currentbsonDocument.Remove("desc");
            currentbsonDocument.Remove("snap");
            currentbsonDocument.Remove("src");
        }

        #endregion

        #region CheckMetaDataExitsDelete
        /// <summary>
        ///checkmetadata exits if so it has to be deleted
        /// </summary>
        /// <param name="ID">Unique Guid</param>
        /// <returns>returns bool indicating metadata exists or not</returns>
        public bool CheckMetaDataExitsDelete(string ID)
        {
        	VisapLogger.LogDebug("MetaData:CheckMetaDataExitsDelete:Delete the MetaData for the user:"+ID);
            bool isexits = false;
            var query = GetDeleteQuery(ID);
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            var collection = objcon.GetMongoCollection();
            var isVideofound = collection.FindOneAs<BsonDocument>(query);
            if (isVideofound != null)
                isexits = true;

            return isexits;
        }
        #endregion

        #region DeleteVideo
        /// <summary>
        /// Deleting the Video based on ID
        /// </summary>
        /// <param name="ID">unique GUID</param>
        public void DeleteVideo(string ID)
        {
        	try
        	{
	           IMongoQuery query= GetDeleteQuery(ID);
	           base.Delete(query);
        	}
        	catch(VisapException ex)
        	{
        		VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.DeleteVideo ~ videoId : "+ ID +" ~ "+ex.Message);
                throw new VisapException("DataAccess.Metadata.DeleteVideo");
        	}
        }
        #endregion

        #region CheckTagExistsReturnHeader
        /// <summary>
        /// For the searched key matches with the tag desc from metadata then         
        /// </summary>
        /// <param name="userid">logged in userid</param>
        /// <param name="sKey">searchkey enterd by user</param>
        /// <param name="videosListTitle">title video list, if already tagged videos present then no need to add again</param>
        /// <returns>if tag matches return its viceodata</returns>
        public  string CheckTagExistsReturnVideo(string userid, string sKey, MongoCursor<BsonDocument> videosListTitle)
        {
            MongoDBconnection objCon = new MongoDBconnection(_collection);
            StringBuilder returnResult = new StringBuilder();
            BsonRegularExpression searchkeyquery = null;
            try
            {
                var col = objCon.GetMongoCollection();
                Regex RgxUrl = new Regex("[^a-zA-Z0-9]");
                var blnContainsSpecialCharacters = RgxUrl.IsMatch(sKey);
                if (blnContainsSpecialCharacters)
                {
                    searchkeyquery = new BsonRegularExpression("^" + (string)sKey + "$", "i");
                }
                else
                {
                    searchkeyquery = new BsonRegularExpression(new Regex(sKey, RegexOptions.IgnoreCase));
                }               
                var tagquery = Query.And(Query.EQ("userid", userid), Query.ElemMatch("tags", (Query.EQ("d", searchkeyquery))));
                MongoCursor<BsonDocument> videosList = Searchbyquery(col, tagquery);
                //same name tags can be there we need to show all videos
                if (videosList != null && videosList.Count() > 0)
                {
                	bool isRepeat = false;
                    long count = videosList.Count();
                    returnResult.Append("[");
                    foreach (var item in videosList)
                    {
                    	if(videosListTitle != null && videosListTitle.Count() > 0)
                    	{
	                    	//check entries of Tags  already exists in video list
	                    	//If Exists, do not get Video source details and generate string
							var videosListTitle2 = videosListTitle;
	                    	foreach (var titleelement in videosListTitle2) 
	                        {                    		
	                    		var titleId = titleelement.GetElement("_id").Value.ToString();
	                    		var tagId = item.GetElement("_id").Value.ToString();
	                    		if((titleId == tagId))
	                    		{
	                    			isRepeat = true;//tag video details already in title video list 
	                    			break;		                        
		                        }
	                        }
                    	}
                    	if(!(isRepeat))//if tag video details not in title video list, then add the entries 
                    	{
                    		BsonElement srcele = item.GetElement("_id");
	                        var srcelement = srcele.Value;//	                        
	                        Video objVideo = new Video();
	                        //for menu creation need the videodetails of metadata                     
	                        BsonDocument bsondoc = objVideo.GetVideoBySourceforSearch(userid, srcelement, sKey);
	                        if (bsondoc != null)
	                        {
	                            foreach (BsonElement ele in bsondoc)
	                            {
	                                //Guid needs to sent as string comfortable for client
	                                if (ele.Name == "_id")
	                                {
	                                    var typeCon = TypeDescriptor.GetConverter(ele.Value).ConvertTo(ele.Value, typeof(string));
	                                    break;
	                                }
	                            }	                        
		                        //date not required to client
		                        bsondoc.Remove("date");
		                        returnResult.Append(bsondoc);        
		                        //if (count > 1)                           
		                        returnResult.Append(",");
	                        }
                    	}
                    }
                    if (returnResult.Length > 1)
                        returnResult.Remove(returnResult.Length - 1, 1);
                    returnResult.Append("]");
                }else
                {
                	//added for the case where no tag no tittle esists earlier i was resolved in handler
                	returnResult.Append("[]");
                }
            }
            catch(VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.CheckTagExistsReturnVideo ~ userid : +"+userid+" ~ skey : "+sKey +" ~ "+ex.Message);
                throw new VisapException(ex.Message);
            }
            VisapLogger.LogDebug("MetaData:serach result for the serach key" +sKey+"result is:"+returnResult.ToString());
            return returnResult.ToString();
        }
        #endregion      


        #region PubishMetadata
        /// <summary>        
        /// Edited data needs to be published/saved in database     
        /// </summary>
        /// <param name="doc">List of videos to be published</param>
        /// <param name="userid">userid for whom its published</param>
        /// <param name="generatedID">Unique GUID</param>
        /// <returns></returns>
        public void PubishvideoMetadata(string doc, string userid, BsonValue generatedID)
        {
            BsonValue uidtoMetaData = generatedID;
            MongoDBconnection objCon = new MongoDBconnection(_collection);
            IMongoQuery query = null;
            try
            {               
                BsonArray docList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(doc);
                MongoCollection col = objCon.GetMongoCollection();              
                foreach (BsonDocument ptr in docList)
                {
                   ptr.ToBsonDocument().Remove("refID");
                   ptr.ToBsonDocument().Remove("_id");
                   VisapLogger.LogDebug("PubishMetadata:PubishMetadata data for the collection" + _collection);
                   BsonValue bsonName = userid;
                   BsonElement elem = new BsonElement("userid", bsonName);
                   ptr.ToBsonDocument().SetElement(elem);
                   BsonElement dateelem = new BsonElement("date", DateTime.Now);
                   ptr.ToBsonDocument().SetElement(dateelem);                   
                   var currentVideo = ptr.ToBsonDocument();
                   FormatToSave(ref currentVideo);
                   ptr.ToBsonDocument().SetElement(elem);                 
                   query = Query.EQ("_id", uidtoMetaData);
                   //IF the record exists updates else inserts
                   IMongoUpdate updateDoc = new UpdateDocument("$set", ptr);
                   col.Update(query, updateDoc, UpdateFlags.Upsert);
                   VisapLogger.LogDebug("MetaData:PubishvideoMetadata:Publishing metadata for the id:"+uidtoMetaData);
                }

                
            }
            catch (MongoDuplicateKeyException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            catch (MongoException ex)
            {

                ErrorLogger.Instance().Error(ex);
                throw new VisapException(ex.Message);
            }
            catch(VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.PubishvideoMetadata ~ userid : +"+userid+" ~ Id : "+generatedID +" ~ "+ex.Message);
                throw new VisapException(ex.Message);
            }
            catch(Exception ex)
            {
            	System.Diagnostics.Debug.WriteLine(ex.Message);
            }
            	
            finally
            {

            }

           
        }
        #endregion
        
        #region UpdateLegacyCollection
        /// <summary>        
        /// delete all aelib reference questions in metadata as well as in aelib collection     
        /// </summary>
        /// <param name="doc">List of videos to be published</param>
        /// <param name="userid">userid for whom its published</param>
        /// <param name="generatedID">Unique GUID</param>
        /// <returns></returns>
        public void UpdateLegacyCollection(string document)
        {
            
            try
            {   
            	
            	  var toUpdatearray = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(document);
            	  BsonDocument toUpdate = (BsonDocument)toUpdatearray[0];
            	  var id = toUpdate.GetElement("_id").Value.ToString();
        	      string  expectedVideo =   GetVideosByID(id);
        	      BsonArray actionList=null;
        	      
        	      List<string> questionlist = new List<string>();
        	        var expected = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(expectedVideo);
        	        if(expected.Count >0){
           	        BsonDocument inDB = (BsonDocument)expected[0];
        	        
        	        
        	        if (inDB.Contains("actions")){
           	             
           	        	BsonArray actionsInDB = (BsonArray)inDB.GetElement("actions").Value;
        	             BsonArray actionsToUpdate = (BsonArray)toUpdate.GetElement("actions").Value;
		        	       if (actionsInDB.Count() != actionsToUpdate.Count())
		        	        {
		        	        	List<BsonValue> actionsToRemove = actionsInDB.Except(actionsToUpdate).ToList();
		        	        	
		        	        	foreach (var action in actionsToRemove) {
		        	        		
		        	        		 actionList = (BsonArray)action.ToBsonDocument().GetElement("listAction").Value;
		        	        	 
		        	        		 foreach (var subaction in actionList) {
		        	        		 	BsonDocument insideActionlist = (BsonDocument)subaction;
		        	        		 	var  actiontype = insideActionlist.GetElement("type").Value;
		        	        		 
		        	        		 	
		        	        		 	
		        	        		 	if(actiontype=="questions")
		        	        		 	{
		        	        		 		var sourcetype = insideActionlist.GetElement("sourcetype").Value;
		        	        		 		if(sourcetype=="aelib"){
		        	        		 			
		        	        		 		var data = insideActionlist.GetElement("data").Value;
		        	        		 		var questionID=data.ToBsonDocument().GetElement("questionId").Value.ToString();
		        	        		 		
//		        	        		 		MongoDBconnection aelibconn = new MongoDBconnection("AelibQuestion");
//		        	        		 		var col = aelibconn.GetMongoCollection();
//      	        	        		 		var query = Query.EQ("_id", questionID);
//                 	        		 		WriteConcernResult writeResult =col.Remove(query);

                                             questionlist.Add(questionID);
		        	        		 		
		        	        		 		
		        	        		 		}
		        	        		 		
		        	        		 		
		        	        		 	}
		        	        		 	
		        	        		 }
		        	        	}
		        	        	
		        	        	DeletefromService(questionlist);
		        	        	
		        	        	
		        	        }
        	        	
        	        
        	        }
        	        

     	      	  }
            }
            catch (MongoDuplicateKeyException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            catch (MongoException ex)
            {

                ErrorLogger.Instance().Error(ex);
                throw new VisapException(ex.Message);
            }
            
            	
          

           
        }
        #endregion
        
        
        public void DeletefromService(List<string> questList){
        	
        	HttpClient client = new HttpClient();
        	client.BaseAddress = new Uri("http://localhost/");
        	foreach (string id in questList)
        	{
        		var url = "quiz/question/" + id;
        		HttpResponseMessage response = client.DeleteAsync(url).Result;
        		
        	}
        	
        }
      

    }
}
