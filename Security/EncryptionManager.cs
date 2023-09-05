using System;
 
namespace Excel.Visap.Security
{
	public static class EncryptionProvider
	{
		
		public static dynamic GetProvider(string type)
		{
			try {
				switch (type) {
					case Constants.AES:
						return new AesEncryptionProvider();
                
					case Constants.TDEA:
						return new TripleDesEncryptionProvider();
                
					case Constants.DES:
						return new DesEncryptionProvider();  
					
					case Constants.Jwt:
						return new JwtToken();
					
					default:
						return null;
				}
			} catch (Exception ex) {
			   throw new ApplicationException("Error in getting Encryprtion provider "+ ex.Message);
			}
		}
		
        
		public static class Constants
		{
			public const string AES = "aes";
			public const string TDEA = "tdea";
			public const string DES = "des";
			public const string Jwt ="Jwt";
		}
  
	}
}