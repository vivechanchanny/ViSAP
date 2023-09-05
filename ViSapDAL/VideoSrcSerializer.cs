/*
 * Created by SharpDevelop.
 * User: mohankumar.m
 * Date: 2/1/2017
 * Time: 3:35 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using Excel.Workspace.VideoAccess;

namespace ViSapDAL
{
	/// <summary>
	/// Description of VideoSrcSerializer.
	/// </summary>
	public class VideoSrcSerializer : IBsonSerializer
	{
		public VideoSrcSerializer()
		{
			
			
		}
		
		public Type ValueType {
			get {
				return typeof(Object);
			}
		}
		
		public object Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
		{
			//As discussed reading of duration and startTime is handeled in catch block. because type of this properties may changed to double or int64
			 var bsonReader = context.Reader;
			VisapLogger.LogDebug("Deserialization of timeline src property starts");
			if (bsonReader.CurrentBsonType.ToString() == "Array"){
				VisapLogger.LogDebug("Deserializing array of documents starts");
				var list = new List<TimeLineSrc>();
				
				bsonReader.ReadStartArray();
				
				/**************************************/
				
				while (true)
				{
					try
					{
						bsonReader.ReadStartDocument();
					}
					catch (Exception)
					{
						//this catch block only need to identify the end of the Array
						bsonReader.ReadEndArray();
						break;
					}
					
					var tmSrc = new TimeLineSrc();
					
					tmSrc.sequence = bsonReader.ReadInt32("sequence");
					
					bsonReader.ReadStartDocument();
					tmSrc.data = new SnippetData();

					tmSrc.data.srcTimeline = bsonReader.ReadString("srcTimeline");
					tmSrc.data.sourcetype = bsonReader.ReadInt32("sourcetype");
					tmSrc.data.snap = bsonReader.ReadString("snap");
					
					//reading starttime data during deserialization of timeline src.
					try
					{
						tmSrc.data.startTime = bsonReader.ReadInt32("startTime");
					}
					
					catch(InvalidOperationException ex)
					{
						try
						{
							tmSrc.data.startTime = bsonReader.ReadDouble();
							VisapLogger.LogDebug("Exception during deserialization is handeled for :"+ex.Message);
							
						}
						
						catch(Exception e)
						{
							tmSrc.data.startTime = bsonReader.ReadInt64();
							VisapLogger.LogDebug("Exception during deserialization is handeled for :"+e.Message);
						}
					
					}
					//reading duration data during deserialization of timeline src.
					try
					{
						tmSrc.data.duration= bsonReader.ReadDouble();
					}
					catch(InvalidOperationException ex)
					{
						try
						{
							tmSrc.data.duration = bsonReader.ReadInt32();
							VisapLogger.LogDebug("Exception during deserialization is handeled for :"+ex.Message);
							
						}
						
						catch(Exception ex2)
						{
							tmSrc.data.duration = bsonReader.ReadInt64();
							VisapLogger.LogDebug("Exception during deserialization is handeled for :"+ex2.Message);
						}
					
					}
				

					//in below condition caption field is checked because caption is not present in youtube video.				
					if(bsonReader.FindElement("caption"))
					{
						if(bsonReader.CurrentBsonType.ToString()!="Null")
						{
							tmSrc.data.caption = bsonReader.ReadString();	
						}
						else
						{
							bsonReader.ReadNull();
						}
						
					}
					list.Add(tmSrc);
										
					//End reading timeline data document
					bsonReader.ReadEndDocument();

					//End reading timeline src document
					bsonReader.ReadEndDocument();
					
				}
				
				return list;
				
			} else {
				return bsonReader.ReadString();
				
			}
		}
		
		public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
		{
			throw new NotImplementedException();
		}
	}
}
