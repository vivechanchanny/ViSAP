using System.Web;
using System.Linq;
using System.Globalization;
using System;
using Excel.Visap.Common.Utilities;

namespace ViTag
{
    public class ImageUploader : IHttpHandler
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
                      // var uploadFile= context.Request.Files["upload"];
                        HttpFileCollection files = context.Request.Files;
                        foreach (string key in files)
                        {                           
                            HttpPostedFile file = files["upload"];
                            VisapLogger.LogDebug("ImageUploader:ProcessRequest:uploading the Image to Repository" + file.FileName);
                            file.SaveAs(System.Web.Configuration.WebConfigurationManager.AppSettings["imageRepository"] + file.FileName);
                            VisapLogger.LogDebug("ImageUploader:ProcessRequest:" + file.FileName + " Saved Sucessfully to Repository");
                            context.Response.Write(System.Web.Configuration.WebConfigurationManager.AppSettings["imageRepositoryURL"] + file.FileName);

                       }
                    }
                }
                catch (Exception ex)
                {
                    VisapLogger.LogDebug("Error while uploading the image to repository");
                    VisapLogger.LogErrorMessage(ex.Message);
                    throw new VisapException("Error in  uploading the image");
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