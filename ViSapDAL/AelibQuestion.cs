 
using System;
using Excel.Workspace.DataAccessLayer;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using DataAccessLayer;
using Excel.Workspace.MetaDataAccess;
using System.Collections.Generic;
using Excel.Workspace.Common.Utilities;
using MongoDB.Bson;
namespace Excel.Workspace.AelibQuestion
{
	/// <summary>
	/// Description of AelibQuestion.
	/// delete questions.
	/// </summary>
	public class AelibQuestion : EditableBaseEntity
	{
	 
		#region Constructor
		private const string _collection = "AelibQuestion";
		public AelibQuestion()
			: base(_collection)
		{
             
		}
		#endregion
		
		#region deleteBulkQuestions
		public void DeleteQuestions(IList<string> ids)
		{
			try {
				 
				var list = new List<IMongoQuery>();
			 
				if (ids.Count != 0) {
					foreach (var qid in ids) {
						list.Add(Query.EQ("_id", qid));
					}
					var query = Query.And(Query.Or(list));
					this.Delete(query);
				}
			} catch (Exception ex) {
				VisapLogger.LogErrorMessage("AelibQuestion:DeleteQuestions:Error in deleting questions " + ex.Message);
				throw new VisapException("Error in deleting questions.");
			}
			
		}
		#endregion
		#region Get Question data
		/// <summary>
		/// get the question data based on question id
		/// </summary>
		public BsonDocument getQuestionData(BsonArray quizdata)
		{ 
		 	BsonDocument data = null;
    		 BsonValue quizid = null;
			try
			{
				foreach(var listAction in quizdata){
					   quizid= listAction.ToBsonDocument().GetElement("quizID").Value.ToString();
					
				}
				IMongoQuery query=  Query.EQ("_id", quizid);
				var objcon = new MongoDBconnection(_collection);
				var collection = objcon.GetMongoCollection();
				data = collection.FindOneAs<BsonDocument>(query);
				
			}
			catch(Exception ex)
			{
				VisapLogger.LogErrorMessage("AelibQuestion:DeleteQuestion:Error in deleting questions " + ex.Message);
				throw new VisapException("Error in deleting question.");
			}
			return data;
		}
		#endregion
	}
}
