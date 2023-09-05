using System.Web;
using System.Configuration;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Auth;
using Excel.Workspace.Users;
using Excel.Workspace.StoreConsants;
using System.IO;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using Excel.Visap.Security;
using ViSapWorkspace.services;
using  Excel.Workspace.Workspace;
using System.Collections.Generic;

namespace ViSapWorkspace
{
	
	public class RoleEntity
	{
		public string role{get;set;}
	}
    public class Authentication : IHttpHandler
    {
    
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Handler to get the list of users in database
        /// </summary>
        /// <param name="context">HttpContext</param>
      
        public void ProcessRequest(HttpContext context)
        {
            try
            {
            	var request = context.Request;
                var objAuthentications = new Authentications(); 
                var objAuth = new AuthService();
                
	            string jsonString =null;			
				using (var inputStream = new StreamReader(context.Request.InputStream))
				{
				   jsonString =inputStream.ReadToEnd();
				}				
                var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };          
				if (request.HttpMethod == "POST") {                		
					dynamic stuff = JObject.Parse(jsonString);
					string username = stuff.userName;
					string password = stuff.pwd;
					string userRole = objAuthentications.ValidateUser(username, password);
                 	
					if (!(string.IsNullOrEmpty(userRole))) {
						var userService = new UserService();
						var userInfo = userService.getUserDetails(username, userRole);
						VisapLogger.LogInfo("AuthenticationModule:Authentication:userId and userRole of the current User:" + userInfo);
						context.Response.Write(_jsserializer.Serialize(userInfo));                        
					}          	
				}
                
                   if (request.Headers.AllKeys.Contains("X-Authorization"))
			 		{ 	
                          var uname = objAuth.GetUserValueToken(request);
                          context.Response.Write(_jsserializer.Serialize(uname.UserID));
                   }
            }
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);     
                throw new VisapException("can be user friendly error message");
            }
        }
        #endregion
    }
}