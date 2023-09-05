using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
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
using System.IO;
using System.Configuration;

namespace ssomock
{
	public class UserToken
	{
		//To get the token using uName role and uId
		public static string GetSSOToken()
		{

			var uName = string.Empty;

			if (System.Web.HttpContext.Current.Session["username"] != null){
				uName = System.Web.HttpContext.Current.Session["username"].ToString();
			} else {
				return string.Empty;
			}

			var role = System.Web.HttpContext.Current.Session["role"].ToString();
			var uID = System.Web.HttpContext.Current.Session["id"].ToString();
			var token = string.Format("{0}|{1}|{2}", uName, role,uID);

			return Encryptdata(token);
			
		}

		private static string Encryptdata(string token)
		{
			var uName = System.Web.HttpContext.Current.Session["username"].ToString();
			string strmsg = string.Empty;
			byte[] encode = Encoding.UTF8.GetBytes(token);
			strmsg = Convert.ToBase64String(encode);
			return strmsg;
		}
          
        //To validate the token  
		public static string ValidateToken(string token)
		{
		  try{
				byte[] buffer = Convert.FromBase64String(token);
				string result = Encoding.UTF8.GetString(buffer);
			    return result;
			}
			catch(Exception ex){
				return null;
			}
			
			

		}

		
	}
}