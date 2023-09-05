/*
 * Created by SharpDevelop.
 * User: kavya.tm
 * Date: 4/11/2017
 * Time: 9:33 AM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Linq;
using System.Web;
using DataAccessLayer;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.VideoAccess;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using System.Collections.Generic;
using Excel.Workspace.AelibQuestion;
using Excel.Workspace.Users;
using MongoDB.Driver.Core.Misc;
using Newtonsoft.Json;
using Excel.Workspace.Enum;

namespace Excel.Workspace.DataAccessLayer
{
	/// <summary>
	/// Description of questResponse.
	/// </summary>
	public class questResponse:BaseEntity
	{
		
		#region Constructor
		readonly string _collection = string.Empty;
		public questResponse(string collection)  :
			base(collection)
		{
			_collection = collection;
		}
		
		
		
		#endregion
		public void save(BsonDocument doc)
		{
			
			
			try{
				
				
				//Getting the connection for mongodb (QuestResponse collection)
				MongoDBconnection objCon = new MongoDBconnection(_collection);
				MongoCollection questCollection = objCon.GetMongoCollection();
				
				//Creating unique id
				Guid originalGuid = Guid.NewGuid();
				string uid = originalGuid.ToString("N");
				var query = Query.EQ("_id", uid);
				IMongoUpdate questResponseDoc = new UpdateDocument("$set", doc);
				questCollection.Update(query, questResponseDoc, UpdateFlags.Upsert);
			}
			catch(Exception ex)
			{
				
				VisapLogger.LogErrorMessage("Error while saving question response: "+ ex.Message);
				VisapLogger.LogError(ex);
				throw new VisapException(ex.Message);
			}
			
		}
		
		/// <summary>
		/// Response data creation
		/// </summary>
		/// <param name="data"></param>
		/// <param name="userID"></param>
		/// <returns></returns>
		public BsonDocument getResponseData(string data,string userID){
			var bsonData = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(data);
			BsonDocument questResponse = (BsonDocument)bsonData[0];
			BsonElement elem = new BsonElement("userid", userID); //Set the userid value along with other values.
			questResponse.SetElement(elem);
			return questResponse;
		}
		
		
		/// <summary>
		/// get the question response : first group the response based on userid
		/// sort the response list number of times  attemped based on datetime
		/// get the last attemped record in the list as one user can attempt single question multiple times
		/// </summary>
		/// <param name="videoid"></param>
		/// <param name="userid"></param>
		/// <returns></returns>
		public string GetResponseHeader(string videoid,string userid,Enumerations.Roles role){
			string  responselist ="[]";
			try{
				var collection =  GetCollection(_collection);
				List<QuestResponseEntity> mylist = new List<QuestResponseEntity>();
				if(role == Enumerations.Roles.Instructor){
					mylist = (from quest in collection.AsQueryable<QuestResponseEntity>() where quest.videoId == videoid select quest).ToList();
				}else{
					
					mylist = (from quest in collection.AsQueryable<QuestResponseEntity>() where quest.videoId == videoid &&  quest.userid == userid select quest).ToList();
				}
				
				var quizlist = mylist.GroupBy(s => s.userid)
					.Select( s => s.GroupBy(x => x.quizID).Select (k => k.OrderByDescending(o => o.datetime).First()))
					.Select(lg => new {
					        	obtainedscore = lg.Sum( y => y.score),
					        	maxscore = lg.Sum( y => y.maxScore),
					        	username = lg.Select(y => y.username),
					        	videoid = lg.Select(y => y.videoId),
					        	userid = lg.Select(y => y.userid)
					        });
				
				responselist = JsonConvert.SerializeObject(quizlist, Formatting.Indented);
			}
			catch(Exception ex){
				VisapLogger.LogError(ex);
			}
			return responselist.ToString();
		}
		
		/// <summary>
		///  get Question response deatails
		/// </summary>
		/// <param name="videoid"></param>
		/// <returns></returns>
		public  string GetResponseDetails (string videoid,string userid){
			string  responselist ="[]";
			try{
				List<QuestResponseEntity> mylist = new List<QuestResponseEntity>();
				mylist=	GetResponsebyQuery(mylist,videoid,userid);
				var quizdata = mylist.GroupBy(y => y.userid);
				responselist = JsonConvert.SerializeObject(quizdata, Formatting.Indented);
			}
			catch(Exception ex){
				VisapLogger.LogError(ex);
			}
			return responselist.ToString();
		}
		
		
		/// <summary>
		/// question response by user and video based 
		/// </summary>
		/// <param name="mylist"></param>
		/// <param name="videoid"></param>
		/// <param name="userid"></param>
		/// <returns></returns>
		List<QuestResponseEntity> GetResponsebyQuery(List<QuestResponseEntity> mylist ,string videoid,string userid)
		{
			var responsecollection =  GetCollection(_collection);
			var aelibcollection =  GetCollection("AelibQuestion");
			mylist = (from  qr in responsecollection.AsQueryable<QuestResponseEntity>().ToList()
			          join aelib in aelibcollection.AsQueryable<AelibQuestionEntity>().ToList() on qr.quizID equals aelib._id
			          where qr.videoId == videoid && qr.userid == userid
			          orderby qr.datetime ascending
			          select new QuestResponseEntity()
			          {
			          	status =  qr.status,
			          	score = qr.score,
			          	maxScore =  qr.maxScore,
			          	questiontitle = aelib.title,
			          	userid = qr.userid,
			          	username = qr.username,
			          	quizID = qr.quizID,
			          	videoId = qr.videoId,
			          	_id = qr._id
			          }).ToList();
			
			return mylist;
		}
		
		
		/// <summary>
		///  Delete from quest response collection 
		/// </summary>
		/// <param name="videoid"></param>
		/// <returns></returns>
		public  void DeleteQuestResponse (IList<string> idlist){
			 	 
			try{
				var collection =  GetCollection(_collection);
				List<QuestResponseEntity> mylist = new List<QuestResponseEntity>();
				var list = new List<IMongoQuery>();
				if (idlist.Count != 0) {
					foreach (var qid in idlist) {
						list.Add(Query.EQ("quizID", qid));
					}
					var query = Query.And(Query.Or(list));
                   collection.Remove(query);
				}
			}
			catch(Exception ex){
				VisapLogger.LogError(ex);
			}
			 
		}
		
		
		
	}
}
