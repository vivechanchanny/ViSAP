using System.Linq;
using Excel.Workspace.StoreConsants;
using System.Web;
using  Excel.Workspace.Workspace;
using Excel.Workspace.Users;
using System.Web.Script.Serialization;
using Excel.Workspace.Common.Utilities;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Runtime.Serialization;
using System;

namespace ViSapWorkspace
{
    public class Group : IHttpHandler
    {           
       
        public bool IsReusable
        {
            get { return false; }
        }
        
        /// <summary>
        /// Processing request based on the type of the request 
        /// videos will be saved/deleted/selection of videos
        /// </summary>
        /// <param name="context">HttpContext</param>
        public void ProcessRequest(HttpContext context)
        {
             var request = context.Request;           	
             string jsonString =null;
             string   groupname=null; string grpid = null;
             
            
			using (var inputStream = new StreamReader(context.Request.InputStream))
			{
			   jsonString =inputStream.ReadToEnd();
			}
            CreateGroup objCreateGroup = new CreateGroup();
            
            Users objUserEntity=new Users();
            var _jsserializer = new JavaScriptSerializer() { MaxJsonLength = int.MaxValue }; 
			 try
			 {

			 	if (request.HttpMethod == "POST")
			 	{
			 		if(request.Headers["X-Delete"] != null)
			 		{
			 			objUserEntity.DeleteUser(jsonString);
			 			objCreateGroup.Delete(jsonString);
			 			VisapLogger.LogDebug("Group:users and group deleted successfully:");
			 		}
			 		else if(request.Headers["X-MAP"] != null)
			 		{
			 			dynamic data = JObject.Parse(jsonString);
		  	 			string groupid = data.groupid;
         	 			 string[] userlist = data.userlist.ToObject<string[]>();
         	 			 VisapLogger.LogDebug("Group:Adding users for the group id"+groupid);
			 			 string mappedusers =  objCreateGroup.AddusersToGroup(groupid,userlist);
			 			 context.Response.Write(_jsserializer.Serialize(objCreateGroup.Save(mappedusers)));
			 			
			 		}
			 		else
			 		{
			 			dynamic data = JObject.Parse(jsonString);
			 			groupname = data.name;
			 			grpid= data._id;
			 			string userid=data.createduserId;
			 			var editMode = request.Headers["EditMode"];//Edit Mode.
			 			if(!objCreateGroup.CheckIfGroupNameExists(groupname,userid) || editMode == "true")
			 			{
			 				objCreateGroup.Save(jsonString);
			 				context.Response.Write(objCreateGroup.GetGroupbyUserID(userid));
			 			}
			 			else
			 			{
			 				context.Response.Write("false");
			 			}
			 		}
			 	}
			 	if (request.HttpMethod == "GET")
			 	{
			 		if(request.Headers["UserID"] != null)
			 		{ 	
			 			string userid = request.Headers["UserID"].ToString();
			 			VisapLogger.LogDebug("Group:getting groups for the userid:"+userid);
			 			string userList=objCreateGroup.GetGroupbyUserID(userid);
			 			context.Response.Write(userList);
			 		}
			 		else
			 			context.Response.Write(objCreateGroup.GetAllDocuments());
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