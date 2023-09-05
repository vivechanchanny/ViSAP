/*
 * Created by SharpDevelop.
 * User: praveenkumar.tg
 * Date: 9/28/2015
 * Time: 2:38 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using MongoDB.Driver;
using quizService.Connection;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using System.Web.Script.Serialization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Handlers;
using System.Web.Http;
using Newtonsoft.Json;
using System.Text;
using System.ComponentModel;
using quizService.Models;
using Newtonsoft.Json.Linq;


namespace quizService.DataAccess
{
	/// <summary>
	/// Description of QuizSave.
	/// </summary>
	public class QuizActions
	{
		/// <summary>
		/// Create new question in aelib collection
		/// </summary>
		/// <param name="doc"></param>
		/// <returns></returns>
		public QuestionResponse saveQuiz(string doc)
		{
			string uid = string.Empty;
			try
			{
				MongoDBconnection objCon = new MongoDBconnection("AelibQuestion");
				BsonValue id = null;
				var question = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(doc);
				MongoCollection col = objCon.GetMongoCollection();
				Guid originalGuid = Guid.NewGuid();
				uid = originalGuid.ToString("N");
				id = uid;
				var query = Query.EQ("_id", id);
				IMongoUpdate updateDoc = new UpdateDocument("$set",question);
				col.Update(query, updateDoc, UpdateFlags.Upsert);
			    QuestionResponse questionData = GetQuestionResponse(true,"insert",uid);
			    VisapLogger.LogErrorMessage("QuizService.DataAccess.saveQuiz: AELIB Question Created with the id:-"+uid);
                return questionData;
				
			}
			 catch (Exception ex)
            {
            	VisapLogger.LogErrorMessage("Error in QuizService.DataAccess.saveQuiz: "+ex.Message);
                QuestionResponse questionData = GetQuestionResponse(false,"insert",uid);
                return questionData;
            }
			
		}
		
		
		public string OverWriteQuizData(string newid,BsonDocument questiondata){
			
			MongoDBconnection objCon = new MongoDBconnection("AelibQuestion");
			var question = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(questiondata);
			MongoCollection col = objCon.GetMongoCollection();
            var query = Query.EQ("_id", newid);
			IMongoUpdate updateDoc = new UpdateDocument("$set",question);			
			col.Update(query, updateDoc,UpdateFlags.Upsert);
			return "true";
			
		}
		
		/// <summary>
		/// Get the quiz/Question Data by questionID
		/// </summary>
		/// <param name="questionid"></param>
		/// <param name="flag"></param>
		/// <returns></returns>
		public BsonValue  GetQuizData(string questionid,string flag)
		{

			try {
				MongoDBconnection objCon = new MongoDBconnection("AelibQuestion");
				BsonValue id = null;
				BsonValue questionData=null ;
				MongoCollection col = objCon.GetMongoCollection();
				id=questionid;
				var query = Query.EQ("_id", id);
				BsonDocument  bsondoc = col.FindOneAs<BsonDocument>(query);
				
				if (bsondoc != null)
				{				 
					//date not required to client
					bsondoc.Remove("date");
					questionData  =  bsondoc.GetValue("questionsData");
				}
					VisapLogger.LogErrorMessage("QuizService.DataAccess.GetQuizData:Question Retrived:-" +id);
				if(flag!=null) return bsondoc.ToJson();
				else return questionData.ToJson();
			}
			catch (Exception ex)
			{
				VisapLogger.LogErrorMessage("Error in QuizService.DataAccess.GetQuizData:"+ex.Message);
				 return null;
			}
		}
		
		/// <summary>
		///  Update AELIb Question
		/// </summary>
		/// <param name="doc"></param>
		/// <returns></returns>
		public QuestionResponse UpdateQuiz(string doc)
		{
			string   uid = string.Empty;
			var deserializedProduct =new QuestionResponse();
			try {
				var objCon = new MongoDBconnection("AelibQuestion");
				BsonValue id = null;
				
				var question = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(doc);
				MongoCollection col = objCon.GetMongoCollection();
				
				var data = question["questionsData"].AsBsonDocument;
				if(data.Contains("testid"))
				{
					uid=data[1].ToString();
					id=uid.Substring(5);
					var query = Query.EQ("_id", id);
				    IMongoUpdate updateDoc = new UpdateDocument("$set",question);
				    col.Update(query, updateDoc, UpdateFlags.Upsert);
				    VisapLogger.LogErrorMessage("QuizService.DataAccess.UpdateQuiz:AELIB question updated with the question ID: "+uid);
			        deserializedProduct = GetQuestionResponse(true,"update",uid.Substring(5));
				}
				else{
				     VisapLogger.LogErrorMessage("Error in updating QuizService:questionsData is null");

				}
				return deserializedProduct;
			}
			catch (Exception ex)
			{
				VisapLogger.LogErrorMessage("Error in QuizService.DataAccess.UpdateQuiz:"+ex.Message);
				  QuestionResponse questionData = GetQuestionResponse(false,"update",uid.Substring(5));
                return questionData;
			}			
		}
		
		/// <summary>
		/// Deletion of question
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public bool DeleteQuiz(string id)
		{
			
			try {
				MongoDBconnection objCon = new MongoDBconnection("AelibQuestion");
				var col = objCon.GetMongoCollection();
				var query = Query.EQ("_id", id);
				WriteConcernResult writeResult =col.Remove(query);
				bool result= writeResult.Response.GetValue("ok").ToBoolean();
				VisapLogger.LogErrorMessage("AELIB Question Deleted: ID:"+id.ToString());
				return result;
			}
			catch (Exception ex)
			{
				VisapLogger.LogErrorMessage("Error in QuizService.DataAccess.DeleteQuiz:"+ex.Message);
				return false;
			}
			
		}
		/// <summary>
		/// Getting question status along with question data
		/// </summary>
		/// <param name="statusvalue"></param>
		/// <param name="actiontype"></param>
		/// <param name="uid"></param>
		/// <returns></returns>
		public QuestionResponse GetQuestionResponse(bool statusvalue,string actiontype,string uid){
			
 			   QuestionResponse obj= new QuestionResponse();
				obj.status= statusvalue;
				obj.url=uid+"|"+actiontype;
			   
				string json = JsonConvert.SerializeObject(obj, Formatting.Indented);
				QuestionResponse deserializedProduct = JsonConvert.DeserializeObject<QuestionResponse>(json);
				return deserializedProduct; 
		}
		
		
	}
	
	
	
}
