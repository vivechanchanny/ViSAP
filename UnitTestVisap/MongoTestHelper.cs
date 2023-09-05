using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MongoDB.Driver;
using System.Configuration;

namespace UnitTestVisap
{
    public  class MongoTestHelper
    {

        public static MongoCollection mockcollection(string name)
        {
        
            const string connectionString = "mongodb://localhost";
            var client = new MongoClient(connectionString);
            MongoServer server = client.GetServer();
            MongoDatabase database = server.GetDatabase("UnitTestDB");
            return database.GetCollection(name);
        }
    }
}
