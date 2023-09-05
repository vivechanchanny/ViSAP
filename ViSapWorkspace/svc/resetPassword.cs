using System;
using System.Web;
using Excel.Workspace.Common.Utilities;
using System.IO;
using Newtonsoft.Json.Linq;
using Excel.Workspace.Users;
using System.Configuration;
using ViSapWorkspace.services;
using Newtonsoft.Json;
using Excel.Workspace.StoreConsants;
using System.Web.Script.Serialization;

namespace ViSapWorkspace
{
	/// <summary>
	/// Description of Email.
	/// </summary>
	public class ResetPwd: IHttpHandler
    {           
       
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Processing request based on the type of the request.
        /// </summary>
        /// <param name="context">HttpContext</param>
        public const String token_Separator = "|";
        public void ProcessRequest(HttpContext context)
        {
        	
        	try{
	        	
	           string jsonString =null;
				using (var inputStream = new StreamReader(context.Request.InputStream))
				{
				   jsonString =inputStream.ReadToEnd();
				}
		        dynamic data = JObject.Parse(jsonString);
		       
		        var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue }; 
		        //To get the password and token
		        string password=data.newPassword;
		        string token= data.token;
		        bool ng = data.ng;
		        string decodedToken=HttpUtility.UrlDecode(token);  //decoding the token using urldecode.
		        string decryptedToken=getUserIdfromToken(decodedToken);//Decrypt the token and get userid
		        
		        var userId=decryptedToken.Split(char.Parse(token_Separator))[0];
		        var time=decryptedToken.Split(char.Parse(token_Separator))[1];
		        
		        int diffrenceTime = DateTime.Now.Subtract(Convert.ToDateTime(time)).Minutes;
				var tokenExpiryTime = Convert.ToInt32(ConfigurationManager.AppSettings["TokenExpiryforResetPwd"]);
				
				if (diffrenceTime >= tokenExpiryTime) {
					if (ng) {
						// context.Response.StatusCode = Constants.HTTP_BAD_REQUEST;
						VisapLogger.LogDebug("ResetPassword ng app" + userId);
						context.Response.Write(_jsserializer.Serialize("Invalid Token"));
					} else {
						// context.Response.StatusCode = Constants.HTTP_BAD_REQUEST;
						VisapLogger.LogDebug("ResetPassword visap app" + userId);
					    var msg = "Invalid Token, Please click on reset link to regenerate new reset password link  <a href='" + ConfigurationManager.AppSettings["forgotpasswordURL"] + "'>Reset</a>";
						context.Response.Write(_jsserializer.Serialize(msg));
					}
					
				} else {
					var obj = new ResetPassword();
					obj.updatePassword(userId, password);   //For specific UserId update the password
					context.Response.StatusCode = (int)System.Net.HttpStatusCode.OK;
					context.Response.Write(_jsserializer.Serialize(bool.TrueString));
				}
        	}
        	catch(Exception ex){
        		VisapLogger.LogError(ex);
                throw new VisapException("Error while getting the userId from email");
        	}
        }
        
		private string getUserIdfromToken(string token)
		{
			var objAuth = new AuthService();
			//get decrypted data(user details) from token.
			return objAuth.GetDecryptedToken(token);
		}
		
        #endregion
    }
}
