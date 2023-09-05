﻿using Excel.Workspace.StoreConsants;
using Excel.Workspace.Users;
using System;
using System.Configuration;
using System.Web;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using Excel.Visap.Security;
using Excel.Workspace.DataAccessLayer;
 

namespace ViSapWorkspace
{
    public class AuthenticationModule : IHttpModule
    {
        /// <summary>
        /// You will need to configure this module in the Web.config file of your
        /// web and register it with IIS before being able to use it. For more information
        /// see the following link: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpModule Members

        public void Dispose()
        {
            //clean-up code here.
        }

        public void Init(HttpApplication context)
        {
            context.BeginRequest += context_BeginRequest;            
        }

        void context_BeginRequest(object sender, EventArgs e)
        {
        	try
        	{
        		var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
	            HttpApplication app = (HttpApplication)sender;
	            HttpRequest request = app.Context.Request;
	            Users objUserId = new Users(); 
              
	            if(app.Context.Request.FilePath.Contains("auth.do") && !(String.IsNullOrEmpty(request.Headers["username"]) && String.IsNullOrEmpty(request.Headers["password"])))
	            {
	          
	              VisapLogger.LogDebug("AuthenticationModule:Authentication for the username:"+request.Headers["username"]);
	              Users objUser = new Users();
	              var userName = request.Headers["username"];
	              var password = request.Headers["password"];                
	              String userRole = objUser.CheckUserValidity(userName, password);
	              var userid=  objUserId.GetUserId(userName);
	              if (!(String.IsNullOrEmpty(userRole)))
	              {
	                  var userToken = GetTokenForUserData(userid + Constants.Auth_Separator + userRole);
	                  VisapLogger.LogDebug("AuthenticationModule:Authentication:usertoken and userRole of the current User"+userToken+"~"+userRole);
	                  app.Context.Response.Write(_jsserializer.Serialize(userToken+"~"+userRole));                        
	              }
	            }
        	}
        	catch(Exception ex)
        	{
        		VisapLogger.LogError(ex);
                throw new VisapException("Error in Authentication Module");
        	}
        }
        #endregion
        private String GetTokenForUserData(String userName)
        {
            string encryptionKey = ConfigurationManager.AppSettings["crypt"];
            var type=ConfigurationManager.AppSettings["EncryptType"];
            var cryptoManager=EncryptionProvider.GetProvider(type);
            var token = cryptoManager.Encrypt(userName, encryptionKey);
            return token;
        }
    }
}
