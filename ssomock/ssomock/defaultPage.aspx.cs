
using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Configuration;



namespace ssomock
{
	/// <summary>
	/// Description of defaultPage
	/// </summary>
	public class defaultPage  : Page
	{
		
		protected global::System.Web.UI.WebControls.TextBox vidURL;
		protected global::System.Web.UI.WebControls.TextBox vidID;
		protected global::System.Web.UI.WebControls.RadioButton RadioBtn1;
		protected global::System.Web.UI.WebControls.RadioButton RadioBtn2;
		protected global::System.Web.UI.HtmlControls.HtmlGenericControl player;
		
		
		protected string  getVideoSource(string vidId)
		{
			string token=UserToken.GetSSOToken();
			
			if(String.IsNullOrEmpty(token)){  //If the sso token is null then redirect to login page.
				Response.Redirect("Login.aspx");
			}

			//To ge the videoid and cid from webconfig.
			string videoId=vidId;
			string cid=ConfigurationManager.AppSettings["cid"];
			string launchURL=ConfigurationManager.AppSettings["launchURL"];
			
			return string.Format(""+launchURL+"?v={0}&t={1}&cid={2}", videoId, token,cid);
			
		}
		protected void  save_Click(object sender, EventArgs e)
		{
			RadioButton radioBtn1=(RadioButton)RadioBtn1.FindControl("RadioBtn1");
			RadioButton radioBtn2=(RadioButton)RadioBtn2.FindControl("RadioBtn2");
			var commonHtmlEle="";
			//This function will read the url or video id from the visap integration page.
			if(radioBtn1.Checked){
				string videoURl=vidURL.Text;
				commonHtmlEle="<video class=\"mockVid\" autoplay=\"true\" controls src="+videoURl+"></video>";
			}
			if(radioBtn2.Checked){
				string url = getVideoSource(vidID.Text);
				commonHtmlEle="<iframe src='"+ url +"' class=\"ifrm\" id=\"defaultPage\"></iframe>";
			}
			player.InnerHtml=commonHtmlEle;
			
		}
		
	}
}
