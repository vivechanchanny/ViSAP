using Excel.Visap.Common.ServiceUtility;
using Excel.Visap.Common.Utilities;
using Excel.Visap.DataAccessLayer;
using Excel.Visap.VideoAccess;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text;
using System.ComponentModel;
using System;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Collections.Generic;
using System.Web;

namespace Excel.Visap.SearchAccess
{
    public class CategoriesSearch : BaseEntity
    {
        private const string _collection ="Video";
        public CategoriesSearch()
            : base(_collection)
        {
        	
        }

        
        /// <summary>
        /// search based on category name
        /// </summary>
        /// <param name="searchKey">searchkey entered by user which is categoryname</param>
        /// <param name="userid">logged in username</param>
        /// <returns>List of videos</returns>
        public string SearchCategory(string searchKey, string userid)
        {
            string tittledescResult = null;

            try
            {
                VisapLogger.LogDebug("SearchCategory:Getting the Category data for the searchkey:" + searchKey);
                Video objVideo = new Video();
                MongoCursor<BsonDocument> videosList = objVideo.CategorySearch(searchKey, userid);
                if (videosList != null && videosList.Count() > 0)
                {
                    tittledescResult = GetDistictCategoryList(videosList, searchKey);
                    
                }
               
                
            }
            catch (MongoConnectionException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            return tittledescResult;

        }

        /// <summary>
        /// search based on category name
        /// </summary>
        /// <param name="searchKey">searchkey entered by user which is categoryname</param>
        /// <param name="userid">logged in username</param>
        /// <returns>List of videos</returns>
        public string GetCategoryList(string userid)
        {
            string tittledescResult = null;

            try
            {                
                Video objVideo = new Video();
                MongoCursor<BsonDocument> videosList = objVideo.GetListofCategoriesbyUser(userid);
                if (videosList != null && videosList.Count() > 0)
                {
                    tittledescResult = GetDistictCategoryList(videosList,null);                    
                }
            }
            catch (MongoConnectionException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            return tittledescResult;

        }

        /// <summary>
        /// Ctaegory list is returned for a particular videoid
        /// </summary>
        /// <param name="searchKey">searchkey entered by user which is categoryname</param>
        /// <param name="uname">logged in username</param>
        /// <returns>List of videos</returns>
        public string GetCategoryListbyVideoID(string username, string videoid)
        {
            string tittledescResult = null;

            try
            {
                VisapLogger.LogDebug("GetCategoryList:Getting the Category data for the video" + videoid);
                Video objVideo = new Video();
                MongoCursor<BsonDocument> videosList = objVideo.GetCategoryListbyVideoID(videoid);
                if (videosList != null && videosList.Count() > 0)
                {
                    tittledescResult = GetDistictCategoryList(videosList, null);                   
                }
            }
            catch (MongoConnectionException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            return tittledescResult;

        }




        /// <summary>
        /// As one video can be associated with multiple categories
        /// categories 
        /// </summary>
        /// <param name="searchKey">searchkey entered by user which is categoryname</param>
        /// <param name="cursor">contains search result</param>
        /// <returns>List of Distict categories with count</returns>
        protected string GetDistictCategoryList(MongoCursor<BsonDocument> cursor,string searchkey)
        {
            StringBuilder value = new StringBuilder();
            try
            {    
                List<string> catgoryCollection = new List<string>();              
                long count = cursor.Count();
                string[] arr = null;
                if (count > 0)
                {
                    
                    value.Append("[");                   
                    foreach (var item in cursor)
                    {  
                        BsonValue catgory = item.GetElement("category").Value;
                        catgory = catgory.ToString().Replace("[", string.Empty).Replace("]", string.Empty).Replace("+","%2b");                       
                        arr = System.Web.HttpUtility.UrlDecode(catgory.ToString()).Split(',');
                        if (string.IsNullOrEmpty(searchkey))
                            catgoryCollection.AddRange(arr.ToList());
                        else
                        {                        	
                            var temp = arr.Where(p => p.Contains(searchkey));
                            catgoryCollection.AddRange(temp.ToList());
                        }
                    }
                  value.Append(GetBsonDocument(catgoryCollection).ToJson());
                  value.Append("]");
                 VisapLogger.LogDebug("CategorySerach:ValidCategory:Category distinct list completed successfully");
                }

            }            
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error in search category");
            }
            return value.ToString();
        }

        /// <summary>
        /// Bsondocument containing count and categories 
        /// categories 
        /// </summary>
        /// <param name="count">Category count</param>
        /// <param name="catgoryCollection">contains search result</param>
        /// <returns>List of Distict categories with count</returns>
        protected BsonDocument GetBsonDocument(List<string> catgoryCollection)
        {                         
            BsonArray bsonCategoryArray = new BsonArray();
            foreach (var ptr in catgoryCollection.Distinct().ToList())
            {
                bsonCategoryArray.Add(ptr);
            }
            var bsonDocument = new BsonDocument {                        
                { "category", bsonCategoryArray }                    
            };

            return bsonDocument;
        }

    }
}
