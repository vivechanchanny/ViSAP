using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Excel.Visap.SearchAccess;
using Excel.Visap.StoreConsants;
using Excel.Visap.User;
using ViTag.svc;
using Excel.Visap.Common.Utilities;


namespace ViTag
{
    public class Search : IHttpHandler
    {

       
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Sear videos on SearchKey of tags and tittle
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            //search works as existing -discussed with prashant
            SearchVideo objSearchVideo = new SearchVideo();
            var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            var request = context.Request;

            try
            {
                if (request.HttpMethod == "POST")
                {
                    if (request.Headers.AllKeys.Contains("X-Authorization"))
                    {
                        string[] userDetails = ServiceUtility.GetUserValueToken(request);
                        string uname = userDetails[0];
                        string searchKey = request.Form["searchKey"];
                        var loggedinrole = userDetails[1];
                        if (loggedinrole != null && loggedinrole == Constants.ROLESTUDENT)
                        {
                            User objUserEntity = new User();
                            uname = objUserEntity.GetMappedInstructor(uname);
                        }
                        //based on serachkey tittle and tags are searched
                          VisapLogger.LogDebug("Search service:searching video tittle/tags for the entered search key and username:"+searchKey);
	                    context.Response.Write(_jsserializer.Serialize(objSearchVideo.GetSourceByTagorTittle(searchKey, uname)));	                   
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
                throw new VisapException("Error while searching");
            }

        #endregion
        }

       
    }
}