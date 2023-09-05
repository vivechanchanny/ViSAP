using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using quizService.DataAccess;
using System.Web.Script.Serialization;
using MongoDB.Bson;
using MongoDB.Driver.Builders;

namespace quizService.Controllers
{
	public class PublishController : ApiController
	{
		 
		
		// POST api/<controller>
		public IHttpActionResult POST(string questionid,string newid)
		{
			var flag=System.Web.HttpContext.Current.Request.QueryString["flag"];
			QuizActions objQuizaction= new QuizActions();
			quizService.Models.QuestionResponse result = new quizService.Models.QuestionResponse();
			//if the newid is null means its first time publishing
			if(newid=="null"){
			BsonValue questionData = objQuizaction.GetQuizData(questionid,flag);
			var question = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(questionData.ToString());
		    question.ToBsonDocument().Remove("_id");
		    result = objQuizaction.saveQuiz(question.ToString());
			
			}
			//This will execute when its republishing.
			else
			{
				
			BsonValue questionData = objQuizaction.GetQuizData(questionid,flag);
			var question = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(questionData.ToString());
		    question.ToBsonDocument().Remove("_id");
		    objQuizaction.OverWriteQuizData(newid,question);
			}
			return Ok(result);
		}
		
		
	}
}