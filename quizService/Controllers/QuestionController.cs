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
	public class QuestionController : ApiController
	{
		// GET api/<controller>/5
		
		public IHttpActionResult Get(string id)
		{
			var flag=System.Web.HttpContext.Current.Request.QueryString["flag"];
			QuizActions getQuiz= new QuizActions();
			return Ok(getQuiz.GetQuizData(id,flag));
		}
		
		
		// POST api/<controller>
		public IHttpActionResult Post([FromBody]Object value)
		{
			string json = JsonConvert.SerializeObject(value);
			QuizActions objQuizSave= new QuizActions();
			var result = objQuizSave.saveQuiz(json);
			return Ok(result);
		}
		
		// PUT api/<controller>/5
		public IHttpActionResult Put(string questionid, [FromBody]Object value)
		{
			string json = JsonConvert.SerializeObject(value);
			QuizActions objQuizSave= new QuizActions();
			var result = objQuizSave.UpdateQuiz(json);
			return Ok(result);
		}
		
		// DELETE api/<controller>/5
		public bool Delete(string questionid)
		{
			QuizActions objQuizSave= new QuizActions();
			return  objQuizSave.DeleteQuiz(questionid);
		}
		
    	// OPTIONS http-verb handler
		public HttpResponseMessage OptionsUser()
		{
		    var response = new HttpResponseMessage();
		    response.StatusCode = HttpStatusCode.OK;
		    return response;
		}
		
	}
}