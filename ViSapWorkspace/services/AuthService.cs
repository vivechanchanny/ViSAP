using System.Configuration;
using Excel.Workspace.StoreConsants;
using Excel.Visap.Security;
using System.Web;
using System.Linq;
using System;

 
namespace ViSapWorkspace.services
{
	/// <summary>
	/// Description of AuthService.
	/// </summary>
	public class AuthService
	{
		
		public UserToken GetUserValueToken(HttpRequest request)
		{
			//if isstage is true username is stage else take appropriate username
			var decryptedToken = new UserToken();
			var objAuth = new AuthService();
        	
			if (request.Headers.AllKeys.Contains("X-Authorization")) {
				var encryptedToken = request.Headers.GetValues("X-Authorization")[0];
        		
				if (encryptedToken == Constants.IsStage) { //while publishing the video.
					decryptedToken.IsStage = encryptedToken;
					return decryptedToken;
				}
				if (encryptedToken != "null") {
					var decryptedUserData = objAuth.GetDecryptedToken(encryptedToken);
					decryptedToken = objAuth.GetUserDetails(decryptedUserData);
				}
			}
			return decryptedToken;
		}
		
		//This method will decrypt user token.
		public string GetDecryptedToken(string token)
		{
			try {
				var encryptionKey = ConfigurationManager.AppSettings["crypt"];
				var type = ConfigurationManager.AppSettings["EncryptType"];
				var cryptoManager = EncryptionProvider.GetProvider(type);
				var decryptedString = cryptoManager.Decrypt(token, encryptionKey);
				return decryptedString;
			} catch (Exception ex) {
				throw new ApplicationException("Token is not valid " + ex.Message);
			}
		}
		
		///This method will decrypt video/user token by getting type(Jwt or Aes/Des/Tes).
		public string GetDecryptedToken(string token,string type)
		{
			try {
				var encryptionKey = ConfigurationManager.AppSettings["crypt"];
				var cryptoManager = EncryptionProvider.GetProvider(type);
				var decryptedString = cryptoManager.Decrypt(token, encryptionKey);
				return decryptedString;
			} catch (Exception ex) {
				throw new ApplicationException("Token is not valid " + ex.Message);
			}
		}
		
		//returns user information.
		public UserToken GetUserDetails(string decryptedUserData)
		{
			try {
				var decryptedToken = new UserToken();
		    
				decryptedToken.UserID = decryptedUserData.Split(char.Parse(Constants.Auth_Separator))[0];
				decryptedToken.UserRole = decryptedUserData.Split(char.Parse(Constants.Auth_Separator))[1];
				decryptedToken.DateTime = DateTime.Parse(decryptedUserData.Split(char.Parse(Constants.Auth_Separator))[2]);
			 
				return decryptedToken;
			} catch (Exception ex) {
				throw new ApplicationException("User token is not valid" + ex.Message);
			}
		}
		
		//returns video information.
		public VideoToken GetVideoDetails(string decryptedVideoData)
		{
			try {
				var decryptedToken = new VideoToken();
				decryptedToken.VideoID = decryptedVideoData.Split(char.Parse(Constants.Auth_Separator))[0];
			 
				return decryptedToken;
			} catch (Exception ex) {
				throw new ApplicationException("Video token is not valid " + ex.Message);
			}
		}
		 
		public class UserToken
		{
			public string UserID { get; set; }
			public string UserRole { get; set; }
			public DateTime DateTime { get; set; }
			public string IsStage { get; set; }
		}
		 
		public class VideoToken
		{
			public string VideoID { get; set; }
		}
		
		public string GetTokenForUserData(string userName)
		{		
			string encryptionKey = ConfigurationManager.AppSettings["crypt"];
			var type = ConfigurationManager.AppSettings["EncryptType"];
			var cryptoManager = EncryptionProvider.GetProvider(type);
			var token = cryptoManager.Encrypt(userName, encryptionKey);
			return token;
		}
	}
}
