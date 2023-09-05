
//************************************************************************************
    ///visaplogger is the wrapper class  which 
    ///will be used by the methods in other files
    ///whereever they want to log relavent messages
    ///below will  call a method which calls the service

//************************************************************************************


(function (ns) {

  //Below properties are the provision to enable respective type of logs
  ns.isDebugEnabled = true;
  ns.isErrorEnabled = true;
  ns.isInfoEnabled = true;
  ns.isFatalEnabled =true;
  
  
 //#region enum declarations for the loggertypes.
 ns.messageTypeEnum = {
        Debug: "0",
        Info:  "1",
        Error: "2",
        Fatal: "3"
    };

 /// <summary>
 /// Wrapper method to log message:Logs the debug type of logs
 /// </summary>
 /// <param name="logMessage">message which has to be logged</param>
  ns.debug = function(logMessage){  
  if(ns.isDebugEnabled)  
   	ViTag.Logger(ns.messageTypeEnum.Debug,logMessage);
  }; 
 

 /// <summary>
 /// Wrapper method to log message:Logs the info type of logs
 /// </summary>
 /// <param name="logMessage">message which has to be logged</param>
 ns.info = function(logMessage){
  if(ns.isInfoEnabled) 
   ViTag.Logger(ns.messageTypeEnum.Info,logMessage);   
  };
  
  
 /// <summary>
 /// Wrapper method to log message:Logs the error type of logs
 /// </summary>
 /// <param name="logMessage">message which has to be logged</param>
  ns.error = function(logMessage){ 
   if(ns.isErrorEnabled) 
   ViTag.Logger(ns.messageTypeEnum.Error,logMessage);   
  };
  
  
 /// <summary>
 /// Wrapper method to log message:Logs the fatal type of logs
 /// </summary>
 /// <param name="logMessage">message which has to be logged</param>
 window.onerror = function(logMessage) {
    if(ns.isFatalEnabled) 
  ViTag.Logger(ns.messageTypeEnum.Fatal,logMessage);   
 }
    
})(window.ViTag = window.ViTag || {});