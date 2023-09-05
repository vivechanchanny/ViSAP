
using System.Web;
using Excel.Visap.Common.Utilities;


namespace ViTag
{
    public class logger : IHttpHandler
    {
        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// log the message based on the type of the log
        /// for Instance:logtype is 1 then Info
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
			//read loggertype			
			 var request = context.Request;
             var loggerType = request.Form["loggertype"];          
             var logmessage = request.Form["log"];            
		
			 switch (loggerType)
		        {	
		            case "0":	
		                 VisapLogger.LogDebug(logmessage);                       		                 
		                break;	
		            case "1":	
		                 VisapLogger.LogInfo(logmessage);                       		                 
		                break;	
		            case "2":	
		                 VisapLogger.LogErrorMessage(logmessage);                       		                 
		                 break;
		            case "3":	
		                  VisapLogger.LogFatal(logmessage);                       		                 
	                      break;	
		
		        }
        }
        #endregion
    }
}