using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System;

namespace ViTag
{
    public class ReadConfig : IHttpHandler
    {
        private const int HTTP_BAD_REQUEST = 400;

        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// to get the appSettings from the webconfig
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
              StringBuilder strBuild= new StringBuilder();
              var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
              var request = context.Request;
              var videoRepoKey = request.Headers["videoRepositoryURL"];
              var snapRepoKey = request.Headers["snapshotRepositoryURL"];
              Dictionary<string, string> dicURLValues = new Dictionary<string, string>();

              dicURLValues.Add(videoRepoKey, System.Web.Configuration.WebConfigurationManager.AppSettings[videoRepoKey]);
              dicURLValues.Add(snapRepoKey, System.Web.Configuration.WebConfigurationManager.AppSettings[snapRepoKey]);
              string json = JsonConvert.SerializeObject(dicURLValues, Formatting.Indented);
              context.Response.Write(_jsserializer.Serialize(json));               
             
        }
        #endregion
    }
}