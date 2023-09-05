
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Threading;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.IO;
using System.Configuration;
using Excel.Visap.Security;

namespace VisapInt
{

	public class launch : Page
	{

		private const string QS_TOKEN = "t";
		private const string Auth_Separator = "|";



		protected void Page_Load(Object sender, System.EventArgs e)
		{

			try
			{
				UserInfo user = getUserInfo();
				
				if (user == null) {
					
					SetNoAccess();
					
				} else {
					var userToken = GetTokenForUserData(user.UserId + Auth_Separator + user.Role + Auth_Separator + DateTime.Now);
					var myCookie = new HttpCookie("authToken");
					myCookie.Value=userToken;
					Response.Cookies.Add(myCookie);
					Response.Write("<script type=\"text/javascript\">" + "sessionStorage.setItem('authT', '" + userToken + "');" + "</script>");
				}
				
			} catch(System.Threading.ThreadAbortException tEx) {
				System.Diagnostics.Debug.WriteLine(tEx.Message);
			} catch (Exception ex) {
				Response.Write(string.Format("<h2>No Access</h2> {0}<br/>{1}<br/>{2}", ex.GetType().FullName, ex.Message, ex.StackTrace));
			}

		}


		private UserInfo getUserInfo(){
			
			var token = Request.QueryString[QS_TOKEN];
			if (!string.IsNullOrEmpty(token))
			{
				var extUser = getExternalUserDetails(token);
				string[] info = extUser.Split('|');
				if (info.Length == 3){
					var user = new UserInfo();
					user.UserName = info[0];
					user.Role = info[1];
					user.UserId = info[2];
					return user;
				}
				
			}

			return null;
		}
		
		private string getExternalUserDetails(string token){
			
			try{
				var req = System.Net.WebRequest.Create(string.Format(ConfigurationManager.AppSettings["SSOValidatorUrl"], token));
				var res = req.GetResponse();
				
				var rs = new StreamReader(res.GetResponseStream());
				var result = rs.ReadToEnd();
				return result;
			}
			catch(Exception ex){
				//Response.Write(string.Format("Not valid token: {0}", ex.Message));
				return null;
			}
			
		}

		private string GetTokenForUserData(string userName)
		{
			string encryptionKey = ConfigurationManager.AppSettings["crypt"];
			var type= ConfigurationManager.AppSettings["EncryptType"];
			var cryptoManager = EncryptionProvider.GetProvider(type);
			var token = cryptoManager.Encrypt(userName, encryptionKey);
			return token;
		}
		
		private void SetNoAccess(){
			try
			{
				Response.Clear();
				Response.StatusCode = (int)System.Net.HttpStatusCode.Forbidden;
				Response.StatusDescription = "Unauthorized to view the video!";
				Response.End();
			}
			catch(System.Threading.ThreadAbortException tEx){
				System.Diagnostics.Debug.WriteLine(tEx.Message);
			}
		}


		private class UserInfo
		{
			public string UserName { get; set; }
			public string Role { get; set; }
			public string UserId { get; set; }
		}
		
		protected string  getCss() {
			 return string.Format(ConfigurationManager.AppSettings[Request.QueryString[2]]); //QueryString[2] is for cid(client id)
		}


	}
}
