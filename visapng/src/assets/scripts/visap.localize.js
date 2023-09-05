 (function(ns) {
     ns.visapLocalize = function() {
	    $.ajaxSetup({
		    async: false
		});
        //This function is to initialize  the	i18n object with lng and restore paramter
  		//lng is the type of the language
  		//resStore is the json object.
  		//TODO: "resStore": resources can be changed to get json file directly.
     	 var response=$.getJSON(ViTag.config.jsonFileUrl, function( resources ) {
            i18n.init({ "lng": 'en', "resStore": resources }, function(t) {
             $(document).i18n();
           }) 
         });
         
         //handling error:if json file does not load or any error.
         response.error(function(){
             window.location.href = ViTag.config.errorPage; //redirecting to error page.
         });
         
         //get timeago language script file to make localization.
         $.getScript( ViTag.config.timeAgoScriptUrl, function() {
               
         }).fail(function(){
            //  ViTagUI.initMsg("msg.timeAgoError", "Info", "GetData.Error");
         });  
         
     };
     
     ns.localize=function(Ele){
       Ele.i18n();
     };
     ns.getLocalizeValue=function(key){
      return $.i18n.t(key);
     };
     
 })(window.ViTag = window.ViTag || {});