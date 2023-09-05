using System.Configuration;
using Excel.Visap.Common.Utilities;
using MongoDB.Driver;

namespace DataAccessLayer
{
    internal class MongoDBconnection
    {
        #region Constructor
        private string _collection = string.Empty;
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
            MongoCollection col;
            try
            {
                col = GetDataBase().GetCollection(_collection);
            }
            catch (MongoConnectionException con)
            {
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
                var mongoClient = new MongoClient(connString());
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
                return ConfigurationManager.AppSettings["DbName"];
            }
        }

        #endregion

    }
}
