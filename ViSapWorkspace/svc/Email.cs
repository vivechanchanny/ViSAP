using System;
using Excel.Workspace.StoreConsants;
using System.Web;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Users;
using Excel.Visap.Security;
using System.Configuration;
using System.Net.Mail;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
 
namespace ViSapWorkspace
{
	/// <summary>
	/// Description of Email.
	/// </summary>
	public class Email: BaseHttpHandler
	{
       
		public bool IsReusable {
			get { return false; }
		}

		protected override void Save(HttpContext context)
		{
          
			try {
				
				var request = context.Request;
				string userId = string.Empty;
				//Creating an object to access the visapDal method(getuserIdFromEmail)
	        	 
				string jsonString = null;
				using (var inputStream = new StreamReader(context.Request.InputStream)) {
					jsonString = inputStream.ReadToEnd();
				}
				dynamic data = JObject.Parse(jsonString);
				
				bool ng = data.ng;
				string emailAddress = data.emailAddress;
				
				var obj = new ValidateEmail();
				 
				var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };    
				
				try {
					userId = obj.getUserIdfromEmail(emailAddress);
				} catch (Exception ex) {
					context.Response.Write(_jsserializer.Serialize("Error while decrypting the token,Please try again later."));
					return;
				}
				//if the userid is null means, the emailid is not registered
				if (userId != null) {
					try {
						sendMail(emailAddress, getToken(userId), Convert.ToBoolean(ng));
						
					} catch (Exception ex) {
						context.Response.Write(_jsserializer.Serialize("Error while sending email,Please try again later."));
						return;
					}
				} 
				context.Response.StatusCode = (int)System.Net.HttpStatusCode.OK;
				context.Response.Write(_jsserializer.Serialize("Reset password link has been sent,if this email has been registered with us!"));
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				context.Response.Write(ex.Message);
			}
		}
        
		/// <summary>
		/// Update Video Collections
		/// </summary>
		/// <param name="context"></param>
		protected override void Get(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		
		/// <summary>
		/// Update Video Collections
		/// </summary>
		/// <param name="context"></param>
		protected override void Delete(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		/// <summary>
		/// Update Video Collections
		/// </summary>
		/// <param name="context"></param>
		protected override void Update(HttpContext context)
		{
			throw new NotImplementedException();
		}
        
		
		public override void RequiresAuthentication(HttpContext context) {
			return;
		}
		
		
		private string getToken(string userId)
		{
			try {
				//Getting the encryption key for token genration
				string encryptionKey = ConfigurationManager.AppSettings["crypt"];
				//Type of encryption
				var type = ConfigurationManager.AppSettings["EncryptType"];
				var cryptoManager = EncryptionProvider.GetProvider(type);
				//Get the encrypted token
				return cryptoManager.Encrypt(userId + Constants.Auth_Separator + DateTime.Now, encryptionKey);
			} catch (Exception ex) {
        		
				VisapLogger.LogError(ex);
				throw new VisapException("Error while taking the token to reset the password");
			}
        	
		}
		//To send mail to respective user email
		private void sendMail(string emailId, string token, bool ng)
		{

			try {

				var message = new MailMessage();
				var smtp = new SmtpClient();	
				//Send an email to the respective user emailid
				//Giving newworkcredentials (reading from web.config)
				//The below line of code is not required for server machine.              
				message.From = new MailAddress(ConfigurationManager.AppSettings["fromAddress"]);  
				message.To.Add(emailId);
                
				message.Subject = "Reset Password";  
				//sending resetpassword link to reset the password.
				 
				if (ng) {
					message.Body = "Please click on this link to Reset Password: <a href=" + "\"" + ConfigurationManager.AppSettings["ngResetPwdURL"] + token + "\"" + ">" + ConfigurationManager.AppSettings["ngResetPwdURL"] + token + "</a>";
				} else {
					message.Body = "Please click on this link to Reset Password: <a href=" + "\"" + ConfigurationManager.AppSettings["resetPwdURL"] + token + "\"" + ">" + ConfigurationManager.AppSettings["resetPwdURL"] + token + "</a>";
				}
                
				message.IsBodyHtml = true;
				smtp.Send(message);
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				throw new VisapException("Error while sending the mail to reset passowrd");
			}
		}
		
	}
}
