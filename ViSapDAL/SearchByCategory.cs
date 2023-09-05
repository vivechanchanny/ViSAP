/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 2/3/2017
 * Time: 9:53 AM
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
	public class SearchByCategory : Searcher
	{
		
		
		public override List<string> search(string searchkey, IEnumerable<BsonValue> videoid_list, List<string> filtered, bool mode)
		{
			var searchTxt= searchkey.ToLowerInvariant().TrimEnd();	
			try
			{
				VisapLogger.LogDebug("SearchByCategory: searching of video by category, searchKey:"+searchkey);
				//getting collection
				var collection = getCollection<Video>("Video");
					
				//query to filter video document based on id and mode.
				var categoryquery  = Query.And(Query.In("_id",videoid_list), Query.EQ("isstage", Convert.ToBoolean(mode)));
				
				//this query gets video id list of matched category.
                var filterVidIds = collection.FindAs<Video>(categoryquery).Where(v=>v.category.Any(c=>HttpUtility.UrlDecode(c.ToLower()).Contains(searchTxt))).Select( v=> v._id).ToList();//this line will get video source of matched id's

                //adding to filter list
				filtered.AddRange(filterVidIds);
				
				//calling next search
				return SearchNext(searchkey,videoid_list,filtered,mode,this._next);
			}
				
		   catch (Exception ex)
           {
            	VisapLogger.LogErrorMessage("Error in SearchByCategory: "+ ex.Message);
	            VisapLogger.LogError(ex);
	           	throw new VisapException(ex.Message);
           }
			
		}
		
	}
}