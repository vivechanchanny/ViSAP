using System;
using System.Linq;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.MetaDataAccess;
using Excel.Workspace.VideoAccess;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.AelibQuestion;
using System.Collections.Generic;

namespace ViSapWorkspace.services
{
	/// <summary>
	/// Description of videoService.
	/// Deleting video,metadata.
	/// Deleting repository-video,caption,snap,image.
	/// </summary>
	public class VideoService
	{
		 
		public void Delete(string id)
		{
			try {
				//Get video information.
				var video = (new Video()).GetVideoInfo(id);
				
				// Validate if the video can be deleted from the collection.
				ValidateVideoDeletion(video);
				
				//Delete video from different collections.
				DeleteVideoFromCollections(id);
				
				//Check video is published or assigned,if it used then no need to delete files.
				CheckVideoUsed(video);
			 
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("videoService.Delete:Error in deleting video" + ex.Message);
				throw new ApplicationException(ex.Message);
			}
		}
		
		//Check video is published or assigned,if it is not used then delete files and caption from collection.
		private void CheckVideoUsed(Video video)
		{
			//check for timeline and if video has any reference copy.
			if (video.sourcetype != Convert.ToInt32(Constants.sourceTypes.timeline) && video.CheckForRefernceVideo(video.src.ToString()).Count == 0) {
				//Delete caption from collection.
				DeleteCaption(video);
				//delete video files (video file,caption file, snap file in repository).
				DeleteVidFiles(video);
			}
		}
		
		//Delete video from different collections
		private void DeleteVideoFromCollections(string id)
		{
			//Delete video from collection.
			DeleteVid(id);
			//Delete from assign collection.
			DeleteAssignedVid(id);
			//Delete metadata from video and metadata collection.
			DeleteMetaDataFromVid(id);
		}
		
		private void ValidateVideoDeletion(Video video)
		{
			try {
				if (video.sourcetype == Convert.ToInt32(Constants.sourceTypes.timeline)) {
					return;//No need to validate further,timeline video can be deleted.
				}
				
				var videoFile = video.src.ToString();//get video file name.
				
				//If the video is not in staging, need to check if used in a timeline
				//If used in timeline, the video cannot be deleted
				if ((video.isstage == false) &&
				    (video.VideoUsedInTimeLine(videoFile, video.userid))) {
					throw new ApplicationException("Cannot delete since video is referenced in timeline.");
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("videoService.ValidateVideoDeletion:Error in validating if video is used in timeline." + ex.Message);
				throw new ApplicationException(ex.Message);
			}
		}
		
		#region DeleteVid
		private void DeleteVid(string id)
		{
			try {
				var vidObj = new Video();
				//Delete Video from collection.
				vidObj.DeleteVideo(id);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("videoService.DeleteVid:Error in deleting video." + ex.Message);
			}
		}
		#endregion
		
		#region DeleteMetaDataFromVid
		private void DeleteMetaDataFromVid(string id)
		{
			try {
				
				var objMetaData = new VideoMetaData();
				//	Check if metadata exits or not.
				if (objMetaData.CheckMetaDataExitsDelete(id)) {
					
					VisapLogger.LogDebug("videoService:DeleteMetaDataFromVid:Error in deleting data from metadata." + id);
					
					//Delete all questions from the video.
					DeleteQuestionsForVideo(id);
					 
					//Delete all images uploaded by ck-editor.
					DeleteImageFiles(id);
					
					//Delete metadata from collection.
					objMetaData.DeleteMetaData(id);
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("videoService.DeleteMetaDataFromVid:Error in deleting metadata." + ex.Message);
			}
		}
		#endregion
		
		#region DeleteQuestionsForVideo
		private void DeleteQuestionsForVideo(string id)
		{
			try {
				var objMetaData = new VideoMetaData();
				var objQues = new AelibQuestion();
				var objQuestResp= new questResponse("QuestResponse");
				//Get all question id's from metadata document.
				var questIds = objMetaData.GetQuestionIds(id);
			
				//Delete all questions.
				objQues.DeleteQuestions(questIds);
				objQuestResp.DeleteQuestResponse(questIds);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("VideoService.DeleteQuestionsForVideo:Error in deleting questions." + ex.Message);
			}
		}
		#endregion
		
		#region DeleteAssignedVid
		private void DeleteAssignedVid(string id)
		{
			try {
				var assignmentObj = new Assign();
				//Delete from assign collection.
				assignmentObj.DeleteAssignment(id);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("VideoService.DeleteAssignedVid:Error in deleting assigned videos. " + ex.Message);
			}
		}
		#endregion
		
		#region DeleteCaption
		private void DeleteCaption(Video video)
		{
			try {
				var capObj = new Caption();
				//check whether the video has caption.
				if (video.captionId != null) {
					//Delete from caption collection.
					capObj.DeleteCaption(video.captionId);
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("VideoService.DeleteCaption:Error in deleting caption." + ex.Message);
			}
		}
		#endregion
		
		#region DeleteImageFiles
		private void DeleteImageFiles(string id)
		{
			try {
				var file = new svc.FileManager();
				var objMetaData = new VideoMetaData();
				//Get image file names uploaded by ck-editor in metadata document.
				IList<string> fileNames = objMetaData.GetSourceFileNames(id).ToList<string>();
				//Delete image files in image repository.
				file.DeleteImages(fileNames);
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("VideoService.DeleteImageFiles:Error in deleting images." + ex.Message);
			}
		}
		#endregion
		
		#region DeleteVidFiles
		private void DeleteVidFiles(Video video)
		{
			try {
				if (video.sourcetype == Convert.ToInt32(Constants.sourceTypes.youtube)) {
					//if it is youtube no need to check any repository.
					return;
				}
				var file = new svc.FileManager();
				//Delete files in repository(video,snap,caption).
				file.DeleteVideoFiles(video.src.ToString(), video.snap, video.caption); //delete in Repo
				
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("VideoService.DeleteVidFiles:Error in deleting video files." + ex.Message);
			}
		}
		#endregion
	}
}
