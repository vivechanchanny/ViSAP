using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Excel.Visap.DataAccessLayer;
using MongoDB.Driver.Builders;
using MongoDB.Bson;
using MongoDB.Driver;
using Excel.Visap.Common.Utilities;
using System.Text.RegularExpressions;
using Excel.Visap.Common.ServiceUtility;
using DataAccessLayer;
using Excel.Visap.StoreConsants;
using Excel.Visap.VideoAccess;
using Excel.Visap.MetaDataAccess;

namespace Excel.Visap.SearchAccess
{
    public class SearchVideo : BaseEntity
    {
        private const string _collection ="Video";
        public SearchVideo()
            : base(_collection)
        {

        }

        /// <summary>
        ///Based on searchkey either tittle or tag is searched
        /// </summary>
        /// <param name="searchKey">searchkay typed by user</param>
        /// <param name="userid">logged in userid</param>        
        /// <returns></returns>
        public string GetSourceByTagorTittle(string searchKey, string userid)
        {
        	string tittleResult ="[]";
        	string tagresult;
            try
            {
                Video objVideo = new Video();
                //search for tittle 
                MongoCursor<BsonDocument> videosList = objVideo.GetSourceByTittle(searchKey, userid);
                if (videosList != null && videosList.Count() > 0)
                {
                    tittleResult =  Utility.GetAllDocuments(videosList);                
                    
                }
                //search for tags and for matched records return video details
                if(!(String.IsNullOrEmpty(searchKey)))
                {                    	
                	VideoMetaData objVideoMetaData = new VideoMetaData();                	
                	tagresult =	objVideoMetaData.CheckTagExistsReturnVideo(userid, searchKey, videosList);  
                	if(tagresult!="[]")
                	{
                		//Fix for tags and tittle search only
                		if(tittleResult=="[]")
                			tittleResult="";
                		tittleResult+= tagresult;
	                	if(videosList.Count() > 0)
	                	{
	                		if(tittleResult.Contains("}][{"))
	                		{
	                			tittleResult = tittleResult.Replace("}][{","},{");
	                		}
	                	}
                	}
                }                
              VisapLogger.LogDebug("serach:Total tittle and tag serach result for the serach key"+" "+searchKey+" "+"result is:"+tittleResult);
            }
            catch (MongoConnectionException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Search.GetSourceByTagorTittle ~ userid : +"+userid+" ~ skey : "+ searchKey +" "+ex.Message);
                throw new VisapException(ex.Message);
            }
            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Search.GetSourceByTagorTittle ~ userid : +"+userid+" ~ skey : "+ searchKey +" "+ex.Message);
                throw new VisapException(ex.Message);
            }
            return tittleResult;

        }
    }
}
