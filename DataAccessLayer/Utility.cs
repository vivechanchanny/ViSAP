using System;
using System.ComponentModel;
using System.Text;
using Excel.Visap.Common.Utilities;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Excel.Visap.Common.ServiceUtility
{
    #region GetAllDocuments
    /// <summary>
    /// Utility Method to Format raw data can be extended if required
    /// </summary>
    internal  class Utility
    {
        public static  string GetAllDocuments(MongoCursor<BsonDocument> cursor)
        {
            StringBuilder value = new StringBuilder();
            try
            {
             
                long count = cursor.Count();
                if (count > 0)
                {                  
                    value.Append("[");
                    foreach (var item in cursor)
                    {
                        foreach (BsonElement ele in item)
                        {
                            //Guid needs to sent as string comfortable for client
                            if (ele.Name == "_id")
                            {
                                var typeCon = TypeDescriptor.GetConverter(ele.Value).ConvertTo(ele.Value, typeof(string));
                            }
                        }   
                        //date not required to client
                        item.Remove("date");
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
            catch (MongoConnectionException ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("Error in connection to db");
            }
            catch (Exception ex)
            {
                VisapLogger.LogError(ex);
                throw new VisapException("No records Found");
            }
            return value.ToString();

        }

    }

    public static class StringExtension
    {
        public static string GetOnlyName(this string source, int tail_length)
        {
            //if (tail_length >= source.Length)
            //    return source;
           return source.Remove(source.Length - tail_length);           
        }
    }

    #endregion
}
