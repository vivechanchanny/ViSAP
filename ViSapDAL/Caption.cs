/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 1/18/2017
 * Time: 3:33 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;
using System.Collections.Generic;
using System.Web.Configuration;

using DataAccessLayer;
using Excel.Workspace.Common.Utilities;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System.Linq;
 
namespace Excel.Workspace.DataAccessLayer
{
	[BsonIgnoreExtraElements]
	public class Caption
	{
		#region Properties
		public string _id{get;set;}
		//public List<string> VideoID{get;set;}
		public List<CaptionContents> Contents{get;set;}
		#endregion
		
		#region Save captions
		public string Save(string capFileName)
		{
			CaptionParser parseObj = new CaptionParser();
			Caption capObj = new Caption();
			string guid = capObj.CreateGuid();//creates unique id for caption collection.
			MongoDBconnection objCon = new MongoDBconnection("Caption");
			MongoCollection col = objCon.GetMongoCollection();
			try
			{
				//getting captionfile path using file name
				string path = WebConfigurationManager.AppSettings["captionRepository"]+capFileName;
				//parsing and getting parsed caption data
				List<CaptionContents> contents = parseObj.parseVTTFile(path);
				capObj._id = guid;
				capObj.Contents= contents;
				VisapLogger.LogDebug("saving caption contents after parsing, filename: "+ capFileName);
				col.Insert(capObj);
			}
			
			catch(Exception ex)
			{
				VisapLogger.LogError(ex);
				throw new VisapException(ex.Message);
			}
			return guid;
		}
		#endregion
		
		
		#region create GUID
		public string CreateGuid()
		{
			try
			{
			   Guid originalGuid = Guid.NewGuid();
               string uid = originalGuid.ToString("N");
               string id = uid;
               return id;
			}
			catch(Exception ex)
			{	
				VisapLogger.LogError(ex);				
				throw new VisapException(ex.Message);
			}
		}
		#endregion
		
		#region delete caption
		public void DeleteCaption(string id)
		{
			try {
				var objCon = new MongoDBconnection("Caption");
				MongoCollection collection = objCon.GetMongoCollection();
				var query = Query.EQ("_id", id);
				collection.Remove(query);
			} catch (Exception ex) {
				VisapLogger.LogError(ex);				
				throw new VisapException(ex.Message);
			}
		}
		#endregion
	}
	
}