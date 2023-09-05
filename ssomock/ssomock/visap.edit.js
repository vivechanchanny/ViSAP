
(function (ns) {


    /// <summary>
    ///Init is called from edit.js of respective theme
    ///args may have parameters to override the defaults
    /// </summary>
    /// <param name="args">args which has to be overridden</param>
    /// <returns>args which will be used in edit</returns>
    //#region Public
    ns.initEditing = function (args) {
    ViTag.debug("Visap.edit:initilization:"+" " + args.username +"," + args.path +"," + args.playerYT +"," + args.snapRepopath+"," + args.videoMContainer);
        if (args.ctrl) me.ctrl = args.ctrl;
        $.extend(me.defaults, args.args);
        // TODO: Calling many times while change the user [So if condition statement added].
        if (!me.ctrl.$tag) {
            me.readControls();
            me.setControlsEvent();
        }
        return { ctrl: me.ctrl };
    };

    /// <summary>
    /// When tag is edited desc is populated to tag text
    ///handle seek bar to  render the markers 
    /// </summary>    
    /// <param name="t">tag created time</param>
    /// <param name="d">desc of the Tag</param>
    ns.EditTags = function (t, d) {
        try
        {        
            ViTag.info("Visap.edit:EditTags:Editing the tag with time and description:"+" " + t +"," + d);
            internal.editTagTime = t;
            ns.enableEditTool(d);
            ns.editTagDesc = unescape(d);
            ns.handleSeekBar();
         }
         catch(err)
            {
                   ViTag.error("Visap.edit:EditTags:Error while Editing tags"+err);
            }
    };

    /// <summary>
    /// Clearing the questions and annotations related elements
    /// </summary>
    ns.ClearEditValues = function () {
    try
    {
       ViTag.debug("Visap.edit:ClearEditValues:Clearing all edited Values");
        ns.AnnotateEditTool(null);
        ns.HotspotEditTool(null);
        ns.WhiteboardEditTool(null);
        ns.enableEditTool(false)
        ns.enableEditLinkTool(false)
        me.question.clearEntries();
     }
     catch(err)
        {
               ViTag.error("Visap.edit:ClearEditValues:Error while setting action element settings"+err);
        }
    };

    /// <summary>
    /// User cancel the upadate of the existing sketch and sketch tabs are hidden 
    /// </summary>    
    ns.disableSketch = function () {
        try
        {
        ns.hideSketches();
        }
        catch(err)
        {
               ViTag.error("Visap.edit:disableSketch: Error while disabling sketch"+err);
        }
    };



    /// <summary>
    /// Annotation edited values are initialised  
    ///and respective values are set to its elements
    /// </summary>
    /// <param name="ti">tittle of the annotation</param>
    /// <param name="de">desc of the annotation</param>
    /// <param name="t">start time of the annotation</param>
    /// <param name="d">duration of the annotation</param> 
    /// <param name="pausedTime">pausedTime when annotation is created</param> 
    /// <param name="left">left value of annotation</param> 
    /// <param name="top">top value of annotation</param> 
    ns.EditAnnotate = function (ti, de, t, d, pausedTime, left, top,width,height,PauseOnShow) {
    try
    {
    ViTag.info("visap.edit:EditAnnotate:for the paused time:"+ti+","+de+","+t+","+d+","+pausedTime+","+left+","+top);
        ns.editAns = true;    //global variable to know its in editmode of annoation from outside the core lib.
        internal.editAnnotation = { "ti": ti, "t": t, "pausedTime": pausedTime };
        ns.AnnotateEditTool(ti, de, d,PauseOnShow);
        ns.left = left; //stroing left and top of the annotation to a global varible 
        ns.top = top;
        ns.width=width;
        ns.height=height;
        ns.handleSeekBar();
        }
         catch(err)
        {
               ViTag.error("Visap.edit:EditAnnotate: Error while editing the annotations"+err);
        }
    };

    /// <summary>
    /// Whiteboard edited values are initialised  
    ///and respective values are set to its elements
    /// </summary>

    /// <param name="de">desc of the Whiteboard</param>
    /// <param name="t">start time of the Whiteboard</param>
    /// <param name="d">duration of the Whiteboard</param> 
    /// <param name="pausedTime">pausedTime when Whiteboard is created</param> 
    /// <param name="left">left radio button value of Whiteboard</param> 
    /// <param name="right">right radio button value of Whiteboard</param> 
    /// <param name="leftout">leftout radio button value of Whiteboard</param> 
    /// <param name="rightout">rightout radio button value of Whiteboard</param> 
    /// <param name="pauseonshow">pauseonshow radio button value of Whiteboard</param> 
    ns.EditWhiteboard = function (pausedTime, editedAction) {
    try
    {
    ViTag.info("visap.edit:EditWhiteboard:for the paused time:"+pausedTime+","+editedAction.StartTime);
        ns.editwhitebaord = true;    //global variable to know its in editmode of Whiteboard from outside the core lib.
        ns.sketchDataWhiteboard = editedAction.sketchData; //retrieving the sketch data which is saved in create mode.
        internal.editWhiteboard = { "t": editedAction.StartTime, "pausedTime": pausedTime,"sketchData":editedAction.sketchData };
        ns.WhiteboardEditTool(editedAction);
        ns.handleSeekBar();
        }
         catch(err)
        {
               ViTag.error("Visap.edit:EditWhiteboard: Error while editing the Whiteboard"+err);
        }
    };

    /// <summary>
    /// Hotspot edited values are initialised  
    ///and respective values are set to its elements
    /// </summary>
    /// <param name="ti">tittle of the hotspot</param>
    /// <param name="de">desc of the hotspot</param>
    /// <param name="t">start time of the hotspot</param>
    /// <param name="d">duration of the hotspot</param> 
    /// <param name="pausedTime">pausedTime when hotspot is created</param> 
    ns.EditHotspot = function (ti, de, t, d, pausedTime, showonpause) {
    try
    {
     ViTag.info("visap.edit:EditHotspot:for the hotspot tittle:"+" "+ti+","+de+","+t+","+t+","+d+","+pausedTime+","+showonpause);
        ns.editPreviewHS = true;
        internal.editHotspotvalues = { "ti": ti, "t": t, "pausedTime": pausedTime };
        ns.HotspotEditTool(ti, de, d, showonpause);
        ns.handleSeekBar();
         }
         catch(err)
        {
               ViTag.error("Visap.edit:EditHotspot: Error while editing the hotspot" +err);
        }
    };
    /// <summary>
    /// Triggers handleseekBarValues 
    /// </summary>    
    ns.handleSeekBar = function () {
            try
        {
        $("body").trigger("handleseekBarValues");
         }
         catch(err)
        {
               ViTag.error("Visap.edit:handleSeekBar: Error while triggering  handleseekBarValues" +err);
        }
    };

    /// <summary>
    /// Triggers canvasHide to hide the canvas related elements 
    /// </summary>   
    ns.hideSketches = function () {
        try
        {
        $("body").trigger("hideSketches");
        }
         catch(err)
        {
               ViTag.error("Visap.edit:hideSketches: Error while triggering  hideSketches"+err);
        }
        
    };


    /// <summary>
    /// Triggers canvasHide to hide the canvas related elements 
    /// </summary>   
    ns.resetSketches = function () {
        try
        {
        $("body").trigger("resetSketches");        
        }
         catch(err)
        {
               ViTag.error("Visap.edit:resetSketches: Error while triggering  resetSketches" +err);
        }
    };

    /// <summary>
    /// Get the all the actions for  pausedTime     
    /// </summary>
    /// <param name="PausedTime">PausedTime to be checked with</param>
    /// <returns>Action list</returns>
    ns.getPausedAction = function (PausedTime) {
    try
    {
     ViTag.debug("visap.edit:getPausedAction:Get all the actions for the paused time:"+PausedTime);
        var actions = ns.CurrentSrc().actions;
        if (actions != undefined) {
            //loop through the currentsource  and compare currenttime with paused time
            for (var i = 0; i < ns.CurrentSrc().actions.length; i++) {
                if (PausedTime == ns.CurrentSrc().actions[i].currentTime) {
                    ns.pauseActionIndex = i;
                    return ns.CurrentSrc().actions[i].listAction;
                }
            }
        }
        }
        catch(err)
        {
               ViTag.error("Visap.edit:getPausedAction: Error while getting the actionlist for the paused time" +err);
        }

    };


    /// <summary>
    /// Get the all the actionS list data for  pausedTime     
    /// </summary>
    /// <param name="type">type of the action</param>
    /// <param name="listaction">list of the actions</param>
    /// <param name="startTime">starttime of teh action</param>
    /// <returns>returns nested data list</returns>
    ns.getEditedListAction = function (type, listaction, startTime) { 
       try
        {       
        if (listaction != undefined) {
                if (listaction.length > 0) {
                ViTag.debug("visap.edit:getEditedListAction:Get the all the actions list for the type:"+type+","+startTime+","+listaction.length);
                    //loop through inside actions based on type and starttime get 
                    //the relavaent
                    for (var i = 0; i < listaction.length; i++) {
                        if (startTime == listaction[i].data.StartTime && type == listaction[i].type) {
                            return listaction[i].data;
                        }
                    }
                }
            }
        }
        catch(err)
        {
               ViTag.error("Visap.edit:getEditedListAction: Error while getting edited action list"+err);
        }
        
    };

    /// <summary>
    /// Function called when edit icon for link is clicked
    /// </summary>
    /// <param name="n">link name</param>
    /// <param name="u">link URL</param>
    ns.EditLinks = function (n, u) {
    try
    {
        internal.editLink = n;
        ns.enableEditLinkTool(n, u);
        }
       
        catch(err)
        {
               ViTag.error("Visap.edit:EditLinks: Error while editing thelinks"+err);
        }
    };

    /// <summary>
    /// Edit button of the tags are clicked and its values are set to its elements
    /// </summary>
    /// <param name="d">tag description name</param>

    ns.enableEditTool = function (d) {
    
    try
    {
        if (d) {
            ns.desc = unescape(d);
            me.ctrl.$tagtimediv.show();
            me.ctrl.$vidDuration.html("Video Duration(" + ViTag.getDuration() + " secs)");
            me.ctrl.$tagTime.val(ViTag.getTimeFormat(internal.editTagTime));
            me.ctrl.$tag.val(unescape(ns.desc));
            me.ctrl.$tagTime.show();
            me.ctrl.$saveTag.val("Edit");
        }
        else {
            internal.editTagTime = -1;
            me.ctrl.$tagTime.hide();
            me.ctrl.$saveTag.val("Save");
            me.ctrl.$tag.val('');
            ns.AnnotateEditTool();
            ns.WhiteboardEditTool();
            me.ctrl.$tagTime.val('');
            me.ctrl.$tagtimediv.hide();
        }
        
        }
        catch(err)
        {
               ViTag.error("Visap.edit:enableEditTool: Error while enabling edittools"+err);
        }
    };
    /// <summary>
    /// Edit button of the annoatation is clicked and its values are set to its elements
    /// </summary>
    /// <param name="ti">tittle of the annotation</param>
    /// <param name="de">desc of the annotation</param>
    /// <param name="d">duration of the annotation</param> 

    ns.AnnotateEditTool = function (ti, de, d,PauseOnShow) {
    try
    {
        if (d) {
            var title = unescape(ti);
            //var desc = ns.htmlDecode(de);
            ns.editor.setValue(cmtDesc, de);
            me.ctrl.$cmtTitle.val(title);
            //Duartion readonly
           // me.ctrl.$cmtDuration.attr('readonly', 'readonly');
            me.ctrl.$cmtDuration.val(d);
            if (PauseOnShow == true)
                me.ctrl.$annotatePauseOnShow.prop('checked', true);
            me.ctrl.$cmtSave.val("Edit");
        }
        else {
            internal.editAnnotation = null;
            //empty elements  if no annotation
            me.ctrl.$cmtTitle.val("");
            me.ctrl.$cmtDuration.val("");
           // me.ctrl.$cmtDuration.attr('readonly', false);
            me.ctrl.$annotatePauseOnShow.prop('checked', false);
            me.ctrl.$cmtSave.val("Save");
            if (ns.editor.ckEditorAvailable() && ns.editor.ckEditorInstanceAvilable(cmtDesc))
                CKEDITOR.instances.cmtDesc.setData("");
            else me.ctrl.$cmtDesc.val("");

        }
        
         }
        catch(err)
        {
               ViTag.error("Visap.edit:AnnotateEditTool: Error while editing annotaion tools "+err);
        }
    };

    /// <summary>
    /// Edit button of the whiteboard is clicked and its values are set to its elements
    /// </summary>   
    /// <param name="de">desc of the whiteboard</param>
    /// <param name="d">duration of the whiteboard</param>
    /// <param name="SketchData">Sketch of the whiteboard</param> 
    /// <param name="PauseOnShow">Pause On Show of the whiteboard</param> 

    ns.WhiteboardEditTool = function (editedAction) {
    try
    {
        if (editedAction) {
            ViTag.removeCKobjects();
            me.ctrl.$wboardContainer.removeClass('wbLeftPos wbRightPos wbLeftOutPos wbRightOutPos');
            me.ctrl.$wbdragbar.removeClass('wbDragbarRight wbDragbarLeft');
            me.ctrl.$whiteBoardWrapper.show();
            me.ctrl.$wboardContainer.show();
            me.ctrl.$wbdragbar.css('display', 'block');
            me.ctrl.$textcontent.css('z-index',"-1");
            me.ctrl.$textcontent.hide();
            var videoContainerHeight = me.ctrl.$videoMainContainer.height();
            me.ctrl.$wboardContainer.css({ 'width': editedAction.whiteboardAttributes.width, 'height': videoContainerHeight });
            me.ctrl.$WbimgOverlay.hide();
            me.ctrl.$wbtext.prop('checked', true); //To enable text radio default.
            var whiteboardDirection = ViTag.DirectionOfWhiteboard(editedAction.whiteboardPosition);              
            ViTag.debug("Visap.edit:WhiteboardEditTool: Depending on direction whiteboard will display left,right,leftout,righout"+whiteboardDirection);
            me.ctrl.$sketchcontainerDefault.html('');
            me.ctrl.$sketchcontainerWB.html('');
            ViTag.initSketchTools({ container: "sketchcontainerWB" });
            ns.resetSketches();
            me.whiteboardData.SlidingWhiteboard(whiteboardDirection, editedAction.description); //Sliding whiteboard based on positon.
            //me.ctrl.$whiteboardDuration.attr('readonly', 'readonly');
            me.ctrl.$whiteboardDuration.val(editedAction.duration);
            $("input[name=wbSlide][value=" + editedAction.whiteboardPosition + "]").prop('checked', true);
            if (editedAction.PauseOnShow == true)
                me.ctrl.$whiteboardPauseOnShow.prop('checked', true);
            me.ctrl.$whiteboardsave.val("Edit");
        }
        else {
            internal.editWhiteboard = null;
            me.ctrl.$whiteboardDuration.val("");
            //me.ctrl.$whiteboardDuration.attr('readonly', false);
            me.ctrl.$wbtext.prop('checked', true);
            me.ctrl.$whiteboardPauseOnShow.prop('checked', false);
            me.ctrl.$wbLeftPos.prop('checked', true);
            me.ctrl.$whiteboardsave.val("Save");
            if (ns.editor.ckEditorAvailable() && ns.editor.ckEditorInstanceAvilable(cmtWiteboard))
                CKEDITOR.instances.cmtWiteboard.setData("");
            else me.ctrl.$cmtWiteboard.val("");
        }
        }
         catch(err)
        {
               ViTag.error("Visap.edit:WhiteboardEditTool: Error while editing whiteboard "+err);
        }
    };

    /// <summary>
    /// Edit button of the hotspot is clicked and its values are set to its elements
    /// </summary>
    /// <param name="ti">tittle of the hotspot</param>
    /// <param name="de">desc of the hotspot</param>
    /// <param name="d">duration of the hotspot</param> 

    ns.HotspotEditTool = function (ti, de, d, showonpause) {
    try
    {
        if (d) {
        ViTag.info("Visap.edit:HotspotEditTool: Editing the hotspot with duration:"+ti+","+de+","+d+","+showonpause);
            var title = unescape(ti);
            var desc = unescape(de);
            me.ctrl.$hotspotTittle.val(title);
            ViTag.debug("Visap.edit:HotspotEditTool: Editing the hotspot with desc and title:"+desc+","+title);
            //Duartion readonly
            if (showonpause == 1)
            me.ctrl.$hotspotOnpause.prop('checked', true);
            //me.ctrl.$hotspotDuration.attr('readonly', 'readonly');
            me.ctrl.$hotspotDuration.val(d);
            me.ctrl.$hotspotContent.val(desc);
            me.ctrl.$hotspotsave.val("Edit");
        }
        else {
            internal.editHotspotvalues = null;
            //empty elements  if no hotspot
            me.ctrl.$hotspotTittle.val("");
            me.ctrl.$hotspotDuration.val("");
            //me.ctrl.$hotspotDuration.attr('readonly', false);
            me.ctrl.$hotspotOnpause.attr('checked', false);
            me.ctrl.$hotspotContent.val("");
            me.ctrl.$hotspotsave.val("Save");
        }
         }
         catch(err)
        {
               ViTag.error("Visap.edit:HotspotEditTool: Error while editing hotspot "+err);
        }
    };
    /// <summary>
    ///Edit button of the link is clicked and its values are set to its elements
    /// </summary>
    /// <param name="n">link name</param>
    /// <param name="u">link URL</param>

    ns.enableEditLinkTool = function (n, u) {
    try
    {
        if (n) {
         ViTag.debug("Visap.edit:enableEditLinkTool: Enable link name and url:"+n+","+u);
            ns.linkName = unescape(n);
            me.ctrl.$linkName.val(ns.linkName);
            me.ctrl.$linkUrl.val(u);
            me.ctrl.$saveLink.val("Edit");
        }
        else {
            internal.editLink = false;
            me.ctrl.$linkName.val('');
            me.ctrl.$linkUrl.val('');
            me.ctrl.$saveLink.val("Save");
        }
         }
         catch(err)
        {
               ViTag.error("Visap.edit:enableEditLinkTool: Error while editing link "+err);
        }
    };

    /// <summary>
    ///When user pause the video and if edit sketch is clicked :
    ///To get nearest value where the sketch action is available
    /// </summary>
    /// <param name="array">CurrentActionList</param>
    /// <param name="num">start time</param>
    // 
    ns.getroundoff = function (array, num) {
    try
    {
    ViTag.debug("Visap:getroundoff:start time being "+num);
        var i = 0;
        var minDiff = 1000;
        var ans;
        for (i in array) {
            var m = Math.abs(num - array[i].StartTime);
            if (m < minDiff) {
                minDiff = m;
                ans = array[i].StartTime;
            }
        }

        ViTag.VideoTme = ans;
        }
         catch(err)
        {
               ViTag.error("Visap.edit:getroundoff: Error while rounding off "+err);
        }
    }
    
    
    //to post data to GA
    ns.postData=function(type,action){
     analyticsObj={};
	 analyticsObj.id=ViTag.CurrentSrc().title;
	 analyticsObj.name=type;
	 $(document).trigger("VisapLog",[ViTag.getUserInfo(),action,analyticsObj]);
    
    }
    /// <summary>
    ///While editing annotation duration should be less than the total video time
    ///So in order to show how many secs are remaining then display format shoud be hh:mm:ss format.
    ///This accepts Seconds as parameter and returns time in mm:ss format
    /// </summary>
    /// <param name="seconds">time for conversion</param>

    ns.getTimeFormat = function (s) {
    try
    {
        //        var h = internal.getRoundOffValue(seconds / 3600) < 10 ? '0' + internal.getRoundOffValue(seconds / 3600) : internal.getRoundOffValue(seconds / 3600);
        //        var m = internal.getRoundOffValue(seconds / 60) < 10 ? '0' + internal.getRoundOffValue(seconds / 60) : internal.getRoundOffValue(seconds / 60);
        //        var s = internal.getRoundOffValue(seconds - (m * 60)) < 10 ? '0' + internal.getRoundOffValue(seconds - (m * 60)) : internal.getRoundOffValue(seconds - (m * 60));
        //        return m + ':' + s; 

        var h = Math.floor(s / 3600); //Get whole hours
        s -= h * 3600;
        var m = Math.floor(s / 60); //Get remaining minutes
        s -= m * 60;
        var sec = Math.floor(s);
        if (h == 0)
            return (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
        else
            return (h < 10 ? '0' + h : h) + ":" + (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
            }
            catch(err)
        {
               ViTag.error("Visap.edit:getTimeFormat: Error while formatting time "+err);
        }

    }
    ns.getTimeInSeconds = function (hrs, mints, secs) {
        try
        {
        sec = hrs * 3600 + mints * 60 + secs * 1;
        return sec;        
         }
        catch(err)
        {
               ViTag.error("Visap.edit:getTimeInSeconds: Error while getting time in sec:"+err);
        }
    },

    // Video attribute Edit -End-
    ns.calldelete = function (ID, fnPreSend, fnSuccess, fnError) {
    try
    {
        me.calldelete(ID, fnPreSend, fnSuccess, fnError);
          }
        catch(err)
        {
               ViTag.error("Visap.edit:calldelete: Error while calling delete"+err);
        }
    },

    ns.AddAndSaveTag = function (tag, fnPreSend, fnSuccess, fnError) {
    
    try
    {
     ViTag.debug("visap.edit:AddAndSaveTag:saving the tag with the description:" +tag.d+"," +tag.t);
    
        //pushes the passed tag to CurrentTags object
        var data = me.GetUpdatedSources(tag);
        //saves to database
        me.SaveTags(data, fnPreSend, fnSuccess, fnError);
        ns.RenderCurrentTags();
        
         }
        catch(err)
        {
               ViTag.error("Visap.edit:AddAndSaveTag: Error while saving tag"+err);
        }
    };

    /// <summary>
    ///Save Timeline Video to database
    /// </summary>
    /// <param name="data">timeline data</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.createTimeline = function (data, fnPreSend, fnSuccess, fnError) {
    try
    {
        me.SaveTimeLine(data, fnPreSend, fnSuccess, fnError);
        //me.SaveTags(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
         }
        catch(err)
        {
               ViTag.error("Visap.edit:createTimeline: Error while cretion of timeline"+err);
        }

    };

    /// <summary>
    ///Deletes the Video from database
    /// </summary>
    /// <param name="ID">unique Id</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.deleteVideo = function (ID, fnPreSend, fnSuccess, fnError) {
    try
    {
        me.deleteVideo(ID, fnPreSend, fnSuccess, fnError);
        }
        catch(err)
        {
               ViTag.error("Visap.edit:createTimeline: Error in deleteVideo"+err);
        }
    };

    /// <summary>
    /// Save Overlay to Database
    /// </summary>
    /// <param name="ID">unique Id</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.AddOverlay = function (ol, fnPreSend, fnSuccess, fnError) {
    try
    {
        var data = me.UpdateOverlay(ol);
        me.SaveTags(data, fnPreSend, fnSuccess, fnError);
        }
        catch(err)
        {
               ViTag.error("Visap.edit:AddOverlay: Error in AddOverlay"+err);
        }
    };

    /// <summary>
    /// Save Annotation to Database
    /// </summary>
    /// <param name="annotate">annotate to be saved</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.AddAndSaveAnnotate = function (annotate, fnPreSend, fnSuccess, fnError) {
    try
    {
        var data = me.AddAnnotate(annotate);
        me.SaveTags(data, fnPreSend, fnSuccess, fnError);
         }
        catch(err)
        {
               ViTag.error("Visap.edit:AddAndSaveAnnotate: Error in Adding and SavingAnnotate"+err);
        }
    };


    /// <summary>
    /// Save Hotspot to Database
    /// </summary>
    /// <param name="hotspot">hotspot deatils to be saved</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.AddAndSaveHotspot = function (hotspot, fnPreSend, fnSuccess, fnError) {
    try
    {
        var data = me.AddHotspot(hotspot);
        me.SaveTags(data, fnPreSend, fnSuccess, fnError);
        }
         catch(err)
        {
               ViTag.error("Visap.edit:AddAndSaveHotspot: Error in Adding and Savinghotsopt"+err);
        }
    };
    /// <summary>
    /// Save Whiteboard to Database
    /// </summary>
    /// <param name="whiteboard">whiteboard deatils to be saved</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.AddAndSaveWhiteboard = function (whiteboard, fnPreSend, fnSuccess, fnError) {
    try
    {
        var data = me.AddWhiteboard(whiteboard);
        me.SaveTags(data, fnPreSend, fnSuccess, fnError);
         }
         catch(err)
        {
               ViTag.error("Visap.edit:AddAndSaveWhiteboard: Error in Adding and Savingwhiteboard"+err);
        }
    };

     /// <summary>
    /// Save question to Database
    /// </summary>
    /// <param name="question">question deatils to be saved</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.addQuestionData = function (questiondata,callBack) {
    try
    {
          if(callBack)
          me.SaveTags(questiondata, callBack.onSaving, callBack.onSave, callBack.onErrors);
          else
          me.SaveTags(questiondata, function () { internal.ShowMessage("Saving...", "Info", "Action.questions.Saving"); },
                                                     function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Action.questions.Saved"); internal.renderAttrs(); },
                                                     function () { internal.ShowMessage("There was an error saving data", "Info", "Action.questions.SavingError"); });
                   
         }
         catch(err)
        {
            ViTag.error("Visap.edit:AddAndSaveQuestion: Error in Adding and Savingquestion"+err);
        }
    };

    /// <summary>
    /// Edited Tittle and desc  will be saved to database by checking the validations
    /// </summary>
    ns.updateEditedTittleorDesc = function () {
    try
    {
       // var pattern = "^[a-zA-Z0-9']+";
        var videoTilte = me.ctrl.$fileTitle.val();
        if (me.ctrl.$fileTitle.val() == '' || me.ctrl.$fileDesc.val() == '') {
            internal.ShowMessage("Title,Description fields should not be blank.", "Validation", "Upload.Saving");
            return false;
        }
        if(!internal.validateString(videoTilte))
        {
               internal.ShowMessage("Title contained non supported characters.", "Validation", "Upload.Saving");
               return false;
        }
        if (ViTag.util.tittledesccheck()) {
           internal.ShowMessage("Blank Space is not valid  Tittle/Desc", "Validation", "Upload.Saving");
           return false;
        }

        var videoCategory = me.ctrl.$fileCategory.val();
        if (videoCategory != '') {
            
            if(!internal.validateString(videoCategory))
            {
               internal.ShowMessage("category contained non supported characters.", "Validation", "Upload.Saving");
               return false;
            }
           
            var isvalid = false;
            if (videoCategory.substring(0, 1) == " ") {
                isvalid = true;
            }

            //for vomma separted values
            if (videoCategory.indexOf(',') != -1) {
                category = videoCategory.split(/\s*,\s*/);
                // category = videoCategory.split(/,\s*/);
                category = $.unique(category);
                $.each(category, function (index) {
                    if (category[index] == " " || category[index] == "") {
                        isvalid = true;
                    }
                });
                category = escape(category);
            }
            else {
                //for single value     
                category = [escape(videoCategory)];
            }
            if (isvalid) {
                internal.ShowMessage("Blank Space is not supported Category,Please enter valid Category", "Validation", "Upload.Saving");
                return false;
            }
        }
        else {
            category = [videoCategory];
        }

        var currentSource = ViTag.getSource(localStorage.getItem('videoid'));
        //check if category is not updated
        if (currentSource != undefined) {
            var existingdata = unescape(currentSource.category);
            if (currentSource.title != me.ctrl.$fileTitle.val() || currentSource.desc != me.ctrl.$fileDesc.val() || existingdata != videoCategory) {
                if (currentSource.title != me.ctrl.$fileTitle.val()) {
                    for (var i = 0; i < ViTag.source.length; i++) {
                        if (currentSource._id != ViTag.source[i]._id) {
                            if (ViTag.source[i].title.toLowerCase() == me.ctrl.$fileTitle.val().toLowerCase()) {
                                internal.ShowMessage("Duplicate tittle, a video of same title already exists. Please use a different tittle", "Validation", "Upload.Saving");
                                return false;
                            }

                        }
                    }
                }

                currentSource.category = category;
                currentSource.desc = me.ctrl.$fileDesc.val();
                currentSource.title = me.ctrl.$fileTitle.val();
                me.upload.success(currentSource, "true", "Saved Successfully");
            }
            else
                internal.ShowMessage('no changes made to title,desc and category ', "Validation", "Upload.Saving");
        }
        
         }
         catch(err)
        {
               ViTag.error("Visap.edit:updateEditedTittleorDesc: Error in update tittle/desc"+err);
        }
    };

    /// <summary>
    /// Save Links to Database
    /// </summary>
    /// <param name="li">link to be saved</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.AddLinks = function (li, fnPreSend, fnSuccess, fnError) {
    try
    {
        var data = me.AddLinks(li);
        ns.enableEditLinkTool(false);
        me.SaveTags(data, fnPreSend, fnSuccess, fnError);
        ns.RenderCurrentLinks();
        ViTag.initAnnotator();
         }
         catch(err)
        {
               ViTag.error("Visap.edit:AddLinks: Error in adding links"+err);
        }
    };

    // Video attribute Save -End-

    // Video attribute Remove -Start-

    /// <summary>
    /// Remove tag if tag needs to be deleted
    /// </summary>
    /// <param name="t">desc of the tag</param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveTag = function (t, callBack) {
    try
    {
        // callBack will be used if call from outside framework
        if (callBack)
            internal.RemoveTag(t, callBack.onSaving, callBack.onSave, callBack.onError);
        else internal.RemoveTag(t, function () { internal.ShowMessage("Deleting...", "Info", "Tags.Deleting"); },
                                   function () { internal.ShowMessage("Deleted successfully", "Info", "Tags.Deleted"); internal.renderAttrs(); 
                                                 ns.postData("tag","delete");
                                   },
                                   function () { internal.ShowMessage("There was an error saving data", "Info", "Tags.DeletingError"); });

        // TODO: Below 2 methods are calling in many places need to remove unwatend calls
        ns.enableEditTool(false);
        ns.RenderCurrentTags();
         }
         catch(err)
        {
               ViTag.error("Visap.edit:RemoveTag: Error in removing tag"+err);
        }

    }
    /// <summary>
    /// Remove action from the list and database
    /// </summary>
    /// <param name="t">time to match with currenttime of the action </param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveActionList = function (t, callBack) {
    try
    {
        if (callBack)
            internal.RemoveActionList(t, callBack.onSaving, callBack.onSave, callBack.onError);
        else
            internal.RemoveActionList(t, function () { internal.ShowMessage("Deleting...", "Info", "Action.Deleting"); },
                                         function () { internal.ShowMessage("Deleted successfully", "Info", "Action.Deleted"); internal.renderAttrs(); },
                                         function () { internal.ShowMessage("There was an error saving data", "Info", "Action.DeletingError"); });

        ns.enableEditLinkTool(false);
        ns.RenderCurrentTags();
        ns.initSketcher();
        ViTag.initTest();
        ViTag.initAnnotator();
        ViTag.initHotspot();
        ViTag.initWhiteboard();
        internal.editSketchCreatedTime = "";
         }
         catch(err)
        {
               ViTag.error("Visap.edit:RemoveActionList: Error in removing actions"+err);
        }
    }

    /// <summary>
    /// Remove overlay from the list and database
    /// </summary>
    /// <param name="t">time to match with currenttime of the action </param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveOverlay = function (t, callBack) {
    try
    {
        // callBack will be used if call from outside framework
        if (callBack)
            internal.RemoveOverlay(t, callBack.onSaving, callBack.onSave, callBack.onError);
        else
            internal.RemoveOverlay(t, internal.MsgDeleting, internal.MsgDeleted, internal.MsgError);
        ns.enableEditTool(false);
        ns.RenderCurrentTags();
        ns.initSketcher();
        ns.initTest();
        }
         catch(err)
        {
               ViTag.error("Visap.edit:RemoveOverlay: Error in removing overlay"+err);
        }
    }

    /// <summary>
    /// Remove action from the database
    /// </summary>
    /// <param name="ti">time to match with currenttime of the action list</param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveAction = function (ti, pausedtime,type, callBack) {
    try
    {
        // callBack will be used if call from outside framework
        if (callBack)
            internal.RemoveAction(ti, pausedtime, callBack.onSaving, callBack.onSave, callBack.onError);
        else
            internal.RemoveAction(ti, pausedtime, function () { internal.ShowMessage("Deleting...", "Info", "Action." + type + ".Deleting"); },
                                                  function () { internal.ShowMessage("Deleted successfully", "Info", "Action." + type + ".Deleted"); internal.renderAttrs(); 
                                                  				ns.postData(type,"delete");
                                                  },
                                                  function () { internal.ShowMessage("There was an error saving data", "Info", "Action." + type + ".DeletingError"); });

        ns.enableEditTool(false);
        ns.RenderCurrentTags();

        ns.initSketcher();
        ViTag.initTest();
        ViTag.initAnnotator();
        ViTag.initHotspot();
        ViTag.initWhiteboard();
        internal.editSketchCreatedTime = "";
        me.clearSketch();
        }
         catch(err)
        {
               ViTag.error("Visap.edit:RemoveAction: Error in removing action"+err);
        }
    }
    /// <summary>
    /// Remove link from the database
    /// </summary>
    /// <param name="n">link name to be removed</param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveLink = function (n, callBack) {
    try
    {
        // callBack will be used if call from outside framework
        if (callBack)
            internal.RemoveLink(n, callBack.onSaving, callBack.onSave, callBack.onError);
        else
            internal.RemoveLink(n, function () { internal.ShowMessage("Deleting...", "Info", "Links.Deleting"); },
                                   function () { internal.ShowMessage("Deleted successfully", "Info", "Links.Deleted"); internal.renderAttrs(); 
                                   				    ns.postData("link","delete");	
                                   },
                                   function () { internal.ShowMessage("There was an error saving data", "Info", "Links.DeletingError"); });

        ns.enableEditLinkTool(false);
        ns.RenderCurrentLinks();
        }
         catch(err)
        {
               ViTag.error("Visap.edit:RemoveLink: Error in removing link"+err);
        }
    }

    /// <summary>
    /// Update actionslist 
    /// </summary>
    /// <param name="type">type of the actions</param>
    /// <param name="startTime">starttime of the action</param>
    /// <param name="pausedTime">pausedTime of the action</param>
    /// <param name="actionObj">actionObject</param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.updateActionsList = function (type, startTime, pausedTime, actionObj, callBack) {
    try
    {
        ViTag.info("Visap.edit:updateActionsList: editing action of type"+type);
        if (callBack)
            internal.updateActionsList(type, startTime, pausedTime, actionObj, callBack.onSaving, callBack.onSave, callBack.onError);
        else
            internal.updateActionsList(type, startTime, pausedTime, actionObj, function () { internal.ShowMessage("Saving...", "Info", "Action." + type + ".Saving"); },
                                                                               function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Action." + type + ".Saved");
																						     ns.postData(type,"update"+type);		
																				},
                                                                               function () { internal.ShowMessage("There was an error saving data", "Info", "Action." + type + ".SavingError"); });
     }
      catch(err)
        {
               ViTag.error("Visap.edit:updateActionsList: Error in updating action list"+err);
        }
    }

    /// <summary>
    ///Confirmation message
    /// </summary>
    /// <param name="msg">actual message</param>
    ///<returns>message to be dispalyed</returns>
    ns.getConfirmToDel = function (msg) {
        try
        {
        return confirm("Do you want to delete " + msg + " ?");
        }
      catch(err)
        {
               ViTag.error("Visap.edit:getConfirmToDel: Error in confirm message"+err);
        }
    }
    //To get the userid which is stored in localstorage.
    ns.getUserID=function(){
       return localStorage.getItem("userid");
    }
    /// <summary>
    ///To get particular action which is saved
    /// </summary>
    /// <param name="tooltype">type of the action</param>
    /// <param name="datavalue">data</param>
    /// <return>actionobj</returns>
    ns.getActionList = function (tooltype, datavalue,sourcetype) {
    try
    {
        var actionobj = {}; 
        if (ns.CurrentSrc().actions == null) ns.CurrentSrc().actions = [];
        if (ns.CurrentSrc().pausedtime == null) ns.CurrentSrc().pausedtime = 0;
        var timevalue, lastItem, totalvalue, totalduration;
        var t=internal.getRoundOffValue(internal.getPausedTime(tooltype));
        ns.CurrentSrc().pausedtime =t;  
        if (tooltype == "sketch")
            actionobj = { userid:ns.getUserID(),type: tooltype, data: { img: datavalue.i, duration: datavalue.d} };
        else if (tooltype == "annotation")
            actionobj = { userid:ns.getUserID(),type: tooltype, data: { title: datavalue.ti, description: datavalue.de, duration: parseInt(datavalue.d),PauseOnShow: datavalue.PauseOnShow, AnnotationAttributes: { left: datavalue.AnnotationAttributes.left, top: datavalue.AnnotationAttributes.top,width:datavalue.AnnotationAttributes.width,height:datavalue.AnnotationAttributes.height}} };

        else if (tooltype == "hotspot")
            actionobj = { userid:ns.getUserID(),type: tooltype, data: { title: datavalue.ti, description: datavalue.de, duration: parseInt(datavalue.d), showOnpause: datavalue.showOnpause, hotspotAttributes: { left: datavalue.hotspotAttributes.left, top: datavalue.hotspotAttributes.top}} };
        else if (tooltype == "whiteboard")
            actionobj = { userid:ns.getUserID(),type: tooltype, data: { description: datavalue.description, duration: parseInt(datavalue.duration), sketchData: datavalue.sketchData, PauseOnShow: datavalue.PauseOnShow, whiteboardPosition: datavalue.whiteboardPosition, whiteboardAttributes: { width: datavalue.whiteboardAttributes.width}} };
        else if(tooltype == "questions"){
            actionobj = { userid:ns.getUserID(),type: tooltype,sourcetype:sourcetype, data: datavalue };
                
        }

           
        var actionList = ns.getPausedAction(ns.CurrentSrc().pausedtime);

        if (actionList == undefined || actionList.length == 0)
            actionobj.data.StartTime = t;//internal.getRoundOffValue(t);

        if (actionList != undefined && actionList.length > 0) {
            for (var i = 0; i < actionList.length; i++) {
                lastItem = actionList.length - 1;
                totalvalue = actionList[lastItem].data.StartTime;
                totalduration = actionList[lastItem].data.duration;
                actionobj.data.StartTime = internal.getRoundOffValue(totalvalue + totalduration);
            }
        }
        return actionobj;
        }
      catch(err)
        {
               ViTag.error("Visap.edit:getActionList: Error in getting action list"+err);
        }
    }

    //This will invoke when user try to update the pause time and click on save.
    ns.updatePauseTime = function (pauseTime, newTimeInsec, pauseTmAnchorId, pauseTmTextId) {
    try
    {
        var index = 0, currentime = 0, actionList = [], actions = ViTag.CurrentSrc().actions;

        //to check is there any action is already present with newly enterd pausetime.
        if (actions != undefined && actions.length > 0) {
            for (var i = 0; i < actions.length; i++) {
                if (actions[i].currentTime != pauseTime) {
                    if (actions[i].currentTime == newTimeInsec) {
                        internal.ShowMessage("There is an action present at this pausetime.", "Validation", "Timeline.Saving.AlertMsg")
                        $("#" + pauseTmTextId).val($("#" + pauseTmAnchorId)[0].innerHTML);
                        return false;
                    }
                }
            }
        }
        currentime = internal.getRoundOffValue(newTimeInsec);
        //this is to update the sequece of actions time for the particular pause time.
        var listActions = ViTag.getPausedAction(pauseTime);
        index = ns.pauseActionIndex;               //to get the index of the current src which is matching for the pausetime.
        actionList = $.extend(true, [], listActions);  //after updating the updated valued are stored in actionList .
        if (actionList != undefined && actionList.length > 0) {
            for (var j = 0; j < actionList.length; j++) {
                if (j == 0) {
                    actionList[j].data.StartTime = internal.getRoundOffValue(newTimeInsec);
                }
                else {
                    totalvalue = actionList[j - 1].data.StartTime;
                    totalduration = actionList[j - 1].data.duration;
                    actionList[j].data.StartTime = totalvalue + totalduration;
                }
            }
        }

        //to check the newly entered time is greater than the video duration.
        if (actionList && actionList.length > 0) {
            if ((actionList[actionList.length - 1].data.duration + actionList[actionList.length - 1].data.StartTime) > ViTag.getDuration()) {
                internal.ShowMessage("Total duration of the actionlist should be less than the video duration", "Validation", "Timeline.Saving.AlertMsg")
                $("#" + pauseTmTextId).val($("#" + pauseTmAnchorId)[0].innerHTML);
                return false;
            }
            else {
                ViTag.CurrentSrc().actions[index].currentTime = currentime;
                var actionData = ViTag.CurrentSrc().actions[index].listAction;
                for (var j = 0; j < ViTag.CurrentSrc().actions[index].listAction.length; j++) {
                    if (j == 0) {
                        actionData[j].data.StartTime = currentime;
                    }
                    else {
                        totalvalue = actionData[j - 1].data.StartTime;
                        totalduration = actionData[j - 1].data.duration;
                        actionData[j].data.StartTime = totalvalue + totalduration;
                    }
                }
            }
        } else { ViTag.CurrentSrc().actions[index].currentTime = currentime; }

        me.SaveTags(JSON.stringify([ns.CurrentSrc()]));
        ViTag.getSpecAction(newTimeInsec);
        $("#" + pauseTmTextId).hide();
        $("#" + pauseTmAnchorId).show();
        internal.PrintPauseTime(true); //passing true here to avoid sorting of pause time while editing the pausetime.
        ns.handleSeekBar();
        }
         catch(err)
        {
               ViTag.error("Visap.edit:updatePauseTime: Error in updating action list"+err);
        }
    }
    /// <summary>
    ///To get all actions which ever saved
    /// </summary>
    /// <param name="datavalue">data</param>
    /// <return>Json string of currentsource</returns>
    ns.getJsonString = function (action) {
    try
    {   
        var t= internal.getRoundOffValue(internal.getPausedTime(action.type));
        ns.CurrentSrc().pausedtime = t;
        var isavailabe = false;
        for (i = 0; i < ns.CurrentSrc().actions.length; i++) {
            var ac = ns.CurrentSrc().actions[i];
            if (ac.currentTime == t) {
                isavailabe = true;
                ac.listAction.push(action);
            }
        }

        if (!isavailabe)
            ns.CurrentSrc().actions.push({ currentTime: t, listAction: [action] });

        ns.CurrentSrc().actions.sort(function (a, b) { return a.t - b.t });
        return JSON.stringify([ns.CurrentSrc()])
        }
         catch(err)
        {
               ViTag.error("Visap.edit:getJsonString: Error in currentsrc in json list"+err);
        }
    }


    /// <summary>
    ///To get right hand side specific actions 
    /// </summary>
    /// <param name="time">paused time</param>-praveen


    ns.getSpecAction = function (time) {
    try
    {
        if ($.isFunction(me.ctrl.$savedActions)) {
            me.ctrl.$savedActions(time);
        }
        }
        catch(err)
        {
               ViTag.error("Visap.edit:getSpecAction: Error in getting specific action"+err);
        }
    }

    // Video attribute Remove -End-


    /// <summary>
    ///Adding options,removing questions edit question
    /// </summary>
    ns.question = {
        editQuesID: null, STime: null, PTime: null,

        addOption: function () {
        try
        {
            // Will create the question option contorls [radio button and textbox].
            if ($("#" + me.defaults.quesOptions + " span").length < 4)
                me.ctrl.$quesOptions.append(me.ctrl.$quesOptions.find("span")[0].outerHTML);
            else
                internal.ShowMessage("More than 4 options cannot be added", "Validation", "Action.questions.Saving");
          }catch(err)
          {
                ViTag.error("Visap.edit:addOption:Error in adding option for question"+err);
          }
        },

        deleteOption: function (oImag) {
        try
        {
            // Will delete the question option contorls [radio button and textbox].
            if ($("#" + me.defaults.quesOptions + " span").length > 1)
                $(oImag).parent("span").remove();
         }catch(err)
          {
                ViTag.error("Visap.edit:deleteOption:Error in deleting option for question"+err);
          }
        },

        add: function (ques, fnPreSend, fnSuccess, fnError) {
        try
        {
            // Add new question to list
            var q = me.AddQuestion(ques);
            me.SaveTags(q, fnPreSend, fnSuccess, fnError);
         }catch(err)
          {
                ViTag.error("Visap.edit:add:Error in adding new question"+err);
          }
        },

        edit: function (id, startTime, pausedtime) { 
        try
        {
            // Get question object based on question ID
            //var q = me.question.getQues(id);
            ViTag.debug("visap.edit:editquestion: Delete all existing question option controls"+id+","+startTime+","+pausedtime);   
            var q = me.question.getQues(startTime);
            ns.question.editQuesID = id;
            ns.question.STime = startTime;
            ns.question.PTime = pausedtime;
            me.ctrl.$saveQues.val("Edit");
            ns.editor.setValue(qTitle, q.data.qtitle);
            me.ctrl.$tagTitle.val(q.data.qtag);
            ViTag.debug("visap.edit:editquestion: Delete all existing question option controls");            
            $("#" + me.defaults.quesOptions + " span").each(function () {
                ns.question.deleteOption($(this).find("img")[0]);
            });
            // Add edit question option details 
            q.data.options.forEach(function (o) {
                if ($("#" + me.defaults.quesOptions + " span").length <= 4) {
                    me.ctrl.$quesOptions.append(me.ctrl.$quesOptions.find("span")[0].outerHTML);
                    me.ctrl.$quesOptions.find("span:last").find("input[type='text']").val(o);
                }
            });
            // Select the right option
            $('input:radio[name=optGroup]')[q.data.qans].checked = true;
            // Deleting the first option controls which is added by default
            ns.question.deleteOption(me.ctrl.$quesOptions.find("span:first").find("img")[0]);
            }catch(err)
            {
               ViTag.error("Visap.edit:question:edit: Error in editting question"+err);
            }
        },

        remove: function (id, callBack) {
            // Removing the question from list
            if (callBack)
                internal.removeQuestion(id, callBack.onSaving, callBack.onSave, callBack.onError);
            else
                internal.removeQuestion(id, internal.MsgDeleting, internal.MsgDeleted, internal.MsgError);
        }
    };
    ns.editor = {
        //To replace the ckeditor with our Html Element id.
        rePlaceCkeditor: function (containerID) {
        try{
            if (ns.editor.ckEditorAvailable()) {
                 //To over come Aelib question ck-editor we need to pass UrL to base path of ck-editor.
                 CKEDITOR.basePath=ViTag.config.ckEditorBasePathUrl;
                if (!CKEDITOR.instances[containerID.id]) {
                    CKEDITOR.replace(containerID, {    //this will replace the html element with the ckeditor.\
                        filebrowserUploadUrl: ViTag.config.wsImageuploadurl,  //This will invoke the image.do handler.
                    //This code is to customize the ckeditor subgroup elements.
                        toolbar: [
                    { name: 'document', groups: ['mode', 'document', 'doctools'], items: ['Source', 'NumberedList', 'BulletedList', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-'] },
                    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'], items: ['Bold', 'Italic', 'Underline', 'Image', 'SpecialChar'] }, '/',
                    { name: 'styles', items: ['Font', 'FontSize'] },
                    { name: 'colors', items: ['TextColor', 'BGColor'] },
                    { name: 'links', items: ['Link', 'Unlink'] },
                        ]
                    });
                     
               //To open the link  web address in new browser tab.
               CKEDITOR.on('dialogDefinition', function(ev) {
                try {
                      var dialogName = ev.data.name;/* to get the name of the dialog */
                      var dialogDefinition = ev.data.definition;
                      if(dialogName == 'link') {
                          var informationTab = dialogDefinition.getContents('target');  /* Getting the contents of the Target tab */
                          var targetField = informationTab.get('linkTargetType');/* Getting the contents of the dropdown field "Target" so we can set it */
                          targetField['default'] = '_blank'; // setting the value to "_blank".
                      }
                      if (dialogName == 'image') {
                           var infoTab = dialogDefinition.getContents( 'info' );//Getting the contents of the Image Info.
                           infoTab.remove( 'cmbAlign' ); //Remvoing Alignment text field.
                      }
                     } catch(err) {
                          ViTag.error("Visap.edit:editor:CKEDITOR:"+err);
                       }
                    });
                    
                    CKEDITOR.on('instanceReady', function () {
                        var whiteboard=$('#whiteboard')[0].id;
                        var dropdownValue = $('#drop').val();
                        //to override the default height of CK-Editor(whiteboard)
                        if (dropdownValue == 'whiteboard'||whiteboard=='whiteboard') {
                           var videoContainerHeight = me.ctrl.$videoMainContainer.height(); //height of the video container.
                           var ckTopHeight = $(".cke_top").height();
                           var ckbottomHeight = $(".cke_bottom").height();
                           $(".cke_contents").height((videoContainerHeight - ckTopHeight - ckbottomHeight - 20) + "px");
                           $('.cke_resizer ').hide();
                           $('.cke_path').css({'height':'18px','overflow-x':'initial'});
                        }
                    });
                    }
                  }
                } catch(err) {
                   ViTag.error("Visap.edit:editor:CkEditor"+err);
                  }
            },
        //It will return the html element content(if the ckeditor is undefined)
        //if the ckeditor is present then it will return the ckeditor element content.
        getValue: function (containerID) {
        ViTag.debug("Visap.edit:It will return the value of ckeditor:"+containerID);
            if (ns.editor.ckEditorAvailable() && CKEDITOR.instances[containerID.id])
                return ns.htmlEncode(CKEDITOR.instances[containerID.id].getData());
            else return $("#" + containerID.id).val();
        },
        //It will return plain text value of ckeditor(without html tag).
        getPlainText:function(containerID){
          ViTag.debug("Visap.edit:getPlainText:It will return the plain text value of ckeditor:"+containerID);
           if (ns.editor.ckEditorAvailable() && CKEDITOR.instances[containerID.id])
           var txt=$.trim(CKEDITOR.instances[containerID.id].document.getBody().getText());
           else
            txt= $.trim($("#" + containerID.id).val());
          return (txt == "") ? false : true;
        },
        //It will set the html element content(if the ckeditor is undefined)
        //if the ckeditor is present then it will set the ckeditor element content.
        setValue: function (containerID, content) {
         ViTag.debug("Visap.edit:setValue:setValue of ckeditor:"+containerID+","+content);
            if (ns.editor.ckEditorAvailable() && CKEDITOR.instances[containerID.id])
                CKEDITOR.instances[containerID.id].setData(ns.htmlDecode(content));
            else $("#" + containerID.id).val(unescape(content));
        },
        //to check the ckeditor is available or not
        ckEditorAvailable: function () {
            return (window.CKEDITOR != undefined);
        },
        //to check the ckeditor instances is present or not.
        ckEditorInstanceAvilable: function (containerID) {
            return (CKEDITOR.instances[containerID.id]);
        },
        //To check ckeditor is loaded or not. 
        isCkeditorLoaded(instance_selector) {
         var status;
         if (window.CKEDITOR && CKEDITOR.instances && CKEDITOR.instances[instance_selector]) {
           status = CKEDITOR.instances[instance_selector].status;
         }
        return status === 'ready';
      }
    };

    /// <summary>
    ///Enabling the Sketch Tab and sketch related canvas elements
    /// </summary>
    /// <param name="time">start time</param>

    /// <param name="PTime">paused time</param>

    ns.enableSketchTabs = function (time, PTime, editedAction) {
    try
    {   
        var imgoverlay = me.ctrl.$imgOverlay;
        ViTag.Actions = [];
        var t = ViTag.getCurrentTime();
        imgoverlay.hide();
        me.ctrl.$sketchcontainerDefault.html('');
        me.ctrl.$sketchcontainerWB.html('');
        //imgoverlay.attr('src', '#');
        // edit of the default sketch
        ViTag.initSketchTools({ container: "sketchcontainerDefault" });
        ns.resetSketches();
        ns.sketchDataDefault = editedAction.img;
        ns.updateSketches(ns.sketchDataDefault);
        ns.sketchDataWhiteboard = null;// empty other action edited values(base 64 string of the wb action to avoid undo)
        ns.showSketcher();        
        internal.editSketchCreatedTime = time;
        internal.editSketchPausedTime = PTime;
        me.ctrl.$sketchDuration.val(editedAction.duration);
        } 
        catch(err)
                {
                       ViTag.error("Visap.edit:enableSketchTabs: Error while enabling sketch"+err);
                }
    };

    /// <summary>
    ///Set the css values of the dropdown
    /// </summary>
    ns.setDropdown = function () {
    try
    {
        me.ctrl.$dropdownSelect.val('Choose Actions');
        me.ctrl.$dropdownSketch.css("display", "none");
        me.ctrl.$dropdownAnnotate.css("display", "none");
        me.ctrl.$dropdownQuestion.css("display", "none");
        me.ctrl.$dropdownHotSpot.css("display", "none");
        me.ctrl.$dropdownwhiteboard.css("display", "none");
        me.ctrl.$sketchContainerUI.css("display", "none");
        me.ctrl.$whiteboardSaveCancel.css("display", "none");
        } 
        catch(err)
                {
                       ViTag.error("Visap.edit:setDropdown: Error while setting dropdown"+err);
                }  
        
    };

    /// <summary>
    ///Enable the Edit Panel with relevant elements
    /// </summary>
    ns.enableEditPanel = function () {
    try
    {    
        internal.pauseTime=1;
        // If the user in time line mode then other actions stufs are disabled.
        if (ViTag.isTimelIneMode) {
           // ns.disableEditMode = true;
            ns.disabelEditPanel();
            $('#timelineContainer').show();
        }

        else {
            ns.disableEditMode = false;
            ViTag.isTimelIneMode = false;
            $('#timelineContainer').hide();
        } 

        if (ns.yt.player) {
            if (ns.yt.player.getCurrentTime() == 0) {
                ns.disabelEditPanel();
            }
        }
        else {
            if (me.ctrl.video.currentTime == 0) {
                ns.disabelEditPanel();
            }
        }

        if (ViTag.tmVideoEnd)
            ns.disabelEditPanel();
     
     if (!me.ctrl.video.ended && !ns.disableEditMode) {
            internal.PrintTagsToEdit();
            internal.PrintLinksToEdit();
            internal.PrintQuestionToEdit();
            internal.PrintPauseTime();
            me.ctrl.$editContainer.animate({ opacity: 'show' }, 'slow');
            ns.showActions = false;
            $("body").trigger("enableActionContainer",ns.pauseByAction);
        }
     
     }
      catch(err)
            {
                   ViTag.error("Visap.edit:enableEditPanel: Error while enabling edit panel"+err);
            }  
    };

    /// <summary>
    ///Disable Edit Panel
    /// </summary>
    ns.disabelEditPanel = function () {
    try
    {
        internal.pauseTime=-1;
        me.ctrl.$editContainer.hide();
        me.ctrl.$canvas.hide();
        ns.enableEditTool(false);
        ns.disableEditMode = true;
        //me.question.clearEntries(); //This line has to be modify for AElib.
        ns.showActions = true;
        ns.hideSketches();
        ns.setDropdown();
        $("body").trigger("disableActionContainer");
      }
      catch(err)
        {
         ViTag.error("Visap.edit:enableEditPanel: Error while enabling edit panel"+err);
        }   
    };
    
    ns.setPauseTm=function(){
      internal.pauseTime=1;
    };
    
    //on change of duration by manullay,update video time(seekbar).
    ns.onChangeDuration=function(val,id){
       //Todo:timeline
         if(ViTag.CurrentSrc().sourcetype==2)
          return;
     
        var duration= internal.getNumber(val);//Get duration value and convert it into int number.
        internal.updateSeekbar(duration);//update video current time(seekbar).
    };
    
    //Increment duration of action and update video current time.
    ns.incDuration=function(id){
          //Todo:timeline
        if(ViTag.CurrentSrc().sourcetype==2)
          return;
    
        var duration=$("#"+id).val();//get duration value.
        duration= internal.getNumber(duration);//convert string to int number.
        internal.updateSeekbar(duration+1,id);//add 1 to duration value to increment and upadate seekbar.
    };
    
     //Decrement duration of action and update video current time.
    ns.decDuration=function(id){
            //Todo:timeline
          if(ViTag.CurrentSrc().sourcetype==2)
          return;
         
         var duration=$("#"+id).val();//get duration value.
         duration= internal.getNumber(duration);//convert string to int number.
         //Validate:duration should be greater than 1 and current time. 
         if(duration>1 && internal.getRoundOffValue(ViTag.getCurrentTime())>0)
               internal.updateSeekbar(duration-1,id);//update video current time(seekbar).
         else
              internal.ShowMessage("Duration cannot not be empty.It should be greater than 1 sec", "Validation", "Duration");
    };
   
   //Reset to video pause time after adding/cancel of action.  
    ns.resetVidTm=function(){
    
      if(internal.pauseTime==-1 && internal.vidPauseTm!=null)
          ViTag.playAt(internal.vidPauseTm);//set seek bar to paused time.
    };

    ns.SaveTagAction=function(){
    
        var action="tag.create";
        if (!internal.IsValid()) {
                    internal.ShowMessage("Please enter tag", "Validation", "Tags.Saving");
                    return false;
                }
                var pattern = "^[a-zA-Z0-9']+";
                var t = internal.getRoundOffValue(ns.getCurrentTime());
                d = me.ctrl.$tag.val();
                ViTag.debug("visap.edit:setTagControls:saving the tag"+t+","+d);

                if (ns.CurrentTags()) {
                    var u = $.grep(ns.CurrentTags(), function (u) {
                        if (internal.editTagTime >= 0) {
                            if (u.d.toLowerCase() != ns.desc.toLowerCase()) {
                                return unescape(u.d.toLowerCase()) == ($.trim(d)).toLowerCase();
                            }
                        } else
                            return unescape(u.d.toLowerCase()) == ($.trim(d)).toLowerCase();

                    })[0];
                    if (u) {
                        internal.ShowMessage("The tag is already present in the list", "Validation", "Tags.Saving");
                        return false;
                    }
                }

                if (internal.editTagTime >= 0) {
                    action="tag.update";
                    if ($.trim(me.ctrl.$tagTime.val()) == "") {
                        internal.ShowMessage("Please enter tag time", "Validation", "Tags.Saving");
                        return false;
                    }
                    var tagTime = me.ctrl.$tagTime.val();
                    ViTag.debug("Visap.edit:Tagtime"+tagTime);
                    
                    if (me.ctrl.$tagTime.val().indexOf(":") != -1) {
                        //to validate the tagtime when uer try to edit the tag time.
                        if (ViTag.util.timeFormat(me.ctrl.$tagTime.val())) {
                            me.resetTagTime();
                            return false;
                        }
                        else tagTime = me.getTagTimeInseconds(me.ctrl.$tagTime.val());
                    }

                    if (parseInt(tagTime) >= ns.getDuration()) {
                        internal.ShowMessage("Tag time should be less than the duration of the video.", "Validation", "Tags.Saving");
                        me.resetTagTime();
                        return false;
                    }
                    t = parseInt(tagTime);
                    
                    internal.deleteTag(ns.editTagDesc);  //The deleteTag method will delete the tag from the currentsrc but it will not delete from the database.
                    ns.enableEditTool(false);            //To clear and hide values of tag title and time.
                    if (ns.tagEdit) {
                        ns.tagEdit = false;
                        return false;
                    }
                }
                me.ctrl.$tag.val(d);
                ViTag.debug("Visap.edit:saveTagClick:Create tag for the time and description"+" "+t +","+d);
                ns.AddAndSaveTag({ t: t, d:d },
                                    function () { internal.ShowMessage("Saving...", "Info", "Tags.Saving"); },
                                    function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Tags.Saved"); internal.renderAttrs();
                                                 ns.postData("tag",action);    
                                    },
                                    function () { internal.ShowMessage("There was an error saving data", "Info", "Tags.SavingError"); });
                ns.handleSeekBar();
    };
 
    ns.CancelTagAction=function(){
       if (internal.editTagTime == -1)
                    me.exitEditMode();
                else
                    ns.enableEditTool(false);
    };
   
   ns.SaveLinkAction=function(){
       var action="link.create";
      var n = me.ctrl.$linkName.val(),
                    u = me.ctrl.$linkUrl.val();
                  ViTag.debug("Visap.edit:setLinkControls:Link saved for the name and url"+n+","+u);
                //To check the link name already present in the currentLinks,
                // if its already present then it not will allow to create the link with the same name.
                if (ns.CurrentLinks()) {
                    var linkName = $.grep(ns.CurrentLinks(), function (lnk) {
                        if (internal.editLink) {
                            action="link.update";
                            if (unescape(lnk.n.toLowerCase()) != ns.linkName.toLowerCase()) {
                                return unescape(lnk.n.toLowerCase()) == ($.trim(n)).toLowerCase();
                            }
                        } else{
                            return unescape(lnk.n.toLowerCase()) == ($.trim(n)).toLowerCase();
                            }

                    })[0];
                    if (linkName) {
                        internal.ShowMessage("The Link is already present in the list", "Validation", "Links.Saving");
                        return false;
                    }
                }
                //to check for the empty link name and URL
             if(ns.util.isTextFieldEmpty(n,"Please enter name", "Validation", "Links.Saving" ))
             {
             	return false;
             }
             else if(ns.util.isTextFieldEmpty(u,"Please enter URL", "Validation", "Links.Saving" ))
             {
             	return false;
             } 
                if (internal.validateURL(u)) {
                    if (internal.editLink)
                        internal.deleteLink(internal.editLink);   //to delete the link from the currentSrc 
                    ns.AddLinks({ n: escape(n), u: u }, function () { internal.ShowMessage("Saving...", "Info", "Links.Saving"); },
                                                function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Links.Saved"); internal.renderAttrs(); 
                                                				ns.postData("link",action);   //first parameter is type and second one is action 		
                                                },
                                                
                                                function () { internal.ShowMessage("There was an error saving data", "Info", "Links.SavingError"); });
                }
                else {
                    internal.ShowMessage("Please enter valid URL", "Validation", "Links.Saving");
                }
                return;
   };
    
    ns.CancelLinkAction=function(){
      
         if (internal.editLink) {
                    ns.enableEditLinkTool(false);
                    internal.editLink = false;
                }
                else
                    me.exitEditMode();
                me.ctrl.$linkName.val("");
                me.ctrl.$linkUrl.val("");
    };
     ns.annotationAttr = {
        height: "100",
        width: "180"
       
    };
    
    ns.SaveAnnotationAction=function(){
    
    var ti = me.ctrl.$cmtTitle.val(),
                edit = false, type = 'annotation',
                d =me.ctrl.$cmtDuration.val(),
                t = internal.getPausedTime(),//reset to pause time.
                totalduration = "",width,height,left,top;
                me.ctrl.$annotatePauseOnShow.is(":checked")==true? PauseOnShow = true: PauseOnShow = false;
               
                de = ns.editor.getValue(cmtDesc);

                //To capture the annotation left and top positon on the video and height and width.
                  width = ns.annotationAttr.width;
                  height = ns.annotationAttr.height;
                  
                if(ns.ispreview){
                      ns.ispreview=false;
                       width = $('#annotates').outerWidth();
                	   height = $('#annotates').outerHeight();
                }else  {  me.ctrl.$annotates.css({ left: "0px", width: "0px", top: "0px" });}
                        
                 
                    left = me.ctrl.$annotations.css("left");
                	top = me.ctrl.$annotations.css("top");
               
                var pattern = "^[a-zA-Z0-9']+";
                ns.editAns = false; 
                ViTag.debug("Visap.edit:exit criteria from the edit annotation mode is cancel and save annotation."+left+","+top+","+de+","+d+","+ti);
                 
                // Validation for title and duration. 
              	if(ns.util.isTextFieldEmpty(ti,"Please enter title", "Validation", "Action.annotation.Saving" ))
              	{
              		return false;
              	}
              	else if(ns.util.isTextFieldEmpty(d,"Please enter duration", "Validation", "Action.annotation.Saving" )) 
              	{
              		return false;
              	}
              	else if(ns.util.isDurationZero(d,"Duration should be more than 0 secs", "Validation", "Action.annotation.Saving" )) 
              	{
              		return false;
              	}
              	//Validation for annotation ckeditor.
                else if (ns.editor.getPlainText(cmtDesc)==false){
                     internal.ShowMessage('Please enter description', "Validation", "Action.annotation.Saving");
                     return false;
                }          
             	d = parseInt(me.ctrl.$cmtDuration.val());
                    
                    if (internal.editAnnotation) {
                        edit = true;
                        t = internal.editAnnotation.t;
                    }
                     if (!edit) {
                        var restduration = internal.getRemainingDuration();
                        if (restduration < d) {
                            if (restduration < 1)
                                internal.ShowMessage("Maximum duration is reached", "Validation", "Action.annotation.Saving");
                            else
                                internal.ShowMessage("Duration for this action should be less than'" + ns.getTimeFormat(restduration + 1) + "' secs", "Validation", "Action.annotation.Saving");
                            me.ctrl.$cmtDuration.val();
                            return false;
                        }
                        
                        ViTag.debug("Visap.edit:if we set the top value to 0 then the annotation will dispaly completely top of the video, so adding 34 px to set the position exactly below the title.");
                        //if (parseInt(top) == 0) top = (parseInt(top) + 34) + "px";
                        
                        ns.AddAndSaveAnnotate({ ti: escape(ti), de:de, t: t, d:d, PauseOnShow: PauseOnShow,AnnotationAttributes: { left: left, top: top,height:height +"px",width:width+"px"} },
                                            function () { internal.ShowMessage("Saving...", "Info", "Action.annotation.Saving"); },
                                            function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Action.annotation.Saved"); internal.renderAttrs(); 
                                            				ns.postData(type,"createAnnotation");                                               
                                            },
                                            function () { internal.ShowMessage("There was an error saving data", "Info", "Action.annotation.SavingError"); });


                    }
                    else {
                   
                        //if both left and top value is 0 means then need to read left and top value from annotation position or else use already saved left and top.
                        //if ((parseInt(top) == 0) && (parseInt(left) == 0)) {
                          //  left = ns.left;
                            //top = ns.top;
                       //editAns }
                  
                        if(ns.annotationAttr.height==height && ns.annotationAttr.width==width){
                            height=parseFloat(ns.height); 
                            width=parseFloat(ns.width);
                           }
                       
                        //Validate while editing duration of the action.
                        if(!internal.remainingVidDuration(internal.editAnnotation.t,d,type))
                          return false;
                        ns.updateActionsList(type, internal.editAnnotation.t, internal.editAnnotation.pausedTime, { ti: ti, de: de,duration:d,PauseOnShow: PauseOnShow, AnnotationAttributes: { left: left, top: top,height:height+"px",width:width+"px"} });
                        internal.editAnnotation = null;
                    }
                    ns.AnnotateEditTool(null);
                    ViTag.initAnnotator();
                    
                ns.handleSeekBar();
                if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
                return true;
    };
    
    ns.CancelAnnotationAction=function(){
          if (internal.editAnnotation) {
                    ns.AnnotateEditTool();
                    ns.setDropdown();
                }
                else {
                    // me.exitEditMode();
                    ns.setDropdown();
                    viTag.RenderCurrentAnnotates(null);
                }
                ns.editAns = false; //exit criteria from the edit annotation mode is cancel and save annotation.
    };
    
    ns.SaveQuestionAction=function(){
          internal.createDefaultQuestion();
          ns.handleSeekBar();
    };
    
    
    ns.CancelQuestionAction=function(){
         if (!ns.question.editQuesID) 
                     ns.setDropdown();                    
                    me.question.clearEntries();
    };
    
  
    
    ns.SaveHotspotAction=function(){
        var ti = me.ctrl.$hotspotTittle.val(),
                edit = false, type = 'hotspot',left,top,
                d = me.ctrl.$hotspotDuration.val(), showOnpause = 0;
                if (me.ctrl.$hotspotOnpause.is(":checked"))
                    showOnpause = 1;
                else
                    showOnpause = 0;
                    
                t = internal.getPausedTime(),//reset to pause time.
                de = me.ctrl.$hotspotContent.val();     
                left=($('#videoMainContainer').width()/2)+"px";
                top=($('#videoMainContainer').height()/2)+"px";
                if(ns.previewModehotspot) {
                  	if(me.ctrl.$hotspotCircle.css("left")!=($('#videoMainContainer').width()/2)+"px" && ($('#videoMainContainer').height()/2+"px")!=me.ctrl.$hotspotCircle.css("top")) 
                     {
                         left = me.ctrl.$hotspotCircle.css("left");
                         top = me.ctrl.$hotspotCircle.css("top");
                     }
                 }
                var pattern = "^[a-zA-Z0-9']+";
                ns.editPreviewHS = false;
                ViTag.debug("visap.edit:hotspotsave:exit criteria from the edit hotspot mode is cancel and save hotspot"+left+","+top);
              
              //Validation for title,duration and description.  
              if(ns.util.isTextFieldEmpty(ti,"Please enter title", "Validation", "Action.hotspot.Saving" )) 
              {
              	return false;
              }
              else if(ns.util.isTextFieldEmpty(d,"Please enter duration", "Validation", "Action.hotspot.Saving" )) 
              {
              	return false;
              }
              else if(ns.util.isDurationZero(d,"Duration should be more than 0 secs","Validation","Action.hotspot.Saving"))
              {
              	return false;
              }
              else if(ns.util.isTextFieldEmpty(de,"Please enter description", "Validation", "Action.hotspot.Saving" )) 
              {
              	return false;
              }
              d = parseInt(me.ctrl.$hotspotDuration.val());
				
                    if (internal.editHotspotvalues) {
                        edit = true;
                        t = internal.editHotspotvalues.t;
                    }

                    if (!edit) {
                        var restduration = internal.getRemainingDuration();
                        if (restduration < d) {
                            if (restduration <= 1)
                                internal.ShowMessage("Maximum duration is reached", "Validation", "Action.hotspot.Saving");
                            else
                                internal.ShowMessage("Duration for this action should be less than '" + ns.getTimeFormat(restduration + 1) + "' secs", "Validation", "Action.hotspot.Saving");
                            return false;
                        }
                        ViTag.debug("visap.edit:hotspotsave:Adding the Hotspot having tittle and desc"+" "+ti+","+de);
                        ns.AddAndSaveHotspot({ ti: escape(ti), de: escape(de), t: t, d: d, showOnpause: showOnpause, hotspotAttributes: { left: left, top: top} },
                                            function () { internal.ShowMessage("Saving...", "Info", "Action.hotspot.Saving"); },
                                            function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Action.hotspot.Saved"); internal.renderAttrs();
															ns.postData(type,"createHotspot");   
											},
                                            function () { internal.ShowMessage("There was an error saving data", "Info", "Action.hotspot.SavingError"); });


                    }
                    else {
                        //Validate while editing duration of the action.
                        if(!internal.remainingVidDuration(internal.editHotspotvalues.t,d,type))
                          return false;
                        ns.updateActionsList(type, internal.editHotspotvalues.t, internal.editHotspotvalues.pausedTime, { ti: ti, de: de, duration:d, showOnpause: showOnpause, hotspotAttributes: { left: left, top: top} });
                        internal.editHotspotvalues = null;
                    }
                    ns.HotspotEditTool(null);
                    ViTag.initHotspot();

                //}
                //else {
                  //  internal.ShowMessage("Tittle,desc and Duration are Mandatory Fields", "Validation", "Action.hotspot.Saving");
               // }
                ns.handleSeekBar();
                if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
                return true;
    
    };
    
    ns.CancelHotspotAction=function(){
    
       if (internal.editHotspotvalues) {
                    ns.HotspotEditTool();
                    ns.setDropdown();
                }

                else {
                    ns.setDropdown();
                    ViTag.RenderCurrentHotspot(null);
                }
                ns.editPreviewHS = false; //exit criteria from the edit hotspot mode is cancel and save hotspot.
    };
    
    ns.SaveSketchAction=function(){
    
     if (ns.isSketchEmpty()==true ||ns.sketchDataDefault) {
                    var t =internal.getPausedTime();//reset to pause time.
                    var imageTime = t, i = ns.getImager();
                    var edit = false;
                    var type = "sketch";
                    var duration = me.ctrl.$sketchDuration.val();
                //Validation for duration
                if(ns.util.isTextFieldEmpty(duration,"Please enter duration", "Validation", "Action.sketch.Saving" )) 
                {
                	return false;
                }
               	else if(ns.util.isDurationZero(duration,"Duration should be more than 0 secs","Validation","Action.sketch.Saving"))
               	{
               		return false;
               	}
				duration = parseInt(me.ctrl.$sketchDuration.val());            
                     
                    if (internal.editSketchCreatedTime != "") {
                        edit = true;
                    }

                    if (!edit) {
                        var restduration = internal.getRemainingDuration();
                        if (duration > 0) {
                            if (restduration < duration) {
                                if (restduration < 1)
                                    internal.ShowMessage("Maximum duration is reached", "Validation", "Action.sketch.Saving");
                                else
                                    internal.ShowMessage("Duration for this action should be less than'" + ns.getTimeFormat(restduration + 1) + "' secs", "Validation", "Action.sketch.Saving");
                                me.ctrl.$cmtDuration.val();
                                return false;
                            }
                        }
                        else {
                            internal.ShowMessage("Duration for this action should be greater than 0 secs", "Validation", "Action.sketch.Saving");
                            me.ctrl.$cmtDuration.val();
                            return false;
                        }
                       ViTag.debug("Visap.edit:saveOverlay:saving sketch for time and duration:"+t+","+duration);
                        ns.AddOverlay({ t: t, i: i, d: parseInt(duration) }, function () { internal.ShowMessage("Saving...", "Info", "Action.sketch.Saving"); },
                                                                            function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Action.sketch.Saved"); internal.renderAttrs(); 
                                                                            				 ns.postData(type,"createsketch");   
								                                            },
                                                                            function () { internal.ShowMessage("There was an error saving data", "Info", "Action.sketch.SavingError"); });
                    }
                    else {
                        ViTag.debug("Visap.edit:updateSketch:Editing the sketch for having time and duration:"+t+","+duration);
                        //Validate while editing duration of the action.
                        if(!internal.remainingVidDuration(internal.editSketchCreatedTime,duration,type))
                          return false;
                        ns.updateActionsList(type, internal.editSketchCreatedTime, internal.editSketchPausedTime, { t: t, i: i, duration: duration });
                        internal.editSketchCreatedTime = "";
                    }

                    ns.initSketcher();
                    if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
                }
                else
                    internal.ShowMessage("Please add sketch", "Validation", "Action.sketch.Saving");

                ns.handleSeekBar();
                me.ctrl.$sketchDuration.val("")
                ViTag.resetSketches();
    };
    
    ns.CancelSketchAction=function(){
    
        me.ctrl.$sketchDuration.val("");
                me.ctrl.$clear.click();
                me.ctrl.$canvas.hide();
                //     me.exitEditMode();
                me.ctrl.$imgOverlay.hide();
                ns.hideSketches();
                ns.setDropdown();
    };
    
    ns.SaveWhiteboardAction=function(){
    
      ViTag.debug("Visap.edit:whiteboardsave:saving whiteboard to database");
                var edit = false, type = 'whiteboard',
               	duration = me.ctrl.$whiteboardDuration.val();
                CurrentVideoTime = internal.getPausedTime(),//reset to pause time.
                totalduration = "",sketchData = "",
                PauseOnShow = false;
                //set PauseOnShow as true if PauseOnShow checkbox is checked.
                me.ctrl.$whiteboardPauseOnShow.is(":checked")==true? PauseOnShow = true: PauseOnShow = false;    
                var whiteboardPosition = $('input[name="wbSlide"]:checked').val();
                
                if (internal.whiteboardTextData){
                    var description = internal.whiteboardTextData;
                }
                else{
                    description = ns.editor.getValue(cmtWiteboard);
				}                    
                    internal.whiteboardTextData=null;//clear value.
                    
                var width = me.ctrl.$wboardContainer.css("width");
                var sketcher = $('#sketcher')[0];
                var isSketchEmpty=ns.isSketchEmpty();//Check whether sketch is drawn or not.
                ViTag.debug("Visap.edit:whiteboardsave:check for the sketch data,width,description,postion,pauseOnShow"+sketcher+","+width+","+whiteboardPosition+","+PauseOnShow);
               
               if (sketcher != undefined && isSketchEmpty==true)
                      sketchData = ns.getImager();
                      
                ViTag.debug("Visap.edit:whiteboardsave click:exit criteria from the edit whiteboard mode is cancel and save whiteboard.");
                ns.editwhitebaord = false;
               
                //Validation:Empty data are not allowed.
                if(sketchData=="" && ns.editor.getPlainText(cmtWiteboard)==false)
                {
                   internal.ShowMessage("Whiteboard cannot be empty", "Validation", "Action.whiteboard.Saving");
                   return;
                }                
               	if(ns.util.isTextFieldEmpty(duration,"Please enter duration", "Validation", "Action.whiteboard.Saving" )) 
               	{
               		return false;
               	}
               	else if(ns.util.isDurationZero(duration,"Duration should be more than 0 secs","Validation","Action.whiteboard.Saving"))
               	{
               		return false;
               	}
                duration = parseInt(me.ctrl.$whiteboardDuration.val());
                
                 
                if (internal.editWhiteboard) {
                   edit = true;
                   CurrentVideoTime = internal.editWhiteboard.CurrentVideoTime;
                   if(isSketchEmpty==false)//Check whether sketch is drawn or not in edit mode.
                     sketchData=internal.editWhiteboard.sketchData;
                }
                
                if (!edit) {
                    var remaingVideoDuration = internal.getRemainingDuration();
                    if (remaingVideoDuration < duration) {
                        if (remaingVideoDuration < 1)
                            internal.ShowMessage("Maximum duration is reached", "Validation", "Action.whiteboard.Saving");
                        else
                            internal.ShowMessage("Duration for this action should be less than'" + ns.getTimeFormat(remaingVideoDuration + 1) + "' secs", "Validation", "Action.whiteboard.Saving");
                        me.ctrl.$cmtDuration.val();
                        return false;
                    }
                    ns.AddAndSaveWhiteboard({ description: description, CurrentVideoTime: CurrentVideoTime, duration: duration, sketchData: sketchData, PauseOnShow: PauseOnShow, whiteboardPosition: whiteboardPosition, whiteboardAttributes: { width: width} },
                       function () { internal.ShowMessage("Saving...", "Info", "Action.whiteboard.Saving"); },
                       function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Action.whiteboard.Saved"); internal.renderAttrs(); 
                       				ns.postData(type,"createWhiteboard");},   
                       function () { internal.ShowMessage("There was an error saving data", "Info", "Action.whiteboard.SavingError"); });
                }
                else {
                      //Validate while editing duration of the action.
                       if(!internal.remainingVidDuration(internal.editWhiteboard.t,duration,type))
                         return false;
                       ns.updateActionsList(type, internal.editWhiteboard.t, internal.editWhiteboard.pausedTime, { description: description, CurrentVideoTime: CurrentVideoTime, duration: duration, sketchData: sketchData, PauseOnShow: PauseOnShow, whiteboardPosition: whiteboardPosition, whiteboardAttributes: { width: width} });
                       internal.editWhiteboard = null;
                }
                ns.WhiteboardEditTool(null);
                ViTag.initWhiteboard();
                me.ctrl.$whiteBoardWrapper.hide();
                ns.handleSeekBar();
                if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
                ViTag.resetSketches();
                return true;
    };
    
    ns.CancelWhiteboardAction=function(){
       if (internal.editWhiteboard) {
                    ns.WhiteboardEditTool();
                    ns.setDropdown();
                }
                else {
                    ns.setDropdown();
                }
                ViTag.RenderCurrentWhiteboard(null);
                ns.editwhitebaord = false; //exit criteria from the edit whiteboard mode is cancel and save whiteboard.
    };
    
        //create and edit timeline functionality starts.
     ns.timeLineSave=function(){
              analyticsObj={};
              if (me.ctrl.$tmTitle.val() == '' || me.ctrl.$tmDesc.val() == '') {  //validation for the timeline video.
                    internal.ShowMessage("Title and Description should not be blank.", "Validation", "Timeline.Saving");
                    return false;
                }
                var childEles = $("#startcapture").children(), tempData = [];
                if (childEles.length <= 0) {
                    internal.ShowMessage("Atleast one video should be captured to save timeline videos.", "Validation", "Timeline.Saving");
                    return false;
                }
                 ViTag.debug("visap.edit:timelineSaveBtn.click: Timeline save  for the tittle and description"+ me.ctrl.$tmTitle.val()+","+me.ctrl.$tmDesc.val());
                if (ViTag.source) {
                    for (var i = 0; i < ViTag.source.length; i++) {
                        if (ViTag.editTimelineMode) {
                            if (ViTag.editTmSrcdetials._id != ViTag.source[i]._id) {
                                if (ViTag.source[i].title.toLowerCase() == me.ctrl.$tmTitle.val().toLowerCase()) {
                                    internal.ShowMessage("Duplicate tittle, a video of same title already exists. Please use a different tittle", "Validation", "Timeline.Saving");
                                    return false;
                                }
                            }
                        }
                        else {
                            if (ViTag.source[i].title.toLowerCase() == me.ctrl.$tmTitle.val().toLowerCase()) {
                                internal.ShowMessage("Duplicate tittle, a video of same title already exists. Please use a different tittle", "Validation", "Timeline.Saving");
                                return false;
                            }
                        }
                    }
                }
                for (var i = 0; i < childEles.length; i++) {
                    var snippetDetails = me.timeline.getTmData(childEles[i].id);
                    snippetDetails.sequence = i + 1;
                    tempData.push(snippetDetails);
                }

                ViTag.debug("Visap.edit:duration storing for timeline");
                var timelineduration = null;
                for (var i = 0; i < tempData.length; i++) {
                    timelineduration += tempData[i].data.duration;

                }
                ViTag.debug("Visap.edit:duration storing for timeline"+ timelineduration);
                var snippetIndex = 0;   //to store the first snippet snapshot for the timeline video.
                var timelinevideo = null,timelineinfo="";
                
                if (ViTag.editTimelineMode)  
                 {     
 					timelineinfo="Timeline.edit";                  
                    ViTag.debug("Visap.edit:setTimelineControls:Edting timeline video timeline video"+" "+ ViTag.editTmSrcdetials._id);                 
                    timelinevideo = { "_id": ViTag.editTmSrcdetials._id, "title": me.ctrl.$tmTitle.val(), "sourcetype": 2, "desc": me.ctrl.$tmDesc.val(), snap: tempData[snippetIndex].data.snap, "src": tempData, "videototalduration": Math.round(timelineduration),"category":[""] };
                    }
                else
                {
                    timelineinfo="Timeline.create";
                    ViTag.debug("Visap.edit:setTimelineControls:Creating timeline for the user"+localStorage.getItem('AppUser'));
                    timelinevideo = { "title": me.ctrl.$tmTitle.val(), "sourcetype": 2, "desc": me.ctrl.$tmDesc.val(), snap: tempData[snippetIndex].data.snap, "src": tempData, "videototalduration": Math.round(timelineduration),"category":[""] };
                 }


                ns.createTimeline(JSON.stringify([timelinevideo]), function () { internal.ShowMessage("Saving...", "Info", "Timeline.Saving"); },
                                                                   function () {
                                                                       internal.ShowMessage("Saved successfully", "Info", "Timeline.Saved");
                                                                       ns.loadData(ViTag.mode, localStorage.getItem('AppUser'));
                                                                       
                                                                       //to post data to GA
																	   analyticsObj.id=me.ctrl.$tmTitle.val();
													                   $(document).trigger("VisapLog",[ViTag.getUserInfo(),timelineinfo,analyticsObj]);
													                   
                                                                       $("#tmTitle").val("");
                                                                       $("#tmDesc").val("");
                                                                       $("#startcapture").html("");
                                                                       ViTag.isTimelIneMode = false;
                                                                       me.ctrl.$timelineContainer.animate({ opacity: 'hide' }, 1500);
                                                                   },
                                                                   function () { internal.ShowMessage("There was an error saving data", "Info", "Timeline.SavingError"); });

          };
        //create and edit timeline functionality ends.

//timeline cancel functinality starts

    ns.timeLineCancel=function(){
        ViTag.debug("Visap.edit:timeline cancel");
                var deleteConfirmation = confirm("Do you want to Cancel?");
                if (deleteConfirmation) {
                    ns.loadData(ViTag.mode, localStorage.getItem('AppUser'));
                    me.ctrl.$timelineContainer.animate({ opacity: 'hide' }, 'slow');
                    ViTag.isTimelIneMode = false;
                    $("#CaptureBtn").removeClass('endCapture').addClass('startCapture');
                    ns.clearTimer();
                }
    };
//timeline cancel functinality ends.


    //#endregion Public

    //#region Private

    var internal = {

        editTagTime: -1,
        editLink: false,
        editTagDesc: null,
        tagEdit: null,
        editAnnotation: null,
        editHotspotvalues: null,
        editWhiteboard: null,
        editSketchPausedTime: null,
        editSketchCreatedTime: "",
        userSrc: null,
        userSrcDetails: null,
        sketchDataWhiteboard: null,
        whiteboardTextData: null,
        sketcherData: null,
        imager: null,
        pauseTime:null,
        vidPauseTm:null,
        renderAttrs: function () {
        ViTag.debug("Visap.edit:renderAttrs: Rendering the attributes");
            // TO DO: All methods are unnecessary calling in all attribute create/edit
            internal.PrintTagsToEdit();
            internal.PrintLinksToEdit();
            internal.PrintQuestionToEdit();
            internal.PrintPauseTime();
        },
        ShowMessage: function (msg, type, source) {          
            if (me.messageHandler)
                me.messageHandler(msg, type, source);
        },

        IsValid: function () {
            return ($.trim(me.ctrl.$tag.val()) != "");
        },
        
        //Converts string to int number.
       getNumber:function(value){
          return isNaN(parseInt(value)) ? 0 : parseInt(value, 10);//converting string to int number
       },
       
       getPausedTime:function(tooltype){
          if(internal.vidPauseTm!=null && tooltype!="questions" && ViTag.CurrentSrc().sourcetype!=ViTag.sourceTypeEnum.timeline)
          {
             ViTag.playAt(internal.vidPauseTm);//set seek bar to paused time.
             return internal.vidPauseTm;
          }   
          else
              return ViTag.getCurrentTime();
       },
       
         //Update seekbar 
         updateSeekbar:function(duration,id){
            
           //for youtube videototalduration should be subtract by 1.
            if(ViTag.CurrentSrc().sourcetype==ViTag.sourceTypeEnum.youtube)
               var vidDuration=ns.CurrentSrc().videototalduration-1;
            else
               vidDuration=ns.CurrentSrc().videototalduration;        
            
            if(internal.pauseTime==1)//get pause time.
               internal.vidPauseTm=internal.getRoundOffValue(ViTag.getCurrentTime()); 
            
            if((internal.vidPauseTm+duration)>vidDuration)// Validate:duration should not exceed video duration.
               return internal.ShowMessage("Maximum duration is reached", "Validation", "Duration");

            ViTag.playAt(internal.vidPauseTm+duration);//set seek bar to paused time.
          
            $("#"+id).val(duration); //Assign duration.
            internal.pauseTime=-1;
        },   

        /// <summary>
        /////validates Url against Regex
        /// </summary>
        validateURL: function (urlToValidate) {
          ViTag.debug("Visap.edit:validateURL: URL check:"+urlToValidate);
            var myRegExp =/(ftp|http|https):\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            if (!myRegExp.test(urlToValidate)) {
                return false;
            } else {

                return true;
            }
        },
         /// <summary>
        /////validates video file name.
        /// </summary>
        validateVidName:function(vidname)
        {                         
          var specialChars = "#%&*+|\:<>?'\"\\";
          for(i = 0; i < specialChars.length;i++){
          if(vidname.indexOf(specialChars[i]) > -1){
            return true
          }
        }
            return false;
        },
        
        /// <summary>
        /////validates the value against regular expression
        /// </summary>

        validateString: function (val) {
         ViTag.debug("Visap.edit:validateString: validates string:"+val);
            var pattern = /^(.*?[a-zA-Z0-9].*)$/;
            if ((!val.match(pattern))) {
                return false;
            }
            else
                return true;
        },
        getRoundOffValue: function (seconds) {
            var flvalue = Math.floor(seconds);
            ViTag.debug("Visap.edit:getRoundOffValue:"+flvalue);
            return flvalue;
        },

        // Video attribute print to Edit -Start-
        /// <summary>
        ///Pausetime of all actions
        /// </summary>
        PrintPauseTime: function (issavePauseTime) { //issavePauseTime is to avoid sorting of pause time while editing the pausetime.
            if ($.isFunction(me.ctrl.$allActions)) {
                me.ctrl.$allActions(ns.CurrentSrc().actions, issavePauseTime);
            }
        },
        /// <summary>
        ///Taglist in Edit Mode
        /// </summary>
        PrintTagsToEdit: function () {
          ViTag.debug("Visap.edit:PrintTagsToEdit:Listing tags of current video source");
            if ($.isFunction(me.ctrl.$tagList)) {
                me.ctrl.$tagList();

            }
        },
        /// <summary>
        ///Linkslist in Edit Mode
        /// </summary>
        PrintLinksToEdit: function () {
         ViTag.debug("Visap.edit:PrintLinksToEdit:Listing links of current video source");
            if ($.isFunction(me.ctrl.$LinkList)) {
                me.ctrl.$LinkList();
            }
        },

        /// <summary>
        ///List all question in edit mode
        /// </summary>

        PrintQuestionToEdit: function () {
          ViTag.debug("Visap.edit:PrintQuestionToEdit:Listing all questions of current video source");
            
            me.ctrl.$dtTagList.html("");
            if (ns.CurrentTags()) {
                ns.CurrentTags().forEach(function (tag) {
                    me.ctrl.$dtTagList.append("<option value='" + unescape(tag.d) + "'>");
                });
            }
        },
        // Video attribute print to Edit -End- 

        //Video attribute Update actions
        updateActionsList: function (type, time, pausedTime, actionObj, fnPreSend, fnSuccess, fnError) {
            ViTag.info("Visap.edit:updateActionsList:Editing action of type"+type);
            var Listactions = ns.getPausedAction(pausedTime);
            var editedAction = ns.getEditedListAction(type, Listactions, time);
            if (type == 'sketch'){
               ViTag.debug("Visap.edit:updateActionsList:Edit Sketch which is at the pause time "+pausedTime);
                editedAction.img = actionObj.i;
                editedAction.duration = actionObj.duration;
            }
           
            if (type == 'annotation') {
             ViTag.debug("Visap.edit:updateActionsList:Edit annotation which has tittle and description "+" "+actionObj.ti+","+actionObj.de);
                editedAction.title = actionObj.ti;
                editedAction.description = actionObj.de;
                editedAction.PauseOnShow = actionObj.PauseOnShow;
                editedAction.duration = actionObj.duration;
                editedAction.AnnotationAttributes.left = actionObj.AnnotationAttributes.left;
                editedAction.AnnotationAttributes.top = actionObj.AnnotationAttributes.top;
                editedAction.AnnotationAttributes.height = actionObj.AnnotationAttributes.height;
                editedAction.AnnotationAttributes.width = actionObj.AnnotationAttributes.width;
               
            }
            if (type == 'questions') {
             ViTag.debug("Visap.edit:updateActionsList:Edit questions which has tittle and description "+" "+ actionObj.q);
                editedAction.qtitle = actionObj.q;
                editedAction.options = actionObj.o;
                editedAction.qans = actionObj.a;
                editedAction.qtag = actionObj.r;
                editedAction.qtitle = actionObj.q;
                editedAction.duration = 2;
                
            }
            if (type == 'hotspot') {
            ViTag.debug("Visap.edit:updateActionsList:Edit hotspot which has tittle and description:"+" "+ actionObj.ti+","+actionObj.de);
                editedAction.title = actionObj.ti;
                editedAction.description = actionObj.de;
                editedAction.showOnpause = actionObj.showOnpause;
                editedAction.duration = actionObj.duration;
                editedAction.hotspotAttributes.left = actionObj.hotspotAttributes.left;
                editedAction.hotspotAttributes.top = actionObj.hotspotAttributes.top;
                
            }
            if (type == 'whiteboard') {
             ViTag.debug("Visap.edit:updateActionsList:Edit whiteboard which has description:"+" "+ actionObj.description);
                editedAction.description = actionObj.description;
                editedAction.whiteboardPosition = actionObj.whiteboardPosition;
                editedAction.sketchData = actionObj.sketchData;
                editedAction.PauseOnShow = actionObj.PauseOnShow;
                editedAction.duration = actionObj.duration;
                editedAction.whiteboardAttributes.width = actionObj.whiteboardAttributes.width;
                
            }
            me.SaveTags(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError, "update");
            ns.handleSeekBar();
            return;
        },

        // Video attribute Remove -Start-
        /// <summary>
        ///Removes the tag based on desc
        /// </summary>
        /// <param name="d">desc of tag</param>
        /// <param name="fnPreSend">function to be executed before sending ajax request</param>
        /// <param name="fnSuccess">function to be executed on success of ajax request</param>
        /// <param name="fnError">function to be executed if there is an error in ajax request</param>
        RemoveTag: function (d, fnPreSend, fnSuccess, fnError) {
          ViTag.debug("Visap.edit:RemoveTag: Editing the tag saving for the desc"+d);
          var flag=internal.deleteTag(d);               //flag value is true if the tag is deleted, if it is false it will be mapped to question.
          if(flag){
               me.SaveTags(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
               ns.handleSeekBar();
          }
          return;
            
        },
        
        //to delete the tag and to check the tag is mapped to the question
        deleteTag:function(d){
              if (ns.CurrentTags()) {
                for (var i = 0; i < ns.CurrentTags().length; i++) {
                    if (ns.CurrentTags()[i].d == d) {
                        if (ns.CurrenQuestList() != undefined && ns.CurrenQuestList().length != 0) {
                            for (var j = 0; j < ns.CurrenQuestList().length; j++) {
                                if (ns.CurrenQuestList()[j].data.qtag == d) {
                                    internal.ShowMessage('This tag is mapped to question and can not be deleted and edited', "Validation", "Tags.Saving");
                                    ns.tagEdit = true;
                                    return false;
                                }
                            }
                        }
                        ns.CurrentTags().splice(i, 1);
                        return true;
                    }
                }
            }
        },
        /// <summary>
        ///Removes the actions based on time
        /// </summary>
        /// <param name="t">time matched against actions currenttime</param>
        /// <param name="fnPreSend">function to be executed before sending ajax request</param>
        /// <param name="fnSuccess">function to be executed on success of ajax request</param>
        /// <param name="fnError">function to be executed if there is an error in ajax request</param>
        RemoveActionList: function (t, fnPreSend, fnSuccess, fnError) {
           ViTag.debug("Visap.edit:RemoveActionList: Removing the actions"+t);
            var actions = ns.CurrentSrc().actions;
            if (actions.length > 0) {
                for (i = 0; i < actions.length; i++) {
                    if (actions[i].currentTime == t) {
                        actions.splice(i, 1);
                        me.SaveTags(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
                        ViTag.getSpecAction(t);
                        ns.handleSeekBar();
                        return;

                    }
                }
            }
        },

        /// <summary>
        ///Removes the list inside actions based on time
        /// </summary>
        /// <param name="t">time matched against elements starttime</param>
        /// <param name="pausedTime">pausedTime of the video</param>
        /// <param name="fnPreSend">function to be executed before sending ajax request</param>
        /// <param name="fnSuccess">function to be executed on success of ajax request</param>
        /// <param name="fnError">function to be executed if there is an error in ajax request</param>
        RemoveAction: function (time, pausedTime, fnPreSend, fnSuccess, fnError) {
          ViTag.debug("Visap.edit:RemoveAction: Removing the action"+time+","+pausedTime);
            var actions = ns.CurrentSrc().actions;
            var pauseTm = pausedTime;
            if (actions.length > 0) {
                for (var i = 0; i < actions.length; i++) {
                    for (var j = 0; j < actions[i].listAction.length; j++) {
                        if (pausedTime == actions[i].currentTime) {
                            if (time == actions[i].listAction[j].data.StartTime) {
                                actions[i].listAction.splice(j, 1);
                                if (actions[i].listAction.length > 0) {
                                    actions[i].currentTime = actions[i].listAction[0].data.StartTime;
                                    pauseTm = actions[i].listAction[0].data.StartTime;
                                }
                                me.SaveTags(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
                                ViTag.getSpecAction(pauseTm);
                                internal.PrintPauseTime();
                                ns.handleSeekBar();
                                return;
                            }
                        }
                    }
                }
            }
        },

        /// <summary>
        ///Removes the links from database
        /// </summary>
        /// <param name="n">link name</param>

        /// <param name="fnPreSend">function to be executed before sending ajax request</param>
        /// <param name="fnSuccess">function to be executed on success of ajax request</param>
        /// <param name="fnError">function to be executed if there is an error in ajax request</param>
        RemoveLink: function (n, fnPreSend, fnSuccess, fnError) {
         ViTag.debug("Visap.edit:RemoveLink: Removing the link"+n);
           var flag=internal.deleteLink(n);               //flag value is true if the link is deleted.
          if(flag){
               me.SaveTags(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
               ns.handleSeekBar();
          }
          return;
        },
        //to delete the link from the currentLinks
        deleteLink:function(n){
           var links = ns.CurrentLinks();
           if (links) {
            ViTag.debug("Visap.edit:RemoveLink: Removing the link"+links.length);
                for (var i = 0; i < links.length; i++) {
                    if (unescape(links[i].n) == unescape(n)) {
                        links.splice(i, 1);
                        return true;
                    }
                }
            }
        },
        
        getRemainingDuration: function () {
            var restduration = 0, totalduration = 0;
            totalduration = internal.getRoundOffValue(ns.getDuration());
            //restduration = totalduration - ns.getCurrentTime();
            var listactions = ns.getPausedAction(internal.getRoundOffValue(ns.getCurrentTime()));
             ViTag.debug("Visap.edit:getRemainingDuration:total duration of the video and listactions"+totalduration+","+listactions);
            if (listactions != undefined && listactions.length != 0) {
                var length = listactions.length;
                var lastStartTime = listactions[length - 1].data.StartTime;
                var listDuration = listactions[length - 1].data.duration;
                restduration = totalduration - (lastStartTime + listDuration);
                ViTag.debug("Visap.edit:getRemainingDuration:rest duration of the video"+restduration);
            }
            else
                restduration = totalduration - (internal.getRoundOffValue(ns.getCurrentTime()));
                ViTag.debug("Visap.edit:getRemainingDuration:rest duration and roundOffValue of the video"+restduration+","+internal.getRoundOffValue(ns.getCurrentTime()));
                return internal.getRoundOffValue(restduration);
        },
        
    //Get remaining duration of the video while editing actions.
    remainingVidDuration:function(startTime,editedDuration,type)
    {
       try
       {
          var vidDuration=0; var remainingDuration=0; var rduration=true;
          vidDuration = internal.getRoundOffValue(ns.getDuration());
          remainingDuration = vidDuration - startTime;
          ViTag.debug("Visap.edit:remainingVidDuration:calculating remaining duration of the video"+type+","+startTime+","+editedDuration+","+vidDuration+","+remainingDuration);
          if(remainingDuration < editedDuration){
             internal.ShowMessage("Duration for this action should be less than'" + ns.getTimeFormat(remainingDuration + 1) + "' secs", "Validation", "Action."+type+".Saving");
             rduration=false;
          }
          return rduration;
       }
       catch(err)
       {
         ViTag.error("visap.edit:remainingVidDuration:Error while getting remaining duration"+type+","+err);
       }
    },
    
       // create default question
        createDefaultQuestion : function(){
                    var q = me.question.getQues(ns.question.PTime), id = null, actionLength, listLength, qtype, qid, edit = false;
                    var type = "questions",

                     qt = ns.editor.getValue(qTitle) /* me.ctrl.$qTitle.val() */, o = [],
                     // ViTag.debug("visap.edit:setControls:To get the selected correct options index"+q+","+qt);
                   
                    a = $("input[type='radio'][name='optGroup']:checked").index("input[type='radio'][name='optGroup']") + 1,
                    // Question show start time
                    st = q ? q.st : ns.getCurrentTime(),
                    // To get tag title if answer is wrong
                    r = me.ctrl.$tagTitle.val();
                    r = (r == "" ? null : r);

                    // Getting all options into array
                    $("input[type='text'][name='optGroup']").each(function () {
                        o.push($(this).val());
                    });

                    var newQues = { q: qt, o: o, a: a, st: st, r: r }, 
                    msg = me.question.validateEntry(newQues);

                    if (msg) { internal.ShowMessage(msg, "Validation", "Action.questions.Saving"); return false; }
                    else {
                    ViTag.debug("visap.edit:setControls:In case of question edit previous question will get delete and new question will be added with same ID");
                        
                        if (ns.question.PTime) {
                            //ns.question.remove(id);
                            edit = true;
                        }
                        // Saving question
                        if (!edit)
                            ns.question.add(newQues, function () { internal.ShowMessage("Saving...", "Info", "Action.questions.Saving"); },
                                                     function () { me.ctrl.$tag.val(''); internal.ShowMessage("Saved successfully", "Info", "Action.questions.Saved"); internal.renderAttrs(); 
                                                     		       //to post data to GA
                                                     		       ns.postData(type,"createDefaultquestion");
																	                                                     
                                                     },
                                                     function () { internal.ShowMessage("There was an error saving data", "Info", "Action.questions.SavingError"); });
                        else {
                            //ns.updateQuestions(ns.question.STime, ns.question.PTime, newQues);
                            ns.updateActionsList(type, ns.question.STime, ns.question.PTime, newQues);
                            ns.question.PTime = null;
                        }
                        me.question.clearEntries();
                        ViTag.initTest();

                         if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
                    }
        }

    }

    var me = {

        ctrl: {}, dataService: "data.do", messageHandler: null,
        //default values
        defaults: {
            player: "vid1",
            tag: "txtTag",
            tagTime: "TagTime",
            saveTag: "btn",
            btnCancel: "btnCancel",

            cmtTitle: "cmtTitle",
            cmtDuration: "cmtDuration",
            annotatePauseOnShow:"annotatePauseOnShow",
            sketchDuration: "sketchDuration",
            cmtDesc: "cmtDesc",
            cmtSave: "cmtSave",
            cmtCancel: "cmtCancel",

            hotspotsave: 'hotspotsave',
            hotspotcanel: 'hotspotcanel',
            hotspotTittle: 'hotspotTittle',
            hotspotDuration: 'hotspotDuration',
            hotspotOnpause: 'hotspotOnpause',
            hotspotContent: 'hotspotContent',
            msgNotify: 'msgNotify',

            whiteboardsave: 'whiteboardsave',
            whiteboardDuration: "whiteboardDuration",
            wboardContainer: "wboardContainer",
            whiteboardPauseOnShow: "whiteboardPauseOnShow",
            whiteboardCancel: "whiteboardCancel",
            cmtWiteboard: "cmtWiteboard",
            WbimgOverlay: "WbimgOverlay",
            whiteBoardWrapper: "whiteBoardWrapper",
            wbdragbar: "wbdragbar",
            sketchcontainerWB: "sketchcontainerWB",
            textcontainerWB: "textcontainerWB",
            wbtext: "wbtext",
            wbsketch: "wbsketch",
            wbLeftPos: "wbLeftPos",
            wbRightPos:"wbRightPos",
            sketchConatainer: "sketch",
            textcontent: "textcontent",
            canvascontainerWB: "canvascontainerWB",
            sketchContainerUI: "sketchContainerUI",
            skecthDurationUI:"skecthDurationUI",
            whiteboardSaveCancel: "whiteboardSaveCancel",

            linkName: "linkName",
            linkUrl: "linkUrl",
            saveLink: "saveLink",
            cnlLink: "cnlLink",

            overlayList: "overlayList",
            annotateList: "annotateList",
            savedActions: "savedActions",
            allActions: "allActions",

            message: "message",
            editContainer: "editContainer",
            canvas: "canvas1",
            imageTemp: "imageTemp",
            videoMainContainer: "videoMainContainer",
            annotations: "annotates",

            imgOverlay: "imgOverlay",
            saveOverlay: "saveOverlay",
            cancelOverlay: "cancelOverlay",
            clear: "clear",
            sketchcontainerDefault: "sketchcontainerDefault",

            quesOptions: "divOptions",
            qTitle: "qTitle",
            saveQues: "saveQues",
            tagTitle: "tagTitle",
            cancelQues: "cancelQues",
            tblQuestions: "tblQuestions",
            dtTagList: "dtTagList",

            dataPath: "data/data.js",
            savePath: "data/data.js",

            dropdownSelect: "drop",
            dropdownAnnotate: "annotate",
            dropdownSketch: "sketch",
            dropdownQuestion: "questions",
            dropdownHotSpot: "hotspot",
            dropdownwhiteboard: "whiteboard",
            tagList: 'tagList',
            LinkList: 'LinkList',
            timelineSaveBtn: 'timelineSaveBtn',
            timelineCancelBtn: 'timelineCancelBtn',
            CaptureBtn: 'CaptureBtn',
            tmTitle: 'tmTitle',
            tmDesc: 'tmDesc',
            fileTitle: 'fileTitle',
            fileDesc: 'fileDesc',
            fileCategory: 'fileCategory',
            lblWrgMsg: 'lblWrgMsg',
            chkYTvideo: 'chkYTvideo',
            chkVideoUrl: 'chkVideoUrl',
            vidFile: 'vidFile',
            txtYTvideo: 'txtYTvideo',
            VideoUrl: 'VideoUrl',
            timelineContainer: 'timelineContainer',
            tagtimediv: 'tagtimediv',
            vidDuration: 'vidDuration'
        },

        /// <summary>
        ///Read values and assign to jquery reference
        /// </summary>
        readControls: function () {
              ViTag.debug("Visap.edit:readControls: Reading default controls");
            me.ctrl.$video = $("#" + me.defaults.player);
            me.ctrl.video = me.ctrl.$video[0];

            me.ctrl.$tag = $("#" + me.defaults.tag);
            me.ctrl.$tagTime = $("#" + me.defaults.tagTime);
            me.ctrl.$tagtimediv = $("#" + me.defaults.tagtimediv);
            me.ctrl.$saveTag = $("#" + me.defaults.saveTag);
            me.ctrl.$btnCancel = $("#" + me.defaults.btnCancel);
            me.ctrl.$timelineSaveBtn = $("#" + me.defaults.timelineSaveBtn);
            me.ctrl.$timelineCancelBtn = $("#" + me.defaults.timelineCancelBtn);
            me.ctrl.$timelineContainer = $("#" + me.defaults.timelineContainer);
            me.ctrl.$CaptureBtn = $("#" + me.defaults.CaptureBtn);
            me.ctrl.$tmTitle = $("#" + me.defaults.tmTitle);
            me.ctrl.$tmDesc = $("#" + me.defaults.tmDesc);
            me.ctrl.$fileTitle = $("#" + me.defaults.fileTitle);
            me.ctrl.$fileDesc = $("#" + me.defaults.fileDesc);
            me.ctrl.$fileCategory = $("#" + me.defaults.fileCategory);
            me.ctrl.$lblWrgMsg = $("#" + me.defaults.lblWrgMsg);
            me.ctrl.$chkYTvideo = $("#" + me.defaults.chkYTvideo);
            me.ctrl.$chkVideoUrl = $("#" + me.defaults.chkVideoUrl);
            me.ctrl.$vidFile = $("#" + me.defaults.vidFile);
            me.ctrl.$txtYTvideo = $("#" + me.defaults.txtYTvideo);
            me.ctrl.$VideoUrl = $("#" + me.defaults.VideoUrl);
            me.ctrl.$vidDuration = $("#" + me.defaults.vidDuration);

            me.ctrl.$cmtTitle = $("#" + me.defaults.cmtTitle);
            me.ctrl.$cmtDuration = $("#" + me.defaults.cmtDuration);
            me.ctrl.$annotatePauseOnShow = $("#" + me.defaults.annotatePauseOnShow);
            me.ctrl.$cmtDesc = $("#" + me.defaults.cmtDesc);
            me.ctrl.$cmtSave = $("#" + me.defaults.cmtSave);
            me.ctrl.$cmtCancel = $("#" + me.defaults.cmtCancel);
            me.ctrl.$sketchDuration = $("#" + me.defaults.sketchDuration);

            me.ctrl.$cmtDesc = $("#" + me.defaults.cmtDesc);
            me.ctrl.$hotspotsave = $("#" + me.defaults.hotspotsave);
            me.ctrl.$hotspotcanel = $("#" + me.defaults.hotspotcanel);
            me.ctrl.$hotspotTittle = $("#" + me.defaults.hotspotTittle);
            me.ctrl.$hotspotDuration = $("#" + me.defaults.hotspotDuration);
            me.ctrl.$hotspotContent = $("#" + me.defaults.hotspotContent);
            me.ctrl.$hotspotOnpause = $("#" + me.defaults.hotspotOnpause);
            me.ctrl.$hotspotCircle = $("#" + me.defaults.hotspotCircle);

            me.ctrl.$whiteboardsave = $("#" + me.defaults.whiteboardsave);
            me.ctrl.$whiteboardDuration = $("#" + me.defaults.whiteboardDuration);
            me.ctrl.$wboardContainer = $("#" + me.defaults.wboardContainer);
            me.ctrl.$whiteboardPauseOnShow = $("#" + me.defaults.whiteboardPauseOnShow);
            me.ctrl.$textcontainerWB = $("#" + me.defaults.textcontainerWB);

            me.ctrl.$whiteboardCancel = $("#" + me.defaults.whiteboardCancel);
            me.ctrl.$cmtWiteboard = $("#" + me.defaults.cmtWiteboard);
            me.ctrl.$whiteBoardWrapper = $("#" + me.defaults.whiteBoardWrapper);
            me.ctrl.$WbimgOverlay = $("#" + me.defaults.WbimgOverlay);
            me.ctrl.$wbdragbar = $("#" + me.defaults.wbdragbar);
            me.ctrl.$sketchcontainerWB = $("#" + me.defaults.sketchcontainerWB);
            me.ctrl.$wbtext = $("#" + me.defaults.wbtext);
            me.ctrl.$wbsketch = $("#" + me.defaults.wbsketch);
            me.ctrl.$wbLeftPos = $("#" + me.defaults.wbLeftPos);
            me.ctrl.$wbRightPos = $("#" + me.defaults.wbRightPos);
            me.ctrl.$sketchConatainer = $("#" + me.defaults.sketchConatainer);
            me.ctrl.$textcontent = $("#" + me.defaults.textcontent);
            me.ctrl.$canvascontainerWB = $("#" + me.defaults.canvascontainerWB);
            me.ctrl.$sketchcontainerDefault = $("#" + me.defaults.sketchcontainerDefault);
            me.ctrl.$sketchContainerUI = $("#" + me.defaults.sketchContainerUI);
            me.ctrl.$skecthDurationUI = $("#" + me.defaults.skecthDurationUI);
            me.ctrl.$whiteboardSaveCancel = $("#" + me.defaults.whiteboardSaveCancel);

            me.ctrl.$linkName = $("#" + me.defaults.linkName);
            me.ctrl.$linkUrl = $("#" + me.defaults.linkUrl);
            me.ctrl.$saveLink = $("#" + me.defaults.saveLink);
            me.ctrl.$cnlLink = $("#" + me.defaults.cnlLink);
            me.ctrl.$tagList = $.isFunction(me.defaults.tagList) ? me.defaults.tagList : $("#" + me.defaults.tagList);
            me.ctrl.$LinkList = $.isFunction(me.defaults.LinkList) ? me.defaults.LinkList : $("#" + me.defaults.LinkList);

            me.ctrl.$overlayList = $("#" + me.defaults.overlayList);
            me.ctrl.$annotateList = $("#" + me.defaults.annotateList);

            me.ctrl.$savedActions = $.isFunction(me.defaults.savedActions) ? me.defaults.savedActions : $("#" + me.defaults.savedActions);
            me.ctrl.$allActions = $.isFunction(me.defaults.allActions) ? me.defaults.allActions : $("#" + me.defaults.allActions);

            me.ctrl.$message = $("#" + me.defaults.message);
            me.ctrl.$annotations = $("#" + me.defaults.annotations);
            me.ctrl.$editContainer = $("#" + me.defaults.editContainer);
            me.ctrl.$canvas = $("#" + me.defaults.canvas);
            me.ctrl.$imageTemp = $("#" + me.defaults.imageTemp);
            me.ctrl.$videoMainContainer = $("#" + me.defaults.videoMainContainer);
            me.ctrl.$imgOverlay = $("#" + me.defaults.imgOverlay);
            me.ctrl.$canvas = $("#canvas1");
            me.ctrl.canvas = me.ctrl.$canvas[0];

            me.ctrl.$saveOverlay = $("#" + me.defaults.saveOverlay);
            me.ctrl.$cancelOverlay = $("#" + me.defaults.cancelOverlay);
            me.ctrl.$clear = $("#" + me.defaults.clear);

            me.ctrl.$quesOptions = $("#" + me.defaults.quesOptions);
            me.ctrl.$qTitle = $("#" + me.defaults.qTitle);
            me.ctrl.$saveQues = $("#" + me.defaults.saveQues);
            me.ctrl.$tagTitle = $("#" + me.defaults.tagTitle);
            me.ctrl.$cancelQues = $("#" + me.defaults.cancelQues);
            me.ctrl.$tblQuestions = $("#" + me.defaults.tblQuestions);
            me.ctrl.$dtTagList = $("#" + me.defaults.dtTagList);
            me.ctrl.$dropdownSelect = $("#" + me.defaults.dropdownSelect);
            me.ctrl.$dropdownAnnotate = $("#" + me.defaults.dropdownAnnotate);
            me.ctrl.$dropdownSketch = $("#" + me.defaults.dropdownSketch);
            me.ctrl.$dropdownQuestion = $("#" + me.defaults.dropdownQuestion);
            me.ctrl.$dropdownHotSpot = $("#" + me.defaults.dropdownHotSpot);
            me.ctrl.$dropdownwhiteboard = $("#" + me.defaults.dropdownwhiteboard);
        },

        /// <summary>
        ///Set the control events for all actions
        /// </summary>
        setControlsEvent: function () {
            ViTag.debug("Visap.edit:setControlsEvent:Set the control events for all actions");
            me.setVideoControls();
            me.setTagControls();
            me.setOverlayControls();
            me.setLinkControls();
            me.setAnnotateControls();
            me.question.setControls();
            me.setTimelineControls();
            me.setHotspotControls();
            me.setWhiteboardControls();
            me.setWhiteboardDragEvents();
            me.clearTimers();
            me.resetAfterchange();
        },

        /// <summary>
        ///Set the timeline and its validations and creation of timeline data
        /// </summary>
        clearTimers: function () {
            $("body").on("clearTimer", function () { //when the  source changed in timeline,timer will clear.               
                ns.clearTimer();
            });
        },

        resetAfterchange: function () {
            $("body").on("resetAfterchange", function () {
                //when user create sketch's and don't save or cancel or change the seekbar,this method will clear the created sketch's .               
                ns.resetSketches();
                //ns.hideSketches();
               // ns.setDropdown();
                internal.vidPauseTm=null;
                ViTag.setPauseTm();
                //ns.RenderCurrentHotspot(null);
                //ns.RenderCurrentAnnotates(null);
                //ns.RenderCurrentWhiteboard(null);
            });
        },
        /// <summary>
        /// When user Delete sketches and canvas must be cleared and erases everything on screen
        /// <summary>
        clearSketch: function () {
            $("body").trigger("clearSketch");
        },
        setTimelineControls: function () {
            me.ctrl.$timelineSaveBtn.click(function () 
            {
                ns.timeLineSave();
            });
            /// <summary>
            ///Timeline cancel button click
            /// </summary>
            me.ctrl.$timelineCancelBtn.click(function () {
              ns.timeLineCancel();
            });
        },
        /// <summary>
        /// Play and pause  event binding  to video,yt onStateChange event binding
        /// </summary>


        setVideoControls: function () {
            me.ctrl.$video.bind("pause", ns.enableEditPanel).bind("play", ns.disabelEditPanel);
            // When a sketch is existed on the screen if the user pause the video at that time 
            // then user will get a confirmation message that sketch is existed.
            $("body").on("onYTinit", function (event) {
                setTimeout(function () {
                    // onStateChange event is the youtube player event, will raise when and change happened in the video
                    ns.yt.player.addEventListener("onStateChange", function (e) {
                        ns.yt.videoState = e.data;
                        switch (ns.yt.videoState) {
                            case YT.PlayerState.PLAYING:
                                // On play hidding the edit panel
                                ns.disabelEditPanel();
                                break;
                            case YT.PlayerState.PAUSED:
                                // On pause showing the edit panel
                                ns.enableEditPanel();
                                break;
                            default:
                                break;
                        }
                    });
                }, 300);
            });
        },

        /// <summary>
        ///Add and update functionality of the tags are set here along with validation
        /// </summary>

        setTagControls: function () {
            me.ctrl.$saveTag.click(function () {
               ns.SaveTagAction();
            });

            me.ctrl.$btnCancel.click(function () {
                ns.CancelTagAction();
            });
        },

        //to get the tag time in seconds
        getTagTimeInseconds: function (tagTime) {
         ViTag.debug("Visap.edit:getTagTimeInseconds:get tag time in seconds"+tagTime);
            var tagTimeArray = tagTime.split(":"), hrs = "00"; //if the video duration is less than an hour then hrs is 0.
            if (tagTimeArray.length == 3) return ViTag.getTimeInSeconds(tagTimeArray[0], tagTimeArray[1], tagTimeArray[2]);
            else return ViTag.getTimeInSeconds(hrs, tagTimeArray[0], tagTimeArray[1]);

        },
        //to reset the original value if tagtime is not valid.
        resetTagTime: function () {
            me.ctrl.$tagTime.val(ViTag.getTimeFormat(internal.editTagTime));
        },
        /// <summary>
        ///Add and update functionlity of the sketches are set here along with validation
        /// </summary>

        setOverlayControls: function () {
            me.ctrl.$saveOverlay.click(function (e) {
                e.preventDefault();
                ns.SaveSketchAction()
            });


            /// <summary>
            ///Cancel button wherein  canvas is hidden-praveen
            /// </summary>
            me.ctrl.$cancelOverlay.click(function (e) {
                e.preventDefault();
                ns.CancelSketchAction();
            });
        },


        /// <summary>
        ///Add and update functionlity of the links are set 
        ///here along with validation against regex
        /// </summary>

        setLinkControls: function () {
            me.ctrl.$saveLink.click(function () {
            
              ns.SaveLinkAction();
               
            });

            me.ctrl.$cnlLink.click(function () {
             
               ns.CancelLinkAction();
               
             
            });
        },

        /// <summary>
        ///Add and update functionlity of the whiteboard are set here 
        /// </summary>

        setWhiteboardControls: function () {
            me.ctrl.$whiteboardCancel.click(function () {
               ns.CancelWhiteboardAction();
            });

            me.ctrl.$whiteboardsave.click(function () {
            
            ns.SaveWhiteboardAction();
            
            });

            // switching between text or sketch of the whiteboard
            $("[name='switchwbAction']").change(function (e) {

                if (this.id == "wbtext") {

                    me.ctrl.$sketchConatainer.css("display", "none");
                    ViTag.DisplayingWhiteboard(); //Display's the whiteboard based on position.
                    me.ctrl.$sketchcontainerWB.css('display', 'none');
                    me.ctrl.$canvascontainerWB.hide();
                    me.ctrl.$textcontent.hide();

                }
                else {
                 ns.sketchDataDefault = null;// empty saved default data to avoid undo 
                    me.ctrl.$sketchcontainerWB.css('display', 'block');
                    me.ctrl.$sketchContainerUI.css("display", "block");
                    me.ctrl.$skecthDurationUI.css('display','none');
                    // to get sketcher related info like canvas
                    internal.sketcherData = ns.getSketcherDetails();
                    ViTag.debug("Visap.edit: Retrieve Sketch's which is saved  and Redraw the sketch in Edit mode."+internal.sketcherData);
                   
                    me.whiteboardData.sketchWhiteboard();
                     ViTag.debug("Visap.edit:Retrieve whiteboard Data which is saved,and which can be modified the data Edit mode.");
                    var editorsource = ViTag.editor.getValue(cmtWiteboard);
                    internal.whiteboardTextData = editorsource;
                    me.ctrl.$textcontent.show().css('z-index',"-1");
                    me.ctrl.$textcontent.html(ViTag.htmlDecode(editorsource));
                    me.ctrl.$canvascontainerWB.show();
                    ViTag.removeCKobjects();
                    me.ctrl.$sketchConatainer.css("display", "block");
                    me.whiteboardData.wbSketcherRedraw();
                    internal.sketcherData.css('display', 'block');
                    internal.sketcherData.addClass('canvasWB');

                }
            });
        },

        //  Dragging whiteboard functionlity. 
        setWhiteboardDragEvents: function () {
            //  getting radio button value to drag.            

            var wbdragbar = me.ctrl.$wbdragbar;
            var wbContainer = me.ctrl.$wboardContainer;
            var ParentObject = me.ctrl.$whiteBoardWrapper;
            var isResizing = false;
            var offsetRight;
            //To work dragging function on Iframe we are making iframe as true and dragging as false.
            wbdragbar.draggable({ draggable: false, iframeFix: true }).css('position', 'static');
            ViTag.debug("Visap.edit:setWhiteboardDragEvents:getting parent offset.left width and and parent width to drag right and leftout");
            
            var Parentwidth = ParentObject.offset().left + $(ParentObject).width();
            wbdragbar.on('mousedown', function (e) {
                isResizing = true;
                //internal.imager = ns.getImager();
            });

            $(document).on('mousemove', function (e) {
                var whiteboardPosition = $('input[name="wbSlide"]:checked').val();
                if (!isResizing){
                    return;
                }
                    ViTag.debug("Visap.edit:setWhiteboardDragEvents:depending on radio button(position), the width will be calculated.");
                
                if (whiteboardPosition == 'wbLeftPos' || whiteboardPosition == 'wbRightOutPos') {
                    offsetRight = (e.clientX - wbContainer.offset().left); // Left Dragging. 
                    wbContainer.css('width', offsetRight);
                    me.whiteboardData.wbSketcherRedraw();
                }
                else if (whiteboardPosition == 'wbRightPos') {
                    offsetRight = $(window).width() - (e.clientX + Parentwidth); // Right Dragging.                     
                    wbContainer.css('width', offsetRight);
                    me.whiteboardData.wbSketcherRedraw();
                }
                else if (whiteboardPosition == 'wbLeftOutPos') {
                    offsetRight = (Parentwidth - e.clientX); //Left-Out Dragging.   
                    wbContainer.css('width', offsetRight);
                    me.whiteboardData.wbSketcherRedraw();
                }
               ViTag.debug("Visap.edit:setWhiteboardDragEvents:while dragging, the width will be calculated."+offsetRight);
                var ckTopHeight = $(".cke_top").height();
                var ckbottomHeight = $(".cke_bottom").height();
                $(".cke_contents").height((wbContainer.height() - ckTopHeight - ckbottomHeight - 20) + "px");

                if (internal.sketcherData) {
                    me.whiteboardData.sketchWhiteboard();
                }


            });
            $(document).on('mouseup', function (e) { 
                ViTag.debug("Visap.edit:top resizing the whiteBoardWrapper");            
                isResizing = false;
                e.stopPropagation();
            });


        },

        /// <summary>
        ///Add and update functionlity of the annotations are set here 
        /// </summary>

        setAnnotateControls: function () {
            me.ctrl.$cmtCancel.click(function () {
                
                ns.CancelAnnotationAction();
            });


            /// <summary>
            ///Duration validation and annotation save to database
            /// </summary>
            me.ctrl.$cmtSave.click(function () {
            
                ns.SaveAnnotationAction();
             
               });
        },
        /// summary///
        /// Hotspot related stuffs starts here
        ///summary///
        setHotspotControls: function () {

            /// <summary>
            ///Hotspot  cancel functionality
            /// </summary>

            me.ctrl.$hotspotcanel.click(function () {
             ns.CancelHotspotAction();
            });
            /// <summary>
            ///Hotspot  Add,update and save to database
            /// </summary>
            me.ctrl.$hotspotsave.click(function () {
            
             ns.SaveHotspotAction();
               
               });
        },
        /// <summary>
        ///Add and update functionlity of the questions are set here
        /// </summary>

        question: {
            // Get question based on given ID 
            getQues: function (stime) {
                var oQues = null
                if (ns.CurrenQuestList())
                    oQues = $.grep(ns.CurrenQuestList(), function (e) { return e.data.StartTime == stime; })[0];
                return oQues ? oQues : null;
            },

            // To check the tag is exists in the list
            validateTag: function (d) {
            ViTag.debug("visap.edit:To check the tag is exists in the list"+d);
                var t = null;
                if (ns.CurrentTags())
                    var t = $.grep(ns.CurrentTags(), function (e) { return unescape(e.d) == d })[0];
                return t ? true : false;
            },

            changeRowStyle: function (row, html, index) {
                var bgColor = "#CCCCCC";

                if ((index % 2) == 1)
                    bgColor = "#EDF1ED";

                row.style.fontSize = "12px";
                row.style.fontWeight = "normal";
                row.style.backgroundColor = bgColor;
                row.style.color = "#152E42";
                row.cells[0].style.backgroundColor = bgColor;
            },

            /// <summary>
            ///Saving the questions with options creation and validation
            /// </summary>

            setControls: function () {
                me.ctrl.$saveQues.click(function () {
                
                 ns.SaveQuestionAction();
                 });

                /// <summary>
                ///Cancel the question clearies the Question realted elements
                /// </summary>
                me.ctrl.$cancelQues.click(function () {                   
                     
                  ns.CancelQuestionAction();
                });
            },
            
            

            /// <summary>
            ///Reset Question related elements
            /// </summary>
            clearEntries: function () {
            
               if(typeof qTitle === 'undefined')
               {
                   return;
               }
                // Clearing all entries after question saved.
                if (ns.editor.ckEditorAvailable() && ns.editor.ckEditorInstanceAvilable(qTitle))
                    CKEDITOR.instances.qTitle.setData("");
                else me.ctrl.$qTitle.val("");
                me.ctrl.$tagTitle.val("");
                $("#" + me.defaults.quesOptions + " span").each(function () {
                    ns.question.deleteOption($(this).find("img")[0]);
                });
                me.ctrl.$quesOptions.find("span:last").find("input[type='text']").val("");
                me.ctrl.$quesOptions.find("span:last").find("input[type='radio']")[0].checked = false;
                ns.question.editQuesID = null;
                me.ctrl.$saveQues.val("Save");
                internal.ShowMessage("");
            },


            /// <summary>
            ///Question validations
            /// </summary>
            /// <param name="oQues">oQues to be validated</param>
            /// <returns>aValidation message for a question</returns>
            validateEntry: function (oQues) {
                var pattern = "^[a-zA-Z0-9']+";
                var msg = null;
                if (oQues.q == "")
                    msg = "Question title should not be blank";
                //else if (oQues.r == "")
                //    msg = "Tag should not be blank";
                else if (!ns.editor.ckEditorAvailable()) {
                    if ((!oQues.q.match(pattern)))
                        msg = 'your input contained non supported characters';
                }
                else if (oQues.r != null && !me.question.validateTag(oQues.r))
                    msg = "Given tag does not exist";
                else if (oQues.o.length < 2)
                    msg = "Options should be more than one";
                else if ($.grep(oQues.o, function (o) { return o == "" })[0] == "")
                    msg = "None of the options should be blank";
                else if (oQues.a < 1)
                    msg = "Correct answer should be selected";

                return msg;
            }
        },

        exitEditMode: function () {
            me.ctrl.$editContainer.animate({ opacity: 'hide' }, 'slow');
            me.ctrl.video.play();
        },

        /// <summary>
        ///Save all actions including tags and links are saved to database 
        /// </summary>
        /// <param name="data">data to be saved</param>   
        /// <param name="fnPreSend">function to be executed before sending ajax request</param>
        /// <param name="fnSuccess">function to be executed on success of ajax request</param>
        /// <param name="fnError">function to be executed if there is an error in ajax request</param>
        SaveTags: function (data, fnPreSend, fnSuccess, fnError, value) {
        ViTag.debug("saving the users metedata for the username"+" "+localStorage.getItem('authT'));
            var userid = me.defaults.username, verb = "POST";
            var isStageValue = false;
            if(me.defaults.UserId == "stage")
            {
                isStageValue = true;
            }
            
            var request = $.ajax({
                url: ViTag.config.wsMetadataurl,
                type: "POST",
                async : false,
                headers: {isStage: isStageValue, 'X-Authorization': localStorage.getItem('authT')},
                data: { d: data },
                success: fnSuccess,
                //error: fnError,
                error: function (xhr, err) {
                ViTag.error("visap.edit:SaveTags:Error while calling metadata service"+err);
                    var title = xhr.responseText.substr(xhr.responseText.indexOf("<title>") + 7, xhr.responseText.indexOf("</title>"));
                    var msg = title.substr(0, title.indexOf("</title>"));
                    fnError(msg);
                },
                beforeSend: fnPreSend
            });

        },
        getSavePath: function () {
            var file = me.defaults.dataPath;
            if ((me.defaults.savePath != me.defaults.dataPath) && (me.defaults.savePath != ""))
                file = me.defaults.savePath;
            var userid = me.defaults.UserId;
            return (me.defaults.dataService ? me.defaults.dataService : me.dataService) + "?file=" + file;
        },
        /// <summary>
        ///Pushes the tag to currentsource
        /// </summary>
        /// <param name="tag">tag which needs to be pushed to currentsource</param>
        GetUpdatedSources: function (tag) {
            if (ns.CurrentTags() == null) ns.CurrentSrc().tags = [];
            ns.CurrentTags().push(tag);
            ns.CurrentTags().sort(function (a, b) { return a.t - b.t });
            return JSON.stringify([ns.CurrentSrc()])
        },
        /// <summary>
        ///Updates the overlay
        /// </summary>
        /// <param name="ol">overlay for which action has to be built</param>
        UpdateOverlay: function (ol) {
            var toolType = "sketch";
            var action = ns.getActionList(toolType, ol);
            return ns.getJsonString(action);
        },
        /// <summary>
        ///Adds the Annotation
        /// </summary>
        /// <param name="an">annotation object for which struture will be built</param>
        AddAnnotate: function (an) {
            var toolType = "annotation";
            var action = ns.getActionList(toolType, an);
            return ns.getJsonString(action);
        },
        /// <summary>
        ///Adds the Hotspot
        /// </summary>
        /// <param name="an">annotation object for which struture will be built</param>
        AddHotspot: function (hotspot) {
            var toolType = "hotspot";
            var action = ns.getActionList(toolType, hotspot);
            return ns.getJsonString(action);
        },

        /// <summary>
        ///Adds the whiteboard
        /// </summary>
        /// <param name="an">whiteboard object for which struture will be built</param>
        AddWhiteboard: function (whiteboard) {
            var toolType = "whiteboard";
            var action = ns.getActionList(toolType, whiteboard);
            return ns.getJsonString(action);
        },

        /// <summary>
        ///Duration Vlaidation
        /// </summary>
        /// <param name="inputduration">maximum duration of the video</param>
        Checkduration: function (inputduration, restduration) {
            if (restduration <= inputduration) {
                internal.ShowMessage("Duration for this action should be less than '" + ns.getTimeFormat(restduration) + "' secs", true);
                me.ctrl.$cmtDuration.val();
                return false;
            }
            else
                return true;
        },
        /// <summary>
        ///Adds the Links to source
        /// </summary>
        /// <param name="li">link to be added to source</param>
        //<return>source</return>
        AddLinks: function (li) {
            if (ns.CurrentSrc().links == null) ns.CurrentSrc().links = [];
            ns.CurrentSrc().links.push(li);
            ns.CurrentSrc().links.sort(function (a, b) { return a.t - b.t });
            return JSON.stringify([ns.CurrentSrc()])
        },
        /// <summary>
        ///Adds the question to source
        /// </summary>
        /// <param name="ques">ques to be added to source</param>
        //<return>source</return>
        AddQuestion: function (datavalue) {
            var toolType = "questions",ques,action;
            var sourcetype = ns.actionSourceType.nativequestion;
             ques = { qtitle: datavalue.q, options: datavalue.o, qans: datavalue.a, qtag: datavalue.r, duration: 2}
             action = ns.getActionList(toolType, ques,sourcetype);
             return ns.getJsonString(action);
        },
        /// <summary>
        ///Saves to database
        /// </summary>
        /// <param name="data">data to be saved</param>
        SaveTimeLine: function (data, fnPreSend, fnSuccess, fnError) {
        try
        {
            $.ajax({
                url: ViTag.config.wsvideourl,
                type: "POST",
                async: false,
                headers: { 'X-Authorization': localStorage.getItem('authT')},
                data: { data: data }, //username: localStorage.getItem('AppUser') },
                success: fnSuccess,
                error: fnError,
                beforeSend: fnPreSend
            });
            }catch(err)
            {
                ViTag.error("visap.edit:Error while saving timeline"+err);
            }
        },
        /// <summary>
        ///Delete video from database
        /// </summary>
        /// <param name="ID">unique ID</param>
        deleteVideo: function (ID, fnPreSend, fnSuccess, fnError) {
            if (ns.CurrentSrc()) { if (ns.CurrentSrc()._id == ID) { internal.ShowMessage("You cannot Delete the video which is in play or pause mode.", "Info", "Video.Deleting.AlertMsg"); return false; } }
           //The below line of code is to get the current title of the video which is deleting(this data is required to post the data)
           ns.currentVid=$.grep(ViTag.source, function (e) { return e._id == ID; })[0];
            var deleteConfirmation = confirm("Do you want to delete this video for sure?");
            if (deleteConfirmation) {
             ViTag.debug("visap.edit:deleteVideo:delete the video with id:"+ID);
                ns.calldelete(ID, fnPreSend, me.timeline.timeLineDeletemessage, fnError);
            }
        },
        /// <summary>
        ///Call to handler
        /// </summary>
        /// <param name="ID">unique ID</param>
        calldelete: function (ID, fnPreSend, fnSuccess, fnError) {
            $.ajax({
                url: ViTag.config.wsvideourl,
                type: "POST",
                headers: { 'X-HTTP-Method': 'DELETE' },
                data: { deleteID: ID },
                success: fnSuccess,
                error: function (err) {
                ViTag.error("visap.edit:calldelete:Error while deleting video"+err);
                    alert('Error in Deleting  data');
                }
            });
        },

        /// <summary>
        ///Publish namespace
        /// </summary>
        publish: {
            // publish the video details and save to DB
            savePublishVideo: function (data, fnPreSend, fnSuccess, fnError) {
                var authToken = localStorage.getItem('authT');
                var request = $.ajax({
                    url: ViTag.config.wsPublishVideourl,
                    type: "POST",
                    async: false,
                    headers: { 'X-Authorization': authToken },
                    data: { d: data}, //hard coded
                    success: fnSuccess,
                    error: fnError,
                    beforeSend: fnPreSend
                });
            },
            /// <summary>
            /// Fetches saged metadata of the perticular source which renders all its metadata
            /// </summary>
            /// <param name="Id">unique id</param> 
            /// <param name="dataObj">dataObj to be serached in for passed id</param> 
            getStageMetadata: function (dataObj, Id) {
                var source = null, obj = null;
                if (dataObj && dataObj != "") source = $.grep(dataObj, function (e) { return e._id == Id; })[0];
                    ViTag.debug("visap.edit:getStageMetadata:gets the collarabation metadata for the id:"+Id);
                if (source != null)
                    $.ajax({
                        url: ViTag.config.wsMetadataurl,
                        type: "POST",
                        async: false,
                        headers: {  isStage: true, 'X-Authorization': "stage" },
                        data: { ID: source._id },
                        success: function (data) {
                            data = data.replace(/\n/g, "");
                            obj = JSON.parse(eval(data));
                            if (obj[0] != undefined && source != undefined) {
                                //                        
                                if (obj[0].actions != undefined)
                                    source.actions = obj[0].actions;
                                else
                                    source.actions = [];

                                if (obj[0].tags != undefined)
                                    source.tags = obj[0].tags;
                                else
                                    source.tags = [];

                                if (obj[0].links != undefined)
                                    source.links = obj[0].links;
                                else
                                    source.links = [];
                            }

                        },
                        error: function (err) {
                          ViTag.error("visap.edit:getStageMetadata:Error while getting metadata"+err);
                            alert('Error in loading data');
                        }
                    });

                return source;
            },
            //Fetches user metadata of the perticular source which renders all its metadata
            getUserMetadata: function (Id) {
                var dataObj = me.publish.getUserData(); // To get user related stuffs once after publish to reflect 
                var source = null, obj = null;
                if (dataObj && dataObj != "") source = $.grep(dataObj, function (e) { return e.refId == Id; })[0]; //cross check with refId of already publish data
                 ViTag.debug("visap.edit:getUserMetadata:gets the myspace metadata for the id:"+Id);
                if (source != null)                
                    $.ajax({
                        url: ViTag.config.wsMetadataurl,
                        type: "POST",
                        async: false,
                        headers: { isStage: false, 'X-Authorization': localStorage.getItem('authT') },
                        data: { ID: source._id },
                        success: function (data) {
                            data = data.replace(/\n/g, "");
                            obj = JSON.parse(eval(data));
                            //If there is edited work and check for each actions are available
                            if (obj[0] != undefined && source != undefined) {

                                if (obj[0].actions != undefined)
                                    source.actions = obj[0].actions;
                                else
                                    source.actions = [];

                                if (obj[0].tags != undefined)
                                    source.tags = obj[0].tags;
                                else
                                    source.tags = [];

                                if (obj[0].links != undefined)
                                    source.links = obj[0].links;
                                else
                                    source.links = [];
                            }
                        },
                        error: function (err) {
                         ViTag.error("visap.edit:getUserMetadata:Error while getting metadata"+err);
                            alert('Error in loading data');
                        }
                    });

                return source;
            },
            /// <summary>
            ///  Compare staging data with the existing user data and replace to user data
            /// </summary>
            /// <param name="usrD">userdata</param> 
            /// <param name="staged">staged data</param> 
            extendAttrs: function (usrD, staged) {
            ViTag.debug("visap.edit:extendAttrs:Compare staging data with the existing user data and replace to user data");
                if (staged.tags) {
                    if (!usrD.tags) usrD.tags = [];
                    $.each(staged.tags, function () {
                        var tags = this;
                        $.each(usrD.tags, function (index) {
                            if (tags.t == this.t) {
                                usrD.tags.splice(index, 1);
                                return false;
                            }
                        });
                        usrD.tags.push(tags);
                    });
                    //usrD.tags.sort(function (a, b) { return a.t - b.t; });
                }
                if (staged.title) {                
                    usrD.title = staged.title;
                }
                if (staged.category != undefined) {
                    usrD.category = staged.category;
                }

                if (staged.desc) {
                    usrD.desc = staged.desc;
                }
                //While publishing looping through each action type(question,annotation,whiteboard..)
               if (staged.actions) {
                    if (!usrD.actions) usrD.actions = [];
                  
                    for (var i = 0; i < staged.actions.length; i++) { //Outer loop is to looping through all the staged actions
                       var isReplaceQuestData=true;
                        for (var j = 0; j < usrD.actions.length; j++) { //inner loop is to looping through all the user actions

                            if (staged.actions[i].currentTime == usrD.actions[j].currentTime) {
                               //here isReplaceQuestData is set false because,if this condtion is true then createQuestDataCopy method should not excecute.
                                isReplaceQuestData=false;    
                                me.publish.replaceQuestData(staged.actions[i].listAction,usrD.actions[j].listAction);
                            }
                       
                        }
                        if(isReplaceQuestData){
                            var subactionlist = staged.actions[i].listAction;
                             //While publishing the video, create new copy for the question with the new id.
                            me.publish.createQuestDataCopy(subactionlist);
                            //To insert the updated staged actions to the user actions.
                            usrD.actions.push(staged.actions[i]);}
                      
                        }
                    // usrD.actions.sort(function (a, b) { return a.currentTime - b.currentTime; });
                }
                if (staged.links) {
                    if (!usrD.links) usrD.links = [];
                    $.each(staged.links, function (i) {
                        var links = this;
                        $.each(usrD.links, function (index) {
                            if (links.n == this.n) {
                                usrD.links.splice(index, 1);
                                return false;
                            }
                        });
                        usrD.links.push(links);
                    });
                    // usrD.links.sort(function (a, b) { return a.n - b.n; });
                }
            },
             //while republishing, the published question data should be overwritten by stage questiondata
            replaceQuestData:function(stageListAction,usrDListAction)
            {
                for (var k = 0; k < stageListAction.length; k++) //Outer loop is to going through all the staged listaction
                     {
                        var isQuest=true;
                        for (var m = 0; m < usrDListAction.length; m++)  //inner loop is to going through all the user listaction
                         {
                             //checking both the listaction startime are similar.
                            if(stageListAction[k].data.StartTime==usrDListAction[m].data.StartTime)
                            { 
                                    //If both staged and user action type is question then overwrite the staged question data to the user data but it questionid should be same.
                                    if(stageListAction[k].type==ns.actionType.question && usrDListAction[m].type==ns.actionType.question){  isQuest=false;
                                    ns.aelib.overwriteQuestData(stageListAction[k].data.questionId,usrDListAction[m].data.questionId);
                                    } 
                                    //if staged action type is question and user action type is any other actin type then create new copy for the question with the new question id 
                                    else if(stageListAction[k].type==ns.actionType.question && usrDListAction[m].type!=ns.actionType.question){ isQuest=false;
                                          var subactionlist = stageListAction;
                                          usrDListAction.splice(m,1);
                                          me.publish.createQuestDataCopy(subactionlist);
                                          usrDListAction.push(stageListAction[k]);
                                    }
                                    else  usrDListAction.splice(m, 1);
                            }
                        }
                            if(isQuest){
                                var subactionlist = stageListAction[k];
                                //This will excecute only when the usrDListAction lenght is 0
                                  me.publish.updateQuestId(subactionlist);
                                  usrDListAction.push(subactionlist);
                            }
                            usrDListAction.sort(function (a, b) { return a.data.StartTime - b.data.StartTime; });
                    }
            },

            //To create new question data with the new id and replace the new with the older questionId
            createQuestDataCopy:function(subactionlist){
                //listAction contains n number of subaction so loop is required.
                  $.each(subactionlist, function (i) {
                  //To check the subactionlist type is of question and sourcetype is aelib then create new copy for the question with the new id.
                     me.publish.updateQuestId(subactionlist[i]);
                  });    
            },
            
            //new question id will be updated for user listaction.
            updateQuestId:function(subactionlist){
                     if(subactionlist.type == ns.actionType.question && subactionlist.sourcetype ==ns.actionSourceType.aelibquestion)
                                {
                                    //copyQuestion method will pass the question id to sevice and it will create new copy of that question and it will return new id.
                                    ns.aelib.copyQuestion(subactionlist.data.questionId,
                                    function(data){
                                        var questinfo = data.url.split("|");
                                        var questId = questinfo[0];
                                        subactionlist.data.questionId = questId;

                                      }
                                    );
                                }
            
            },
            /// <summary>
            /// Gets the users data
            /// </summary>
            getUserData: function () {
                internal.userSrcDetails = null;
                 ViTag.debug("visap.edit:getUserData:gets the video header details for myspace user having token:"+localStorage.getItem('authT'));
                 $.ajax({
                    url: ViTag.config.wsvideourl,
                    type: "POST",
                    async: false,
                    headers: { isStage: false, 'X-Authorization': localStorage.getItem('authT') },
                    success: function (data) {
                        data = data.replace(/\n/g, "");
                        internal.userSrcDetails = JSON.parse(eval(data));
                    },
                    error: function (err) {
                    ViTag.error("visap.edit:getUserData:Error while getting headerdata"+err);
                        alert('Error in loading data');
                    }
                });
                return internal.userSrcDetails;
            },
            MsgSaving: function () {
                internal.ShowMessage("Publishing...", "Info", "Publish.Publishing");
            },
            // While publish message to the user publish is completed
            MsgSaved: function () {
                internal.ShowMessage("copied to myspace successfully", "Info", "Publish.Published");
            },
            // While publish message to the user publish is failed
            MsgError: function (msg) {
                if (!msg)
                    msg = "There was an error saving data";

                internal.ShowMessage("<span class='redmsg'>Publish Failed:</span>" + msg, "Info", "Publish.PublishingError");
            }
        },

        // <summary>
        /// Update Namespace
        /// </summary>
        upload: {

            updatevalue: null,
            // Upload functionality of the Youtube videos are set here
            uploadYT: function () {
                var ytVideoID = me.ctrl.$txtYTvideo.val(), replaceVid = true; var ytduration = null;
                if (ytVideoID.trim() === '') {
                    internal.ShowMessage("Upload fails, Youtube video id not entered.", "Validation", "Upload.Saving");
                    return false;
                }

                //youtube id is taken from youtube  url
                var videoid = ytVideoID.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoid != null) {
                 ViTag.debug("Visap.edit:uploadYT:upload youtube with url:"+videoid);
                    ytVideoID = videoid[1];
                }
                var source=me.upload.getSource(ViTag.source, ytVideoID);
                if (source)
                    replaceVid = confirm("Video ID " + ytVideoID + " already exits in the repository do you want to replace it ?");


                if (replaceVid) {
                    me.upload.initYTplayer(ytVideoID,source);
                }
                ViTag.debug("Visap.edit:uploadYT:upload youtube with ID:"+ytVideoID);
            },
            // this method gets yt details like ytDuration 
            getYTdetails: function (ytVideoID,source) {
                var category = me.upload.getCategoryList();
                ns.tempPlayer.mute();
                setTimeout(function () {
                    ytduration = ns.tempPlayer.getDuration();                   
                    if(source)
                    {                    
                          ViTag.debug("visap.edit:uploadYT:getYTdetails:Replacing the video youtubevideoid ,tittle,description,duration,ID of the existing Video:"+ ytVideoID + ","+ me.ctrl.$fileTitle.val()+","+me.ctrl.$fileDesc.val()+","+Math.round(ytduration)+","+source._id);
                        me.upload.success({_id:source._id, title: me.ctrl.$fileTitle.val(), snap: "http://img.youtube.com/vi/" + ytVideoID + "/0.jpg", desc: me.ctrl.$fileDesc.val(), category: category, src: ytVideoID, videototalduration: Math.round(ytduration), yt: "true", sourcetype: 1 }, "true");
                    }else
                    {
                    ViTag.debug("visap.edit:uploadYT:getYTdetails:uploading new Youtube video with youtubevideoid ,tittle,description,duration:"+ ytVideoID + ","+ me.ctrl.$fileTitle.val()+","+me.ctrl.$fileDesc.val()+","+Math.round(ytduration));
                        me.upload.success({ title: me.ctrl.$fileTitle.val(), snap: "http://img.youtube.com/vi/" + ytVideoID + "/0.jpg", desc: me.ctrl.$fileDesc.val(), category: category, src: ytVideoID, videototalduration: Math.round(ytduration), yt: "true", sourcetype: 1 }, "true");
                    }
                    $('#tempIframe').remove();
                }, 500);
                internal.ShowMessage("Video uploaded successfully....", "Info", "UploadImage.Saved");
            },

            // get category list based on user input
            getCategoryList: function () {
                var categorytextBox = $.trim(me.ctrl.$fileCategory.val());
                if (categorytextBox != '') {
                    // Check if the category has comma separated values
                    if (categorytextBox.indexOf(',') != -1) {
                        //to avoid duplicate Category saving into database,check for space also
                        // category = categorytextBox.split(/,\s*/);
                        category = categorytextBox.split(/\s*,\s*/);

                        //loop category and trim each element

                        category = $.unique(category);
                        category = escape(category);

                    }
                    else {
                        category = [escape(categorytextBox)];
                    }
                } else
                    category = [categorytextBox];
               ViTag.debug("Visap.edit:getCategoryList:category/s of the uploaded video are:"+category);
                return category;
            },

            /// <summary>
            ///Initialise YT object to play YT video
            /// </summary>
            initYTplayer: function (videoID,source) {
             ViTag.debug("visap.edit:initYTplayer:Init of YT player "+videoID);
                $("body").append("<div id='tempIframe' class='hideEle'></div>");
                // Create temp youtube player with using YouTube iframe API, here YT is global object of YouTube iframe API
                ns.tempPlayer = new YT.Player("tempIframe", {
                    height: '390',
                    width: '640',
                    videoId: videoID,
                    playerVars: {
                        'autoplay': 1,
                        'controls': 0,
                        'rel': 0
                    },
                    events: {
                        'onReady': function (e) {
                            me.upload.getYTdetails(videoID,source);
                        }
                    }
                });
            },

            //upload videos by giving url(mp4,ogg,webm)
            uploadVideoByURL: function () {
                var videoURL = me.ctrl.$VideoUrl.val();
                if (videoURL.trim() === '') {
                    internal.ShowMessage("Upload fails, video URL is not entered.", "Validation", "Upload.Saving");
                    return false;
                }
                //validation for the valid URL.
                if (!internal.validateURL(videoURL)) {
                    internal.ShowMessage("Please enter valid Video URL", "Validation", "Upload.Saving");
                    return false;
                }
                 ViTag.debug("visap.edit:uploadVideoByURL:upload video url "+videoURL);
                if ((videoURL.toLowerCase().indexOf("mp4") < 0)) {  //validation for different types of url(mp4,ogg,webm)
                    if ((videoURL.toLowerCase().indexOf("ogg") < 0)) {
                        if ((videoURL.toLowerCase().indexOf("webm") < 0)) {
                            internal.ShowMessage("Upload fails, video URL supports only .MP4,.OGG,.WEBM.", "Validation", "Upload.Saving");
                            return false;
                        }
                    }
                };
                vid = document.createElement('video');
                vid.src = videoURL;
                //need to show uploading..message untill the video will upload successfully.
                internal.ShowMessage("Uploading........", "Info", "UploadImage.Saving"),
                //to get the directURL duration loademetadata event has been written(inside that saving to data to database).
                vid.addEventListener('loadedmetadata', function () {
                      var category = me.upload.getCategoryList();
                      ViTag.debug("visap.edit:uploadVideoByURL:upload directurl video with url,tittle and description as:"+videoURL+","+ me.ctrl.$fileTitle.val()+","+me.ctrl.$fileDesc.val());
                      me.upload.success({ title: me.ctrl.$fileTitle.val(), snap: ns.defaultImage, videototalduration: Math.round(vid.duration), desc: me.ctrl.$fileDesc.val(), category: category, src: videoURL, sourcetype: 3 }, "true");
                }, false);
                
                //This event will trigger when the url is not valid or url not found or it may also
                //trigger there are issues while downloading the metadata of the video.
               vid.addEventListener('error', function () {
                	me.upload.mediaError();
               });
               vid.onstalled = function() {
                    me.upload.mediaError();
               };
            },
            //To show the error message for directurl videos, if the video url is not valid mp4 url.
            mediaError:function(){
             		setTimeout(function () {
                	  internal.ShowMessage("Unable to Import video due to Incorrect URL/URL not Found. Please try to import with proper URL.", "Info", "UploadImage.Saving");
                     }, 2000);
                	 setTimeout(function () {
                         $("body").trigger("unblock");
                    }, 8000);
            },
            // <summary>
            //// Search returns based on sourcepassed
            /// </summary>
            /// <param name="s">source for search condition</param> 
            /// <param name="d">list to be serached in</param> 
            getSource: function (d, s) {
                var source = null;
                if (d && d != "") source = $.grep(d, function (e) { return e.src == s; })[0];
                return source;
            },
            // <summary>
            /// Video snapshot is captured while uploding video 
            /// </summary>
            /// <param name="f">file namef</param> 
            getVidSS: function (f) {
                var opt = me.upload.getCanVid(f);
                setTimeout(function () {
                    var w, h, cxt, vidID;

                    w = opt.vid.videoWidth;
                    h = opt.vid.videoHeight;
                    opt.can.width = w;
                    opt.can.height = h;

                    cxt = opt.can.getContext('2d');
                    cxt.fillRect(0, 0, w, h);
                    cxt.drawImage(opt.vid, 0, 0, w, h);
                  ViTag.debug("visap.edit:getVidSS:upload  the file to database having tittle and description"+me.ctrl.$fileTitle.val()+","+escape(me.ctrl.$fileDesc.val()));
                    var snapshot = opt.can.toDataURL();
                    var category = me.upload.getCategoryList();
                    me.upload.success({ title:me.ctrl.$fileTitle.val(), snap: snapshot, videototalduration: Math.round(opt.vid.duration), desc: escape(me.ctrl.$fileDesc.val()), category: category, src: f, sourcetype: 0 }, "true");
                }, 1000);

            },
            // <summary>
            ///Accepts file name as parameter and returns required snapshot attibutes need to get snapshot of the video
            /// </summary>
            /// <param name="f">file namef</param> 
            getCanVid: function (f) {
                var can = document.createElement('canvas'),
                vid = document.createElement('video');
                file = me.ctrl.$vidFile[0].files[0];
                var fileURL = URL.createObjectURL(file);
                vid.src = fileURL;
                vid.addEventListener('loadedmetadata', function () {
                    vid.currentTime = 10;
                }, false);

                vid.muted = true;
                vid.autoplay = true;
                vid.crossOrigin = "anonymous";
                //vid.src = "../ViTagRepo/" + f;
                return { can: can, vid: vid };
            },
            // <summary>
            ///Posting data to DB once user successfully upload file to repository 
            /// </summary>
            /// <param name="opt">data  to be saved in database</param> 
            success: function (opt, isUpload, message) {  //isUpload is true only for the uploaded videos(because we are storing snapshot only for the uploaded videos)
            // ViTag.debug("visap.edit:success:upload:push record to database"+opt+","+isUpload+","+message);
               analyticsObj={};
                $.ajax({
                    url: ViTag.config.wsvideourl,
                    type: "POST",
                    headers: { 'X-Authorization': localStorage.getItem('authT') },
                    data: { d: JSON.stringify([opt]), key: me.upload.updatevalue, isStage: "true",  isUpload: isUpload },//key - can be removed - Code review - savitha
                    success: function () {
                         //To post data for video upload  
                         var type=ns.getsourceTypeName(opt.sourcetype);                         
                         analyticsObj.id = opt.title;                       
                         $(document).trigger("VisapLog",[ns.getUserInfo(),"import"+"."+type,analyticsObj]); 
                        
                        if (message != undefined)
                            internal.ShowMessage(message, "Info", "UploadImage.Saved")
                        else
                            internal.ShowMessage("Video uploaded successfully....", "Info", "UploadImage.Saved")

                        setTimeout(function () {
                            me.upload.closeBrowser();
                        }, 2000);

                    },
                    error: me.upload.error
                });
            },
            // Pop up is closed when upload fails
            error: function (err) {
                ViTag.error("visap.edit:video.do:Error while posting header video data"+err);
                internal.ShowMessage("There was error in uploading files!", "Info", "Upload.Saving.AlertMsg")
                me.upload.closeBrowser();
            },
            // Reload of the browser
            closeBrowser: function () {
                $.unblockUI();
                document.location.reload();
            },

            blockEle: function (opt) {
                $(opt.e).block(opt.msg);
                if (opt.bg)
                    $(".blockOverlay").addClass("blockOverlayTemp");
            }
        },

        whiteboardData: {
            //Dispalying whiteboard and dragbar by sliding based on radio button values
            SlidingWhiteboard: function (whiteboardDirection, description) {
             ViTag.debug("visap.edit:whiteboardData:SlidingWhiteboard:whiteboard text and sliding direction:"+whiteboardDirection+","+description);
                var videoContainerHeight = me.ctrl.$videoMainContainer.height(); //height of the video container.
                var selectedAction = $('input[name="switchwbAction"]:checked').val(); //getting text or skecth mode from radio button.
                // To Do: not to use canvas elements here
                if (whiteboardDirection == 'right') {
                    $('#sketcher').addClass('canvascontainerRight');
                    $('#imageTemp').addClass('canvascontainerRight');
                }
                else {
                    $('#sketcher').removeClass('canvascontainerRight');
                    $('#imageTemp').removeClass('canvascontainerRight');
                }
                
                me.ctrl.$wboardContainer.hide(0).delay(0).toggle('slide', { direction: whiteboardDirection }, 1000,
                         function () {
                             if (selectedAction == "wbtext")
                                 ViTag.editor.rePlaceCkeditor(cmtWiteboard); //to replace ckeditor on whiteboard
                             if (description) {
                                 ns.editor.setValue(cmtWiteboard, description);
                             }
                             me.whiteboardData.EnableRadioButton();
                         }
                        ).css({ 'height': videoContainerHeight });
                // set the size of the canvas elements if the direction changes 
                // redraw sketches of white board when direction changes
                me.whiteboardData.wbSketcherRedraw();
                // edit the sketch if exist
                me.whiteboardData.sketchWhiteboard();

            },
            // To show sketh when user slects edit button
            sketchWhiteboard: function () {

                if (ns.sketchDataWhiteboard) {
                     ns.updateSketches(ns.sketchDataWhiteboard);
                    // Not able to get on load of the image in canvas.js to draw image hence called here
                   // var sketcher = $('#sketcher')[0];
                    //var context = sketcher.getContext("2d");
                    //var image = new Image();
                    //image.onload = function () {
                      //  context.drawImage(image, 0, 0);
                    //};
                    //image.src = ns.sketchDataWhiteboard;

                }
            },
            wbSketcherRedraw: function () {
          
                 var height=ViTag.whiteboardTxtHeight();//hieght will be calculated depending on the height of text content.    
                ns.setSize(me.ctrl.$wboardContainer.width()-24,height);
                ns.getPrevSketches();

            },
            
            EnableRadioButton:function(){
            
              setTimeout(function(){ 
				 var selectedAction = $('input[name="switchwbAction"]:checked').val(); //getting text or skecth mode from radio button.
                 if(ns.editor.isCkeditorLoaded("cmtWiteboard") || selectedAction=='wbsketch'){
                   me.ctrl.$wbtext.removeAttr("disabled");
                   me.ctrl.$wbsketch.removeAttr("disabled");
                   me.ctrl.$wbLeftPos.removeAttr("disabled");
                   me.ctrl.$wbRightPos.removeAttr("disabled");
                 }  }, 1100);
            },
            DisableRadioButton:function(){
            
              me.ctrl.$wbtext.attr('disabled',true);
		      me.ctrl.$wbsketch.attr('disabled',true);
		      me.ctrl.$wbLeftPos.attr('disabled',true);
		      me.ctrl.$wbRightPos.attr('disabled',true);
            }
            
        },

        timeline: {
            sequence: 0,  //its used to identify the snippet of the timeline video from sequence number
            editsequence: 0, //to get the last sequence number while editing timeline video.
            timelineSrc: {},  //to store the captured video details(src details)

            capture: function (video, scaleFactor) {
                me.timeline.sequence++;
                 // ViTag.debug("visap.edit:capture:snapshot sequence number"+video+","+ me.timeline.sequence++);
                me.timeline.editsequence = me.timeline.sequence;
                if (ViTag.editTimelineMode) {
                    var temparray = [];
                    for (var i = 0; i < me.timeline.tmSrcBunch.length; i++) {
                        temparray.push(me.timeline.tmSrcBunch[i].sequence);
                    }
                    temparray.sort(function (a, b) { return a - b; });
                    me.timeline.editsequence = ++temparray[temparray.length - 1];
                }

                if (scaleFactor == null) {
                    scaleFactor = 1;
                }
                var w = video.videoWidth * scaleFactor;
                var h = video.videoHeight * scaleFactor;
                var div = document.createElement('div');
                var div1 = document.createElement('div');
                $(div).attr('class', 'tl');
                $(div).attr('id', me.timeline.editsequence);
                $(div1).attr('class', 'tl-video');
                div.appendChild(div1);
                var canvas = document.createElement('canvas');

                canvas.width = 60;
                canvas.height = 60;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 60, 60);
                var img = document.createElement('div');

                $(img).attr('class', 'deleteicon');
                $(img).attr('onClick', 'ViTag.deleteSnap(' + me.timeline.editsequence + ')');
                if(ViTag.CurrentSrc().sourcetype==ViTag.sourceTypeEnum.youtube){
                   var imgTag=me.timeline.createImgTag(ViTag.CurrentSrc().snap);
                   div1.appendChild(imgTag);
                }
                else
                div1.appendChild(canvas);

                //var br = document.createElement('br');
                //div.appendChild(br);
                var timeLabel=me.timeline.createDiv(me.timeline.editsequence);
                div.appendChild(timeLabel);
                div.appendChild(img);
                return div;
            },
            // <summary>
            /// Edit the Snapshot
            /// </summary>
            editSnapshots: function (tmSrcBunch) {
                $("#startcapture").html("");
                 ViTag.debug("visap.edit:editSnapshots:total snippets in the timeline video"+tmSrcBunch.length);
                
                for (var i = 0; i < tmSrcBunch.length; i++) {
                var imgTag;
                    var div = document.createElement('div');
                    var img = document.createElement('div');
                    $(img).attr('class', 'deleteicon');
                    $(img).attr('onClick', 'ViTag.deleteSnap(' + tmSrcBunch[i].sequence + ')');

                    $(div).attr('class', 'tl');
                    $(div).attr('id', tmSrcBunch[i].sequence);
                    var div1 = document.createElement('div');
                    $(div1).attr('class', 'tl-video');
                    if(tmSrcBunch[i].data.sourcetype==ViTag.sourceTypeEnum.youtube)
                       imgTag=me.timeline.createImgTag(tmSrcBunch[i].data.snap);
                    else  imgTag=me.timeline.createImgTag(ViTagUI.snapRepoPath+tmSrcBunch[i].data.snap);
                    
                    div1.appendChild(imgTag);   //appending delete image
                    div.appendChild(div1);      //append outer div to inner div
                    var timeLabel=me.timeline.createDiv(tmSrcBunch[i].sequence); //createDiv will create div and set class and id attributes.
                    div.appendChild(timeLabel);
                    div.appendChild(img);
                    startcapture.appendChild(div);
                    $('#starttimer' + tmSrcBunch[i].sequence).html(ViTag.getTimeFormat(tmSrcBunch[i].data.duration));
                }
            },
            // <summary>
            /// Returns the data matching the sequence
            /// </summary>
            ///<param>sequence to be matched </param>
            ///<return>Timeline sourcebunch</return>
            getTmData: function (sequence) {
                var SrcBunch = $.extend(true, [], me.timeline.tmSrcBunch);
                return SrcBunch ? $.grep(SrcBunch, function (e) { return e.sequence == sequence; })[0] : null;
            },
            createImgTag:function(src){
             ViTag.debug("Visap.edit:createImgTag:creating the image"+src);
               var img=document.createElement('img');
                $(img).attr('height', '60');
                $(img).attr('width', '60');
                $(img).attr('src',src);
                return img;
            },
            createDiv:function(sequence){
                var timelabel = document.createElement('div');
                $(timelabel).attr('id', 'starttimer' + sequence);
                $(timelabel).attr('class', 'tl-duration');
                return timelabel;

            },
            timeLinemessage: function () {
                internal.ShowMessage("Saved successfully", "Info", "Timeline.Saved");
                ns.loadData(ViTag.mode, localStorage.getItem('AppUser'));
                $("#tmTitle").val("");
                $("#tmDesc").val("");
                $("#startcapture").html("");
                ViTag.isTimelIneMode = false;
                me.ctrl.$timelineContainer.animate({ opacity: 'hide' }, 1500);

            },
            timeLineDeletemessage: function () {
              analyticsObj={};
             ViTag.debug("Visap.edit:timeLineDeletemessage:delete message for timeline the image");
                ns.loadData(ViTag.mode, localStorage.getItem('AppUser'));
                //To post the data to GA or tincan
                 analyticsObj.id=ns.currentVid.title
                 $(document).trigger("VisapLog",[ViTag.getUserInfo(),"videodelete"+"."+ns.getsourceTypeName(ns.currentVid.sourcetype),analyticsObj]);
                $("body").trigger("clearContainer");
            },
            getSnippetduration: function (sqense) {
                prevduration = 0, totalDuration = 0, currntDuration = 0;
                if (ns.CurrentTimelineSrc().src != undefined && ns.CurrentTimelineSrc().src.length > 0) {
                    for (var j = 0; j < ns.CurrentTimelineSrc().src.length; j++) {
                        totalDuration = totalDuration + ns.CurrentTimelineSrc().src[j].data.duration;
                        if (me.timeline.tmSrcBunch[j].sequence == sqense) {
                            currntDuration = ns.CurrentTimelineSrc().src[j].data.duration;
                            prevduration = totalDuration - currntDuration;

                            return { previous: prevduration, total: totalDuration, current: currntDuration };
                        }
                    }
                }
            },

            currentSnippetTags: function (seqense) {
                var totalvalues = me.timeline.getSnippetduration(seqense);
                for (i = 0; i < ns.CurrentSrc().tags.length; i++) {
                    var currntTag = ns.CurrentSrc().tags[i];
                    if (currntTag.t > totalvalues.previous && currntTag.t < totalvalues.total) {
                        var updatedvalue = me.timeline.updateAfterDragging(currntTag, seqense);
                        ns.CurrentSrc().tags[i].t = updatedvalue;
                    }
                }

            },
            nextSnippetTags: function (seqense) {
                var totalvalues = me.timeline.getSnippetduration(seqense);
                for (i = 0; i < ns.CurrentSrc().tags.length; i++) {
                    var currntTag = ns.CurrentSrc().tags[i];

                    if (currntTag.t > totalvalues.previous && currntTag.t < totalvalues.total) {
                        updatedvalue = me.timeline.addAfterDragging(currntTag, seqense);
                        ns.CurrentSrc().tags[i].t = updatedvalue;
                    }
                }

            },

            updateAfterdelete: function (tagdetails, sqense) {
                var totalvalues = me.timeline.getSnippetduration(sqense);
                var newvalue = tagdetails.t - totalvalues.current;
                return newvalue;

            },
            updateAfterDragging: function (tagdetails, sequnce) {
                var totalvalues = me.timeline.getSnippetduration(sequnce);
                var newvalue = tagdetails.t - totalvalues.previous;
                return newvalue;

            },
            addAfterDragging: function (tagdetails, sequnce) {
                var totalvalues = me.timeline.getSnippetduration(sequnce);
                var newvalue = tagdetails.t + totalvalues.current;
                return newvalue;

            },
            deleteSnippet: function (seqense) {
            ViTag.debug("visap.edit:deleteSnippet:delete the snippet which has the sequence"+seqense);
                var totalvalues = me.timeline.getSnippetduration(seqense);
                if (ns.CurrentTimelineSrc().tags != undefined && ns.CurrentTimelineSrc().tags.length > 0) {
                    for (i = 0; i < ns.CurrentTimelineSrc().tags.length; i++) {
                        var currntTag = ns.CurrentTimelineSrc().tags[i];
                        if (currntTag.t > totalvalues.previous && currntTag.t < totalvalues.total) {
                            ns.CurrentTimelineSrc().tags.splice(i, 1);
                            i--;
                        }
                        else {
                            if (currntTag.t > totalvalues.current) {
                                updatedvalue = me.timeline.updateAfterdelete(currntTag, seqense);
                                ns.CurrentTimelineSrc().tags[i].t = updatedvalue;
                            }
                        }
                    }
                }
                ns.RenderCurrentTags();
            }
            
        }
    }
    //save,edit timeline starts
    ns.getDivision = function (event, ui) {
        ns.divid = ui.item[0].id;

    }
    ns.updateDivision = function () {
        var index = 0;
        ns.tempSnapDetails = {};

        window.console.debug(ns.divid);
        var childEles = $("#startcapture").children();
        for (var i = 0; i < childEles.length; i++) {
            if (childEles[i].id == ns.divid) {
                index = i;
            }
        }
        for (var i = index + 1; i < childEles.length; i++) {
            me.timeline.nextSnippetTags(childEles[i].id);
        }
        me.timeline.currentSnippetTags(ns.divid);
    }

    ns.deleteSnap = function (sequence) {  
        ViTag.debug("visap.edit:deletesnap:sequence is the sequence number of snippet to delete"+sequence);
        var index = 0, duration = 0;

        for (var i = 0; i < me.timeline.tmSrcBunch.length; i++) {  //this to indentify the index of that sequence number
            if (me.timeline.tmSrcBunch[i].sequence == sequence)    //me.timeline.tmSrcBunch contains all the src details and sequence number for the timeline video.
                index = i;
        }

        var deleteConfirmation = confirm("Do you want to delete this snapshot?");
        if (deleteConfirmation) {
            me.timeline.deleteSnippet(sequence);
            if (me.timeline.tmSrcBunch.length <= 1) {
                internal.ShowMessage("Timeline video should contain atleast one video snippet.", "Info", "Timeline.Deleting.AlertMsg");
            } else {
                me.timeline.tmSrcBunch.splice(index, 1);
                ViTag.debug("visap.edit:deletesnap:this is to remove the snippet from the html");                //splice will delete one src details based on index
                $("#" + sequence).remove();                        
            }
        }
    }
    /// Timeline button validations and finction call to capture data
    ns.timeline = {
        scaleFactor: 0.25, startCaptTime: 0,
        captureVideoDetails: function () {
        try
        {
          ViTag.debug("visap.editTimeline button validations and finction call to capture data");
            ViTag.isTimelIneMode = true;
            if (ViTag.currentSrcTypeName == "timeline") {
                internal.ShowMessage("This video added to time line.Please choose different video to capture.", "Info", "Timeline.Saving.AlertMsg");
                return false;
            }
            if (!ViTag.paused() &&ViTag.paused() != undefined ) {
                me.ctrl.$CaptureBtn.removeClass('endCapture');
                startCap = me.ctrl.$CaptureBtn.attr('class');
                if (startCap == 'startCapture') {
                    ViTag.resetTimer();
                    ViTag.startTimer();
                    startCaptTime = ViTag.getCurrentTime();
                    me.ctrl.$CaptureBtn.removeClass('startCapture');
                    me.ctrl.$CaptureBtn.addClass('endCapture');
                }
                else {

                    endCaptTime = ViTag.getCurrentTime();
                    if (startCaptTime > endCaptTime) {
                        me.ctrl.$CaptureBtn.addClass('endCapture');
                        internal.ShowMessage("StartTime should be less than the Endtime of the video", "Info", "Timeline.Saving");
                        return false;
                    }
                    else {
                        capVidDuration = endCaptTime - startCaptTime;
                        var video = document.getElementById(PlayerId);
                        var output = $('#startcapture');
                        var canvas = me.timeline.capture(video, ns.timeline.scaleFactor);
                        startcapture.appendChild(canvas);
                        ViTag.clearTimer();
                        $('#starttimer' + me.timeline.editsequence).html(ViTag.getTimeFormat(capVidDuration));
                        me.ctrl.$CaptureBtn.removeClass('endCapture');
                        me.ctrl.$CaptureBtn.addClass('startCapture');
                        ViTag.debug("visap.edit:Timeline:building json data src for the timeline video.");
                       
                        var src = { sequence: me.timeline.editsequence, data: { srcTimeline: ViTag.CurrentSrc().src, sourcetype: ViTag.CurrentSrc().sourcetype, snap: ViTag.CurrentSrc().snap, startTime: Math.floor(startCaptTime), duration: Math.floor(capVidDuration)} };
                        me.timeline.tmSrcBunch.push(src);
                    }
                }
            }
            else {
                internal.ShowMessage("Please play video to start Timeline", "Info", "Timeline.Saving");
                ns.timelineMode = false;
            }
            
            }catch(err)
            {
                ViTag.error("visap.edit:Error while capturing data for timeline"+err);
            }
        }
    };
    // <summary>
    /// Edit Timeline
    /// </summary>
    ///<param="_id">unique ID</param>
    ns.editTimeLine = function (_id) {
    try
    {
        ViTag.isTimelIneMode = true;
        ViTag.debug("Visap.edit:editTimeLine:TimelineID which is getting  edited "+_id);
        ns.editTmSrcdetials = ViTag.getSource(_id);
        me.timeline.timelineSrc = ViTag.GetMetaData(ns.editTmSrcdetials);
        me.timeline.tmSrcBunch = $.extend(true, [], ns.editTmSrcdetials.src); //the extend method will remove the pointer reference.
        $("#editContainer").hide();
        $("#timelineContainer").show();
        ns.editTimelineMode = true;
        me.ctrl.$tmTitle.val(ns.editTmSrcdetials.title);
        me.ctrl.$tmDesc.val(ns.editTmSrcdetials.desc);
        me.timeline.editSnapshots(me.timeline.tmSrcBunch);
        }
        catch(err)
        {
           ViTag.error("visap.edit:editTimeLine:Error while editing the timeline functionality");
        }
    };

    ns.newTimeline = function () {
        me.timeline.tmSrcBunch = [];
    };

    ns.resetTimer = function () {
        sec = 0;
        min = 0;
        hrs = 0;
    };
    ns.clearTimer = function ()//To clear the the timeInterval
    {
        clearInterval(BeginTimer);
        BeginTimer = null;
        $('#starttimer').html('00:00:00');
    };
    var sec = 0, min = 0, hrs = 0, BeginTimer = null;
    ns.startTimer = function () {

        //var sec = 0, min = 0, hrs = 0, BeginTimer;

        BeginTimer = setInterval(function () {
            sec++;
            if (sec == 60) {
                sec = 0;
                min++;
            }
            if (min == 60) {
                min = 0;
                hrs++;
            }
            if (sec == 60 && min == 60) {
                sec = 0;
                min = 0;
                hrs++;
            }
            DisplayMinutes = (hrs < 10 ? '0' + hrs : hrs) + ":" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec);
            $('#starttimer').html(DisplayMinutes);
        }, 1000);

    };

    //to get timeline video details based on sequence number 

    //save,edit timeline end

    //#endregion Private


    //upload video related code starts
    // Upload functionality of the normal videos are set here
    ns.defaultImage = "defaultImage.png";  //defaultImage.png will store in directurl and timeline vidoes snapshot field
    ns.upload = function () {

        var videoTilte = me.ctrl.$fileTitle.val();
        if (me.ctrl.$fileTitle.val() == '' || me.ctrl.$fileDesc.val() == '') {
            internal.ShowMessage("Title,Description fields should not be blank.", "Validation", "Upload.Saving");
            return false;
        }
         //Restricting only special characters in the title by validating string method.
         if(!internal.validateString(videoTilte))
            {
               internal.ShowMessage("Title contained non supported characters.", "Validation", "Upload.Saving");
               return false;
            }
     
        var videoCategory = me.ctrl.$fileCategory.val();
        if (videoCategory != '') {
        ViTag.debug("visap.edit:upload:category added are"+videoCategory);
        
            if(!internal.validateString(videoCategory))
            {
               internal.ShowMessage("category contained non supported characters.", "Validation", "Upload.Saving");
               return false;
            }
        
            var isvalid = false;
            if (videoCategory.substring(0, 1) == " ") {
                isvalid = true;
            }

            if (videoCategory.indexOf(',') != -1) {
                category = videoCategory.split(',');
                $.each(category, function (index) {
                    if (category[index] == " " || category[index] == "") {
                        isvalid = true;
                    }
                });
            }

            if (isvalid) {
                internal.ShowMessage("Blank Space is not supported Category,Please enter valid Category", "Validation", "Upload.Saving");
                return false;
            }
        }
        
       
          
            if (ViTag.util.tittledesccheck()) {
                    internal.ShowMessage("Blank Space is not valid  Tittle/Desc", "Validation", "Upload.Saving");
                    return false;
            }                
    
            if (!(ViTag.util.tittleDuplicateCheck())) {
                internal.ShowMessage("Duplicate tittle, a video of same title already exists. Please use a different tittle", "Validation", "Upload.Saving");
                return false;
            }    
            
            
        if (me.ctrl.$chkYTvideo[0].checked) {
               ViTag.debug("visap.edit:upload:upload video of the type Youtube");
            me.upload.uploadYT();
            return false;
        }
        //To check video url checkbox is enabled or not.
        if (me.ctrl.$chkVideoUrl[0].checked) {
        ViTag.debug("visap.edit:upload:upload video of the type directurl");
            me.upload.uploadVideoByURL(); //it supports MP4,OGG,WEBM 
            return false;
        }

        if (me.ctrl.$vidFile.val() === '' || me.ctrl.$vidFile.val().toLowerCase().indexOf("mp4") < 0) {
            internal.ShowMessage("Upload fails, please select MP4 videos to upload.", "Validation", "Upload.Saving");
            return false;
        }

        me.ctrl.$lblWrgMsg.css({ "visibility": "hidden" });

        var data = new FormData(), file = me.ctrl.$vidFile[0].files[0], replaceVid = true;
        
        if(internal.validateVidName(file.name) == true){
          alert('Video file name contains illegal characters.');
          me.ctrl.$vidFile.val("");
          return false;
        }

        if (me.upload.getSource(ViTag.source, file.name)) {
            //  replaceVid = confirm("Video " + file.name + " is already exits in the repository do you want to replace it ?");
            replaceVid = false;
            alert("Video " + file.name + " already exits in the repository,please uplaod new video");
        }
        ViTag.debug("Visap.edit:upload:Uploading video for the source:  "+file.name);
        //Uploads to repository
        if (replaceVid) {
            me.upload.updatevalue = "insert";
            data.append(file.name, file);
            $.ajax({
                type: "POST",
                url: ViTag.config.wsFileuploadurl,
                contentType: false,
                processData: false,
                data: data,
                success: function () { me.upload.getVidSS(file.name); },
                beforeSend: internal.ShowMessage("Uploading........", "Info", "UploadImage.Saving"),
                error: me.upload.error
            });
        }
    }; //upload video related code ends
    //publish video starts
    // <summary>
    /// Publish button is clicked below function is executed
    /// </summary>
    ///<param="isSinglePublishID">single video publishing ID</param>
    ns.publish = function (isSinglePublishID) {
    try
    {
        //List of checked items, src
        var idList = [], $chkList = $("[name = 'chklist']:checked"), staged = null, usrD = null;
         //To publish the data for analytics
         ns.postpublishData=[];
         
        if ($chkList.length > 0 || isSinglePublishID) {
            if ($chkList.length > 0) {
                $chkList.each(function () {
                    idList.push(this.value);
                });
            }
            else
            {
                ViTag.debug("Visap.edit:publish:singleVideopublished:"+isSinglePublishID)
                idList.push(isSinglePublishID);
                }
            for (var i = 0; i < idList.length; i++) {
                var obj={},analyticsObj={};;
                var checkedsrc = idList[i];
                staged = me.publish.getStageMetadata(ViTag.source, checkedsrc);
                usrD = me.publish.getUserMetadata(checkedsrc);
                 obj.id=staged.title;
                //post data for analytics 
                
                 analyticsObj.user=ns.getUserInfo();
                analyticsObj.action="Publish";
                analyticsObj.object=obj;
                
                ns.postpublishData.push(analyticsObj);
                //Extend to merge in internal.userSrc
                //  if (internal.userSrcDetails == null) internal.userSrcDetails = [];

                if (usrD == null) {
                ViTag.debug("Visap.edit:publish:first time publish and userdata is null so staging data is considered:"+isSinglePublishID);
                     //This condition is checked to replace the question id with the new question id (while publishing for the first time)
                    if(staged.actions && staged.actions.length>0)
                    me.publish.createQuestDataCopy(staged.actions[0].listAction);
                   
                    me.publish.savePublishVideo(JSON.stringify([staged]), me.publish.MsgSaving, me.publish.MsgSaved, me.publish.MsgError);
                    ViTag.debug("Visap.edit:publish:published successfully");
                }
                else {
                    ViTag.debug("Visap.edit:publish:user data"+usrD.title+","+usrD.desc +"and staged data"+staged.title+","+staged.desc);
                    //$.extend(true, usrD, usrD, staged);
                    me.publish.extendAttrs(usrD, staged);
                    me.publish.savePublishVideo(JSON.stringify([usrD]), me.publish.MsgSaving, me.publish.MsgSaved, me.publish.MsgError);
                    internal.userSrcDetails = null;
                     ViTag.debug("Visap.edit:publish:published successfully");
                }
            }
             $(document).trigger("VisapLogpublish",[ns.postpublishData]);
            //Save User Data
            //internal.video.savePublishVideo(JSON.stringify(internal.userSrc), internal.MsgSaving, internal.MsgSaved, internal.MsgError);
            setTimeout(function () { 
            	$("[name = 'chklist']").attr('checked', false);
            	$("#selectchkBox").attr('checked', false);
            }, 3000);
        }
        else internal.ShowMessage("Please select atleast one video to publish", "Info", "Publish.Publishing");
        }catch(err)
        {
             ViTag.error("visap.edit:publish:Error while publishing"+err);
        }
    };
    //publish video ends
    ns.addMessageHandler = function (fn) {
        me.messageHandler = fn;
    };

    //Displaying Whiteboard on the video conatainer in the create mode.
    //based on radio button values
    ns.DisplayingWhiteboard = function () {
    try
    {      
        me.whiteboardData.DisableRadioButton();
        var WhiteboardOption = $('input[name="wbSlide"]:checked').val(); //getting position radio button value.
        me.ctrl.$wboardContainer.css('width', ''); //To clear previous width of the whiteboard.
        ViTag.removeCKobjects();
     
        //removing  all the positioning and dragbar,canvasConatainer classes.       
        me.ctrl.$wboardContainer.removeClass('wbLeftPos wbRightPos wbLeftOutPos wbRightOutPos wbRightFSPos');
        me.ctrl.$wbdragbar.removeClass('wbDragbarRight wbDragbarLeft');
        me.ctrl.$sketchcontainerWB.removeClass('canvascontainerLeft canvascontainerRight');
        me.ctrl.$textcontainerWB.removeClass('textcontainerWBLeft textcontainerWBRight');

        var whiteboardDirection = ViTag.DirectionOfWhiteboard(WhiteboardOption);
        me.whiteboardData.SlidingWhiteboard(whiteboardDirection);
        }
        catch(err)
        {
          ViTag.error("visap.edit:DisplayingWhiteboard:Error while displaying whiteboard"+err);
        }
    };

    // Creation of ckeditor object
    ns.showTextWB = function () {
    try
    {  
        me.whiteboardData.DisableRadioButton();
        internal.imager = null; //To clear previous sketch when new whiteboard action selected.
        ns.sketchDataWhiteboard = null; 
        ns.sketchDataDefault = null;//To clear previous sketch
        var videoContainerHeight = $('#videoMainContainer').height();
        me.ctrl.$wbdragbar.addClass('wbDragbarLeft');
        me.ctrl.$wbdragbar.css('display', 'block');
        me.ctrl.$wboardContainer.css('width', '50%');
        me.ctrl.$whiteboardDuration.val("");
        me.ctrl.$cmtWiteboard.html("");
        me.ctrl.$textcontent.html("").css('z-index',"-1");
        me.ctrl.$WbimgOverlay.hide();
        me.ctrl.$imgOverlay.hide();
        me.ctrl.$wboardContainer.removeClass('wbRightPos wbLeftOutPos wbRightOutPos wbRightFSPos').addClass('wbLeftPos');
        me.ctrl.$sketchcontainerWB.removeClass('canvascontainerLeft canvascontainerRight');

        me.ctrl.$sketchcontainerDefault.html('');
        me.ctrl.$sketchcontainerWB.html('');
        ViTag.initSketchTools({ container: "sketchcontainerWB" });

        me.ctrl.$textcontainerWB.removeClass('textcontainerWBLeft textcontainerWBRight');
        me.ctrl.$textcontainerWB.addClass('textcontainerWBLeft');

        me.ctrl.$wboardContainer.hide(0).delay(0).toggle('slide', { direction: 'left' }, 1000,
        function () {
            ViTag.editor.rePlaceCkeditor(cmtWiteboard);
            me.whiteboardData.EnableRadioButton();
        }
        ).css({ 'height': videoContainerHeight });
         }
        catch(err)
        {
          ViTag.error("visap.edit:showTextWB:Error while displaying text and whiteboard"+err);
        }
    };

    //All the generic validations need to place in this namespace.
    ns.util = {
    
           tittleDuplicateCheck:function()
            {                
               var isValidTittle=true;
               for (var i = 0; i < ViTag.source.length; i++) {            
                      if (ViTag.source[i].title.toLowerCase() == me.ctrl.$fileTitle.val().toLowerCase()) {
                       isValidTittle=false;
                      }
                }              
              return isValidTittle;            
            },
         
          tittledesccheck:function()
          {
             ViTag.debug("visap.edit: tittledesccheck:to validate the for the blank space in tittle and desc "+me.ctrl.$fileTitle.val()+","+me.ctrl.$fileDesc.val());
                 var isvalid=false;
                 var filename= $.trim(me.ctrl.$fileTitle.val());  
                var filedesc= $.trim(me.ctrl.$fileDesc.val());                      
                  if (  filename=="") {
                    //if (  me.ctrl.$fileTitle.val().substring(0, 1) == " ") {
                        isvalid = true;
                    //}
                }                 
                if (filedesc == "") {
                    //if (me.ctrl.$fileDesc.val().substring(0, 1) == " ") {
                        isvalid = true;
                    //}
                } 
                
                
                
             return isvalid;
         },
         
        
        timeFormat: function (time) {
            ViTag.debug("visap.edit: timeFormat:to validate the timeformat hh:mm:ss for the time "+time);
            var newTime = time.split(":");
            for (var i = 0; i < newTime.length; i++) {
                if (newTime[i].length != 2 || newTime.length == 1) {
                    if (newTime.length == 3) internal.ShowMessage("please use the correct format(hh:mm:ss)", "Validation", "Action.Saving.AlertMsg"); //newTime length is 3 means its in hh:mm:ss
                    else internal.ShowMessage("please use the correct format(mm:ss)", "Validation", "Action.Saving.AlertMsg"); //newTime length is 2 means its in mm:ss
                    return true;
                }
            }
        },
        
        isTextFieldEmpty:function(textValue,msg,type,source)
        {
	      if($.trim(textValue) == ""){
	      internal.ShowMessage(msg, type,source);
	      return true;
	      }
        },
         
        isDurationZero:function(textValue,msg,type,source)
        {
    		if (parseInt(textValue) == 0) {
        	internal.ShowMessage(msg,type,source);
        	return true;
        	}
    	}
       
        
    };
})(window.ViTag = window.ViTag || {});

 