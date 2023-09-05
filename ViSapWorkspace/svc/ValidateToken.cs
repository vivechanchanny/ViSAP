using System;
using System.Web;
using System.Configuration;
using Excel.Workspace.Users;
using System.Linq;
using Excel.Workspace.Common.Utilities;
using MongoDB.Bson;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.Workspace;
using MongoDB.Driver;
using System.Collections.Generic;
using MongoDB.Driver.Builders;
using ViSapWorkspace.services;
using Excel.Visap.Security;

namespace ViSapWorkspace
{
	/// <summary>
	/// Description of ValidateToken.
	/// </summary>
	public class ValidateToken: IHttpHandler
	{
		
		public bool IsReusable {
			get { return false; }
		}
		#region ProcessRequest
		/// <summary>
		/// Processing request based on the type of the request 
		///  
		/// </summary>
		/// <param name="context">HttpContext</param>
		public void ProcessRequest(HttpContext context)
		{
			try {
				
				var req = context.Request;
				var res = context.Response;
				var buffer = req.BinaryRead(req.ContentLength);
				string token =System.Text.Encoding.UTF8.GetString(buffer);
				string userToken=string.Empty;
				string videoToken=string.Empty;
                				
				if(!string.IsNullOrEmpty(token)){
				  BsonValue tokenData = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonValue>(token);
				  userToken = tokenData.ToBsonDocument().GetElement("userToken").Value.ToString();
				  videoToken = tokenData.ToBsonDocument().GetElement("videoToken").Value.ToString();
				}
				//Validating user and video token
				if (!string.IsNullOrEmpty(token) && ValidateUserToken(userToken) && ValidateIsAssigned(videoToken,userToken))
					res.StatusCode =(int)System.Net.HttpStatusCode.OK;
				else
					res.StatusCode = (int)System.Net.HttpStatusCode.Forbidden;

			} catch (Exception ex) {
				VisapLogger.LogError(ex);
				throw new VisapException();    
			}
		}
		#endregion
		 
		public bool ValidateIsAssigned(string videoToken,string userToken)
		{
			  Assign assingObj = new Assign();
			  CreateGroup objCreateGroup = new CreateGroup();
			  var objAuth = new AuthService();
			  
			try {
				  //Decrypt video token and get video information.
				  var decryptedVideoData = objAuth.GetDecryptedToken(HttpUtility.UrlDecode(videoToken));
				  var videoInfo = objAuth.GetVideoDetails(decryptedVideoData);
				  
				  //Decrypt user token and get user information.
				  var decryptedUserData = objAuth.GetDecryptedToken(HttpUtility.UrlDecode(userToken));
				  var userInfo = objAuth.GetUserDetails(decryptedUserData);
				  
				  //Get Video details from video id.
				  var vidDetails=assingObj.getAssignment(videoInfo.VideoID);
				  //Get individual assigned users and assigned groups.
			      var assignedUsers = vidDetails["assigneduser"].AsBsonArray.Select(p => p.AsString).ToArray();
			      var assignedGroups = vidDetails["assignedgroup"].AsBsonArray.Select(p => p.AsString).ToList();
			      
			      //Get Individual user from assignedUsers array.
			      foreach(var assignedId in assignedUsers)
			      {
			      	if(assignedId==userInfo.UserID)
			      	{
			      		return true;
			      	}
			      }
			     
     	          var listOfGroupIds = new List<IMongoQuery>();
			        //Get assigned users from assignedGroups array.
     	          foreach (var groupId in assignedGroups)
     	          {
				    listOfGroupIds.Add(Query.EQ("_id",groupId));
				  }
     	          //Get group details by group id.
			      var groupDetails=objCreateGroup.GetGroupInfo(listOfGroupIds);
			      foreach(var item in groupDetails)
			      {
			         var mappedUsers = item["mappedusers"].AsBsonArray.Select(p => p.AsString).ToArray();
			         foreach(var map in mappedUsers)
			         {
			           if(map==userInfo.UserID)
 		               {
 		            	 return true;
 		               }
 		    	     }
			     }
			} catch (Exception ex) {
				return false;
			}
			return false;
		}
		
		 
		public bool ValidateUserToken(string token)
		{
			try {
				  var objAuth=new AuthService();
				  //Decrypt user token and get user information.
				  var decryptedData = objAuth.GetDecryptedToken(HttpUtility.UrlDecode(token));
				  var userInfo = objAuth.GetUserDetails(decryptedData);
				  
				  if (ValidateTimeStamp(userInfo.DateTime) || !ValidateUser(userInfo.UserID))
					return true;
			} catch (Exception ex) {
				return false;
			}
			return false;
		}
		 
		private bool ValidateTimeStamp(DateTime tokenTime)
		{
			try {
				int diffrenceTime = DateTime.Now.Subtract(Convert.ToDateTime(tokenTime)).Minutes;
				var tokenExpiryTime = Convert.ToInt32(tokenExpiry);
				return (tokenExpiryTime >= diffrenceTime);
				
			} catch (Exception e) {
				return false;
			}
		}
		 
		private bool ValidateUser(string userid)
		{
			try {
				Users userObj = new Users();
				var userInfo = userObj.GetUserInfo(userid);
				return (userInfo != null);
			} catch (Exception e) {
				return false;
			}
		}
		
		private static string tokenExpiry {
			get {
				return ConfigurationManager.AppSettings["TokenExpiryTime"];
			}
		}
	}
}