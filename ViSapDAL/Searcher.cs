/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 1/19/2017
 * Time: 5:08 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;
using System.Collections.Generic;
using System.Linq;

using DataAccessLayer;
using Excel.Workspace.VideoAccess;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace Excel.Workspace.SearchAccess
{
	public abstract class Searcher
	{
		protected Searcher _next;
		
		#region setNext
		public void setNext(Searcher next)
		{
			this._next = next;
		}
		#endregion
		
		#region search
		public abstract List<string> search(string searchkey,IEnumerable<BsonValue> videoid_list, List<string> filtered, Boolean mode);
		#endregion	  
		
		#region GetCollection
		public MongoCollection getCollection<T>(string coll)
		{
			MongoDBconnection dbObj = new MongoDBconnection(coll);
			var collection = dbObj.GetMongoCollection<T>();
			return collection;
		}
		#endregion
		
		#region SearchNext
		public List<string> SearchNext(string srckey,IEnumerable<BsonValue> videoIDlist, List<string> filteredList, Boolean mod,Searcher nextObj)
		{
			//calling next search
			if(nextObj != null)
			{
				return	nextObj.search(srckey,videoIDlist,filteredList,mod);
			}
			
			return filteredList.Distinct().ToList();
		}
		#endregion
	}
}
