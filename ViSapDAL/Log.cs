using System;
using System.Linq;
using log4net;

namespace Excel.Workspace.Log
{

    public class ErrorLogger
    {
      /// <summary>
      /// log4net object which gets the configuration details for logging
      /// has different methods for different kind of Errors
      /// </summary>
        private static log4net.ILog logger = null;
        public static ILog Instance()
        {
            log4net.Config.XmlConfigurator.Configure();
            logger = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
            return logger;           
        }

        internal void Fatal(Object message)
        {
            logger.Fatal(message);
        }

        internal void Fatal(Object message, Exception exception)
        {
            logger.Fatal(message, exception);
        }

        internal void Error(Object message)
        {
            logger.Error(message);
        }

        internal void Error(Object message, Exception exception)
        {
            logger.Error(message, exception);
        }

        internal void Debug(Object message)
        {
            logger.Debug(message);
        }

        internal void Info(Object message)
        {
            logger.Info(message);
        }
    }
}