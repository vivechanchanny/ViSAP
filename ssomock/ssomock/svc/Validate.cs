using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ssomock.svc;

namespace ssomock.svc
{
    public class Validate : IHttpHandler
    {

        public bool IsReusable
        {
            get { return false; }
        }              
        #region ProcessRequest
        /// <summary>
        /// Processing request based on the type of the request 
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
            string token = context.Request.QueryString["t"];

            if (string.IsNullOrEmpty(token))
            {
                throw new HttpException(405, "Invalid request");

            }
            else
            {
                //Validate token here
                context.Response.Write(UserToken.ValidateToken(token));
            }
        }

      
        #endregion
    }
}