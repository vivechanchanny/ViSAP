
#region namespace
using System;
using System.IO;
using System.Web;
using Excel.Visap.Common.Utilities;

#endregion namespace


namespace ViTag
{
    public class AelibTestDataHandler : IHttpHandler
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
                            //dataAccess.CollectionName = "TestDataCollection";
                            //dataAccess.InsertData(testdata, userId);
                            File.WriteAllText(@"D:\VisapTestData\VisapAelibTestResults.xml", testdata);
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
