using System.Linq;
using Excel.Workspace.StoreConsants;
using System.Web;
using  Excel.Workspace.Workspace;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using System.IO;
using Newtonsoft.Json.Linq;
using Excel.Workspace.Users;
using System;

namespace ViSapworkspace
{
	public class Search: IHttpHandler
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
            CreateWorkspace objCreateWorkspace = new CreateWorkspace();
			 try
           	 {      

				if (request.HttpMethod == "POST")													        
				{ 
				    dynamic data = JObject.Parse(jsonString);
			  	 	   string  serachkey= data.name;  
	                    string collectionused= data.searchfor;
	                    string userid = string.Empty;
	                    if(collectionused!=null && collectionused =="users" )
	                    {
	                       Users objAdminUsers = new Users();
	                       context.Response.Write(objAdminUsers.serachUser(serachkey,request.Headers["workspaceID"])); 
					       VisapLogger.LogDebug("search completed for the key with users:"+jsonString ); 
	                    }
	                    else if(collectionused != null && collectionused == "group"){
	                    	CreateGroup objGroups = new CreateGroup();
	                    	userid= data.userid;
	                       context.Response.Write(objGroups.SearchGroup(serachkey,userid)); 
					       VisapLogger.LogDebug("search completed for the key with group:"+serachkey ); 
	                    
	                    }
	                      else
	                      {
						      context.Response.Write(objCreateWorkspace.serachCustomer(serachkey)); 
						      VisapLogger.LogDebug("search completed for the key with customer:"+jsonString ); 
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