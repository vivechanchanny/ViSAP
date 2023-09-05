using System.Web;
using System.Web.Script.Serialization;
using Excel.Visap.DataAccessLayer;

namespace ViTag
{

    public class GetDataHandler : IHttpHandler
    {
        DataAccess objDataAccess = new DataAccess();
        private const int HTTP_GETBAD_REQUEST = 400;

        //to ask prashant about ctch exception from handlers
        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
             context.Response.ContentType = "text/json";
             JavaScriptSerializer _jsserializer = new JavaScriptSerializer();
            var request = context.Request;
          
            if (request.HttpMethod == "GET")
            {
                var userid = request.QueryString["UserID"];
                if (request.QueryString["Published"] == "Published" && userid != "")
                {

                    objDataAccess.CollectionName = "PublishedUsersCollection"; 
                    context.Response.Write(_jsserializer.Serialize(objDataAccess.GetDatabyUserID("UserID", userid)));
                    
                }
                else
                {
                    
                        objDataAccess.CollectionName = "VideoCollection";
                        context.Response.Write(_jsserializer.Serialize(objDataAccess.GetAllDocuments()));
                   
                }
            }
            else
            {
                context.Response.StatusCode = HTTP_GETBAD_REQUEST;
            } 

        }

    }
}
