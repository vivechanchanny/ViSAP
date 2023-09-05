/*
 * Created by SharpDevelop.
 * User: kavya.tm
 * Date: 4/11/2017
 * Time: 9:33 AM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

using DataAccessLayer;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.DataAccessLayer;
using Excel.Workspace.VideoAccess;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.Linq;
using Newtonsoft.Json;
using System.Net.Mail;

namespace Excel.Workspace.Users
{
	/// <summary>
	/// Description of Email.
	/// </summary>
	public class ValidateEmail
	{
		public string getUserIdfromEmail(string emailId)
		{
		
			var userId=string.Empty;
			try{
				
				//Getting the connection for mongodb (user collection)
				MongoDBconnection dbObj = new MongoDBconnection("Users");
				var userCollection = dbObj.GetMongoCollection<Users>();
				
				//Getting the userid for the given emailId.
				userId = (from user in userCollection.AsQueryable<Users>() where user.email.ToLowerInvariant() == emailId.ToLowerInvariant() select user._id).FirstOrDefault();
			}
			catch(Exception ex)
			{
				
				VisapLogger.LogErrorMessage("Error while getting userid from email: "+ ex.Message);
	            VisapLogger.LogError(ex);
	           	throw new VisapException(ex.Message);
				
				
			}
			return userId;
		}
	}
}
