using System;
using System.IO;
using System.Text;
using System.Configuration;
using System.Security.Cryptography;
 

namespace Excel.Visap.Security
{
	public class AesEncryptionProvider : IEncryptionProvider
	{

		public string Encrypt(string value, string key)
		{
			string result = string.Empty;

			try {
				// Get the bytes of the string
				byte[] bytesToBeEncrypted = Encoding.UTF8.GetBytes(value);
				byte[] bytesEncrypted = encryptDecrypt(bytesToBeEncrypted, key, true);
				result = Convert.ToBase64String(bytesEncrypted);
			} catch (Exception Ex) {
				return Ex.Message;
			}
			return result;
		}

		public string Decrypt(string value, string key)
		{
			string result = string.Empty;

			try {
				// Get the bytes of the string
				byte[] bytesToBeDecrypted = Convert.FromBase64String(value.Replace(" ", "+"));
				byte[] bytesDecrypted = encryptDecrypt(bytesToBeDecrypted, key, false);
				result = Encoding.UTF8.GetString(bytesDecrypted);
			} catch (Exception ex) {
				throw  new ApplicationException("token is not valid " + ex.Message );
			}
			return result;
		}

		private byte[] encryptDecrypt(byte[] data, string key, bool encrypt)
		{

			byte[] res = null;
			byte[] saltBytes = GetKey();
			byte[] configKey = Encoding.UTF8.GetBytes(key);
			configKey = SHA256.Create().ComputeHash(configKey);

			using (var ms = new MemoryStream()) {
				using (var AES = new RijndaelManaged()) {
					AES.KeySize = 256;
					AES.BlockSize = 128;

					var newkey = new Rfc2898DeriveBytes(configKey, saltBytes, 1000);
					AES.Key = newkey.GetBytes(AES.KeySize / 8);
					AES.IV = newkey.GetBytes(AES.BlockSize / 8);

					AES.Mode = CipherMode.CBC;

					var create = encrypt ? AES.CreateEncryptor() : AES.CreateDecryptor();

					using (var cs = new CryptoStream(ms, create, CryptoStreamMode.Write)) {
						cs.Write(data, 0, data.Length);
						cs.Close();
					}
					res = ms.ToArray();
				}
			}

			return res;

		}
		
		//Get key from config file and convert to bytes.
		private static byte[] GetKey()
		{
		   
			var key = ConfigurationManager.AppSettings["SecurityKey"];
			byte[] value = Encoding.UTF8.GetBytes(key);
			return value;
			
		}
		
		
	}
}