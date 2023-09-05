/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 2/1/2017
 * Time: 12:49 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;

namespace Excel.Workspace.DataAccessLayer
{
	public class TimeLineData
	{
		#region properties
		public string srcTimeline{get;set;}
		public Int32 sourcetype{get;set;}
		public string snap{get;set;}
		public Int32 startTime{get;set;}
		public Int32 duration{get;set;}
		public string caption{get;set;}
		#endregion
	}
}