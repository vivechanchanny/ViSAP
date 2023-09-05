using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ssomock
{  
                           
    public class UserInfo
    {
    	public string _id { get; set; }
    	public string firstname { get; set; }
    	public string lastname { get; set; }
    	public string loginname { get; set; }
    	public string password { get; set; }
    	public string email { get; set; }
    	public string workspaceId { get; set; }
    	public string LoginRole { get; set; }
    	public int role { get; set; }
    }
}