/*
 * Created by SharpDevelop.
 * User: kavya.tm
 * Date: 5/10/2016
 * Time: 10:57 AM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;

namespace Excel.Visap.Security
{
	/// <summary>
	/// Description of ITokenManager.
	/// </summary>
	public interface ITokenManager
	{
		 string GenerateToken(Dictionary<string,string> TokenDetails);
		 bool ValidateToken(string token);
		
	}
}
