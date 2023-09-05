/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 2/16/2017
 * Time: 11:14 AM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;

namespace ViSapDAL
{
	/// <summary>
	/// Description of MetaDataEntity.
	/// </summary>
	/// 
	[BsonIgnoreExtraElements]
	public class MetaDataEntity
	{
		public MetaDataEntity()
		{
		}
		
		#region Properties
		public string _id{get;set;}
		[BsonIgnoreIfNull]
		public List<Tags> tags{get;set;}
		[BsonIgnoreIfNull]
		public Boolean isstage{get;set;}
	    public List<Actions> actions{get;set;}
		#endregion
	}
}
