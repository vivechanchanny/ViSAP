using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Excel.Workspace.DataAccessLayer;
using MongoDB.Driver.Builders;
using MongoDB.Bson;
using MongoDB.Driver;
using Excel.Workspace.Common.Utilities;
using System.Text.RegularExpressions;
using Excel.Workspace.Common.ServiceUtility;
using DataAccessLayer;
using Excel.Workspace.StoreConsants;
using Excel.Workspace.VideoAccess;
using Excel.Workspace.MetaDataAccess;

namespace Excel.Workspace.SearchAccess
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
        public string GetSourceByTagorTittle(string searchKey, List<string> videolist, string mode)
        {
        	string tittleResult ="[]";
        	string tagresult;
            try
            {
                Video objVideo = new Video();
                //search for tittle 
                var videosList = objVideo.GetSourceByTittle(searchKey, videolist,mode);
                if (videosList != null && videosList.Count() > 0)
                {
                    tittleResult =  Video.GetAllDocuments(videosList);                
                    
                }
                //search for tags and for matched records return video details
                if(!(String.IsNullOrEmpty(searchKey)))
                {                    	
                	VideoMetaData objVideoMetaData = new VideoMetaData();                	
                	tagresult =	objVideoMetaData.CheckTagExistsReturnVideo(searchKey,mode, videosList,videolist);  
                	if(tagresult!="[]")
                	{
                		//Fix for tags and tittle search only
                		if(tittleResult=="[]")
                			tittleResult="";
                		tittleResult+= tagresult;
	                	if(videosList.Count() > 0 && tittleResult.Contains("}][{"))
	                	{
	                	   tittleResult = tittleResult.Replace("}][{","},{");
	                	}
                	}
                }                
              VisapLogger.LogDebug("serach:Total tittle and tag serach result for the serach key"+" "+searchKey+" "+"result is:"+tittleResult);
            }
            catch (MongoConnectionException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Search.GetSourceByTagorTittle ~  skey : "+ searchKey +" "+ex.Message);
                throw new VisapException(ex.Message);
            }
            catch (VisapException ex)
            {
            	VisapLogger.LogErrorMessage("Error in DataAccess.Search.GetSourceByTagorTittle ~  skey : "+ searchKey +" "+ex.Message);
                throw new VisapException(ex.Message);
            }
            catch(Exception ex){
            	VisapLogger.LogError(ex);
            	 throw new VisapException(ex.Message);
            }
            return tittleResult;

        }
    }
}
