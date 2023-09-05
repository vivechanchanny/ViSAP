using System;
using System.Drawing;
using System.IO;
using DataAccessLayer;
using Excel.Visap.Common.ServiceUtility;
using Excel.Visap.Common.Utilities;
using Excel.Visap.Log;
using Excel.Visap.StoreConsants;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace Excel.Visap.DataAccessLayer
{
    public class EditableBaseEntity : BaseEntity
    {

        #region Constructor
        private string _collection = string.Empty;
        public EditableBaseEntity(string collection)
            : base(collection)
        {
            _collection = collection;
        }
      
        #endregion

        #region SaveMethod

        /// <summary>
        /// Save method accepts videos list and username. Creates a unique GUID for the videos list and save data to Database
        /// </summary>
        /// <param name="doc">Videos document list</param>
        /// <param name="userid">Logged in user name</param>
        public virtual string Save(string doc, string userid, string isUpload)
        {
            MongoDBconnection objCon = new MongoDBconnection(_collection);
            BsonValue id = null;
            try
            {  
                string name = userid;
                var videolist = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonArray>(doc);
                MongoCollection col = objCon.GetMongoCollection();
                
                //multiple videos can be saved but now its single document while uploading
                foreach (var ptr in videolist)
                {                    
                    if (isUpload == "true")
                    {
                        VisapLogger.LogDebug("EditableBaseEntity:Save:StoreSanpShot:storing snapshot in repo");
                        StoreSanpShot(ptr.ToBsonDocument());
                    }
                   
                    if (!ptr.ToBsonDocument().Contains("_id"))
                    {
                        //creation of new GUID
                        VisapLogger.LogDebug("Save:create new Guid ");
                        Guid originalGuid = Guid.NewGuid();
                        string uid = originalGuid.ToString("N");
                        id = uid;
                        VisapLogger.LogDebug("Save:newly created Guid:" + id);
                    }
                    else
                    {
                        //use existing ID
                        var uniqueID = ptr.ToBsonDocument().GetElement("_id");
                        id = uniqueID.Value;
                        VisapLogger.LogDebug("EditableBaseEntity:Save:Update for the Existing Video with ID:" + id);
                    }
                    VisapLogger.LogDebug("EditableBaseEntity:Save:Saving data for the collection:" + _collection);
                    BsonValue bsonName = name;                  
                    //userid added part of document 
                    BsonElement elem = new BsonElement("userid", bsonName);
                    ptr.ToBsonDocument().SetElement(elem);
                    //date is added as an element as we need to show latest uploaded videos
                    VisapLogger.LogDebug("EditableBaseEntity:Save:Add Date Element to the record");
                    BsonElement dateelem = new BsonElement("date", DateTime.Now);
                    ptr.ToBsonDocument().SetElement(dateelem);
                    var currentVideo = ptr.ToBsonDocument();
                    FormatToSave(ref currentVideo);
                    ptr.ToBsonDocument().SetElement(elem);
                    var query = Query.EQ("_id", id);                   
                    IMongoUpdate updateDoc = new UpdateDocument("$set", ptr);
                    col.Update(query, updateDoc, UpdateFlags.Upsert);
                    VisapLogger.LogDebug("EditableBaseEntity:Save:Video Saved/Updated Successfully for the ID:"+id.ToString());
                }

            }
            catch (MongoDuplicateKeyException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            catch (MongoException ex)
            {

                ErrorLogger.Instance().Error(ex);
                throw new VisapException(ex.Message);
            }
            catch(System.Exception ex)
            {
            	ErrorLogger.Instance().Error(ex.Message);
                throw new VisapException(ex.Message);
            }
            finally
            {

            }
            return id.ToString();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ptr"></param>
        private  void StoreSanpShot(BsonDocument ptr)
        {
            BsonValue snapShot = null;
            BsonValue filename = null;
            BsonValue sourceType = null;
            string strfilename = string.Empty;

            sourceType = ptr.ToBsonDocument().GetElement("sourcetype").Value;
            if (sourceType ==Constants.sourceTypes.uploaded)//To cross check that only static file images are stored in snapshot repository
            {
                VisapLogger.LogDebug("EditableBaseEntity:Save:StoreSanpShot:Snapshot is storedfor the video"+sourceType);
                snapShot = ptr.ToBsonDocument().GetElement("snap").Value;
                filename = ptr.ToBsonDocument().GetElement("src").Value;
                strfilename = filename.ToString().GetOnlyName(4) + Constants.ImageType;
                if (!(snapShot == strfilename))//If already snapshot is updated with filename skip
                {
                    VisapLogger.LogDebug("EditableBaseEntity:Save:StoreSanpShot:Snapshot Saved in filename" + strfilename);
                    BsonValue imageName = strfilename;
                    ptr.ToBsonDocument().Set("snap", imageName);
                    SaveByteArrayAsImage(snapShot.ToString(), strfilename);
                }
                VisapLogger.LogDebug("EditableBaseEntity:Save:StoreSanpShot:Snapshot Saved Succssfully");
            }
        }
      
        /// <summary>
        /// 
        /// </summary>
        /// <param name="base64String"></param>
        /// <param name="filename"></param>
        private void SaveByteArrayAsImage(string base64String,string filename)
        {
           
            var base64str=base64String.Split(',');   
            if(!(String.IsNullOrEmpty(base64str[1])))
            {
                byte[] bytes = Convert.FromBase64String(base64str[1]);
                Image image;         
                string path = System.Web.Configuration.WebConfigurationManager.AppSettings["snapshotRepository"];
                path = path + filename;
                 VisapLogger.LogDebug("EditableBaseEntity:SaveByteArrayAsImage:Saving image with the filename and path " + path);
                using (var ms = new MemoryStream(bytes))
                {
                    using (image = Image.FromStream(ms))
                      {
                          image.Save(path, System.Drawing.Imaging.ImageFormat.Png);                     
                      }                           
                }
                VisapLogger.LogDebug("EditableBaseEntity:SaveByteArrayAsImage:Image Saved under filename" + filename);
            }
        }
        
        /// <summary>
        /// Formating the data before Inserting or updating based on the collection
        /// </summary>
        /// <param name="collection">videocollection </param>
        /// <param name="currentbsonDocument"> bsondocument for formatting is required</param>
        protected virtual void FormatToSave(ref BsonDocument currentbsonDocument) { }

        #endregion

        #region DeleteMethod and query
        /// <summary>
        /// Delete data from collection  based on ID       
        /// </summary>       
        /// <param name="query">where clause for GUID</param>        
        protected void Delete(IMongoQuery mongoquery)
        {
            try
            {
                VisapLogger.LogDebug("EditableBaseEntity:Deleting the record");
                var objCon = new MongoDBconnection(_collection);
                var col = objCon.GetMongoCollection();
                col.Remove(mongoquery);

            }
            catch (MongoException ex)
            {
                //log the original exception and throw friendly message can be used in client side
                VisapLogger.LogError(ex);
                throw new VisapException("Error while deleting the record");
            }
        }
        
        protected void DeletSanpshot(string id)
        {
        	 var objCon = new MongoDBconnection(_collection);
             var collection = objCon.GetMongoCollection();
             BsonDocument doc= SearchOneDocument(collection,Query.EQ("_id",id));  
             var sourcetype= doc.GetElement("sourcetype").Value;   
              var src= doc.GetElement("src").Value;                   
               if(sourcetype==0)
               {
               	var snapshot1= doc.GetElement("snap").Value;
	            var videocount= Searchbyquery(collection,Query.EQ("snap", snapshot1));
	             if(videocount.Count()==1)
	             {
	             	//System.IO.File.Delete(System.Web.Configuration.WebConfigurationManager.AppSettings["snapshotRepository"] + snapshot1);
	               //System.IO.File.Delete(System.Web.Configuration.WebConfigurationManager.AppSettings["videoRepository"] + src);
	             }   
               }
            
        }
        

        /// <summary>
        /// common delete query based on ID 
        /// </summary>
        /// <param name="ID">unique guid</param> 
        /// <returns>query which can be used</returns>
        protected IMongoQuery GetDeleteQuery(string ID)
        {
            IMongoQuery query = null;
            try
            {
                query = Query.EQ("_id", ID);
            }
            catch (MongoQueryException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error while delete query");
            }
            return query;
        }

        /// <summary>
        /// userid query
        /// </summary>
        /// <param name="userid">building query for passed userid </param>
        /// <returns>userid query which can be used</returns>
        protected IMongoQuery GetUsernameQuery(string userid)
        {
            IMongoQuery query = null;
            try
            {

                query = Query.EQ("userid", userid);
            }
            catch (MongoQueryException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error while creating  query");
            }
            return query;
        }
        #endregion

    }

}

