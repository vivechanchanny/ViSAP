/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 1/30/2017
 * Time: 1:12 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

using DataAccessLayer;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.VideoAccess;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using Newtonsoft.Json;

namespace Excel.Workspace.SearchAccess
{
	public class SearchByTitle : Searcher
	{
		
		#region search
		public override List<string> search(string searchkey, IEnumerable<BsonValue> videoid_list, List<string> filtered, Boolean mode)
		{
			var searchTxt= searchkey.ToLowerInvariant().TrimEnd();
			try
			{
				VisapLogger.LogDebug("SearchByTitle: searching of video by title, searchKey:"+searchkey);
				//getting collection
				var collection = getCollection<Video>("Video");
				
				//This query filter the documents
 	        	var tittlequery  = Query.And(Query.In("_id",videoid_list), Query.EQ("isstage", Convert.ToBoolean(mode)));
				
 	        	//this statement gets video id list of matched title.
				var filterVidIds = collection.FindAs<Video>(tittlequery).Where(v=> HttpUtility.UrlDecode(v.title.ToLower()).Contains(searchTxt)).Select( v=> v._id).ToList();
				
				//adding to filter list
				filtered.AddRange(filterVidIds);
				
				//calling next search
				return SearchNext(searchkey,videoid_list,filtered,mode,this._next);
				
			}
			
		   catch (Exception ex)
           {
		   		VisapLogger.LogErrorMessage("Error in SearchByTitle: "+ ex.Message);
	            VisapLogger.LogError(ex);
	           	throw new VisapException(ex.Message);
           }
			
		}
		#endregion	
	}
	
}