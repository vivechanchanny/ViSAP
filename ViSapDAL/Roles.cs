using System;
using  Excel.Workspace.DataAccessLayer;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using DataAccessLayer;
using System.Text.RegularExpressions;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Common.ServiceUtility;
using MongoDB.Bson;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.Users;

namespace Excel.Workspace.Roles
{
    public class Roles : EditableBaseEntity
    {
        #region Constructor
        private const string _collection ="Roles";
        public Roles()
            : base(_collection)
        {
             
        }
        #endregion   
        public string GetRoles()
        {  
        	Roles roleObj=new Roles();
        	try{
        			BsonArray roleDetails=roleObj.getAllRoles();
	                return roleDetails.ToString();
        	}
        	 catch (Exception ex)
            {
                 VisapLogger.LogError(ex);
                throw new VisapException("Error in getting roles");
            }
        }
        public string GetRoles(string excludeAdmin)
        {   
        	Roles roleObj=new Roles();
        	BsonArray roleData=null;
            Excel.Workspace.Users.Users userObj=new Excel.Workspace.Users.Users();        	
		  try{
        			 BsonArray roleDetails=roleObj.getAllRoles();
        			 roleData=userObj.removeAdmin(roleDetails,"_id","2");
	                
        	}
        	 catch (Exception ex)
            {
                 VisapLogger.LogError(ex);
                throw new VisapException("Error while excluding admin role in role collection");
            }
        	
        	return roleData.ToString();
        }
        private BsonArray getAllRoles(){
        	
        	try{
        	        MongoDBconnection objCon = new MongoDBconnection(_collection);
	                var collection = objCon.GetMongoCollection();
                    var query =   Query.NE("_id", Enum.Enumerations.Roles.SuperAdmin); 
                  	var bsonlist = collection.FindAs<BsonDocument>(query);
                    var userList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(bsonlist.ToJson());
	                return userList;
        	}
        	 catch (Exception ex)
            {
                 VisapLogger.LogError(ex);
                throw new VisapException("Error in getting All roles");
            }
        	
        	
        }
    }
}