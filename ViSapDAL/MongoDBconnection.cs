using System;
using System.Configuration;
using Excel.Workspace.Common.Utilities;
using MongoDB.Driver;

namespace DataAccessLayer
{
	internal class MongoDBconnection
	{


		readonly string _collection = string.Empty;
		private static MongoClient _client = null;
		

		#region Constructor
		public MongoDBconnection(string collection)
		{
			_collection = collection;
		}
		
		#endregion
		
		#region MongoClient
		private static MongoClient GetClient()
		{
			if (_client == null)
				_client = new MongoClient(connString());
			
			return _client;
		}
		#endregion

		#region GetMongoCollection
		/// <summary>
		/// Gets the mongocollection
		/// </summary>
		/// <returns></returns>
		public MongoCollection GetMongoCollection()
		{
			MongoCollection col;
			try
			{
				col = GetDataBase().GetCollection(_collection);
			}
			catch (MongoConnectionException con)
			{
				VisapLogger.LogError(con);
				throw new VisapException(con.Message);
			}
			return col;
		}

		#endregion

		#region GetDataBase
		/// <summary>
		/// Get the databse connection
		/// </summary>
		/// <returns>mongodatabase</returns>
		private static MongoDatabase GetDataBase()
		{
			MongoDatabase database = null;
			MongoServer mongoServer = null;
			try
			{
				var mongoClient = GetClient();
				mongoServer = mongoClient.GetServer();
				database = mongoServer.GetDatabase(dbName);
			}
			catch (MongoConnectionException ex)
			{
				VisapLogger.LogError(ex);
				throw new VisapException(ex.Message);
			}
			finally
			{
				mongoServer.Disconnect();

			}

			return database;
		}

		#endregion

		#region ConnString and dbName
		/// <summary>
		/// read connectionstring from config
		/// </summary>
		/// <returns>connectionstring value</returns>
		private static string connString()
		{
			return ConfigurationManager.ConnectionStrings["MongoConnectionString"].ToString();

		}

		private static string dbName
		{
			get
			{
				return ConfigurationManager.AppSettings["AdminDB"];
			}
		}

		#endregion
		
		/*************new methods*******************/			
		
		#region new getCollection Generic method
		public MongoCollection GetMongoCollection<T>()
		{
			MongoCollection col;
			try
			{
				col = GetDataBase().GetCollection<T>(_collection);
			}
			catch (MongoConnectionException con)
			{
				VisapLogger.LogError(con);
				throw new VisapException(con.Message);
			}
			return col;
		}
		#endregion
	}
}
