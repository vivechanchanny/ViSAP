using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using Excel.Visap.DataAccessLayer;
using Excel.Visap.SearchAccess;
using Excel.Visap.StoreConsants;
using ViTag.svc;
using Excel.Visap.MetaDataAccess;
using Excel.Visap.VideoAccess;
using System.Linq;
using Excel.Visap.Common.Utilities;


namespace ViTag
{
    public class Publish : IHttpHandler
    {
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Logic to process the request based on request type
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                var request = context.Request;
                string userid = string.Empty;
                if (request.HttpMethod == "POST")
                {
                    Video objVideo = new Video();
                    var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };                    
                    var data = request.Form["d"];
                    
                    //data = data.Replace("\"", "'");
                    if (request.Headers.AllKeys.Contains("X-Authorization"))
                    {
                        string[] userDetails = ServiceUtility.GetUserValueToken(request);
                        userid = userDetails[0];
                        objVideo.PubishVideo(data, userid);
                        VisapLogger.LogDebug("publish:ProcessRequest:Publishing the  video header and metadata successfull");
                    }                   
                    
                }
                else
                {
                    context.Response.StatusCode = Constants.HTTP_BAD_REQUEST;
                }
            }
            catch (VisapException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error while publishing");
            }
        }
        #endregion
    }
}