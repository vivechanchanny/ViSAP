/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 2/1/2017
 * Time: 12:49 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Excel.Workspace.DataAccessLayer
{
	public class SnippetData
	{
		#region properties
		public string srcTimeline{get;set;}
		public Int32 sourcetype{get;set;}
		public string snap{get;set;}
		public Object startTime{get;set;}
		public Object duration{get;set;}
		public string caption{get;set;}
		#endregion
	}
}