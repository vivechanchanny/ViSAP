/*
 * Created by SharpDevelop.
 * User: praveenkumar.tg
 * Date: 5/17/2017
 * Time: 3:26 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.MetaDataAccess;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.Users;
using Excel.Workspace.VideoAccess;
using Excel.Workspace.Workspace;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Excel.Visap.Security;
using ViSapWorkspace.services;

namespace ViSapWorkspace
{
	/// <summary>
	/// Description of BaseHttpHandler: Handler invoked by derived classes for their functionality
	/// </summary>
	/// 
	
	public abstract class BaseHttpHandler : IHttpHandler
	{
		/// <summary>
		/// Processs the incoming HTTP request.
		/// </summary>
		/// <param name="context">Context.</param>
		public void ProcessRequest(HttpContext context)
		{
			var method = GetRequestParameters(context);
			
			if (method == "OPTIONS")
				return;

			RequiresAuthentication(context);
			
			switch (method) {
				case "GET":
					this.Get(context);
					break;
				case "PUT":
					this.Update(context);
					break;
				case "POST":
					this.Save(context);
					break;
				case "DELETE":
					this.Delete(context);
					break;
			}
			
		}
		
		/// <summary>
		/// Indicates whether or not this handler can be
		/// reused between successive requests.
		/// </summary>
		/// <remarks>
		/// Return true if this handler does not maintain
		/// any state (generally a good practice).  Otherwise
		/// returns false.
		/// </remarks>
		public bool IsReusable
		{
			get
			{
				return true;
			}
		}
		/// <summary>
		/// Get method
		/// </summary>
		/// <param name="context"></param>
		protected  abstract void Get(HttpContext context);
		
		/// <summary>
		/// Save Video
		/// </summary>
		/// <param name="context"></param>
		protected  abstract void Save(HttpContext context);
		
		/// <summary>
		/// Update method
		/// </summary>
		/// <param name="context"></param>
		protected abstract void Update(HttpContext context);
		
		/// <summary>
		/// Delete method
		/// </summary>
		/// <param name="context"></param>
		protected abstract void Delete(HttpContext context);
		
		/// <summary>
		///  get the type of request parameters
		/// </summary>
		/// <param name="context">Context.</param>
		
		string GetRequestParameters(HttpContext context)
		{
			var requestType = context.Request.HttpMethod; //Get type of request.
			//check if it is delete/put request.
			if(context.Request.HttpMethod == "POST" && context.Request.Headers.AllKeys.Contains("X-HTTP-Method-Override") == true)
			{
				return requestType = context.Request.Headers.GetValues("X-HTTP-Method-Override")[0];
			}
			return requestType;
		}
		
		/// <summary>
		/// Gets a value indicating whether this handler
		/// requires users to be authenticated.
		/// </summary>
		/// <value>
		///    <c>true</c> if authentication is required
		///    otherwise, <c>false</c>.
		/// </value>
		public virtual void RequiresAuthentication(HttpContext context)
		{
			if (context.Request.Headers.AllKeys.Contains("X-Authorization") == true  ){
				var request = context.Request;
				var encryptedToken = request.Headers.GetValues("X-Authorization")[0];
				
				var objAuth = new AuthService();
				//get decrypted data(user details) from encryptedToken.
				var decryptedUserData = objAuth.GetDecryptedToken(encryptedToken);
				
				if (decryptedUserData.Contains("Invalid")){
					RespondForbidden(context);
					return;
				}
			}else{
				RespondForbidden(context);
				return;
			}
		}
		
		/// <summary>
		/// Helper method used to Respond to the request
		/// that the file was not found.
		/// </summary>
		/// <param name="context">Context.</param>
		protected void RespondFileNotFound(HttpContext context)
		{
			context.Response.StatusCode = Constants.HTTP_FileNotFound;
			context.Response.End();
		}
		
		/// <summary>
		/// Helper method used to Respond to the request
		/// that an error occurred in processing the request.
		/// </summary>
		/// <param name="context">Context.</param>
		protected void RespondInternalError(HttpContext context)
		{
			// It's really too bad that StatusCode property
			// is not of type HttpStatusCode.
			context.Response.StatusCode =  Constants.Internal_Server_Error;
			context.Response.End();
		}
		
		/// <summary>
		/// Helper method used to Respond to the request
		/// that the request in attempting to access a resource
		/// that the user does not have access to.
		/// </summary>
		/// <param name="context">Context.</param>
		protected void RespondForbidden(HttpContext context)
		{
			context.Response.StatusCode =  Constants.HTTP_Forbidden;
			context.Response.End();
		}
		
		
	}
	
}
