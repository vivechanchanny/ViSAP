using  Excel.Workspace.DataAccessLayer;
using System.Drawing;
using System.IO;
using DataAccessLayer;
using Excel.Workspace.Common.ServiceUtility;
using Excel.Workspace.Common.Utilities;
using Excel.Workspace.Log;
using Excel.Workspace.StoreConsants;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Newtonsoft.Json.Linq;

namespace Excel.Workspace.Auth
{
    public class Authentications : EditableBaseEntity
    {

        #region Constructor
        private const string _collection ="Users";
        public Authentications()
            : base(_collection)
        {
            
        }
        #endregion       
       
        
        public string ValidateUser(string username,string password)
        {
            MongoDBconnection objCon = new MongoDBconnection(_collection);
           string role = null;
            BsonValue bsonName=username;
            BsonValue bsonPassword=password;
            
            try
            { 
               var query = Query.And(Query.EQ("loginname",bsonName), Query.EQ("password", bsonPassword));
                MongoCollection col = objCon.GetMongoCollection();
                var user= col.FindOneAs<BsonDocument>(query);              
                if (user != null)
                {
                    role = user.GetElement("role").Value.ToString(); 
                    VisapLogger.LogDebug("ValidateUser:role of the logged in User"+role);                    
                }
                
            }           
            catch (MongoDuplicateKeyException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }        	
            return role;
        }
        
    }
}