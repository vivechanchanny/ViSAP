using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ssomock
{
    public partial class Embedded : System.Web.UI.Page
    {
        
      
        protected void Page_Load(object sender, EventArgs e)
        {
            
            UserDetails _userDetails = new UserDetails
            {
                username = Convert.ToString(Session["username"]),
                UserId = Convert.ToString(Session["username"]),                
                path = "http://visap.excelindia.com/VideoRepo/",
                player = "vid1"
                
            };
            
          

         
            System.Web.Script.Serialization.JavaScriptSerializer oSerializer =
           new System.Web.Script.Serialization.JavaScriptSerializer();
            HiddenField.Value = oSerializer.Serialize(_userDetails);
        }
    }
}