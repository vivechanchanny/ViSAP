using System.Linq;
using System;
using Excel.Workspace.StoreConsants;
using System.Web;
using  Excel.Workspace.Users;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Workspace;
using System.IO;
using Newtonsoft.Json.Linq;
using ViSapWorkspace.services;
using Excel.Workspace.DataAccessLayer;


namespace ViSapWorkspace
{
	public class AssignVideo : BaseHttpHandler
	{
		
		public bool IsReusable
		{
			get { return false; }
		}
		
		protected override void Save(HttpContext context)
		{
			try
			{
				Assign assingObj = new Assign();
				var objAuth = new AuthService();
				
				var request = context.Request;
				//it should be post request in assign.do and it should contain X-Authorization token
				if (request.HttpMethod == "POST" && request.Headers.AllKeys.Contains("X-Authorization"))
				{
					//GetUserValueToken method will get the userid based on X-Authorization
					var userDetails = objAuth.GetUserValueToken(request);
					string userId = userDetails.UserID;
					if(request.Headers.AllKeys.Contains("X-Assign"))   //Sending X-Assign parameter from client to differentiate between create and getting assignment object from Assign collection.
					{
						var assignedData = request.Form["data"];    //request Form data contains assignment object
						if(assignedData == null){
							using (var inputStream = new StreamReader(context.Request.InputStream))
							{
								assignedData = inputStream.ReadToEnd();
							}
						}
						if (assignedData != null)
							context.Response.Write(assingObj.updateAssignment(assignedData, userId)); //updateAssignment will update the assign collection both in create and edit mode of assignment
					}else{
						var videoId = request.Form["videoId"];   //sending videoId from the client to get respective assignment details.
						context.Response.Write(assingObj.getAssignment(videoId).ToString());  //This method will give the assignment details based on the videoId.
					}
				}
				else
				{
					context.Response.StatusCode = Constants.HTTP_BAD_REQUEST;
				}
			}
			catch(Exception ex)
			{
				VisapLogger.LogError(ex);
				throw new VisapException("Error in assign.do");
			}
		}
		/// <param name="context"></param>
		protected override void Get(HttpContext context)
		{
			Assign assingObj = new Assign();
			var request = context.Request;
			var videoId = request.Form["videoId"];   //sending videoId from the client to get respective assignment details.
			if (videoId == null ) {
				videoId = request.Headers["videoId"];
				
			}
			context.Response.Write(assingObj.getAssignment(videoId).ToString());  //This method will give the assignment details based on the videoId.
			
			
		}
		
		/// <summary>
		/// Delete
		/// </summary>
		/// <param name="context"></param>
		protected override void Delete(HttpContext context)
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
		
		
		
	}
	
}