using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace ssomock
{
    public partial class sso : System.Web.UI.Page
    {
  
        protected void Page_Load(object sender, EventArgs e)
        {
            // ReturnURL exists?
            // If Yes
            // Generate Token
            // And Response.Redirect to --> ReturnURL + "?token=" + token

            string target = Request.QueryString["ReturnURL"];

            if (!string.IsNullOrEmpty(target))
            {
                string token = UserToken.GetSSOToken();
                Response.Redirect(string.Format(target + "?token={0}", token));
            }
            else
            {
                Response.Write("Invalid call!");
            }

        }

    }
}

