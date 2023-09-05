using System.Web;
using System.Linq;
using System.Globalization;
using System;
using Excel.Workspace.Common.Utilities;
using System.IO;

namespace ViSapWorkspace
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
        /// upload image file to image repository.
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
                        string msg="";
                        foreach (string key in files)
                        {                           
                            HttpPostedFile file = files["upload"];
                            //Get image repository path.
                            string filePath = System.Web.Configuration.WebConfigurationManager.AppSettings["imageRepository"] + file.FileName;
                            bool fileExists=File.Exists(filePath) ? true : false; //check if file name is already exists.
                            string CKEditorFuncNum = context.Request["CKEditorFuncNum"]; //Get Ckeditor function number.
                            
                            if(fileExists==true){
                                msg = "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction('"+CKEditorFuncNum+"','','A file with the same name already exists.Please rename the file.');</script>";
                            }
                            else{
                               VisapLogger.LogDebug("ImageUploader:ProcessRequest:uploading the Image to Repository" + file.FileName);
                               file.SaveAs(filePath);
                               VisapLogger.LogDebug("ImageUploader:ProcessRequest:" + file.FileName + " Saved Sucessfully to Repository");
                               string fileUrl=System.Web.Configuration.WebConfigurationManager.AppSettings["imageRepositoryURL"] + file.FileName;
                               msg = "<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction('"+CKEditorFuncNum+"','"+fileUrl+"','');</script>";
                            }
                       }
                         context.Response.Write(msg);
                    }
                }
                catch (Exception ex)
                {
                    VisapLogger.LogDebug("ImageUploader:Error while uploading the image to repository");
                    VisapLogger.LogErrorMessage(ex.Message);
                    throw new VisapException("ImageUploader:Error in  uploading the image");
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