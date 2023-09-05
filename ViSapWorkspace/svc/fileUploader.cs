using System.Web;
using System.Linq;
using System.Globalization;
using System;
using Excel.Workspace.Common.Utilities;
using System.Web.Configuration;
using System.IO;
using System.Collections.Generic;

namespace ViSapWorkspace
{
    public class fileUploader : IHttpHandler
    {
        private const int HTTP_BAD_REQUEST = 400;

        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// upload video file to repository
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.HttpMethod == "POST")
            {

                try
                {
                    if (context.Request.Files.Count > 0)
                    {
                    	string  vidFormat=WebConfigurationManager.AppSettings["videoFormat"];//key for mp4 file
						string capFormat=WebConfigurationManager.AppSettings["captionFormat"];//key for vtt file
					 	
                      	Dictionary<string, string> fileRepository = new Dictionary<string, string>();
                          //Repository and file type is added as key value pair.
                      	fileRepository.Add(vidFormat, "videoRepository");
                      	fileRepository.Add(capFormat, "captionRepository");
                 		HttpFileCollection files = context.Request.Files;
                        foreach (string key in files)
                        {                           
                          HttpPostedFile file = files[key];
                          string ext = Path.GetExtension(key);
                          VisapLogger.LogDebug("fileUploader:ProcessRequest:uploading the file to Repository" + Path.GetFileName(file.FileName));//To get only file name,using this getfileName method (file.FileName will behave differently in different browser)
                          file.SaveAs( WebConfigurationManager.AppSettings[fileRepository[ext]] + Path.GetFileName(file.FileName));
                          VisapLogger.LogInfo("fileUploader:ProcessRequest:" + Path.GetFileName(file.FileName) +" Saved Sucessfully to Repository");
                  		}
                    }
                }
                catch (Exception ex)
                {
                    VisapLogger.LogDebug("Error while uploading the file to repository");
                    VisapLogger.LogErrorMessage(ex.Message);
                    VisapLogger.LogError(ex);
                    throw new VisapException("Error in  uploading the file");
                }

            }
            else
            {
                context.Response.StatusCode = HTTP_BAD_REQUEST;
            }
        }

        #endregion
    }
}