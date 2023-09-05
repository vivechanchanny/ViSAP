
using  Excel.Workspace.DataAccessLayer;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using DataAccessLayer;
using System.Text.RegularExpressions;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Common.ServiceUtility;
using Excel.Workspace.StoreConsants;
using System;
using System.Web;
using System.Collections.Generic;


namespace Excel.Workspace.Workspace
{
    public class CreateWorkspace : EditableBaseEntity
    {

        #region Constructor
        private const string _collection ="Workspace";
        public CreateWorkspace()
            : base(_collection)
        {
            
        }
        #endregion  
    
	     public string  serachCustomer(string searchKey)
        {
        	string list = null;
        	var workspaceCollection = new List<BsonDocument>();
        	try
        	{
        		MongoDBconnection objCon = new MongoDBconnection(_collection);
        		var collection = objCon.GetMongoCollection();
        		
        		MongoCursor<BsonDocument> worklist  = collection.FindAllAs<BsonDocument>();
        		var searchTxt= searchKey.ToLowerInvariant().TrimEnd();
        		foreach (var doc in worklist)
        		{
        			var workname=doc.GetElement("name").Value;
        			if (HttpUtility.UrlDecode(workname.ToString().ToLowerInvariant()).Contains(searchTxt))
        			{
        				workspaceCollection.Add(doc);
        			}
        		}
        		list=workspaceCollection.ToJson();
        	}
        	catch (Exception ex)
        	{
        		VisapLogger.LogError(ex);
        		throw new VisapException("Error in application please contact admin");
        	}
        	return list;
        }
	    
	    
	    public bool  CheckIfWorkspaceNameExists(string wkname)
	    {
	    	var objCon = new MongoDBconnection(_collection);
	        var collection = objCon.GetMongoCollection();
	    	bool isexists=false;
	    	//Regular expression is used to fetch lower and upper case.
			var workspaceName = new BsonRegularExpression("^" + (string)wkname + "$", "i");
			var tittlequery = Query.EQ("name", workspaceName); 
            var bsonlist = collection.FindAs<BsonDocument>(tittlequery);
            if(bsonlist!=null && bsonlist.Count()>0)
            	isexists=true;
               return isexists;
	    }
	     
	    //to get the workspacename by userid
	    public string getWorkspaceByUser(string userid){
	    	
	    	try{
		    	 MongoDBconnection objCon = new MongoDBconnection("Users");
		    	 MongoCollection col = objCon.GetMongoCollection();
		    	 var query = Query.EQ("_id", userid);
		    	 var doc= SearchOneDocument(col,query);
		    	 return getWorkspaceDetails(doc.GetValue("workspaceId").ToString());
	    	  }
	    	
	    	catch(Exception ex){
	    		 VisapLogger.LogError(ex);
	    		throw new VisapException("Error while getting user document from userid");
	    	}
	    }
	    //to get the worksapce name by workspace id
	    public string getWorkspaceDetails(string id){
	    	
	    	try
	    	{
		    	 MongoDBconnection objCon = new MongoDBconnection("Workspace");
		    	 MongoCollection col = objCon.GetMongoCollection();
		    	 var query = Query.EQ("_id", id);
		    	 var workspaceDoc= SearchOneDocument(col,query);
		    	 return workspaceDoc.ToString();
	    	}
	    	catch(Exception ex){
	    		 VisapLogger.LogError(ex);
	    		throw new VisapException("Error while getting workspacename by worksapceId");
	    	}
	    	
	    }
	    
	    
		// get workspace id by user id.
		public string getWrkSpaceId(string id)
		{
			try {
				var jsonData = getWorkspaceByUser(id);
				var bsonData = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(jsonData);
				var	workspaceId = bsonData.ToBsonDocument().GetElement("_id").Value;
				return workspaceId.ToString();
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				throw new VisapException("Error while getting workspace id by userId");
			}
	    	
		}
	    
	    public string getWorkspaceName(string userid){
	    	
	    	try {
	    		
	    		var jsonData= getWorkspaceByUser(userid);
	    		var bsonData = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(jsonData);
	    		var	name = bsonData.ToBsonDocument().GetElement("name").Value;
	    		
	    		return name.ToString();
	    	} catch(Exception ex){
	    		VisapLogger.LogError(ex);
	    		throw new VisapException("getWorkspaceName:Error while getting workspacename by userid");
	    	}
	    
	    }
	  
	    		
    }
}