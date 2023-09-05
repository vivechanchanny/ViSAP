/*
 * Created by SharpDevelop.
 * User: praveenkumar.tg
 * Date: 10/5/2015
 * Time: 6:23 PM
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;

namespace quizService.Models
{
	/// <summary>
	/// Description of AssetResponse.
	/// </summary>
	public class AssetResponse
	{
		    
			public string error{get;set;}
			public int id{get;set;}
			public string assetName{get;set;}
			public string assetThumbnailURL{get;set;}
	}
}
