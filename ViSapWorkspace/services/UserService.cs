using System;
using ViSapWorkspace.services;
using Excel.Workspace.Workspace;
using Excel.Workspace.Users;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.Common.Utilities;

namespace ViSapWorkspace.services
{
	/// <summary>
	/// Description of UserService.
	/// </summary>
	public class UserService
	{
		
		public class UserDetails
		{
			public string userToken { get; set; }
			public string userRole { get; set; }
			public string userName { get; set; }
			public string workspaceName { get; set; }
			public string userid { get; set; }
		}
		
		public UserDetails getUserDetails(string name, string userRole)
		{
			try {
				var objUsers = new Users();
				var objCreateWorkspace = new CreateWorkspace();
				var objAuth = new AuthService();
				var userid = objUsers.GetUserId(name);
				var userName = objUsers.GetUserName(userid);
				var userToken = objAuth.GetTokenForUserData(userid + Constants.Auth_Separator + userRole + Constants.Auth_Separator + DateTime.Now);
				var userDetails = new UserDetails();
				userDetails.userToken = userToken;
				userDetails.userRole = userRole;
				userDetails.userName = userName;
				userDetails.userid = userid;
				 
				if(!userRole.Equals(Constants.SuperAdmin))
				{
				  var workspaceName = objCreateWorkspace.getWorkspaceName(userid);		
				  userDetails.workspaceName = workspaceName;
				}
				return userDetails;
			} catch (Exception ex) {
				
				VisapLogger.LogError(ex);     
				throw new VisapException("No users found");
			}
			
		}
	}
}
