using System;
using Excel.Workspace.Common.Utilities;
using System.Web.Configuration;
using System.IO;
using System.Collections.Generic;

namespace ViSapWorkspace.svc
{
	/// <summary>
	/// Description of DeleteFiles.
	/// delete files in repository.
	/// </summary>
	public class FileManager
	{
		//this fn will delete images uploaded by ck-editor.
		public void DeleteImages(IList<string> sourcesList)
		{ 
			try {
				var imagePath = WebConfigurationManager.AppSettings["imageRepository"];
				foreach (var element in sourcesList) {
					var path = imagePath + element;
					if (File.Exists(path)) {
						File.Delete(path);
					} 
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("DeleteFiles.DeleteImages:Error in deleting images " + ex.Message);
			}
		}
		
		//This fn will delete video,caption,snap in repository.
		public  void DeleteVideoFiles(string src, string snap, string caption)
		{
			try {
				// Shows a List of KeyValuePairs.
				var list = new List<KeyValuePair<string, string>>();
				list.Add(new KeyValuePair<string, string>("videoRepository", src));
				list.Add(new KeyValuePair<string, string>("snapshotRepository", snap));
				
				if (caption != null) {
					list.Add(new KeyValuePair<string, string>("captionRepository", caption));
				}
				foreach (var element in list) {
					var path = WebConfigurationManager.AppSettings[element.Key] + element.Value;
					if (File.Exists(path)) {
						File.Delete(path);
					} 
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("DeleteFiles.DeleteVideoFiles:Error in deleting video files " + ex.Message);
			}
			 
		}
	}
}
