using System;
using System.Net;
using System.Configuration;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace ViTag.svc
{
	/// <summary>
	/// Description of UserValidator.
	/// </summary>
	public class UserValidator: Excel.Visap.Security.IUserValidator
	{
		public bool ValidateUser(string userToken,string videoToken)
		{
			try{
			var url =  ConfigurationManager.AppSettings["UserTokenValidatorEndpoint"];
			// Create Request Object
			var req = System.Net.WebRequest.Create(url);
			
			// Set Request Method
			req.Method = "POST";
			
			// Create Stream of data to be written to the request object
			var stm = req.GetRequestStream();
			
			Dictionary < string, string > token = new Dictionary < string, string > ();
			token.Add("userToken",userToken);
			token.Add("videoToken",videoToken);
			string JsonString = (new JavaScriptSerializer()).Serialize(token);
			
			var buffer = System.Text.Encoding.UTF8.GetBytes(JsonString);
			
			// Write POST data to reqest
			stm.Write( buffer, 0, buffer.Length);

			// Get Response
			var res = (System.Net.HttpWebResponse)req.GetResponse();
			
			return (res.StatusCode == System.Net.HttpStatusCode.OK);
			}
			catch(Exception ex){
				return false;
			}
		}
	}
}
