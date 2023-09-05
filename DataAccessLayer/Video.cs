
#region Refrerances
using System;
using System.Text.RegularExpressions;
using DataAccessLayer;
using Excel.Visap.Common.ServiceUtility;
using Excel.Visap.Common.Utilities;
using Excel.Visap.DataAccessLayer;
using Excel.Visap.Log;
using Excel.Visap.MetaDataAccess;
using Excel.Visap.StoreConsants;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;


using MongoDB.Driver.Linq;
 
#endregion

namespace Excel.Visap.VideoAccess
{
    public class Video : EditableBaseEntity
    {
        #region Constructor
        private const string _collection ="Video";
        public Video()
            : base(_collection)
        {
             
        }
        #endregion

        #region FormatToSave
       
        /// <summary>
        /// Formatting the document to exclude actions,tags,links and Paused time attributes of metadata.
        /// </summary>       
        /// <param name="currentbsonDocument">bsondocument</param>
        protected override void FormatToSave(ref BsonDocument currentbsonDocument)
        {
            currentbsonDocument.Remove("actions");
            currentbsonDocument.Remove("tags");
            currentbsonDocument.Remove("links");
            currentbsonDocument.Remove("pausedtime");
        }
         #endregion

        #region GetVideosByUser

        /// <summary>
        ///Gets the list of videos sorted by date for a passed userid   
        /// </summary>
        /// <param name="userid">logged in username</param>
        /// <returns>returns list of videos</returns>
        public string GetVideosByUser(string userid)
        {

            string value = "[]";
            try
            {
                VisapLogger.LogDebug("Video:GetVideosByUser:Get the videos for the logged in user:" + userid);
                IMongoQuery query = GetUsernameQuery(userid);
                var videoList = GetAllDocumentsSortedbyDate(query);
                if (videoList.Count() > 0)
                    value = Utility.GetAllDocuments(videoList);
            }
            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetVideosByUser ~ username : +"+userid+ " ~ "+ ex.Message);
                throw new VisapException("GetVideosByUser:Error please contact admin");
            }
            return value;

        }
        #endregion 

        #region DeleteVideo
        /// <summary>
        /// Deletes the video for the provided Video GUID
        /// </summary>
        /// <param name="Id">Id to be deleted</param>
        public void DeleteVideo(string Id)
        {
            try
            {
                VisapLogger.LogInfo("Delete  Video for the Id:"+Id);
                //CheckandDeleteSnapshot(Id);             
                IMongoQuery query = GetDeleteQuery(Id);
                Delete(query);
                VisapLogger.LogDebug("Deleted Video from database successfully  for the id" + Id);
            }

            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Video.DeleteVideo ~ videoId : +"+Id+ " ~ "+ ex.Message);
                throw new VisapException("Error while deleting record based on");
            }
        }
        
        
        private void CheckandDeleteSnapshot(string Id)
        {
            try
            {
            	VisapLogger.LogDebug("CheckandDeleteSnapshot: if snapshot is more than one for the snapshot");            	
            	DeletSanpshot(Id);                 
               
            }

            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Video.CheckandDeleteSnapshot ~ videoId : +"+Id+ " ~ "+ ex.Message);
                throw new VisapException("Error while deleting record based on");
            }
        }
        
        
         #endregion      
       
        #region GetVideoBySourceforSearch
        /// </summary>
        /// <param name="userid">userid for which video is searched</param>
        /// <param name="src">source of the video</param>
        /// <param name="sKey">searchkey</param>
        /// <returns>cursor or raw list</returns>
        public BsonDocument GetVideoBySourceforSearch(string userid, BsonValue id, string sKey)
        {
             BsonDocument list = null;
            try
            {
               
                MongoDBconnection objCon = new MongoDBconnection(_collection);
                var videocollection = objCon.GetMongoCollection();
                BsonRegularExpression searchQuery = new BsonRegularExpression(new Regex(sKey, RegexOptions.IgnoreCase));
                var query = Query.And(Query.EQ("userid", userid), Query.EQ("_id", id));
                list = SearchOneDocument(videocollection, query);
            }
            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetVideoBySourceforSearch ~ userid : +"+userid+" ~ skey : "+sKey +" ~ videoid : "+ id+" ~ "+ ex.Message);
                throw new VisapException("Error in application please contact admin");
            }
            return list;
        }
         #endregion 

        #region GetSourceByTittle

        /// <summary>
        /// Get the videolist based on tittle where title name is searchkey
        /// </summary>
        /// <param name="searchKey">searchkey to check if it is tittle</param>
        /// <param name="userid">userid</param>
        /// <returns>cursor or raw list</returns>
        public MongoCursor<BsonDocument> GetSourceByTittle(string searchKey, string userid)
        {MongoCursor<BsonDocument> videosList = null;
            BsonRegularExpression searchkeyquery = null;
            try
            {
                VisapLogger.LogDebug("GetSourceByTittle:Getting the header data for the searchkey:" + searchKey);
                MongoDBconnection objCon = new MongoDBconnection(_collection);
                var collection = objCon.GetMongoCollection();
                Regex RgxUrl = new Regex("[^a-zA-Z0-9]");
                var blnContainsSpecialCharacters = RgxUrl.IsMatch(searchKey);
                if (blnContainsSpecialCharacters)
                {
                    searchkeyquery = new BsonRegularExpression("^" + (string)searchKey + "$", "i");
                }
                else
                {
                    searchkeyquery = new BsonRegularExpression(new Regex(searchKey, RegexOptions.IgnoreCase));
                }              
                var tittlequery = Query.And(Query.EQ("userid", userid), Query.Matches("title", searchkeyquery));
                videosList = Searchbyquery(collection, tittlequery);
            }
            catch (VisapException ex)
            {
                VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetSourceByTittle ~ userid : +"+userid+" ~ searchKey : "+searchKey +" ~ "+ ex.Message);
                throw new VisapException("Error in application please contact admin");
            }
            return videosList;
        }


        #endregion

        #region Category Search

        /// <summary>
        /// Get the videolist based Category name 
        /// Category name is entered by user
        /// </summary>
        /// <param name="searchKey">Category name</param>
        /// <param name="userid">userid</param>
        /// <returns>cursor or raw list</returns>
        public MongoCursor<BsonDocument> CategorySearch(string searchKey, string userid)
        {
            MongoCursor<BsonDocument> videosList = null;
            BsonRegularExpression searchkeyquery = null;
            IMongoQuery tittlequery = null;
            searchKey=searchKey.ToLower();
            try
            {
                VisapLogger.LogDebug("CategorySearch:Getting the Category data for the searchkey" + searchKey);
                MongoDBconnection objCon = new MongoDBconnection(_collection);
                var collection = objCon.GetMongoCollection();              
                Regex RgxUrl = new Regex("[^a-zA-Z0-9]");
                var blnContainsSpecialCharacters = RgxUrl.IsMatch(searchKey);

                if (blnContainsSpecialCharacters)
                {
                    if (searchKey == "*" || searchKey == "@" || searchKey == "'" || searchKey == "/" || searchKey == "+" || searchKey == "(" || searchKey == ")" || searchKey == "!")
                        searchkeyquery = new BsonRegularExpression("^" + (string)searchKey);
                    else
                    {
                        
                        var arr = System.Web.HttpUtility.UrlEncode(searchKey);
                        tittlequery = Query.And(Query.EQ("userid", userid), Query.Matches("category", ".*" + arr.ToUpper() + ".*")); 
                    }
                 
                }
                else
                {
                 
                    searchkeyquery = new BsonRegularExpression(new Regex(searchKey, RegexOptions.IgnoreCase));
                    tittlequery = Query.And(Query.EQ("userid", userid), Query.EQ("category", searchkeyquery));
                }
                videosList = Searchbyquery(collection, tittlequery);
            }
            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.CategorySearch ~ uname : +"+userid+" ~ searchKey : "+searchKey +" ~ "+ex.Message);
                throw new VisapException("Error in application please contact admin");
            }
            return videosList;
        }

        /// <summary>
        /// Get the videolist based Category name 
        /// Category name is entered by user
        /// </summary>
        /// <param name="searchKey">Category name</param>
        /// <param name="uname">username</param>
        /// <returns>cursor or raw list</returns>
        public MongoCursor<BsonDocument> GetListofCategoriesbyUser(string userid)
        {
            MongoCursor<BsonDocument> videosList = null;
            try
            {
                VisapLogger.LogDebug("Videos:GetListofCategoriesbyUser:Getting the Category data for the userid:" + userid);
                MongoDBconnection objCon = new MongoDBconnection(_collection);
                var collection = objCon.GetMongoCollection();   
                //timeline videos are excluded as category will not be created when created a timeline
                BsonValue sourcetype =Constants.TIMELINESOURCETYPE;
                var query =Query.And( Query.EQ("userid", userid),Query.NE("sourcetype",2));
                videosList = Searchbyquery(collection, query);                
            }
            catch (VisapException ex)
            {
                VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.GetListofCategoriesbyUser ~ userid : +"+userid +" ~ "+ex.Message);
                throw new VisapException("Error in application please contact admin");
            }
            return videosList;
        }


        /// <summary>
        /// Get the videolist based on videoid
        /// </summary>
        /// <param name="videoID">unique id of the video</param>     
        /// <returns>cursor or raw list</returns>
        public MongoCursor<BsonDocument> GetCategoryListbyVideoID(string videoID)
        {
            MongoCursor<BsonDocument> videosList = null;
            try
            {
            	VisapLogger.LogDebug("Videos:GetCategoryListbyVideoID:Getting the Category data for the video" + videoID);
                MongoDBconnection objCon = new MongoDBconnection(_collection);
                var collection = objCon.GetMongoCollection();
                var query = Query.EQ("_id", videoID);
                videosList = Searchbyquery(collection, query);
               
            }
            catch (VisapException ex)
            {
                VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.GetCategoryListbyVideoID ~ videoID ~" + videoID + " ~ "+ ex.Message);
                throw new VisapException("Error in application please contact admin");
            }
            return videosList;
        }       
        #endregion

        #region PubishSave

        /// <summary>
        ///  Publish the video and videometadata details
        /// <param name="doc">videos to be published</param>
        /// <param name="userid">userid getting published for</param>
        public void PubishVideo(string doc, string userid)
        {
            try
            {
              
                BsonValue returnID = PubishVideoHeaderDetails(doc, userid);
                VideoMetaData objMetadata = new VideoMetaData();
                objMetadata.PubishvideoMetadata(doc, userid, returnID);
            }
            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Video.Publishvideo ~ userid : +"+userid+" ~ "+ex.Message);
                throw new VisapException("Error while publishing");
            }

        }


        #endregion

        #region PubishVideoData


        /// <summary>
        /// PubishHeaderDetails publishes header details based on ID       
        /// </summary>
        /// <param name="doc">videolist to be published</param>
        /// <param name="userid">userid for video to be published</param>
        /// <returns>Guid</returns>
        private BsonValue PubishVideoHeaderDetails(string doc, string userid)
        {
            BsonValue bsoniD = string.Empty;
            MongoDBconnection objCon = new MongoDBconnection(_collection);
            try
            {
                BsonValue id = null;
                BsonValue refId = null;
                IMongoQuery query = null;
                var docList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(doc);
                MongoCollection col = objCon.GetMongoCollection();              
                foreach (var ptr in docList)
                {
                    //check for refid its avaiable only for Published videos
                    if (!ptr.ToBsonDocument().Contains("refId"))
                    {
                    	
                        //first time publish hence creating the new refreneceid
                        refId = ptr.ToBsonDocument().GetElement("_id").Value;
                        BsonElement refelem = new BsonElement("refId", refId);
                        ptr.ToBsonDocument().SetElement(refelem);
                        //create new id
                        Guid originalGuid = Guid.NewGuid();
                        string uid = originalGuid.ToString("N");
                        id = uid;
                        bsoniD = id;
                        query = Query.And(Query.EQ("_id", id), Query.EQ("refId", refId));
                        VisapLogger.LogDebug("Video:PubishVideoHeaderDetails:Publishing for the first time hence refid and id:"+refId+","+uid);

                    }
                    else
                    {
                        //while republishing just save with the id sent as its latest generated
                        id =  ptr.ToBsonDocument().GetElement("_id").Value;
                        bsoniD = id;
                        query = Query.EQ("_id", id);
                        VisapLogger.LogDebug("Video:PubishVideoHeaderDetails:Republishing for the  id:"+id);

                    }
                     ptr.ToBsonDocument().Remove("_id");
                    VisapLogger.LogDebug("Save:Saving data for the collection" + _collection);
                    BsonValue bsonName = userid;
                    BsonElement elem = new BsonElement("userid", bsonName);
                     ptr.ToBsonDocument().SetElement(elem);
                    BsonElement dateelem = new BsonElement("date", DateTime.Now);
                     ptr.ToBsonDocument().SetElement(dateelem);
                    var currentVideo =  ptr.ToBsonDocument();
                    FormatToSave(ref currentVideo);
                     ptr.ToBsonDocument().SetElement(elem);
                    IMongoUpdate updateDoc = new UpdateDocument("$set", ptr);
                    col.Update(query, updateDoc, UpdateFlags.Upsert);
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
            	VisapLogger.LogErrorMessage("Error in DataAccess.Video.PubishVideoHeaderDetails ~ userid : +"+userid+" ~ "+ex.Message);
                throw new VisapException("Error while publishing");
            }
            finally
            {

            }

            return bsoniD;
        }

        #endregion

    }
}
