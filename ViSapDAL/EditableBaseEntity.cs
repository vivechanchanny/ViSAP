using System;
using System.Drawing;
using System.IO;
using DataAccessLayer;
using Excel.Workspace.Common.ServiceUtility;
using Excel.Workspace.Common.Utilities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Excel.Workspace.Log;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.VideoAccess;
namespace Excel.Workspace.DataAccessLayer
{
	public class EditableBaseEntity :BaseEntity
    {

        #region Constructor
        readonly string _collection = string.Empty;
        public EditableBaseEntity(string collection)  :
        	base(collection)
        {
            _collection = collection;
        }
      
        #endregion

        /// <summary>
        /// Save method accepts videos list and username. Creates a unique GUID for the workspace and save data to Database
        /// </summary>
        /// <param name="doc">workspace and Users info</param>
        
        public virtual string Save(string doc)
        {
            MongoDBconnection objCon = new MongoDBconnection(_collection);
            string id = null;
            try
            {         
                   BsonValue workspace = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonValue>(doc);
                    if (!workspace.ToBsonDocument().Contains("_id"))
                    {                       
                        Guid originalGuid = Guid.NewGuid();
                        string uid = originalGuid.ToString("N");
                        id = uid;                       
                    }
                    else
                    {
                        //use existing ID
                        var uniqueID = workspace.ToBsonDocument().GetElement("_id");
                        id = uniqueID.Value.ToString();
                    }
                    MongoCollection col = objCon.GetMongoCollection();
                    var query = Query.EQ("_id", id);
                    IMongoUpdate updateDoc = new UpdateDocument("$set", workspace);
                    col.Update(query, updateDoc, UpdateFlags.Upsert);
                    VisapLogger.LogInfo("EditableBaseEntity:Save:Workspace Saved/Updated Succssfully for the ID:"+id);
               
            }
            catch (MongoDuplicateKeyException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            catch (MongoException ex)
            {

                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            catch(System.Exception ex)
            {
            	  VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
            return id;
        }
        
        
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
                    ptr.ToBsonDocument().Remove("ownername");//removeing ownername from the video data.
                    
                    if (isUpload == "true")
                    {
                        VisapLogger.LogDebug("EditableBaseEntity:Save:StoreSanpShot:storing snapshot in repo");
                        StoreSanpShot(ptr.ToBsonDocument());
                        //store one more field isstage true while uploading video.
                        BsonElement stageValue = new BsonElement("isstage", true);
                        ptr.ToBsonDocument().SetElement(stageValue);
                    }
                    else
                    {
                    	 BsonElement stageValue = new BsonElement("isstage", false);
                        ptr.ToBsonDocument().SetElement(stageValue);
                    
                    }
                   
                    if (!ptr.ToBsonDocument().Contains("_id"))
                    {
                        //creation of new GUID
                        VisapLogger.LogDebug("Save:create new Guid ");
                        Guid originalGuid = Guid.NewGuid();
                        string uid = originalGuid.ToString("N");
                        id = uid;
                        
                        Assign assignObj=new Assign();
                        assignObj.mapOwner(id,userid);
                        
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
                    BsonElement elem = new BsonElement("userid", bsonName);// Todo WS: Need to change  if userid field as owner id
                    ptr.ToBsonDocument().SetElement(elem);
                    //date is added as an element as we need to show latest uploaded videos
                    VisapLogger.LogDebug("EditableBaseEntity:Save:Add Date Element to the record");
                    if(!ptr.ToBsonDocument().Contains("_id"))
                    {
                    BsonElement dateEle = new BsonElement(ViSAP.fields.VideoCollection.Date, DateTime.Now);
                    ptr.ToBsonDocument().SetElement(dateEle);
                    }
                    BsonElement modifiedEle = new BsonElement(ViSAP.fields.VideoCollection.ModifiedDate, DateTime.Now);
                    ptr.ToBsonDocument().SetElement(modifiedEle);
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
            return id.ToString();
        }
		
        //updates captionID
        public virtual void Save(string videoId,string captionId)
        {
        	MongoDBconnection objdb = new MongoDBconnection(_collection);
        	var col = objdb.GetMongoCollection<VideoAccess.Video>();
        	 VisapLogger.LogDebug("EditableBaseEntity:Save:updating captionid to video collection, videoID: "+videoId+"captionID"+captionId);
        	try
        	{
        		IMongoQuery query = Query.EQ("_id",videoId);
        		var setid =  Update.Set("captionId",captionId);
				col.Update(query,setid);
        	}
        	
        	catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
        	
        }
        /// <summary>
        /// <description>Stores snapshot of uploaded file to Repo path</description>
        /// </summary>
        /// <param name="ptr"></param>
        private  void StoreSanpShot(BsonDocument ptr)
        {
            BsonValue snapShot = null;
            BsonValue filename = null;
            BsonValue sourceType = null;
            string strfilename = string.Empty;

            try
            {
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
            catch(Exception ex){
            	VisapLogger.LogError(ex);
                throw new VisapException(ex.Message);
            }
        }
      
        /// <summary>
        /// <description>Converts array data to base 64 image.</description>
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
        /// Gets all the documents from 
        /// </summary>
        /// <returns></returns>
        public virtual string GetAllDocuments()
        {
            MongoDBconnection objcon = new MongoDBconnection(_collection);
            string list = null;
            try
            {
                
                var col = objcon.GetMongoCollection();
                 MongoCursor<BsonDocument> bsonlist  = col.FindAllAs<BsonDocument>();
                 list=bsonlist.ToJson();
                
            }
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error Ocurred while getting data.Please Contact Admin");
            }
            return list;
        }
        
        
        /// <summary>
        /// Deletes document from database us
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
          public virtual void Delete(string id)
       	  {
            MongoDBconnection objcon = new MongoDBconnection(_collection);           
            try
            {
            	BsonValue bid=id;
                var query = Query.EQ("_id", bid);
                var col = objcon.GetMongoCollection();
                col.Remove(query);                
            }
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error Ocurred while deleting user.Please Contact Admin");
            }           
         }
          
          
            
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
        
          
          
          
            /// <summary>
        /// Formating the data before Inserting or updating based on the collection
        /// </summary>
        /// <param name="collection">videocollection </param>
        /// <param name="currentbsonDocument"> bsondocument for formatting is required</param>
        protected virtual void FormatToSave(ref BsonDocument currentbsonDocument) { }
        
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
        
    }
}


    



