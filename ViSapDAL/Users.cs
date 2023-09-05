using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web;

using DataAccessLayer;
using Excel.Workspace.Common.ServiceUtility;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.Enum;
using Excel.Workspace.StoreConsants;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace Excel.Workspace.Users
{
    public class Users : EditableBaseEntity
    {

        #region Constructor
        private const string _collection ="Users";
        public Users()
            : base(_collection)
        {
             
        }
        #endregion   
        
        #region properties
        public string _id{get;set;}
        public string firstname{get;set;}
        public string lastname{get;set;}
        public string loginname{get;set;}
        public string password{get;set;}
        public string email{get;set;}
        public Int32  role{get;set;}
        public string workspaceId{get;set;}
        public string LoginRole{get;set;}
        #endregion

        public bool CheckIfLoinNameExists(string loginname)
        {
        	var objCon = new MongoDBconnection(_collection);
	        var collection = objCon.GetMongoCollection();
	    	bool isexists=false;
	    	//Regular expression is used to fetch lower and upper case.
	    	var name = new BsonRegularExpression("^" + (string)loginname + "$", "i");
	    	var query = Query.EQ("loginname", name);
            var bsonlist = collection.FindAs<BsonDocument>(query);
              if(bsonlist!=null && bsonlist.Count()>0)
            	isexists=true;
               return isexists;
        }
        
        public string GetUserId(string userName)
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            var userCollection = objcon.GetMongoCollection();
            BsonDocument user = null;
            string userId = string.Empty;
            try
            {             
                var query =Query.EQ("loginname", userName);
                user = SearchOneDocument(userCollection, query);
                if (user != null)
                {
                    userId = user.GetElement("_id").Value.ToString();                    
                }
            }
            catch (Exception ex)
            {
            	 VisapLogger.LogError(ex);
                throw new VisapException("userId is not found");
            }
            return userId;
        }
        //To get user name by user id.
        public string GetUserName(string userid)
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            var userCollection = objcon.GetMongoCollection();
            BsonDocument user = null;
            string lastname = string.Empty;
            string firstname = string.Empty;
            try
            {             
                var query =Query.EQ("_id", userid);
                user = SearchOneDocument(userCollection, query);
                if (user != null)
                {
                    lastname = user.GetElement("lastname").Value.ToString();
					firstname = user.GetElement("firstname").Value.ToString();                    
                }
            }
            catch (Exception ex)
            {
            	 VisapLogger.LogError(ex);
                throw new VisapException("userName is not found");
            }
            return lastname+","+firstname;
        }
           
        
        public string GetAllUser()
        {
        	try {
                    MongoDBconnection objCon = new MongoDBconnection(_collection);
	                var collection = objCon.GetMongoCollection();
	                
	                MongoDBconnection objWorkspace = new MongoDBconnection("Workspace");
	                var workcollection = objWorkspace.GetMongoCollection();
	                
	                IMongoQuery query=null;
                    query =   Query.NE("role", Enum.Enumerations.Roles.SuperAdmin); 
                    var bsonlist = collection.FindAs<BsonDocument>(query);
                    
                     MongoDBconnection rolesObj = new MongoDBconnection("Roles");
	                var rolesCol = rolesObj.GetMongoCollection();
                    
                     var userList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(bsonlist.ToJson());
                 
                    foreach (BsonDocument ptr in  userList)
                    {
                    	if(ptr!=null){
                    	   string workspaceId = ptr.GetElement("workspaceId").Value.ToString();
                    	   var roleId = ptr.GetElement("role").Value;
                           var workspacelist = workcollection.FindOneAs<BsonDocument>(Query.EQ("_id",workspaceId));
                           var roleDocument = rolesCol.FindOneAs<BsonDocument>(Query.EQ("_id",roleId));
                           
                           if(roleDocument!=null){
                         	var roleName = roleDocument.GetElement("rolename").Value;
                         	ptr.Set("role",roleName);
                           }
                         
                           if(workspacelist!=null){
                           var wrkSpaceName = workspacelist.GetElement("name").Value;
                           ptr.Set("workspaceId",wrkSpaceName);
                           }
                    	}
                    }
               
                    return userList.ToJson();
        	    }
        	
        	      catch (Exception ex)
	            {  
        	      	 VisapLogger.LogError(ex);
	                throw new VisapException("Error in getting the user details");
	            }
                 
        }

        //This will get all the users based on column name and column value.        
        public string GetUserbyValue(string colname,string colvalue)
        {
            BsonArray userlist=null;
                try
                { 
                    Users objUsers = new Users();
                    var bsonlist=objUsers.getUserList(colname,colvalue);
                    var userList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(bsonlist.ToJson());
                    userlist= objUsers.removeObjectId(userList);
                }
                catch (Exception ex)
                {  
                	 VisapLogger.LogError(ex);
                    throw new VisapException("User is not found");
                }
                return userlist.ToString();
        }
        public BsonArray removeObjectId(BsonArray data){
        	
        	BsonArray updateduserData=data;
        	foreach (BsonDocument obj in  data)
                    {
         			       if(obj!=null && obj.GetElement("loginname").Value.ToString()=="superadmin"){
         				        var id=obj.GetElement("_id").Value.ToString();
         				        obj.Set("_id",id);
         			        }
                    }
        	return updateduserData;
        }
        
        //overloaded method to exclude admin from the user collection
         public string GetUserbyValue(string colname,string colvalue,string excludeAdmin)
        {
             Users objUsers = new Users();
             var bsonlist=objUsers.getUserList(colname,colvalue);
             //UserList contains all the users from the user collection
             var userList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(bsonlist.ToJson());
             
             //to exclude admin from the userList removeAdming method has been called.
             BsonArray userData=objUsers.removeAdmin(userList,"role","2");
             
             //userData contains role id, to replace role id from role name replaceroleIdbyName method has been invoked.
             BsonArray newUserList=objUsers.replaceroleIdbyName(userData);
             
             //userData contains role id, to replace workspace id from workspace name replaceworkSpaceIdbyName method has been invoked.
             BsonArray updatedUserList=objUsers.replaceworkSpaceIdbyName(newUserList);
            
             return updatedUserList.ToString();
        }
         //This will replace all the role id's from rolename
         public BsonArray replaceroleIdbyName(BsonArray userList){
         	
         	      var userArray=userList;
         	      try
                { 
         	       MongoDBconnection rolesObj = new MongoDBconnection("Roles");
	               var rolesCol = rolesObj.GetMongoCollection();
         		   foreach (BsonDocument userData in  userList)
                    {
         			       if(userData!=null){
         				       var roleId = userData.GetElement("role").Value;
         				       var roleDocument = rolesCol.FindOneAs<BsonDocument>(Query.EQ("_id",roleId));
         				           if(roleDocument!=null)
         				           {
         				           		var roleName =roleDocument.GetElement("rolename").Value;
         				           		userData.Set("role",roleName);
         				           }
         			        }
                    }
         	     }
         	     catch(Exception ex){
         		    VisapLogger.LogError(ex);
                    throw new VisapException("Error while replacing role id's by rolename");
         	  
         	      }
         		return userArray;
         }
         public BsonArray replaceworkSpaceIdbyName(BsonArray userList){
         	
         	     var userArray=userList;
         	       try
                { 
         	      MongoDBconnection objWorkspace = new MongoDBconnection("Workspace");
	               var workcollection = objWorkspace.GetMongoCollection();
         		foreach (BsonDocument userData in  userList)
                    {
         			       if(userData!=null){
         				        string workspaceId = userData.GetElement("workspaceId").Value.ToString();
         				        var workspaceDoc = workcollection.FindOneAs<BsonDocument>(Query.EQ("_id",workspaceId));
         				           if(workspaceDoc!=null)
         				           {
         				           		var wrkSpaceName = workspaceDoc.GetElement("name").Value;
         				           		userData.Set("workspaceId",wrkSpaceName);
         				           }
                         	        
         			        }
                    }
         	     }
         	     catch(Exception ex){
         		    VisapLogger.LogError(ex);
                    throw new VisapException("Error while replacing workspace id's by workspacename");
         	  
         	      }
         		return userArray;
         }
         public BsonArray removeAdmin(BsonArray userData,string columnName,string fieldValue){
         	try
                { 
	         	var list = userData.ToList();
	         	//removeAll method will remove one document from the bsonarray.
	         	list.RemoveAll(x => ((BsonDocument)x).GetElement(columnName).Value.ToString() == fieldValue);
	         	return (new BsonArray().AddRange(list.ToArray()));
         	    }
         	  catch(Exception ex){
         		   VisapLogger.LogError(ex);
                    throw new VisapException("Error while removing admin entry");
         	  
         	   }
         }
         
         private MongoCursor<BsonDocument> getUserList(string colname,string colvalue){
         	
         	MongoCursor<BsonDocument> userlist=null;
                try
                {   
                    MongoDBconnection objCon = new MongoDBconnection(_collection);
                    var collection = objCon.GetMongoCollection();
                    var query =   Query.EQ(colname, colvalue); 
                    userlist = collection.FindAs<BsonDocument>(query);
                }
                catch (Exception ex)
                {  
                	 VisapLogger.LogError(ex);
                    throw new VisapException("User is not found");
                }
               return userlist;
         	
         }
        
        
        
        public void DeleteUser(string workspaceid)
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            try
            {             
                var query =  Query.EQ("workspaceId", workspaceid);
                var col = objcon.GetMongoCollection();
                col.Remove(query); 
               
            }
            catch (Exception ex)
            {
            	 VisapLogger.LogError(ex);
                throw new VisapException("workspaceId is not found");
            }
        }
        
        public string  serachUser(string searchKey,string wsId)
        {
        	string list = null;
        	Users objUsers = new Users();
        	BsonArray userList = new BsonArray();
        	BsonArray userDetails=null;
        	try
        	{
        		MongoDBconnection objCon = new MongoDBconnection(_collection);
        		var collection = objCon.GetMongoCollection();
        		var userCollection = new List<BsonDocument>();
        		MongoCursor<BsonDocument> listOfUsers  = collection.FindAllAs<BsonDocument>();
        		var searchTxt= searchKey.ToLowerInvariant().TrimEnd();
        		
        		foreach (var doc in listOfUsers)
        		{
        			if(doc.GetElement("role").Value!=1)
        			{
        				var firstname=HttpUtility.UrlDecode(doc.GetElement("firstname").Value.ToString().ToLower());
        				var lastname=HttpUtility.UrlDecode(doc.GetElement("lastname").Value.ToString().ToLower());
        				var loginname=HttpUtility.UrlDecode(doc.GetElement("loginname").Value.ToString().ToLower());
        				if(wsId!=null){
        					var workspaceId=HttpUtility.UrlDecode(doc.GetElement("workspaceId").Value.ToString().ToLower());
        					if(workspaceId==wsId){
        						if(firstname.Contains(searchTxt) || lastname.Contains(searchTxt)||loginname.Contains(searchTxt))
        						{
        							userCollection.Add(doc);
        						}
        						list=userCollection.ToJson();
        						userDetails = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(list);
        						userList=objUsers.removeAdmin(userDetails,"role","2");
        					}
        				}
        				else{
        					if(firstname.Contains(searchTxt) || lastname.Contains(searchTxt)||loginname.Contains(searchTxt))
        					{
        						userCollection.Add(doc);
        					}
        					list=userCollection.ToJson();
        					userList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(list);
        				}
        			}
        		}
    
        		//to exclude admin from the userList removeAdming method has been called.
        		BsonArray newData=objUsers.removeAdmin(userList,"role","1");
        		//userData contains role id, to replace role id from role name replaceroleIdbyName method has been invoked.
        		BsonArray newUserList=objUsers.replaceroleIdbyName(newData);
        		//userData contains role id, to replace workspace id from workspace name replaceworkSpaceIdbyName method has been invoked.
        		BsonArray updatedUserList=objUsers.replaceworkSpaceIdbyName(newUserList);
        		list=updatedUserList.ToString();
        		
        	}
        	catch (Exception ex)
        	{
        		VisapLogger.LogError(ex);
        		throw new VisapException("Error in application please contact admin");
        	}
        	return list;
        }
         
         private BsonArray getList(MongoDBconnection objCon,IMongoQuery tittlequery){
         	        var collection = objCon.GetMongoCollection();
         	        var bsonlist = collection.FindAs<BsonDocument>(tittlequery);
	                var userList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(bsonlist.ToJson());
	                return userList;
         }
        
       
         public new void Delete(string id)
       	  {
            MongoDBconnection objcon = new MongoDBconnection(_collection);           
            try
            {
            	BsonValue bid=id;
                var query = Query.EQ("_id", bid);
                var col = objcon.GetMongoCollection();
                col.Remove(query);                
            }
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error Ocurred while deleting user.Please Contact Admin");
            }           
         }
         
         
           // <summary>
        /// mapping required for role based data for student login
        /// </summary>
        /// <param name="loggedinrole"></param>
        /// <param name="collectionName"></param>
        /// <returns></returns>
        /// 
        public string GetMappedInstructor(string loggedinrole)
        {
          
            MongoDBconnection objCon = new MongoDBconnection(Constants.USERS);
            VisapLogger.LogDebug("DataAccess:GetMappedInstructor:get the mapped Instructor" + loggedinrole);
            string username = null;
            try
            {
                var query = Query.EQ("_id",  ObjectId.Parse(loggedinrole));
                var col = objCon.GetMongoCollection();
                var doc = col.FindOneAs<BsonDocument>(query);
                username = doc.GetElement("Studentauthor").Value.ToString();
            
            }
            catch (MongoConnectionException ex)
            {
                throw new VisapException(ex.Message);

            }
            return username.ToString();

        }
        
        public string GetUserInfo(string userId)
        {
           MongoDBconnection objcon = new MongoDBconnection(_collection);
           var userCollection = objcon.GetMongoCollection();
           BsonDocument user = null;
           try{
           	 var query = Query.EQ("_id", userId);
           	  user = SearchOneDocument(userCollection, query);
           	  return user.ToString();
           }
           catch(Exception ex)
           {
              VisapLogger.LogError(ex);
              throw new VisapException("No users found");
           }
        
        }
         //Adding owner name to video list.        
        public BsonDocument GetOwnerName(BsonDocument bsondoc)
        {
		  BsonValue ownername=GetUserName(bsondoc.ToBsonDocument().GetElement("userid").Value.ToString());
          BsonElement elem = new BsonElement("ownername", ownername);
          return  bsondoc.ToBsonDocument().SetElement(elem);
        }
        
          #region CheckUserValidity
        /// <summary>
        /// Check User Validity, If valid return its role        
        /// </summary>
        /// <returns></returns>
        public string CheckUserValidity(string username, string password)
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            var userCollection = objcon.GetMongoCollection();
            BsonDocument user = null;
            string userRole = string.Empty;
            try
            {             
                var query = Query.And(Query.EQ("loginname", username), Query.EQ("password", password));
                user = SearchOneDocument(userCollection, query);
                if (user != null)
                {
                    userRole = user.GetElement("role").Value.ToString();                    
                }
            }
            catch (Exception ex)
            {
            	 VisapLogger.LogError(ex);
                throw new VisapException("no users found");
            }
            return userRole;
        }
        #endregion

        #region getOwnerName
		public Dictionary<string,string> GetOwnerNameByIds(List<string> uIdList)
		{
			Users objUsers = new Users();
			Dictionary<string, string> id_name = new Dictionary<string, string>();
			
			try
			{
				var userDocs = objUsers.GetUserDocsByIds(uIdList);
                
				foreach(var user in userDocs)
				{
					id_name.Add(user._id,user.lastname+","+user.firstname);
				}
					
			}
		   catch (Exception ex)
           {
               VisapLogger.LogError(ex);
               throw new VisapException("No records Found: "+ex.Message);
           }
			return id_name;
		}
		#endregion
 		
		#region getUserDocsByIds
		public MongoCursor<Users> GetUserDocsByIds(List<string> userIdList)
		{
			MongoDBconnection dbObj = new MongoDBconnection("Users");
			var collection = dbObj.GetMongoCollection<Users>();
			MongoCursor<Users> userDocs = null;
			try
			{
				IEnumerable<BsonValue> idList = BsonSerializer.Deserialize<List<BsonValue>>(userIdList.ToJson());
				var queries  = Query.In("_id",idList);
				//this query gets user documents of matched query
				userDocs = collection.FindAs<Users>(queries);
				
			}
			catch(Exception ex)
			{
				VisapLogger.LogError(ex);
               throw new VisapException("No records Found: "+ex.Message);
			}
			return userDocs;
		}
		#endregion
    }
}