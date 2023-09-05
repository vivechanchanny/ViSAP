/*
 * Created by SharpDevelop.
 * User: kavya.tm
 * Date: 5/23/2016
 * Time: 6:23 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Security.Claims;
using System.Collections.Generic;
namespace Excel.Visap.Security
{
	/// <summary>
	/// Description of JWTEncryptionManager.
	/// </summary>
	public class JWTEncryptionManager
	{
		
		
		public string JwtEncode(object payload,string key,JWT.JwtHashAlgorithm algorithem){
			return JWT.JsonWebToken.Encode(payload, key, algorithem);
		}
		
		
		
		public IDictionary<string, object> JwtDecode(string token,string key){
			return JWT.JsonWebToken.DecodeToObject(token, key) as IDictionary<string, object>;
		}
	}
}
