using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System;
using System.Linq;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.StoreConsants;
using System.IO;

namespace ViSapWorkspace
{
    public class ReadConfig : BaseHttpHandler
    {
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// to get the appSettings from the webconfig
        /// </summary>
        /// <param name="context">HttpContext</param>
         protected override void Save(HttpContext context)
        {
        	try{
        		  string jsonObject =null;
        		  //using streamreader to read the json object 
		          using (var inputStream = new StreamReader(context.Request.InputStream))
				  {
					   jsonObject =inputStream.ReadToEnd();
				  }
                   var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue };
        		  //declared dictionary to add repository url's
        		   Dictionary<string, string> dicURLValues = new Dictionary<string, string>();
        		   
        		   //deserialize jsonObject as dictionary,because to get the values from the jsonObject.
        	   	   var configValues= _jsserializer.Deserialize<Dictionary<string,string>>(jsonObject);
        	
	        		for (int i = 0; i < configValues.Count; i++) {
	        		     dicURLValues.Add(configValues.ElementAt(i).Value, System.Web.Configuration.WebConfigurationManager.AppSettings[configValues.ElementAt(i).Value]);
	        		}
        	   	   VisapLogger.LogDebug("ReadConfig:ReadConfig:Read configuration values successfully");
	        		string jsondata = JsonConvert.SerializeObject(dicURLValues, Formatting.Indented);
	        	    context.Response.Write(jsondata);
        	}
        	catch(Exception ex)
        	{
        		VisapLogger.LogError(ex);
                throw new VisapException("Error while reading appsetting values");
        	}
             
        }
        #endregion
        
        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="context"></param>
        protected override void Delete(HttpContext context){
		 throw new NotImplementedException();
			
		}
        
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="context"></param>
         protected override void Update(HttpContext context){
		 throw new NotImplementedException();
			
		}
        /// <summary>
        /// Get Request
        /// </summary>
        /// <param name="context"></param>
         protected override void Get(HttpContext context){
		 throw new NotImplementedException();
			
		}
    }
}