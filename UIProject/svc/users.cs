using System.Web;
using System.Web.Script.Serialization;
using Excel.Visap.DataAccessLayer;
using Excel.Visap.Common.Utilities;
using Excel.Visap.Log;
using Excel.Visap.VideoAccess;
using Excel.Visap.User;
using Excel.Visap.StoreConsants;

namespace ViTag
{
    public class Userdata : IHttpHandler
    {
    
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Handler to get the list of users in database
        /// </summary>
        /// <param name="context">HttpContext</param>
      
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                User objUser = new User(); ;
                var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
                var request = context.Request;      
                /*Do not DELETE these code, needed for authentication module
                //if(request.HttpMethod == "POST")
                //{
                //    var userName = request.Headers["username"].ToString();
                //    var password = request.Headers["password"];
                //    var userDetails = objUser.GetUserData(userName, password);
                //}
                 * */
                if (request.HttpMethod == "GET")
                {
                    context.Response.Write(_jsserializer.Serialize(objUser.GetAllUsers()));
                    VisapLogger.LogDebug("getting the users Info from Users table");
                }
            }
            catch (VisapException ex)
            {
                VisapLogger.LogError(ex);     
                throw new VisapException("can be user friendly error message");
                          
            }
        }
        #endregion
    }
}