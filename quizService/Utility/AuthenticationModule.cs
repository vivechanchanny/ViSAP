using Excel.Visap.StoreConsants;
using System;
using System.Configuration;
using System.Web;
using quizService.DataAccess;
using Excel.Visap.Security;

namespace ViTag.svc
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
	            HttpApplication app = (HttpApplication)sender;
	            HttpRequest request = app.Context.Request;
	            HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin","*");
	           
	            if(request.HttpMethod == "OPTIONS" ){
	            	return ;
	            }
	            
               string[] returnUserName = new string[Constants.Auth_Separator.Length+1];
	            
	                if (!(String.IsNullOrEmpty(request.Headers["X-Authorization"])))
	                {
 
	                        var encryptedToken = request.Headers["X-Authorization"];
	                        var type = ConfigurationManager.AppSettings["EncryptType"];
	                        string encryptionKey = ConfigurationManager.AppSettings["crypt"];
	                        
			                var cryptoManager = EncryptionProvider.GetProvider(type); 
	                    	var uname = cryptoManager.Decrypt(encryptedToken, encryptionKey);
	                    	returnUserName = uname.Split(Constants.Auth_Separator.ToCharArray());
	                    
	                }
	                else
	                	HttpContext.Current.Response.StatusCode = Constants.HTTP_Unauthorised;
	            

        	}
        	catch(Exception ex)
        	{
        		 VisapLogger.LogDebug("Error while authenticating request:"+ex.Message);
        		 HttpContext.Current.Response.StatusCode = Constants.HTTP_Unauthorised;
        	}
            
        }
        #endregion
        
    }
}
