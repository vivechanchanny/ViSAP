using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Excel.Visap.StoreConsants;
using Excel.Visap.VideoAccess;
using Excel.Visap.Common.Utilities;
using ViTag.svc;
using Excel.Visap.MetaDataAccess;
using Excel.Visap.User;
using System.Configuration;

#region Videos HttpHandler
namespace ViTag
{
    public class Videos : IHttpHandler
    {           
       
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Processing request based on the type of the request 
        /// videos will be saved/deleted/selection of videos
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
            
            Video objVideo = new Video();
            var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            //JavaScriptSerializer _jsserializer = new JavaScriptSerializer();
            var request = context.Request;
            var data = request.Form["d"];
            var timelinedata = request.Form["data"];
            string isStage = request.Form["isStage"];
            string isUpload = request.Form["isUpload"];
              User objUserEntity = new User();
            try
            {
                if (request.HttpMethod == "POST")
                {
                    #region delete
                    if (request.Headers.AllKeys.Contains("X-HTTP-Method"))
                    {
                        //Delete videos checking for metadata
                        var videotoDelete = request.Form["deleteID"];
                        VisapLogger.LogDebug("Videos:Delete:deleting data from Video header:"+videotoDelete);
                        objVideo.DeleteVideo(videotoDelete);
                        VideoMetaData objMetaData = new VideoMetaData();
                        if (objMetaData.CheckMetaDataExitsDelete(videotoDelete))
                        {
                            VisapLogger.LogDebug("Videos:Delete:deleting data from metadata:"+videotoDelete);
                            objMetaData.DeleteVideo(videotoDelete);
                        }

                    }
                    #endregion


                    if (request.Headers.AllKeys.Contains("X-Authorization"))
                    {
                        string[] userDetails = ServiceUtility.GetUserValueToken(request);
                        string userid = userDetails[0];
                        string uname=null;

                        if (data != null)
                        {
                            //sending as form posted value hence directly taken
                            if (isStage == "true")
                            {
                                uname= ConfigurationManager.AppSettings["Stage"];
                                userid=objUserEntity.GetUserId(uname);
                            }
                            //video and metadata save
                            data = data.Replace("\"", "'");
                            VisapLogger.LogDebug("Videos:Saving/updating the Video for the userid:"+userid);
                            context.Response.Write(objVideo.Save(data, userid, isUpload));

                        }
                        else if (timelinedata != null)
                        {
                           VisapLogger.LogDebug("Videos:Timeline:Saving/updating the timelinevideo:"+userid);
                            timelinedata = timelinedata.Replace("\"", "'");
                            context.Response.Write(objVideo.Save(timelinedata, userid, "false"));
                        }
                        else
                        {
                            //In Case of student login get mapped user
                            var loggedinrole = userDetails[1];
                            if (loggedinrole != null && loggedinrole == Constants.ROLESTUDENT)
                            {
                                 userid = objUserEntity.GetMappedInstructor(userid);
                                  
                            }
                            //Get all the videos  which are in username
                                 context.Response.Write(_jsserializer.Serialize(objVideo.GetVideosByUser(userid)));
                        }

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
                throw new VisapException();
            }
            
        }
        #endregion
    }
}
#endregion