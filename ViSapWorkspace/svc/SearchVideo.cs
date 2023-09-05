using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.IO;
using Newtonsoft.Json.Linq;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.SearchAccess;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.Users;
using Excel.Workspace.VideoAccess;
using Excel.Workspace.Workspace;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using ViSapWorkspace.services;

namespace ViSapWorkspace
{
	
	
	public class SearchVideos : BaseHttpHandler
	{

		/// <summary>
		/// Processing request based on the type of the request
		/// videos will be saved/deleted/selection of videos
		/// </summary>
		/// <param name="context">HttpContext</param>
		protected override void Save(HttpContext context)
		{
			var request = context.Request;
			var assignmentObj = new Assign();
			var objCreategroup = new CreateGroup();
			var objAuth = new AuthService();

			string mode = "";
			var videoid_list = new List<string>();
			var  filteredVidIdList = new List<string>();
			var videoObj = new Video();
			
			var userDetails = objAuth.GetUserValueToken(request);
			string userid = userDetails.UserID;
			string searchKey = request.Form["searchKey"];
			string isHome = request.Form["isGallery"];
			var loggedinrole = userDetails.UserRole;
			
			
			if (searchKey == null) {
				using (var inputStream = new StreamReader(context.Request.InputStream)) {
					dynamic jsondata = JObject.Parse(inputStream.ReadToEnd());
					
					searchKey = jsondata.searchKey;
					isHome = jsondata.isGallery;
					 
				}	
			}
	
			if (request.Headers.AllKeys.Contains("isStage"))
				mode = request.Headers["isStage"].ToString();
	
	
			if (loggedinrole != null && loggedinrole == Constants.ROLESTUDENT) {
				var objUserEntity = new Users();
				userid = objUserEntity.GetMappedInstructor(userid);
			}
			//based on serachkey tittle and tags are searched
			VisapLogger.LogDebug("Search service:searching video tittle/tags for the entered search key and username:" + searchKey);
	
			// check the user belongs to which group
			var grouplist = objCreategroup.GetGroupbyMappedUsers(userid);
	
			// get the videos from assignment collection for logged in user and group
			var videoslist = assignmentObj.GetVideosList(userid, grouplist);
	
			/***************start of new search engine code**********************/
			if (videoslist.Count > 0) {
				IEnumerable<BsonValue> idList = BsonSerializer.Deserialize<List<BsonValue>>(videoslist.ToJson());
	
				//getting searcher object
				Searcher searcher = getSearcher(Convert.ToBoolean(isHome));
	
				//search of video starts from here
				videoid_list = searcher.search(searchKey, idList, filteredVidIdList, Convert.ToBoolean(mode));
			}
	
			//sends video source to client side
			context.Response.Write(videoObj.getVideoSource(videoid_list, Convert.ToBoolean(mode)));
			
			
		}
		 
		/// <summary>
		/// Get list of videos in vieo collections
		/// </summary>
		/// <param name="context"></param>
		protected override void Get(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		
		/// <summary>
		/// Update Video Collections
		/// </summary>
		/// <param name="context"></param>
		protected override void Update(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		/// <summary>
		///  Delete Video
		/// </summary>
		/// <param name="context"></param>
		protected override void Delete(HttpContext context)
		{
			throw new NotImplementedException();
		}
		
		#region getSearcher
			private Searcher getSearcher(Boolean isGallery)
			{
				Searcher objCapSearch = new SearchByCaption();
				Searcher objTitleSearch = new SearchByTitle();
				Searcher objCatSearch = new SearchByCategory();
				Searcher objTagSearch = new SearchByTag();
	
				//video search by category is made only in gallery page.
				if(isGallery)
				{
					objTitleSearch.setNext(objCatSearch);//setting category search after title search
					objCatSearch.setNext(objTagSearch);//setting tag search after category search
				}
				else
				{
					objTitleSearch.setNext(objTagSearch);//setting tag search after title search
				}
				objTagSearch.setNext(objCapSearch);//setting caption search after tag search
	
				return objTitleSearch;
			}
			#endregion
		
	}
}