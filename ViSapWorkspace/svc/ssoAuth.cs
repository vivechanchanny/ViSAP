using System.Web;
using Excel.Workspace.Common.Utilities;
using System;

namespace ViSapWorkspace
{
	public class ssoAuth : BaseHttpHandler
	{
       
		protected override void Save(HttpContext context)
		{
			try {
				
				var request = context.Request;
				var objAuthService = new services.ssoAuthService();
				 
				//Get auth and video tokens.
				var authToken = request.Form["authToken"];
				var videoToken = request.Form["videoToken"];
				
				//Validate both tokens, if tokens are validated send user information and videoID.
				var jsonData = objAuthService.ValidateTokens(authToken, videoToken);
				 
				context.Response.Write(jsonData);
				context.Response.StatusCode = (int)System.Net.HttpStatusCode.OK;
            	  
			 
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("ssoAuth:Error while authentication token." + ex.Message);
				context.Response.StatusCode = (int)System.Net.HttpStatusCode.Forbidden;
				throw new ApplicationException(ex.Message);
			}
		}
		
		protected override void Get(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		protected override void Update(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		protected override void Delete(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		public override void RequiresAuthentication(HttpContext context)
		{
		   return;
		}
		
	}
   
}