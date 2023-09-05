
(function (ns) {


    /// <summary>
    ///Init is called from edit.js of respective theme
    ///args may have parameters to override the defaults
    /// </summary>
    /// <param name="args">args which has to be overridden</param>
    /// <returns>args which will be used in edit</returns>
    //#region Public
    ns.showMessage = function (msg, type, source) {
        internal.ShowMessage(msg, type, source);
    }

    ns.initEditing = function (args) {
        ViTag.debug("Visap.edit:initilization:" + " " + args.username + "," + args.path + "," + args.playerYT + "," + args.snapRepopath + "," + args.videoMContainer);
        if (args.ctrl) me.ctrl = args.ctrl;
        $.extend(me.defaults, args.args);
        // TODO: Calling many times while change the user [So if condition statement added].
        if (!me.ctrl.$tag || args.isPlayerReinitialized) {
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
        try {
            ViTag.info("Visap.edit:EditTags:Editing the tag with time and description:" + " " + t + "," + d);
            internal.editTagTime = t;
            ns.enableEditTool(d);
            ns.editTagDesc = unescape(d);
            ns.handleSeekBar();
        }
        catch (err) {
            ViTag.error("Visap.edit:EditTags:Error while Editing tags" + err);
        }
    };

    /// <summary>
    /// Clearing the questions and annotations related elements
    /// </summary>
    ns.ClearEditValues = function () {
        try {
            ViTag.debug("Visap.edit:ClearEditValues:Clearing all edited Values");
            ns.AnnotateEditTool(null);
            ns.HotspotEditTool(null);
            ns.WhiteboardEditTool(null);
            ns.enableEditTool(false)
            ns.enableEditLinkTool(false)
            me.question.clearEntries();
        }
        catch (err) {
            ViTag.error("Visap.edit:ClearEditValues:Error while setting action element settings" + err);
        }
    };

    /// <summary>
    /// User cancel the upadate of the existing sketch and sketch tabs are hidden 
    /// </summary>    
    ns.disableSketch = function () {
        try {
            ns.hideSketches();
        }
        catch (err) {
            ViTag.error("Visap.edit:disableSketch: Error while disabling sketch" + err);
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
    //ti, de, t, d, pausedTime, left, top,width,height,PauseOnShow
    ns.EditAnnotate = function (editAnnotParams) {
        try {
            ViTag.info("visap.edit:EditAnnotate:for the paused time:" + editAnnotParams.title + "," + editAnnotParams.description + "," + editAnnotParams.sTime + "," + editAnnotParams.duration + "," + editAnnotParams.PausedTime + "," + editAnnotParams.Left + "," + editAnnotParams.Top);
            ns.editAns = true;    //global variable to know its in editmode of annoation from outside the core lib.
            internal.editAnnotation = { "ti": editAnnotParams.title, "t": editAnnotParams.sTime, "pausedTime": editAnnotParams.PausedTime, "height": editAnnotParams.Height, "width": editAnnotParams.Width, "top": editAnnotParams.Top, "left": editAnnotParams.Left };
            ns.AnnotateEditTool(editAnnotParams.title, editAnnotParams.description, editAnnotParams.duration, editAnnotParams.PauseOnShow);
            ns.handleSeekBar();
        }
        catch (err) {
            ViTag.error("Visap.edit:EditAnnotate: Error while editing the annotations" + err);
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
        try {
            ViTag.info("visap.edit:EditWhiteboard:for the paused time:" + pausedTime + "," + editedAction.StartTime);
            ns.isSketchInitialisedforWB = false; //sketcher has to be reinsitialise for the edit of the sWB sketch
            ns.editwhitebaord = true;    //global variable to know its in editmode of Whiteboard from outside the core lib.
            ns.sketchDataWhiteboard = editedAction.sketchData; //retrieving the sketch data which is saved in create mode.
            internal.editWhiteboard = { "t": editedAction.StartTime, "pausedTime": pausedTime, "sketchData": editedAction.sketchData };
            ns.WhiteboardEditTool(editedAction);
            ns.handleSeekBar();
        }
        catch (err) {
            ViTag.error("Visap.edit:EditWhiteboard: Error while editing the Whiteboard" + err);
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
    ns.EditHotspot = function (pausedTime, editedAction) {
        try {
            ViTag.info("visap.edit:EditHotspot:for the hotspot tittle:" + " " + editedAction.title + "," + editedAction.description + "," + editedAction.StartTime + "," + editedAction.StartTime + "," + editedAction.duration + "," + pausedTime + "," + editedAction.showOnpause);
            ns.editPreviewHS = true;
            internal.editHotspotvalues = { "ti": editedAction.title, "t": editedAction.StartTime, "pausedTime": pausedTime, "top": editedAction.hotspotAttributes.top, "left": editedAction.hotspotAttributes.left };
            ns.HotspotEditTool(editedAction.title, editedAction.description, editedAction.duration, editedAction.showOnpause);
            ns.handleSeekBar();
        }
        catch (err) {
            ViTag.error("Visap.edit:EditHotspot: Error while editing the hotspot" + err);
        }
    };
    /// <summary>
    /// Triggers handleseekBarValues 
    /// </summary>    
    ns.handleSeekBar = function () {
        try {
            $("body").trigger("handleseekBarValues");
        }
        catch (err) {
            ViTag.error("Visap.edit:handleSeekBar: Error while triggering  handleseekBarValues" + err);
        }
    };

    /// <summary>
    /// Triggers canvasHide to hide the canvas related elements 
    /// </summary>   
    ns.hideSketches = function () {
        try {
            $("body").trigger("hideSketches");
        }
        catch (err) {
            ViTag.error("Visap.edit:hideSketches: Error while triggering  hideSketches" + err);
        }

    };


    /// <summary>
    /// Triggers canvasHide to hide the canvas related elements 
    /// </summary>   
    ns.resetSketches = function () {
        try {
            $("body").trigger("resetSketches");

        }
        catch (err) {
            ViTag.error("Visap.edit:resetSketches: Error while triggering  resetSketches" + err);
        }
    };

    /// <summary>
    /// Get the all the actions for  pausedTime     
    /// </summary>
    /// <param name="PausedTime">PausedTime to be checked with</param>
    /// <returns>Action list</returns>
    ns.getPausedAction = function (PausedTime) {
        try {
            ViTag.debug("visap.edit:getPausedAction:Get all the actions for the paused time:" + PausedTime);
            var actions = ns.CurrentSrc().actions;
            if (actions !== undefined && actions.length !== 0) {
                var action = internal.getPausedAction(actions, PausedTime);//gets action list if current time and paused time is same.
                if (action !== undefined) {
                    return action.listAction;
                }
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:getPausedAction: Error while getting the actionlist for the paused time" + err);
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
        try {
            if (listaction !== undefined && listaction.length > 0) {
                ViTag.debug("visap.edit:getEditedListAction:Get the all the actions list for the type:" + type + "," + startTime + "," + listaction.length);
                return internal.getEditedActionLst(type, listaction, startTime);//gets actions based on type and start time.
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:getEditedListAction: Error while getting edited action list" + err);
        }
    };

    /// <summary>
    /// Function called when edit icon for link is clicked
    /// </summary>
    /// <param name="n">link name</param>
    /// <param name="u">link URL</param>
    ns.EditLinks = function (n, u) {
        try {
            internal.editLink = n;
            ns.enableEditLinkTool(n, u);
        }
        catch (err) {
            ViTag.error("Visap.edit:EditLinks: Error while editing thelinks" + err);
        }
    };

    /// <summary>
    /// Edit button of the tags are clicked and its values are set to its elements
    /// </summary>
    /// <param name="d">tag description name</param>

    ns.enableEditTool = function (d) {

        try {
            if (d) {
                ns.desc = unescape(d);
                me.ctrl.$tagtimediv.show();
                me.ctrl.$tagDurationtime.html(ViTag.getDuration());
                me.ctrl.$tagTime.val(ViTag.getTimeFormat(internal.editTagTime));
                me.ctrl.$tag.val(ns.desc);
                me.ctrl.$tagTime.show();
            }
            else {
                internal.editTagTime = -1;
                me.ctrl.$tagTime.hide();
                me.ctrl.$tag.val('');
                //ns.AnnotateEditTool();  // This function is calling when the user play the video if the annotation action is on pause on show 
                //ns.WhiteboardEditTool(); //so after playing the video annotation is hiding so call to this function is not required.
                me.ctrl.$tagTime.val('');
                me.ctrl.$tagtimediv.hide();
            }

        }
        catch (err) {
            ViTag.error("Visap.edit:enableEditTool: Error while enabling edittools" + err);
        }
    };
    /// <summary>
    /// Edit button of the annoatation is clicked and its values are set to its elements
    /// </summary>
    /// <param name="ti">tittle of the annotation</param>
    /// <param name="de">desc of the annotation</param>
    /// <param name="d">duration of the annotation</param> 

    ns.AnnotateEditTool = function (ti, de, d, PauseOnShow) {
        try {
            if (d) {
                var title = unescape(ti);
                ns.editor.setValue(cmtDesc, de);
                me.ctrl.$cmtTitle.val(title);
                //Duartion readonly
                me.ctrl.$cmtDuration.val(d);
                if (PauseOnShow === true)
                    me.ctrl.$annotatePauseOnShow.prop('checked', true);
            }
            else {
                internal.editAnnotation = null;
                //empty elements  if no annotation
                me.ctrl.$cmtTitle.val("");
                me.ctrl.$cmtDuration.val("");
                me.ctrl.$annotatePauseOnShow.prop('checked', false);
                $("#annotates").hide();
                if (ns.editor.ckEditorAvailable() && ns.editor.ckEditorInstanceAvilable(cmtDesc))
                    CKEDITOR.instances.cmtDesc.setData("");
                else me.ctrl.$cmtDesc.val("");
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:AnnotateEditTool: Error while editing annotaion tools " + err);
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
        try {
            if (editedAction) {

                me.ctrl.$wbdragbar.removeClass('wbDragbarRight wbDragbarLeft');
                me.ctrl.$whiteBoardWrapper.show();
                me.ctrl.$wboardContainer.show();
                me.ctrl.$wbdragbar.css('display', 'block');
                me.ctrl.$textcontent.css('z-index', "-1");
                me.ctrl.$textcontent.hide();
                me.ctrl.$WbimgOverlay.hide();
                me.ctrl.$wboardContainer.css({ 'width': editedAction.whiteboardAttributes.width });

                me.ctrl.$wbtext.prop('checked', true); //To enable text radio default.

                me.ctrl.$sketchcontainerDefault.html('');
                me.ctrl.$sketchcontainerWB.html('');
                ns.getSavedSketchAttributes(ns.sketchDataWhiteboard);
                me.ctrl.$textcontainerWB.show();// show ckeditor.
                me.whiteboardData.SlidingWhiteboard(editedAction.whiteboardPosition, editedAction.description); //Sliding whiteboard based on positon.
                me.ctrl.$whiteboardDuration.val(editedAction.duration);
                ViTag.debug("Visap.edit:WhiteboardEditTool: Depending on direction whiteboard will display left,right,leftout,righout" + editedAction.whiteboardPosition);
                $("input[name=direction][value=" + editedAction.whiteboardPosition + "]").prop('checked', true);

                if (editedAction.PauseOnShow === true) {
                    me.ctrl.$whiteboardPauseOnShow.prop('checked', true);
                }

            }
            else {
                
                internal.editWhiteboard = null;
                me.ctrl.$whiteboardDuration.val("");
                me.ctrl.$wbtext.prop('checked', true);
                me.ctrl.$whiteboardPauseOnShow.prop('checked', false);
                me.ctrl.$wbLeftPos.prop('checked', true);
                $(".wbDragbarLeft").css('margin-right', "0px");
                if (ns.editor.ckEditorAvailable() && ns.editor.ckEditorInstanceAvilable(cmtWiteboard)) {
                    CKEDITOR.instances.cmtWiteboard.setData("");
                }
                else me.ctrl.$cmtWiteboard.val("");
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:WhiteboardEditTool: Error while editing whiteboard " + err);
        }
    };
    /// get the saved image height and width while editing whiteboard action
    ns.getSavedSketchAttributes = function (imgdata) {
        var img = new Image();
        img.onload = function () {
            var height = img.height;
            var width = img.width;
            ns.setImager(ns.sketchDataWhiteboard, me.defaults.canvascontainerWB, img.height, img.width);
            ns.sketchcontainer = "sketchcontainerWB";
            ns.hideSketches(); // direct edit of wb scenario:prev was reset: now for v2 when sketch is initialised for WB it will be visisble and hence hiding
        };
        img.src = imgdata;

    }

    /// <summary>
    /// Edit button of the hotspot is clicked and its values are set to its elements
    /// </summary>
    /// <param name="ti">tittle of the hotspot</param>
    /// <param name="de">desc of the hotspot</param>
    /// <param name="d">duration of the hotspot</param> 

    ns.HotspotEditTool = function (ti, de, d, showonpause) {
        try {
            if (d) {
                ViTag.info("Visap.edit:HotspotEditTool: Editing the hotspot with duration:" + ti + "," + de + "," + d + "," + showonpause);
                var title = unescape(ti);
                var desc = unescape(de);
                me.ctrl.$hotspotCircle.attr('draggable', 'true');
                me.ctrl.$hotspotTittle.val(title);
                ViTag.debug("Visap.edit:HotspotEditTool: Editing the hotspot with desc and title:" + desc + "," + title);
                //Duartion readonly
                if (showonpause === 1)
                    me.ctrl.$hotspotOnpause.prop('checked', true);
                me.ctrl.$hotspotDuration.val(d);
                me.ctrl.$hotspotContent.val(desc);
            }
            else {
                internal.editHotspotvalues = null;
                //empty elements  if no hotspot
                me.ctrl.$hotspotTittle.val("");
                me.ctrl.$hotspotDuration.val("");
                me.ctrl.$hotspotOnpause.attr('checked', false);
                me.ctrl.$hotspotContent.val("");
                $("#hotspotCircle").hide();
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:HotspotEditTool: Error while editing hotspot " + err);
        }
    };
    /// <summary>
    ///Edit button of the link is clicked and its values are set to its elements
    /// </summary>
    /// <param name="n">link name</param>
    /// <param name="u">link URL</param>

    ns.enableEditLinkTool = function (n, u) {
        try {
            if (n) {
                ViTag.debug("Visap.edit:enableEditLinkTool: Enable link name and url:" + n + "," + u);
                ns.linkName = unescape(n);
                me.ctrl.$linkName.val(ns.linkName);
                me.ctrl.$linkUrl.val(u);
            }
            else {
                internal.editLink = false;
                me.ctrl.$linkName.val('');
                me.ctrl.$linkUrl.val('');
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:enableEditLinkTool: Error while editing link " + err);
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
        try {
            ViTag.debug("Visap:getroundoff:start time being " + num);
            var i;
            var minDiff = 1000;
            var ans;
            for (i in array) {
                var m = Math.abs(num - array[i].StartTime);
                if (m < minDiff) {
                    minDiff = m;
                    ans = array[i].StartTime;
                }
            }
            sketchv1.VideoTme = ans;
        }
        catch (err) {
            ViTag.error("Visap.edit:getroundoff: Error while rounding off " + err);
        }
    }


    //passing event data to visap analytics by raising an event 
    ns.passEventData = function (action, actionType, source) {
        var eventData = {};
        eventData.action = action;
        eventData.actionType = actionType;
        $(document).trigger("VisapLog", [eventData, source]);
    }
    /// <summary>
    ///While editing annotation duration should be less than the total video time
    ///So in order to show how many secs are remaining then display format shoud be hh:mm:ss format.
    ///This accepts Seconds as parameter and returns time in mm:ss format
    /// </summary>
    /// <param name="seconds">time for conversion</param>

    ns.getTimeFormat = function (s) {
        try {
            var h = Math.floor(s / 3600); //Get whole hours
            s -= h * 3600;
            var m = Math.floor(s / 60); //Get remaining minutes
            s -= m * 60;
            var sec = Math.floor(s);
            if (h === 0)
                return (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
            else
                return (h < 10 ? '0' + h : h) + ":" + (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
        }
        catch (err) {
            ViTag.error("Visap.edit:getTimeFormat: Error while formatting time " + err);
        }
    }
    ns.getTimeInSeconds = function (hrs, mints, secs) {
        try {
            var sec = hrs * 3600 + mints * 60 + secs * 1;
            return sec;
        }
        catch (err) {
            ViTag.error("Visap.edit:getTimeInSeconds: Error while getting time in sec:" + err);
        }
    },

        // Video attribute Edit -End-
        ns.calldelete = function (ID, fnPreSend, fnSuccess, fnError) {
            try {
                me.calldelete(ID, fnPreSend, fnSuccess, fnError);
            }
            catch (err) {
                ViTag.error("Visap.edit:calldelete: Error while calling delete" + err);
            }
        },

        ns.AddAndSaveTag = function (tag, fnPreSend, fnSuccess, fnError) {

            try {
                ViTag.debug("visap.edit:AddAndSaveTag:saving the tag with the description:" + tag.d + "," + tag.t);

                //pushes the passed tag to CurrentTags object
                var data = me.GetUpdatedSources(tag);
                //saves to database
                me.saveActions(data, fnPreSend, fnSuccess, fnError);
                ns.RenderCurrentTags();
            }
            catch (err) {
                ViTag.error("Visap.edit:AddAndSaveTag: Error while saving tag" + err);
            }
        };

    // Update the tag needs to delete from the list and re added
    ns.removePreviousTag = function (editTagDesc) {
        return internal.deleteTag(editTagDesc);
    }

    // Update the links needs to delete from the list and re added
    ns.removePreviousLink = function (linktitle) {
        internal.deleteLink(linktitle);
    }

    /// <summary>
    ///Save Timeline Video to database
    /// </summary>
    /// <param name="data">timeline data</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.createTimeline = function (data, fnPreSend, fnSuccess, fnError) {
        try {
            me.SaveTimeLine(data, fnPreSend, fnSuccess, fnError);
        }
        catch (err) {
            ViTag.error("Visap.edit:createTimeline: Error while cretion of timeline" + err);
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
        try {
            me.deleteVideo(ID, fnPreSend, fnSuccess, fnError);
        }
        catch (err) {
            ViTag.error("Visap.edit:createTimeline: Error in deleteVideo" + err);
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
        try {
            var data = me.UpdateOverlay(ol);
            me.saveActions(data, fnPreSend, fnSuccess, fnError);
        }
        catch (err) {
            ViTag.error("Visap.edit:AddOverlay: Error in AddOverlay" + err);
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
        try {
            var data = me.AddAnnotate(annotate);
            me.saveActions(data, fnPreSend, fnSuccess, fnError);
        }
        catch (err) {
            ViTag.error("Visap.edit:AddAndSaveAnnotate: Error in Adding and SavingAnnotate" + err);
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
        try {
            var data = me.AddHotspot(hotspot);
            me.saveActions(data, fnPreSend, fnSuccess, fnError);
        }
        catch (err) {
            ViTag.error("Visap.edit:AddAndSaveHotspot: Error in Adding and Savinghotsopt" + err);
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
        try {
            var data = me.AddWhiteboard(whiteboard);
            me.saveActions(data, fnPreSend, fnSuccess, fnError);
        }
        catch (err) {
            ViTag.error("Visap.edit:AddAndSaveWhiteboard: Error in Adding and Savingwhiteboard" + err);
        }
    };

    /// <summary>
    /// Save question to Database
    /// </summary>
    /// <param name="question">question deatils to be saved</param>
    /// <param name="fnPreSend">function to be executed before sending ajax request</param>
    /// <param name="fnSuccess">function to be executed on success of ajax request</param>
    /// <param name="fnError">function to be executed if there is an error in ajax request</param>
    ns.addQuestionData = function (questiondata, callBack) {
        try {
            if (callBack)
                me.saveActions(questiondata, callBack.onSaving, callBack.onSave, callBack.onErrors);
            else
                me.saveActions(questiondata, function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Action.questions.Saving"); },
                    function () { me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Action.questions.Saved"); internal.renderAttrs(); },
                    function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action.questions.SavingError"); });

        }
        catch (err) {
            ViTag.error("Visap.edit:AddAndSaveQuestion: Error in Adding and Savingquestion" + err);
        }
    };

    /// <summary>
    /// Edited Tittle and desc  will be saved to database by checking the validations
    /// </summary>
    ns.updateEditedTittleorDesc = function () {
        try {
            var videoTitle = $.trim(me.ctrl.$fileTitle.val());
            if (ns.util.isTextFieldEmpty(videoTitle, "playerEdit.msg_title", "Validation", "Upload.Saving") || ns.util.isTextFieldEmpty(me.ctrl.$fileDesc.val(), "playerEdit.msg_description", "Validation", "Upload.Saving")) {  //Individual validation while editing video title.
                return false;
            }
            if (!internal.validateString(videoTitle)) {
                internal.ShowMessage("playerEdit.msg_nonsupportedtitle", "Validation", "Upload.Saving");
                return false;
            }
            var videoCategory = me.ctrl.$fileCategory.val();

            var category = [];
            if (videoCategory !== '') {

                var isvalid = false;
                if (videoCategory.substring(0, 1) === " ") {
                    isvalid = true;
                }

                //for comma separted values
                if (videoCategory.indexOf(',') !== -1) {
                    var vidCategory = videoCategory.trim().replace(/,{1,}$/, '');//remove the comma at the end 
                    splitCategory = vidCategory.split(/\s*,\s*/);
                    splitCategory = ns.util.duplicateCheck(splitCategory);
                    isvalid = internal.isCategoryEmpty(splitCategory);
                    for (var index = 0; index < splitCategory.length; index++) {
                        category.push(escape(splitCategory[index]));
                    }
                    if (!internal.checkCategory(splitCategory, isvalid)) { return false; }
                }
                else {
                    //for single value     
                    category.push(escape(videoCategory));
                    if (!internal.checkCategory([videoCategory], isvalid)) { return false; }
                }
            }
            else {
                category.push(videoCategory);
            }

            var currentSource = ViTag.getSource(sessionStorage.getItem('videoid'));

            if (!internal.isObjDefined(currentSource)) {//this method checks whether object is defined or not.
                return false;
            }

            //check if category is not updated
            var existingdata = $.trim(unescape(currentSource.category));
            if (unescape(currentSource.title) !== videoTitle || unescape(currentSource.desc) !== me.ctrl.$fileDesc.val() || existingdata !== videoCategory) {
                if (unescape(currentSource.title) !== videoTitle && !(ViTag.util.tittleDuplicateCheck(currentSource._id, videoTitle.toLowerCase()))) {
                    internal.ShowMessage("playerEdit.msg_duplicatetitle", "Validation", "Upload.Saving");
                    return false;
                }
                currentSource.category = category;
                currentSource.desc = escape(me.ctrl.$fileDesc.val());
                currentSource.title = escape(videoTitle);
                me.upload.success(currentSource, "true", "playerEdit.msg_saved");
            }
            else
                internal.ShowMessage('playerEdit.msg_nochange', "Validation", "Upload.Saving");
        }
        catch (err) {
            ViTag.error("Visap.edit:updateEditedTittleorDesc: Error in update tittle/desc" + err);
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
        try {
            var data = me.AddLinks(li);
            ns.enableEditLinkTool(false);
            me.saveActions(data, fnPreSend, fnSuccess, fnError);
            ns.RenderCurrentLinks();
            ViTag.initAnnotator();
        }
        catch (err) {
            ViTag.error("Visap.edit:AddLinks: Error in adding links" + err);
        }
    };

    ns.RemoveCurrentTag = function (t,callBack) {
        try {
            var tagData = internal.getTagData(t);//gets tagData from current tags using tag name.
            var tagTime = tagData.t;

            var res = internal.RemoveTag(t, function () {},
                function () {
                    internal.renderAttrs();
                    //passing tag data to visap analytics while removing tag by raising event
                    ns.passEventData(ViTag.Events.deleteAction, "tag", { name: t, time: tagTime });
                },
                function () {});

            if(!res) {
                callBack.onError();
            } else {
                ns.enableEditTool(false);
                ns.RenderCurrentTags();
                callBack.onSave();
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:RemoveCurrentTag: Error in removing tag" + err);
        }
    }

    // Video attribute Save -End-

    // Video attribute Remove -Start-

    /// <summary>
    /// Remove tag if tag needs to be deleted
    /// </summary>
    /// <param name="t">desc of the tag</param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveTag = function (t, callBack) {
        try {
            var tagData = internal.getTagData(t);//gets tagData from current tags using tag name.
            var tagTime = tagData.t;
            // callBack will be used if call from outside framework
            if (callBack)
                internal.RemoveTag(t, callBack.onSaving, callBack.onSave, callBack.onError);
            else internal.RemoveTag(t, function () { internal.ShowMessage("playerEdit.msg_deleting", "Info", "Tags.Deleting"); },
                function () {
                    internal.ShowMessage("playerEdit.msg_deleted", "Info", "Tags.Deleted"); internal.renderAttrs();
                    //passing tag data to visap analytics while removing tag by raising event
                    ns.passEventData(ViTag.Events.deleteAction, "tag", { name: t, time: tagTime });
                },
                function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Tags.DeletingError"); });

            // TODO: Below 2 methods are calling in many places need to remove unwatend calls
            ns.enableEditTool(false);
            ns.RenderCurrentTags();
        }
        catch (err) {
            ViTag.error("Visap.edit:RemoveTag: Error in removing tag" + err);
        }
    }
    /// <summary>
    /// Remove action from the list and database
    /// </summary>
    /// <param name="t">time to match with currenttime of the action </param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveActionList = function (currentTime, callBackUnitTest) {
        try {
            if (callBackUnitTest) {
                internal.RemoveActionList(currentTime, callBackUnitTest.onSaving, callBackUnitTest.onSave, callBackUnitTest.onError);
            }
            else {
                internal.RemoveActionList(currentTime, function () { internal.ShowMessage("playerEdit.msg_deleting", "Info", "Action.Deleting"); },
                    function () { internal.ShowMessage("playerEdit.msg_deleted", "Info", "Action.Deleted"); internal.renderAttrs(); },
                    function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action.DeletingError"); });
            }
            //passing actions data to visap analytics while removing actionlist by raising event
            ns.passEventData(ViTag.Events.deleteAction, "allActions", { StartTime: currentTime });
            ns.enableEditLinkTool(false);
            ns.RenderCurrentTags();
            ns.initSketcher();
            ViTag.initTest();
            ViTag.initAnnotator();
            ViTag.initHotspot();
            ViTag.initWhiteboard();
            internal.editSketchCreatedTime = "";
            ns.resetSketches();
            ns.ClearEditValues();
            ViTag.aelib.clearData();
            ns.whiteboardSketchReset();
            $("body").trigger("resetWhiteBoard");
        }
        catch (err) {
            ViTag.error("Visap.edit:RemoveActionList: Error in removing actions" + err);
        }
    }

    /// <summary>
    /// Remove overlay from the list and database
    /// </summary>
    /// <param name="t">time to match with currenttime of the action </param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveOverlay = function (t, callBack) {
        try {
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
        catch (err) {
            ViTag.error("Visap.edit:RemoveOverlay: Error in removing overlay" + err);
        }
    }

    /// <summary>
    /// Remove action from the database
    /// </summary>
    /// <param name="ti">time to match with currenttime of the action list</param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveAction = function (ti, pausedtime, type, questionId, callBack) {
        try {
            var fileNames = [];//to store image filenames.
            //action data has to get from db for analytics, before deleting the action data 
            var action = internal.getActionData(type, pausedtime, ti);
            if (action === undefined) {
                return;
            }
            //get image file names uploaded by ck-editor.
            internal.getImgFileNames(action.description, fileNames);
            // callBack will be used if call from outside framework
            if (callBack)
                internal.RemoveAction(ti, pausedtime, questionId, fileNames, callBack.onSaving, callBack.onSave, callBack.onError);
            else
                internal.RemoveAction(ti, pausedtime, questionId, fileNames, function () { internal.ShowMessage("playerEdit.msg_deleting", "Info", "Action." + type + ".Deleting"); },
                    function () {
                        internal.ShowMessage("playerEdit.msg_deleted", "Info", "Action." + type + ".Deleted"); internal.renderAttrs();
                        if (action.sourceType !== "aelib") {
                            //passing action data to visap analytics while removing action by raising event
                            ns.passEventData(ViTag.Events.deleteAction, type, action);
                        }
                    },
                    function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action." + type + ".DeletingError"); });

            ns.enableEditTool(false);
            ns.RenderCurrentTags();

            ns.initSketcher();
            ViTag.initTest();
            ViTag.initAnnotator();
            ViTag.initHotspot();
            ViTag.initWhiteboard();
            internal.editSketchCreatedTime = "";
            ns.resetSketches();
            ns.ClearEditValues();
            ViTag.aelib.clearData();
            ns.whiteboardSketchReset();
            $("body").trigger("resetWhiteBoard");
        }
        catch (err) {
            ViTag.error("Visap.edit:RemoveAction: Error in removing action" + err);
        }
    }
    /// <summary>
    /// Remove link from the database
    /// </summary>
    /// <param name="n">link name to be removed</param>
    /// <param name="callBack">callBack will be used if call from outside framework</param>
    ns.RemoveLink = function (n, callBack) {
        try {
            //gets url form current links using link name
            var linkData = internal.getLinkData(n);
            var linkURL = linkData.u;
            // callBack will be used if call from outside framework
            if (callBack)
                internal.RemoveLink(n, callBack.onSaving, callBack.onSave, callBack.onError);
            else
                internal.RemoveLink(n, function () { internal.ShowMessage("playerEdit.msg_deleting", "Info", "Links.Deleting"); },
                    function () {
                        internal.ShowMessage("playerEdit.msg_deleted", "Info", "Links.Deleted"); internal.renderAttrs();
                        //passing link data to visap analytics while removing link by raising event
                        ns.passEventData(ViTag.Events.deleteAction, "link", { name: n, url: linkURL });
                    },
                    function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Links.DeletingError"); });

            ns.enableEditLinkTool(false);
            ns.RenderCurrentLinks();
        }
        catch (err) {
            ViTag.error("Visap.edit:RemoveLink: Error in removing link" + err);
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
        try {
            ViTag.info("Visap.edit:updateActionsList: editing action of type" + type);
            if (callBack)
                internal.updateActionsList(type, startTime, pausedTime, actionObj, callBack.onSaving, callBack.onSave, callBack.onError);
            else
                internal.updateActionsList(type, startTime, pausedTime, actionObj, function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Action." + type + ".Saving"); },
                    function () {
                        me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Action." + type + ".Saved");
                        var action = internal.getActionData(type, pausedTime, startTime);
                        //passing actions data to visap analytics while updating actions by raising event
                        ns.passEventData(ViTag.Events.editAction, type, action);
                        internal.hideAction(type);
                    },
                    function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action." + type + ".SavingError"); });
        }
        catch (err) {
            ViTag.error("Visap.edit:updateActionsList: Error in updating action list" + err);
        }
    }

    //To get the userid which is stored in localstorage.
    ns.getUserID = function () {
        return sessionStorage.getItem("userid");
    }
    /// <summary>
    ///To get particular action which is saved
    /// </summary>
    /// <param name="tooltype">type of the action</param>
    /// <param name="datavalue">data</param>
    /// <return>actionobj</returns>
    ns.getActionList = function (tooltype, datavalue, sourcetype) {
        try {
            var actionobj = {};
            if (ns.CurrentSrc().actions == null) ns.CurrentSrc().actions = [];
            if (ns.CurrentSrc().pausedtime == null) ns.CurrentSrc().pausedtime = 0;
            var lastItem, totalvalue, totalduration;
            var t = internal.getRoundOffValue(internal.getPausedTime(tooltype));
            ns.CurrentSrc().pausedtime = t;
            if (tooltype === "sketch")
                actionobj = { userid: ns.getUserID(), type: tooltype, data: { img: datavalue.i, duration: datavalue.d, color: datavalue.color } };
            else if (tooltype === "annotation")
                actionobj = { userid: ns.getUserID(), type: tooltype, data: { title: datavalue.ti, description: datavalue.de, duration: parseInt(datavalue.d), PauseOnShow: datavalue.PauseOnShow, AnnotationAttributes: { left: datavalue.AnnotationAttributes.left, top: datavalue.AnnotationAttributes.top, width: datavalue.AnnotationAttributes.width, height: datavalue.AnnotationAttributes.height } } };

            else if (tooltype === "hotspot")
                actionobj = { userid: ns.getUserID(), type: tooltype, data: { title: datavalue.ti, description: datavalue.de, duration: parseInt(datavalue.d), showOnpause: datavalue.showOnpause, hotspotAttributes: { left: datavalue.hotspotAttributes.left, top: datavalue.hotspotAttributes.top } } };
            else if (tooltype === "whiteboard")
                actionobj = { userid: ns.getUserID(), type: tooltype, data: { description: datavalue.description, duration: parseInt(datavalue.duration), sketchData: datavalue.sketchData, PauseOnShow: datavalue.PauseOnShow, whiteboardPosition: datavalue.whiteboardPosition, whiteboardAttributes: { width: datavalue.whiteboardAttributes.width } } };
            else if (tooltype === "questions") {
                actionobj = { userid: ns.getUserID(), type: tooltype, sourcetype: sourcetype, data: datavalue };

            }


            var actionList = ns.getPausedAction(ns.CurrentSrc().pausedtime);

            if (actionList === undefined || actionList.length === 0)
                actionobj.data.StartTime = t;

            if (actionList !== undefined && actionList.length > 0) {
                for (var i = 0; i < actionList.length; i++) {
                    lastItem = actionList.length - 1;
                    totalvalue = actionList[lastItem].data.StartTime;
                    totalduration = actionList[lastItem].data.duration;
                    actionobj.data.StartTime = internal.getRoundOffValue(totalvalue + totalduration);
                }
            }
            return actionobj;
        }
        catch (err) {
            ViTag.error("Visap.edit:getActionList: Error in getting action list" + err);
        }
    }

    //This will invoke when user try to update the pause time and click on save.
    ns.updatePauseTime = function (pauseTime, newTimeInsec, pauseTmAnchorId, pauseTmTextId, callback) {
        try {
            var index, currentime, actionList, actions = ViTag.CurrentSrc().actions;

            if (!internal.isObjDefined(actions)) {
                return false;
            }

            //to check is there any action is already present with newly enterd pausetime.
            if (internal.isActionExist(actions, pauseTime, newTimeInsec)) {
                if (callback) {
                    callback("There is an action present at this pausetime");
                } else {
                    internal.ShowMessage("playerEdit.msg_actionpresent", "Validation", "Action.updatepauseTime.AlertMsg")
                }

                $("#" + pauseTmTextId).val($("#" + pauseTmAnchorId)[0].innerHTML);
                return false;
            }

            currentime = internal.getRoundOffValue(newTimeInsec);
            //this is to update the sequece of actions time for the particular pause time.
            var listActions = ns.getPausedAction(pauseTime);
            index = ns.pauseActionIndex;               //to get the index of the current src which is matching for the pausetime.
            actionList = $.extend(true, [], listActions);  //after updating the updated values are stored in actionList .
            if (actionList !== undefined && actionList.length > 0) {
                internal.UpdatePtm(actionList, currentime);// updates new pause time.
            }

            //to check the newly entered time is greater than the video duration.
            if (actionList && actionList.length > 0) {
                if ((actionList[actionList.length - 1].data.duration + actionList[actionList.length - 1].data.StartTime) > ViTag.getDuration()) {
                    if (callback) {
                        callback("Total duration of the actionlist should be less than the video duration");
                    } else {
                        internal.ShowMessage("playerEdit.msg_totduration", "Validation", "Action.updatepauseTime.AlertMsg")
                    }

                    $("#" + pauseTmTextId).val($("#" + pauseTmAnchorId)[0].innerHTML);
                    return false;
                }
                else {
                    ViTag.CurrentSrc().actions[index].currentTime = currentime;
                    var actionData = ViTag.CurrentSrc().actions[index].listAction;
                    internal.UpdatePtm(actionData, currentime);// update pause time in ViTag CurrentSrc.
                }
            } else { ViTag.CurrentSrc().actions[index].currentTime = currentime; }

            me.saveActions(JSON.stringify([ns.CurrentSrc()]));
            ViTag.getSpecAction(newTimeInsec);
            $("#" + pauseTmTextId).hide();
            $("#" + pauseTmAnchorId).show();
            internal.PrintPauseTime(true); //passing true here to avoid sorting of pause time while editing the pausetime.
            ns.handleSeekBar();
        }
        catch (err) {
            ViTag.error("Visap.edit:updatePauseTime: Error in updating action list" + err);
        }
    }
    /// <summary>
    ///To get all actions which ever saved
    /// </summary>
    /// <param name="datavalue">data</param>
    /// <return>Json string of currentsource</returns>
    ns.getJsonString = function (action) {
        try {
            var t = internal.getRoundOffValue(internal.getPausedTime(action.type));
            ns.CurrentSrc().pausedtime = t;
            ns.CurrentSrc().width = $("#videoMainContainer").width();
            ns.CurrentSrc().height = $("#videoMainContainer").height();
            var isavailabe = false;
            for (var i = 0; i < ns.CurrentSrc().actions.length; i++) {
                var ac = ns.CurrentSrc().actions[i];
                if (ac.currentTime === t) {
                    isavailabe = true;
                    ac.listAction.push(action);
                }
            }

            if (!isavailabe)
                ns.CurrentSrc().actions.push({ currentTime: t, listAction: [action] });

            ns.CurrentSrc().actions.sort(function (a, b) { return a.t - b.t });
            return JSON.stringify([ns.CurrentSrc()])
        }
        catch (err) {
            ViTag.error("Visap.edit:getJsonString: Error in currentsrc in json list" + err);
        }
    }


    /// <summary>
    ///To get right hand side specific actions 
    /// </summary>
    /// <param name="time">paused time</param>-praveen


    ns.getSpecAction = function (time) {
        try {
            if ($.isFunction(me.ctrl.$savedActions)) {
                me.ctrl.$savedActions(time);
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:getSpecAction: Error in getting specific action" + err);
        }
    }

    // Video attribute Remove -End-


    /// <summary>
    ///Adding options,removing questions edit question
    /// </summary>
    ns.question = {
        editQuesID: null, STime: null, PTime: null,

        addOption: function () {
            try {
                // Will create the question option contorls [radio button and textbox].
                if ($("#" + me.defaults.quesOptions + " span").length < 4)
                    me.ctrl.$quesOptions.append(me.ctrl.$quesOptions.find("span")[0].outerHTML);
                else
                    internal.ShowMessage("playerEdit.msg_options", "Validation", "Action.questions.Saving");
            } catch (err) {
                ViTag.error("Visap.edit:addOption:Error in adding option for question" + err);
            }
        },

        deleteOption: function (oImag) {
            try {
                // Will delete the question option contorls [radio button and textbox].
                if ($("#" + me.defaults.quesOptions + " span").length > 1)
                    $(oImag).parent("span").remove();
            } catch (err) {
                ViTag.error("Visap.edit:deleteOption:Error in deleting option for question" + err);
            }
        },

        add: function (ques, fnPreSend, fnSuccess, fnError) {
            try {
                // Add new question to list
                var q = me.AddQuestion(ques);
                me.saveActions(q, fnPreSend, fnSuccess, fnError);
            } catch (err) {
                ViTag.error("Visap.edit:add:Error in adding new question" + err);
            }
        },

        edit: function (id, startTime, pausedtime) {
            try {
                // Get question object based on question ID
                ViTag.debug("visap.edit:editquestion: Delete all existing question option controls" + id + "," + startTime + "," + pausedtime);
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
            } catch (err) {
                ViTag.error("Visap.edit:question:edit: Error in editting question" + err);
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
            try {
                if (ns.editor.ckEditorAvailable()) {
                    //To over come Aelib question ck-editor we need to pass UrL to base path of ck-editor.
                    CKEDITOR.basePath = ViTag.config.ckEditorBasePathUrl;
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
                            ],
                            resize_enabled: false
                        });

                        //To open the link  web address in new browser tab.
                        CKEDITOR.on('dialogDefinition', function (ev) {
                            try {
                                var dialogName = ev.data.name;/* to get the name of the dialog */
                                var dialogDefinition = ev.data.definition;
                                if (dialogName === 'link') {
                                    var informationTab = dialogDefinition.getContents('target');  /* Getting the contents of the Target tab */
                                    var targetField = informationTab.get('linkTargetType');/* Getting the contents of the dropdown field "Target" so we can set it */
                                    targetField['default'] = '_blank'; // setting the value to "_blank".
                                }
                                if (dialogName === 'image') {
                                    var infoTab = dialogDefinition.getContents('info');//Getting the contents of the Image Info.
                                    infoTab.remove('cmbAlign'); //Remvoing Alignment text field.
                                }
                            } catch (err) {
                                ViTag.error("Visap.edit:editor:CKEDITOR dialogDefinition:" + err);
                            }
                        });

                        CKEDITOR.on('instanceReady', function (obj) {
                            setTimeout(function () {
                                //to override the default height of CK-Editor(whiteboard)
                                if (obj.editor.name === "cmtWiteboard") {
                                    $('.cke_path').css({ 'height': '18px', 'overflow-x': 'initial' });
                                    me.whiteboardData.EnableRadioButton();
                                }
                            }, 500);
                        });
                    }
                }
            } catch (err) {
                ViTag.error("Visap.edit:editor:CkEditor" + err);
            }
        },
        //It will return the html element content(if the ckeditor is undefined)
        //if the ckeditor is present then it will return the ckeditor element content.
        getValue: function (containerID) {
            ViTag.debug("Visap.edit:It will return the value of ckeditor:" + containerID);
            if (ns.editor.ckEditorAvailable() && CKEDITOR.instances[containerID.id])
                return ns.htmlEncode(CKEDITOR.instances[containerID.id].getData());
            else return $("#" + containerID.id).val();
        },
        //It will return plain text value of ckeditor(without html tag).
        getPlainText: function (containerID) {
            ViTag.debug("Visap.edit:getPlainText:It will return the plain text value of ckeditor:" + containerID);
            if (ns.editor.ckEditorAvailable() && CKEDITOR.instances[containerID.id]) {
                var txt = $.trim(CKEDITOR.instances[containerID.id].document.getBody().getText());
            }
            else
                txt = $.trim($("#" + containerID.id).val());
            return txt;
        },

        //It will check whether Ck-Editor contains data.
        isEditorEmpty: function (containerID) {
            ViTag.debug("Visap.edit:isEditorEmpty:It will check whether editor contains data :" + containerID);
            var text = ns.editor.getPlainText(containerID);
            var img = CKEDITOR.instances[containerID.id].document.$.images.length; //check for images.
            return (text.length <= 0 && img <= 0) ? false : true;
        },

        //It will set the html element content(if the ckeditor is undefined)
        //if the ckeditor is present then it will set the ckeditor element content.
        setValue: function (containerID, content) {
            ViTag.debug("Visap.edit:setValue:setValue of ckeditor:" + containerID + "," + content);
            if (ns.editor.ckEditorAvailable() && CKEDITOR.instances[containerID.id])
                CKEDITOR.instances[containerID.id].setData(ns.htmlDecode(content));
            else $("#" + containerID.id).val(unescape(content));
        },
        //to check the ckeditor is available or not
        ckEditorAvailable: function () {
            return (window.CKEDITOR !== undefined);
        },
        //to check the ckeditor instances is present or not.
        ckEditorInstanceAvilable: function (containerID) {
            return (CKEDITOR.instances[containerID.id]);
        }
    };

    /// <summary>
    ///Enabling the Sketch Tab and sketch related canvas elements
    /// </summary>
    /// <param name="time">start time</param>

    /// <param name="PTime">paused time</param>

    ns.enableSketchTabs = function (time, PTime, editedAction) {
        try {
            var imgoverlay = me.ctrl.$imgOverlay;
            ViTag.Actions = [];
            imgoverlay.hide();
            //TODO:
            // edit of the default sketch
            $('.' + me.defaults.canvascontainer).html("");
            ns.sketchcontainer = "sketchcontainerDefault";
            ns.resetSketches();
            ns.sketchDataDefault = editedAction.img;
            sketchv2.bgColor = editedAction.color; // addtional attr for bg color of the sketch container for v2 
            ns.setImager(ns.sketchDataDefault, me.defaults.canvascontainer);
            $('.' + me.defaults.canvascontainer).css("background-color", editedAction.color);//Adding background color
            ns.sketchDataWhiteboard = null;// empty other action edited values(base 64 string of the wb action to avoid undo)
            ns.showSketcher();
            internal.editSketchCreatedTime = time;
            internal.editSketchPausedTime = PTime;
            $("#" + me.defaults.sketchDuration).val(editedAction.duration);
        }
        catch (err) {
            ViTag.error("Visap.edit:enableSketchTabs: Error while enabling sketch" + err);
        }
    };

    /// <summary>
    ///Enable the Edit Panel with relevant elements
    /// </summary>
    ns.enableEditPanel = function () {
        try {
            internal.pauseTime = 1;

            // If the user in time line mode then other actions stufs are disabled.
            if (ViTag.isTimelIneMode) {
                ns.disabelEditPanel();
                $('#timelineContainer').show();
            }

            else {
                ns.disableEditMode = false;
                ViTag.isTimelIneMode = false;
                $('#timelineContainer').hide();
            }

            if (ns.yt.enabled == false) {
                if (me.ctrl.video.currentTime === 0) {
                    ns.disabelEditPanel();
                }
            }

            if (ViTag.tmVideoEnd)
                ns.disabelEditPanel();

            if (!me.ctrl.video.ended && !ns.disableEditMode && ns.CurrentSrc() != null) {
                internal.PrintTagsToEdit();
                internal.PrintLinksToEdit();
                internal.PrintQuestionToEdit();
                internal.PrintPauseTime();
                me.ctrl.$editContainer.animate({ opacity: 'show' }, 'slow');
                ns.showActions = false;
                $("body").trigger("enableActionContainer", ns.pauseByAction);
            }
            ns.suppressActions = true; // action should not be displayed on screen while in pause state

        }
        catch (err) {
            ViTag.error("Visap.edit:enableEditPanel: Error while enabling edit panel" + err);
        }
    };

    //To disable the editpanel this method will call from visap.js.
    //Since visap.edit.js is not referenced in home page.so we are triggering and handling this event.
    $("body").on("disableEditPanel", ns.disabelEditPanel);

    /// <summary>
    ///Disable Edit Panel
    /// </summary>
    ns.disabelEditPanel = function () {
        try {
            if (ViTag.isTimelIneMode) {
                // since time line mode invoke this method so need to check for Timeline mode also
                // action should not be displayed on screen while in timeline mode
                ns.suppressActions = true;
            } else {
                ns.suppressActions = false;
            }

            internal.pauseTime = -1;
            me.ctrl.$editContainer.hide();
            me.ctrl.$canvas.hide();
            ns.enableEditTool(false);
            ns.disableEditMode = true;
            //me.question.clearEntries(); //This line has to be modify for AElib.
            ns.showActions = true;
            ns.hideSketches();
            $("body").trigger("disableActionContainer");
        }
        catch (err) {
            ViTag.error("Visap.edit:enableEditPanel: Error while enabling edit panel" + err);
        }
    };

    ns.setPauseTm = function () {
        internal.pauseTime = 1;
    };

    //on change of duration by manullay,update video time(seekbar).
    ns.onChangeDuration = function (val, id,callback) {
        //Todo:timeline
        if (ViTag.CurrentSrc().sourcetype === 2)
            return;

        var duration = internal.getNumber(val);//Get duration value and convert it into int number.
        internal.updateSeekbar(duration, id,callback);//update video current time(seekbar).
    };

    //Increment duration of action and update video current time.
    ns.incDuration = function (id) {
        //Todo:timeline
        if (ViTag.CurrentSrc().sourcetype === 2)
            return;

        var duration = $("#" + id).val();//get duration value.
        duration = internal.getNumber(duration);//convert string to int number.
        internal.updateSeekbar(duration + 1, id);//add 1 to duration value to increment and upadate seekbar.
    };

    //Decrement duration of action and update video current time.
    ns.decDuration = function (id) {
        //Todo:timeline
        if (ViTag.CurrentSrc().sourcetype === 2)
            return;

        var duration = $("#" + id).val();//get duration value.
        duration = internal.getNumber(duration);//convert string to int number.
        //Validate:duration should be greater than 1 and current time. 
        if (duration > 1 && internal.getRoundOffValue(ViTag.getCurrentTime()) > 0)
            internal.updateSeekbar(duration - 1, id);//update video current time(seekbar).
        else
            internal.ShowMessage("playerEdit.msg_emptyduration", "Validation", "Duration");
    };

    //Reset to video pause time after adding/cancel of action.  
    ns.resetVidTm = function () {

        if (internal.pauseTime === -1 && internal.vidPauseTm !== null)
            ViTag.playAt(internal.vidPauseTm);//set seek bar to paused time.
    };

    ns.SaveTagAction = function () {

        var action = "tag.create";
        if (!internal.IsValid()) {
            internal.ShowMessage("playerEdit.msg_name", "Validation", "Tags.Saving");
            return false;
        }
        var t = internal.getRoundOffValue(ns.getCurrentTime());
        var d = me.ctrl.$tag.val();
        ViTag.debug("visap.edit:setTagControls:saving the tag" + t + "," + d);

        if (ns.CurrentTags()) {
            var u = $.grep(ns.CurrentTags(), function (u) {
                if (internal.editTagTime >= 0) {
                    if (u.d.toLowerCase() !== ns.desc.toLowerCase()) {
                        return unescape(u.d.toLowerCase()) === ($.trim(d)).toLowerCase();
                    }
                } else
                    return unescape(u.d.toLowerCase()) === ($.trim(d)).toLowerCase();

            })[0];
            if (u) {
                internal.ShowMessage("playerEdit.msg_tagpresent", "Validation", "Tags.Saving");
                return false;
            }
        }

        if (internal.editTagTime >= 0) {
            action = "tag.update";
            if ($.trim(me.ctrl.$tagTime.val()) === "") {
                internal.ShowMessage("playerEdit.msg_time", "Validation", "Tags.Saving");
                return false;
            }
            var tagTime = me.ctrl.$tagTime.val();
            ViTag.debug("Visap.edit:Tagtime" + tagTime);

            if (me.ctrl.$tagTime.val().indexOf(":") !== -1) {
                //to validate the tagtime when uer try to edit the tag time.
                if (ViTag.util.timeFormat(me.ctrl.$tagTime.val())) {
                    me.resetTagTime();
                    return false;
                }
                else tagTime = me.getTagTimeInseconds(me.ctrl.$tagTime.val());
            }

            if (parseInt(tagTime) >= ns.getDuration()) {
                internal.ShowMessage("playerEdit.msg_tagtime", "Validation", "Tags.Saving");
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
        ViTag.debug("Visap.edit:saveTagClick:Create tag for the time and description" + " " + t + "," + d);
        ns.AddAndSaveTag({ t: t, d: d },
            function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Tags.Saving"); },
            function () {
                me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Tags.Saved"); internal.renderAttrs();
                var eventCat = (action === "tag.create") ? ViTag.Events.createAction : ViTag.Events.editAction;
                //passing tag data to visap analytics while creating tag by raising event
                ns.passEventData(eventCat, "tag", { name: d, time: t });
            },
            function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Tags.SavingError"); });
        ns.handleSeekBar();
    };

    ns.CancelTagAction = function () {
        if (internal.editTagTime === -1)
            me.exitEditMode();
        else
            ns.enableEditTool(false);


    };

    ns.SaveLinkAction = function () {
        var action = "link.create";
        var n = me.ctrl.$linkName.val(),
            u = me.ctrl.$linkUrl.val();
        ViTag.debug("Visap.edit:setLinkControls:Link saved for the name and url" + n + "," + u);
        //To check the link name already present in the currentLinks,
        // if its already present then it not will allow to create the link with the same name.
        if (ns.CurrentLinks()) {
            var linkName = $.grep(ns.CurrentLinks(), function (lnk) {
                if (internal.editLink) {
                    action = "link.update";
                    if (unescape(lnk.n.toLowerCase()) !== ns.linkName.toLowerCase()) {
                        return unescape(lnk.n.toLowerCase()) === ($.trim(n)).toLowerCase();
                    }
                } else {
                    return unescape(lnk.n.toLowerCase()) === ($.trim(n)).toLowerCase();
                }

            })[0];
            if (linkName) {
                internal.ShowMessage("playerEdit.msg_linktime", "Validation", "Links.Saving");
                return false;
            }
        }
        //to check for the empty link name and URL
        if (ns.util.isTextFieldEmpty(n, "playerEdit.msg_name", "Validation", "Links.Saving") || ns.util.isTextFieldEmpty(u, "playerEdit.msg_url", "Validation", "Links.Saving")) {
            return false;
        }

        if (internal.validateURL(u)) {
            if (internal.editLink)
                internal.deleteLink(internal.editLink);   //to delete the link from the currentSrc 
            ns.AddLinks({ n: escape(n), u: u }, function () { internal.ShowMessage("Saving...", "Info", "Links.Saving"); },
                function () {
                    me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Links.Saved"); internal.renderAttrs();
                    var eventCat = (action == "link.create") ? ViTag.Events.createAction : ViTag.Events.editAction;
                    //passing link data to visap analytics while creating/editing link by raising event
                    ns.passEventData(eventCat, "link", { name: n, url: u });   //first parameter is type and second one is action 		
                },

                function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Links.SavingError"); });
        }
        else {
            internal.ShowMessage("playerEdit.msg_validurl", "Validation", "Links.Saving");
        }
        return;
    };

    ns.CancelLinkAction = function () {

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
        width: "180",
        left: "0px",
        top: "0px"

    };

    ns.SaveAnnotationAction = function () {

        var ti = me.ctrl.$cmtTitle.val(),
            edit = false, type = 'annotation',
            d = me.ctrl.$cmtDuration.val(),
            t = internal.getPausedTime(),//reset to pause time.
            width, height, left, top, PauseOnShow;
        me.ctrl.$annotatePauseOnShow.is(":checked") === true ? PauseOnShow = true : PauseOnShow = false;

        var de = ns.editor.getValue(cmtDesc);

        //To capture the annotation left and top positon on the video and height and width.
        width = ns.annotationAttr.width;
        height = ns.annotationAttr.height;
        left = ns.annotationAttr.left;
        top = ns.annotationAttr.top;

        if (internal.editAnnotation) {
            edit = true;
            t = internal.editAnnotation.t;
        }


        if (ns.ispreview) {
            ns.ispreview = false;
            width = $('#annotates').outerWidth();
            height = $('#annotates').outerHeight();
            left = $('#annotates')[0].style.left;
            top = $('#annotates')[0].style.top;
        }

        else {
            if (!edit) {
                me.ctrl.$annotates.css({ left: "0px", width: "0px", top: "0px" });
            }
        }

        ns.editAns = false;
        ViTag.debug("Visap.edit:exit criteria from the edit annotation mode is cancel and save annotation." + left + "," + top + "," + de + "," + d + "," + ti);

        // Validation for title and duration. 
        if (ns.util.isTextFieldEmpty(ti, "playerEdit.msg_title", "Validation", "Action.annotation.Saving") ||
            ns.util.isTextFieldEmpty(d, "playerEdit.msg_duration", "Validation", "Action.annotation.Saving") ||
            ns.util.isDurationZero(d, "playerEdit.msg_greaterduration", "Validation", "Action.annotation.Saving", me.ctrl.$cmtDuration) ||
            ns.util.isCharacterExist(d, "playerEdit.msg_validnumbers", "Validation", "Action.annotation.Saving", me.ctrl.$cmtDuration) ||
            ns.util.checkMaxDuration(d, "playerEdit.msg_maxduration", "Validation", "Action.annotation.Saving", me.ctrl.$cmtDuration)) {

            return false;
        }

        //Validation for annotation ckeditor.
        else if (ns.editor.isEditorEmpty(cmtDesc) === false) {
            internal.ShowMessage('playerEdit.msg_description', "Validation", "Action.annotation.Saving");
            return false;
        }
        d = parseInt(me.ctrl.$cmtDuration.val());


        if (!edit) {
            var restduration = internal.getRemainingDuration();
            if (restduration < d) {
                if (restduration < 1) {
                    internal.ShowMessage("playerEdit.msg_maxdurationreached", "Validation", "Action.annotation.Saving");
                }
                else {
                    internal.ShowMessage(ViTag.getLocalizeValue("playerEdit.msg_lessduration") + " " + ns.getTimeFormat(restduration + 1) + " " + ViTag.getLocalizeValue("playerEdit.sec"), "Validation", "Action.annotation.Saving");
                }
                me.ctrl.$cmtDuration.val("");
                return false;
            }

            ViTag.debug("Visap.edit:if we set the top value to 0 then the annotation will dispaly completely top of the video, so adding 34 px to set the position exactly below the title.");
            ns.AddAndSaveAnnotate({ ti: escape(ti), de: de, t: t, d: d, PauseOnShow: PauseOnShow, AnnotationAttributes: { left: left, top: top, height: height + "px", width: width + "px" } },
                function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Action.annotation.Saving"); },
                function () {
                    me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Action.annotation.Saved"); internal.renderAttrs();
                    //passing annotation data to visap analytics while creating annotation by raising event
                    ns.passEventData(ViTag.Events.createAction, type, { title: ti, duration: d, PauseOnShow: PauseOnShow, StartTime: t });
                    internal.hideAction(ViTag.actionType.annotation);
                },
                function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action.annotation.SavingError"); });


        }
        else {
            //if not preview then height, width, top and left should be assigned to already saved value.
            //if not preview then ns.annotationAttr.height and height will remain same.
            if (ns.annotationAttr.height === height && ns.annotationAttr.width === width) {
                height = parseFloat(internal.editAnnotation.height);
                width = parseFloat(internal.editAnnotation.width);
            }
            if (ns.annotationAttr.left === left && ns.annotationAttr.top === top) {
                left = parseFloat(internal.editAnnotation.left);
                top = parseFloat(internal.editAnnotation.top);
            }
            //Validate while editing duration of the action.
            if (!internal.remainingVidDuration(internal.editAnnotation.t, d, type))
                return false;
            ns.updateActionsList(type, internal.editAnnotation.t, internal.editAnnotation.pausedTime, { ti: ti, de: de, time: t, duration: d, PauseOnShow: PauseOnShow, AnnotationAttributes: { left: left + "px", top: top + "px", height: height + "px", width: width + "px" } });
            internal.editAnnotation = null;
        }
        ns.AnnotateEditTool(null);
        ViTag.initAnnotator();

        ns.handleSeekBar();
        if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
        return true;
    };

    ns.CancelAnnotationAction = function () {
        if (internal.editAnnotation) {
            ns.AnnotateEditTool();
        }
        else {
            me.exitEditMode();
            ViTag.RenderCurrentAnnotates(null);
        }
        ns.editAns = false; //exit criteria from the edit annotation mode is cancel and save annotation.
    };

    ns.SaveQuestionAction = function () {
        internal.createDefaultQuestion();
        ns.handleSeekBar();
    };

    ns.CancelQuestionAction = function () {
        //if (!ns.question.editQuesID)
        //   ns.setDropdown();
        me.question.clearEntries();
    };

    ns.SaveHotspotAction = function () {
        var ti = me.ctrl.$hotspotTittle.val(),
            edit = false, type = 'hotspot', left, top,
            d = me.ctrl.$hotspotDuration.val(), showOnpause;
        if (me.ctrl.$hotspotOnpause.is(":checked"))
            showOnpause = 1;
        else
            showOnpause = 0;

        var t = internal.getPausedTime(),//reset to pause time.
            de = me.ctrl.$hotspotContent.val();
        left = ($('#videoMainContainer').width() / 2) + "px";
        top = ($('#videoMainContainer').height() / 2) + "px";

        if (internal.editHotspotvalues) {
            edit = true;
            t = internal.editHotspotvalues.t;
        }
        if (me.ctrl.$hotspotCircle.css("left") !== "auto") {
            if (edit && !ns.previewModehotspot) {
                left = internal.editHotspotvalues.left;
                top = internal.editHotspotvalues.top;
            }
            else if (ns.previewModehotspot && me.ctrl.$hotspotCircle.css("left") !== ($('#videoMainContainer').width() / 2) + "px" && ($('#videoMainContainer').height() / 2 + "px") !== me.ctrl.$hotspotCircle.css("top")) {
                left = me.ctrl.$hotspotCircle.css("left");
                top = me.ctrl.$hotspotCircle.css("top");
            }
        }
        ns.editPreviewHS = false;
        ViTag.debug("visap.edit:hotspotsave:exit criteria from the edit hotspot mode is cancel and save hotspot" + left + "," + top);

        //Validation for title,duration and description.  
        if (ns.util.isTextFieldEmpty(ti, "playerEdit.msg_title", "Validation", "Action.hotspot.Saving") ||
            ns.util.isTextFieldEmpty(d, "playerEdit.msg_duration", "Validation", "Action.hotspot.Saving") ||
            ns.util.isDurationZero(d, "playerEdit.msg_greaterduration", "Validation", "Action.hotspot.Saving", me.ctrl.$hotspotDuration) ||
            ns.util.isCharacterExist(d, "playerEdit.msg_validnumbers", "Validation", "Action.hotspot.Saving", me.ctrl.$hotspotDuration) ||
            ns.util.checkMaxDuration(d, "playerEdit.msg_maxduration", "Validation", "Action.hotspot.Saving", me.ctrl.$hotspotDuration) ||
            ns.util.isTextFieldEmpty(de, "playerEdit.msg_description", "Validation", "Action.hotspot.Saving")) {
            return false;
        }
        d = parseInt(me.ctrl.$hotspotDuration.val());
        if (!edit) {
            var restduration = internal.getRemainingDuration();
            me.ctrl.$hotspotCircle.attr('draggable', 'false');
            if (restduration < d) {
                if (restduration <= 1) {
                    internal.ShowMessage("playerEdit.msg_maxdurationreached", "Validation", "Action.hotspot.Saving");
                }
                else {
                    internal.ShowMessage(ViTag.getLocalizeValue("playerEdit.msg_lessduration") + " " + ns.getTimeFormat(restduration + 1) + " " + ViTag.getLocalizeValue("playerEdit.sec"), "Validation", "Action.hotspot.Saving");
                }
                me.ctrl.$hotspotDuration.val("");
                return false;
            }
            ViTag.debug("visap.edit:hotspotsave:Adding the Hotspot having tittle and desc" + " " + ti + "," + de);
            ns.AddAndSaveHotspot({ ti: escape(ti), de: escape(de), t: t, d: d, showOnpause: showOnpause, hotspotAttributes: { left: left, top: top } },
                function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Action.hotspot.Saving"); },
                function () {
                    me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Action.hotspot.Saved"); internal.renderAttrs();
                    //passing hotspot data to visap analytics while creating hotspot by raising event
                    ns.passEventData(ViTag.Events.createAction, type, { StartTime: t, title: escape(t), duration: d, showOnpause: showOnpause });
                    internal.hideAction(ViTag.actionType.hotspot);
                },
                function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action.hotspot.SavingError"); });


        }
        else {
            //Validate while editing duration of the action.
            if (!internal.remainingVidDuration(internal.editHotspotvalues.t, d, type))
                return false;
            ns.updateActionsList(type, internal.editHotspotvalues.t, internal.editHotspotvalues.pausedTime, { ti: ti, time: t, de: de, duration: d, showOnpause: showOnpause, hotspotAttributes: { left: left, top: top } });
            internal.editHotspotvalues = null;
        }
        ns.HotspotEditTool(null);
        ViTag.initHotspot();
        ns.handleSeekBar();
        if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
        return true;

    };

    ns.CancelHotspotAction = function () {

        if (internal.editHotspotvalues) {
            ns.HotspotEditTool();
        }

        else {
            me.exitEditMode();
            ViTag.RenderCurrentHotspot(null);
        }
        ns.editPreviewHS = false; //exit criteria from the edit hotspot mode is cancel and save hotspot.
    };

    ns.SaveSketchAction = function () {
        // EDIT scenario :When reset the sketch sketchDataDefault is not empty and hence no need to check for v2 sketch
        if (!ns.isSketchEmpty()) {
            internal.ShowMessage("playerEdit.msg_sketch", "Validation", "Action.sketch.Saving");
            return false;
        }
        var t = internal.getPausedTime();//reset to pause time.
        var imager = ns.getImager();
        var i = imager.imgdata;
        var bgcolor = imager.color; //for v2 bg color of the sketch container is needed

        var edit = false;
        var type = "sketch";
        var duration = $("#" + me.defaults.sketchDuration).val();//$("#" + me.defaults.sketchDuration).val(); TODO:

        //Validation for duration
        if (ns.util.isTextFieldEmpty(duration, "playerEdit.msg_duration", "Validation", "Action.sketch.Saving") ||
            ns.util.isDurationZero(duration, "playerEdit.msg_greaterduration", "Validation", "Action.sketch.Saving", $("#" + me.defaults.sketchDuration)) ||
            ns.util.isCharacterExist(duration, "playerEdit.msg_validnumbers", "Validation", "Action.sketch.Saving", $("#" + me.defaults.sketchDuration)) ||
            ns.util.checkMaxDuration(duration, "playerEdit.msg_maxduration", "Validation", "Action.sketch.Saving", $("#" + me.defaults.sketchDuration))) {
            return false;
        }

        duration = parseInt($("#" + me.defaults.sketchDuration).val());

        if (internal.editSketchCreatedTime !== "") {
            edit = true;
        }

        if (!edit) {
            var restduration = internal.getRemainingDuration();
            if (restduration < duration) {
                if (restduration < 1) {
                    internal.ShowMessage("playerEdit.msg_maxdurationreached", "Validation", "Action.sketch.Saving");
                }
                else {
                    internal.ShowMessage(ViTag.getLocalizeValue("playerEdit.msg_lessduration") + " " + ns.getTimeFormat(restduration + 1) + " " + ViTag.getLocalizeValue("playerEdit.sec"), "Validation", "Action.sketch.Saving");
                }
                $("#" + me.defaults.sketchDuration).val("");
                return false;
            }
            ViTag.debug("Visap.edit:saveOverlay:saving sketch for time and duration:" + t + "," + duration);
            ns.AddOverlay({ t: t, i: i, color: bgcolor, d: parseInt(duration) }, function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Action.sketch.Saving"); },
                function () {
                    me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Action.sketch.Saved"); internal.renderAttrs();
                    //passing sketch data to visap analytics while creating sketch by raising event
                    ns.passEventData(ViTag.Events.createAction, type, { StartTime: t, duration: duration });
                },
                function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action.sketch.SavingError"); });
        }
        else {
            ViTag.debug("Visap.edit:updateSketch:Editing the sketch for having time and duration:" + t + "," + duration);
            //Validate while editing duration of the action.
            if (!internal.remainingVidDuration(internal.editSketchCreatedTime, duration, type))
                return false;
            ns.updateActionsList(type, internal.editSketchCreatedTime, internal.editSketchPausedTime, { t: t, i: i, color: bgcolor, duration: duration });
            internal.editSketchCreatedTime = "";
        }

        ns.initSketcher();
        if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());

        ns.handleSeekBar();
        $("#" + me.defaults.sketchDuration).val("")
        // ViTag.resetSketches();
    };

    ns.CancelSketchAction = function () {
        if (internal.editSketchCreatedTime !== "") {
            $("#" + me.defaults.sketchDuration).val("");
            me.ctrl.$clear.click();
            internal.editSketchCreatedTime = "";
            ns.resetSketches();
        }
        else {
            $("#" + me.defaults.sketchDuration).val("");
            me.ctrl.$clear.click();
            me.ctrl.$canvas.hide();
            me.ctrl.$imgOverlay.hide();
            ns.hideSketches();
            me.exitEditMode();
        }
    };

    ns.SaveWhiteboardAction = function () {

        ViTag.debug("Visap.edit:whiteboardsave:saving whiteboard to database");
        var edit = false, type = 'whiteboard',
            duration = me.ctrl.$whiteboardDuration.val(),
            CurrentVideoTime = internal.getPausedTime(),//reset to pause time.
            sketchData = "", PauseOnShow;
        //set PauseOnShow as true if PauseOnShow checkbox is checked.
        me.ctrl.$whiteboardPauseOnShow.is(":checked") === true ? PauseOnShow = true : PauseOnShow = false;
        var whiteboardPosition = $('input[name="direction"]:checked').val();

        if (internal.whiteboardTextData) {
            var description = internal.whiteboardTextData;
        }
        else {
            description = ns.editor.getValue(cmtWiteboard);
        }
        internal.whiteboardTextData = null;//clear value.
        // while saving sketch in text node of WB: Text $textcontent height has to set to get the image without going to sketch mode 
        me.ctrl.$textcontent.html(ViTag.htmlDecode(description));
        me.ctrl.$textcontent.show();

        var width = me.ctrl.$wboardContainer.css("width");
        var sketcher = $('#sketcher')[0];
        var isSketchEmpty = ns.isSketchEmpty();//Check whether sketch is drawn or not.
        ViTag.debug("Visap.edit:whiteboardsave:check for the sketch data,width,description,postion,pauseOnShow" + sketcher + "," + width + "," + whiteboardPosition + "," + PauseOnShow);

        if (sketcher !== undefined && isSketchEmpty === true) {
            var imager = ns.getImager();
            sketchData = imager.imgdata;
        }


        ViTag.debug("Visap.edit:whiteboardsave click:exit criteria from the edit whiteboard mode is cancel and save whiteboard.");
        ns.editwhitebaord = false;

        if (internal.editWhiteboard) {
            edit = true;
            CurrentVideoTime = internal.editWhiteboard.CurrentVideoTime;

        }

        //Validation:Empty data are not allowed.
        if (sketchData === "" && ns.editor.isEditorEmpty(cmtWiteboard) === false) {
            internal.ShowMessage("playerEdit.msg_wbempty", "Validation", "Action.whiteboard.Saving");
            return;
        }
        if (ns.util.isTextFieldEmpty(duration, "playerEdit.msg_duration", "Validation", "Action.whiteboard.Saving") ||
            ns.util.isDurationZero(duration, "playerEdit.msg_greaterduration", "Validation", "Action.whiteboard.Saving", me.ctrl.$whiteboardDuration) ||
            ns.util.isCharacterExist(duration, "playerEdit.msg_validnumbers", "Validation", "Action.whiteboard.Saving", me.ctrl.$whiteboardDuration) ||
            ns.util.checkMaxDuration(duration, "playerEdit.msg_maxduration", "Validation", "Action.whiteboard.Saving", me.ctrl.$whiteboardDuration)) {
            return false;
        }

        duration = parseInt(me.ctrl.$whiteboardDuration.val());
        if (!edit) {
            var remaingVideoDuration = internal.getRemainingDuration();
            if (remaingVideoDuration < duration) {
                if (remaingVideoDuration < 1) {
                    internal.ShowMessage("playerEdit.msg_maxdurationreached", "Validation", "Action.whiteboard.Saving");
                }
                else {
                    internal.ShowMessage(ViTag.getLocalizeValue("playerEdit.msg_lessduration") + " " + ns.getTimeFormat(remaingVideoDuration + 1) + " " + ViTag.getLocalizeValue("playerEdit.sec"), "Validation", "Action.whiteboard.Saving");
                }
                me.ctrl.$whiteboardDuration.val("");
                return false;
            }
            ns.AddAndSaveWhiteboard({ description: description, CurrentVideoTime: CurrentVideoTime, duration: duration, sketchData: sketchData, PauseOnShow: PauseOnShow, whiteboardPosition: whiteboardPosition, whiteboardAttributes: { width: width } },
                function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Action.whiteboard.Saving"); },
                function () {
                    me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Action.whiteboard.Saved"); internal.renderAttrs();
                    //passing whiteboard data to visap analytics while creating whiteboard by raising event
                    ns.passEventData(ViTag.Events.createAction, type, { StartTime: CurrentVideoTime, duration: duration, whiteboardPosition: whiteboardPosition, PauseOnShow: PauseOnShow });
                },
                function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action.whiteboard.SavingError"); });
        }
        else {
            //Validate while editing duration of the action.
            if (!internal.remainingVidDuration(internal.editWhiteboard.t, duration, type))
                return false;
            ns.updateActionsList(type, internal.editWhiteboard.t, internal.editWhiteboard.pausedTime, { description: description, CurrentVideoTime: CurrentVideoTime, duration: duration, sketchData: sketchData, PauseOnShow: PauseOnShow, whiteboardPosition: whiteboardPosition, whiteboardAttributes: { width: width } });
            internal.editWhiteboard = null;
        }
        ns.WhiteboardEditTool(null);
        ViTag.initWhiteboard();
        me.ctrl.$whiteBoardWrapper.show();
        ns.handleSeekBar();
        if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
        ns.hideSketches();
        ns.whiteboardSketchReset();
        return true;
    };

    // A common Method invoked when WB is created and deleted: 
    ns.whiteboardSketchReset = function () {
        me.ctrl.$textcontent.hide();
        ns.showTextWB(true);
        ns.isSketchInitialisedforWB = false;
        internal.wasTextMode = true;
    }

    ns.CancelWhiteboardAction = function () {
        if (internal.editWhiteboard) {
            ns.WhiteboardEditTool();
            ns.whiteboardSketchReset();
        }
        else {
            me.exitEditMode();
            ViTag.RenderCurrentWhiteboard(null);
        }

        ns.editwhitebaord = false; //exit criteria from the edit whiteboard mode is cancel and save whiteboard.
    };

    //creating time line video.
    ns.tmLineSave = function (data, fnPreSend, fnSuccess, fnError) {
        var childEles = $("#tmLineSnapshot").children();
        var snapData = me.getTmLineData(data.title, data.description, childEles);
        me.SaveTimeLine(JSON.stringify([snapData]), fnPreSend, fnSuccess, fnError);
    };

    //create and edit timeline functionality starts.
    ns.timeLineSave = function () {
        var analyticsObj = {};
        var tmLnTitle = $.trim(me.ctrl.$tmTitle.val());
        var description = me.ctrl.$tmDesc.val();

        if (ns.util.isTextFieldEmpty(tmLnTitle, "playerEdit.msg_title", "Validation", "Timeline.Saving") || ns.util.isTextFieldEmpty(me.ctrl.$tmDesc.val(), "playerEdit.msg_description", "Validation", "Timeline.Saving")) {  //validation for the timeline video.
            return false;
        }
        var childEles = $("#startcapture").children(), tempData = [];
        if (childEles.length <= 0) {
            internal.ShowMessage("playerEdit.msg_timelinecapture", "Validation", "Timeline.Saving");
            return false;
        }
        ViTag.debug("visap.edit:timelineSaveBtn.click: Timeline save  for the tittle and description" + tmLnTitle + "," + me.ctrl.$tmDesc.val());

        if (ViTag.source && !(ViTag.util.tittleDuplicateCheck(ViTag.editTimelineMode ? ViTag.editTmSrcdetials._id : 0, tmLnTitle.toLowerCase()))) {//While creating Id should be zero.
            internal.ShowMessage("playerEdit.msg_duplicatetitle", "Validation", "Timeline.Saving");
            return false;
        }

        var childEles = $("#startcapture").children();

        var timelinevideo = me.getTmLineData(tmLnTitle, description, childEles);

        ns.createTimeline(JSON.stringify([timelinevideo]), function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Timeline.create.Saving"); },
            function (vidId) {
                internal.ShowMessage("playerEdit.msg_saved", "Info", "Timeline.create.Saved");
                ns.loadData(ViTag.mode, sessionStorage.getItem('AppUser'));
                var eventCategory = "";
                //to post data to GA
                eventCategory = (timelinevideo._id === undefined) ? ViTag.Events.add : ViTag.Events.edit;
                timelinevideo._id = vidId;
                //passing event data to visap analytics for timele video create and edit.
                ns.passEventData(eventCategory, "", timelinevideo);

                $("#tmTitle").val("");
                $("#tmDesc").val("");
                $("#startcapture").html("");
                ViTag.isTimelIneMode = false;
                me.ctrl.$timelineContainer.animate({ opacity: 'hide' }, 1500);
            },
            function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Timeline.create.SavingError"); });

    };
    //create and edit timeline functionality ends.

    //timeline cancel functinality starts

    ns.timeLineCancel = function () {
        ViTag.debug("Visap.edit:timeline cancel");
        var deleteConfirmation = confirm("Do you want to Cancel?");
        if (deleteConfirmation) {
            ns.loadData(ViTag.mode, sessionStorage.getItem('AppUser'));
            me.ctrl.$timelineContainer.animate({ opacity: 'hide' }, 'slow');
            ViTag.isTimelIneMode = false;
            $("#CaptureBtn").removeClass('endCapture').addClass('startCapture');
            ns.clearTimer();
        }
    };
    //timeline cancel functinality ends.

    //This method will send authToken and videoToken to analytics service.
    //Analytics service will call ssoAuth service to validate token.
    //if token is validated,Report page will display.
    ns.viewReports = function () {
        try {

            //This method will get the video token
            if ((ViTag.tokenId === null || ViTag.tokenId === undefined) && ViTag.tokenURL != null && ViTag.CurrentSrc().sourcetype != ViTag.sourceTypeEnum.uploaded) {
                ViTag.getVideoAuthToken(ViTag.videoId);
            }

            var authToken = sessionStorage.getItem('authT'); //get auth token.
            var videoToken = ViTag.tokenId; //get video token.

            if ((videoToken !== null || videoToken !== undefined) || (authToken !== null || authToken !== undefined)) {
                me.ctrl.$viewReports.attr('href', ViTag.config.analyticsReports + '?authToken=' + authToken + '&videoToken=' + videoToken);
            }

        } catch (err) {
            ViTag.error("visap.edit:viewReports:Error while getting reports " + err);
        }
    };

    //#endregion Public

    //#region Private

    var internal = {
        ckTopHeight: '',
        ckBottomHeight: '',
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
        wbTxtHeight: '',
        sketcherData: null,
        imager: null,
        pauseTime: null,
        vidPauseTm: null,
        wasTextMode: true,
        isDragging: false,
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
            return ($.trim(me.ctrl.$tag.val()) !== "");
        },

        //Converts string to int number.
        getNumber: function (value) {
            return isNaN(parseInt(value)) ? 0 : parseInt(value, 10);//converting string to int number
        },

        getPausedTime: function (tooltype) {
            if (internal.vidPauseTm != null && tooltype !== "questions" && ViTag.CurrentSrc().sourcetype !== ViTag.sourceTypeEnum.timeline) {
                ViTag.playAt(internal.vidPauseTm);//set seek bar to paused time.
                return internal.vidPauseTm;
            }
            else
                return ViTag.getCurrentTime();
        },

        //Update seekbar 
        updateSeekbar: function (duration, id,callback) {
            //for youtube videototalduration should be subtract by 1.
            if (ViTag.CurrentSrc().sourcetype === ViTag.sourceTypeEnum.youtube)
                var vidDuration = ns.CurrentSrc().videototalduration - 1;
            else
                vidDuration = ns.CurrentSrc().videototalduration;

            if (internal.pauseTime === 1)//get pause time.
                internal.vidPauseTm = internal.getRoundOffValue(ViTag.getCurrentTime());

            if ((internal.vidPauseTm + duration) > vidDuration) {// Validate:duration should not exceed video duration.
                $("#" + id).val("");
                if(callback){
                   callback();
                   return;
                }else{
                    return internal.ShowMessage("playerEdit.msg_maxdurationreached", "Validation", "Duration");
                }
                
            }
            ViTag.playAt(internal.vidPauseTm + duration);//set seek bar to paused time.
            if (duration === 0) {
                $("#" + id).val("");
            }
            else {
                $("#" + id).val(duration); //Assign duration.
            }
            internal.pauseTime = -1;
        },

        /// <summary>
        /////validates Url against Regex
        /// </summary>
        validateURL: function (urlToValidate) {
            ViTag.debug("Visap.edit:validateURL: URL check:" + urlToValidate);
            var myRegExp = /(ftp|http|https):\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            if (!myRegExp.test(urlToValidate)) {
                return false;
            } else {

                return true;
            }
        },
        /// <summary>
        /////validates video file name.
        /// </summary>
        validateFileName: function (vidname) {
            var specialChars = "#%&*+|\:<>?'\"\\";
            for (var i = 0; i < specialChars.length; i++) {
                if (vidname.indexOf(specialChars[i]) > -1) {
                    return true
                }
            }
            return false;
        },

        /// <summary>
        /////validates the value against regular expression
        /// </summary>

        validateString: function (val) {
            ViTag.debug("Visap.edit:validateString: validates string:" + val);
            var pattern = /^(.*?[a-zA-Z0-9].*)$/;
            if ((!val.match(pattern))) {
                return false;
            }
            else
                return true;
        },
        checkCategory: function (videoCategory, isvalid) {

            if (isvalid) {
                internal.ShowMessage("playerEdit.msg_categoryblank", "Validation", "Upload.Saving");
                return false;
            }
            for (var catgr in videoCategory) {
                if (!internal.validateString(videoCategory[catgr])) {
                    internal.ShowMessage("playerEdit.msg_nonsupportedcategory", "Validation", "Upload.Saving");
                    return false;
                }
            }

            return true;
        },
        validateVideoCategory: function (videoCategory) {
            var isvalid = false;
            if (videoCategory.substring(0, 1) === " ") {
                isvalid = true;
            }
            var category;
            if (videoCategory !== '') {
                ViTag.debug("visap.edit:upload:category added are" + videoCategory);

                if (videoCategory.indexOf(',') !== -1) {
                    var vidCategory = videoCategory.trim().replace(/,{1,}$/, '');//remove the comma at the end 
                    category = vidCategory.split(/\s*,\s*/);
                    isvalid = internal.isCategoryEmpty(category);
                    category = ns.util.duplicateCheck(category);
                    //if(ViTag.isEditTittleDesc){category =  escape(category);}
                    if (!internal.checkCategory(category, isvalid)) { return false; }
                }
                else {
                    var singleVideoCategory = [];
                    singleVideoCategory.push(videoCategory);
                    if (!internal.checkCategory(singleVideoCategory, isvalid)) { return false; }
                }
            }
            return true;
        },

        getRoundOffValue: function (seconds) {
            var flvalue = Math.floor(seconds);
            ViTag.debug("Visap.edit:getRoundOffValue:" + flvalue);
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
            me.ctrl.$aelibTagList.html("");
            me.ctrl.$aelibTagList.append("<option value='' id='tagText' data-i18n='playerEdit.msg_tag'></option>");
            ViTag.localize($("#tagText"));
            if (ns.CurrentTags()) {
                ns.CurrentTags().forEach(function (tag) {
                    if (ns.questionType === ViTag.actionSourceType.nativequestion) {
                        me.ctrl.$dtTagList.append("<option value='" + unescape(tag.d) + "'>");
                    }
                    else
                        me.ctrl.$aelibTagList.append("<option value='" + unescape(tag.d) + "'>" + unescape(tag.d) + "</option>");
                });
            }
        },
        // Video attribute print to Edit -End- 

        //Video attribute Update actions
        updateActionsList: function (type, time, pausedTime, actionObj, fnPreSend, fnSuccess, fnError) {
            ViTag.info("Visap.edit:updateActionsList:Editing action of type" + type);
            var Listactions = ns.getPausedAction(pausedTime);
            var action = ns.getEditedListAction(type, Listactions, time);
            if ((action === null || action === undefined) && (actionObj === null || actionObj === undefined)) {
                internal.ShowMessage("playerEdit.msg_error", "Info", "ActionSavingError");
                return;
            } else {
                var editedAction = action.data;

                if (type === 'sketch') {
                    ViTag.debug("Visap.edit:updateActionsList:Edit Sketch which is at the pause time " + pausedTime);
                    editedAction.img = actionObj.i;
                    editedAction.duration = actionObj.duration;
                    editedAction.color = actionObj.color;
                }

                if (type === 'annotation') {
                    ViTag.debug("Visap.edit:updateActionsList:Edit annotation which has tittle and description " + " " + actionObj.ti + "," + actionObj.de);
                    editedAction.title = actionObj.ti;
                    editedAction.description = actionObj.de;
                    editedAction.PauseOnShow = actionObj.PauseOnShow;
                    editedAction.duration = actionObj.duration;
                    editedAction.AnnotationAttributes.left = actionObj.AnnotationAttributes.left;
                    editedAction.AnnotationAttributes.top = actionObj.AnnotationAttributes.top;
                    editedAction.AnnotationAttributes.height = actionObj.AnnotationAttributes.height;
                    editedAction.AnnotationAttributes.width = actionObj.AnnotationAttributes.width;

                }
                if (type === 'questions') {
                    ViTag.debug("Visap.edit:updateActionsList:Edit questions which has tittle and description " + " " + actionObj.q);
                    editedAction.qtitle = actionObj.q;
                    editedAction.options = actionObj.o;
                    editedAction.qans = actionObj.a;
                    editedAction.qtag = actionObj.r;
                    editedAction.qtitle = actionObj.q;
                    editedAction.duration = 2;

                }
                if (type === 'hotspot') {
                    ViTag.debug("Visap.edit:updateActionsList:Edit hotspot which has tittle and description:" + " " + actionObj.ti + "," + actionObj.de);
                    editedAction.title = actionObj.ti;
                    editedAction.description = actionObj.de;
                    editedAction.showOnpause = actionObj.showOnpause;
                    editedAction.duration = actionObj.duration;
                    editedAction.hotspotAttributes.left = actionObj.hotspotAttributes.left;
                    editedAction.hotspotAttributes.top = actionObj.hotspotAttributes.top;

                }
                if (type === 'whiteboard') {
                    ViTag.debug("Visap.edit:updateActionsList:Edit whiteboard which has description:" + " " + actionObj.description);
                    editedAction.description = actionObj.description;
                    editedAction.whiteboardPosition = actionObj.whiteboardPosition;
                    editedAction.sketchData = actionObj.sketchData;
                    editedAction.PauseOnShow = actionObj.PauseOnShow;
                    editedAction.duration = actionObj.duration;
                    editedAction.whiteboardAttributes.width = actionObj.whiteboardAttributes.width;

                }
                me.saveActions(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
                ns.handleSeekBar();
                return;
            }
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
            ViTag.debug("Visap.edit:RemoveTag: Editing the tag saving for the desc" + d);
            var flag = internal.deleteTag(d);               //flag value is true if the tag is deleted, if it is false it will be mapped to question.
            if (flag) {
                me.saveActions(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
                ns.handleSeekBar();
            }
            return flag;

        },

        //to delete the tag and to check the tag is mapped to the question
        deleteTag: function (d) {
            if (ns.CurrentTags()) {
                for (var i = 0; i < ns.CurrentTags().length; i++) {
                    if (ns.CurrentTags()[i].d === d) {
                        if (ns.CurrenQuestList() !== undefined && ns.CurrenQuestList().length !== 0) {
                            for (var j = 0; j < ns.CurrenQuestList().length; j++) {
                                if (ns.CurrenQuestList()[j].data.qtag === d) {
                                    internal.ShowMessage('playerEdit.msg_mappedtag', "Validation", "Tags.Saving");
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
            ViTag.debug("Visap.edit:RemoveActionList: Removing the actions" + t);
            var actions = ns.CurrentSrc().actions;
            if (actions.length > 0) {
                var listactions = internal.getPausedAction(actions, t);//gets listactions.
                var filenames = internal.getAllImgFileNames(listactions);//Get filenames uploaded by ck-editor.
                var questionIds = internal.getQuestionIds(listactions);
                for (var i = 0; i < actions.length; i++) {
                    if (actions[i].currentTime === parseInt(t)) {
                        actions.splice(i, 1);
                        me.saveActions(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError, filenames, questionIds);
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
        RemoveAction: function (time, pausedTime, questionId, fileNames, fnPreSend, fnSuccess, fnError) {
            ViTag.debug("Visap.edit:RemoveAction: Removing the action" + time + "," + pausedTime);
            var actions = ns.CurrentSrc().actions;
            var pauseTm = pausedTime;
            if (actions.length > 0) {
                var action = internal.getPausedAction(actions, pausedTime);//gets listactions.
                internal.deleteActionList(action, time);//deletes selected action.
                if (action.listAction.length > 0) {
                    action.currentTime = action.listAction[0].data.StartTime;
                    pauseTm = action.listAction[0].data.StartTime;
                }
                me.saveActions(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError, fileNames, questionId);
                ViTag.getSpecAction(pauseTm);
                internal.PrintPauseTime();
                ns.handleSeekBar();
                return;
            }
        },

        //this method retuns listactions.
        getPausedAction: function (actions, PausedTm) {
            //loop through the actions  and compare currenttime with paused time
            for (var i = 0; i < actions.length; i++) {
                if (parseInt(PausedTm) === actions[i].currentTime) {
                    ns.pauseActionIndex = i;
                    return actions[i];
                }
            }
        },

        //this method deletes specific listaction.
        deleteActionList: function (action, time) {
            for (var i = 0; i < action.listAction.length; i++) {
                if (parseInt(time) === action.listAction[i].data.StartTime) {
                    action.listAction.splice(i, 1);
                    return;
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
            ViTag.debug("Visap.edit:RemoveLink: Removing the link" + n);
            var flag = internal.deleteLink(n);               //flag value is true if the link is deleted.
            if (flag) {
                me.saveActions(JSON.stringify([ns.CurrentSrc()]), fnPreSend, fnSuccess, fnError);
                ns.handleSeekBar();
            }
            return;
        },
        //to delete the link from the currentLinks
        deleteLink: function (n) {
            var links = ns.CurrentLinks();
            if (links) {
                ViTag.debug("Visap.edit:RemoveLink: Removing the link" + links.length);
                for (var i = 0; i < links.length; i++) {
                    if (unescape(links[i].n) === unescape(n)) {
                        links.splice(i, 1);
                        return true;
                    }
                }
            }
        },

        getRemainingDuration: function () {
            var restduration, totalduration;
            totalduration = internal.getRoundOffValue(ns.getDuration());
            var listactions = ns.getPausedAction(internal.getRoundOffValue(ns.getCurrentTime()));
            ViTag.debug("Visap.edit:getRemainingDuration:total duration of the video and listactions" + totalduration + "," + listactions);
            if (listactions !== undefined && listactions.length !== 0) {
                var length = listactions.length;
                var lastStartTime = listactions[length - 1].data.StartTime;
                var listDuration = listactions[length - 1].data.duration;
                restduration = totalduration - (lastStartTime + listDuration);
                ViTag.debug("Visap.edit:getRemainingDuration:rest duration of the video" + restduration);
            }
            else
                restduration = totalduration - (internal.getRoundOffValue(ns.getCurrentTime()));
            ViTag.debug("Visap.edit:getRemainingDuration:rest duration and roundOffValue of the video" + restduration + "," + internal.getRoundOffValue(ns.getCurrentTime()));
            return internal.getRoundOffValue(restduration);
        },

        //Get remaining duration of the video while editing actions.
        remainingVidDuration: function (startTime, editedDuration, type) {
            try {
                var vidDuration; var remainingDuration; var rduration = true;
                vidDuration = internal.getRoundOffValue(ns.getDuration());
                remainingDuration = vidDuration - startTime;
                ViTag.debug("Visap.edit:remainingVidDuration:calculating remaining duration of the video" + type + "," + startTime + "," + editedDuration + "," + vidDuration + "," + remainingDuration);
                if (remainingDuration < editedDuration) {
                    internal.ShowMessage(ViTag.getLocalizeValue("playerEdit.msg_lessduration") + " " + ns.getTimeFormat(remainingDuration + 1) + " " + ViTag.getLocalizeValue("playerEdit.sec"), "Validation", "Action." + type + ".Saving");
                    rduration = false;
                }
                return rduration;
            }
            catch (err) {
                ViTag.error("visap.edit:remainingVidDuration:Error while getting remaining duration" + type + "," + err);
            }
        },

        // create default question
        createDefaultQuestion: function () {
            var q = me.question.getQues(ns.question.PTime), edit = false;
            var type = "questions",

                qt = ns.editor.getValue(qTitle) /* me.ctrl.$qTitle.val() */, o = [],
                a = $("input[type='radio'][name='optGroup']:checked").index("input[type='radio'][name='optGroup']") + 1,
                // Question show start time
                st = q ? q.st : ns.getCurrentTime(),
                // To get tag title if answer is wrong
                r = me.ctrl.$tagTitle.val();
            r = (r === "" ? null : r);

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
                    edit = true;
                }
                // Saving question
                if (!edit)
                    ns.question.add(newQues, function () { internal.ShowMessage("playerEdit.msg_saving", "Info", "Action.questions.Saving"); },
                        function () {
                            me.ctrl.$tag.val(''); internal.ShowMessage("playerEdit.msg_saved", "Info", "Action.questions.Saved"); internal.renderAttrs();
                            //passing question data to visap analytics while creating question by raising event
                            ns.passEventData(ViTag.Events.createAction, type, { qtag: r, StartTime: st, type: "multipleChoice", sourceType: ns.actionSourceType.nativequestion });

                        },
                        function () { internal.ShowMessage("playerEdit.msg_error", "Info", "Action.questions.SavingError"); });
                else {
                    ns.updateActionsList(type, ns.question.STime, ns.question.PTime, newQues);
                    ns.question.PTime = null;
                }
                me.question.clearEntries();
                ViTag.initTest();

                if (!edit) ViTag.getSpecAction(ViTag.getCurrentTime());
            }
        },

        getEditedActionLst: function (type, lstAction, startTm) {
            for (var i = 0; i < lstAction.length; i++) {
                if (parseInt(startTm) === lstAction[i].data.StartTime && type === lstAction[i].type) {
                    return lstAction[i];
                }
            }
        },

        //updates new pause time.
        UpdatePtm: function (actnLst, currentime) {
            var totalduration, totalvalue;
            for (var curObj = 0; curObj < actnLst.length; curObj++) {
                if (curObj === 0) {
                    actnLst[curObj].data.StartTime = currentime;
                }
                else {
                    totalvalue = actnLst[curObj - 1].data.StartTime;
                    totalduration = actnLst[curObj - 1].data.duration;
                    actnLst[curObj].data.StartTime = totalvalue + totalduration;
                }
            }
        },

        isCategoryEmpty: function (category) {
            var isValid = false;
            $.each(category, function (index) {
                if (category[index] === " " || category[index] === "") {
                    isValid = true;
                }
            });
            return isValid;
        },
        //this method will return true if object is defined.
        isObjDefined: function (obj) {
            if (obj !== undefined) {
                return true;
            }
        },
        //this method will return true if action exist at new pause time.
        isActionExist: function (actions, pauseTime, newTimeInsec) {
            if (actions.find(x => x.currentTime !== parseInt(pauseTime) && x.currentTime === newTimeInsec)) {
                return true;
            }
        }
        ,
        //this method remove tag present in the current snippet.
        removeTmLnTags: function (currTmSrc, totalvalues) {
            for (var i = 0; i < currTmSrc.tags.length; i++) {
                var currntTag = currTmSrc.tags[i];
                if (currntTag.t > totalvalues.previous && currntTag.t < totalvalues.total) {
                    currTmSrc.tags.splice(i, 1);
                    --i;
                }

            }
        },
        //updates tag after removing tag from timeline videos.
        updateTmLnTags: function (currTmSrc, totalvalues, seqense) {
            for (var i = 0; i < currTmSrc.tags.length; i++) {
                if (currTmSrc.tags[i].t > totalvalues.current) {
                    var updatedvalue = me.timeline.updateAfterdelete(currTmSrc.tags[i], seqense);
                    currTmSrc.tags[i].t = updatedvalue;
                }
            }
        },

        hideAction: function (action) {
            switch (action) {
                case ViTag.actionType.annotation: me.ctrl.$annotations.hide();
                    break;
                case ViTag.actionType.hotspot: me.ctrl.$hotspotCircle.hide();
                    break;
            }
        },
        //checks for caption file type(.vtt).
        checkCcFileType: function (captionFile) {
            if (captionFile.val() !== '' && captionFile.val().toLowerCase().indexOf(ViTag.CaptionType.vtt) < 0) {
                return true;
            }
        },
        //returns tag data from current source
        getTagData: function (val) {
            var tagData = {};
            var tagSrc = ViTag.CurrentTags();
            var value = val.toString();
            for (var i = 0; i < tagSrc.length; i++) {
                if (tagSrc[i].t.toString() === value || tagSrc[i].d.toString() === value) {
                    tagData = tagSrc[i];
                    break;
                }
            }
            return tagData;
        },
        //returns link data from current source
        getLinkData: function (lnkName) {
            var linkData = {};
            var linkSrc = ns.CurrentLinks();
            for (var i = 0; i < linkSrc.length; i++) {
                if (linkSrc[i].n === lnkName)
                    linkData = linkSrc[i];
                break;
            }
            return linkData;
        },
        //returns action data required for visap analytics EventLabel
        getActionData: function (type, pausedTime, startTime) {
            var Listactions = ns.getPausedAction(pausedTime);
            if (Listactions === undefined) {
                return
            }
            var actionDetails = ns.getEditedListAction(type, Listactions, startTime);
            var action = actionDetails.data;
            action.sourceType = actionDetails.sourcetype || "";
            if (type === ViTag.actionType.question)
                action.type = "multipleChoice";
            return action;
        },

        //get filenames uploaded by ck-editor.
        getImgFileNames: function (description, fileNames) {
            try {
                //get html tags by decoding text and find image tag.
                var imgSrcUrls = $("<div>").html(ns.htmlDecode(description)).find('img');
                for (var i = 0; i < imgSrcUrls.length; i++) {
                    //get src value from image tag.
                    var url = imgSrcUrls[i].src;
                    //get filename from src url.
                    fileNames.push(url.substring(url.lastIndexOf("/") + 1));
                }
            } catch (ex) {
                ViTag.error("Visap.edit:getImgFileNames: Error in getting file names." + err);
            }
        },

        //get filenames of multiple actions, uploaded by ck-editor.
        getAllImgFileNames: function (data) {
            var fileNames = [];
            try {
                for (var i = 0; i < data.listAction.length; i++) {
                    //get description.
                    var description = data.listAction[i].data.description;
                    //get iamge filenames from description.                  
                    internal.getImgFileNames(description, fileNames);
                }
            } catch (ex) {
                ViTag.error("Visap.edit:getAllImgFileNames: Error in getting file names." + err);
            }
            return fileNames;
        },
        getQuestionIds: function (data) {
            var questionIds = [];
            try {
                for (var i = 0; i < data.listAction.length; i++) {
                    //get questionIds.
                    if (data.listAction[i].data.questionId) {
                        questionIds.push(data.listAction[i].data.questionId);
                    }
                }
            } catch (ex) {
                ViTag.error("Visap.edit:getQuestionIds: Error in getting questionIds." + err);
            }
            return questionIds;
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
            annotatePauseOnShow: "annotatePauseOnShow",
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
            wbRightPos: "wbRightPos",
            sketchConatainer: "sketch",
            textcontent: "textcontent",
            canvascontainerWB: "canvascontainerWB",
            canvascontainer: "canvascontainer",
            skecthDurationUI: "skecthDurationUI",
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
            aelibTagList: "aelibTagList",

            dataPath: "data/data.js",
            savePath: "data/data.js",

            tagList: 'tagList',
            LinkList: 'LinkList',
            CaptureBtn: 'CaptureBtn',
            startcapture: 'startcapture',
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
            vidDuration: 'vidDuration',
            captionFile: 'ccFile',
            dirUrlCcFile: 'dirCcFile',
            captionDirUrl: 'captionUrl',
            tagDurationtime: 'tagDurationtime',
            confirmationModal: 'confirmationModal',
            myModal: 'myModal',
            viewReports: 'viewReports'

        },

        /// <summary>
        ///Read values and assign to jquery reference
        /// </summary>
        readControls: function () {
            ViTag.debug("Visap.edit:readControls: Reading default controls");
            me.ctrl.$video = $("#" + me.defaults.player);
            me.ctrl.video = me.ctrl.$video[0];

            me.ctrl.$tagDurationtime = $("#" + me.defaults.tagDurationtime);
            me.ctrl.$tag = $("#" + me.defaults.tag);
            me.ctrl.$tagTime = $("#" + me.defaults.tagTime);
            me.ctrl.$tagtimediv = $("#" + me.defaults.tagtimediv);
            me.ctrl.$saveTag = $("#" + me.defaults.saveTag);
            me.ctrl.$btnCancel = $("#" + me.defaults.btnCancel);
            me.ctrl.$timelineContainer = $("#" + me.defaults.timelineContainer);
            me.ctrl.$CaptureBtn = $("#" + me.defaults.CaptureBtn);
            me.ctrl.$startcapture = $("#" + me.defaults.startcapture);
            me.ctrl.$tmTitle = $("#" + me.defaults.tmTitle);
            me.ctrl.$tmDesc = $("#" + me.defaults.tmDesc);
            me.ctrl.$fileTitle = $("#" + me.defaults.fileTitle);
            me.ctrl.$fileDesc = $("#" + me.defaults.fileDesc);
            me.ctrl.$fileCategory = $("#" + me.defaults.fileCategory);
            me.ctrl.$lblWrgMsg = $("#" + me.defaults.lblWrgMsg);
            me.ctrl.$chkYTvideo = $("#" + me.defaults.chkYTvideo);
            me.ctrl.$chkVideoUrl = $("#" + me.defaults.chkVideoUrl);
            me.ctrl.$vidFile = $("#" + me.defaults.vidFile);
            me.ctrl.$captionFile = $("#" + me.defaults.captionFile);
            me.ctrl.$dirUrlCcFile = $("#" + me.defaults.dirUrlCcFile);
            me.ctrl.$captionDirUrl = $("#" + me.defaults.captionDirUrl);
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
            me.ctrl.$aelibTagList = $("#" + me.defaults.aelibTagList);
            me.ctrl.$confirmationModal = $("#" + me.defaults.confirmationModal);
            me.ctrl.$myModal = $("#" + me.defaults.myModal);
            me.ctrl.$viewReports = $("#" + me.defaults.viewReports);
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
            me.setHotspotControls();
            me.setWhiteboardControls();
            me.setWhiteboardDragEvents();
            me.clearTimers();
            me.resetAfterchange();
            me.confirmDialog();
        },

        /// <summary>
        ///Set the timeline and its validations and creation of timeline data
        /// </summary>
        clearTimers: function () {
            $("body").on("clearTimer", function () { //when the  source changed in timeline,timer will clear.               
                ns.clearTimer();
            });
        },
        //when user create sketch's and don't save or cancel or change the seekbar,this method will clear the created sketch's .               
        resetAfterchange: function () {
            $("body").on("resetAfterchange", function () {
                //As per user experience: clearing the sketch is not needed when seekbar changes
                internal.vidPauseTm = null;
                internal.editSketchCreatedTime = ""; // clear the selected paused time while editing sketch action when seekbar changes
                ViTag.setPauseTm();
            });
        },

        //This method will show confirmation modal pop up.
        //Onclick of ok/cancel button,it will return true/false
        confirmDialog: function () {
            try {
                $.extend({
                    confirm: function (message) {
                        var d = $.Deferred();//register multiple callbacks into self-managed callback queues.
                        me.ctrl.$confirmationModal.dialog({
                            open: function (event) { // remove the closing 'X' from the dialog
                                $(".ui-dialog-titlebar-close").hide();
                            },
                            position: ["center", 250],
                            buttons: [{
                                text: $.i18n.t('confirmationMsg.ok'), //localize ok button.
                                click: function () {
                                    $(this).dialog("close");
                                    d.resolve(true);//resolve a Deferred object and call any doneCallbacks with the given args.
                                    return true;
                                }
                            },
                            {
                                text: $.i18n.t('confirmationMsg.cancel'), //localize cancel button.
                                click: function () {
                                    $(this).dialog("close");
                                    d.resolve(false);
                                    return false;
                                }
                            }],
                            // close: function(event, ui) { $(this).remove(); },
                            resizable: false,
                            title: $.i18n.t('confirmationMsg.title'),
                            modal: true,
                            width: 400
                        }).text(message);
                        return d.promise();
                    }
                });
            } catch (err) {
                ViTag.error("Visap.edit:confirmDialog: Error in displaying confirmation modal" + err);
            }
        },

        /// <summary>
        /// When user Delete sketches and canvas must be cleared and erases everything on screen
        /// <summary>
        clearSketch: function () {
            $("body").trigger("clearSketch");
        },
        /// <summary>
        /// Play and pause  event binding  to video,yt onStateChange event binding
        /// </summary>

        setVideoControls: function () {
            me.ctrl.$video.bind("pause", ns.enableEditPanel).bind("play", ns.disabelEditPanel);
            // When a sketch is existed on the screen if the user pause the video at that time 
            // then user will get a confirmation message that sketch is existed.
            $("body").on("onYTinit", function () {
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
            ViTag.debug("Visap.edit:getTagTimeInseconds:get tag time in seconds" + tagTime);
            var tagTimeArray = tagTime.split(":"), hrs = "00"; //if the video duration is less than an hour then hrs is 0.
            if (tagTimeArray.length === 3) return ViTag.getTimeInSeconds(tagTimeArray[0], tagTimeArray[1], tagTimeArray[2]);
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

            ns.isSketchInitialisedforWB = false;
            // switching between text or sketch of the whiteboard
            $("[name='switchwbAction']").change(function () {
                var id = this.id;
                ns.toggleWhiteboardSketch(id);
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
            ViTag.debug("Visap.edit:setWhiteboardDragEvents:getting parent offset.left width and and parent width to drag right and leftout");

            var Parentwidth = ParentObject.offset().left + $(ParentObject).width();
            wbdragbar.on('mousedown', function (e) {
                isResizing = true;
                $('body').css('-ms-user-select', 'none'); //to prevent text selection in ie when mousedown.
            });

            $(document).on('mousemove', function (e) {
                var direction = $('input[name="direction"]:checked').val();
                if (!isResizing) {
                    return;
                }
                $("body").css({ '-webkit-user-select': 'none', '-moz-user-select': '-moz-none' }); //to prevent text selection in chrome,firefox when resizing.
                $('iframe').css('pointer-events', 'none');
                ViTag.debug("Visap.edit:setWhiteboardDragEvents:depending on radio button(position), the width will be calculated.");

                if (direction === 'left' || direction === 'wbRightOutPos') {
                    offsetRight = (e.clientX - wbContainer.offset().left); // Left Dragging. 
                    wbContainer.css('width', offsetRight);
                    me.whiteboardData.wbSketcherRedraw();
                }
                else if (direction === 'right') {
                    offsetRight = ParentObject.width() - (e.clientX - ParentObject.offset().left);
                    wbContainer.css('width', offsetRight);
                    me.whiteboardData.wbSketcherRedraw();
                }
                else if (direction === 'wbLeftOutPos') {
                    offsetRight = (Parentwidth - e.clientX); //Left-Out Dragging.   
                    wbContainer.css('width', offsetRight);
                    me.whiteboardData.wbSketcherRedraw();
                }
                ViTag.debug("Visap.edit:setWhiteboardDragEvents:while dragging, the width will be calculated." + offsetRight);

                //switch nback to sketch view /show preview of white borad only if text mode is selected
                if (internal.wasTextMode) {
                    me.whiteboardData.switchToSketch();
                }

            });
            $(document).on('mouseup', function (e) {
                //switch nback to text view /end of preview mode of white borad only if text mode is selected
                ViTag.debug("Visap.edit:top resizing the whiteBoardWrapper");
                if (isResizing && internal.wasTextMode) {
                    me.whiteboardData.switchTotext();
                    me.whiteboardData.setEditorHeight();
                }
                isResizing = false;
                $("body").css({ '-webkit-user-select': 'auto', '-moz-user-select': 'auto', '-ms-user-select': 'auto' });
                $('iframe').css('pointer-events', 'auto');
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
                    oQues = $.grep(ns.CurrenQuestList(), function (e) { return e.data.StartTime === stime; })[0];
                return oQues ? oQues : null;
            },

            // To check the tag is exists in the list
            validateTag: function (d) {
                ViTag.debug("visap.edit:To check the tag is exists in the list" + d);
                var t = null;
                if (ns.CurrentTags())
                    t = $.grep(ns.CurrentTags(), function (e) { return unescape(e.d) === d })[0];
                return t ? true : false;
            },

            changeRowStyle: function (row, html, index) {
                var bgColor = "#CCCCCC";

                if ((index % 2) === 1)
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

                if (typeof qTitle === 'undefined') {
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
                    msg = "playerEdit.msg_questtitle";
                else if (!ns.editor.ckEditorAvailable()) {
                    if ((!oQues.q.match(pattern)))
                        msg = 'playerEdit.msg_nonsupportedchar';
                }
                else if (oQues.r != null && !me.question.validateTag(oQues.r))
                    msg = "playerEdit.msg_tagnotexist";
                else if (oQues.o.length < 2)
                    msg = "playerEdit.msg_moreoptions";
                else if ($.grep(oQues.o, function (o) { return o == "" })[0] == "")
                    msg = "playerEdit.msg_blankoption";
                else if (oQues.a < 1)
                    msg = "playerEdit.msg_correctanswer";

                return msg;
            }
        },

        exitEditMode: function () {
            me.ctrl.$editContainer.animate({ opacity: 'hide' }, 'slow');
            ViTag.playClick();
        },

        /// <summary>
        ///Save all actions including tags and links are saved to database 
        /// </summary>
        /// <param name="data">data to be saved</param>   
        /// <param name="fnPreSend">function to be executed before sending ajax request</param>
        /// <param name="fnSuccess">function to be executed on success of ajax request</param>
        /// <param name="fnError">function to be executed if there is an error in ajax request</param>
        saveActions: function (data, fnPreSend, fnSuccess, fnError, fileNames, questionId) {
            ViTag.debug("saving the users metedata for the username" + " " + sessionStorage.getItem('authT'));
            var isStageValue = false;
            if (me.defaults.UserId === "stage" || me.defaults.mode) {
                isStageValue =  me.defaults.mode? me.defaults.mode:true;
            }

            $.ajax({
                url: ViTag.config.wsMetadataurl,
                type: "POST",
                async: false,
                headers: { isStage: isStageValue, 'X-Authorization': sessionStorage.getItem('authT') },
                data: { d: data, questionId: JSON.stringify(questionId), fileNames: JSON.stringify(fileNames) },
                success: fnSuccess,
                //error: fnError,
                error: function (xhr, err) {
                    ViTag.error("visap.edit:saveActions:Error while calling metadata service" + err);
                    var title = xhr.responseText.substr(xhr.responseText.indexOf("<title>") + 7, xhr.responseText.indexOf("</title>"));
                    var msg = title.substr(0, title.indexOf("</title>"));
                    fnError(msg);
                },
                beforeSend: fnPreSend
            });

        },
        getSavePath: function () {
            var file = me.defaults.dataPath;
            if ((me.defaults.savePath !== me.defaults.dataPath) && (me.defaults.savePath !== ""))
                file = me.defaults.savePath;
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
                internal.ShowMessage(ViTag.getLocalizeValue("playerEdit.msg_lessduration") + " " + ns.getTimeFormat(restduration) + " " + ViTag.getLocalizeValue("playerEdit.sec"), true);
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
            var toolType = "questions", ques, action;
            var sourcetype = ns.actionSourceType.nativequestion;
            ques = { qtitle: datavalue.q, options: datavalue.o, qans: datavalue.a, qtag: datavalue.r, duration: 2 }
            action = ns.getActionList(toolType, ques, sourcetype);
            return ns.getJsonString(action);
        },
        /// <summary>
        ///Saves to database
        /// </summary>
        /// <param name="data">data to be saved</param>
        SaveTimeLine: function (data, fnPreSend, fnSuccess, fnError) {
            try {
                $.ajax({
                    url: ViTag.config.wsvideourl,
                    type: "POST",
                    async: false,
                    headers: { 'X-Authorization': sessionStorage.getItem('authT') },
                    data: { data: data }, //username: sessionStorage.getItem('AppUser') },
                    success: [fnSuccess, ViTag.closePlayer()],
                    error: fnError,
                    beforeSend: fnPreSend
                });
            } catch (err) {
                ViTag.error("visap.edit:Error while saving timeline" + err);
            }
        },
      
        // this method will return snap details while creating/editing time line video.
        getTmLineData: function (title, description, childEles) {
            var tempData = [];
            try {

                for (var k = 0; k < childEles.length; k++) {
                    var snippetDetails = me.timeline.getTmData(childEles[k].id);
                    snippetDetails.sequence = k + 1;
                    tempData.push(snippetDetails);
                }

                ViTag.debug("Visap.edit:duration storing for timeline");
                var timelineduration = null;

                for (var j = 0; j < tempData.length; j++) {
                    timelineduration += tempData[j].data.duration;
                }

                ViTag.debug("Visap.edit:duration storing for timeline" + timelineduration);
                var snippetIndex = 0;   //to store the first snippet snapshot for the timeline video.
                var snapData = null;

                if (ViTag.editTimelineMode) {
                    ViTag.debug("Visap.edit:setTimelineControls:Edting timeline video timeline video" + " " + ViTag.editTmSrcdetials._id);
                    return snapData = { "_id": ViTag.editTmSrcdetials._id, "title": escape(title), "sourcetype": 2, "desc": escape(description), snap: tempData[snippetIndex].data.snap, "src": tempData, "videototalduration": Math.round(timelineduration), "category": [""] };
                }
                else {
                    ViTag.debug("Visap.edit:setTimelineControls:Creating timeline for the user" + sessionStorage.getItem('AppUser'));
                    return snapData = { "title": escape(title), "sourcetype": 2, "desc": escape(description), snap: tempData[snippetIndex].data.snap, "src": tempData, "videototalduration": Math.round(timelineduration), "category": [""] };
                }
            } catch (err) {
                ViTag.error("visap.edit:getTmLineData:Error while getting snap data " + err);
            }
        },

        /// <summary>
        ///Delete video from database
        /// </summary>
        /// <param name="ID">unique ID</param>
        deleteVideo: function (ID, fnPreSend, fnSuccess, fnError) {
            if (ns.CurrentSrc() && ns.CurrentSrc()._id === ID) {
                internal.ShowMessage("playerEdit.msg_deletevideo", "Info", "Video.Deleting.AlertMsg");
                return false;
            }
            //The below line of code is to get the current title of the video which is deleting(this data is required to post the data)
            ns.currentVid = $.grep(ViTag.source, function (e) {
                return e._id === ID;
            })[0];
            var msg = ViTag.getLocalizeValue("confirmationMsg.deleteMsg") + " " + ViTag.getLocalizeValue("confirmationMsg.videoMsg");
            //Deleting video after confirmation from video list.
            $.confirm(msg).then(function (istrue) {
                if (istrue) {
                    ViTag.debug("visap.edit:deleteVideo:delete the video with id:" + ID);
                    ns.calldelete(ID, fnPreSend, me.timeline.timeLineDeletemessage, fnError);
                }
            });
        },

        /// <summary>
        ///Call to handler
        /// </summary>
        /// <param name="ID">unique ID</param>
        calldelete: function (ID, fnPreSend, fnSuccess, fnError) {
            $.ajax({
                url: ViTag.config.wsvideourl,
                type: "POST",
                headers: { "X-HTTP-Method-Override": "DELETE", 'X-Authorization': sessionStorage.getItem('authT') },
                data: { deleteID: ID },
                success: function (res) {
                    fnSuccess();
                    DeleteSuccess = function () {
                        internal.ShowMessage(res, "Info", "Delete.");
                    };
                },
                error: function (err) {
                    ViTag.error("visap.edit:calldelete:Error while deleting video" + err);
                    if (err.status === 400) {
                        return fnError(err);
                    }
                    internal.ShowMessage(err.statusText, "Info", "GetData.error");
                }
            });
        },

        /// <summary>
        ///Publish namespace
        /// </summary>
        publish: {
            // publish the video details and save to DB
            savePublishVideo: function (data, fnPreSend, fnSuccess, fnError) {
                var authToken = sessionStorage.getItem('authT');
                $.ajax({
                    url: ViTag.config.wsPublishVideourl,
                    type: "POST",
                    async: false,
                    headers: { 'X-Authorization': authToken },
                    data: { d: data }, //hard coded
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
                if (dataObj && dataObj !== "") source = $.grep(dataObj, function (e) { return e._id === Id; })[0];
                ViTag.debug("visap.edit:getStageMetadata:gets the collarabation metadata for the id:" + Id);
                if (source !== null)
                    $.ajax({
                        url: ViTag.config.wsMetadataurl,
                        type: "GET",
                        async: false,
                        headers: { isStage: true, 'X-Authorization': sessionStorage.getItem('authT') },
                        data: { ID: source._id },
                        success: function (data) {
                            obj = JSON.parse(data);
                            if (obj[0] !== undefined && source !== undefined) {
                                if (obj[0].width !== undefined && obj[0].height !== undefined) {
                                    source.width = obj[0].width;
                                    source.height = obj[0].height;
                                }

                                if (obj[0].actions !== undefined)
                                    source.actions = obj[0].actions;
                                else
                                    source.actions = [];

                                if (obj[0].tags !== undefined)
                                    source.tags = obj[0].tags;
                                else
                                    source.tags = [];

                                if (obj[0].links !== undefined)
                                    source.links = obj[0].links;
                                else
                                    source.links = [];
                            }

                        },
                        error: function (err) {
                            ViTag.error("visap.edit:getStageMetadata:Error while getting metadata" + err);
                            internal.ShowMessage("playerEdit.msg_loadingerror", "Info", "GetData.error");
                        }
                    });

                return source;
            },
            //Fetches user metadata of the perticular source which renders all its metadata
            getUserMetadata: function (Id) {
                var dataObj = me.publish.getUserData(); // To get user related stuffs once after publish to reflect 
                var source = null, obj = null;
                if (dataObj && dataObj !== "")
                    source = $.grep(dataObj, function (e) { return e.refId === Id; })[0]; //cross check with refId of already publish data
                ViTag.debug("visap.edit:getUserMetadata:gets the myspace metadata for the id:" + Id);
                if (source !== undefined && source !== null)
                    $.ajax({
                        url: ViTag.config.wsMetadataurl,
                        type: "GET",
                        async: false,
                        headers: { isStage: false, 'X-Authorization': sessionStorage.getItem('authT') },
                        data: { ID: source._id },
                        success: function (data) {
                            obj = JSON.parse(data);
                            //If there is edited work and check for each actions are available
                            if (obj[0] !== undefined && source !== undefined) {

                                if (obj[0].actions !== undefined)
                                    source.actions = obj[0].actions;
                                else
                                    source.actions = [];

                                if (obj[0].tags !== undefined)
                                    source.tags = obj[0].tags;
                                else
                                    source.tags = [];

                                if (obj[0].links !== undefined)
                                    source.links = obj[0].links;
                                else
                                    source.links = [];
                            }
                        },
                        error: function (err) {
                            ViTag.error("visap.edit:getUserMetadata:Error while getting metadata" + err);
                            internal.ShowMessage("playerEdit.msg_loadingerror", "Info", "GetData.error");
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
                            if (tags.t === this.t) {
                                usrD.tags.splice(index, 1);
                                return false;
                            }
                        });
                        usrD.tags.push(tags);
                    });
                }
                if (staged.title) {
                    usrD.title = staged.title;
                }
                if (staged.category !== undefined) {
                    usrD.category = staged.category;
                }

                if (staged.desc) {
                    usrD.desc = staged.desc;
                }
                //While publishing looping through each action type(question,annotation,whiteboard..)
                if (staged.actions) {
                    if (!usrD.actions) usrD.actions = [];

                    for (var i = 0; i < staged.actions.length; i++) { //Outer loop is to looping through all the staged actions
                        var isReplaceQuestData = true;
                        for (var j = 0; j < usrD.actions.length; j++) { //inner loop is to looping through all the user actions

                            if (staged.actions[i].currentTime === usrD.actions[j].currentTime) {
                                //here isReplaceQuestData is set false because,if this condtion is true then createQuestDataCopy method should not excecute.
                                isReplaceQuestData = false;
                                me.publish.replaceQuestData(staged.actions[i].listAction, usrD.actions[j].listAction);
                            }
                        }
                        if (isReplaceQuestData) {
                            var subactionlist = staged.actions[i].listAction;
                            //While publishing the video, create new copy for the question with the new id.
                            me.publish.createQuestDataCopy(subactionlist);
                            //To insert the updated staged actions to the user actions.
                            usrD.actions.push(staged.actions[i]);
                        }
                    }

                    if (staged.width && staged.height) {
                        usrD.width = staged.width;
                        usrD.height = staged.height;
                    }
                }
                if (staged.links) {
                    if (!usrD.links) usrD.links = [];
                    $.each(staged.links, function () {
                        var links = this;
                        $.each(usrD.links, function (index) {
                            if (links.n === this.n) {
                                usrD.links.splice(index, 1);
                                return false;
                            }
                        });
                        usrD.links.push(links);
                    });
                }
            },
            //while republishing, the published question data should be overwritten by stage questiondata
            replaceQuestData: function (stageListAction, usrDListAction) {
                for (var k = 0; k < stageListAction.length; k++) //Outer loop is to going through all the staged listaction
                {
                    var isQuest = true;
                    for (var m = 0; m < usrDListAction.length; m++)  //inner loop is to going through all the user listaction
                    {
                        //checking both the listaction startime are similar.
                        if (stageListAction[k].data.StartTime === usrDListAction[m].data.StartTime) {
                            //If both staged and user action type is question then overwrite the staged question data to the user data but it questionid should be same.
                            if (stageListAction[k].type === ns.actionType.question && usrDListAction[m].type === ns.actionType.question) {
                                isQuest = false;
                                ns.aelib.overwriteQuestData(stageListAction[k].data.questionId, usrDListAction[m].data.questionId);
                            }
                            //if staged action type is question and user action type is any other actin type then create new copy for the question with the new question id 
                            else if (stageListAction[k].type === ns.actionType.question && usrDListAction[m].type !== ns.actionType.question) {
                                isQuest = false;
                                var subactionlist = stageListAction;
                                usrDListAction.splice(m, 1);
                                me.publish.createQuestDataCopy(subactionlist);
                                usrDListAction.push(stageListAction[k]);
                            }
                            else usrDListAction.splice(m, 1);
                        }
                    }
                    if (isQuest) {
                        var subactionlist = stageListAction[k];
                        //This will excecute only when the usrDListAction lenght is 0
                        me.publish.updateQuestId(subactionlist);
                        usrDListAction.push(subactionlist);
                    }
                    usrDListAction.sort(function (a, b) { return a.data.StartTime - b.data.StartTime; });
                }
            },

            //To create new question data with the new id and replace the new with the older questionId
            createQuestDataCopy: function (subactionlist) {
                //listAction contains n number of subaction so loop is required.
                $.each(subactionlist, function (i) {
                    //To check the subactionlist type is of question and sourcetype is aelib then create new copy for the question with the new id.
                    me.publish.updateQuestId(subactionlist[i]);
                });
            },

            //new question id will be updated for user listaction.
            updateQuestId: function (subactionlist) {
                if (subactionlist.type === ns.actionType.question && subactionlist.sourcetype === ns.actionSourceType.aelibquestion) {
                    //copyQuestion method will pass the question id to sevice and it will create new copy of that question and it will return new id.
                    ns.aelib.copyQuestion(subactionlist.data.questionId,
                        function (data) {
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
                ViTag.debug("visap.edit:getUserData:gets the video header details for myspace user having token:" + sessionStorage.getItem('authT'));
                $.ajax({
                    url: ViTag.config.wsvideourl,
                    type: "GET",
                    async: false,
                    headers: { isStage: false, ismyspacevideo: true, 'X-Authorization': sessionStorage.getItem('authT') },
                    success: function (data) {
                        internal.userSrcDetails = JSON.parse(data);
                    },
                    error: function (err) {
                        ViTag.error("visap.edit:getUserData:Error while getting headerdata" + err);
                        internal.ShowMessage("playerEdit.msg_loadingerror", "Info", "GetData.error");
                    }
                });
                return internal.userSrcDetails;
            },
            MsgSaving: function () {
                internal.ShowMessage("playerEdit.msg_publishing", "Info", "Publish.Publishing");
            },
            // While publish message to the user publish is completed
            MsgSaved: function () {
                internal.ShowMessage("playerEdit.msg_publish", "Info", "Publish.Published");
            },
            // While publish message to the user publish is failed
            MsgError: function (msg) {
                if (!msg) {
                    msg = "playerEdit.msg_error";
                    internal.ShowMessage("<span class='redmsg' data-i18n='playerEdit.msg_publishfailed'></span>" + msg, "Info", "Publish.PublishingError");
                }
            }
        },

        // <summary>
        /// Update Namespace
        /// </summary>
        upload: {

            updatevalue: null,
            // Upload functionality of the Youtube videos are set here
            uploadYT: function () {
                var ytVideoID = me.ctrl.$txtYTvideo.val();
                if (ytVideoID.trim() === '') {
                    internal.ShowMessage("playerEdit.msg_uploadyt", "Validation", "Upload.Saving");
                    return false;
                }

                if (ytVideoID.includes("'")) {
                    internal.ShowMessage("playerEdit.msg_verifyurl", "Validation", "Upload.Saving");
                    return false;
                }
                //youtube id is taken from youtube  url
                var videoid = ytVideoID.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                if (videoid != null) {
                    ViTag.debug("Visap.edit:uploadYT:upload youtube with url:" + videoid);
                    ytVideoID = videoid[1];
                }
                var source = me.upload.getSource(ViTag.source, ytVideoID);
                if (source) {
                    me.ctrl.$myModal.hide();
                    var msg = ViTag.getLocalizeValue("confirmationMsg.videoIdMsg") + " " + ytVideoID + " " + ViTag.getLocalizeValue("confirmationMsg.ytVideoIdMsg");
                    $.confirm(msg).then(function (istrue) {
                        if (istrue) {
                            me.upload.uploadYTVid(ytVideoID, source);
                        }
                        me.ctrl.$myModal.show();
                    });
                } else {
                    me.upload.uploadYTVid(ytVideoID, source);
                }
            },

            uploadYTVid: function (ytVideoID, source) {
                me.upload.initYTplayer(ytVideoID, source);
                ViTag.debug("Visap.edit:uploadYT:upload youtube with ID:" + ytVideoID);
            },

            // this method gets yt details like ytDuration 
            getYTdetails: function (ytVideoID, source) {
                var category = me.upload.getCategoryList();
                ns.tempPlayer.mute();
                setTimeout(function () {
                    var ytduration = ns.tempPlayer.getDuration();
                    if (source) {
                        ViTag.debug("visap.edit:uploadYT:getYTdetails:Replacing the video youtubevideoid ,tittle,description,duration,ID of the existing Video:" + ytVideoID + "," + $.trim(me.ctrl.$fileTitle.val()) + "," + me.ctrl.$fileDesc.val() + "," + Math.round(ytduration) + "," + source._id);
                        me.upload.success({ _id: source._id, title: escape($.trim(me.ctrl.$fileTitle.val())), snap: "http://img.youtube.com/vi/" + ytVideoID + "/0.jpg", desc: escape(me.ctrl.$fileDesc.val()), category: category, src: ytVideoID, videototalduration: Math.round(ytduration), yt: "true", sourcetype: 1 }, "true");
                    } else {
                        ViTag.debug("visap.edit:uploadYT:getYTdetails:uploading new Youtube video with youtubevideoid ,tittle,description,duration:" + ytVideoID + "," + $.trim(me.ctrl.$fileTitle.val()) + "," + me.ctrl.$fileDesc.val() + "," + Math.round(ytduration));
                        me.upload.success({ title: escape($.trim(me.ctrl.$fileTitle.val())), snap: "http://img.youtube.com/vi/" + ytVideoID + "/0.jpg", desc: escape(me.ctrl.$fileDesc.val()), category: category, src: ytVideoID, videototalduration: Math.round(ytduration), yt: "true", sourcetype: 1 }, "true");
                    }
                    $('#tempIframe').remove();
                }, 500);
                internal.ShowMessage("playerEdit.msg_uploadsuccessful", "Info", "UploadImage.Saved");
            },

            // get category list based on user input
            getCategoryList: function () {
                var vidCategory = me.ctrl.$fileCategory.val();
                var categorytextBox = vidCategory.trim().replace(/,{1,}$/, '');
                var category = [];
                if (categorytextBox !== '') {
                    // Check if the category has comma separated values
                    if (categorytextBox.indexOf(',') !== -1) {
                        //to avoid duplicate Category saving into database,check for space also
                        splitCategory = categorytextBox.split(/\s*,\s*/);
                        //loop category and trim each element
                        splitCategory = ns.util.duplicateCheck(splitCategory);
                        for (var indexOfCatName = 0; indexOfCatName < splitCategory.length; indexOfCatName++) {
                            category.push(escape(splitCategory[indexOfCatName]));
                        }
                    }
                    else {
                        category.push(escape(categorytextBox));
                    }
                } else
                    category.push(categorytextBox);
                ViTag.debug("Visap.edit:getCategoryList:category/s of the uploaded video are:" + category);
                return category;
            },

            /// <summary>
            ///Initialise YT object to play YT video
            /// </summary>
            initYTplayer: function (videoID, source,callback) {
                ViTag.debug("visap.edit:initYTplayer:Init of YT player " + videoID);
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
                        'onReady': function () {
                            if(callback){
                                callback(ns.tempPlayer);
                            }else{
                                me.upload.getYTdetails(videoID, source);
                            }
                            
                        }
                    }
                });
            },

            //upload videos by giving url(mp4,ogg,webm)
            uploadVideoByURL: function () {
                var videoURL = me.ctrl.$VideoUrl.val(), dirUrlCcFile = me.ctrl.$dirUrlCcFile[0].files[0];
                var capName = null;

                //storing caption url and validating caption url if caption is a direct url.
                if (me.ctrl.$captionDirUrl.val() !== "") {
                    capName = me.ctrl.$captionDirUrl.val();
                }

                if (videoURL.trim() === '') {
                    internal.ShowMessage("playerEdit.msg_uploaddirecturl", "Validation", "Upload.Saving");
                    return false;
                }
                //validation for the valid URL.
                if (!internal.validateURL(videoURL)) {
                    internal.ShowMessage("playerEdit.msg_videourl", "Validation", "Upload.Saving");
                    return false;
                }
                ViTag.debug("visap.edit:uploadVideoByURL:upload video url " + videoURL);
                //validation for different types of url(mp4,ogg,webm)
                if ((videoURL.toLowerCase().indexOf("mp4") < 0) && (videoURL.toLowerCase().indexOf("ogg") < 0) && (videoURL.toLowerCase().indexOf("webm") < 0)) {
                    internal.ShowMessage("playerEdit.msg_uploadfails", "Validation", "Upload.Saving");
                    return false;
                }
                //validating caption file type(vtt)
                if (internal.checkCcFileType(me.ctrl.$dirUrlCcFile) === true) {
                    internal.ShowMessage("playerEdit.msg_uploadvtt", "Validation", "Upload.Saving.AlertMsg");
                    return false;
                }
                //checking for illegal characters in caption file name
                if (me.ctrl.$dirUrlCcFile.val() !== "") {
                    if (internal.validateFileName(dirUrlCcFile.name) === true) {
                        internal.ShowMessage("playerEdit.msg_illegalcaption", "Validation", "Upload.Saving.AlertMsg");
                        me.ctrl.$dirUrlCcFile.val("");
                        return false;
                    }
                    var data = new FormData();
                    data.append(dirUrlCcFile.name, dirUrlCcFile);//appending caption file to form data.
                    capName = dirUrlCcFile.name;
                    //storing caption file in caption repository.
                    $.ajax({
                        type: "POST",
                        url: ViTag.config.wsFileuploadurl,
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function () {
                            ViTag.debug("Visap.edit:upload:Uploading caption file for direct video:  " + capName);
                        },
                        error: me.upload.error
                    });
                }
                var vid = document.createElement('video');
                vid.src = videoURL;
                //need to show uploading..message untill the video will upload successfully.
                internal.ShowMessage("playerEdit.msg_uploading", "Info", "UploadImage.Saving"),
                    //to get the directURL duration loademetadata event has been written(inside that saving to data to database).
                    vid.addEventListener('loadedmetadata', function () {
                        var category = me.upload.getCategoryList();
                        ViTag.debug("visap.edit:uploadVideoByURL:upload directurl video with url,tittle and description as:" + videoURL + "," + me.ctrl.$fileTitle.val() + "," + me.ctrl.$fileDesc.val());
                        me.upload.success({ title: escape($.trim(me.ctrl.$fileTitle.val())), snap: ns.defaultImage, videototalduration: Math.round(vid.duration), desc: escape(me.ctrl.$fileDesc.val()), category: category, src: videoURL, sourcetype: 3, caption: capName }, "true");
                    }, false);

                //This event will trigger when the url is not valid or url not found or it may also
                //trigger there are issues while downloading the metadata of the video.
                vid.addEventListener('error', function () {
                    me.upload.mediaError();
                });
                vid.onstalled = function () {
                    me.upload.mediaError();
                };
            },
            //To show the error message for directurl videos, if the video url is not valid mp4 url.
            mediaError: function () {
                setTimeout(function () {
                    internal.ShowMessage("playerEdit.msg_unabletoimport", "Info", "UploadImage.Saving");
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
                if (d && d !== "") source = $.grep(d, function (e) { return e.src === s; })[0];
                return source;
            },
            // <summary>
            /// Video snapshot is captured while uploding video 
            /// </summary>
            /// <param name="f">file namef</param> 
            getVidSS: function (f, ccFileName) {
                var opt = me.upload.getCanVid(f);
                setTimeout(function () {
                    var w, h, cxt;

                    w = opt.vid.videoWidth;
                    h = opt.vid.videoHeight;
                    opt.can.width = w;
                    opt.can.height = h;

                    cxt = opt.can.getContext('2d');
                    cxt.fillRect(0, 0, w, h);
                    cxt.drawImage(opt.vid, 0, 0, w, h);
                    ViTag.debug("visap.edit:getVidSS:upload  the file to database having tittle and description" + me.ctrl.$fileTitle.val() + "," + escape(me.ctrl.$fileDesc.val()));
                    var snapshot = opt.can.toDataURL();
                    var category = me.upload.getCategoryList();
                    me.upload.success({ title: escape($.trim(me.ctrl.$fileTitle.val())), snap: snapshot, videototalduration: Math.round(opt.vid.duration), desc: escape(me.ctrl.$fileDesc.val()), category: category, src: f, sourcetype: 0, caption: ccFileName }, "true");
                }, 1000);

            },
            // <summary>
            ///Accepts file name as parameter and returns required snapshot attibutes need to get snapshot of the video
            /// </summary>
            /// <param name="f">file namef</param> 
            getCanVid: function () {
                var can = document.createElement('canvas');
                var vid = document.createElement('video');
                var file = me.ctrl.$vidFile[0].files[0];
                var fileURL = URL.createObjectURL(file);
                vid.src = fileURL;
                vid.addEventListener('loadedmetadata', function () {
                    vid.currentTime = 10;
                }, false);

                vid.muted = true;
                vid.autoplay = true;
                vid.crossOrigin = "anonymous";
                return { can: can, vid: vid };
            },
            // <summary>
            ///Posting data to DB once user successfully upload file to repository 
            /// </summary>
            /// <param name="opt">data  to be saved in database</param> 
            success: function (opt, isUpload, message) {  //isUpload is true only for the uploaded videos(because we are storing snapshot only for the uploaded videos)
                var analyticsObj = {};
                $.ajax({
                    url: ViTag.config.wsvideourl,
                    type: "POST",
                    headers: { 'X-Authorization': sessionStorage.getItem('authT') },
                    data: { d: JSON.stringify([opt]), key: me.upload.updatevalue, isStage: "true", isUpload: isUpload },//key - can be removed - Code review - savitha
                    success: function (vidId) {
                        var action = (opt._id === undefined) ? ViTag.Events.add : ViTag.Events.edit;
                        opt._id = vidId;
                        //passing event data to visap analytics for import and edit event
                        ns.passEventData(action, "", opt);
                        if (message !== undefined)
                            internal.ShowMessage(message, "Info", "UploadImage.Saved")
                        else
                            internal.ShowMessage("playerEdit.msg_uploadsuccessful", "Info", "UploadImage.Saved")

                        setTimeout(function () {
                            me.upload.closeBrowser();
                        }, 2000);

                    },
                    error: me.upload.error
                });
            },
            // Pop up is closed when upload fails
            error: function (err) {
                ViTag.error("visap.edit:video.do:Error while posting header video data" + err);
                internal.ShowMessage("playerEdit.msg_uploadingerror", "Info", "Upload.Saving.AlertMsg")
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
            //display ckeditor on wb container.
            initCkEditorWb: function (description) {
                ViTag.editor.rePlaceCkeditor(cmtWiteboard);//to replace ckeditor on whiteboard
                if (description) {//check edit mode.
                    ns.editor.setValue(cmtWiteboard, description);
                }
            },

            //Removing css class while sliding whiteboard.
            removeWbclass: function () {
                me.ctrl.$wbdragbar.removeClass('wbDragbarRight wbDragbarLeft');
                me.ctrl.$sketchcontainerWB.removeClass('canvascontainerLeft canvascontainerRight');
                me.ctrl.$textcontainerWB.removeClass('textcontainerWBLeft textcontainerWBRight');
            },

            //Dispalying whiteboard and dragbar by sliding based on radio button values
            SlidingWhiteboard: function (direction, description) {

                ViTag.debug("visap.edit:whiteboardData:SlidingWhiteboard:whiteboard text and sliding direction:" + direction + "," + description);
                var wbWidth = me.ctrl.$wboardContainer.outerWidth();//get width of wb container.
                ViTag.animateWb(direction, wbWidth, me.whiteboardData.setEditorHeight); //Animating whitebord by sliding.
                if (internal.editWhiteboard) {//check for edit mode.
                    me.whiteboardData.initCkEditorWb(description);//displaying ck editor on wb.
                }
            },

            // To show sketh when user slects edit button
            sketchWhiteboard: function (height) {
                ns.sketchcontainer = "sketchcontainerWB";
                ns.setImager(ns.sketchDataWhiteboard, me.defaults.canvascontainerWB, height, me.ctrl.$wboardContainer.width());
            },

            wbSketcherRedraw: function () {
                ns.setSize(me.ctrl.$wboardContainer.width(), internal.wbTxtHeight);
            },

            EnableRadioButton: function () {
                me.ctrl.$wbRightPos.attr('disabled', false);
            },

            // This is fn will set the hieght of ck-Editor.
            setEditorHeight: function () {

                if (ViTag.editor.ckEditorAvailable() && ViTag.editor.ckEditorInstanceAvilable(cmtWiteboard)) {
                    var wbContainer = me.ctrl.$wboardContainer; //whiteboard container height. 
                    var ckTopHeight = $(".cke_top").height();   //toolbar height of ck-editor.
                    var ckbottomHeight = $(".cke_bottom").height(); //bottom height of ck-editor.
                    //set editor body height.
                    $(".cke_contents").height((wbContainer.height() - ckTopHeight - ckbottomHeight - 21) + "px");
                }
            },

            // switch to text mode of the whiteborad
            switchTotext: function () {
                me.ctrl.$sketchConatainer.css("display", "none");
                me.ctrl.$sketchcontainerWB.css('display', 'none');
                me.ctrl.$canvascontainerWB.hide();
                me.ctrl.$textcontent.hide();
                me.ctrl.$textcontainerWB.show();
                $(".wbDragbarLeft").css('margin-right', "0px");// dragbar attr reset to margin 0
                me.whiteboardData.setEditorHeight();
            },
            // switching to sketch of the WB
            switchToSketch: function () {
                me.ctrl.$textcontainerWB.hide();
                ns.sketchDataDefault = null;// empty saved default data to avoid undo 
                me.ctrl.$sketchcontainerWB.css('display', 'block');

                // to get sketcher related info like canvas

                ViTag.debug("Visap.edit:Retrieve whiteboard Data which is saved,and which can be modified the data Edit mode.");
                var editorsource = ViTag.editor.getValue(cmtWiteboard);
                internal.whiteboardTextData = editorsource;
                me.ctrl.$textcontent.show().css('z-index', "-1");
                me.ctrl.$textcontent.html(ViTag.htmlDecode(editorsource));
                me.ctrl.$canvascontainerWB.show();
                me.ctrl.$sketchConatainer.css("display", "block");
                $('.color-well:nth-of-type(3)').hide();

                internal.sketcherData = sketchv1.getSketcherDetails();
                internal.sketcherData.css('display', 'block');
                internal.sketcherData.addClass('canvasWB');
                $("#" + me.defaults.skecthDurationUI).css('display', 'none');
                me.whiteboardData.wbSketcherRedraw();
                $(".wbDragbarLeft").css('margin-right', "-5px"); // scroll bar was not visible and hence set the margin for dragbar in sketch
            }

        },

        timeline: {
            sequence: 0,  //its used to identify the snippet of the timeline video from sequence number
            editsequence: 0, //to get the last sequence number while editing timeline video.
            timelineSrc: {},  //to store the captured video details(src details)

            capture: function (video, scaleFactor) {
                me.timeline.sequence++;
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
                var div = document.createElement('div');
                var div1 = document.createElement('div');
                $(div).attr('class', 'tl');
                $(div).attr('id', me.timeline.editsequence);
                $(div).attr('draggable', true);
                $(div1).attr('class', 'tl-video');
                div.appendChild(div1);
                var canvas = document.createElement('canvas');

                canvas.width = 60;
                canvas.height = 60;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 60, 60);
                var img = document.createElement('div');

                $(img).attr({ "title": ViTag.getLocalizeValue("common.delete"), "class": "deleteicon" });
                $(img).attr('onClick', 'ViTag.deleteSnap(' + me.timeline.editsequence + ')');
                if (ViTag.CurrentSrc().sourcetype === ViTag.sourceTypeEnum.youtube) {
                    var imgTag = me.timeline.createImgTag(ViTag.CurrentSrc().snap);
                    div1.appendChild(imgTag);
                }
                else
                    div1.appendChild(canvas);

                var timeLabel = me.timeline.createDiv(me.timeline.editsequence);
                div.appendChild(timeLabel);
                div.appendChild(img);
                return div;
            },

            // swapping timeline snippets using html5 drag events.
            swappingTmLine: function () {

                var cols = document.querySelectorAll('#tmLineSnapshot .tl');
                [].forEach.call(cols, function (col) {

                    col.addEventListener('dragstart', function (e) {

                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('id', e.currentTarget.id);
                        internal.isDragging = true;

                    }, false);

                    col.addEventListener('dragover', function (e) {

                        if (e.preventDefault) {
                            e.preventDefault(); // Necessary. Allows us to drop.
                        }
                        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

                        return false;
                    }, false);

                    col.addEventListener('drop', function (event) {

                        if (internal.isDragging) {
                            event.preventDefault();
                            var drop_target = event.currentTarget;
                            var drag_target_id = event.dataTransfer.getData('id');
                            var drag_target = $('#' + drag_target_id)[0];
                            var tmp = document.createElement('span');
                            tmp.className = 'hide';
                            drop_target.before(tmp);
                            drag_target.before(drop_target);
                            tmp.replaceWith(drag_target);
                        }
                        internal.isDragging = false;

                    }, false);

                });
            },

            //swapping timeline snippets.
            swapping: function () {
                me.ctrl.$startcapture.sortable({
                    axis: 'x',
                    start: function (e, ui) {
                        ViTag.getDivision(e, ui)
                    },
                    cursor: 'move'
                }).disableSelection();
            },
            // <summary>
            /// Edit the Snapshot
            /// </summary>
            editSnapshots: function (tmSrcBunch) {
                $("#startcapture").html("");
                ViTag.debug("visap.edit:editSnapshots:total snippets in the timeline video" + tmSrcBunch.length);

                for (var i = 0; i < tmSrcBunch.length; i++) {
                    var imgTag;
                    var div = document.createElement('div');
                    var img = document.createElement('div');
                    $(img).attr({ "title": ViTag.getLocalizeValue("common.delete"), "class": "deleteicon" });
                    $(img).attr('onClick', 'ViTag.deleteSnap(' + tmSrcBunch[i].sequence + ')');

                    $(div).attr('class', 'tl');
                    $(div).attr('draggable', true);
                    $(div).attr('id', tmSrcBunch[i].sequence);
                    var div1 = document.createElement('div');
                    $(div1).attr('class', 'tl-video');
                    if (tmSrcBunch[i].data.sourcetype === ViTag.sourceTypeEnum.youtube)
                        imgTag = me.timeline.createImgTag(tmSrcBunch[i].data.snap);
                    else imgTag = me.timeline.createImgTag(ViTag.snapRepoPath + tmSrcBunch[i].data.snap);

                    div1.appendChild(imgTag);   //appending delete image
                    div.appendChild(div1);      //append outer div to inner div
                    var timeLabel = me.timeline.createDiv(tmSrcBunch[i].sequence); //createDiv will create div and set class and id attributes.
                    div.appendChild(timeLabel);
                    div.appendChild(img);
                    
                    $("#tmLineSnapshot").append(div);
                    // swapping timeline snippets.
                    me.timeline.swappingTmLine();
                    $('#starttimer' + tmSrcBunch[i].sequence).html(ViTag.getTimeFormat(tmSrcBunch[i].data.duration));
                }
            },

            deleteSnippet: function (sequence, index) {
                $("body").trigger('deleteSnippet', [me.timeline.tmSrcBunch.length, function () {
                    me.timeline.deleteSnippetTags(sequence);
                    me.timeline.tmSrcBunch.splice(index, 1);
                    ViTag.debug("visap.edit:deleteSnippet:this is to remove the snippet from the html"); //splice will delete one src details based on index
                    $("#" + sequence).remove();
                }]);
            },

            // <summary>
            /// Returns the data matching the sequence
            /// </summary>
            ///<param>sequence to be matched </param>
            ///<return>Timeline sourcebunch</return>
            getTmData: function (sequence) {
                var SrcBunch = $.extend(true, [], me.timeline.tmSrcBunch);
                return SrcBunch ? $.grep(SrcBunch, function (e) { return e.sequence === parseInt(sequence); })[0] : null;
            },
            createImgTag: function (src) {
                ViTag.debug("Visap.edit:createImgTag:creating the image" + src);
                var img = document.createElement('img');
                $(img).attr('height', '60');
                $(img).attr('width', '60');
                $(img).attr('src', src);
                return img;
            },
            createDiv: function (sequence) {
                var timelabel = document.createElement('div');
                $(timelabel).attr('id', 'starttimer' + sequence);
                $(timelabel).attr('class', 'tl-duration');
                return timelabel;

            },
            timeLinemessage: function () {
                internal.ShowMessage("playerEdit.msg_saved", "Info", "Timeline.Saved");
                ns.loadData(ViTag.mode, sessionStorage.getItem('AppUser'));
                $("#tmTitle").val("");
                $("#tmDesc").val("");
                $("#startcapture").html("");
                ViTag.isTimelIneMode = false;
                me.ctrl.$timelineContainer.animate({ opacity: 'hide' }, 1500);

            },
            timeLineDeletemessage: function () {
                ViTag.debug("Visap.edit:timeLineDeletemessage:delete message for timeline the image");
                internal.ShowMessage("playerEdit.msg_deleted", "Info", "Delete.");
                ns.loadData(ViTag.mode, sessionStorage.getItem('AppUser'));
                var currentSrc = ns.currentVid;
                var currentSrcTyp = ns.getsourceTypeName(currentSrc.sourcetype);
                //passing video data to visap analytics after deleting a video by raising an event
                ns.passEventData(ViTag.Events.del, currentSrcTyp, currentSrc);
                $("body").trigger("clearContainer");
            },
            getSnippetduration: function (sqense) {
                var prevduration, totalDuration = 0, currntDuration;
                if (ns.CurrentTimelineSrc().src !== undefined && ns.CurrentTimelineSrc().src.length > 0) {
                    for (var j = 0; j < ns.CurrentTimelineSrc().src.length; j++) {
                        totalDuration = totalDuration + ns.CurrentTimelineSrc().src[j].data.duration;
                        if (me.timeline.tmSrcBunch[j].sequence === parseInt(sqense)) {
                            currntDuration = ns.CurrentTimelineSrc().src[j].data.duration;
                            prevduration = totalDuration - currntDuration;

                            return { previous: prevduration, total: totalDuration, current: currntDuration };
                        }
                    }
                }
            },

            currentSnippetTags: function (seqense) {
                var totalvalues = me.timeline.getSnippetduration(seqense);
                for (var i = 0; i < ns.CurrentSrc().tags.length; i++) {
                    var currntTag = ns.CurrentSrc().tags[i];
                    if (currntTag.t > totalvalues.previous && currntTag.t < totalvalues.total) {
                        var updatedvalue = me.timeline.updateAfterDragging(currntTag, seqense);
                        ns.CurrentSrc().tags[i].t = updatedvalue;
                    }
                }

            },
            nextSnippetTags: function (seqense) {
                var totalvalues = me.timeline.getSnippetduration(seqense);
                for (var i = 0; i < ns.CurrentSrc().tags.length; i++) {
                    var currntTag = ns.CurrentSrc().tags[i];

                    if (currntTag.t > totalvalues.previous && currntTag.t < totalvalues.total) {
                        var updatedvalue = me.timeline.addAfterDragging(currntTag, seqense);
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
            deleteSnippetTags: function (seqense) {
                ViTag.debug("visap.edit:deleteSnippet:delete the snippet which has the sequence" + seqense);
                var totalvalues = me.timeline.getSnippetduration(seqense);
                var currTmSrc = ns.CurrentTimelineSrc();
                if (internal.isObjDefined(currTmSrc.tags)) {
                    internal.removeTmLnTags(currTmSrc, totalvalues);
                    internal.updateTmLnTags(currTmSrc, totalvalues, seqense)
                }
                ns.RenderCurrentTags();
            }
        },
        // hide the actions as part of the player when user pause the video
        setContainerVisibility: function (args, status) {
            $(args).each(function (i) {
                $(args[i]).css("display", status);
            });
        },
        isValidTimeFormat: function (newvalue, textboxID, labelID) {
            return (newvalue) ? me.setTextValue(textboxID, labelID) : true;

        },
        getTime: function (newtime) {
            var time = {
                hrs: "",
                min: "",
                sec: ""
            };
            (newtime.length === 3) ? (time.hrs = newtime[0], time.min = newtime[1], time.sec = newtime[2]) : (time.hrs = "00", time.min = newtime[0], time.sec = newtime[1]);
            return time;
        },
        //to set the textbox content
        setTextValue: function (pauseTmTextId, pauseTmAnchorId) {
            var value = $("#" + pauseTmAnchorId)[0].innerHTML;
            $("#" + pauseTmTextId).val($.trim(value));
            return false;
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
            if (childEles[i].id === ns.divid) {
                index = i;
            }
        }
        for (var j = index + 1; j < childEles.length; j++) {
            me.timeline.nextSnippetTags(childEles[j].id);
        }
        me.timeline.currentSnippetTags(ns.divid);
    }

    ns.deleteSnap = function (sequence) {
        ViTag.debug("visap.edit:deletesnap:sequence is the sequence number of snippet to delete" + sequence);
        var index = 0;

        for (var i = 0; i < me.timeline.tmSrcBunch.length; i++) { //this to indentify the index of that sequence number
            if (me.timeline.tmSrcBunch[i].sequence === sequence) //me.timeline.tmSrcBunch contains all the src details and sequence number for the timeline video.
                index = i;
        }
        //Get confirmation to delete snap.
        var msg = ViTag.getLocalizeValue("confirmationMsg.deleteMsg") + " " + ViTag.getLocalizeValue("confirmationMsg.snapshotMsg");
        if($.confirm) {
            $.confirm(msg).then(function (istrue) {
                if (istrue) {
                    me.timeline.deleteSnippetTags(sequence);
                    if (me.timeline.tmSrcBunch.length <= 1) {
                        internal.ShowMessage("playerEdit.msg_onesnippet", "Info", "Timeline.Deleting");
                    } else {
                        me.timeline.tmSrcBunch.splice(index, 1);
                        ViTag.debug("visap.edit:deletesnap:this is to remove the snippet from the html"); //splice will delete one src details based on index
                        $("#" + sequence).remove();
                    }
                }
            });
        }
       else {
           me.timeline.deleteSnippet(sequence,index);
       }
    }

    ns.captureVidSnap = {

        captureVideoDetails: function (startCaptTime, capVidDuration) {
            try {
                var scaleFactor = 0.25;
                var video = document.getElementById("vid1");
                var canvas = me.timeline.capture(video, scaleFactor);

                $("#tmLineSnapshot").append(canvas);
                // swapping timeline snippets.
                me.timeline.swappingTmLine();
                $('#starttimer' + me.timeline.editsequence).html(ViTag.getTimeFormat(capVidDuration));
                ViTag.debug("visap.edit:Timeline:building json data src for the timeline video.");

                var src = { sequence: me.timeline.editsequence, data: { srcTimeline: ViTag.CurrentSrc().src, sourcetype: ViTag.CurrentSrc().sourcetype, snap: ViTag.CurrentSrc().snap, startTime: Math.floor(startCaptTime), duration: capVidDuration, caption: ViTag.CurrentSrc().caption } };
                me.timeline.tmSrcBunch.push(src);
            } catch (err) {
                ViTag.error("visap.edit:Error while capturing data for timeline" + err);
            }
        }
    };

    /// Timeline button validations and finction call to capture data
    ns.timeline = {

        startCaptTime: 0,

        captureVideoDetails: function () {
            try {
                var scaleFactor = 0.25;
                ViTag.debug("visap.editTimeline button validations and finction call to capture data");
                ViTag.isTimelIneMode = true;
                if (ViTag.currentSrcTypeName === "timeline") {
                    internal.ShowMessage("playerEdit.msg_capturedifferentvideo", "Info", "Timeline.Saving");
                    return false;
                }
                if (ViTag.paused() || ViTag.paused() === undefined) {
                    internal.ShowMessage("playerEdit.msg_starttimeline", "Info", "Timeline.Saving");
                    ns.timelineMode = false;
                    return false;
                }
                me.ctrl.$CaptureBtn.removeClass('endCapture');
                var startCap = me.ctrl.$CaptureBtn.attr('class');
                if (startCap === 'startCapture') {
                    ViTag.resetTimer();
                    ViTag.startTimer();
                    startCaptTime = ViTag.getCurrentTime();
                    me.ctrl.$CaptureBtn.removeClass('startCapture');
                    me.ctrl.$CaptureBtn.text(ViTag.getLocalizeValue("timeLine.endCapture"));
                    me.ctrl.$CaptureBtn.addClass('endCapture');
                    $('body').trigger('vidCapture', [true]);//this event will raise when start capture is clicked and disables the save button.
                }
                else {
                    $('body').trigger('vidCapture', [false]);//this event will raise when end capture is clicked and enables the save button.
                    var endCaptTime = ViTag.getCurrentTime();
                    if (startCaptTime > endCaptTime) {
                        me.ctrl.$CaptureBtn.addClass('endCapture');
                        internal.ShowMessage("playerEdit.msg_startendtime", "Info", "Timeline.Saving");
                        return false;
                    }
                    else {
                        var capVidDuration = endCaptTime - startCaptTime;
                        var video = document.getElementById(PlayerId);
                        var canvas = me.timeline.capture(video, scaleFactor);
                        me.ctrl.$startcapture.append(canvas);
                        me.timeline.swapping();//swapping timeline snippets.
                        ViTag.clearTimer();
                        $('#starttimer' + me.timeline.editsequence).html(ViTag.getTimeFormat(capVidDuration));
                        me.ctrl.$CaptureBtn.removeClass('endCapture');
                        me.ctrl.$CaptureBtn.text(ViTag.getLocalizeValue("timeLine.startCapture"));
                        me.ctrl.$CaptureBtn.addClass('startCapture');
                        ViTag.debug("visap.edit:Timeline:building json data src for the timeline video.");

                        var src = { sequence: me.timeline.editsequence, data: { srcTimeline: ViTag.CurrentSrc().src, sourcetype: ViTag.CurrentSrc().sourcetype, snap: ViTag.CurrentSrc().snap, startTime: Math.floor(startCaptTime), duration: capVidDuration, caption: ViTag.CurrentSrc().caption } };
                        me.timeline.tmSrcBunch.push(src);
                    }
                }
            } catch (err) {
                ViTag.error("visap.edit:Error while capturing data for timeline" + err);
            }
        }
    };

    ns.editTmlineVideo = function(_id) {
        try {
               ViTag.isTimelIneMode = true;
               ViTag.debug("Visap.edit:editTimeLine:TimelineID which is getting  edited " + _id);
               ns.editTmSrcdetials = ViTag.getSource(_id);
               me.timeline.timelineSrc = ViTag.GetMetaData(ns.editTmSrcdetials);
               me.timeline.tmSrcBunch = $.extend(true, [], ns.editTmSrcdetials.src); //the extend method will remove the pointer reference.
               ns.editTimelineMode = true; // no need to display actions in creation/edit of timeline video.
               ns.suppressActions = true;
               me.timeline.editSnapshots(me.timeline.tmSrcBunch);
           }
           catch (err) {
               ViTag.error("visap.edit:editTmlineVideo:Error while editing the timeline functionality");
           }
       }


    // <summary>
    /// Edit Timeline
    /// </summary>
    ///<param="_id">unique ID</param>
    ns.editTimeLine = function (_id) {
        try {
            ViTag.isTimelIneMode = true;
            ViTag.debug("Visap.edit:editTimeLine:TimelineID which is getting  edited " + _id);
            ns.editTmSrcdetials = ViTag.getSource(_id);
            me.timeline.timelineSrc = ViTag.GetMetaData(ns.editTmSrcdetials);
            me.timeline.tmSrcBunch = $.extend(true, [], ns.editTmSrcdetials.src); //the extend method will remove the pointer reference.
            $("#editContainer").hide();
            $("#timelineContainer").show();
            ns.editTimelineMode = true; // no need to display actions in creation/edit of timeline video.
            ns.suppressActions = true;
            me.ctrl.$tmTitle.val(unescape(ns.editTmSrcdetials.title));
            me.ctrl.$tmDesc.val(unescape(ns.editTmSrcdetials.desc));
            me.timeline.editSnapshots(me.timeline.tmSrcBunch);
        }
        catch (err) {
            ViTag.error("visap.edit:editTimeLine:Error while editing the timeline functionality");
        }
    };

    ns.newTimeline = function () {
        me.timeline.tmSrcBunch = [];
        ns.suppressActions = true;// no need to display actions in creation/edit of timeline video.
    };
    var sec = 0, min = 0, hrs = 0, BeginTimer = null;
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

    ns.startTimer = function () {

        BeginTimer = setInterval(function () {
            sec++;
            if (sec === 60) {
                sec = 0;
                min++;
            }
            if (min === 60) {
                min = 0;
                hrs++;
            }
            if (sec === 60 && min === 60) {
                sec = 0;
                min = 0;
                hrs++;
            }
            var DisplayMinutes = (hrs < 10 ? '0' + hrs : hrs) + ":" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec);
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

        me.ctrl.$lblWrgMsg.text('');
        var videoTitle = $.trim(me.ctrl.$fileTitle.val()),
            videoDesc = me.ctrl.$fileDesc.val();
        //validation for video title and description.
        if (ns.util.isTextFieldEmpty(videoTitle, "playerEdit.msg_title", "Validation", "Upload.Saving") || ns.util.isTextFieldEmpty(videoDesc, "playerEdit.msg_description", "Validation", "Upload.Saving")) {
            return false;
        }
        //Restricting only special characters in the title by validating string method.
        if (!internal.validateString(videoTitle)) {
            internal.ShowMessage("playerEdit.msg_nonsupportedtitle.", "Validation", "Upload.Saving");
            return false;
        }
        var videoCategory = me.ctrl.$fileCategory.val();
        if (!internal.validateVideoCategory(videoCategory)) {
            return false;
        }
        var id = 0;//while creating id should be zero.
        if (!(ViTag.util.tittleDuplicateCheck(id, videoTitle.toLowerCase()))) {
            internal.ShowMessage("playerEdit.msg_duplicatetitle", "Validation", "Upload.Saving");
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
            internal.ShowMessage("playerEdit.msg_uploadmp4", "Validation", "Upload.Saving.AlertMsg");
            return false;
        }

        me.ctrl.$lblWrgMsg.css({ "visibility": "hidden" });

        var data = new FormData(), file = me.ctrl.$vidFile[0].files[0], replaceVid = true, ccfile = me.ctrl.$captionFile[0].files[0];// cc= closed caption
        var ccFileName = null;
        if (internal.validateFileName(file.name) === true) {
            internal.ShowMessage("playerEdit.msg_illegalvideofilename", "Validation", "Upload.Saving.AlertMsg");
            me.ctrl.$vidFile.val("");
            return false;
        }
        //checks for illeagal cahraters in caption file name.
        if (me.ctrl.$captionFile.val() !== "" && internal.validateFileName(ccfile.name) === true) {
            internal.ShowMessage("playerEdit.msg_illegalcaption", "Validation", "Upload.Saving.AlertMsg");
            me.ctrl.$captionFile.val("");
            return false;
        }

        //caption file type(vtt) validation.
        if (internal.checkCcFileType(me.ctrl.$captionFile) === true) {
            internal.ShowMessage("playerEdit.msg_uploadvtt", "Validation", "Upload.Saving.AlertMsg");
            return false;
        }

        //appending caption file if caption file is imported.
        if (me.ctrl.$captionFile.val() !== "") {
            data.append(ccfile.name, ccfile);
            ccFileName = ccfile.name;
        }
        if (me.upload.getSource(ViTag.source, file.name)) {
            replaceVid = false;
            var msg = ViTag.getLocalizeValue("playerEdit.msg_video") + " " + file.name + " " + ViTag.getLocalizeValue("playerEdit.msg_newvideo");
            internal.ShowMessage(msg, "Validation", "Upload.Saving.AlertMsg");
        }
        ViTag.debug("Visap.edit:upload:Uploading video for the source:  " + file.name);
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
                success: function () { me.upload.getVidSS(file.name, ccFileName); },
                beforeSend: internal.ShowMessage("playerEdit.msg_uploading", "Info", "UploadImage.Saving"),
                error: me.upload.error
            });
        }
    };
    //upload video related code ends
    //publish video starts
    // <summary>
    /// Publish button is clicked below function is executed
    /// </summary>
    ///<param="isSinglePublishID">single video publishing ID</param>
    ns.publish = function (isSinglePublishID) {
        try {
            //List of checked items, src
            var idList = [], $chkList = $("[name = 'chklist']:checked"), staged = null, usrD = null;



            if (!($chkList.length > 0) && !isSinglePublishID) {
                internal.ShowMessage("playerEdit.msg_onevideotopublish", "Info", "Publish.Publishing");
                return false;
            }
            if ($chkList.length > 0) {
                $chkList.each(function () {
                    idList.push(this.value);
                });
            }
            else {
                ViTag.debug("Visap.edit:publish:singleVideopublished:" + isSinglePublishID)
                idList.push(isSinglePublishID);
            }
            ns.doPublish(ViTag.source, idList);
            ns.passEventData(ViTag.Events.publish, "", idList);
            //Save User Data
            setTimeout(function () {
                $("[name = 'chklist']").attr('checked', false);
                $("#selectchkBox").attr('checked', false);
            }, 3000);
        } catch (err) {
            ViTag.error("visap.edit:publish:Error while publishing" + err);
        }
    };
    //publish video ends
    ns.addMessageHandler = function (fn) {
        me.messageHandler = fn;
    };

    //Displaying Whiteboard on the video conatainer.
    //based on radio button values
    ns.DisplayingWhiteboard = function (directiovalue) {
        try {
            //var direction = (directiovalue !== undefined?directiovalue:$('input[name="direction"]:checked').val()); //getting position radio button value.
            var direction = $('input[name="direction"]:checked').val();
            var val = $('input[name="switchwbAction"]:checked').val();
            if (val === 'wbtext') {
                me.ctrl.$wboardContainer.css('width', ''); //To clear previous width of the whiteboard.
            }
            me.whiteboardData.removeWbclass();//removing previous class.
            me.whiteboardData.SlidingWhiteboard(direction);//sliding wb depending on left or right option.
        }
        catch (err) {
            ViTag.error("visap.edit:DisplayingWhiteboard:Error while displaying whiteboard" + err);
        }
    };

    // Creation of ckeditor object.
    ns.showTextWB = function (isActionsaved) {
        try {
            me.ctrl.$textcontainerWB.show();//show ck editor.
            //To clear previous sketch
            internal.imager = null;
            ns.sketchDataWhiteboard = null;
            ns.sketchDataDefault = null;
            me.ctrl.$sketchcontainerWB.html('');
            //Clear all previous data.
            me.ctrl.$whiteboardDuration.val("");
            me.ctrl.$cmtWiteboard.html("");
            me.ctrl.$textcontent.html("").css('z-index', "-1");

            me.ctrl.$wbdragbar.css('display', 'block');
            me.ctrl.$WbimgOverlay.hide();
            me.ctrl.$imgOverlay.hide();

            me.whiteboardData.removeWbclass();//removing previous class.
            // multiple inistialisation of sketches is avoided here after saving sketch
            if (isActionsaved === undefined && !isActionsaved) {
                me.ctrl.$sketchcontainerDefault.html('');
                ViTag.sketchInitialise({ container: "sketchcontainerWB" });
                ns.sketchcontainer = "sketchcontainerWB";
                me.whiteboardData.initCkEditorWb();//displaying ck editor on wb.
            }

            ViTag.animateWb("left", "53%", me.whiteboardData.setEditorHeight);//Sliding whiteboard.
        }
        catch (err) {
            ViTag.error("visap.edit:showTextWB:Error while displaying text and whiteboard" + err);
        }
    };

    //All the generic validations need to place in this namespace.
    ns.util = {

        tittleDuplicateCheck: function (id, currentTtl) {
            var isValidTittle = true;
            for (var i = 0; i < ViTag.source.length; i++) {
                if ((id === 0 || id !== ViTag.source[i]._id) && (unescape(ViTag.source[i].title.toLowerCase()) === $.trim(currentTtl))) {
                    isValidTittle = false;
                    break;
                }
            }
            return isValidTittle;
        },

        duplicateCheck: function (obj) {
            for (var i = 0; i < obj.length; i++) {
                ns.util.removeDuplicateValue(obj, i);
            }
            return obj;
        },
        removeDuplicateValue: function (obj, i) {
            for (var j = 0; j < obj.length; j++) {
                if (i != j) {
                    if (obj[i].toLowerCase() === obj[j].toLowerCase()) {
                        obj[i] = obj[i].toLowerCase();
                        obj.splice(j, 1);
                    }
                }
            }
        },

        timeFormat: function (time, callback) {
            ViTag.debug("visap.edit: timeFormat:to validate the timeformat hh:mm:ss for the time " + time);
            var newTime = time.split(":");
            for (var i = 0; i < newTime.length; i++) {
                if (newTime[i].length !== 2 || newTime.length === 1) {
                    if (newTime.length === 3) {
                        if (callback) {
                            callback("please use the correct format(hh:mm:ss)");
                        } else {

                            internal.ShowMessage("playerEdit.msg_format", "Validation", "Action.Saving.AlertMsg"); //newTime length is 3 means its in hh:mm:ss
                        }

                    }
                    else {
                        if (callback) {
                            callback("please use the correct format(hh:mm:ss)");
                        } else {
                            internal.ShowMessage("playerEdit.msg_correctformat", "Validation", "Action.Saving.AlertMsg"); //newTime length is 2 means its in mm:ss
                        }

                    } return true;
                }
            }
        },

        isTextFieldEmpty: function (textValue, msg, type, source) {
            if ($.trim(textValue) === "") {
                internal.ShowMessage(msg, type, source);
                return true;
            }
        },

        isDurationZero: function (textValue, msg, type, source, id) {
            if (parseInt(textValue) === 0) {
                internal.ShowMessage(msg, type, source);
                id.val("");
                return true;
            }
        },

        isCharacterExist: function (textValue, msg, type, source, id) {
            var regex = /^[0-9]*(?:\.\d{1,2})?$/;  // allow only numbers [0-9]
            if (!regex.test(textValue)) {
                internal.ShowMessage(msg, type, source);
                id.val("");
                return true;
            }
        },

        checkMaxDuration: function (textValue, msg, type, source, id) {
            if (parseInt(textValue, 10) > 180) {
                internal.ShowMessage(msg, type, source);
                id.val("");
                return true;
            }
        }
    };

    ns.getTagData = function (val) {
        return internal.getTagData(val);
    }

    // When user pauses the video if any actions and its tools container are visible thats needs to hidden
    ns.suspendAction = function (index) {
        ns.suppressActions = true;
        var questions = "#questions";

        switch (index) {
            case 2:
                // do for sketch:
                ns.sketchcontainer = "sketchcontainerDefault";
                $(sketchcontainerDefault).show().html('');
                me.setContainerVisibility([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay], "none");//for localization
                // need some time for Player container 
                // to expand 100% width
                setTimeout(function() {
                    ns.resetSketches();    
                }, 500);
                
                break;
            case 3:
                //annotation
                me.setContainerVisibility([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault], "none");
                break;
            case 4:
                // question
                me.setContainerVisibility([whiteBoardWrapper, hotspotCircle, annotates, imgOverlay, sketchcontainerDefault], "none");
                break;
            case 5:
                // do for whiteboard
                ns.sketchcontainer = "sketchcontainerWB";
                $('.canvascontainerWB').hide();
                ns.isSketchInitialisedforWB = false;
                me.setContainerVisibility([hotspotCircle, annotates, imgOverlay, sketchcontainerDefault, questions], "none");
                break;
            case 6:
                me.setContainerVisibility([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault], "none");
                break;
            default:
                me.setContainerVisibility([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault], "none");

        }
    }

    // when user resumes the video then hidden actions are needs to be visible
    ns.resumeAction = function (index) {
        ns.suppressActions = false;
        ns.hideSketches();
    }

    // update start time of the action in an accordian
    ns.SaveActionTimeHeader = function (pauseTime, index, callback) {
        if ($('#headerActionTimeTextBox' + index).css("display") === "none") {
            return false;
        }

        var newTime = $('#headerActionTimeTextBox' + index).val().split(":");
        var labelID = "headerActionTimeLabel" + index;
        var textboxID = "headerActionTimeTextBox" + index;
        var returnValue = ns.util.timeFormat($('#headerActionTimeTextBox' + index).val(), callback); //newly entered value in the text box for editing action pausetime.
        var isValid = me.isValidTimeFormat((newTime !== '') ? returnValue : true, textboxID, labelID);//to validate the newly entered time HH:mm:ss
        if (!isValid) { return; }

        var obj = me.getTime(newTime);
        var newTimeInsec = ns.getTimeInSeconds(obj.hrs, obj.min, obj.sec); //to get the time in seconds
        ns.updatePauseTime(pauseTime, newTimeInsec, labelID, textboxID, callback);
        ns.playAt(newTimeInsec);

    };


    //validate text box only for digits excluding : and space.
    ns.validateDigits = function (textBoxID) {
        $("#" + textBoxID).keypress(function (e) {
            //arr which contians only allowed values in text box.
            var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", " "]
            var c = arr.indexOf(e.key);
            if (c < 0) {
                return false;
            }
        });
    };

    //Deletion of the single action
    ns.deleteAction = function (StartTime, CurrentTime, type, callback) {
        try {
            var questionId = [];
            var Listactions = ViTag.getPausedAction(CurrentTime);
            var editedAction = ns.getEditedListAction(type, Listactions, StartTime);
            if (editedAction.data.questionId) {
                questionId = [editedAction.data.questionId];
            }
            ViTag.RemoveAction(StartTime, CurrentTime, type, questionId, callback);
            if (type === 'questions' && editedAction.sourcetype !== undefined && editedAction.sourcetype === "aelib") {
                ViTag.aelib.deleteQuestion(editedAction.data.questionId, editedAction.data.StartTime);
                ns.clrQuesContainer();
            }
        } catch (err) {
            ViTag.error("Edit:RemoveAction: Error while removing action " + err);
        }
    };

    //Switch between sketch and text option of the white board
    ns.toggleWhiteboardSketch = function (id) {
        if (id === "wbtext") {
            internal.wasTextMode = true;
            me.whiteboardData.switchTotext();
            me.whiteboardData.setEditorHeight();
            $('#sketch').hide();
            ViTag.debug("Visap.edit: Switch between text and Sketch of the Wb: Text Mode selected");
        }
        else {
            $('#sketch').show();
            internal.wasTextMode = false;
            internal.wbTxtHeight = ViTag.whiteboardTxtHeight();
            ViTag.debug("Visap.edit: Switch between text and Sketch of the Wb: Sketch Mode selected");
            //sketcher instance can not be initialised multiple times
            // when user clicks on edit whitebord sketch or newly creation of the sketch in whiteboard 
            if (!ns.isSketchInitialisedforWB) {
                me.whiteboardData.sketchWhiteboard(internal.wbTxtHeight);
                ns.isSketchInitialisedforWB = true;
            }

            me.whiteboardData.switchToSketch();
        }
    }

    //To remove Ck-Editor in play mode
    ns.removeCKobjects = function () {
        try {
            if (window.CKEDITOR !== undefined) {
                ViTag.debug("Visap:removeCKobjects:if ckEditor exists destroy it while toggling");
                if (ns.editor.ckEditorInstanceAvilable(cmtWiteboard) || ns.editor.ckEditorInstanceAvilable(cmtDesc)) {
                    for (obj in CKEDITOR.instances) {
                        var instance = CKEDITOR.instances[obj];
                        instance.destroy()
                    }
                }

            }

        }
        catch (err) {
            ViTag.error("Visap:removeCKobjects:Error while removing Ck-Editor in play mode" + err);
        }
    }

    // to get perticular question data for editing question
    ns.getQuestionActionList = function (type, listaction, startTime) {
        try {
            var list;
            if (listaction !== undefined && listaction.length > 0) {

                ViTag.debug("visap.edit:getEditedListAction:Get the all the actions list for the type:" + type + "," + startTime + "," + listaction.length);
                //loop through inside actions based on type and starttime get 
                //the relavaent
                $(listaction).each(function (i) {
                    if (startTime === listaction[i].data.StartTime && type === listaction[i].type) {
                        list = listaction[i];
                        return false;
                    }
                });
                return list;
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:getEditedListAction: Error while getting edited action list" + err);
        }
    };

    // after preview of hotspot or annotation respective positions
    ns.getModifiedPosition = function (container) {
        var width = $(container).outerWidth();
        var height = $(container).outerHeight();
        var left = $(container)[0].style.left;
        var top = $(container)[0].style.top;
        return { width: width, height: height, left: left, top: top };
    }

    // set the dragable events while in preview mode of the hotspot
    ns.setDraggable = function () {
        $("#hotspotCircle").attr('draggable', 'true');// draggable was not very smooth and hence set dargballe attr added
        $("#hotspotCircle").unbind("click");
    }

    //To publish video
    ns.doPublish = function (videoList, idList,callback) {
        var chkList = [];
        //To publish the data for analytics
        ns.postpublishData = [];

        if (idList.length > 0) {
            chkList = idList;
        }

        for (var i = 0; i < chkList.length; i++) {
            var obj = {}, analyticsObj = {};;
            var checkedsrc = idList[i];
            staged = me.publish.getStageMetadata(videoList, checkedsrc);
            usrD = me.publish.getUserMetadata(checkedsrc);
            obj.id = staged.title;
            //post data for analytics 

            analyticsObj.user = ns.getUserInfo();
            analyticsObj.action = "Publish";
            analyticsObj.object = obj;

            ns.postpublishData.push(analyticsObj);
            //Extend to merge in internal.userSrc
            if (usrD === null || usrD === undefined) {
                // ViTag.debug("Visap.edit:publish:first time publish and userdata is null so staging data is considered:" + isSinglePublishID);
                //This condition is checked to replace the question id with the new question id (while publishing for the first time)
                if (staged.actions && staged.actions.length > 0)
                    me.publish.createQuestDataCopy(staged.actions[0].listAction);                
                if(callback){
                    me.publish.savePublishVideo(JSON.stringify([staged]), callback.onSaving,callback.onSave,callback.onError);
                }else{
                    me.publish.savePublishVideo(JSON.stringify([staged]), me.publish.MsgSaving, me.publish.MsgSaved, me.publish.MsgError);
                }
                
                ViTag.debug("Visap.edit:publish:published successfully");
            }
            else {
                ViTag.debug("Visap.edit:publish:user data" + usrD.title + "," + usrD.desc + "and staged data" + staged.title + "," + staged.desc);
                me.publish.extendAttrs(usrD, staged);
                if(callback){
                    me.publish.savePublishVideo(JSON.stringify([usrD]), callback.onSaving,callback.onSave,callback.onError);
                }else{
                    me.publish.savePublishVideo(JSON.stringify([usrD]), me.publish.MsgSaving, me.publish.MsgSaved, me.publish.MsgError);
                }
                internal.userSrcDetails = null;
                ViTag.debug("Visap.edit:publish:published successfully");
            }
        }
    }

    // hh:mm:ss to seconds
    ns.getTimeinSeconds = function(timevalue){
        return  me.getTagTimeInseconds(timevalue);
      }

      // check tag is present in the list 
      ns.checkForTagExist = function(isEdit,previousTag,currentTag,callback){
        if (ns.CurrentTags()) {
            var u = $.grep(ns.CurrentTags(), function (u) {
                if (isEdit) {
                    if (u.d.toLowerCase() !== previousTag.toLowerCase()) {
                        return unescape(u.d.toLowerCase()) === ($.trim(currentTag)).toLowerCase();
                    }
                } else
                    return unescape(u.d.toLowerCase()) === ($.trim(currentTag)).toLowerCase();
            })[0];
            if (u) {
                callback("The tag is already present in the list");
                return true;
            }
        }
      }

      // check links is present in the list 
      ns.checkForLinkExist = function(isEdit,previousLink,currentLink,callback){
        if (ns.CurrentLinks()) {
            var linkName = $.grep(ns.CurrentLinks(), function (lnk) {
                if (isEdit) {
                    if (unescape(lnk.n.toLowerCase()) !== previousLink.toLowerCase()) {
                        return unescape(lnk.n.toLowerCase()) === ($.trim(currentLink)).toLowerCase();
                    }
                } else {
                    return unescape(lnk.n.toLowerCase()) === ($.trim(currentLink)).toLowerCase();
                }

            })[0];
            if (linkName) {
                callback("Link name is already present in the list");
                return false;
            }
        }
      }

      ns.getCategoriesbyVideoid = function (id,callback) {
        var userName = sessionStorage.getItem('authT');
        var categorylist;
        $.ajax({
            url: ViTag.config.wsCategorySearchurl,
            type: "GET",
            headers: { isStage: ns.isStaging, 'X-Authorization': userName },
            data: { videoid: id },
            async: false,
            success: function (data) {
                categorylist = JSON.parse(data);
                callback(categorylist);
            },
            error: function () {
                ViTagUI.initMsg("msg.errorMsg", "Info", "GetData.Error");
            }
        });
        return categorylist;
    };

    ns.YTVideoUpload = function(ytVideoID,source,callback){ 
       me.upload.initYTplayer(ytVideoID,source, callback);
    }

    // set the video pauseTime 
    ns.setVideoPauseTime = function(pauseTime){
        internal.vidPauseTm = pauseTime
    }
 
  

})(window.ViTag = window.ViTag || {});

