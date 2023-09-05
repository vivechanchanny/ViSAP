using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Excel.Workspace.StoreConsants
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
        public enum Roles{
		        superadmin='1',
		        admin='2',
		        instructor='3',
		        student='4'
        }
        
        public const string GROUP = "Group";
        public const int HTTP_BAD_REQUEST = 400;
        public const int Internal_Server_Error = 500;
        public const int HTTP_Forbidden = 403;
        public const int HTTP_FileNotFound = 404;
        public const String Auth_Separator = "|";
        
        public const string VIDEO = "Video";
        public const string METADATA = "MetaData";
        public const string USERS = "Users";
        public const string MAPPING= "Mapping";
        public const string TIMELINESOURCETYPE = "2";
        public const string ImageType = ".png";

        public const string ROLESTUDENT = "Student";
        public const string ROLEINSTRUCTOR = "Instructor";
        public const string IsStage="stage";
        
        public const string ADMINROLE="2";
        public const string visapURL="visapURL";
        public const string SuperAdmin="1";
        
        public const string VideoTokenType="Jwt";
        
    }

}
