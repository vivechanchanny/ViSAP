using DataAccessLayer;
using Excel.Visap.Common.Utilities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace Excel.Visap.DataAccessLayer
{
    public class BaseEntity
    {
        #region Constructor
        private string _collection = string.Empty;
        public BaseEntity(string collection)
        {
            _collection = collection;
        }
      
        #endregion

        #region SearchOneDocument
        /// <summary>
        /// Common Search method which can be used to get single document
        /// </summary>
        /// <param name="col">collection on which search has to run</param>
        /// <param name="query">query to get data </param>
        /// <returns>query</returns>       
        protected BsonDocument SearchOneDocument(MongoCollection col, IMongoQuery query)
        {
            BsonDocument videosList = null;
            try
            {
                videosList = col.FindOneAs<BsonDocument>(query);

            }
            catch (VisapException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("SearchOneDocument:Error ocurred while getting data.Please Contact Admin");
            }
            return videosList;
        }

        #endregion

        #region Searchbyquery
        /// <summary>
        /// Below method which return a set of records based on the where clause query     
        /// </summary>
        /// <param name="col">collecion name</param>
        /// <param name="query">query or where clause</param>
        /// <returns>mongocursor means a set of videos </returns>
        protected MongoCursor<BsonDocument> Searchbyquery(MongoCollection col, IMongoQuery query)
        {
            MongoCursor<BsonDocument> videosList = null;
            try
            {
                videosList = col.FindAs<BsonDocument>(query);
            }
            catch (VisapException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Searchbyquery:Error Ocurred while searching data.Please Contact Admin");
            }
            return videosList;
        }
        #endregion

        #region GetAllbyUser
        /// <summary>
        /// Gets documents dorted by date
        /// </summary>       
        /// <param name="query">query or where clause</param>
        /// <returns>mongocursor means a set of videos </returns>
        public MongoCursor<BsonDocument> GetAllDocumentsSortedbyDate(IMongoQuery query)
        {
            MongoDBconnection objCon = new MongoDBconnection(_collection);
            MongoCursor<BsonDocument> videoList = null;
            try
            {
                
                var col = objCon.GetMongoCollection();
                videoList = col.FindAs<BsonDocument>(query).SetSortOrder(SortBy.Descending("date"));
            }
            catch (VisapException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error Ocurred while getting data.Please Contact Admin");
            }
            return videoList;
        }
        #endregion

        #region Search
        /// <summary>      
        /// Gets all the records in the collection 
        /// </summary>
        /// <returns>mongocursor means a set of videos </returns>
        protected MongoCursor<BsonDocument> Search()
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            MongoCursor<BsonDocument> list = null;
            try
            {
                VisapLogger.LogDebug("Getting all the records from database");
                var col = objcon.GetMongoCollection();
                list = col.FindAllAs<BsonDocument>();
            }
            catch (VisapException ex)
            {
                throw new VisapException("No records  found");
            }
            return list;
        }

        #endregion

    }
}

