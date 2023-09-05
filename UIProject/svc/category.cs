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
    public class CategorySearch : IHttpHandler
    {

       
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Search videos based on category name 
        /// </summary>
        /// <param name="context">particular request context</param>
        public void ProcessRequest(HttpContext context)
        {
            CategoriesSearch objCategorySearch = new CategoriesSearch();
            var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
            var request = context.Request; 
            try
            {
                if (request.HttpMethod == "POST")
                {
                    if (request.Headers.AllKeys.Contains("X-Authorization"))
                    {
                        string[] userDetails = ServiceUtility.GetUserValueToken(request);
                        string userid = userDetails[0];
                        string searchKey = request.Form["searchKey"];
                        string videoID = request.Form["videoid"];
                       
                        //In Case of student login get mapped user
                        var loggedinrole = userDetails[1];
                        if (loggedinrole != null && loggedinrole == Constants.ROLESTUDENT)
                        {
                            User objUserEntity = new User();
                            userid = objUserEntity.GetMappedInstructor(userid);
                          
                        }
                        if (searchKey == null)
                        {
                            if (videoID != null)
                            {
                                context.Response.Write(_jsserializer.Serialize(objCategorySearch.GetCategoryListbyVideoID(userid, videoID)));
                            }
                            else
                            	 context.Response.Write(_jsserializer.Serialize(objCategorySearch.GetCategoryList(userid)));
                        }
                        else
                           context.Response.Write(_jsserializer.Serialize(objCategorySearch.SearchCategory(searchKey, userid)));
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
                    throw new VisapException("Error while searching for Category");
                }
            
        }
        #endregion


    }
}