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
	public class AelibQuestionEntity
	{
		 
		 
	    public string _id{ get; set; }
        public string title{get;set;}
        
        public int questionType{get;set;}
        
         
        
		 
	}
	

	
	 
}
