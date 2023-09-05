using System.Linq;
using System.Web;
using Excel.Workspace.Roles; 
using System.Web.Script.Serialization;
using System.IO;
using Newtonsoft.Json.Linq;
using Excel.Workspace.Common.Utilities;
using System;

namespace ViSapWorkspace
{
    public class RoleData : IHttpHandler
    {           
       
        public bool IsReusable
        {
            get { return false; }
        }
      
        /// <summary>
        /// Processing request based on the type of the request 
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
            var request = context.Request;
            Roles objRoles = new Roles();
            string roleCollection=null;
            try{
				if (request.HttpMethod == "GET")
                {  					             
					//To get all the roles excluding admin role
					if(request.Headers["excludeAdmin"]=="true")
						roleCollection=objRoles.GetRoles(request.Headers["excludeAdmin"]);
					else
					    roleCollection=objRoles.GetRoles(); //This will get all the roles 
					context.Response.Write(roleCollection);
				}
			 }
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException();
            }
        }
    }
   
}