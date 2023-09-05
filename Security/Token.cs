
using System;
using System.Configuration;
using System.Collections.Generic;


namespace  Excel.Visap.Security
{
	/// <summary>
	/// Description of TokenGenerator.
	/// </summary>
	public class Token:Excel.Visap.Security.ITokenManager
	{
		public const String token_Separator = "|";
		
		public string GenerateToken(Dictionary<string,string> values)
		{
			//(ToDO): Implement exception handler
			return encryptDecrypt(values["videoId"] + token_Separator + DateTime.Now, true);
		}
		
		public bool ValidateToken(string token)
		{
			//(ToDO): Implement exception handler
			try {
				var timestamp = GetDecryptedToken(token);
				int diffrenceTime = DateTime.Now.Subtract(Convert.ToDateTime(timestamp.TimeStamp)).Minutes;
				var tokenExpiryTime = Convert.ToInt32(tokenExpiry);
				
				return (tokenExpiryTime >= diffrenceTime);
				
			} catch (Exception) {
				return false;
			}
		}
		
		private static string tokenExpiry {
			get {
				return ConfigurationManager.AppSettings["TokenExpiryTime"];
			}
		}
		
		private TokenResult GetDecryptedToken(String token)
		{
			var decryptedString = encryptDecrypt(token, false);
			var decryptedToken = new TokenResult();
			decryptedToken.TimeStamp = DateTime.Parse(decryptedString.Split(char.Parse(token_Separator))[1]);
			return decryptedToken;
		}
		
		private string encryptDecrypt(string value, bool encrypt)
		{
			var encryptionKey = ConfigurationManager.AppSettings["crypt"];
			var type = ConfigurationManager.AppSettings["EncryptType"];
			var cryptoManager = EncryptionProvider.GetProvider(type);
			
			return encrypt ? cryptoManager.Encrypt(value, encryptionKey) : cryptoManager.Decrypt(value, encryptionKey);
			
		}
		
		private class TokenResult
		{
			public DateTime TimeStamp { get; set; }
		}
		
		
	}
}
