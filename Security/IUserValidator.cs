
using System;

namespace Excel.Visap.Security
{
	/// <summary>
	/// Description of IUserValidator.
	/// </summary>
	public interface IUserValidator
	{
		 bool ValidateUser(string userToken,string videoToken);
	}
}
