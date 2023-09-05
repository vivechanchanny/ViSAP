using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Newtonsoft.Json;

namespace ssomock
{
	public partial class Login : System.Web.UI.Page
	{

		public static List<UserInfo> users;

		
		protected void Page_Load(object sender, EventArgs e)
		{

			//reading userdata from jason file 
			using (StreamReader r = new StreamReader("D:/GIT/ViSAP/ssomock/ssomock/userData.json"))
			{
				string userData = r.ReadToEnd();
				users = JsonConvert.DeserializeObject<List<UserInfo>>(userData);
			}
		}

		public static string getUserValue(string username)
		{
			string userId = null;
			for (var i = 0; i < users.Count; i++)
			{
				if (users[i].loginname == username)
				{
					userId = users[i]._id;
				}
			}
			return userId;

		}
		protected void SubmitBtn_Click(object sender, EventArgs e)
		{
			string userName = txtUserName.Text;
			var user = users.Find(u => u.loginname == userName);
			
			if (user != null)
			{
				Session["username"] = user.loginname;
				Session["role"] = user.role;
				Session["id"] = user._id;
				Response.Redirect("defaultPage.aspx");
				
			}
			else
			{
				lblValidatation.Text = "Inavild username";
				this.lblValidatation.ForeColor = System.Drawing.Color.Red;
			}
		}

	}
}