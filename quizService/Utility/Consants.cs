using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;



namespace Excel.Visap.StoreConsants
{
    /// <summary>
    /// Container for global constants.
    /// </summary>
    public class Constants
    {
        /// <remarks>
        /// Private constructor to prevent instantiation of, or inheritance
        // from, this class.
        /// </remarks>
        public Constants()
        {

        }
       public enum sourceTypes { 
                uploaded= 0,
                youtube= 1,
                timeline= 2,
                directURL= 3
        }
        public const string VIDEO = "Video";
        public const string METADATA = "MetaData";
        public const string USERS = "Users";
        public const string MAPPING= "Mapping";
        public const string TIMELINESOURCETYPE = "2";
        public const int HTTP_BAD_REQUEST = 400;
        public const int HTTP_Unauthorised = 401;
        public const string ImageType = ".png";
        public const String Auth_Separator = "|";

        public const string ROLESTUDENT = "Student";
        public const string ROLEINSTRUCTOR = "Instructor";
       
    }

}
