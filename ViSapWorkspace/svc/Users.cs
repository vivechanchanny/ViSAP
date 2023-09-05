using System.Linq;
using Excel.Workspace.StoreConsants;
using System.Web;
using  Excel.Workspace.Users;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Workspace;
using System.IO;
using Newtonsoft.Json.Linq;
using System;

namespace ViSapWorkspace
{
    public class UsersData : IHttpHandler
    {           
       
        public bool IsReusable
        {
            get { return false; }
        }

      
        /// <summary>
        /// Processing request based on the type of the request 
        /// videos will be saved/deleted/selection of videos
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
            var request = context.Request;
            string jsonString =null;	
			using (var inputStream = new StreamReader(context.Request.InputStream))
			{
			   jsonString =inputStream.ReadToEnd();
			}
            Users objUsers = new Users();
            CreateGroup objCreateGroup = new CreateGroup();
            var wsObj = new CreateWorkspace();
            
           
            try{
			 	if (request.HttpMethod == "GET")
			 	{
			 		if(request.Headers["UserName"] != null)
			 		{
			 			string uname = request.Headers["UserName"].ToString();
			 			string colname = "loginname";
			 			string userList=objUsers.GetUserbyValue(colname,uname);
			 			context.Response.Write(userList);
			 		}
			 		else if(request.Headers["userID"] != null){
			 			
			 			var userId = request.Headers["userID"].ToString();
			 			string workspaceID = wsObj.getWrkSpaceId(userId);
			 			string colname = "workspaceId"; 
			 			string userList=null;
			 			
			 			if(request.Headers["excludeAdmin"]=="true")
			 			      userList=objUsers.GetUserbyValue(colname,workspaceID,request.Headers["excludeAdmin"]);
			 			else  userList=objUsers.GetUserbyValue(colname,workspaceID);
			 			
			 			context.Response.Write(userList);
			 		}
			 		else{
			 			string userList=objUsers.GetAllUser();
			 			context.Response.Write(userList);
			 		}
			 		
			 	}
				
				 if (request.HttpMethod == "POST")
                {   
	 				if(request.Headers["X-Delete"] != null)
	                {   
	                    objCreateGroup.DeleteGroupbyCreateduserId(jsonString);
	 					objUsers.Delete(jsonString);
	                   VisapLogger.LogDebug("UsersService:Deleted successfully customer with the id:"+jsonString);                   
	                }
	                 else
                     {
                     
                     	dynamic data = JObject.Parse(jsonString);
                     	string loginName=data.loginname;
			  	 	    string workspaceId = data.workspaceId;
			  	 	    string id = data._id;//Edit Mode.
			  	 	    bool CheckIfLoginNameExists=objUsers.CheckIfLoinNameExists(loginName);
			  	 	   
			  	 	    if(!CheckIfLoginNameExists ||id != null)
			  	 		{
			  	 	    	objUsers.Save(jsonString);
			  	 	    	string colname = "workspaceId";
			  	 	    	string userList=null;
			  	 	    	if(data.LoginRole==Constants.ADMINROLE){
			  	 	    	  userList=objUsers.GetUserbyValue(colname,workspaceId,"true");
			  	 	    	  context.Response.Write(userList);
			  	 	    	}
			  	 	    	else
			  	 			  context.Response.Write(objUsers.GetAllUser());
			  	 		}
                     	else
                     	{
                     		 context.Response.Write("true");
                     	}
                     }     
			 }
			 }
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException();
            }
        }
    }
   
}