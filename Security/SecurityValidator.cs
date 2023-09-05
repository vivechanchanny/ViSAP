
using System;
using System.Web;
using System.Configuration;
using System.Collections.Generic;
using Excel.Visap.Log;

namespace Excel.Visap.Security
{
	/// <summary>
	/// Description of SecurityValidator.
	/// </summary>
	public class SecurityValidator :IHttpModule
	{
		/// <summary>
		/// You will need to configure this module in the Web.config file of your
		/// web and register it with IIS before being able to use it. For more information
		/// see the following link: http://go.microsoft.com/?linkid=8101007
		/// </summary>
		#region IHttpModule Members
		bool skipUrlReferrerValidation = true;
		public void Dispose()
		{
			//clean-up code here.
		}

		public void Init(HttpApplication context)
		{
			context.BeginRequest += context_BeginRequest;
		}
		
		
		void context_BeginRequest(object sender, EventArgs e)
		{
			
			//ToDo Implement exception handling
			
			var app = (HttpApplication)sender;
			var request = app.Context.Request;
			var response = app.Context.Response;
			
			
			var url = request.Url.Host.ToLower();
			//var referrer = getRefUrl(request).ToLowerInvariant();
			bool isValidReferrer = validateReferrer(url,request);
			
			if (isVideoRequest(request) &&
			    (!isValidReferrer ||
			     !this.validateToken(HttpUtility.UrlDecode(request.QueryString["t"])) ||
			     !this.ValidateUser(request))) {
				response.Clear();
				response.StatusCode = (int)System.Net.HttpStatusCode.Forbidden;
				response.StatusDescription = "Unauthorized to view the video!";
				response.End();
			}
		}
		
		private bool isVideoRequest(HttpRequest req)
		{
			VisapSecurityLogger.LogDebug("Current ExecutionFile PathExtension   ==" +req.CurrentExecutionFilePathExtension);
			return (req.CurrentExecutionFilePathExtension == ConfigurationManager.AppSettings["videoFormat"]);
		}
		
		private bool validateReferrer(string url,HttpRequest req)
		{
		    
			if(!skipUrlReferrerValidation){
				string urlReferrer = (req.UrlReferrer != null) ? req.UrlReferrer.Host : string.Empty;
				VisapSecurityLogger.LogDebug("Validate referrer: url  ==" + url + "urlReferrer ==" + urlReferrer);
				if(url == urlReferrer ){
					return true;
				} 
				return false;
			}else{
				return true;
			}
		}
		
		private bool ValidateUser(HttpRequest request)
		{
			var tokenValue="";
			//while validating user, if the videotokentype is jwt then we need to use original encryption method to encode the token,
			//because from visap to workspace we need to pass encrypted usertoken and videotoken.
			if(ConfigurationManager.AppSettings["VideoTokenType"]=="Jwt")
			{
				//step1: decoding the token using JWT
				JWTEncryptionManager jwtObj=new JWTEncryptionManager();
				var decryptedJwtToken=jwtObj.JwtDecode(request.QueryString["t"],ConfigurationManager.AppSettings["SecurityKey"]);
				
				//step2:create dictionary object and covert from Idictionary<string,object> to Dictionary<string,string>
				Dictionary<string,string> newObj=new Dictionary<string,string>(decryptedJwtToken.Count);
				newObj.Add("videoId",Convert.ToString(decryptedJwtToken["videoId"]));
				
				//step3:pass the tokenobj and generate video token from normal encryption mangaer.
				Token tokenObj=new Token();
				tokenValue=HttpUtility.UrlDecode(tokenObj.GenerateToken(newObj));
			}else{
				tokenValue=HttpUtility.UrlDecode(request.QueryString["t"]);
			}
			
			var token = request.Cookies["authToken"].Value;
			var userValidator = getUserValidator();
			return userValidator == null || userValidator.ValidateUser(token,tokenValue);
			
		}
		
		private IUserValidator getUserValidator()
		{
			var typeName = ConfigurationManager.AppSettings["UserValidator"];
			if (string.IsNullOrEmpty(typeName))
				return null;
			
			var obj = System.Activator.CreateInstance(Type.GetType(typeName));
			
			if (obj != null && obj.GetType().GetInterface(typeof(IUserValidator).FullName) != null)
				return (IUserValidator)obj;
			else
				throw new ApplicationException("Cannot instantiate User Validator");
		}
		
		private bool validateToken(string token){
			if(ConfigurationManager.AppSettings["VideoTokenType"]=="Jwt")
			{
				JwtToken tokenObj=new JwtToken();
				bool isValidToken = tokenObj.ValidateToken(token);
				VisapSecurityLogger.LogDebug(" is valid video token ==" + isValidToken);
				return isValidToken;
			}
			else{
				var objToken = new Token();
				return objToken.ValidateToken(token);
				
			}
			
		}
		
		#endregion
	}
}