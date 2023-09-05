using System;

namespace Excel.Visap.Log
{
    /// <summary>
    /// Wrapper class for ErrorLogger either Errorlogger can be used directly or 
    /// can be used through wrapper clas to be more specific can be extended to support
    /// rdbms.
    /// </summary>
    public class VisapSecurityLogger : ILoggerSecurity
    {

        public static void LogErrorMessage(string logmessage)
        {
            ILoggerSecurity logger = new VisapSecurityLogger();
            logger.LogErrorMessage(logmessage);
        }

        public static void LogError(Exception exc)
        {
            ILoggerSecurity logger = new VisapSecurityLogger();
            logger.LogError(exc);
        }

       
        public static void LogDebug(string Info)
        {
            ILoggerSecurity logger = new VisapSecurityLogger();
            logger.LogDebug(Info);
        }
        
         public static void LogInfo(string Info)
        {
            ILoggerSecurity logger = new VisapSecurityLogger();
            logger.LogInfo(Info);
        }
         
        public static void LogFatal(string Info)
        {
            ILoggerSecurity logger = new VisapSecurityLogger();
            logger.LogFatal(Info);
        }
        
        void ILoggerSecurity.LogFatal(string message)
        {
            ErrorLogger.Instance().Fatal(message);

        }
        

        void ILoggerSecurity.LogErrorMessage(string message)
        {
            ErrorLogger.Instance().Error(message);

        }
        
        void ILoggerSecurity.LogError(Exception message)
        {
            ErrorLogger.Instance().Error(message);

        }
        void ILoggerSecurity.LogInfo(string informtion)
        {
            ErrorLogger.Instance().Info(informtion);   
        }

        void ILoggerSecurity.LogDebug(string message)
        {
            ErrorLogger.Instance().Debug(message);           
        }

        
        
    }
}
