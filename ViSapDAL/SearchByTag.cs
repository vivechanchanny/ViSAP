/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 1/19/2017
 * Time: 7:22 PM
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
using ViSapDAL;

namespace Excel.Workspace.SearchAccess
{
	public class SearchByTag : Searcher
	{
	
		public override List<string> search(string searchkey, IEnumerable<BsonValue> videoid_list, List<string> filtered, Boolean mode)
		{
			var searchTxt= searchkey.ToLowerInvariant().TrimEnd();  
			try
			{
				VisapLogger.LogDebug("SearchByTag: searching of video by tag, searchKey:"+searchkey);
				//getting collection
				var collection = getCollection<MetaDataEntity>("MetaData");
				 
 	        	//query to filter metadata documents based on id, tag exist and mode.
				var tagquery  = Query.And(Query.In("_id",videoid_list),Query.Exists("tags"), Query.EQ("isstage", Convert.ToBoolean(mode)));
				
				//this query gets video id list of matched title from documents.
				var filterVidIds = collection.FindAs<MetaDataEntity>(tagquery).Where(m=>m.tags.Any(t=>HttpUtility.UrlDecode(t.Data.ToLower()).Contains(searchTxt))).Select( m=>m._id).ToList();
                
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
	}
	
}