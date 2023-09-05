
using System;

namespace Excel.Visap.Security
{
	/// <summary>
	/// Description of IEncryptionProvider.
	/// </summary>
	public interface IEncryptionProvider
	{
		string Encrypt(string value,string key);
		string Decrypt(string value,string key);
	}
}
