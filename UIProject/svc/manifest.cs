using System.Web;
namespace ViTag
{
    public class manifest : IHttpHandler
    {

        private const int HTTP_BAD_REQUEST = 400;

        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            var request = context.Request;

            if (request.HttpMethod == "POST")
            {
                System.IO.File.WriteAllText(System.Web.Configuration.WebConfigurationManager.AppSettings["videoManifest"], request.Form["d"], System.Text.Encoding.UTF8);
            }
            else
            {
                context.Response.StatusCode = HTTP_BAD_REQUEST;
            }

        }

    }
}