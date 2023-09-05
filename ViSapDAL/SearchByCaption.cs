/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 1/19/2017
 * Time: 5:17 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

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
	public class SearchByCaption : Searcher
	{
		
		#region search
		public override List<string> search(string searchkey, IEnumerable<BsonValue> videoid_list, List<string> filtered,Boolean mode)
		{
			try
			{
				VisapLogger.LogDebug("SearchByCaption: searching of video by caption, searchKey:"+searchkey);
				
				var searchTxt = searchkey.ToLowerInvariant();
				var videoIdList = BsonSerializer.Deserialize<List<string>>(videoid_list.ToJson());
							
				//getting collection
				var capCollection = getCollection<Caption>("Caption");
				var vidCollection = getCollection<Video>("Video");
				
				//In this query caption and video collections are joined to get video ids of matched captions.
				//Here ANY method will return boolean true if lines matched are not equal to null and
				//count of matched lines are greater than zero.
				var filtervidIdList = (from vid in vidCollection.AsQueryable<Video>().ToList()
									join cap in capCollection.AsQueryable<Caption>().ToList() on vid.captionId equals cap._id 
									where vid._id.In(videoIdList) && vid.isstage == mode && cap.Contents.Any(c=>{
					                     	var lines = c.Lines.Find(line=>line.ToLowerInvariant().Contains(searchTxt));
					                      	return lines != null && lines.Count() > 0;})
									select vid._id).ToList();
				
				//adding to filter list
				filtered.AddRange(filtervidIdList);
				
				//calling next search
				return SearchNext(searchkey,videoid_list,filtered,mode,this._next);
			}
			
		   catch (Exception ex)
           {
		   		VisapLogger.LogErrorMessage("Error in SearchByCaption: "+ ex.Message);
		   	    VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
           }
			
		}
		#endregion
		
	}
}