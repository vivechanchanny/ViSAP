using System.Configuration;
using Excel.Visap.Security;
using Excel.Workspace.StoreConsants;
using Newtonsoft.Json.Linq;
using System;

namespace ViSapWorkspace.services
{
	/// <summary>
	/// Description of ssoAuthService.
	/// </summary>
	public class ssoAuthService
	{
		
		public string ValidateTokens(string authToken, string videoToken)
		{
			JObject data;
			try {
				var objAuth = new AuthService();
		 
				if (string.IsNullOrEmpty(authToken) || string.IsNullOrEmpty(videoToken)) {
					throw new ApplicationException("Tokens are not valid");
				}
				 
				  var videoType = ConfigurationManager.AppSettings["VideoTokenType"];
				  
		          //Decrypt video token and get video information.
				  var decryptedVideoData = objAuth.GetDecryptedToken(videoToken,videoType);
				  var  videoInfo = objAuth.GetVideoDetails(decryptedVideoData);
				  
				  //Decrypt user token and get user information.
				  var decryptedUserData = objAuth.GetDecryptedToken(authToken);
				  var userInfo = objAuth.GetUserDetails(decryptedUserData);
				 
				  data = JObject.FromObject(userInfo); //convert object to json string	
				  data.Add("VideoID", videoInfo.VideoID);//Add video id to existing json string.	
			
			} catch (Exception ex) {
				throw new ApplicationException(ex.Message);
			}
			return data.ToString();
		}
	}
}
