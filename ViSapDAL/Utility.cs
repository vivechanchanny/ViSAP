using System;
 
namespace Excel.Workspace.Common.ServiceUtility
{
     
    public static class StringExtension
    {
    	public static string GetOnlyName(this string source, int tail_length)
    	{
    		return source.Remove(source.Length - tail_length);
    	}
    }
    
}
