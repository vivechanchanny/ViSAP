using System.Web;
using System.Web.Script.Serialization;
using Excel.Workspace.MetaDataAccess;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.Users;
using System.Linq;
using MongoDB.Bson;
using Excel.Workspace.VideoAccess;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.AelibQuestion;
using Excel.Workspace.DataAccessLayer;
using System.Collections.Generic;
using ViSapWorkspace.svc;
using ViSapWorkspace.services;
using System;

#region Metadata HttpHandler
namespace ViSapWorkspace
{
	public class Metadata : BaseHttpHandler
	{
		
		/// <summary>
		/// Handler poccesing for differnt type of requests
		/// </summary>
		/// <param name="context">HttpContext</param>
		protected override void Save(HttpContext context)
		{
			try{
				
				var objMetadata = new VideoMetaData();
				var objVideo=new Video();
				var objAelib=new AelibQuestion();
				var objQuestResp= new questResponse("QuestResponse");
				var objAuth = new AuthService();
				
				var request = context.Request;
				var data = request.Form["d"];
				var questionId = request.Form["questionId"];
				var fileNames=request.Form["fileNames"];

				
				string mode = "";
				string vidId=string.Empty;
				var userDetails = objAuth.GetUserValueToken(request);
				string uname=string.Empty;
				if(userDetails.IsStage==Constants.IsStage)
					uname=userDetails.IsStage;
				else
					uname = userDetails.UserID;
				
				if (request.Headers.AllKeys.Contains("isStage"))
					mode  = request.Headers["isStage"].ToString();
				
				if (data != null)
				{
					objMetadata.UpdateLegacyCollection(data);
					var vidInfo = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(data);
					foreach (var video in vidInfo)
					{
						vidId=video.ToBsonDocument().GetElement("_id").Value.ToString();
					}
					objVideo.UpdateDateTime(vidId);
					 //Delete Questions from AelibQuestion collection.
                         if(!(string.IsNullOrEmpty(questionId))){
                            var questionIds = new JavaScriptSerializer().Deserialize<List<string>>(questionId);
                            objAelib.DeleteQuestions(questionIds);
                            objQuestResp.DeleteQuestResponse(questionIds);
                            
                         }
                         //Delete Images from img repo while deleting metadata.
                         if(!(string.IsNullOrEmpty(fileNames))){
                         	var objFile=new FileManager();
                            var imagefiles = new JavaScriptSerializer().Deserialize<List<string>>(fileNames);
                         	objFile.DeleteImages(imagefiles);
                         	 
                         }
					context.Response.Write(objMetadata.Save(data, uname, mode));
				}
				
			}
			catch(Exception ex)
			{
				VisapLogger.LogError(ex);
				this.RespondInternalError(context);
			}
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
		/// Get Metadata
		/// </summary>
		/// <param name="context"></param>
		protected override void Get(HttpContext context)
		{
			try {
				VideoMetaData objMetadata = new VideoMetaData();
				var VideoID = context.Request["ID"];
				context.Response.Write(objMetadata.GetVideosByID(VideoID));
				
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				this.RespondInternalError(context);
			}
		}
		
		/// <summary>
		/// update metadata
		/// </summary>
		/// <param name="context"></param>
		protected override void Update(HttpContext context)
		{
			throw new NotImplementedException();
		}

	}
}
#endregion