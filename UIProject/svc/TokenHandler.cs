/*
 * Created by SharpDevelop.
 * User: kavya.tm
 * Date: 3/2/2016
 * Time: 6:10 PM
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Web;
using Excel.Visap.Security;
using System.Configuration;
using System.Collections.Generic;


namespace ViTag.svc
{
	/// <summary>
	/// Description of TokenService.
	/// </summary>
	public class TokenHandler:IHttpHandler
	{
        private const int HTTP_BAD_REQUEST = 400;   
         public bool IsReusable
        {
            get { return false; }
        }

        #region ProcessRequest
      
        public void ProcessRequest(HttpContext context)
        {   
        	try
        	{
	            var videoId = context.Request.Form["ID"];//This id will be used to generate the token.(this is the videoid)
	            //send video id to get video auth token
	            var tokenType=ConfigurationManager.AppSettings["VideoTokenType"];
	            
	            Dictionary<string, string> tokenDetails = new Dictionary<string, string>();
	            tokenDetails.Add("videoId",videoId);
	            //To generate  videotoken based on the videotokentype
	            if(tokenType=="Jwt") {
	            	//to generate jwt token require two parameters 1.videod 2.securitykey.
	            	tokenDetails.Add("SecurityKey",ConfigurationManager.AppSettings["SecurityKey"]);
	            	JwtToken jwtToken=new JwtToken();
	            	context.Response.Write(jwtToken.GenerateToken(tokenDetails));
	            }
	            else
	            {
	            	Token tokenObj=new Token();
	            	context.Response.Write(tokenObj.GenerateToken(tokenDetails));
	            }
	            
        	}
        	catch (Exception ex)
            {       
             
            }
        }
        #endregion
      }
}

