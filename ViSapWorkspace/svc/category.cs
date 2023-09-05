using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using Excel.Workspace.SearchAccess;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.Users;
using Excel.Workspace.Workspace;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.VideoAccess;
using ViSapWorkspace.services;
using System;


namespace ViSapWorkspace
{
    public class CategorySearch : BaseHttpHandler
    {

        
        #region ProcessRequest
        /// <summary>
        /// Search videos based on category name 
        /// </summary>
        /// <param name="context">particular request context</param>
        protected override void Get(HttpContext context)
        {
            CategoriesSearch objCategorySearch = new CategoriesSearch();
            var request = context.Request; 
            CreateGroup objCreategroup = new CreateGroup();
            Assign assignmentObj = new Assign();
            var objAuth = new AuthService();
            
            string mode = "";
            try
            { 
                    
                        var userDetails = objAuth.GetUserValueToken(request);
                        string userid = userDetails.UserID;
                        string searchKey = request["searchKey"];
                        string videoID = request["videoid"];
                         
                        // check this user is mapped to any group
                        var grouplist = objCreategroup.GetGroupbyMappedUsers(userid);
                        // from assignment collection get the videos for that perticular group
                        var videoslist=   assignmentObj.GetVideosList(userid,grouplist);
                        if (request.Headers.AllKeys.Contains("isStage"))
                        {
                        	mode = request.Headers["isStage"].ToString();
                        }
                       
                        if (searchKey == null)
                        {
                            if (videoID != null)
                                context.Response.Write(objCategorySearch.GetCategoryListbyVideoID(userid, videoID));
                            else
                                context.Response.Write(objCategorySearch.GetCategoryList(userid,mode,videoslist));
                        }
                        else
                        	context.Response.Write(objCategorySearch.SearchCategory(userid,mode,videoslist,searchKey));
                         
                     
                     
                }
                catch (Exception ex)
                {
                    VisapLogger.LogError(ex);
                    throw new VisapException("Error while searching for Category");
                }
            
        }
        #endregion
        
		/// <summary>
		/// Save
		/// </summary>
		/// <param name="context"></param>
        protected override void Save(HttpContext context)
		{
			throw new NotImplementedException();
		}
        
        /// <summary>
        /// Delete 
        /// </summary>
        /// <param name="context"></param>
        protected override void Delete(HttpContext context)
		{
			throw new NotImplementedException();
		}
        
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="context"></param>
        protected override void Update(HttpContext context)
		{
			throw new NotImplementedException();
		}
        
        
        	
        	
		
        


    }
}