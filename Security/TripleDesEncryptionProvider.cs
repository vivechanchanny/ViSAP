using System;
using System.IO;
using System.Text;
using System.Security.Cryptography;

namespace Excel.Visap.Security
{
    public class  TripleDesEncryptionProvider :  IEncryptionProvider
    {
        public string Encrypt(string value, string key)
		{
        	string data=string.Empty;
        	
			try
			{
				if(validate(value,key)){
				    byte[] toEncryptArray = Encoding.UTF8.GetBytes(value);
				    var resultArray= encryptDecrypt(toEncryptArray,key,true);
				    data= Convert.ToBase64String(resultArray, 0, resultArray.Length);
				}
				
			}
			catch (Exception Ex)
			{
				return Ex.Message;
			}
			return data;
		}

		public string Decrypt(string value, string key)
		{
			string data=string.Empty;
			
			try
			{
				if(validate(value,key)){
					
				byte[] toEncryptArray = Convert.FromBase64String(value.Replace(" ", "+"));
				data= Encoding.UTF8.GetString(encryptDecrypt(toEncryptArray,key,false));
				
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			return data;
		}
		
		private Boolean validate(string value,string key){
			
			 if (string.IsNullOrEmpty(key)){
				throw new ArgumentNullException("key");
			}
			if (string.IsNullOrEmpty(value)){
				throw new ArgumentNullException("value");
			}
			return true;
		}
		
		private byte[] encryptDecrypt(byte[] data, string key, bool encrypt)
		{
			byte[] keyArray;
			byte[] resultArray;
			
			var hashmd5 = new MD5CryptoServiceProvider();
			keyArray = hashmd5.ComputeHash(Encoding.UTF8.GetBytes(key));
			hashmd5.Clear();
			
			var tdes = new TripleDESCryptoServiceProvider();
			tdes.Key = keyArray;
			tdes.Mode = CipherMode.ECB;
			tdes.Padding = PaddingMode.PKCS7;
			
			ICryptoTransform cTransform = encrypt ? tdes.CreateEncryptor() : tdes.CreateDecryptor();
			
			resultArray = cTransform.TransformFinalBlock(data, 0, data.Length);

			tdes.Clear();

			return resultArray;
		}
    }
}
