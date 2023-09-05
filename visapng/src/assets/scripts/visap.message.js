
//--------------Global Variables region starts---------------------//

// html message block container id.
var errormessage = "#errormessage";
var gruopmessage = "#gruopmessage";
var message = "#message";
var timelineMessage = "#timelineMessage";
var alertmessage = "#alertmessage";
var lblWrgMsg = "#lblWrgMsg";

//------------Global Variables region ends--------------------------//


(function(ns) {

 //------------------------------ Private region starts-------------//
 var internal = {
      
      //based on action performed by user it returns corresponding function.
        typeOfMsg: function(msgSrc, msg){
         
          var src = msgSrc[0];
            var cases = {
                "Tags": function () { internal.tagMsg(msg) },
                "Action": function () {
                    if (msgSrc[2] === "AlertMsg") {
                        internal.validationMsg(msg);
                    } else {
                        internal.actionMsg(msg);
                    }
                },
                "Upload": function () { internal.uploadMsg(msg); },
                "Timeline": function () { internal.timelineMsg(msgSrc, msg); },
                "Links": function () { internal.linkMsg(msg) },
                "Publish": function () { internal.publishMsg(msg) },
                "UploadImage": function () { internal.loading(msg) },
                "Video": function () { internal.alertMsg(msg) },
                "Duration": function () { internal.durationMsg(msg) },
                "ActionList": function () { internal.validationMsg(msg); },
                "GetData": function () { internal.errorMsg(msg); },
                "assign": function () { internal.assignMsg(msg); },
                "Delete": function () { internal.publishMsg(msg); }
            };
            cases[src] ? cases[src]() : 0;
        },
        
        //dispaying message and localizing the string.
        displayMsg:function(eleId,msg){
          eleId.html(msg).show().delay(4000).fadeOut();
        },
        
        //This method will display error messages of server.
        errorMsg: function (msg) {
            var eleId = $(errormessage);//container id where msg should display.
            internal.displayMsg(eleId,msg);
        },
        
        //This method will display assigned related messages.
        assignMsg: function (msg) {
            var eleId = $(gruopmessage);//container id where msg should display.
            eleId.slideDown();
             internal.displayMsg(eleId,msg);
        },
        
         //This method will display tag related messages.
        tagMsg: function (msg) {
            var eleId = $(message);//container id where msg should display.
             internal.displayMsg(eleId,msg);
        },
        
         //This method will display link related messages.
        linkMsg: function (msg) {
            var eleId = $(message);//container id where msg should display.
             internal.displayMsg(eleId,msg);
        },
        
         //This method will display actions related messages.
        actionMsg: function (msg) {
            var eleId = $(message);//container id where msg should display.
             internal.displayMsg(eleId,msg);
        },
        
          //This method will display alert related messages.
        alertMsg: function (msg) {
            alert(msg);
        },
        
         //This method will display validataion related messages.
        validationMsg: function (msg) {
            var eleId = $(alertmessage);//container id where msg should display.
             internal.displayMsg(eleId,msg);
        },
        
        //This method will display duration related messages.
        durationMsg: function (msg) {
            var eleId = $(message);
             internal.displayMsg(eleId,msg);
        },
        
       //This method will display timeline related messages.
        timelineMsg: function (msgSrc, msg) {
            if (msgSrc[1] == "create") {
                internal.timelineSaveMsg(msg);
                return;
            }
            var eleId = $(timelineMessage);
             internal.displayMsg(eleId,msg);
        },
        
        //This method will display publish related messages.
        publishMsg: function (msg) {
            internal.MsgblockEle({ e: divVideoList, msg: { message: "<lable class='whitemsg'>" + msg + "</lable>", css: { border: "none", borderRadius: "4px", padding: "10px", margin: "-170px -1px", backgroundColor: "rgba(102,153,51,0.9)", width: "300px" } }, bg: false });
            setTimeout(function () { $(divVideoList).unblock(); }, 4000);
        },
        
        blockEle: function (opt) {
            $(opt.e).block(opt.msg);
            if (opt.bg)
                $(".blockOverlay").addClass("blockOverlayTemp");
        },
        
        MsgblockEle: function (opt) {
            $(opt.e).block(opt.msg);
            $(opt.e).css({ top: "400px" });
            if (opt.bg)
                $(".blockOverlay").addClass("blockOverlayTemp");
        },
        
        //This method will display uploadMsg related messages.
        uploadMsg: function (msg) {
            var eleId = $(lblWrgMsg);
            eleId.css({ "display": "block", "visibility": "visible" }).text(msg);
        },
        
        // Loading message to the user while uploading videos
        loading: function (msg) {
            var spacerimage = "data:image/gif;base64,R0lGODlhAgACAIAAAAAAAAAAACH5BAEAAAAALAAAAAACAAIAAAIChFEAOw==";
            internal.blockEle({ e: uploadform, msg: { message: "<br/><br/><br/><br/><img src='" + spacerimage + "'class='loading' /><br /><lable class='lblLoading'>" + msg + "</lable>", css: { borderRadius: "11px" } }, bg: false });
            internal.customBlockUI();
        },
        
        // timelinesave message
        timelineSaveMsg: function (msg) {
            internal.MsgblockEle({ e: divVideoList, msg: { message: "<lable class='whitemsg'>" + msg + "</lable>", css: { border: "none", borderRadius: "4px", padding: "10px", margin: "-170px -1px", backgroundColor: "rgba(102,153,51,0.9)", width: "300px" } }, bg: false });
            setTimeout(function () { $(divVideoList).unblock(); }, 4000);
        },
        
        //Custom pop up with blockUI 
        customBlockUI: function () {
            $(".blockElement").css({ "background-color": "", "border": "0px", "width": "100%", "height": "100%", "top": "0px", "left": "0px" });
            $(".blockOverlay").css({ "opacity": "0.6", "background-color": "#000" });
        }
     }; 
     

//------------------------------ Private region ends.--------------------//
  
  // public method 
     ns.initMsg = function(msg, type, source) {
       
         //get type of action performed by user.
         var msgSrc = source ? source.split('.') : ["", ""];
         internal.typeOfMsg(msgSrc, ViTag.getLocalizeValue(msg)); 
    };
     
 })(window.ViTagUI = window.ViTagUI || {});