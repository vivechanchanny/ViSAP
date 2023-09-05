﻿
//************************************************************************************
    ///logger file will be a kind of proxy for the log
    /// messages  to be logged into server logfile
    ///Below can be extended or replaced without altering the
    ///code from where it is called from 

//************************************************************************************


(function (ns) {
  ns.Logger = function (loggertype,log) { 
        var data = { "loggertype": loggertype, "log": log };        
         $.ajax({
                url: ViTag.config.wsLogurl,
                type: "POST",               
                data: { loggertype: loggertype,log:log },
                success: function(){                 
                },
                error: function () {
                   // alert('error in logging');
                }
            });
      
    };
    
})(window.ViTag = window.ViTag || {});
