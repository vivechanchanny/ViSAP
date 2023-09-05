using Excel.Visap.StoreConsants;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Excel.Visap.User;
using System.Web;
using Excel.Visap.Security;
 
namespace ViTag.svc
{
    public class ServiceUtility
    {
        /// <summary>
        /// If Isstage parameter is true username is stage else logged in user name is returned
        /// </summary>
        /// <param name="request">HttpRequest</param>
        /// <returns>User name</returns>

        public static String[] GetUserValueToken(HttpRequest request)
        {
            //if isstage is true username is stage else take appropriate username
            string[] returnUserid = new string[Constants.Auth_Separator.Length+1];
            if (request.Headers["isStage"] == "true")
            {
            	string uname= ConfigurationManager.AppSettings["Stage"];
            	User objUserEntity = new User();
                returnUserid[0] = objUserEntity.GetUserId(uname);
            }
            else
            {
                if (request.Headers.AllKeys.Contains("X-Authorization"))
                {
                    var encryptedToken = request.Headers.GetValues("X-Authorization")[0];
                    if (encryptedToken != "null")
                    {
                        if (encryptedToken == ConfigurationManager.AppSettings["Stage"])
                        {
                            returnUserid[0] = ConfigurationManager.AppSettings["Stage"];
                        }
                        else
                        { 
                           var type = ConfigurationManager.AppSettings["EncryptType"];
			               var cryptoManager = EncryptionProvider.GetProvider(type);                      	
                           string encryptionKey = ConfigurationManager.AppSettings["crypt"];
                           var uname = cryptoManager.Decrypt(encryptedToken, encryptionKey);
                           returnUserid = uname.Split(Constants.Auth_Separator.ToCharArray());
                        }
                    }
                }               

            }
            return returnUserid;
        }
    }
}