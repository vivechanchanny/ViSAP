/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 1/18/2017
 * Time: 3:34 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.IO;
using System.Text;
using System.Web;

using Excel.Workspace.Common.Utilities;
using Newtonsoft.Json;
using SubtitlesParser;

namespace Excel.Workspace.DataAccessLayer
{
	public class CaptionParser
	{
		
		#region vtt parser
		public List<CaptionContents> parseVTTFile(string path)
		{
			try
			{
				VisapLogger.LogDebug("parseVTTFile:parsing vtt file from : "+path);
				var parser = new SubtitlesParser.Classes.Parsers.VttParser();
				using (var fileStream = File.OpenRead(@path))
				{
					var items = parser.ParseStream(fileStream, Encoding.UTF8);
					List<CaptionContents> contents = new List<CaptionContents>();
					var capContents = JsonConvert.SerializeObject(items);
                    contents = JsonConvert.DeserializeObject<List<CaptionContents>>(capContents);
					
                    //here list of string is converted single string and assigned to list of string for the purpose of searching.
                    //string.join method should consists of string with space to separate two lines.
					var captionContents = contents.Select(x=>{x.Lines =
					                          		new List<string>(){string.Join(" ",x.Lines)};
					                          	return x;
					                          }).ToList();
					return captionContents;
				}
				
			}
			
			catch(Exception ex)
			{	
				VisapLogger.LogError(ex);
				throw new VisapException(ex.Message);
			}
			
		}
		#endregion'
	}
}