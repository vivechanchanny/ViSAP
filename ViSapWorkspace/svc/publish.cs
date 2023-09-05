using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.SearchAccess;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.MetaDataAccess;
using Excel.Workspace.VideoAccess;
using System.Linq;
using Excel.Workspace.Common.Utilities;
using ViSapWorkspace.services;
using System;


namespace ViSapWorkspace
{
	public class Publish : BaseHttpHandler
	{
		#region ProcessRequest
		/// <summary>
		/// Logic to process the request based on request type
		/// </summary>
		/// <param name="context">HttpContext</param>
		protected override void Save(HttpContext context)
		{
			try
			{
				var request = context.Request;
				string userid = string.Empty;
				Video objVideo = new Video();
				var objAuth = new AuthService();
				
				var data = request.Form["d"];
				var userDetails = objAuth.GetUserValueToken(request);
				userid = userDetails.UserID;
				objVideo.PubishVideo(data, userid);
				VisapLogger.LogInfo("publish:ProcessRequest:The user who is publishing the video..."+userid);
			}
			catch (Exception ex)
			{
				VisapLogger.LogError(ex);
				this.RespondInternalError(context);
			}
		}
		#endregion
		
		/// <summary>
		/// Get
		/// </summary>
		/// <param name="context"></param>
		protected override void Get(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		/// <summary>
		/// Update
		/// </summary>
		/// <param name="context"></param>
		protected override void Update(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		/// <summary>
		/// Delete
		/// </summary>
		/// <param name="context"></param>
		protected override void Delete(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		
	}
}