
#region Refrerances
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.IO;

using DataAccessLayer;
using Excel.Workspace.Common.ServiceUtility;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.Log;
using Excel.Workspace.MetaDataAccess;
using Excel.Workspace.SearchAccess;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.Users;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Options;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using Newtonsoft.Json;

#endregion

namespace Excel.Workspace.VideoAccess
{
	public class Video : EditableBaseEntity
	{
		#region Constructor
		private const string _collection = "Video";
		public Video()
			: base(_collection)
		{
        	
		}
		#endregion
        
		#region Properties
		public string _id{ get; set; }
    	
		public string refId{ get; set; }
		
		public string title{ get; set; }
    	
		public string snap{ get; set; }
    	
		public Object videototalduration{ get; set; }
    	
		public string desc{ get; set; }
    	
		public string[] category{ get; set; }
 		
		[BsonSerializer(typeof(ViSapDAL.VideoSrcSerializer))]
		public Object src{ get; set; }
    	
		public Int32 sourcetype{ get; set; }
    	
		public string caption{ get; set; }
    	
		public Boolean isstage{ get; set; }
    	
		public string userid{ get; set; }
    	
		public DateTime date{ get; set; }
    	
		public DateTime modifieddate{ get; set; }
    	
		public string yt{ get; set; }
    	
		public string ownername{ get; set; }
    	
		public int width{ get; set; }
		public int height{ get; set; }
		public string captionId{ get; set; }
    	
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
		///Gets the list of videos sorted by date for a passed videos list    
		/// </summary>
		/// <param name="userid">logged in username</param>
		/// <returns>returns list of videos</returns>
		public string GetVideosByUser(string userid, string isstage, List<string> videoslist,string ismyspacevideo)
		{
			string value = "[]";
			try {
				VisapLogger.LogDebug("Video:GetVideosByUser:Get the assignedvideos for the  user:" + userid);
				IMongoQuery query = null;
				var andList = new List<IMongoQuery>();
 
				if (videoslist.Count != 0) {
					foreach (var vid in videoslist) {
						if(ismyspacevideo != "")
						andList.Add(Query.And(Query.EQ("_id", vid),Query.EQ("userid",userid)));
						else
						andList.Add(Query.EQ("_id", vid));
						
					}
					query = Query.And(Query.Or(andList), Query.EQ("isstage", Convert.ToBoolean(isstage)));
                    
					var videoList = GetAllDocumentsSortedbyDate(query);
                      
					if (videoList.Count() > 0)
						value = GetAllDocuments(videoList);
     	        	 
				}
				return value;
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetVideosByUser ~ username : +" + userid + " ~ " + ex.Message);
				throw new VisapException("GetVideosByUser:Error please contact admin");
			}
		}
     
		#endregion

		#region DeleteVideo
		/// <summary>      
		/// Deletes the video for the provided Video GUID
		/// </summary>
		/// <param name="Id">Id to be deleted</param>
		public void DeleteVideo(string Id)
		{
			try { 
				IMongoQuery query = GetDeleteQuery(Id);
				Delete(query);
				VisapLogger.LogInfo("Deleted Video from database successfully  for the id" + Id);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.DeleteVideo ~ videoId : +" + Id + " ~ " + ex.Message);
				throw new VisapException("Error while deleting record.");
			}
		}
		
		public Video GetVideoInfo(string Id)
		{
			var vidDetails = new List<Video>();
			try {
				var objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();
				var query = Query.EQ("_id", Id);
				vidDetails = collection.FindAs<Video>(query).Select(x => new Video() {
				    userid=x.userid,
					src = x.src,
					isstage = x.isstage,
					sourcetype = x.sourcetype,
					snap = x.snap,
					caption = x.caption,
					captionId = x.captionId                       
				}).ToList();
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage(ex.Message);
			}
			return vidDetails.Count > 0 ? vidDetails[0] : null;
		}
		
		public bool VideoUsedInTimeLine(string fileName,string userid)
		{
			return GetTimelinesForSource(fileName,userid).Count > 0;
		}
		
		public List<Video> GetTimelinesForSource(string fileName,string userid)
		{
			var tmvidList = new List<Video>();
			try {
				var objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();
				var query = Query.And(Query.EQ("src.data.srcTimeline", fileName),Query.EQ("userid",userid));
				tmvidList = collection.FindAs<Video>(query).ToList();
					 
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage(ex.Message);
			}
			return tmvidList;
		}
		
		public List<Video> CheckForRefernceVideo(string fileName)
		{
			var refVidList = new List<Video>();
			try {
				var objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();
				var query = Query.EQ("src", fileName);
				refVidList = collection.FindAs<Video>(query).ToList();
				 
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage(ex.Message);
			}
			return refVidList;
		}
        
		public void UpdateDateTime(string vidId)
		{
			try {
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();
				IMongoQuery query = Query.EQ("_id", vidId);
				IMongoUpdate update = Update.Set("modifieddate", DateTime.Now);
				collection.Update(query, update);
				VisapLogger.LogInfo("Updating modified date and time while saving action to video collection db successfully  for the videoId" + vidId);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.UpdateDateTime ~ videoId : +" + vidId + " ~ " + ex.Message);
				throw new VisapException("Error while saving action and modified date and time of video");
			}
		}
        
		#endregion
       
		#region GetVideoBySourceforSearch
		/// </summary>
		/// <param name="userid">userid for which video is searched</param>
		/// <param name="src">source of the video</param>
		/// <param name="sKey">searchkey</param>
		/// <returns>cursor or raw list</returns>
		public BsonDocument GetVideoBySourceforSearch(BsonValue id, string sKey)
		{
			BsonDocument list = null;
			try {
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				var videocollection = objCon.GetMongoCollection();
				var query = Query.And(Query.EQ("_id", id));
				list = SearchOneDocument(videocollection, query);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetVideoBySourceforSearch ~ skey : " + sKey + " ~ videoid : " + id + " ~ " + ex.Message);
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
		{
			MongoCursor<BsonDocument> videosList = null;
			BsonRegularExpression searchkeyquery = null;
			try {
				VisapLogger.LogDebug("GetSourceByTittle:Getting the header data for the searchkey:" + searchKey);
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();
				Regex RgxUrl = new Regex("[^a-zA-Z0-9]");
				var blnContainsSpecialCharacters = RgxUrl.IsMatch(searchKey);
				if (blnContainsSpecialCharacters) {
					searchkeyquery = new BsonRegularExpression("^" + (string)searchKey + "$", "i");
				} else {
					searchkeyquery = new BsonRegularExpression(new Regex(searchKey, RegexOptions.IgnoreCase));
				}              
				var tittlequery = Query.And(Query.EQ("userid", userid), Query.Matches("title", searchkeyquery));
				videosList = Searchbyquery(collection, tittlequery);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetSourceByTittle ~ userid : +" + userid + " ~ searchKey : " + searchKey + " ~ " + ex.Message);
				throw new VisapException("Error in application please contact admin");
			}
			return videosList;
		}
        
        
		/// <summary>
		/// Get the videolist based on tittle where title name is searchkey
		/// </summary>
		/// <param name="searchKey">searchkey to check if it is tittle</param>
		/// <param name="userid">userid</param>
		/// <returns>cursor or raw list</returns>
		public List<BsonDocument> GetSourceByTittle(string searchKey, List<string> videolist, string mode)
		{   
			MongoCursor<BsonDocument> videosList = null;
			var videoCollection = new List<BsonDocument>();

			try {
				VisapLogger.LogDebug("GetSourceByTittle:Getting the header data for the searchkey:" + searchKey);
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();
				var videoIds = new List<IMongoQuery>();
    	       
				if (videolist.Count != 0) {
					foreach (var vid in videolist) {
						videoIds.Add(Query.EQ("_id", vid));
					}
				}
				var tittlequery = Query.And(Query.Or(videoIds), Query.EQ("isstage", Convert.ToBoolean(mode)));
				videosList = Searchbyquery(collection, tittlequery);
				var searchTxt = searchKey.ToLowerInvariant().TrimEnd();
				foreach (var item in videosList) {  
					var vidTitle = item.GetElement("title").Value;
					if (HttpUtility.UrlDecode(vidTitle.ToString().ToLower()).Contains(searchTxt)) { 
						videoCollection.Add(item);
					}
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetSourceByTittle ~ searchKey : " + searchKey + " ~ " + ex.Message);
				throw new VisapException("Error in application please contact admin");
			}
			return videoCollection;
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
			searchKey = searchKey.ToLowerInvariant();
			try {
				VisapLogger.LogDebug("CategorySearch:Getting the Category data for the searchkey" + searchKey);
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();              
				Regex RgxUrl = new Regex("[^a-zA-Z0-9]");
				var blnContainsSpecialCharacters = RgxUrl.IsMatch(searchKey);

				if (blnContainsSpecialCharacters) {
					if (searchKey == "*" || searchKey == "@" || searchKey == "'" || searchKey == "/" || searchKey == "+" || searchKey == "(" || searchKey == ")" || searchKey == "!")
						searchkeyquery = new BsonRegularExpression("^" + (string)searchKey);
					else {
                        
						var arr = System.Web.HttpUtility.UrlEncode(searchKey);
						tittlequery = Query.And(Query.EQ("userid", userid), Query.Matches("category", ".*" + arr.ToUpper() + ".*")); 
					}
                 
				} else {
                 
					searchkeyquery = new BsonRegularExpression(new Regex(searchKey, RegexOptions.IgnoreCase));
					tittlequery = Query.And(Query.EQ("userid", userid), Query.EQ("category", searchkeyquery));
				}
				videosList = Searchbyquery(collection, tittlequery);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.CategorySearch ~ uname : +" + userid + " ~ searchKey : " + searchKey + " ~ " + ex.Message);
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
			try {
				VisapLogger.LogDebug("Videos:GetListofCategoriesbyUser:Getting the Category data for the userid:" + userid);
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();   
				//timeline videos are excluded as category will not be created when created a timeline
				var query = Query.And(Query.EQ("userid", userid), Query.NE("sourcetype", 2));
				videosList = Searchbyquery(collection, query);                
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.GetListofCategoriesbyUser ~ userid : +" + userid + " ~ " + ex.Message);
				throw new VisapException("Error in application please contact admin");
			}
			return videosList;
		}
        
        
		public MongoCursor<BsonDocument> GetListofCategoriesbyUser(string userid, string isstage, List<string> videoslist)
		{
			MongoCursor<BsonDocument> videosList = null;
			MongoDBconnection objCon = new MongoDBconnection(_collection);
			var collection = objCon.GetMongoCollection();
			try {
				VisapLogger.LogDebug("Video:GetVideosByUser:Get the videos for the logged in user:" + userid);
				IMongoQuery query = null;
				var andList = new List<IMongoQuery>();
     	         
     	        		
				if (videoslist.Count != 0) {
					foreach (var vid in videoslist) {
						andList.Add(Query.EQ("_id", vid));
					}
					query = Query.And(Query.Or(andList), Query.EQ("isstage", Convert.ToBoolean(isstage)));
					videosList = Searchbyquery(collection, query);   
				}
                      
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.GetVideosByUser ~ username : +" + userid + " ~ " + ex.Message);
				throw new VisapException("GetVideosByUser:Error please contact admin");
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
			try {
				VisapLogger.LogDebug("Videos:GetCategoryListbyVideoID:Getting the Category data for the video" + videoID);
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				var collection = objCon.GetMongoCollection();
				var query = Query.EQ("_id", videoID);
				videosList = Searchbyquery(collection, query);
               
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Metadata.GetCategoryListbyVideoID ~ videoID ~" + videoID + " ~ " + ex.Message);
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
			try {
				var videolist = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(doc);
				foreach (var video in videolist) {       
					video.ToBsonDocument().Remove("ownername");//removeing ownername from the video data.
				}
              
				BsonValue returnID = PubishVideoHeaderDetails(videolist.ToString(), userid);
				VideoMetaData objMetadata = new VideoMetaData();
				objMetadata.PubishvideoMetadata(videolist.ToString(), userid, returnID);
				Assign assignObj = new Assign();
				assignObj.mapOwner(returnID, userid);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.Publishvideo ~ userid : +" + userid + " ~ " + ex.Message);
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
			try {
				BsonValue id = null;
				BsonValue publishedRefId = null;
				IMongoQuery query = null;
				var docList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(doc);
				MongoCollection col = objCon.GetMongoCollection();              
				foreach (var ptr in docList) {
					//check for refid its avaiable only for Published videos
				BsonValue ptrUserId=ptr.ToBsonDocument().GetElement("userid").Value;
				string newUserId=ptrUserId.ToString();
					
					if(ptr.ToBsonDocument().Contains("refId") && newUserId==userid){  //need to the check the combination of ref id and both the users are same
																					  //(loggedin user and publishing user.)
						
						//while republishing just save with the id sent as its latest generated
						id = ptr.ToBsonDocument().GetElement("_id").Value;
						bsoniD = id;
						query = Query.EQ("_id", id);
						VisapLogger.LogDebug("Video:PubishVideoHeaderDetails:Republishing for the  id:" + id);
					}else{
						//first time publish hence creating the new refreneceid
						publishedRefId = ptr.ToBsonDocument().GetElement("_id").Value;
						BsonElement refelem = new BsonElement("refId", publishedRefId);
						ptr.ToBsonDocument().SetElement(refelem);
						//create new id
						Guid originalGuid = Guid.NewGuid();
						string uid = originalGuid.ToString("N");
						id = uid;
						bsoniD = id;
						query = Query.And(Query.EQ("_id", id), Query.EQ("refId", publishedRefId));
						VisapLogger.LogInfo("Video:PubishVideoHeaderDetails:Publishing for the first time hence refid and id:" + publishedRefId + "," + uid);
						BsonElement dateelem = new BsonElement(ViSAP.fields.VideoCollection.Date, DateTime.Now);
						ptr.ToBsonDocument().SetElement(dateelem);
						
					}
					ptr.ToBsonDocument().Remove("_id");
					VisapLogger.LogDebug("Save:Saving data for the collection" + _collection);
					BsonValue bsonName = userid;
					BsonElement elem = new BsonElement("userid", bsonName);
					ptr.ToBsonDocument().SetElement(elem);
					BsonElement modifiedEle = new BsonElement(ViSAP.fields.VideoCollection.ModifiedDate, DateTime.Now);
					ptr.ToBsonDocument().SetElement(modifiedEle);
					var currentVideo = ptr.ToBsonDocument();
					FormatToSave(ref currentVideo);
					ptr.ToBsonDocument().SetElement(elem);
					ptr.ToBsonDocument().Set("isstage", false);
					IMongoUpdate updateDoc = new UpdateDocument("$set", ptr);
					col.Update(query, updateDoc, UpdateFlags.Upsert);
				}
			} catch (MongoDuplicateKeyException ex) {
				VisapLogger.LogError(ex);
				throw new VisapException(ex.Message);
			} catch (MongoException ex) {

				ErrorLogger.Instance().Error(ex);
				throw new VisapException(ex.Message);
			} catch (VisapException ex) {
				VisapLogger.LogErrorMessage("Error in DataAccess.Video.PubishVideoHeaderDetails ~ userid : +" + userid + " ~ " + ex.Message);
				throw new VisapException("Error while publishing");
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				throw new VisapException(ex.Message);
			}
			return bsoniD;
		}

		#endregion
        
        
		#region GetAllDocuments
		/// <summary>
		/// Method to Format raw data
		/// </summary>
		/// <param name="cursor"></param>
		/// <returns></returns>
		public static  string GetAllDocuments(IEnumerable<BsonDocument> cursor)
		{
			Users.Users objuser = new  Users.Users();
			BsonArray vidList = new BsonArray();
			try {
				List<BsonDocument> list = new List<BsonDocument>(cursor);
				if (list.Count > 0) {                  
					foreach (var item in list) {
						//date not required to client side,only modified date required in client.
						if (item.ToBsonDocument().Contains(ViSAP.fields.VideoCollection.Date) || item.ToBsonDocument().Contains(ViSAP.fields.VideoCollection.ModifiedDate)) {
							item.Remove(ViSAP.fields.VideoCollection.Date);
							BsonValue modifiedDate = item.GetElement(ViSAP.fields.VideoCollection.ModifiedDate).Value.ToLocalTime().ToString();
							item.Set("modifieddate", modifiedDate);
							//Adding owner name to the videoList.
							objuser.GetOwnerName(item);
						}
					}
				}
				vidList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(list.ToJson());
                  
			} catch (MongoConnectionException ex) {
				VisapLogger.LogError(ex);
				throw new VisapException("Video:GetAllDocuments:Error in connection to db");
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				throw new VisapException("Video:GetAllDocuments:No records Found");
			}
			return vidList.ToString();
		}
		#endregion
         
         
		#region getVideoSource
		public string getVideoSource(List<string> videoIdList, Boolean mode)
		{	
			//creating mongodb object to call getCollection method
			MongoDBconnection dbObj = new MongoDBconnection("Video");
			var collection = dbObj.GetMongoCollection<Video>();
			
			Users.Users objUser = new Users.Users();
			List<string> userId_list = new List<string>();
			Dictionary<string,string> uid_name_list = new Dictionary<string, string>();
			string videos = "[]";
			
			try {
				VisapLogger.LogDebug("new getVideoSource:Getting video source from list of video id's");
				
				if (videoIdList.Count != 0) {
					//converting bson list of string to IEnumerable<BsonValue> type
					IEnumerable<BsonValue> idList = BsonSerializer.Deserialize<List<BsonValue>>(videoIdList.ToJson());
     	        	
					//This query returns the documents
					var queries = Query.And(Query.In("_id", idList), Query.EQ("isstage", Convert.ToBoolean(mode)));
     	        	
					var videosList = collection.FindAs<Video>(queries).Select(v => v).ToList();//this line gets video source from db.
					
					//getting userid list to get owner name
					userId_list = videosList.Select(v => v.userid).ToList();
					
					//getting id and owner name in pair
					uid_name_list = objUser.GetOwnerNameByIds(userId_list.Distinct().ToList());	
					
					//appending owner name to list of video documents.
					for (var i = 0; i < videosList.Count; i++) {
						videosList[i].ownername = uid_name_list[videosList[i].userid];
					}
					
					//video object is serialized to json to send video source to client side.
					videos = JsonConvert.SerializeObject(videosList, Formatting.Indented);
				}
				
				
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				throw new VisapException("new getVideoSource" + ex.Message);
			}
			
			return videos;
			
		}
		#endregion
		
	}
}
