using System.Web;
using System.Configuration;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using System.IO;
using System;
using System.Linq;
using MongoDB.Bson;
using Excel.Visap.Security;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.Enum;
using ViSapWorkspace.services;

namespace ViSapWorkspace
{
	
	
	public class QuestionResponse: BaseHttpHandler
	{
		
		/// <summary>
		/// Save response
		/// </summary>
		/// <param name="context">HttpContext</param>
		
		protected override void Save(HttpContext context){
			
			try
			{
				
				var request = context.Request;
				var data = request.Form["data"];
				var objAuth = new AuthService();
				
				var userDetails = objAuth.GetUserValueToken(request); //Decrypt the token and get the userid from token.
				var userID= userDetails.UserID;
				var loggedinrole = userDetails.UserRole;
				Enumerations.Roles role = (Enumerations.Roles)Enum.Parse(typeof(Enumerations.Roles),loggedinrole);
				if(userID!=null && role == Enumerations.Roles.Student){
					questResponse responseObj=new questResponse("QuestResponse");
					var questResponse = responseObj.getResponseData(data,userID);
					responseObj.save(questResponse);
				}
				
			}
			catch (Exception ex)
			{
				VisapLogger.LogError(ex);
				throw new VisapException("Error while storing question response");
				
			}
		}
		/// <summary>
		/// get response
		/// </summary>
		/// <param name="context"></param>
		protected override void Get(HttpContext context)
		{
			try {
				var responseObj=new questResponse("QuestResponse");
				
				var VideoID = context.Request["ID"];
				var userID = context.Request["UserID"];
				var isresponseheader = context.Request["isresponseheader"];
				var objAuth = new AuthService();
				
				var userDetails = objAuth.GetUserValueToken(context.Request); //Decrypt the token and get the userid from token.
				var loggedinrole = userDetails.UserRole;
				 
				Enumerations.Roles role = (Enumerations.Roles)Enum.Parse(typeof(Enumerations.Roles),loggedinrole);
				// get the main level of quest response
				if(isresponseheader == "true"){
					context.Response.Write(responseObj.GetResponseHeader(VideoID,userID,role));
				}
				// get the details level data
				else{
					context.Response.Write(responseObj.GetResponseDetails(VideoID,userID));
				}
				
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				this.RespondInternalError(context);
			}
			
		}
		
		/// <summary>
		/// update
		/// </summary>
		/// <param name="context"></param>
		protected override void Update(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		/// <summary>
		/// delete
		/// </summary>
		/// <param name="context"></param>
		protected override void Delete(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		
	}
}