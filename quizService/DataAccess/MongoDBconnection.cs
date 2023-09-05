using System.Configuration;
using MongoDB.Driver;
using quizService.DataAccess;

namespace quizService.Connection
{
    internal class MongoDBconnection
    {
        #region Constructor
        readonly string _collection = string.Empty;
        public MongoDBconnection(string collection)
        {
            _collection = collection;
        }

        #endregion

        #region GetMongoCollection
        /// <summary>
        /// Gets the mongocollection 
        /// </summary>
        /// <returns></returns>
        public MongoCollection GetMongoCollection()
        {
            MongoCollection col=null;
            try
            {
                col = GetDataBase().GetCollection(_collection);
            }
             catch (MongoConnectionException ex)
            {
            	VisapLogger.LogErrorMessage("Error in QuizService.Connection.GetMongoCollection:"+ex.Message + "--Collection Name:"+ col);
                throw new VisapException(ex.Message);
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
                var mongoClient = new MongoClient(connString());
                mongoServer = mongoClient.GetServer();
                database = mongoServer.GetDatabase(dbName);
            }
              catch (MongoConnectionException ex)
            {
            	VisapLogger.LogErrorMessage("Error in QuizService.Connection.GetDataBase:"+ex.Message +"DB Name --"+ database);
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
                return ConfigurationManager.AppSettings["DbName"];
            }
        }

        #endregion

    }
}
