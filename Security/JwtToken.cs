/*
 * Created by SharpDevelop.
 * User: kavya.tm
 * Date: 5/10/2016
 * Time: 10:17 AM
  
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;

using System.Security.Claims;
using System.Text;
using System.Configuration;

using System.Collections.Generic;

namespace Excel.Visap.Security

{
	/// <summary>
	/// Description of JwtToken.
	/// </summary>
	public class JwtToken:Excel.Visap.Security.ITokenManager
	{
		
		
		
		public string GenerateToken(Dictionary<string,string> tokendetails)
		{
			try{
				var payload = new Dictionary<string, object>()
				{
					{"videoId",tokendetails["videoId"]},
					{"createdDate",(DateTime.UtcNow)}
					
				};
				JWTEncryptionManager encryptObj=new JWTEncryptionManager();
				//we need to pass 3 parameters to generate jwt token 1.payload,2.securitykey,3.type f algorithm.
				return encryptObj.JwtEncode(payload, tokendetails["SecurityKey"], JWT.JwtHashAlgorithm.HS256);
				
			}
			catch(Exception ex){
				return ex.Message;
			}
		}
		
		public bool ValidateToken(string token){
			
			try{
				
				JWTEncryptionManager decryptObj=new JWTEncryptionManager();
				//To decrypt jwt token need to pass encrypted token and securitykey.
				IDictionary<string, object> jsonPayload =decryptObj.JwtDecode(token, ConfigurationManager.AppSettings["SecurityKey"]);
				
				int diffrenceTime = DateTime.Now.Subtract(Convert.ToDateTime(jsonPayload["createdDate"]).ToLocalTime()).Minutes;
				return (Convert.ToInt32(tokenExpiry) >= diffrenceTime);
				
			}
			catch(Exception ex){
				return false;
			}

		}
		
		public string Decrypt(string token,string key)
		{
			string videoId = string.Empty;
			try {
				
				var decryptObj = new JWTEncryptionManager();
				//To decrypt jwt token need to pass encrypted token and securitykey.
				IDictionary<string, object> jsonPayload = decryptObj.JwtDecode(token, ConfigurationManager.AppSettings["SecurityKey"]);
				//get videoID from object.
				videoId = jsonPayload["videoId"].ToString();
				
			} catch (Exception ex) {
				throw new ApplicationException("Video token is not valid " + ex.Message);
			}
			return videoId;
		}
		
		private static string tokenExpiry {
			get {
				return ConfigurationManager.AppSettings["TokenExpiryTime"];
			}
		}
		
	}
	
	
}