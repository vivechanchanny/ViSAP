using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.IO;
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
using ViSapWorkspace.services;


#region Videos HttpHandler
namespace ViSapWorkspace
{
	public class Videos : BaseHttpHandler
	{

		/// <summary>
		/// Processing request based on the type of the request
		/// videos will be saved/deleted/selection of videos
		/// </summary>
		/// <param name="context">HttpContext</param>
		protected override void Save(HttpContext context)
		{
			var objVideo = new Video();
			var objAuth = new AuthService();
			var request = context.Request;
			
			//TODO: Data being passed with different names.
			// And the name of form key decides the type of data,
			// and accordingly saves to video or timeline.
			// This is very fragile, and the logic needs to be changed
			var data = request.Form["d"];
			string isUpload = request.Form["isUpload"];
			 
			
			var timelinedata = request.Form["data"];
			var userDetails = objAuth.GetUserValueToken(request);
			string userid = userDetails.UserID;
			var capObj = new Caption();
			var parseObj = new CaptionParser();
			var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
			 
			if (data == null && timelinedata == null) {
				using (var inputStream = new StreamReader(context.Request.InputStream)) {
					dynamic jsondata = JObject.Parse(inputStream.ReadToEnd());
					data = jsondata.d;
					isUpload = jsondata.isUpload;
				}	
			}
			
			try {
				
				if (data != null) {
					JArray vidData = JArray.Parse(data);
					string capFileName = string.Empty;
					var videoid = vidData[0]["_id"];
					var caption = vidData[0]["caption"];
					
					// if caption is equal to null then it is unable to convert it to string.
					if (caption != null) {
						capFileName = caption.ToString();
					}
					
					//video and metadata save
					data = data.Replace("\"", "'");
					VisapLogger.LogDebug("Videos:Saving/updating the Video for the userid:" + userid);
					string videoID = objVideo.Save(data, userid, isUpload);
					
					//saving caption data only when the video is importing first time and caption file is uploaded
					if (videoid == null & capFileName != string.Empty) {
						//saving caption contents to db
						string capId = capObj.Save(capFileName);
						//updating captionId to video collection.
						objVideo.Save(videoID, capId);
					}
					
					context.Response.Write(_jsserializer.Serialize(videoID));
				} else if (timelinedata != null) {
					VisapLogger.LogDebug("Videos:Timeline:Saving/updating the timelinevideo:" + userid);
					timelinedata = timelinedata.Replace("\"", "'");
					context.Response.Write(objVideo.Save(timelinedata, userid, "false"));
				}  
				
				
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				this.RespondInternalError(context);
			}
		}
		 
		/// <summary>
		/// Get list of videos in vieo collections
		/// </summary>
		/// <param name="context"></param>
		protected override void Get(HttpContext context){
			 try {
					
					var objCreategroup = new CreateGroup();	
					var assignmentObj = new Assign();	
					var objVideo = new Video();	
					var objAuth = new AuthService();
					
					string mode = "";
					string ismyspacevideo = "";
					var request = context.Request;
					var userDetails = objAuth.GetUserValueToken(request);
			     	string userid = userDetails.UserID;
					
					
					// check the user belongs to which group
					var grouplist = objCreategroup.GetGroupbyMappedUsers(userid);
					
					// get the videos from assignment collection for logged in user and group
					var videoslist = assignmentObj.GetVideosList(userid, grouplist);
					
					if (request.Headers.AllKeys.Contains("isStage")) {
						mode = request.Headers["isStage"].ToString();
					}
					
					if (request.Headers.AllKeys.Contains("ismyspacevideo")) {
						ismyspacevideo = request.Headers["ismyspacevideo"].ToString();
					}
					//Get all the videos which matches from that videolist collections
					context.Response.Write(objVideo.GetVideosByUser(userid, mode, videoslist,ismyspacevideo));
			 	
			 } catch (Exception ex) {
			 	VisapLogger.LogError(ex);
				this.RespondInternalError(context);
			 }
		}
		
		
		/// <summary>
		/// Update Video Collections
		/// </summary>
		/// <param name="context"></param>
		protected override void Update(HttpContext context){
			throw new NotImplementedException();
		}
		
		/// <summary>
		///  Delete Video
		/// </summary>
		/// <param name="context"></param>
		protected override void Delete(HttpContext context){
			try {
     			var vidId =  context.Request.Form["deleteID"];//get video id.
				VisapLogger.LogDebug("DeleteVideo:deleting data from Video header:" + vidId);
				
				var serviceVidObj = new services.VideoService();
				serviceVidObj.Delete(vidId);

				context.Response.StatusDescription = "Video deleted successfully!";
				context.Response.Write(context.Response.StatusDescription);
				
			} catch (ApplicationException apEx) {
				context.Response.StatusCode =  Constants.HTTP_BAD_REQUEST;
				context.Response.StatusDescription = apEx.Message;
			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				this.RespondInternalError(context);
			}
			
		}
	}
}
#endregion