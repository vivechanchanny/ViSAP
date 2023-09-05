using System.Web;
using System.Web.Script.Serialization;
using Excel.Visap.MetaDataAccess;
using Excel.Visap.StoreConsants;
using ViTag.svc;
using Excel.Visap.User;
using System.Linq;
using Excel.Visap.Common.Utilities;

#region Metadata HttpHandler
namespace ViTag
{
    public class Metadata : IHttpHandler
    {

        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Handler poccesing for differnt type of requests
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
        	try
        	{
        		
        	
            VideoMetaData objMetadata = new VideoMetaData();
            var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            var request = context.Request;
            var data = request.Form["d"];

            if (request.HttpMethod == "POST")
            {
                if (request.Headers.AllKeys.Contains("X-Authorization"))
                {
                    string[] userDetails = ServiceUtility.GetUserValueToken(request);
                    string uname = userDetails[0];

                    if (data != null)
                    {
                        //save metadata 
                        //data = data.Replace("\"", "'");
                        objMetadata.UpdateLegacyCollection(data);
                        context.Response.Write(objMetadata.Save(data, uname, "false"));
                    }
                    else
                    {
                        var VideoID = request.Form["ID"];
                        if (VideoID != null && uname != null)
                            context.Response.Write(_jsserializer.Serialize(objMetadata.GetVideosByID(VideoID)));
                        else
                        {
                            var loggedinrole = userDetails[1];
                            if (loggedinrole != null && loggedinrole == Constants.ROLESTUDENT)
                            {
                                User objUserEntity = new User();
                                uname = objUserEntity.GetMappedInstructor(uname);
                            }
                            //Get the data for a user
                            context.Response.Write(_jsserializer.Serialize(objMetadata.GetVideoMataDataByUser(uname)));
                        }
                    }
                }
            }
            else
            {
                context.Response.StatusCode = Constants.HTTP_BAD_REQUEST;
            }
        	}
        	catch(VisapException ex)
        	{
        		VisapLogger.LogError(ex);
                throw new VisapException("Error in Metadata.do");
        	}
        }
        #endregion

    }
}
#endregion