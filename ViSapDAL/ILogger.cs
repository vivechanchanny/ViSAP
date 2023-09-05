using System;
using System.Text;

namespace Excel.Workspace.Common.Utilities.Logging
{
    /// <summary>
    /// Interface created for the logging
    /// </summary>
    public interface ILogger
    {
        void LogError(Exception exc);
        void LogErrorMessage(string exc);
        void LogInfo(string message);
        void LogDebug(string message);
        void LogFatal(string message);
       
    }
}
