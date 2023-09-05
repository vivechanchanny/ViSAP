using System;
using System.Linq;
using System.Drawing;
using System.IO;
using DataAccessLayer;
using Excel.Workspace.Common.ServiceUtility;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Log;
using Excel.Workspace.StoreConsants;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;



namespace Excel.Workspace.DataAccessLayer
{
	/// <summary>
	/// Description of Assignment.
	/// </summary>
	public class Assign : EditableBaseEntity
	{
		public string _id{get;set;} 
		public string[] assigneduser{get;set;} 
		public string[] assignedgroup{get;set;}
		public string videoid{get;set;}
		
		 #region Constructor
        private const string _collection ="Assign";
        public Assign()
            : base(_collection)
        {
             
        }
        #endregion
        
		public void mapOwner(BsonValue videoid, string userid)
		{
			 
			try {
        		
				var objCon = new MongoDBconnection(_collection);
				MongoCollection col = objCon.GetMongoCollection();
				var obj = new Assign();
        		
				var guid = obj.createGuid();
				//assign values to Assign class properties.
             
				obj.videoid = videoid.ToString();
				obj.assigneduser = new string[1] { userid };
				obj.assignedgroup = new string[1] { "" };
				
				VisapLogger.LogDebug("Assign:mapOwner:mapowner for the user.." + userid);
				//serialize the class object.
				string json = JsonConvert.SerializeObject(obj, Formatting.Indented);
				Assign assignedObj = JsonConvert.DeserializeObject<Assign>(json);
				
				var assignId = (col.AsQueryable<Assign>().Where(assign => assign.videoid == videoid.ToString()).Select(assign => assign._id)).FirstOrDefault();
				
				if (assignId == null) {//if the assignId is null means there is no record in the database, so create new guid and insert the data.
					assignedObj._id = guid.ToString();
					col.Insert(assignedObj);
				}
				
			} catch (Exception ex) {	
				VisapLogger.LogError(ex);
				throw new VisapException(ex.Message);
			}
		}
		//This method will create guid 
		public BsonValue createGuid(){
			try{
			   BsonValue id = null;
			   Guid originalGuid = Guid.NewGuid();
               string uid = originalGuid.ToString("N");
               id = uid;
               return id;
			}
			catch(Exception ex)
			{	
				VisapLogger.LogError(ex);				
				throw new VisapException(ex.Message);
			}
			
		}
		/// <summary>
		/// GetVideosList: gets the videos from assignment collection
		/// </summary>
		/// <param name="userid"></param>
		/// <returns></returns>
		public List<string> GetVideosList(string userid,List<string> groupidList){
			  string userlist=null;
			  IMongoQuery query = null;
			  List<string> videos = new List<string>();
                try
                {
                    
                    MongoDBconnection objCon = new MongoDBconnection(_collection);
                    var collection = objCon.GetMongoCollection();
                  	var grouplistQuery = new List<IMongoQuery>();
                  	 VisapLogger.LogDebug("Assign:GetVideosList:getting video list for the userid..."+userid);
     	         
     	        		// if there is no user is mapped to group then get only assigned user from assignment
                    	if(groupidList !=null){
                    		foreach (var gid in groupidList){
                    			grouplistQuery.Add(Query.EQ("assignedgroup",gid));
                    		}
                    		query =  Query.Or(Query.Or(grouplistQuery),Query.EQ("assigneduser", userid));
                    	}
                    	else
                       	query = Query.EQ("assigneduser", userid);
                    
                    var bsonlist = collection.FindAs<BsonDocument>(query);
                    userlist=bsonlist.ToJson();
                    
                    
                      var videolist = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(userlist);
                       foreach (var ptr in videolist)
                       {
                       	   var vid=ptr.ToBsonDocument().GetElement("videoid").Value;
                       	   videos.Add(vid.ToString());
                       	
                       }
                    
                }
                catch (Exception ex)
                {
                    VisapLogger.LogError(ex);                	
                    throw new VisapException("User is not found");
                }
                return videos;
			
		}
		
			//to update the assign collection
		public string updateAssignment(string assignedDoc,string userid){
			
			MongoDBconnection objCon = new MongoDBconnection(_collection);
			Assign assignobj=new Assign();
            BsonValue UserId=userid;
            try{
            	
                 var assignedData = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(assignedDoc); //Deserialize the assignedDoc
                 MongoCollection col = objCon.GetMongoCollection();
                 //assignedDataptr contains assigneduser,assignedgroup array and assigned videoid  
                 var assignedDataptr= (BsonDocument)assignedData[0];
                 
                 
                        VisapLogger.LogDebug("Assign:updateAssignment:updating assignment for the user..."+userid);
                         //step1: assigneduser array doesn't contain the owner userid, when we send the assign object from client side
                         //so explicitly adding the userid for assigneduser
                         assignedDataptr.ToBsonDocument().GetValue("assigneduser").AsBsonArray.Add(UserId);
                         
                         //step2: getvalue of videoid from assignedDataptr because based on this videoid, we need to fetch the document from 
                         //Assign collection
	            	 	 var vidId=assignedDataptr.ToBsonDocument().GetValue("videoid").ToString();
	            	 	 var oldAssigndoc=assignobj.getAssignment(vidId);
	            	 	 
	            	 	 //step3: update oldAssigndoc with the new assignment object, so fetch _id from the oldAssigndoc 
			    	     BsonValue oldId=oldAssigndoc.GetValue("_id").ToString();  
			    	     BsonElement elem = new BsonElement("_id", oldId);
	                     assignedDataptr.ToBsonDocument().SetElement(elem);     
							                     
	                     //step4: update to Assign collection based on the oldId document, it will update based on the _id value. 
	                     var newQuery = Query.EQ("_id", oldId); 
			    	     IMongoUpdate updateDoc = new UpdateDocument("$set", assignedDataptr);
	                     col.Update(newQuery, updateDoc, UpdateFlags.Upsert);
	                     return "true";
            	
             }
             catch (Exception ex)
                {  
             		VisapLogger.LogError(ex);
                    throw new VisapException("error in updating Assign collection");
                }
			
		}
		//to get the assignment details based on the video id
		public BsonDocument getAssignment(string videoId){
			
			MongoDBconnection objCon = new MongoDBconnection(_collection);
			MongoCollection col = objCon.GetMongoCollection();
			VisapLogger.LogDebug("Assign:updateAssignment:getting assignment for the videoid...."+videoId);
			var query = Query.EQ("videoid", videoId);  //based on the videoid preparing query
			var oldAssigndoc= SearchOneDocument(col,query);//fetching single document from Assign collection based on the videoid
			return oldAssigndoc;
			
		}
		
		public void DeleteAssignment(string videoId)
		{  
			try{
				IMongoQuery query = Query.EQ("videoid", videoId);
				VisapLogger.LogDebug("Assign:deleteAssignment:delete assignment for the vidoe id...."+videoId);
				Delete(query);
			}
			 catch (Exception ex)
                {  
             		VisapLogger.LogError(ex);
                    throw new VisapException("error while deleting Assign collection");
                }
			
		
		}
		
			
	}
}
