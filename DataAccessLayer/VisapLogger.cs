using System;
using Excel.Visap.Common.Utilities.Logging;
using Excel.Visap.Log;


namespace Excel.Visap.Common.Utilities
{
    /// <summary>
    /// Wrapper class for ErrorLogger either Errorlogger can be used directly or 
    /// can be used through wrapper clas to be more specific can be extended to support
    /// rdbms.
    /// </summary>
    public class VisapLogger : ILogger
    {

        public static void LogErrorMessage(string logmessage)
        {
            ILogger logger = new VisapLogger();
            logger.LogErrorMessage(logmessage);
        }

        public static void LogError(Exception exc)
        {
            ILogger logger = new VisapLogger();
            logger.LogError(exc);
        }

       
        public static void LogDebug(string Info)
        {
            ILogger logger = new VisapLogger();
            logger.LogDebug(Info);
        }
        
         public static void LogInfo(string Info)
        {
            ILogger logger = new VisapLogger();
            logger.LogInfo(Info);
        }
         
        public static void LogFatal(string Info)
        {
            ILogger logger = new VisapLogger();
            logger.LogFatal(Info);
        }
        
        void ILogger.LogFatal(string message)
        {
            ErrorLogger.Instance().Fatal(message);

        }
        

        void ILogger.LogErrorMessage(string message)
        {
            ErrorLogger.Instance().Error(message);

        }
        
        void ILogger.LogError(Exception message)
        {
            ErrorLogger.Instance().Error(message);

        }
        void ILogger.LogInfo(string informtion)
        {
            ErrorLogger.Instance().Info(informtion);   
        }

        void ILogger.LogDebug(string message)
        {
            ErrorLogger.Instance().Debug(message);           
        }

        
        
    }
}
