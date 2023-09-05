using DAL.Base;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Configuration;
using MongoDB.Driver.Builders;

namespace UnitTestVisap
{
    
    
    /// <summary>
    ///This is a test class for BaseEntityTest and is intended
    ///to contain all BaseEntityTest Unit Tests
    ///</summary>
    [TestClass()]
    public class BaseEntityTest
    {
        /// <summary>
        ///A test for BatchInsert
        ///</summary>
        [TestMethod()]
        public void BatchInsertTest()
        {
            
            MongoTestHelper objMongoTestHelper = new MongoTestHelper();
            BaseEntity_Accessor target = new BaseEntity_Accessor(); 
            MongoCollection col = MongoTestHelper.mockcollection("VideoCollection");
            var data = "[{'_id':'1','UserID' :'1','titlefriday':'updation working good','t':'Snapshot of the video','desc':'description','src':'NextMoonMission.mp4','actions':[{'currentTime':1.770412,'listAction':[{'type':'sketch','data':{'time':'1.770412','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'1.770412','title':'An1','description':'Title of the annoatation','duration':'4'}},{'type':'questions','data':{'id':'1','qtitle':'Q1','options':['A1','A2'],'qans':'2','startTime':'1.770412','qtag':'null'}}]},{'currentTime':'5.985286','listAction':[{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'5.985286','title':'An2','description':'Anoatstion desc','duration':'4'}}]}],'time':'0'},{'_id':'2','UserID':'2','titlefriday':'updation working good','t':'Snapshot of the video','desc':'description','src':'NextMoonMission.mp4','actions':[{'currentTime':1.770412,'listAction':[{'type':'sketch','data':{'time':'1.770412','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'1.770412','title':'An1','description':'Title of the annoatation','duration':'4'}},{'type':'questions','data':{'id':'1','qtitle':'Q1','options':['A1','A2'],'qans':'2','startTime':'1.770412','qtag':'null'}}]},{'currentTime':'5.985286','listAction':[{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'5.985286','title':'An2','description':'Anoatstion desc','duration':'4'}}]}],'time':'0'}]";
            
            var docList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(data);

            bool expected = true;
            bool actual;
            actual = target.BatchInsert(col, docList);
            Assert.AreEqual(expected, actual);          
        }

        [TestMethod()]
        public void BatchInsertTestPublished()
        {

            MongoTestHelper objMongoTestHelper = new MongoTestHelper();
            BaseEntity_Accessor target = new BaseEntity_Accessor();
            MongoCollection col = MongoTestHelper.mockcollection("PublishedUsersCollection");
            var data = "[{'_id':'1','UserID' :'1','titlefriday':'updation working good','t':'Snapshot of the video','desc':'description','src':'NextMoonMission.mp4','actions':[{'currentTime':1.770412,'listAction':[{'type':'sketch','data':{'time':'1.770412','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'1.770412','title':'An1','description':'Title of the annoatation','duration':'4'}},{'type':'questions','data':{'id':'1','qtitle':'Q1','options':['A1','A2'],'qans':'2','startTime':'1.770412','qtag':'null'}}]},{'currentTime':'5.985286','listAction':[{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'5.985286','title':'An2','description':'Anoatstion desc','duration':'4'}}]}],'time':'0'},{'_id':'2','UserID':'2','titlefriday':'updation working good','t':'Snapshot of the video','desc':'description','src':'NextMoonMission.mp4','actions':[{'currentTime':1.770412,'listAction':[{'type':'sketch','data':{'time':'1.770412','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'1.770412','title':'An1','description':'Title of the annoatation','duration':'4'}},{'type':'questions','data':{'id':'1','qtitle':'Q1','options':['A1','A2'],'qans':'2','startTime':'1.770412','qtag':'null'}}]},{'currentTime':'5.985286','listAction':[{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'sketch','data':{'time':'5.985286','img':'image data comes here','duration':'3'}},{'type':'annotation','data':{'time':'5.985286','title':'An2','description':'Anoatstion desc','duration':'4'}}]}],'time':'0'}]";

            var docList = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(data);

            bool expected = true;
            bool actual;
            actual = target.BatchInsert(col, docList);
            Assert.AreEqual(expected, actual);
        }
        /// <summary>
        ///A test for DeleteBYCollection
        ///</summary>
        [TestMethod()]
        [DeploymentItem("DataAccessLayer.dll")]
        public void DeleteBYCollectionTest()
        {
            BaseEntity_Accessor target = new BaseEntity_Accessor(); 
            MongoCollection col = MongoTestHelper.mockcollection("VideoCollection");
            long expected = 2; 
            long actual;
            actual = target.DeleteBYCollection(col);
            Assert.AreEqual(expected, actual);           
        }

        /// <summary>
        ///A test for DeleteBYCollection
        ///</summary>
        [TestMethod()]
        [DeploymentItem("DataAccessLayer.dll")]
        public void DeleteBYCollectionTestPublished()
        {
            BaseEntity_Accessor target = new BaseEntity_Accessor();
            MongoCollection col = MongoTestHelper.mockcollection("PublishedUsersCollection");
            long expected = 2;
            long actual;
            actual = target.DeleteBYCollection(col);
            Assert.AreEqual(expected, actual);
            Assert.Inconclusive("test failed");
        }
        /// <summary>
        ///A test for GetDataByUserID
        ///</summary>
        [TestMethod()]
        public void GetDataByUserIDTest()
        {
            BaseEntity_Accessor target = new BaseEntity_Accessor(); 
            MongoCollection col = MongoTestHelper.mockcollection("PublishedUsersCollection");
            BsonValue s = "1";
            var query = Query.EQ("UserID", s);
            string expected = "[{ \"_id\" : \"1\", \"UserID\" : \"1\", \"titlefriday\" : \"updation working good\", \"t\" : \"Snapshot of the video\", \"desc\" : \"description\", \"src\" : \"NextMoonMission.mp4\", \"actions\" : [{ \"currentTime\" : 1.770412, \"listAction\" : [{ \"type\" : \"sketch\", \"data\" : { \"time\" : \"1.770412\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"annotation\", \"data\" : { \"time\" : \"1.770412\", \"title\" : \"An1\", \"description\" : \"Title of the annoatation\", \"duration\" : \"4\" } }, { \"type\" : \"questions\", \"data\" : { \"id\" : \"1\", \"qtitle\" : \"Q1\", \"options\" : [\"A1\", \"A2\"], \"qans\" : \"2\", \"startTime\" : \"1.770412\", \"qtag\" : \"null\" } }] }, { \"currentTime\" : \"5.985286\", \"listAction\" : [{ \"type\" : \"sketch\", \"data\" : { \"time\" : \"5.985286\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"sketch\", \"data\" : { \"time\" : \"5.985286\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"annotation\", \"data\" : { \"time\" : \"5.985286\", \"title\" : \"An2\", \"description\" : \"Anoatstion desc\", \"duration\" : \"4\" } }] }], \"time\" : \"0\" }]";                        
            string actual;
            actual = target.GetDataByUserID(col, query);
            Assert.AreEqual(expected, actual);
          
        }


        /// <summary>
        ///A test for SelectAll
        ///</summary>
        [TestMethod()]
        public void SelectAllTest()
        {
            BaseEntity_Accessor target = new BaseEntity_Accessor();
            //excepted should be whatever in db at that time
            MongoCollection col = MongoTestHelper.mockcollection("VideoCollection");
            string expected = "[{ \"_id\" : \"1\", \"UserID\" : \"1\", \"titlefriday\" : \"updation working good\", \"t\" : \"Snapshot of the video\", \"desc\" : \"description\", \"src\" : \"NextMoonMission.mp4\", \"actions\" : [{ \"currentTime\" : 1.770412, \"listAction\" : [{ \"type\" : \"sketch\", \"data\" : { \"time\" : \"1.770412\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"annotation\", \"data\" : { \"time\" : \"1.770412\", \"title\" : \"An1\", \"description\" : \"Title of the annoatation\", \"duration\" : \"4\" } }, { \"type\" : \"questions\", \"data\" : { \"id\" : \"1\", \"qtitle\" : \"Q1\", \"options\" : [\"A1\", \"A2\"], \"qans\" : \"2\", \"startTime\" : \"1.770412\", \"qtag\" : \"null\" } }] }, { \"currentTime\" : \"5.985286\", \"listAction\" : [{ \"type\" : \"sketch\", \"data\" : { \"time\" : \"5.985286\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"sketch\", \"data\" : { \"time\" : \"5.985286\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"annotation\", \"data\" : { \"time\" : \"5.985286\", \"title\" : \"An2\", \"description\" : \"Anoatstion desc\", \"duration\" : \"4\" } }] }], \"time\" : \"0\" },{ \"_id\" : \"2\", \"UserID\" : \"2\", \"titlefriday\" : \"updation working good\", \"t\" : \"Snapshot of the video\", \"desc\" : \"description\", \"src\" : \"NextMoonMission.mp4\", \"actions\" : [{ \"currentTime\" : 1.770412, \"listAction\" : [{ \"type\" : \"sketch\", \"data\" : { \"time\" : \"1.770412\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"annotation\", \"data\" : { \"time\" : \"1.770412\", \"title\" : \"An1\", \"description\" : \"Title of the annoatation\", \"duration\" : \"4\" } }, { \"type\" : \"questions\", \"data\" : { \"id\" : \"1\", \"qtitle\" : \"Q1\", \"options\" : [\"A1\", \"A2\"], \"qans\" : \"2\", \"startTime\" : \"1.770412\", \"qtag\" : \"null\" } }] }, { \"currentTime\" : \"5.985286\", \"listAction\" : [{ \"type\" : \"sketch\", \"data\" : { \"time\" : \"5.985286\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"sketch\", \"data\" : { \"time\" : \"5.985286\", \"img\" : \"image data comes here\", \"duration\" : \"3\" } }, { \"type\" : \"annotation\", \"data\" : { \"time\" : \"5.985286\", \"title\" : \"An2\", \"description\" : \"Anoatstion desc\", \"duration\" : \"4\" } }] }], \"time\" : \"0\" }]"; 
            string actual;
            actual = target.SelectAll(col);
            Assert.AreEqual(expected, actual);
           
        }

        /// <summary>
        ///A test for SelectAll
        ///</summary>
        [TestMethod()]
        public void SelectAllTestPublished()
        {
            BaseEntity_Accessor target = new BaseEntity_Accessor(); 
            MongoCollection col = MongoTestHelper.mockcollection("PublishedUsersCollection");
            //excepted should be whatever in db at that time
            string expected = string.Empty; 
            string actual;
            actual = target.SelectAll(col);
            Assert.AreEqual(expected, actual);
            
        }
    }
}
