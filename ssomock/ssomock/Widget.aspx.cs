using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace ssomock
{
    public partial class Widget : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            

        }


        protected string GetSsoSource()
        {
            string token = UserToken.GetSSOToken();
            return "http://localhost/visapint/mock.html?token=" + token;
        }


    }
}
