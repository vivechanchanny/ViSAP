
using  Excel.Workspace.DataAccessLayer;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using DataAccessLayer;
using System.Text.RegularExpressions;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Common.ServiceUtility;
using System.Collections.Generic;
using System.Web;
using System;


namespace Excel.Workspace.Workspace
{
    public class CreateGroup : EditableBaseEntity
    {

        #region Constructor
        private const string _collection ="Group";
        public CreateGroup()
            : base(_collection)
        {
            
        }
        #endregion  
    
        public string  SearchGroup(string searchKey,string userid)
        {
        	string list = null;
        	var groupCollection = new List<BsonDocument>();
        	try
        	{
        		MongoDBconnection objCon = new MongoDBconnection(_collection);
        		var collection = objCon.GetMongoCollection();
        		
        		MongoCursor<BsonDocument> grouplist  = collection.FindAllAs<BsonDocument>();
        		var searchTxt= searchKey.ToLowerInvariant().TrimEnd();
        		foreach (var doc in grouplist)
        		{
        			var groupname=doc.GetElement("name").Value;
        			if(doc.GetElement("createduserId").Value==userid &&  HttpUtility.UrlDecode(groupname.ToString().ToLower()).Contains(searchTxt)){
        		       groupCollection.Add(doc);
        			}
        		}
        		list=groupCollection.ToJson();
        	}
        	catch (Exception ex)
        	{
        		VisapLogger.LogError(ex);
        		throw new VisapException("Error in application please contact admin");
        	}
        	return list;
        }
	    
	    
	    public bool  CheckIfGroupNameExists(string groupname,string userid)
	    {
	    	var objCon = new MongoDBconnection(_collection);
	    	var collection = objCon.GetMongoCollection();
	    	bool isexists=false;
	    	//Regular expression is used to fetch lower and upper case.
	    	var gname = new BsonRegularExpression("^" + (string)groupname + "$", "i");	    	
	    	IMongoQuery tittlequery =Query.And(Query.EQ("name", gname), Query.EQ("createduserId", userid));
	    	var bsonlist = collection.FindAs<BsonDocument>(tittlequery);
	    	if(bsonlist!=null && bsonlist.Count()>0)
	    		isexists=true;
	    	return isexists;
	    }
	    
	    public string  AddusersToGroup(string groupid ,string[] userlist)
	    {
	    	// get the group data based on groupid
	    	
	    	         MongoDBconnection objCon = new MongoDBconnection(_collection);
	                var collection = objCon.GetMongoCollection();
                    var query =   Query.EQ("_id", groupid); 
                    var bsonlist = collection.FindAs<BsonDocument>(query);
                    string groupdata=bsonlist.ToJson();
                    var grouplist = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(groupdata);
                    BsonElement elem = new BsonElement("mappedusers", BsonValue.Create(userlist));
                    grouplist[0].ToBsonDocument().SetElement(elem);
                    return grouplist[0].ToString();
	    }
	    
	    public void DeleteGroupbyCreateduserId(string userid)
        {
	            try
	            {
	                
                    MongoDBconnection objCon = new MongoDBconnection(_collection);
	                var collection = objCon.GetMongoCollection();
                    var query =   Query.EQ("createduserId", userid); 
                    collection.Remove(query);
	            }
	            catch (Exception ex)
	            {  
	            	VisapLogger.LogError(ex);
	                throw new VisapException("DeleteGroupbyUserID:userid not found");
	            }
	           
        }   
             
        public string GetGroupbyUserID(string userid)
        {
            string userlist=null;
	            try
	            {
	                
                    MongoDBconnection objCon = new MongoDBconnection(_collection);
	                var collection = objCon.GetMongoCollection();
                    var query =   Query.EQ("createduserId", userid); 
                    var bsonlist = collection.FindAs<BsonDocument>(query);
                    userlist=bsonlist.ToJson();
	            }
	            catch (Exception ex)
	            {  
	            	VisapLogger.LogError(ex);
	                throw new VisapException("User is not found");
	            }
	            return userlist;
        }
        
        public MongoCursor<BsonDocument> GetGroupInfo(List<IMongoQuery> grouplist)
        {
           IMongoQuery query = null;
	       try
	       {
               MongoDBconnection objCon = new MongoDBconnection(_collection);
	           var collection = objCon.GetMongoCollection();
	           query = Query.And(Query.Or(grouplist));
               var groupdoc=collection.FindAs<BsonDocument>(query);
               return groupdoc;
	       }
	       catch (Exception ex)
	       {  
	       	VisapLogger.LogError(ex);
	           throw new VisapException("Group information is not found");
	       }
        }
        
        /// <summary>
        /// Mapped users which are belongs to the group arelisted 
        /// </summary>
        /// <param name="datafieldname"></param>
        /// <param name="datafieldvalue"></param>
        /// <returns></returns>
        
          public List<string> GetGroupbyMappedUsers(string datafieldvalue)
          {
            string userlist=null;
              List<string> grouplist = new List<string>();
	            try
	            {
	                
                    MongoDBconnection objCon = new MongoDBconnection(_collection);
	                var collection = objCon.GetMongoCollection();
                    var query =   Query.EQ("mappedusers", datafieldvalue); 
                    var bsonlist = collection.FindAs<BsonDocument>(query);
                    userlist=bsonlist.ToJson();
                    
                    
                      var mappeduser = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(userlist);
                      if(mappeduser.Count > 0){
                      	
                      	foreach (var ptr in mappeduser)
                      	{
                      		var groupid=ptr.ToBsonDocument().GetElement("_id").Value;
                      		grouplist.Add(groupid.ToString());
                      		
                      	}
                      }else grouplist =null;
                    
	            }
	            catch (Exception ex)
	            {  
	                 VisapLogger.LogError(ex);
	            	throw new VisapException("User is not found");
	            }
	            return grouplist;
        }
	    		
    }
}