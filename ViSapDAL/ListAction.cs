
using System;
using MongoDB.Bson.Serialization.Attributes;

namespace ViSapDAL
{
	/// <summary>
	/// Description of ListAction.
	/// </summary>
	
	[BsonIgnoreExtraElements]
	public class ListAction
	{
		#region Properties
 
		[BsonIgnoreIfNull]
		public data data{ get; set; }
		
		#endregion
	}
}
