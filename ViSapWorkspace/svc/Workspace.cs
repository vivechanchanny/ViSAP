using System.Linq;
using Excel.Workspace.StoreConsants;
using System.Web;
using  Excel.Workspace.Workspace;
using Excel.Workspace.Users;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Runtime.Serialization;
using ViSapWorkspace.services;
using System;

namespace ViSapWorkspace
{
    public class Workspace : IHttpHandler
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
             string   workspacename=null;
			using (var inputStream = new StreamReader(context.Request.InputStream))
			{
			   jsonString =inputStream.ReadToEnd();
			}
            CreateWorkspace objCreateWorkspace = new CreateWorkspace();
            
            Users objUserEntity=new Users();
            try{
           	      
				if (request.HttpMethod == "POST")
                {  
	 				if(request.Headers["X-Delete"] != null)
	                {   
	 				   objUserEntity.DeleteUser(jsonString);
	                   objCreateWorkspace.Delete(jsonString);
	                   VisapLogger.LogDebug("UsersService:Deleted successfully customer with the id:"+jsonString);                   
	                }
                     else
                     {
                     	dynamic data = JObject.Parse(jsonString);
			  	 	    workspacename = data.name; 
			  	 	    var editMode = request.Headers["EditMode"];//Edit Mode. 
                     	if(!objCreateWorkspace.CheckIfWorkspaceNameExists(workspacename) || editMode == "true")
			  	 		{
                     		objCreateWorkspace.Save(jsonString);
			  	 			context.Response.Write(objCreateWorkspace.GetAllDocuments());
			  	 		}
                     	else
                     	{
                     		 context.Response.Write("false");
                     	}
                     }
				}
				if (request.HttpMethod == "GET")
				{
					var objAuth = new AuthService();
					
				    var userDetails = objAuth.GetUserValueToken(request);
					string userid = userDetails.UserID;
					string userRole=userDetails.UserRole;
					if(request.Headers["X-UserToken"] =="true" && request.Headers.AllKeys.Contains("X-Authorization") && userRole!=Constants.SuperAdmin){
						context.Response.Write(objCreateWorkspace.getWorkspaceByUser(userid));
					}
					else
						context.Response.Write(objCreateWorkspace.GetAllDocuments());
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