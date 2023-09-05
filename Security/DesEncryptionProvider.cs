using System;
using System.IO;
using System.Text;
using System.Configuration;
using System.Security.Cryptography;

namespace Excel.Visap.Security
{
	public class DesEncryptionProvider : IEncryptionProvider
    {
        private  byte[] Key = {};
       
        public string Encrypt(string stringToEncrypt, string SEncryptionKey)
        {

            try
            {
                Key = System.Text.Encoding.UTF8.GetBytes(SEncryptionKey);
                byte[] IV=GetKey();
                var ObjDes = new DESCryptoServiceProvider();
                byte[] InputByteArray = Encoding.UTF8.GetBytes(stringToEncrypt);
                var ObjMS = new MemoryStream();
                var ObjCS = new CryptoStream(ObjMS, ObjDes.CreateEncryptor(Key, IV), CryptoStreamMode.Write);
                ObjCS.Write(InputByteArray, 0, InputByteArray.Length);
                ObjCS.FlushFinalBlock();
                return Convert.ToBase64String(ObjMS.ToArray());

            }
            catch (Exception Ex)
            {
                return Ex.Message;

            }

        }

        public string Decrypt(string stringToDecrypt, string sEncryptionKey)
        {
            stringToDecrypt = stringToDecrypt.Replace(" ", "+");
            byte[] inputByteArray = null;

            try
            {
                Key = System.Text.Encoding.UTF8.GetBytes(sEncryptionKey);
                byte[] IV=GetKey();
                var ObjDes = new DESCryptoServiceProvider();
                inputByteArray = Convert.FromBase64String(stringToDecrypt);
                var ObjMS = new MemoryStream();
                var ObjCS = new CryptoStream(ObjMS, ObjDes.CreateDecryptor(Key, IV), CryptoStreamMode.Write);
                ObjCS.Write(inputByteArray, 0, inputByteArray.Length);
                ObjCS.FlushFinalBlock();
                System.Text.Encoding Encoding = System.Text.Encoding.UTF8;
                return Encoding.GetString(ObjMS.ToArray());
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        
        //Get key from config file and convert to bytes.
		private static byte[] GetKey(){
		   
		  var key=ConfigurationManager.AppSettings["SecurityKey"];
	      byte[] value = Encoding.UTF8.GetBytes(key);
		  return value;
			
		}
    }
}
