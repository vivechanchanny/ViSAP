using System.Web;
using System.Linq;
using System.Globalization;
using System;
using Excel.Visap.Common.Utilities;

namespace ViTag
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
                      
                        HttpFileCollection files = context.Request.Files;
                        foreach (string key in files)
                        {                           
                            HttpPostedFile file = files[key];
                            VisapLogger.LogDebug("fileUploader:ProcessRequest:uploading the file to Repository" + file.FileName);                            
                            file.SaveAs(System.Web.Configuration.WebConfigurationManager.AppSettings["videoRepository"] + file.FileName);
                            VisapLogger.LogDebug("fileUploader:ProcessRequest:" + file.FileName +" Saved Sucessfully to Repository");

                        }
                    }
                }
                catch (Exception ex)
                {
                    VisapLogger.LogDebug("Error while uploading the file to repository");
                    VisapLogger.LogErrorMessage(ex.Message);
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