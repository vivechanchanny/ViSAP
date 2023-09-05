
#region namespace
using System;
using System.IO;
using System.Web;
using Excel.Workspace.Common.Utilities;

#endregion namespace


namespace ViSapWorkspace
{
    public class TestDataHandler : IHttpHandler
    {
      
        private const int HTTP_BAD_REQUEST = 400;    

        public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
        /// <summary>
        /// Receives the testresultsand writes it to drive - jenkins to use         
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            var request = context.Request;

            if (request.HttpMethod == "POST")
            {
                try
                {
                    if (request.Form["Environment"] == "Test")
                    {
                        var testdata = request.Form["testData"];
                        VisapLogger.LogDebug("Qunit test report posted to server");
                        if (testdata != null)
                        {
                            testdata = testdata.Replace("\"", "'");
                            File.WriteAllText(@"D:\VisapTestData\VisapTestResults.xml", testdata);
                            VisapLogger.LogDebug("Junitreport pushed to VisapTestResults");
                        }
                    }
                }
                catch(Exception ex)
                {
                    VisapLogger.LogError(ex);
                    throw new VisapException("TestDataHandler:Error while uploading qunittestresultxml");
                }
            }

            else
            {
                context.Response.StatusCode = HTTP_BAD_REQUEST;
            }

        }
        #endregion

    }
}
