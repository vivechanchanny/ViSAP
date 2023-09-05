/*
 * Created by SharpDevelop.
 * User: praveenkumar.tg
 * Date: 10/30/2015
 * Time: 11:14 AM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using MongoDB.Driver;
using quizService.Connection;
using MongoDB.Bson;
using MongoDB.Driver.Builders;
using System.Web.Script.Serialization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Handlers;
using System.Web.Http;
using Newtonsoft.Json;
using System.Text;
using System.ComponentModel;
using quizService.Models;
using Newtonsoft.Json.Linq;

namespace quizService.DataAccess
{
	/// <summary>
	/// Description of AssestDetails.
	/// </summary>
	public class AssestDetails
	{
			// Get asset Deatils which are used in quiz creation
		 public AssetResponse getAssetDetails (string id){
			AssetResponse obj= new AssetResponse();
			obj.error="1";
			string json = JsonConvert.SerializeObject(obj, Formatting.Indented);
			AssetResponse deserializedProduct = JsonConvert.DeserializeObject<AssetResponse>(json);
			return deserializedProduct;
			
		}
		
	}
}
