 
using System;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace ViSapDAL
{
	/// <summary>
	/// Description of Actions.
	/// </summary>
	
	[BsonIgnoreExtraElements]
	public class Actions
	{
		#region Properties
		
		[BsonIgnoreIfNull]
		public List<ListAction> listAction{ get; set; }
		
		#endregion
	}
}
