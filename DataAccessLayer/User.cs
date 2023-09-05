
#region Refranance
using System.Text;
using DataAccessLayer;
using Excel.Visap.Common.Utilities;
using Excel.Visap.DataAccessLayer;
using Excel.Visap.StoreConsants;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
#endregion


namespace Excel.Visap.User
{
    #region Class definition
    public  class User : BaseEntity
    {
        private const string _collection ="Users";
        public User()
            : base(_collection)
        {
            
        }

        #region GetAllUsers
        /// <summary>
        /// Gets the list of Users        
        /// </summary>
        /// <returns></returns>
        public string GetAllUsers()
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            StringBuilder value = new StringBuilder();
            try
            {
               
                var userlist = Search();
                if (userlist != null)
                {
                    long count = userlist.Count();
                    if (count > 0)
                    {
                        value.Append("[");
                        foreach (var item in userlist)
                        {
                            //item.Remove("_id");
                            value.Append(item);
                            if (count > 1)
                                value.Append(",");
                        }
                        if (count > 1)
                            value.Remove(value.Length - 1, 1);
                        value.Append("]");
                    }
                    else
                        value.Append("[]");

                }

            }
            catch (VisapException ex)
            {
                throw new VisapException("no users found");
            }
            return value.ToString();
        }

        
         public string GetUserId(string userName)
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            var userCollection = objcon.GetMongoCollection();
            BsonDocument user = null;
            string userId = string.Empty;
            try
            {             
                var query =Query.EQ("username", userName);
                user = SearchOneDocument(userCollection, query);
                if (user != null)
                {
                    userId = user.GetElement("_id").Value.ToString();                    
                }
            }
            catch (VisapException ex)
            {
                throw new VisapException("userId is not found");
            }
            return userId;
        }
        
        #region CheckUserValidity
        /// <summary>
        /// Check User Validity, If valid return its role        
        /// </summary>
        /// <returns></returns>
        public string CheckUserValidity(string username, string password)
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            var userCollection = objcon.GetMongoCollection();
            BsonDocument user = null;
            string userRole = string.Empty;
            try
            {             
                var query = Query.And(Query.EQ("username", username), Query.EQ("pwd", password));
                user = SearchOneDocument(userCollection, query);
                if (user != null)
                {
                    userRole = user.GetElement("role").Value.ToString();                    
                }
            }
            catch (VisapException ex)
            {
                throw new VisapException("no users found");
            }
            return userRole;
        }
        #endregion


        // <summary>
        /// mapping required for role based data for student login
        /// </summary>
        /// <param name="loggedinrole"></param>
        /// <param name="collectionName"></param>
        /// <returns></returns>
        /// 
        public string GetMappedInstructor(string loggedinrole)
        {
          
            MongoDBconnection objCon = new MongoDBconnection(Constants.USERS);
            VisapLogger.LogDebug("DataAccess:GetMappedInstructor:get the mapped Instructor" + loggedinrole);
            string username = null;
            try
            {
                var query = Query.EQ("_id",  ObjectId.Parse(loggedinrole));
                var col = objCon.GetMongoCollection();
                var doc = col.FindOneAs<BsonDocument>(query);
                username = doc.GetElement("Studentauthor").Value.ToString();
            
            }
            catch (MongoConnectionException ex)
            {
                throw new VisapException(ex.Message);

            }
            return username.ToString();

        }

        #endregion

    }
    #endregion
}


