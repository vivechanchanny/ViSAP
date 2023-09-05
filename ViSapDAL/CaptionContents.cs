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

namespace Excel.Workspace.DataAccessLayer
{
	public class CaptionContents
	{
		#region properties
		public string StartTime{get;set;}
		public string EndTime{get;set;}
		public List<string> Lines{get;set;}
		#endregion
	}
}