using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Log;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using Excel.Workspace.Common.ServiceUtility;
using DataAccessLayer;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.VideoAccess;
using System.Text.RegularExpressions;
using System.ComponentModel;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Excel.Workspace.Users;
using ViSapDAL;

namespace Excel.Workspace.MetaDataAccess
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
                VisapLogger.LogDebug("VideoMetaData:GetVideosBySrc:Getting video for the id..."+Id);
                var query = Query.EQ("_id", Id);
                MongoCursor<BsonDocument> videosList = col.FindAs<BsonDocument>(query);
                if (videosList != null)
                    value = GetAllDocuments(videosList);
            }
            catch (Exception ex)
            {
                VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.GetVideosByID ~ VideoId : "+ Id +" ~ "+ex.Message);
                throw new VisapException("VideoMetaData:GetVideosBySrc:Error Ocurred while getting data.Please Contact Admin");
            }
            return value;
        }

        #endregion
        
        public static  string GetAllDocuments(IEnumerable<BsonDocument> cursor)
        {
            Users.Users objuser=new  Users.Users();
            BsonArray MetaDataList=new BsonArray();
            try
            {
            	List<BsonDocument> list = new List<BsonDocument>(cursor);
                if (list.Count > 0)
                {                  
                  foreach (var item in list)
                  {
                        //date not required to client side,only modified date required in client.
                      if(item.ToBsonDocument().Contains(ViSAP.fields.VideoCollection.Date) ||item.ToBsonDocument().Contains(ViSAP.fields.VideoCollection.ModifiedDate))
                      {
        				item.Remove(ViSAP.fields.VideoCollection.Date);
        				BsonValue modifiedDate = item.GetElement(ViSAP.fields.VideoCollection.ModifiedDate).Value.ToLocalTime().ToString();
        				item.Set("modifieddate",modifiedDate);
		               //Adding owner name to the videoList.
		                 objuser.GetOwnerName(item);
        		      }
                       if (item.Contains("actions")){
                        foreach(var newitem in item.GetElement("actions").Value.AsBsonArray) {
                      	foreach(var listAction in newitem.ToBsonDocument().GetElement("listAction").Value.AsBsonArray){
                           		
                           if(listAction.ToBsonDocument().Contains("userid")){
                      		 BsonValue username=objuser.GetUserName(listAction.ToBsonDocument().GetElement("userid").Value.ToString());
                      		 BsonElement elem = new BsonElement("userName", username);
                      		 listAction.ToBsonDocument().SetElement(elem);
                           }
                      	}
                      }
                      
                      }
                  }
                }
                MetaDataList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(list.ToJson());
            }
           catch (MongoConnectionException ex)
           {
               VisapLogger.LogError(ex);
               throw new VisapException("Error in connection to db");
           }
           catch (Exception ex)
           {
               VisapLogger.LogError(ex);
               throw new VisapException("No records Found");
           }
            return MetaDataList.ToString();
        }
        
        
        

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
             	value = result.ToJson();
             }
            }
            catch (Exception ex)
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
        
        //This fn will return all question id's from the document.
		public List<string> GetQuestionIds(string id)
		{
			var questionIds = new List<string>();
			try {
				var objcon = new MongoDBconnection(_collection);
				var collection = objcon.GetMongoCollection();
				var query = GetDeleteQuery(id);
				var metaData = collection.FindAs<MetaDataEntity>(query).ToList();
            
				var questData = from action in metaData.Where(a => a.actions != null)
				                from list in action.actions
				                from actiondata in list.listAction.Where(q => q.data.questionId != null)
				                select actiondata.data.questionId;
				 
				questionIds = questData.ToList();
			
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in getting quesrtion id's Metadata.getQuestionIds: " + ex.Message);
				throw new VisapException("VideoMetaData:GetQuestionIds:Error Ocurred while getting question id's");
			}
			return questionIds;
		}

        #region deleteMetaData
        /// <summary>
        /// Deleting the Video based on ID
        /// </summary>
        /// <param name="ID">unique GUID</param>
        public void DeleteMetaData(string ID)
        {
        	try
        	{
	           IMongoQuery query= GetDeleteQuery(ID);
	           VisapLogger.LogDebug("MetaData:DeleteMetaData:Delete the video..:"+ID);
	           base.Delete(query);
        	}
        	catch(Exception ex)
        	{
        		VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.DeleteMetaData ~ videoId : "+ ID +" ~ "+ex.Message);
                throw new VisapException("DataAccess.Metadata.DeleteMetaData");
        	}
        }
        #endregion

        //This fn will get filename uploaded by ck-editor.
		public List<string> GetSourceFileNames(string id)
		{
			var fileNames = new List<string>();
			try {
				var objcon = new MongoDBconnection(_collection);
				var collection = objcon.GetMongoCollection();
				var query = Query.EQ("_id", id);
				var metaData = collection.FindAs<MetaDataEntity>(query).ToList();
				
				//Get description from metadata document.
				var description = from action in metaData.Where(a =>a.actions != null)
				                 from list in action.actions
				                 from actiondata in list.listAction
				                 select actiondata.data.description;
				
				foreach (var desc in description.ToList()) {
					if (!string.IsNullOrEmpty(desc)) {
						//Decode description and get image file name.
						var img = GetFileNameFromImageTag(System.Net.WebUtility.HtmlDecode(desc));
						fileNames.AddRange(img);
					}
				}
 
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("VideoMetaData.GetSourceFileName:Error in getting filename." + ex.Message);
			}
			return fileNames;
		}
		
		//Get filename from html image tag.
		private List<string> GetFileNameFromImageTag(string htmlSource)
		{
			var filename = new List<string>();
			try {
				const string regx = @"<img[^>]*?src\s*=\s*[""']?([^'"" >]+?)[ '""][^>]*?>";
				MatchCollection matches = Regex.Matches(htmlSource, regx, RegexOptions.IgnoreCase | RegexOptions.Singleline);
				
				foreach (Match m in matches) {
					string href = m.Groups[1].Value;
					//Get filename from url
					var uri = new Uri(href);
					filename.Add(System.IO.Path.GetFileName(uri.LocalPath));
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("VideoMetaData.GetFileNameFromImageTag:Error in getting image filename." + ex.Message);	
			}
			return filename;
		}
        
        #region CheckTagExistsReturnHeader
        /// <summary>
        /// For the searched key matches with the tag desc from metadata then         
        /// </summary>
        /// <param name="userid">logged in userid</param>
        /// <param name="sKey">searchkey enterd by user</param>
        /// <param name="videosListTitle">title video list, if already tagged videos present then no need to add again</param>
        /// <returns>if tag matches return its viceodata</returns>
        public  string CheckTagExistsReturnVideo(string sKey, string mode, List<BsonDocument> videosListTitle, List<string> vlist)
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
			        var andList = new List<IMongoQuery>();
     	        	if(vlist.Count !=0){
     	        		foreach (var vid in vlist){
						andList.Add(Query.EQ("_id",vid));
					}
     	        	}
                  var tagquery  = Query.And(Query.Or(andList), Query.EQ("isstage", Convert.ToBoolean(mode)),Query.ElemMatch("tags", (Query.EQ("d", searchkeyquery))));
				 
                MongoCursor<BsonDocument> videosList = Searchbyquery(col, tagquery);
                //same name tags can be there we need to show all videos
                if (videosList != null && videosList.Count() > 0)
                {
                	bool isRepeat = false;
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
	                        var srcelement = srcele.Value;	                        
	                        Video objVideo = new Video();
	                        //for menu creation need the videodetails of metadata                     
	                        BsonDocument bsondoc = objVideo.GetVideoBySourceforSearch(srcelement, sKey);
	                        if (bsondoc != null)
	                        {
		                        //date not required to client
		                         bsondoc.Remove("date");
		                         Users.Users objuser=new  Users.Users();
		                         //Adding owner name to the video.
		                         objuser.GetOwnerName(bsondoc);
		                        //removing ISOdate and converting into local time.
		                        BsonValue modifiedDate = bsondoc.GetElement(ViSAP.fields.VideoCollection.ModifiedDate).Value.ToLocalTime().ToString();
		                        bsondoc.Set("modefieddate",modifiedDate);
		                        returnResult.Append(bsondoc);        
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
            catch(Exception ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.CheckTagExistsReturnVideo ~ skey : "+sKey +" ~ "+ex.Message);
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
                   BsonElement modifiedEle = new BsonElement(ViSAP.fields.VideoCollection.ModifiedDate, DateTime.Now);
                   ptr.ToBsonDocument().SetElement(modifiedEle);                    
                   var currentVideo = ptr.ToBsonDocument();
                   FormatToSave(ref currentVideo);
                   ptr.ToBsonDocument().SetElement(elem);                 
                   query = Query.EQ("_id", uidtoMetaData);
                  	ptr.Set("isstage",false);
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
            	VisapLogger.LogError(ex);
            	System.Diagnostics.Debug.WriteLine(ex.Message);
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
