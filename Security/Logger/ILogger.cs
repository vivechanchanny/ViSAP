using System;
using System.Text;

namespace Excel.Visap.Log
{
    /// <summary>
    /// Interface created for the logging
    /// </summary>
    public interface ILoggerSecurity
    {
        void LogError(Exception exc);
        void LogErrorMessage(string exc);
        void LogInfo(string message);
        void LogDebug(string message);
        void LogFatal(string message);
       
    }
}
