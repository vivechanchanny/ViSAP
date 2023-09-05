/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 2/16/2017
 * Time: 11:18 AM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using MongoDB.Bson.Serialization.Attributes;

namespace ViSapDAL
{
	/// <summary>
	/// Description of Tags.
	/// </summary>
	/// 
	public class Tags
	{
		
		#region Properties
		[BsonIgnoreIfNull]
		[BsonElement("t")]
		public Object Time{get;set;}
		[BsonIgnoreIfNull]
		[BsonElement("d")]
		public string Data{get;set;}
		#endregion
	}
}
