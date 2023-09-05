using System;
using MongoDB.Bson.Serialization.Attributes;
 

namespace ViSapDAL
{
	/// <summary>
	/// Description of Data.
	/// </summary>
	[BsonIgnoreExtraElements]
	public class data
	{
		#region Properties
		[BsonElement("description")]
		public string description{ get; set; }
		
		[BsonElement("questionId")]
		public string questionId{ get; set; }
		
		#endregion
	}
}
