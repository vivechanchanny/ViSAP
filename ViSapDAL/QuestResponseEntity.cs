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

namespace Excel.Workspace.DataAccessLayer
{
	/// <summary>
	/// Description of MetaDataEntity.
	/// </summary>
	/// 
	[BsonIgnoreExtraElements]
	public class QuestResponseEntity
	{
		 
		 
	    public string _id{ get; set; }
        public string videoId{get;set;}
        public string userid{get;set;}
        public string username{get;set;}
	    public string quizID{ get; set; }
        public string status{get;set;}
        public double score{get;set;}
        public double maxScore{get;set;}
        public DateTime datetime{get;set;}
        public string questiontitle{get;set;}
       
		 
	}
	

	
	 
}
