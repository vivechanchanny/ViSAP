(function (ns) {
    //#region Public 
    /// <summary>
    /// Init-Creates elements,extends parameters ,bind events required
    ///loads initial data from database
    /// </summary>
    /// <param name="args">args which has to be overridden</param>
    /// <returns>args which will be used in edit</returns>
    ns.analyticsObj = {}; //This object is used to post data to GA or tincan in multiple places. 
    ns.getRoleName = function (roleNum) {
        switch (roleNum) {
            case "4":
                return "Student";
            case "3":
                return "Instructor";
        }
    }
    ns.Events = {
        add: "add", edit: "edit", createAction: "createAction",
        deleteAction: "deleteAction", "editAction": "editAction", play: "play",
        shared: "shared", publish: "publish", search: "search", del: "delete", playCtl: "playCtl"
    }

    //#region Private

    /// <summary>            
    ///Generic list contains all actions to be show when the
    /// respective actions startTime matches and less than the duration
    ///sequence of action had blinking issue hence list to used to show thection and delete
    /// </summary> 

    var CurrentActions = {
        _anotateList: [],
        _SketchList: [],
        _HotspotList: [],
        _WhiteboardList: [],

        _handlers: function () {
            return [sketcher.tickHandler, annotator.tickHandler, hotspot.tickHandler, whiteboard.tickHandler, test.tickHandler];
        },

        add: function (eTime, obj, type) {
            if (type === "annotation") {
                CurrentActions._anotateList = []; // Fix for the object which has not ended and still available in list 
                ViTag.debug("CurrentActions:annotation:pushes the annotation object to annataionlist having endtime:" + eTime + " action type is " + type);
                CurrentActions._anotateList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._anotateList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            if (type === "sketch") {
                CurrentActions._SketchList = []; // Fix for the object which has not ended and still available in list 
                ViTag.debug("CurrentActions:pushes the object to annataionlist:" + eTime + " action type is " + type);
                CurrentActions._SketchList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._SketchList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            if (type === "hotspot") {
                CurrentActions._HotspotList = []; // Fix for the object which has not ended and still available in list 
                ViTag.debug("CurrentActions:annotation:pushes the hotspot object to hotspotlist having endtime:" + eTime + " action type is " + type);
                CurrentActions._HotspotList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._HotspotList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            if (type === "whiteboard") {
                CurrentActions._WhiteboardList = []; // Fix for the object which has not ended and still available in list 
                ViTag.debug("CurrentActions:whiteboard:pushes the annotation object to whiteboardlist having endtime:" + eTime + " action type is " + type);
                CurrentActions._WhiteboardList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._WhiteboardList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            //Sort based on endTime
        },

        getCurrentActionList: function (type) {
            switch (type) {
                case "annotation":
                    return CurrentActions._anotateList;
                case "sketch":
                    return CurrentActions._SketchList;
                case "whiteboard":
                    return CurrentActions._WhiteboardList;
                case "hotspot":
                    return CurrentActions._HotspotList;
                default:
                    break;
            }

        },

        removeList: function (ActionList, obj) {
            for (var i = 0; i < ActionList.length; i++) {
                if (!ActionList[i].listObj.isEnded) {
                    ActionList.splice(i, 1);
                    ActionList[i].listObj.isEnded = true;
                }
            }
        },
        remove: function (obj, type) {
            ViTag.debug("remove:removing the object from the list:" + type);
            var ActionList = CurrentActions.getCurrentActionList(type);
            CurrentActions.removeList(ActionList, obj);

        }
    };

    /// <summary>            
    ///Init of all actions list,showing the actions in respective time    
    /// </summary> 
    var allActions = {

        init: function (curSrc, type, arrayType) {
            if (curSrc.actions === undefined)
                return false;
            ViTag.debug("Visap:allActions:init:Intilizaion of the actions list for the type" + type);
            //pass the CurrentActionList to action list
            arrayType = ns.CurrentActionList(type);
            arrayType.sort(function (a, b) { return a.StartTime - b.StartTime });
            return arrayType;
        },

        //gets the next  object matching the passed time
        getNext: function (t, ArrayListType) {
            ViTag.debug("Visap:getNext:gets the next action object matching the  time" + t);
            var lst = ArrayListType;
            var found = null;
            lst.sort(function (a, b) { return b.StartTime < a.StartTime });
            if (lst.length > 0) {
                for (var i = 0; i < lst.length; i++) {
                    if (Math.floor(lst[i].StartTime) > t && found != null) {
                        break;
                    }
                    if (Math.floor(lst[i].StartTime) <= t && t <= Math.floor(lst[i].StartTime + lst[i].duration)) {
                        found = lst[i];
                    }
                }
            }
            return found;
        },


        //tickhandler is  called every second
        tickHandler: function (d, type, typeOfActionList, actionType, ArrayListType) {
            if (ns.suppressActions) {
                return false;
            }
            var a = allActions.getNext(d.t, ArrayListType);
            //If tick time cross the start time of the annotation and if the tick time less than the duration 

            if (a && !allActions.checkObject(a, typeOfActionList)) {
                //Endtime is addition of start time and duration
                var endTime = Math.floor(a.StartTime + a.duration);
                //type is not sent later to remove
                CurrentActions.add(endTime, a, type);

                //begin the action
                actionType.begin(a);
            }
            if (a == null)
                actionType.end(null);
            var endObj = typeOfActionList[0];
            if (endObj !== undefined && (d.t > endObj.endTime || d.t < endObj.listObj.StartTime)) {
                //remove the action from list
                CurrentActions.remove(endObj, type);
                //end the  respective action 
                actionType.end(endObj);
            }
        },

        checkObject: function (obj, typeOfActionList) {
            for (var i = 0; i < typeOfActionList.length; i++) {
                if (typeOfActionList[i].listObj !== undefined && typeOfActionList[i].listObj === obj) {
                    return true;
                }
            }
            return false;
        }
    };

    /// <summary>            
    ///pauseOnShow method:If pauseOnShow is enabled,will check the object.
    /// </summary>
    var pauseOnShow = {

        checkObj: function (startTime, duration) {
            var objfound = false;
            var endTime = Math.floor(startTime + duration);
            var currentTime = Math.floor(ns.getCurrentTime());
            if (currentTime === endTime)
                objfound = true;
            return objfound;
        }
    };

    //private method:posting data to analytics.
    var analytics = {

        // posting max time played to GA.
        postingTimeInterval: function (currentTime) {
            try {
                if (ViTag.CurrentSrc() !== null) {
                    var vidDuration = ViTag.CurrentSrc().videototalduration; //get video total duration.
                    //Interval time should be less then video duration.
                    var interval = (ns.postingVidTmInterval < vidDuration) ? ns.postingVidTmInterval : vidDuration;

                    if (ns.postedTime + interval <= currentTime) {
                        ns.postedTime = currentTime;
                        if (currentTime >= ns.postedTime) {
                            $(document).trigger("VisapLog", { "duration": "duration", "time": currentTime });
                        }
                    }
                }
            } catch (err) {
                ViTag.error("Visap:analytics.postingTimeInterval:Error while posting durtion " + err);
            }
        }
    };

    ns.playClick = function () {
        me.playClick();
    };

    var me = {

        //Arrays declared further to be used
        curSrc: {},
        ctrl: {},
        curHeader: {},
        getMetaDataTimeLine: {},
        isTimeline: false,
        messageHandler: null,
        registeredActionList: null,
        seekBarSeeking: false,
        vidWidthRatio: 1,
        vidHeightRatio: 1,
        isDragging: true,
        isResizing: true,
        isSnpChange: false, //isSnpChange is a flag used to check whether youtube snippet is changed in timeline videos.
        ytForceStop: false, //this variable is used to stop youtube video(when player is in unstarted mode).
        init: function (actionTypes) {
            registeredActionList = actionTypes;
        },
        _misc: {
            SupportsHTML5: function () {
                return (me.ctrl.video.autoplay !== "");
            },
            debug: function (s) {
                if (window.console && window.console.debug)
                    window.console.debug(s);
            }
        },

        ShowMessage: function (msg, type, source) {
            if (me.messageHandler)
                me.messageHandler(msg, type, source);
        },

        /// <summary>
        /// Based on unique GUID source is searched 
        /// </summary>   
        SetCurrentSrc: function (_id) {
            ViTag.debug("Visap:SetCurrentSrc:Based on unique GUID source is searched " + _id);
            return ns.source ? $.grep(ns.source, function (e) { return e._id === _id; })[0] : null;
        },

        /// <summary>
        /// Based on sourcetype return text
        /// </summary>   
        currentSrcTypeName: function () {
            ViTag.debug("Visap:currentSrcTypeName: gets the sourcetype of the current video");
            return me.sourceTypeName(ns.CurrentSrc().sourcetype);
        },
        //To get the source type name
        sourceTypeName: function (type) { //type may be{0[uploaded],1[youtube],2[timeline],3[directURL]}
            switch (type) {
                case 0:
                    return "uploaded";
                case 1:
                    return "youtube";
                case 2:
                    return "timeline";
                case 3:
                    return "directURL";
                default:
                    break;
            }
        },
        /// <summary>
        /// Time update invokes when video starts playing to get currentTime for the 
        /// custom seekbar
        ///currentSrcTypeName means either upload,yt or timeline
        /// </summary>
        /// <returns>Returns updated time</returns> 
        timeUpdate: function () {
            if (!me.seekBarSeeking) {
                me[ns.currentSrcTypeName].timeupdate();
            }
        },

        /// <summary>
        ///This method can be user to reset any functionalitys of player.
        /// </summary>
        resetCustomState: function () {
            try {
                me.timeline.resetSate();
                me.youtube.resetSate();
            } catch (err) {
                ViTag.error("Visap:resetCustomState:Error while reseting custum state " + err);
            }
        },

        /// <summary>
        /// All functionality related to uploaded video in upload namespace
        /// </summary>   
        uploaded: {

            /// <summary> 
            /// Play uploaded video based on source
            /// </summary>   
            play: function (src, isTimeline) {
                ViTag.debug("Visap:uploaded: playing uploaded video" + src + "," + isTimeline);
                //check the condition if video is definrd or not
                if (me.ctrl.$video === undefined)
                    return false;
                // If youtube player API added
                me.ctrl.$playerDiv.css("display", "none");
                me.ctrl.$video.css("display", "block");
                if (ns.yt.player) {
                    ns.yt.player.stopVideo();//stops youtube video when snippet changes from yt to static video.
                    me.ctrl.video.play();
                }
                ns.yt.enabled = false;
                // Height and width will set when full screen mode on
                //video attr source is set the repo path with source name 
                //This method will get the video token
                if (ViTag.tokenURL != null) {
                    ViTag.getVideoAuthToken(ViTag.videoId);
                }

                me.ctrl.$video.attr("src", me.video.path + src + "?t=" + ViTag.tokenId);
                $("body").trigger("playVideo"); //raising an event to play the video in android device
                me.ctrl.$video.removeAttr("width");
                me.ctrl.$video.removeAttr("height");
                var capSrc = null;
                if (!isTimeline) {  //These two lines of code should not execute for the timeline videos.so checking this condition
                    me.renderAttrs(src);
                    ViTag.debug("Visap:uploaded: raise an event if the playing source gets changed");
                    $("body").trigger("onSrcChange", src);
                    //uplodaded closed caption name.
                    capSrc = ViTag.CurrentSrc().caption;
                    caption.init(capSrc);//initialization of caption for uploaded video.
                }
            },
            //This function is written to set the currenttime value.
            //(firefox is not allowing to set the currenttime immediately after playing the video so,recursively calling this function in catch block)
            playAt: function (t) {
                try {
                    me.ctrl.video.currentTime = t;
                } catch (err) {
                    setTimeout(function () { me.uploaded.playAt(t) }, 100);
                }
            },
            ///to assign the src and to play from the particular time.(src is source name and type of that source(youtube,directurl,uploaded))
            playFromTime: function (src, time) {
                ViTag.debug("Visap:playFromTime:to assign the src and to play from the particular time" + src + "," + time);
                me.uploaded.play(src, true); //this will invoke play of particular video.
                me.uploaded.playAt(time); //this will invoke playAt of particular video.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>

            pause: function () {
                me.ctrl.video.pause();
            },

            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                return me.ctrl.video.paused;
            },

            ///<summary>
            /// stops the video and stops the timer.tick method.
            ///</summary>
            stop: function () {
                me.uploaded.pause();
                timer.clearInterval();
            },

            /// <summary>
            /// Gets the currentTime of video
            /// </summary>   
            /// <returns>Returns current time of video</returns>
            currentTime: function () {
                return me.ctrl.video.currentTime;
            },

            /// <summary>
            ///sets the text of the duration and the playing timw
            /// </summary>   

            timeupdate: function () {
                me.cp.getplayTimer();
                //Formula for the seek position
                if (Math.floor((100 / me.ctrl.video.duration) * me.ctrl.video.currentTime) >= 0) {
                    me.cp.ctrl.seek.value = (100 / me.ctrl.video.duration) * me.ctrl.video.currentTime;
                }
            },

            /// <summary>
            ///If the seekbar is changed(explicitly) video currenttime needs to eb updated 
            /// </summary>   

            seekbarchange: function () {
                var time = (me.cp.ctrl.seek.value / 100);
                me.ctrl.video.currentTime = time * me.ctrl.video.duration;
            },
            /// <summary>
            ///Total duration of the video 
            /// </summary>   

            totalDuration: function () {
                //return Math.floor(me.ctrl.video.duration); already stored total duration is used
                if (ns.CurrentSrc)
                    return ns.CurrentSrc().videototalduration;
            },
            /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function (screenwidth, screenheight) {

                me.ctrl.video.width = screenwidth - 100;
                // Based on player height, width will be calculated. Same will happen when width set to player.
                if (me.ctrl.$video.outerHeight() > (screenheight - 100)) {
                    //me.ctrl.video.height = screenheight - 100;
                    me.ctrl.$video.removeAttr("width");
                } //else
                //  me.ctrl.$video.removeAttr("height");
                me.ctrl.video.height = screenheight - 100;
            }
        },


        //This is the namespace to upload video by url(mp4,ogg.webm)
        directURL: {

            play: function (src, isTimeline) {
                ViTag.debug("Visap:directURL:playing directURL video" + src + "," + isTimeline);
                //check the condition if video is definrd or not
                if (me.ctrl.$video === undefined)
                    return false;
                me.ctrl.$playerDiv.css("display", "none");
                me.ctrl.$video.css("display", "block");
                // If youtube player API added
                if (ns.yt.player) {
                    ns.yt.player.stopVideo();//stops youtube player when snippet changes from yt to direct video.
                    me.ctrl.video.play();
                }
                ns.yt.enabled = false;

                // Height and width will set when full screen mode on
                //video attr source is set the repo path with source name 
                me.ctrl.$video.attr("src", src);
                $("body").trigger("playVideo"); //raising an event to play the video in android device
                me.ctrl.$video.removeAttr("width");
                me.ctrl.$video.removeAttr("height");
                if (!isTimeline) { //These two lines of code should not execute for the timeline videos.so checking this condition
                    me.renderAttrs(src);
                    //raise an event if the playing source gets changed
                    $("body").trigger("onSrcChange", src);
                    var capSrc = ViTag.CurrentSrc().caption;
                    caption.init(capSrc);////initialization of caption for direct video.
                }
            },
            //This function is written to set the currenttime value.
            //(firefox is not allowing to set the currenttime immediately after playing the video so,recursively calling this function in catch block )
            playAt: function (t) {
                try {
                    ViTag.debug("Visap:directURL:playAt: for the time " + t);
                    me.ctrl.video.currentTime = t;
                } catch (err) {
                    setTimeout(function () { me.directURL.playAt(t) }, 100);
                }
            },

            ///to assign the src and to play from the particular time.
            playFromTime: function (src, time) {
                ViTag.debug("Visap:directURL:playFromTime:play video for the src and time" + src + "," + time);
                me.directURL.play(src, true); //this will invoke play of particular video.
                me.directURL.playAt(time); //this will invoke playAt of particular video.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>

            pause: function () {
                me.uploaded.pause();
            },

            ///<summary>
            /// stops the video and stops the timer.tick method.
            ///</summary>
            stop: function () {
                me.uploaded.pause();
                timer.clearInterval();
            },

            /// <summary>
            /// Gets the currentTime of video
            /// </summary>   
            /// <returns>Returns current time of video</returns>
            currentTime: function () {
                return me.uploaded.currentTime();
            },

            /// <summary>
            ///sets the text of the duration and the playing timw
            /// </summary>   

            timeupdate: function () {
                me.uploaded.timeupdate();
            },

            /// <summary>
            ///If the seekbar is changed(explicitly) video currenttime needs to eb updated 
            /// </summary>   

            seekbarchange: function () {
                me.uploaded.seekbarchange();
            },
            /// <summary>
            ///Total duration of the video 
            /// </summary>   
            totalDuration: function () {

                if (ns.CurrentSrc)
                    return ns.CurrentSrc().videototalduration;
            },
            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                return me.uploaded.paused();
            },
            /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function (screenwidth, screenheight) {

                me.ctrl.video.width = screenwidth - 100;
                // Based on player height, width will be calculated. Same will happen when width set to player.
                if (me.ctrl.$video.outerHeight() > (screenheight - 100)) {
                    // me.ctrl.video.height = screenheight - 100;
                    me.ctrl.$video.removeAttr("width");
                }// else
                //  me.ctrl.$video.removeAttr("height");
                me.ctrl.video.height = screenheight - 100;
            }
        },

        /// <summary>
        /// youtube Namespace
        /// </summary>   
        youtube: {

            /// <summary>
            /// Play youtube video based on videoID
            /// </summary>   
            play: function (videoID, isTimeline) {
                ViTag.debug("Visap:youtube:play:playing video" + videoID + "," + isTimeline);
                //src attr of video element is removed to avoid background video play
                // when switching from static/drct snippet to yt snippet. 
                me.ctrl.$video.removeAttr("src");
                me.ctrl.$video.css("display", "none");
                me.ctrl.$playerDiv.css("display", "block");
                caption.isCcOn = false;
                me.ytForceStop = false;
                // To load the video to youtube player with using video ID
                if (ns.yt.player) {
                    ns.yt.player.loadVideoById(videoID);
                }
                else {
                    me.initYTplayer(videoID);
                }

                // This variable will set to 'true' once youtube video selecteD to play
                ns.yt.enabled = true;
                //renders the attributes of the video
                if (!isTimeline) { //These two lines of code should not execute for the timeline videos.so checking this condition
                    me.renderAttrs(videoID);
                    $("body").trigger("onSrcChange", videoID);
                }


            },
            //This function is written to set the currenttime value.
            //(firefox is not allowing to set the currenttime immediately after playing the video so,recursively calling this function in catch block )
            playAt: function (t) {
                try {
                    ns.yt.player.seekTo(t, true);
                } catch (err) {
                    setTimeout(function () { me.youtube.playAt(t) }, 100);
                }
            },
            ///to assign the src and to play from the particular time.(src is source name and type of that source(youtube,directurl,uploaded))
            playFromTime: function (src, time) {
                 //this will invoke play of particular video.
                 // do not play the video if the user has paused the video for timeline videos only
                if (!ns.videoPaused){
                    me.youtube.play(src, true);
                }
                me.youtube.playAt(time); //this will invoke playAt of particular video.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>
            pause: function () {
                if (ns.yt.player.pauseVideo !== undefined) {
                    ns.yt.player.pauseVideo();
                }
            },
            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                if (ns.yt.videoState === 2 || ns.yt.videoState === -1)
                    return true;
                else return false;
            },

            ///<summary>
            /// stops the video and stops the timer.tick method.
            ///</summary>
            stop: function () {

                //set ytForceStop variable to true(since video is not yet started).
                //we need to work around how to stop video,if youtube is not yet started to play.
                if (ns.yt.videoState === -1) {
                    me.ytForceStop = true;
                }
                else {
                    ns.yt.player.stopVideo();
                }
                timer.clearInterval();
            },

            /// <summary>
            /// Gets the currentTime of yt player
            /// </summary>   
            /// <returns>Returns current time of youtube video</returns> 
            currentTime: function () {
                if (ns.yt.player !== null && ns.yt.player.getCurrentTime !== undefined) {
                    return ns.yt.player.getCurrentTime();
                } else return false;
            },

            /// <summary>            
            /// timeupdate will return false for youtube video.(this is because to update the time setinterval method has been used.)
            /// </summary> 
            timeupdate: function () {
                return false;
            },

            /// <summary>
            ///Player time is adjusted when seekbar is moved
            /// </summary>   
            seekbarchange: function () {
                var time = (me.cp.ctrl.seek.value / 100);
                ViTag.debug("Visap:seekbarchange:adjust player time with respect to seekbar" + time);
                //similiar to timeupdate for other videos
                //changed from yt.getduration to ns.getDuration() when clieck on stop ,yt duration not available
                ns.yt.player.seekTo(time * ns.getDuration(), true);

            },
            /// <summary>
            ///Gets the players duration
            /// </summary>   
            /// <returns>Returns total duration</returns> 
            totalDuration: function () {

                if (ns.CurrentSrc)
                    return ns.CurrentSrc().videototalduration;
            },
            /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function (sceenwidth, screenheight) {
                // setsize is undefined if there is no timeout 
                setTimeout(function () {
                    ns.yt.player.setSize(sceenwidth - 100, screenheight - 100);
                }, 1000)
            },

            /// <summary>
            /// clears updating custom seekbar.
            ///<summary>
            resetSate: function () {
                if (me.cp.time.tmr) {
                    clearInterval(me.cp.time.tmr);
                }
            }
        },

        /////***********************timeline ************////////////////////////


        /// <summary>
        ///Timeline Namespace
        /// </summary>   
        /// <returns>Returns total duration</returns> 
        timeline: {

            snipType: -1,

            /// <summary>
            /// Play timeline video based on details of timeline
            /// </summary>   
            /// <param name="dt">dt is details of the timeline videos </param>
            play: function (dt) {
                ViTag.debug("Visap:timeline:play timeline video" + dt[0].data.srcTimeline);
                me.bunchSq = 0;
                ns.timelinePlay = true;
                me.timeline.snippetPlay(me.bunchSq);
                me.renderAttrs(dt);
                //triggers timeline Video
                $("body").trigger("onTmSrcChange", dt[0].data.srcTimeline);

            },
            /// <summary>
            /// Play timeline video based on details of timeline
            /// </summary>   
            /// <param name="t">Time at which video has to play</param>
            playAt: function (t) {
                me.cp.ctrl.seek.value = Math.floor((100 / me.timeline.totalDuration()) * t);
                me[ns.currentSrcTypeName].seekposition(t);
                ViTag.debug("Visap:timeline:playAt: timeline video tag play at the time: " + t);
                //relative movement of seek bar calculation
                if (ns.tmVideoEnd)
                    me.timeline.pause();
                ns.tmVideoEnd = false; //if user stop the timeline video then click on the tag,
                //play the video it should play from the tag region.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>
            pause: function () {
                me[me.timeline.snipType].pause();
            },

            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                return me[me.timeline.snipType].paused();
            },

            ///<summary>
            /// stops the video and stops the timer.tick method.
            ///</summary>
            stop: function () {
                me[me.timeline.snipType].stop();
                timer.clearInterval();
            },

            /// <summary>
            /// plays right snippet on click of tags or seek bar change
            /// </summary>   
            /// <param name="dt">dt is details of the timeline videos </param>
            /// <param name="actualTime">time at which Timeline snippet has to play </param>
            snippetPlay: function (seq) {
                //to get the next src incrementing bunchsq.
                var snip = ns.CurrentSrc().src[seq];
                if (snip) {
                    me.timeline.snipType = me.sourceTypeName(snip.data.sourcetype);
                    ViTag.debug("Visap:timeline:snippetPlay:sequence of the timeline which is played " + seq);
                    //internal play methods of all the videos should know from where the play method has been called so passing true here.
                    me[me.timeline.snipType].playFromTime(snip.data.srcTimeline, parseInt(snip.data.startTime));
                    var sourceName = me.sourceTypeName(ns.sourceTypeEnum.youtube);
                    //In below condition isSnpChange flag is set to false if first snippet of timeline video is a youtube.
                    if (me.timeline.snipType === sourceName) {
                        seq === 0 && !ns.tmVideoEnd ? me.isSnpChange = false : me.isSnpChange = true;
                    }
                    //In below condition isSnpChange flag is set to true if youtbe snippet is not a first snippet.
                    if (me.timeline.snipType === sourceName && seq !== 0) {
                        me.isSnpChange = true;
                    }
                    //initialization of caption for timeline videos and bolean true has to pass if source is changed.
                    if (me.timeline.snipType !== sourceName) {
                        seq === 0 && !ns.tmVideoEnd ? caption.init(snip.data.caption) : caption.init(snip.data.caption, true);
                    }
                    // when there is a change in snippet and video in fullscreen mode related changes will betaken here
                    me.cp.fullscreenOnsnippetChange();
                } else {
                    //once all the snippets are played tmVideoEnd variable is set to true
                    ns.passPlayerData(ViTag.Events.playCtl, "end", {});
                    ViTag.pause();
                    ns.tmVideoEnd = true;
                    ViTag.debug("Visap:timeline:Timeline video played all the snippets");
                    //Enable imgreplay button
                    me.cp.ctrl.play.className = "imgReplay";
                    me.cp.clearInterval();
                }
            },

            /// <summary> 
            /// when user change seek bar or when video played at perticular position
            /// then seek bar position needs to be moved to the relavent position
            /// </summary>   
            /// <param name="t">Calculated time to which seek bar has to move</param>

            seekposition: function (t, seekbarValueChanged) {
                ViTag.debug("Visap:seekposition:calculated time to which seek has to move " + t + "," + seekbarValueChanged);
                var duration, actualTime, stTime, seekposition = t;

                //looping for Snippets inside the TimelineVideo
                for (var i = 0; i < ns.CurrentSrc().src.length; i++) {
                    stTime = ns.CurrentSrc().src[i].data.startTime;
                    duration = ns.CurrentSrc().src[i].data.duration;
                    actualTime = parseInt((parseInt(t) + stTime));
                    var type = me.sourceTypeName(ns.CurrentSrc().src[i].data.sourcetype);
                    var sourceName = me.sourceTypeName(ns.sourceTypeEnum.youtube);
                    me.timeline.snipType = type;
                    //relative moving of the time based on duration
                    if (duration < t)
                        t = t - duration;
                    else {
                        //if the time is got then pass the data of that video based on index and actualtime to play snippet
                        me.bunchSq = i;
                        me.cp.ctrl.$currentTime.text(me.cp.getTimeFormat(seekposition));
                        me[type].playFromTime(ns.CurrentSrc().src[i].data.srcTimeline, parseInt(actualTime));
                        if (type !== sourceName) {
                            caption.init(ns.CurrentSrc().src[i].data.caption, true);//this will initalize caption when seek bar is moved.
                        }

                        //In below condition isSnpChange flag is set to true if youtbe snippet is seek to different position.
                        if (type === sourceName) {
                            me.isSnpChange = true;
                        }
                        me.cp.fullscreenOnsnippetChange(); //This function is to check the timeline video is in fullscreen or not (if it is in fullscreen set the video height for each snippet)
                        if (ns.videoPaused)
                            ViTag.pause();

                        return false;
                    }
                }
            },

            /// <summary>            
            /// Current Time of the timeline video
            /// </summary>  
            currentTime: function () {
                var duration = 0,
                    index = me.bunchSq;
                if (me.timeline.snipType !== -1 && ns.CurrentSrc() !== null) {
                    var time = me[me.timeline.snipType].currentTime();
                    for (var i = 0; i < index; i++) {
                        duration += ((ns.CurrentSrc().src[i].data.duration + ns.CurrentSrc().src[i].data.startTime) - ns.CurrentSrc().src[i].data.startTime);
                    }
                    if (index < ns.CurrentSrc().src.length) {
                        return Math.round((time - ns.CurrentSrc().src[index].data.startTime) + duration);
                    }
                }

            },

            /// <summary>            
            /// timeupdate will return false for timeline video.(this is because to update the time setinterval method has been used.)
            /// </summary> 
            timeupdate: function () {
                return false;
            },
            /// <summary>            
            /// when bar is changed calculates the new seek position value
            /// </summary> 
            seekbarchange: function () {
                ViTag.debug("Visap:timeline:seekbarchange: seekbarchanges calculates the seek  values");
                var isseekChanged = true;
                var time = (me.cp.ctrl.seek.value / 100) * me.timeline.totalDuration();
                me[ns.currentSrcTypeName].seekposition(time, isseekChanged);

            },
            //To get the current snippet sourcetpe

            /// <summary>            
            /// total duration for the specific timeline
            /// </summary> 
            totalDuration: function () {
                var tmtotDuration = 0;
                if (ns.CurrentSrc() !== undefined) {
                    for (var i = 0; i < ns.CurrentSrc().src.length; i++) {
                        tmtotDuration = (tmtotDuration + ns.CurrentSrc().src[i].data.duration); //to get total duration
                    }
                }
                ViTag.debug("Visap:timeline:totalDuration" + tmtotDuration);
                return (tmtotDuration);
            },
            //setinterval method for the timeline videos
            setInterval: function () {
                if (me.cp.interval) {
                    clearInterval(me.cp.interval);
                }
                me.cp.interval = setInterval(me.cp.setSeekbarCurrentTime, 1000);
            },
            /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function (screenwidth, screenheight) {
                me[me.timeline.snipType].setVideoSize(screenwidth, screenheight);
            },

            /// <summary>
            /// clears updating custom seekbar.
            ///<summary>
            resetSate: function () {
                if (me.cp.interval) {
                    clearInterval(me.cp.interval);
                }
            }

        },
        ////////////***********timeline ends***************//////////

        /// <summary>            
        /// Initilization of the  youtube player
        /// </summary> 
        initYTplayer: function (videoID) {
            // Create youtube player with using YouTube iframe API, here YT is global object of YouTube iframe API
            setTimeout(function () {
                ns.yt.player = new YT.Player(me.video.playerYT, {
                    height: '390',
                    width: '640',
                    videoId: videoID,
                    playerVars: {
                        'hl': 'en', //sets preferred language to english.
                        'cc_load_policy': 1, //force caption to enable by default.
                        'autoplay': 1,
                        'controls': 0,
                        'rel': 0,
                        'fs': 0,
                    },
                    events: {
                        'onReady': function () {
                            $("body").trigger("onYTinit", videoID);
                            me.setVideoRatio();
                        },
                        'onStateChange': function (e) {
                            ns.yt.videoState = e.data;
                            if (e.data === YT.PlayerState.PLAYING) {
                                if (me.ytForceStop) {
                                    ns.yt.player.stopVideo();
                                    return;
                                }
                                me.cp.ctrl.play.className = "imgPause";
                                $("#imgPlay").attr("data-i18n", "[title]player.pause");
                                $("body").trigger("resumeVideo");
                            }
                            if (e.data === YT.PlayerState.PAUSED) {
                                me.cp.ctrl.play.className = "imgPlay";
                                $("#imgPlay").attr("data-i18n", "[title]player.play");
                                // enable the edit panel only when user has paused manually
                                // action comes with pause on show option should not enable the edit panel
                                if(ns.videoPaused){
                                    $("body").trigger("pauseVideo");
                                }
                               
                            }
                            if (e.data === YT.PlayerState.ENDED) {
                                me.cp.ctrl.play.className = "imgReplay";
                                $("#imgPlay").attr("data-i18n", "[title]player.replay");
                                //passing event data to visap analytics when youtube has played fully.
                                ns.passPlayerData(ViTag.Events.playCtl, "end", {});
                                me.disableEditPanel();
                                $("body").trigger("resumeVideo");
                            }
                            ViTag.localize($("#imgPlay")); //To localize need to call localize method of visap.localize.js
                        }
                        ,
                        'onApiChange': function () {
                            if (ns.CurrentSrc() !== null && ns.CurrentSrc().sourcetype == ns.sourceTypeEnum.timeline && caption.isCcOn && me.isSnpChange) {
                                //here track language is setting to english if cc is on while switching to next snippet in timeline video.
                                ns.yt.player.setOption('captions', 'track', { "languageCode": "en" });
                            }
                            else {
                                //initially caption will be disable for each youtube video.
                                if (caption.isCcOn === false) {
                                    ns.yt.player.setOption('captions', 'track', {});
                                    caption.isCcOn = false;
                                }
                                else {
                                    ns.yt.player.setOption('captions', 'track', { "languageCode": "en" });
                                }
                            }
                            me.cp.ctrl.$captionBtn.removeClass('hidden');
                        }
                    }
                });
            }, 250);
        },

        /// <summary>            
        /// Renders the tags links of the video and initilizes the actions
        /// </summary> 
        renderAttrs: function (src) {
            ViTag.debug("Visap:renderAttrs:render tagslinks and other attributes of the video source" + src);

            me.RenderTags(src);
            me.RenderLinks();

            if (me.curSrc === undefined) {
                return false;
            } else {
                $("#curSrcTitile").html(ViTag.htmlEncode(unescape(me.curSrc.title)));
            }
            for (var index in registeredActionList) {
                registeredActionList[index].init(me.curSrc);
            }
        },

        //defaults values used if not passed as args
        video: {
            player: "vid1",
            tags: "tags",
            FStags: "FStags",
            FSlinks: "FSlinks",
            links: "myLinks",
            overlays: "overlays",
            imgOverlay: "imgOverlay",
            annotations: "annotates",
            menu: "menuContainer",
            search: "vSearch",
            dataPath: "data/data.js",
            path: "videos/",
            mainContainer: "body",
            playerYT: "playerYT",
            playerDiv: "player",
            hotspotCircle: "hotspotCircle",
            wboardContainer: "wboardContainer",
            whiteBoardWrapper: "whiteBoardWrapper",
            textcontainerWB: "textcontainerWB",
            WbimgOverlay: "WbimgOverlay",
            textcontent: "textcontent",
            wbdragbar: "wbdragbar",
            MessageDiv: 'MessageDiv',
            videoContainer: "videoContainer",
            videoMContainer: "videoMainContainer",
            autoplay: 'true',
            engTrack: 'enTrack'

        },

        /// <summary>            
        /// Loading all header related information of both user and staging data
        /// </summary> 
        /// <param name="autoplay">not reuired can be removed</param>
        /// <param name="mode">to know stage or myspace</param>
        /// <param name="user">logged in username</param>
        loadData: function (mode) {
            $.ajax({
                url: ViTag.config.wsvideourl,
                type: "GET",
                async: false,
                headers: { isStage: mode, 'X-Authorization': sessionStorage.getItem('authT') },
                success: function (data) {
                    ns.source = JSON.parse(data);
                    me.listVideos();
                },
                error: function (err) {
                    ViTag.error("Visap:loadData:Error while loading data" + err);
                    ViTag.showMessage("Error in loading data", "Info", "GetData.load");
                }
            });
        },

        // Loading message to the user while uploading videos mongo
        showLoadingimg: function () {
            $("body").trigger("showLoadingimg");
        },

        // Render current video attributes -Start- 
        RenderTags: function () {
            ns.RenderCurrentTags();
        },

        /// <summary>            
        /// Renders the annotations for currentsource
        /// </summary> 
        /// <param name="a">annotation object</param>
        // Remove this method. Use ns.<method> directly
        RenderAnnotate: function (a) {
            ns.RenderCurrentAnnotates(a);
        },

        /// <summary>            
        /// Renders the links for currentsource
        /// </summary> 

        // Remove this method. Use ns.<method> directly
        RenderLinks: function () {
            ns.RenderCurrentLinks();
        },

        /// <summary>            
        /// Seraches the source based on ID
        /// </summary> 
        /// <param name="_id">unique ID</param>
        GetSource: function (_id) {
            return ns.source ? $.grep(ns.source, function (e) { return e._id === _id; })[0] : null;
        },

        /// <summary>            
        ///Metadata level informations are fetched only when video 
        ///started playing and merge the header level information 
        /// </summary> 
        /// <param name="curSrc">Currentsource</param>

        GetMetaData: function (curSrc) {
            $.ajax({
                url: ViTag.config.wsMetadataurl,
                type: "GET",
                async: false,
                headers: { isStage: ns.mode, 'X-Authorization': sessionStorage.getItem('authT') },
                data: { ID: curSrc._id },
                success: function (data) {
                    var obj = JSON.parse(data);
                    if (obj[0] !== undefined && (obj[0].actions !== undefined || obj[0].tags !== undefined || obj[0].links !== undefined)) {
                        curSrc.tags = obj[0].tags;
                        curSrc.links = obj[0].links;
                        curSrc.actions = obj[0].actions;
                        curSrc.width = obj[0].width;
                        curSrc.height = obj[0].height;
                    }
                },
                error: function (err) {
                    ViTag.error("Visap:GetMetaData:Error while calling metadata service" + err);
                    ViTag.showMessage("Error in loading data", "Info", "GetData.load");
                }
            });
            return curSrc;
        },

        /// <summary>            
        ///Sets the source with header and metadata based on ID       
        /// </summary> 
        /// <param name="_id">unique ID</param>
        setSource: function (_id) {
            me.curHeader = me.GetSource(_id);
            me.curSrc = me.GetMetaData(me.curHeader);
        },
        /// <summary>            
        ///ListS the video /populates the menu with list of videos       
        /// </summary> 

        //To get video ratio based the height and width of the video. 
        //This function will invoke while playing any type of video.
        setVideoRatio: function () {
            try {
                if (me.curSrc !== null && me.isValidVidWidth() && me.isValidVidHeight()) {
                    //These ratio's are calculating to to display the actions in exact place for different player height and width.
                    //$("#videoMainContainer").width()-->this width is currently playing video width.
                    //me.curSrc.width -->This is saved width of the videoMainContainer(This will be stored to metadata collection while adding any type of actions)
                    me.vidWidthRatio = parseInt($("#videoMainContainer").width()) / me.curSrc.width;
                    me.vidHeightRatio = parseInt($("#videoMainContainer").height()) / me.curSrc.height;
                    return;
                }
            } catch (ex) {
                me.setDefaultRatio();
                ViTag.error("Visap:setVideoRatio:Error while calculating video ratio " + ex);
            }
        },
        //To check video width is valid or not
        isValidVidWidth: function () {
            if (me.curSrc.width !== undefined && (parseInt($("#videoMainContainer").width()) > 0) && me.curSrc.width > 0) {
                return true;
            }

        },
        //To check video height is valid or not
        isValidVidHeight: function () {
            if (me.curSrc.height !== undefined && (parseInt($("#videoMainContainer").height()) > 0) && me.curSrc.height > 0) {
                return true;
            }

        },
        // set default ratio.
        setDefaultRatio: function () {
            me.vidWidthRatio = 1;
            me.vidHeightRatio = 1;
        },
        listVideos: function () {
            if ($.isFunction(me.ctrl.$menu)) {
                me.ctrl.$menu(ns.source);
            }
        },

        /// <summary>            
        ///Reading the controls values   
        /// </summary> 
        readControls: function () {
            ViTag.debug("Visap:readControls:Reading default controls values Begin");
            var attr = me.video;
            me.ctrl.$video = $("#" + me.video.player);
            me.ctrl.video = me.ctrl.$video[0];
            me.ctrl.$tags = $.isFunction(attr.tags) ? attr.tags : $("#" + attr.tags);
            me.ctrl.$links = $.isFunction(attr.links) ? attr.links : $("#" + attr.links);
            me.ctrl.$FStags = $("#" + attr.FStags);
            me.ctrl.$FSlinks = $("#" + attr.FSlinks);
            me.ctrl.$annotates = $("#" + attr.annotations);
            me.ctrl.$overLays = $("#" + attr.overlays);
            me.ctrl.$search = $("#" + me.video.search);
            me.ctrl.$menu = $.isFunction(attr.menu) ? attr.menu : $("#" + attr.menu);
            me.ctrl.$imgOverLays = $("#" + attr.imgOverlay);
            me.ctrl.$WbimgOverlay = $("#" + attr.WbimgOverlay);
            me.ctrl.$whiteBoardWrapper = $("#" + attr.whiteBoardWrapper);
            me.ctrl.$textcontent = $("#" + attr.textcontent);
            me.ctrl.$wbdragbar = $("#" + attr.wbdragbar);
            me.ctrl.$playerYT = $("#" + attr.playerYT);
            me.ctrl.$playerDiv = $("#" + attr.playerDiv);
            me.ctrl.$mainContainer = $(attr.mainContainer);
            me.ctrl.$hotspotCircle = $("#" + attr.hotspotCircle);
            me.ctrl.$wboardContainer = $("#" + attr.wboardContainer);
            me.ctrl.$textcontainerWB = $("#" + attr.textcontainerWB);
            me.ctrl.$MessageDiv = $("#" + attr.MessageDiv);
            me.ctrl.$videoContainer = $("#" + attr.videoContainer);
            me.ctrl.videoContainer = me.ctrl.$videoContainer[0];
            me.ctrl.$videoMContainer = $("#" + attr.videoMContainer);
            me.ctrl.$imageTemp = $("#" + attr.imageTemp),
                me.ctrl.$engTrack = $("#" + me.video.engTrack);
        },

         /// Show and hide of the volume bar
         bindVolumeEvents:function(){
            $(document).click(function (event) {
                var target = $(event.target);
                var volumebar = "#volume-bar";
                if (target.attr('id') === 'imgMute' || target.attr('id') === 'volume-bar') {
                    $(volumebar).removeClass("bar");
                    $(volumebar).show();
                } else {
                    $(volumebar).addClass("bar");
                    $(volumebar).hide();
                }
            });
        },
        //fullscreen events 
        bindFullScreenEvent :function(){
            // attach an event only once when page loaded
            // when user press esc key to exit from fullscreen
            if(!me.cp.ctrl.$play){
                document.addEventListener("mozfullscreenchange", function () {
                    ns.toggleScreen();
                }, false);
                document.addEventListener("webkitfullscreenchange", function () {
                    ns.toggleScreen();
                }, false);
             }
        },

        /// <summary>            
        ///Binding the events
        /// </summary> 
        bindEvents: function () {
            me.ctrl.$videoContainer.unbind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange');
            me.ctrl.$videoContainer.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange', function () {
                ns.toggleScreen();
            });
            document.addEventListener('MSFullscreenChange', ns.toggleScreen, false);
            me.bindVolumeEvents();
            me.bindFullScreenEvent();
        },
        /*************************************************************************************
         ******************** Custom player private region starts *************************/
        ///<summary>
        ///custom player
        /// </summary>
        cp: {
            ctrl: {},
            width: null,
            seekTime: 0,
            bunchSq: 0,
            interval: null,

            //default player controls
            elements: {
                play: "imgPlay",
                stop: "imgStop",
                volumeMax: "imgValx",
                volumeMin: "imgValm",
                mute: "imgMute",
                replay: "imgRe",
                volume: "volume-bar",
                seek: "seek-bar",
                fullScreen: "imgFS",
                trtags: "trtags",
                trlinks: "trlinks",
                imgOverlay: "imgOverlay",
                currentTime: "current",
                endtime: "endtime",
                annotations: "annotates",
                timelineContainer: "timelineContainer",
                CaptureBtn: "CaptureBtn",
                whiteBoardWrapper: "whiteBoardWrapper",
                actionsContainer: "actionsContainer",
                captionBtn: "captionBtnDiv"

            },

            /// <summary>            
            ///Initilization of player
            /// </summary> 
            /// <param name="args">args passed from page</param>
            init: function (data) {
                ViTag.debug("Visap:init:Initilization of player");
                // Calling many times while change the user [So if condition statement added].
                if (!me.cp.ctrl.$play || data.args.isPlayerReinitialized) {
                    //Init player with custom css
                    if (data) {
                        $.extend(me.cp.elements, data);
                    }
                    //reads the controls and sets the Events
                    me.cp.setControls();

                    // Set default player volume
                    var v;
                    if (ns.yt.enabled)
                        v = (ns.yt.player.getVolume() * 100)
                    else
                        v = (me.ctrl.video.volume * 100);

                    me.cp.ctrl.volume.value = v;
                }
            },

            /// <summary>            
            /// Creates the Elements required to play video
            /// </summary> 
            createElement: function () {
                if ($("#videoMainContainer").length === 0) {
                    var spacerimage = "data:image/gif;base64,R0lGODlhAgACAIAAAAAAAAAAACH5BAEAAAAALAAAAAACAAIAAAIChFEAOw==";
                    $("#videoContainer").append(me.cp.createEle({ ele: "table", id: "tblMain", attribs: [{ attr: "cellpadding", value: "0" }, { attr: "cellspacing", value: "0" }, { attr: "align", value: "center" }] }));
                    $("#tblMain").append(me.cp.createEle({ ele: "tr", id: "tblMainrow1" }));
                    $("#tblMainrow1").append(me.cp.createEle({ ele: "td", id: "tblMaintd1" }));
                    $("#tblMaintd1").append(me.cp.createEle({ ele: "table", id: "tbl2", attribs: [{ attr: "cellpadding", value: "0" }, { attr: "cellspacing", value: "0" }, { attr: "class", value: "midmidN3 defaultVideo" }, { attr: "align", value: "center" }] }));

                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr1" }));
                    $("#tbl2tr1").append(me.cp.createEle({ ele: "td", id: "tbl2td1", attribs: [{ attr: "class", value: "tdStyle" }] }));

                    $("#tbl2td1").append(me.cp.createEle({ ele: "span", id: "curSrcTitile", attribs: [{ attr: "class", value: "truncate-text large-width" }] }));
                    $("#tbl2td1").append("<div class='closeicon' onclick=\"javascript:ViTag.closePlayer();\" data-i18n='[title]common.close'></div>");

                    ViTag.localize($("#tbl2td1"));
                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr2" }));
                    $("#tbl2tr2").append(me.cp.createEle({ ele: "td", id: "tbl2td2" }));


                    $("#tbl2td2").append(me.cp.createEle({ ele: "div", id: "videoMainContainer", attribs: [{ attr: "class", value: "viStyle" }] }));

                    var vMainContainer = $("#videoMainContainer");
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "player", attribs: [{ attr: "class", value: "hideEle" }] }));
                    $("#player").append(me.cp.createEle({ ele: "div", id: "playerYT", attribs: [{ attr: "class", value: "videoTag" }] }));

                    if ($("#vid1").length === 0) {
                        vMainContainer.append(me.cp.createEle({ ele: "video", id: "vid1", attribs: [{ attr: "autoplay", value: "true" }, { attr: "class", value: "videoTag" }, { attr: "playsinline", value: "true" }] }));
                    } else
                        $("#vid1").appendTo(vMainContainer);
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "maskLayer", attribs: [{ attr: "class", value: "maskElement" }, { attr: "draggable", value: "false" }] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "Overlay", attribs: [{ attr: "class", value: "imgOverlay" }] }));
                    $("#Overlay").append(me.cp.createEle({ ele: "img", id: "imgOverlay", attribs: [{ attr: "alt", value: "" }, { attr: "src", value: "#" }, { attr: "draggable", value: "false" }] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "annotates", attribs: [{ attr: "class", value: "annotate-ul divAnnotate" }, { attr: "draggable", value: "true" }] }));
                    var annotation = $("#annotates");
                    annotation.append(me.cp.createEle({ ele: "div", id: "annotateContent", attribs: [{ attr: "class", value: "annotContent" }] }));
                    annotation.append(me.cp.createEle({ ele: "div", id: "resizer", attribs: [{ attr: "class", value: "annotationresizer" }] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "hotspotCircle", attribs: [{ attr: "class", value: "circleBase hotspotCircle" }, { attr: "draggable", value: "true" }] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "sketchcontainerDefault", attribs: [{ attr: "class", value: "canvascontainer  sketchcontainer-Default" }] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "whiteBoardWrapper", attribs: [{ attr: "class", value: "whiteBoardWrapper" }] }));
                    var whiteBoardWrapper = $("#whiteBoardWrapper");
                    whiteBoardWrapper.append(me.cp.createEle({ ele: "div", id: "wboardContainer", attribs: [{ attr: "class", value: "wbContainer" }] }));
                    var wbContainer = $("#wboardContainer");
                    wbContainer.append(me.cp.createEle({ ele: "div", id: "wbdragbar", attribs: [{ attr: "class", value: "wbdragbar" }] }));
                    wbContainer.append(me.cp.createEle({ ele: "div", id: "wrapperTxtSketch", attribs: [{ attr: "class", value: "wrapperTxtSketch" }] }));
                    var wrapperTxtSketch = $('#wrapperTxtSketch');
                    wrapperTxtSketch.append("<div class='textcontainerWB' id='textcontainerWB'><textarea name='' cols='' rows='4' id='cmtWiteboard' contenteditable='true' class='cmt-whiteboard modal-textfield'></textarea></div>");
                    wrapperTxtSketch.append("<div class='canvascontainerWB' id='sketchcontainerWB'></div>");
                    wrapperTxtSketch.append(me.cp.createEle({ ele: "div", id: "textcontent", attribs: [{ attr: "class", value: "textcontent" }] }));
                    wrapperTxtSketch.append(me.cp.createEle({ ele: "img", id: "WbimgOverlay", attribs: [{ attr: "class", value: "WbimgOverlay" }, { attr: "alt", value: "" }, { attr: "src", value: "#" }] }));

                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "MessageDiv", attribs: [{ attr: "textmessage", value: "Text Hotspot" }] }));
                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr3" }));
                    $("#tbl2tr3").append(me.cp.createEle({ ele: "td", id: "tbl2td3", attribs: [{ attr: "class", value: "tdStyle2" }] }));

                    var tblTD = $("#tbl2td3");
                    tblTD.append(me.cp.createEle({ ele: "div", id: "controls", attribs: [{ attr: "class", value: "vi-control-main" }] }));
                    $("#controls").append(me.cp.createEle({ ele: "div", id: "ctrldiv1", attribs: [{ attr: "class", value: "slider-main" }] }));
                    $("#ctrldiv1").append(me.cp.createEle({ ele: "input", id: "seek-bar", attribs: [{ attr: "type", value: "range" }, { attr: "class", value: "" }, { attr: "name", value: "seekbar" }] }));
                    $("#ctrldiv1").append(me.cp.createEle({ ele: "div", id: "rangeContainer", attribs: [{ attr: "class", value: "rangevalue" }] }));
                    $("#controls").append(me.cp.createEle({ ele: "div", id: "ctrldiv2", attribs: [{ attr: "class", value: "control-main" }] }));
                    $("#ctrldiv2").append(me.cp.createEle({ ele: "div", id: "captionBtnDiv", attribs: [{ attr: "class", value: "player-caption hidden" }, { attr: "data-i18n", value: "[title]player.captionOrSubtitle" }] }));
                    ViTag.localize($("#ctrldiv2"));
                    $("#ctrldiv2").append(me.cp.createEle({ ele: "div", id: "timerdiv", attribs: [{ attr: "class", value: "player-duratoin" }] }));
                    $("#timerdiv").append(me.cp.createEle({ ele: "span", id: "current" }));
                    $("#timerdiv").append(me.cp.createEle({ ele: "span", id: "slashDivider" }));
                    $("#slashDivider").text(" / ");
                    $("#timerdiv").append(me.cp.createEle({ ele: "span", id: "endtime", attribs: [{ attr: "class", value: "player-duratoin1" }] }));

                    $("#current").text("00.00");
                    $("#ctrldiv2").append(me.cp.createEle({ ele: "div", id: "player-sound1", attribs: [{ attr: "class", value: "player-sound" }] }));

                    $("#player-sound1").append(me.cp.createEle({ ele: "div", id: "icn-sound1", attribs: [{ attr: "class", value: "icn-sound" }] }));

                    $("#icn-sound1").append(me.cp.createEle({ ele: "div", id: "imgMute", attribs: [{ attr: "alt", value: "" }, { attr: "src", value: spacerimage }, , { attr: "class", value: "imgValx" }, { attr: "data-i18n", value: "[title]player.mute" }] }));
                    ViTag.localize($("#icn-sound1"));
                    $("#player-sound1").append(me.cp.createEle({ ele: "div", id: "imgFS", attribs: [{ attr: "class", value: "icn-fullscreen" }, { attr: "data-i18n", value: "[title]player.fullscreen" }] }));
                    ViTag.localize($("#player-sound1"));
                    $("#player-sound1").append(me.cp.createEle({ ele: "input", id: "volume-bar", attribs: [{ attr: "type", value: "range" }, { attr: "value", value: "1" }, { attr: "class", value: "bar" }, { attr: "name", value: "volumebar" }] }));

                    $("#ctrldiv2").append(me.cp.createEle({ ele: "div", id: "play-pause", attribs: [{ attr: "class", value: "play-pause" }] }));
                    $("#play-pause").append(me.cp.createEle({ ele: "div", id: "imgPlay", attribs: [{ attr: "class", value: "play" }, { attr: "src", value: spacerimage }, { attr: "data-i18n", value: "[title]player.pause" }] }));

                    $("#play-pause").append(me.cp.createEle({ ele: "div", id: "imgStop", attribs: [{ attr: "class", value: "stop" }, { attr: "data-i18n", value: "[title]player.stop" }] }));
                    ViTag.localize($("#play-pause"));
                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr4" }));
                    $("#tbl2").append("<tr class='midmidN2 hideEle' id='trtags'><td class='tdStyle2'> <div class='tags-links'><div id='FStags' class='tags'><span class='tags-links-title'> <div id='FStags1' class='tagDiv1'></div></span></div></div></td></tr>");
                    $("#tbl2").append("<tr class='midmidN2 hideEle' id='trlinks'><td class='tdStyle2'> <div class='tags-links'><div id='FSlinks' class='links'><span class='tags-links-title'><div id='FSlinks1' class='linkDiv1'></div></span></div></div></td></tr>");

                    $("body").trigger("onEleCreated");
                }
            },

            /// <summary>            
            /// Helper method to create elements
            /// </summary> 
            createDiv: function (obj) {
                var ele = (document.createElement(obj.ele));
                $(ele).attr('id', "" + obj.id + "");
                if (obj.attribs) {
                    $(obj.attribs).each(function () {
                        $(ele).attr(this.attr, this.value);
                    });
                }
                return ele;
            },

            //Duplicate will be removed later
            /// <summary>            
            /// Helper method to create elements
            /// </summary> 
            createEle: function (obj) {
                var ele = (document.createElement(obj.ele));
                $(ele).attr('id', "" + obj.id + "");

                if (obj.attribs) {
                    $(obj.attribs).each(function () {
                        $(ele).attr(this.attr, this.value);
                    });
                }
                return ele;
            },
            /// <summary>            
            /// reads the controls  and set the events like play,pause etc. 
            /// </summary> 
            setControls: function () {
                ViTag.debug("Visap:setControls:Reads the controls  and set the events like play,pause ");
                me.cp.readplayercontrols();
                me.cp.setevents();
            },
            /// <summary>            
            /// reads the controls  and assigns to jquery refrences.
            /// </summary> 
            readplayercontrols: function () {
                var ct = me.cp.elements;

                me.cp.ctrl.$FSTags = $("#" + ct.trtags);
                me.cp.ctrl.$FSlinks = $("#" + ct.trlinks);
                me.cp.ctrl.$play = $("#" + ct.play);
                me.cp.ctrl.play = me.cp.ctrl.$play[0];
                me.cp.ctrl.$stop = $("#" + ct.stop);
                me.cp.ctrl.$volumeMax = $("#" + ct.volumeMax);
                me.cp.ctrl.$volumeMin = $("#" + ct.volumeMin);
                me.cp.ctrl.$mute = $("#" + ct.mute);
                me.cp.ctrl.mute = me.cp.ctrl.$mute[0];
                me.cp.ctrl.$replay = $("#" + ct.replay);
                me.cp.ctrl.volume = $("#" + ct.volume)[0];
                me.cp.ctrl.seek = $("#" + ct.seek)[0];
                me.cp.ctrl.fullScreen = $("#" + ct.fullScreen)[0];
                me.cp.ctrl.fullScreenlow = $("#" + ct.fullScreen);
                me.cp.ctrl.$imgOverLays = $("#" + ct.imgOverlay);
                me.cp.ctrl.$WbimgOverlay = $("#" + ct.WbimgOverlay);
                me.cp.ctrl.$currentTime = $("#" + ct.currentTime);
                me.cp.ctrl.$endtime = $("#" + ct.endtime);
                me.cp.ctrl.$annotates = $("#" + ct.annotations);
                me.cp.ctrl.$timelineContainer = $("#" + ct.timelineContainer);
                me.cp.ctrl.$CaptureBtn = $("#" + ct.CaptureBtn);
                me.cp.ctrl.$editContainer = $("#" + ct.editContainer);
                me.cp.ctrl.$whiteBoardWrapper = $("#" + ct.whiteBoardWrapper);
                me.cp.ctrl.$actionsContainer = $("#" + ct.actionsContainer);
                me.cp.ctrl.$captionBtn = $("#" + ct.captionBtn);
                ViTag.debug("Visap:readplayercontrols:Read player controls completed");
            },


            /// <summary>            
            ///Functionality of onclick of play,volumeMax,stop
            /// volumeMin ,mute click,replay
            /// </summary> 
            setevents: function () {
                ViTag.debug("Visap:setevents:setEvents for custom player starts");
                // Play and Pause functionality    
                me.cp.ctrl.$play.click(function () { me.playClick(); });
                // Stop playing
                me.cp.ctrl.$stop.click(function () { me.stopClick(); });

                me.cp.ctrl.$mute.click(function () { me.muteClick(); });

                /// <summary>            
                ///Replay video from beginning
                /// </summary> 
                me.cp.ctrl.$replay.click(function () { me.replayClick(); });
                me.cp.ctrl.$captionBtn.click(function () { caption.toggleCaption(); });

                /// <summary>            
                ///Attach "timeupdate" event to video control to get current playing position
                /// </summary> 
                me.ctrl.video.addEventListener('timeupdate', me.timeUpdate, false);
                ns.tmVideoEnd = false;
                /// <summary>            
                ///To change the src in case of Timeline Videos
                /// </summary> 
                ns.tmLineSrcChange = function () {
                    //bunchSq is to increment sequence number each time.
                    var tmSrcDt = ns.CurrentSrc().src[me.bunchSq]; //Each soruce details in timeline(timeline source deatils.).
                    ViTag.debug("Visap:tmLineSrcChange:when timeline source is changed play event" + tmSrcDt);
                    if (tmSrcDt) {
                        ns.bnchSQ = me.bunchSq; //bunchsq is sequnce of timelinevideo.
                        ns.tmcurrentTime = ns.getCurrentTime();
                        if ((tmSrcDt.data.duration + tmSrcDt.data.startTime) <= me[me.timeline.snipType].currentTime()) {
                            me.bunchSq++;
                            me.timeline.snippetPlay(me.bunchSq);
                        }
                    }
                };
                /// <summary>            
                ///If video ended replay control should show
                /// </summary> 

                me.ctrl.video.addEventListener('ended', function () {
                    me.cp.ctrl.play.className = "imgReplay";
                    me.toggleAttr($("#imgPlay").attr('class')); //For  localization(passing particular html element class to localize when the element class is dynamically changing)
                    me.cp.ctrl.$CaptureBtn.addClass('startCapture');
                    ns.passPlayerData(ViTag.Events.playCtl, "end", {});
                }, false);

                /// <summary>             
                ///If video ended replay control should show
                /// </summary> 

                me.ctrl.video.addEventListener('play', function () {
                    me.setVideoRatio();
                    me.cp.ctrl.play.className = "imgPause";
                    if (ns.yt.enabled) {
                        me.cp.ctrl.play.className = "imgPlay";
                    }
                }, false);

                ///Function called on fullscreen button click
                /// </summary> 
                ns.raiseFullScreen = function (customControl) {
                    ViTag.debug("Visap:raiseFullScreen:Full screen functionality" + customControl);

                    // place holder for fullscreen
                    var fsplaceholder = me.ctrl.videoContainer;
                    $("body").triggerHandler("onFullScreen", function (placeholdervalue) {
                        fsplaceholder = $(placeholdervalue)[0];

                    });
                    var elem = fsplaceholder;
                    me.cp.ctrl.$imgOverLays.hide();
                    me.cp.ctrl.$whiteBoardWrapper.hide();
                    $("#hotspotCircle").hide();
                    ns.isCustomFullScreen = customControl;

                    me.fullScreenClick(elem);
                };

                // Listen for orientation changes landscape/portrait view.
                window.addEventListener("orientationchange", function () {
                    var isVisible = me.ctrl.$imgOverLays.is(':visible');
                    if (me.ctrl.$imgOverLays[0].src.length > 1 && isVisible === true) {
                        //setTimeout is given bcoz android device is taking old video dimensions. 
                        setTimeout(function () {
                            sketcher.setImgAttr();//set css style.
                        }, 200);
                    }
                }, false);

                // Set video control value 
                me.cp.ctrl.volume.addEventListener("change", function () { me.cp.setVolumeState(); });

                //Pause the video when the slider handle is being dragged
                me.cp.ctrl.seek.addEventListener('mousedown', me.cp.setSeekValue, false);
                me.cp.ctrl.seek.addEventListener('touchstart', me.cp.setSeekValue, false); //For mobile device

                me.cp.ctrl.seek.addEventListener('mouseup', me.cp.resetSeekValue, false);
                me.cp.ctrl.seek.addEventListener('touchend', me.cp.resetSeekValue, false);//For mobile device

                me.playerSrcChange();
                $("body").on("handleseekBarValues", function () {
                    me.cp.renderAllMarker(); //to render the markers on the seekbar.
                });
                me.TimLineSrcChange();
            },
            setSeekValue: function () {
                me.seekBarSeeking = true; //This variable is set true to stop execution of timeupdate when the user click on seekbar at point of time.(static and directurl)
            },
            resetSeekValue: function () {
                me.seekBarSeeking = false; //This is to again start the execution of timeupdate only for static and directurl videos
                ns.passPlayerData(ns.Events.playCtl, "seek", {});
                me.cp.resetAfterchange();
                me[ns.currentSrcTypeName].seekbarchange();
                $('body').trigger("seekbarchange");
                ns.tmVideoEnd = false; //when we stop the timeline video and move the seekbar to certain postion
                //again click on play button it should start from that position so set ns.tmVideoEnd to false.
            },
            /// <summary>            
            ///Gets the Player Time  to display in UI
            /// </summary> 
            getplayTimer: function () {
                ViTag.debug("Visap:getplayTimer:Gets the Player Time  to display in UI");
                //video element inbuilt currenttime
                var t = ns.getCurrentTime();
                //get formtted value of duration
                if (t > 0)
                    var totalduration = me.cp.getTimeFormat(Math.round(me.ctrl.video.duration));
                //set duration text
                else totalduration = "00:00:00";
                me.cp.ctrl.$endtime.text(totalduration);
                ViTag.debug("Visap:getplayTimer:total duration" + totalduration);
                var time = me.cp.getTimeFormat(t);
                //set currentTime text
                me.cp.ctrl.$currentTime.text(time);
                ViTag.debug("Visap:getplayTimer:Current time duration" + time);
            },

            /// <summary>            
            ///Format the Time sent -common method
            /// </summary> 
            getTimeFormat: function (s) {

                var h = Math.floor(s / 3600); //Get whole hours
                s -= h * 3600;
                var m = Math.floor(s / 60); //Get remaining minutes
                s -= m * 60;
                var sec = Math.floor(s);
                if (h === 0)
                    return (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
                else
                    return (h < 10 ? '0' + h : h) + ":" + (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
            },


            getAudioClass: function (v) {
                var val, imgClass;

                if (typeof v !== "undefined") {
                    val = v * 100;
                } else {
                    val = me.ctrl.video.volume * 100;
                }
                if (val > 70) {
                    imgClass = "imgValx";
                } else if (val > 10) {
                    imgClass = "imgVal";
                } else if (val === 0) {
                    imgClass = "imgMute";
                } else imgClass = "imgValm";
                return imgClass;
            },

            resetAfterchange: function () { //when user create sketch's and don't save or cancel or change the seekbar,this method will clear the created sketch's                            
                $("body").trigger("resetAfterchange");
            },

            /// <summary>            
            ///Below are the youtube video state functionality
            /// </summary> 

            changeYTstate: function () {
                var css;
                switch (ns.yt.videoState) {
                    case YT.PlayerState.ENDED:
                    case YT.PlayerState.PAUSED:
                        ns.videoPaused = false;
                        css = "imgPause";
                        ns.yt.player.playVideo();
                        ns.passPlayerData(ns.Events.playCtl, "resume", {});
                        $("body").trigger("resumeVideo");
                        me.ctrl.$wboardContainer.hide();
                        break;
                    case YT.PlayerState.PLAYING:
                        css = "imgPlay";
                        ns.yt.player.pauseVideo();
                        ns.videoPaused = true;
                        ns.passPlayerData(ns.Events.playCtl, "paused", {});
                        $("body").trigger("pauseVideo");
                        break;

                    default:
                        css = "imgPause";
                        ns.yt.player.playVideo();
                        break;
                }
                return css;
            },

            /// <summary>            
            ///Reset the values when timeline video playing is done
            /// </summary> 
            resetCounters: function () {
                ViTag.debug("Visap:resetCounters:timeline video sequence for the first time its 0");
                me.cp.ctrl.seek.value = 0;
                me.bunchSq = 0;
                me.seekTime = 0;
                me.ctrl.video.ended = false;
                me.cp.clearInterval();
            },
            setVolumeState: function () {
                var v = (me.cp.ctrl.volume.value / 100);
                if (ns.yt.enabled) {
                    ns.yt.player.unMute();
                    ns.yt.player.setVolume(v * 100);
                } else {
                    me.ctrl.video.muted = false;
                    me.ctrl.video.volume = v;
                }
                me.cp.ctrl.mute.className = me.cp.getAudioClass(v);
                me.toggleAttr($("#imgMute").attr('class'));
            },
            time: {
                tmr: false
            },

            /// <summary>            
            ///clearInterval method used in Timeline video
            /// </summary> 
            clearInterval: function () {
                ViTag.debug("Visap:clearInterval:TO clear interval");
                if (me.cp.interval) {
                    clearInterval(me.cp.interval);
                    me.cp.interval = null;
                }
            },
            //to reset the vidoe currenttime and total duration
            resetTime: function () {
                me.cp.ctrl.$currentTime.text("00:00");
                me.cp.ctrl.$endtime.text("00:00");
            },

            /// <summary>            
            ///Display seekbar  values,Totalduration
            /// </summary> 

            setSeekBarValue: function () {
                try {
                    if (!me.seekBarSeeking) {
                        var d = ns.CurrentSrc().videototalduration;
                        var c = 0,
                            totalduration;
                        if (d === undefined) {
                            totalduration = "00:00";
                        } else {
                            if (ns.yt.player.getCurrentTime !== undefined) {
                                c = ns.yt.player.getCurrentTime();
                            }
                            if (d > 0) {
                                totalduration = me.cp.getTimeFormat(Math.round(d - 1)); //disaplying total duration -1 becuase our video time starts from 0 so when the video ends curent time of the video and totalduration has 1 sec difference.
                            }
                        }
                        me.cp.ctrl.$endtime.text(totalduration);

                        var time = me.cp.getTimeFormat(c);
                        if (time.indexOf("NaN") < 0)
                            me.cp.ctrl.$currentTime.text(time);

                        //if (d == c && d != 0) me.cp.ctrl.play.className = "imgReplay";  This line of code is not required because there is an inbuild ended method is there in youtube api.
                        if (Math.floor((100 / d) * c) >= 0)
                            me.cp.ctrl.seek.value = ((100 / d) * c);
                    }
                } catch (ex) {
                    ViTag.error("Visap:setSeekBarValue:Error while setting SeekBarValue for youtube video " + ex);
                }
            },
            removechild: function () {
                $("#rangeContainer").empty();
            },

            /// <summary>            
            ///will show the markers on the seekbar based on tagtime and action pausetime
            /// </summary> 

            renderAllMarker: function () {
                me.cp.removechild();
                me.cp.renderTagsMarkers(ns.CurrentSrc().tags, "red");
                me.cp.renderActionMarkers(ns.CurrentSrc().actions, "yellow");
            },

            /// <summary>            
            ///Tag time is pushed into Array
            /// </summary> 
            renderTagsMarkers: function (source, color) {
                var TimeArray = [];
                if (source !== undefined && source.length !== 0) {
                    ViTag.debug("Visap:renderTagsMarkers:Rendering the markers for the sourcelength and colour:" + source.length + "," + color);
                    for (var i = 0; i < source.length; i++) {
                        TimeArray.push(source[i].t);
                    }
                    me.cp.renderSpecificMarkers(TimeArray, color);
                }
            },

            /// <summary>            
            ///Currenttime of he actions are pushed into Array
            /// </summary> 
            renderActionMarkers: function (source, color) {
                var TimeArray = [];
                if (source !== undefined && source.length !== 0) {
                    ViTag.debug("Visap:renderActionMarkers:Rendering action markers for the sourcelength and colour:" + source.length + "," + color);
                    for (var i = 0; i < source.length; i++) {
                        TimeArray.push(source[i].currentTime);
                    }
                    //calls the method to draw lines on seek bar
                    me.cp.renderSpecificMarkers(TimeArray, color);
                }
            },


            /// <summary>            
            ///Adding the markers on the based on the specific time
            /// </summary> 
            renderSpecificMarkers: function (timeArray, color) {
                if (timeArray !== undefined && timeArray.length !== 0) {
                    ViTag.debug("Visap:renderSpecificMarkers:Rendering specfic markers:" + timeArray + "," + color);
                    var Vduration;
                    Vduration = me[ns.currentSrcTypeName].totalDuration();
                    for (var i = 0; i < timeArray.length; i++) {

                        var tagtime = timeArray[i];
                        //formula to position the coloured tags
                        var timeInPercentage = (100 * tagtime) / Vduration;
                        var idvalue = color + i;
                        $("#rangeContainer").append(me.cp.createEle({ ele: "div", id: idvalue, attribs: [{ attr: "class", value: "marker" }] }));
                        $("#" + idvalue).css("margin-left", timeInPercentage + "%");
                        $("#" + idvalue).css("background-color", color);
                    }
                }
            },

            setSeekbarCurrentTime: function () {
                ViTag.debug("Visap:setSeekbarCurrentTime:Set the seek bar time");
                if (!ViTag.paused())
                    ViTag.tmLineSrcChange();
                if (ns.CurrentSrc().sourcetype === 2 && !me.seekBarSeeking) {
                    if (ViTag.getCurrentTime() >= 0) {
                        //to find the seekbar value based on the timeline video currenttime and total duration of the video.
                        me.cp.ctrl.seek.value = (100 / me.timeline.totalDuration()) * ViTag.getCurrentTime();
                        me.cp.ctrl.$currentTime.text(me.cp.getTimeFormat(ViTag.getCurrentTime()));
                        ViTag.debug("Visap:setSeekbarCurrentTime:Set the seek bar time with respect to timeline video:" + me.cp.getTimeFormat(ViTag.getCurrentTime()));

                    }
                    ViTag.debug("Visap:setSeekbarCurrentTime:Set the seek bar time:" + Math.round(me.timeline.totalDuration()));
                    me.cp.ctrl.$endtime.text(me.cp.getTimeFormat(Math.round(me.timeline.totalDuration())));
                }
            },

            /// <summary>
            /// snippet change to get full screen
            // </summary>
            fullscreenOnsnippetChange: function () {
                if (ns.isFullScreenON) {
                    ns.isFullScreenON = false;
                    ns.raiseFullScreen(false);
                }
            }
            ///support methods ends
        },
        playTmYt: function (tmVideoEnd, ytenabled) {
            if (tmVideoEnd) {
                me.cp.resetCounters();
                me[ns.currentSrcTypeName].snippetPlay(me.bunchSq);
                ns.tmVideoEnd = false;
            }
            if (ytenabled) {
                me.cp.changeYTstate();
            } else me.ctrl.video.play();
        },
        playClick: function () {
            ns.videoPaused = false;
            ns.pauseByAction = false;
            me.cp.resetAfterchange();
            // If youtube embed player enabled
            var css;
            if (ns.CurrentSrc().sourcetype === 1) {
                css = me.cp.changeYTstate();
            } else {
                if (ViTag.paused() || me.ctrl.video.ended) {
                    ns.timelinePlay = true;
                    css = "imgPause";
                    if (ns.CurrentSrc().sourcetype === 2) {
                        //ns.tmVideoEnd is true only when user click stop and replay button.
                        //because when user click stop and replay it has to start from the first snippet.
                        //if the user click just pause and play then just play video should call.
                        me.playTmYt(ns.tmVideoEnd, ns.yt.enabled);

                        me.timeline.setInterval();
                    } else
                        me.ctrl.video.play();
                        me.ctrl.$wboardContainer.hide();
                    ns.passPlayerData(ns.Events.playCtl, "resume", {});
                    $("body").trigger("resumeVideo");

                } else {

                    ns.timelinePlay = false;
                    css = "imgPlay";
                    ViTag.pause();
                    ns.passPlayerData(ns.Events.playCtl, "paused", {});
                    ns.videoPaused = true;
                    me.cp.setSeekbarCurrentTime();
                    ns.tmVideoEnd = false;
                    if (ns.CurrentSrc().sourcetype === 2) {
                        me.cp.clearInterval();
                    }
                    $("body").trigger("pauseVideo");
                }
            }
            me.cp.ctrl.play.className = css;
            me.toggleAttr($("#imgPlay").attr('class')); //For  localization(passing particular html element class to localize when the element class is dynamically changing)
        },

        //This method will localize the player controles. 
        toggleAttr: function (css) {
            switch (css) {
                case ns.playerCtrls.imgPause:
                    $("#imgPlay").attr("data-i18n", "[title]player.pause");
                    break;
                case ns.playerCtrls.imgPlay:
                    $("#imgPlay").attr("data-i18n", "[title]player.play");
                    break;
                case ns.playerCtrls.imgReplay:
                    $("#imgPlay").attr("data-i18n", "[title]player.replay");
                    break;
                case ns.playerCtrls.icnfullscreen:
                    $("#imgFS").attr("data-i18n", "[title]player.fullscreen");
                    break;
                case ns.playerCtrls.imgFSLow:
                    $("#imgFS").attr("data-i18n", "[title]player.exitFullscreen");
                    break;
                case ns.playerCtrls.imgMute:
                    $("#imgMute").attr("data-i18n", "[title]player.unmute");
                    break;
                case ns.playerCtrls.imgValx:
                case ns.playerCtrls.imgVal:
                case ns.playerCtrls.imgValm:
                    $("#imgMute").attr("data-i18n", "[title]player.mute");
                    break;
                default: break;
            }

            ViTag.localize($("#imgPlay")); //To localize need to cal localize method of visap.localize.js
            ViTag.localize($("#imgFS"));
            ViTag.localize($("#imgMute"));

        },
        stopClick: function () {
            ViTag.debug("Visap:setevents:stop button click functionality");
            me.cp.ctrl.$editContainer.hide();
            me.cp.ctrl.$whiteBoardWrapper.hide();
            me.ctrl.$WbimgOverlay.hide();
            ViTag.RenderCurrentAnnotates(null);
            me.cp.ctrl.seek.value = 0;
            me.cp.ctrl.play.className = "imgPlay";
            ns.passPlayerData(ns.Events.playCtl, "stop", { source: "stopButton" });
            //ns.videoPaused = true; //TODO: need to remove this
            if (ns.CurrentSrc().sourcetype === 1) {
                ns.yt.player.seekTo(0, true);
                ns.yt.player.stopVideo();
                me.cp.ctrl.$imgOverLays.hide();
                me.cp.ctrl.$annotates.hide();
                me.ctrl.$hotspotCircle.hide(); //hides hot spot for you tube videos.
                me.disableEditPanel();
            } else {
                if (ns.CurrentSrc().sourcetype === 2) {
                    clearInterval(me.interval);
                    me.cp.resetCounters();
                    ns.tmVideoEnd = true;
                    me.cp.ctrl.$currentTime.text("00:00");
                }
                ViTag.pause();
                me.ctrl.video.currentTime = 0;
                me.cp.ctrl.$imgOverLays.hide();
                me.cp.ctrl.$annotates.hide();
                me.ctrl.$hotspotCircle.hide(); //hides hot spot for direct,static and timeline videos.
                me.disableEditPanel();
            }
            me.toggleAttr($("#imgPlay").attr('class'));//for localization.
        },

        //To disable actions and edit panel.    
        disableEditPanel: function () {
            $("body").trigger("disableEditPanel", ns.disabelEditPanel);
        },

        muteClick: function () {
            ViTag.debug("Visap:setevents:mute button click functionality");
            var c;
            if (ns.yt.enabled) {
                if (ns.yt.player.isMuted()) {
                    ns.yt.player.unMute();
                    me.cp.ctrl.volume.value = ns.yt.player.getVolume();
                    me.ctrl.video.muted = false;
                    c = me.cp.getAudioClass();
                } else {
                    ns.yt.player.mute();
                    me.cp.ctrl.volume.value = 0;
                    me.ctrl.video.muted = true;
                    c = "imgMute";
                }
            } else {
                if (me.ctrl.video.muted) {
                    me.ctrl.video.muted = false;
                    me.cp.ctrl.volume.value = (me.ctrl.video.volume * 100);
                    c = me.cp.getAudioClass();

                } else {
                    me.cp.ctrl.volume.value = 0;
                    me.ctrl.video.muted = true;
                    c = "imgMute";

                }
            }
            me.cp.ctrl.mute.className = c;
            me.toggleAttr($("#imgMute").attr('class'));
        },

        replayClick: function () {
            ViTag.debug("Visap:setevents:replay button click functionality");
            me.cp.ctrl.seek.value = 0;
            me.ctrl.video.currentTime = 0;
            me.ctrl.video.play();
        },

        disableFullScreen: function (elem) {
            $("#playerYT").addClass("videoTag");
           $("#vid1").addClass("videoTag");
            me.cp.ctrl.fullScreenlow.removeClass('imgFSLow');
            // To exit full screen mode 
            elem = document;
            var req = elem.cancelFullScreen || elem.webkitCancelFullScreen || elem.mozCancelFullScreen || elem.msCancelFullScreen || elem.exitFullscreen || elem.msExitFullscreen;
            if (typeof req !== "undefined" && req) {
                req.call(elem);
            }
            // Get back player from fullscreen mode
            if (me.width) {
                me.ctrl.video.width = me.width;
                me.width = null;
            }
            if (ns.yt.enabled)
              ns.yt.player.setSize(640, 390);

            // If we set width for player height will automaticaly take 
             me.ctrl.$video.removeAttr("height");
            ns.isFullScreenON = false;

            if ($("#ques-block").length > 0) {
                ns.pause();
                $("#ques-block").find(".blockMsg").css({ "top": "195px", "left": "195px", "width": "540px", "height": "350px", "margin": "-3px" });
            }
            if (ViTag.isTimelIneMode || ViTag.paused()) {
                //$('#actionsContainer').show();
                $("body").trigger("enableActionContainer", ns.pauseByAction);
                // To set the canvas height and width when exit from fullscreen
                // show sketches when exit from the fullscreenmode
                $("body").trigger("showSketches");
            }
            //  $("body").trigger("onFullScreen", ns.isFullScreenON); // need to verify 

            me.cp.ctrl.$FSTags.hide();
            me.cp.ctrl.$FSlinks.hide();
            me.toggleAttr("icn-fullscreen"); //For  localization(passing particular html element class to localize when the element class is dynamically changing)
        },

        enableFullScreen: function (elem) {
            // Get player in full screen mode 
            $("#playerYT").removeClass("videoTag");
            $("#vid1").removeClass("videoTag");
            var req = me.getReqFullScreenElem(elem);
            if (typeof req !== "undefined" && req) {
                req.call(elem);
            }
            // Applying background color to fill extra space in full screen mode
            me.cp.ctrl.fullScreenlow.addClass('imgFSLow');
            $(elem).css("background-color", "black");
            me.width = me.ctrl.$video.outerWidth();
            me[ns.currentSrcTypeName].setVideoSize(screen.availWidth, screen.availHeight);
            $(elem).css("width", screen.availWidth); // FOR NG : set the FS element to screen width
            ViTag.debug("Visap:raiseFullScreen:Function call to render tags and links in fulscreen");
            // Render tags in full screen mode 
            ns.RenderCurrentTags(true);
            ns.RenderCurrentLinks(true);
            ns.isFullScreenON = true;
            // hide sketches when exit from the fullscreenmode
            $("body").trigger("hideSketches");
            me.toggleAttr("imgFSLow");//For  localization(passing particular html element class to localize when the element class is dynamically changing)
        },

        fullScreenClick: function (elem) {

            // To remove backround color which is given when player in full screen mode
            $(elem).removeAttr("style");
            if (ns.isFullScreenON) {
                me.disableFullScreen(elem);
                ns.passPlayerData(ns.Events.playCtl, "fsExit", {});

            } else {
                me.enableFullScreen(elem);
                ns.passPlayerData(ns.Events.playCtl, "fsEnter", {});
            }
            return true;
        },

        getReqFullScreenElem: function (elem) {
            //returns fullscreen element found or not.
            return elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        },

        //some mobile/tab devices fullscreen event will not be available
        //so we checking whether the event will be available or not.
        enableFullScreenEle: function (elem) {

            // if elem is not passed by UI then take video container as defualt fullscreen element.
            var fElem = (typeof elem !== "undefined") ? elem : me.ctrl.videoContainer;
            var req = me.getReqFullScreenElem(fElem); //returns fullscreen element found or not.
            if (req) { //if fullscreen event found, Enable fullscreen function by adding click event.
                me.cp.ctrl.fullScreen.addEventListener("click", function () { 
                    ns.raiseFullScreen(true) 
                });
            } else { //if fullscreen event not found then change full screen image.
                $("#" + me.cp.elements.fullScreen).removeClass('icn-fullscreen').addClass('disable-fullscreen');
            }
        },

        playerSrcChange: function () {
            // This event will raise when player source changed
            $("body").on("onSrcChange", function (event, videoID) {
                me.cp.resetTime();
                ViTag.debug("Visap:onSrcChange:Handling onsrcchange event" + videoID);
                ns.videoPaused = false;
                setTimeout(function () {
                    $("body").trigger("clearTimer");
                    me.cp.ctrl.seek.value = 0;
                    if (me.cp.time.tmr) {
                        clearInterval(me.cp.time.tmr);
                    }
                    // To set custom seekbar value
                    if (ns.yt.player && ns.yt.enabled) {
                        me.cp.time.tmr = setInterval(me.cp.setSeekBarValue, 1000);
                    }
                    me.cp.ctrl.$whiteBoardWrapper.hide();
                    me.cp.renderAllMarker();
                    me.cp.ctrl.play.className = "imgPause";
                }, 500);

                me.showLoadingimg();
            });
        },

        TimLineSrcChange: function () {

            $("body").on("onTmSrcChange", function () { //when the timeline source changed.
                me.cp.resetTime();
                ns.videoPaused = false;
                $("body").trigger("clearTimer");
                me.cp.resetCounters();
                me.cp.renderAllMarker();
                me.showLoadingimg();
                me.timeline.setInterval();
                if (me.cp.time.tmr) {
                    clearInterval(me.cp.time.tmr); //this clearinterval is for youtube video.
                }
            });
        },
        //this object contains draggable events for annotation and hotspot.
        draggable: {
            init: function () {

                var ele = $('#annotates')[0],
                    eleLeft, // left position of moving box
                    eletop, // top position of moving box
                    start_x, // starting x coordinate of touch point
                    start_y, // starting y coordinate of touch point
                    touchObj = null;// Touch object holder

                //get the position of annotation,when user touch the annotation.
                $('#annotates').bind("touchstart", function (e) {
                    if (me.isDragging) {

                        touchObj = e.originalEvent.changedTouches[0]; // reference first touch point
                        eleLeft = parseInt(ele.style.left); // get left position of box
                        eleTop = parseInt(ele.style.top); // get left position of box
                        start_x = parseInt(touchObj.clientX); // get x coord of touch point
                        start_y = parseInt(touchObj.clientY);// get y coord of touch point
                        e.preventDefault(); // prevent default click behavior
                    }
                });

                //change the position of annotation,by getting co-ordinate value of x and y.
                $('#annotates').bind("touchmove", function (e) {
                    if (me.isDragging) {
                        var vWidth = me.ctrl.$videoMContainer.innerWidth();;//get video container width
                        var vHeight = me.ctrl.$videoMContainer.innerHeight();//get video container height
                        var eleWidth = me.ctrl.$annotates.width(); //get element width
                        var eleHeight = me.ctrl.$annotates.height(); //get element height
                        touchObj = e.originalEvent.changedTouches[0]; // reference first touch point for this event
                        var distX = parseInt(touchObj.clientX) - start_x;// calculate dist x coord traveled by touch point
                        var distY = parseInt(touchObj.clientY) - start_y; // calculate dist y coord traveled by touch point
                        // move element according to starting pos plus(+) dist
                        // with lower limit 0 and upper limit video width minus(-) element width so it doesn't move outside track
                        ele.style.left = ((eleLeft + distX > vWidth - eleWidth) ? vWidth - eleWidth : (eleLeft + distX < 0) ? 0 : eleLeft + distX) + 'px';
                        ele.style.top = ((eleTop + distY > vHeight - eleHeight) ? vHeight - eleHeight : (eleTop + distY < 0) ? 0 : eleTop + distY) + 'px';
                        e.preventDefault();// prevent default click behavior
                    }
                });

                $('#annotates').on('dragstart', function (event) {
                    if (me.isDragging) {
                        $('iframe').css('pointer-events', 'none'); //to prevent mouse events on ck editor iframe while dragging.
                        $('#maskLayer').css({ 'width': '100%', 'height': '100%' }); //adding overlay while dragging in youtube videos.
                        var style = window.getComputedStyle(event.target, null);
                        //sets exact position of draggable element to datatransfer object.
                        event.originalEvent.dataTransfer.setData("Text",
                            (parseInt(style.getPropertyValue("left"), 10) - event.originalEvent.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.originalEvent.clientY) + ',' + event.target.id);
                    }
                });

                $('#hotspotCircle').on('dragstart', function (event) {
                    ViTag.removeHotspot(); //removing hotspot box while dragging.
                    if (me.isDragging) {
                        $('iframe').css('pointer-events', 'none'); //to prevent mouse events on ck editor iframe while dragging.
                        $('#maskLayer').css({ 'width': '100%', 'height': '100%' }); //adding mask layer while dragging in youtube videos.
                        $('#hotspotCircle').css('z-index', '520');
                        var style = window.getComputedStyle(event.target, null);
                        //sets exact position of draggable element to datatransfer object.
                        event.originalEvent.dataTransfer.setData("Text",
                            (parseInt(style.getPropertyValue("left"), 10) - event.originalEvent.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.originalEvent.clientY) + ',' + event.target.id);
                    }
                });

                $('#videoMainContainer').on('dragover', function (event) {
                    if (me.isDragging) {
                        event.preventDefault();
                        return false;
                    }
                });

                $('#annotates').on('dragend', function (event) {
                    $('iframe').css('pointer-events', 'auto');
                    $('#maskLayer').removeAttr('style'); //to remove mask layer after dragging.
                });

                $('#hotspotCircle').on('dragend', function (event) {
                    $('#maskLayer').removeAttr('style'); //to remove mask layer after dragging.
                    $('#hotspotCircle').css('z-index', 'auto');
                    $('iframe').css('pointer-events', 'auto');
                    $('#hotspotBox').show();
                });

                $('#videoMainContainer').on('drop', function (event) {
                    var offset = event.originalEvent.dataTransfer.getData("Text").split(','); //gives data which is set during dragstart.
                    //below condition allows only annotation and hotspot to drop on video container.
                    if (me.isDragging && (offset[2] === "annotates" || offset[2] === "hotspotCircle")) {
                        event.preventDefault();
                        var id = offset[2]; //id of draggable element(hotspot/annotation).
                        var dragEle = document.getElementById(id);
                        dragEle.style.left = (event.originalEvent.clientX + parseInt(offset[0], 10)) + 'px';
                        dragEle.style.top = (event.originalEvent.clientY + parseInt(offset[1], 10)) + 'px';
                        me.annotation.drag(id); //Draging annotation within the video container when mouse/touch release.
                    }
                });
            }
        },

        annotation: {
            startX: 0,
            startY: 0,
            startWidth: 0,
            startHeight: 0, //initial value of x and y co-ordinate
            initResize: function () {
                $('#resizer').bind('touchstart mousedown', function (e) {
                    me.isDragging = false;
                    $('#annotates').scrollTop();
                    $('iframe').css('pointer-events', 'none'); //To avoid mouse events on iframe while resizing.
                    $('#maskLayer').css({ 'width': '100%', 'height': '100%' });
                    $('#annotates').attr('draggable', 'false');
                    $("body").css('-ms-user-select', 'none'); //to prevent text selection in ie when mousedown.
                    //touch event: disable scroll,otherwise screen will also move when resizing.
                    $('body').bind('touchmove', function (e) { e.preventDefault() });
                    var cord = me.annotation.getCordinates(e); //Get co-ordinates value of x and y.
                    startX = cord.x;
                    startY = cord.y;
                    startWidth = $("#annotates").width();
                    startHeight = $("#annotates").height();
                    document.documentElement.addEventListener('mousemove', me.annotation.doResize, false);
                    document.documentElement.addEventListener('mouseup', me.annotation.stopResize, false);
                    document.documentElement.addEventListener('touchmove', me.annotation.doResize, false);
                    document.documentElement.addEventListener('touchend', me.annotation.stopResize, false);
                });
            },

            //Get co-ordinates value of x and y based on mouse/touch events.
            getCordinates: function (e) {

                if (e.type === 'touchstart') { //touch start events.
                    return { x: e.originalEvent.touches[0].clientX, y: e.originalEvent.touches[0].clientY };
                }
                if (e.type === 'touchmove') { //touch move events.
                    return { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
                } else
                    return { x: e.clientX, y: e.clientY }; //mouse events.
            },

            doResize: function (e) {
                me.isDragging = false;
                me.isResizing = false;
                $('#annotates').attr('draggable', 'false');
                $("body").css({ '-webkit-user-select': 'none', '-moz-user-select': '-moz-none' }); //to prevent text selection in chrome,firefox in mousemove out of video container.
                var resizeElement = document.getElementById('annotates');
                var cord = me.annotation.getCordinates(e); //Get co-ordinate value of x and y.
                var eleInitWidth = startWidth + cord.x - startX;
                var eleInitHeight = startHeight + cord.y - startY;
                var contwidth = $("#videoMainContainer").innerWidth();
                var contheight = $("#videoMainContainer").innerHeight();
                var leftAttr = $("#annotates").css('left');
                var topAttr = $("#annotates").css('top');
                var remWidth = contwidth - parseInt(leftAttr, 10);
                var remHeight = contheight - parseInt(topAttr, 10);
                //checks whether width of resizable element is moving outside container.
                if (eleInitWidth <= remWidth) {
                    resizeElement.style.width = (startWidth + cord.x - startX) + 'px';
                }
                //checks whether height of resizable element is moving outside container.
                if (eleInitHeight <= remHeight) {
                    resizeElement.style.height = (startHeight + cord.y - startY) + 'px';
                }
            },

            stopResize: function () {
                me.isDragging = true;
                me.isResizing = true;
                $('#annotates').attr('draggable', 'true');
                $('iframe').css('pointer-events', 'auto');
                $('#maskLayer').removeAttr('style');
                //touch event: enable scroll when touch release.
                $('body').unbind('touchmove');
                $("body").css({ '-webkit-user-select': 'auto', '-moz-user-select': 'auto', '-ms-user-select': 'auto' });
                document.documentElement.removeEventListener('mousemove', me.annotation.doResize, false);
                document.documentElement.removeEventListener('mouseup', me.annotation.stopResize, false);
                document.documentElement.removeEventListener('touchmove', me.annotation.doResize, false);
                document.documentElement.removeEventListener('touchend', me.annotation.stopResize, false);
            },

            //Draging annotation within the video container when mouse/touch release.
            drag: function (id) {

                var vWidth = me.ctrl.$videoMContainer.innerWidth();
                var vHeight = me.ctrl.$videoMContainer.innerHeight();
                var eleWidth = $("#" + id).css('width');
                var eleHeight = $("#" + id).css('height');
                var dragEle = document.getElementById(id);

                var leftdiff = parseInt(dragEle.style.left, 10) + parseInt(eleWidth, 10) - vWidth; //horizontal length moved out of container.
                var topdiff = parseInt(dragEle.style.top, 10) + parseInt(eleHeight, 10) - vHeight; //vertical lenght moved out of container.

                //checks whether element is dragged oustside of video container towards right.
                if ((parseInt(dragEle.style.left, 10) + parseInt(eleWidth, 10)) > vWidth) {
                    dragEle.style.left = parseInt(dragEle.style.left, 10) - leftdiff + 'px';
                }
                //checks whether element is dragged oustside of video container towards left.
                if (parseInt(dragEle.style.left, 10) < 0) {
                    dragEle.style.left = 0 + 'px';
                }
                //checks whether element is dragged oustside of video container towards top.
                if (parseInt(dragEle.style.top, 10) < 0) {
                    dragEle.style.top = 0 + 'px';
                }
                //checks whether element is dragged oustside of video container towards bottom.
                if ((parseInt(dragEle.style.top, 10) + parseInt(eleHeight, 10)) > vHeight) {
                    dragEle.style.top = parseInt(dragEle.style.top, 10) - topdiff + 'px'
                }
            }
        }
    };

    ns.showMessage = function (msg, type, source) {
        me.ShowMessage(msg, type, source);
    };
    //Passing function as parameter from outsite the framework.
    ns.addMessageHandler = function (fn) {
        me.messageHandler = fn;
    };


    /// <summary>            
    ///Init of sketcher list,showing the sketch in respective time    
    /// </summary> 
    var sketcher = {
        s: [,],

        init: function (curSrc) {
            sketcher.list = [];
            var type = "sketch";
            ViTag.debug("Visap:sketcher:init:Initilization of sketcher");

            //Intializing the init method of allAction, depending on the type of action,will return action list. 
            var list = allActions.init(curSrc, type, sketcher.list);
            if(list){
                sketcher.list = list;
            }
        },

        //tickhandler for sketches
        tickHandler: function (d) {

            ViTag.debug("Visap:sketcher:tickHandler:tickhandler of sketcher:" + d.t);
            var ArrayListType = sketcher.list;
            var type = "sketch";

            //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
            allActions.tickHandler(d, type, CurrentActions._SketchList, sketcher, ArrayListType);
        },

        //show overlay for diaplaying sketch
        begin: function (o) {
            me.ctrl.$imgOverLays.show();
            //set the background color to imgoverlay
            me.ctrl.$imgOverLays.css("background-color", "");
            me.ctrl.$imgOverLays.css("background-color", o.color);
            //set css property to imgoverlay.
            me.ctrl.$imgOverLays.attr("src", o.img);
            sketcher.setImgAttr();
            ns.passPlayerData("sketch", "viewed", {});

        },

        //hide overlay twhen sketch duration is done
        end: function () {
            me.ctrl.$imgOverLays.hide();
        },
        //set css attributes for img overlay while rendering.
        setImgAttr: function (setFullwidth) {
            var vidAttr = ns.getVideoDimensions();//get real video dimensions.
            $("#Overlay").css({ left: vidAttr.left, top: vidAttr.top });
            me.ctrl.$imgOverLays.attr("height", vidAttr.height + "px");
            //set the width of the overlay in percentage for ng version
            if (setFullwidth) {
                me.ctrl.$imgOverLays.attr("width", '100%');
            } else {
                me.ctrl.$imgOverLays.attr("width", vidAttr.width + 'px');
            }

        }
    };

    /// <summary>            
    ///Init of annotator list,showing the annotation in respective time    
    /// </summary> 
    var annotator = {
        list: [,], //list to store the action.

        init: function (curSrc) {
            annotator.list = [];
            var type = "annotation";
            ViTag.debug("Visap:annotator:init:Initilization of annatotaion");
            //Intializing the init method of allAction, depending on the type of action,will return respective action list. 
            var list = allActions.init(curSrc, type, annotator.list);
            if(list){
                annotator.list = list;
            }
        },

        //tickhandler will be called every second,if the action is found then respective action will be displayed.
        tickHandler: function (d) {

            ViTag.debug("Visap:annotator:tickHandler:tickhandler of annatotaion:" + d.t);
            var ArrayListType = annotator.list;
            var type = "annotation";

            //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
            allActions.tickHandler(d, type, CurrentActions._anotateList, annotator, ArrayListType);
        },

        //if the object found at the respective time ,action will be displayed by calling RenderAnnotate method.
        begin: function (a) {
            ViTag.debug("Visap:annotator:begin:begin of annatotaion having title :" + a.title + " and " + a.description);
            if (pauseOnShow.checkObj(a.StartTime, a.duration)) {
                return false;
            }
            me.RenderAnnotate(a);

        },

        //if the object is not found at the respective time,then RenderAnnotate will end by passing null.
        end: function () {


            me.RenderAnnotate(null);
        }
    };

    /// <summary>            
    ///Init of whiteboard list,showing the whiteboard in respective time    
    /// </summary> 
    var whiteboard = {
        list: [,],

        init: function (curSrc) {
            whiteboard.list = [];
            var type = "whiteboard";
            ViTag.debug("Visap:whiteboard:init:Initilization of whiteboard");

            //Intializing the init method of allAction, depending on the type of action,will return action list. 
            var list = allActions.init(curSrc, type, whiteboard.list);
            if(list){
                whiteboard.list = list;
            }
        },

        //tickhandler is  called every second
        tickHandler: function (d) {

            ViTag.debug("Visap:whiteboard:tickHandler:tickhandler of whiteboard:" + d.t);
            var ArrayListType = whiteboard.list;
            var type = "whiteboard";

            //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
            allActions.tickHandler(d, type, CurrentActions._WhiteboardList, whiteboard, ArrayListType);
        },

        //if the object found at the respective time ,action will be displayed by calling RenderCurrentWhiteboard method.
        begin: function (a) {
            ViTag.debug("Visap:whiteboard:begin:begin of whiteboard having description :" + a.description);
            if (pauseOnShow.checkObj(a.StartTime, a.duration)) {
                return false;
            }
            ns.RenderCurrentWhiteboard(a);
        },

        //if the object is not found at the respective time,then RenderCurrentWhiteboard will end by passing null. 
        end: function () {

            ns.RenderCurrentWhiteboard(null);
            me.ctrl.$WbimgOverlay.hide();
            me.ctrl.$textcontent.html('');
        }
    };

    /// <summary>            
    ///Init of hotspot list,showing the hotspot in respective time    
    /// </summary> 
    var hotspot = {
        list: [,], //list to store the action.

        init: function (curSrc) {
            hotspot.list = [];
            var type = "hotspot";
            ViTag.debug("Visap:hotspot:init:Initilization of hotspot");

            //Intializing the init method of allAction, depending on the type of action,will return action list. 
            var list = allActions.init(curSrc, type, hotspot.list);
            if(list){
                hotspot.list = list;
            }
            
        },

        //tickhandler is  called every second
        tickHandler: function (d) {
            var ArrayListType = hotspot.list;
            var type = "hotspot";

            //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
            allActions.tickHandler(d, type, CurrentActions._HotspotList, hotspot, ArrayListType);
        },

        //if the object found at the respective time ,action will be displayed by calling RenderCurrentHotspot method.
        begin: function (a) {
            ViTag.debug("Visap:hotspot:begin:begin of hotspot having title :" + a.title + " and " + a.description);
            if (pauseOnShow.checkObj(a.StartTime, a.duration)) {
                return false;
            }
            ns.RenderCurrentHotspot(a);
        },

        //if the object is not found at the respective time,then RenderCurrentHotspot will end by passing null.  
        end: function () {
            ns.RenderCurrentHotspot(null);
        }
    };

    /// <summary>            
    ///   Init of caption, showing and hiding caption.
    /// </summary> 
    var caption = {
        isCcOn: false,
        init: function (capSrc, isSrcCahnge) {
            //below line has to modify when supporting multiple language(multiple tracks).
            var track = me.ctrl.video.children[0];
            //in this condition if track of previous video exists, mode of that track should set to disable and track element has to remove. 
            if (track !== undefined) {
                //In below condition track mode is set based on current snippet of timeline video.
                if (isSrcCahnge && caption.isCcOn) {
                    me.ctrl.video.textTracks[0].mode = ns.VideoTrackMode.show;
                }
                else {
                    me.ctrl.video.textTracks[0].mode = ns.VideoTrackMode.disable;
                    caption.isCcOn = false;
                }
                $('track').remove();
            }

            //In below condition caption source has to check for both undefined and null hence type checking is not done.
            if (capSrc != null) {
                //appending track tag.
                caption.addTrackTag(capSrc);
                //showing caption button. 
                me.cp.ctrl.$captionBtn.removeClass('hidden');
                if (isSrcCahnge && caption.isCcOn) {
                    me.ctrl.video.textTracks[0].mode = ns.VideoTrackMode.show;
                }
            }
            else {
                me.cp.ctrl.$captionBtn.addClass('hidden');//disabling caption button
            }

        },
        toggleCaption: function () {
            var currentSrcType = ns.CurrentSrc().sourcetype;
            if (currentSrcType == ns.sourceTypeEnum.timeline) {
                //for time line videos source type of current snipppet has to find.
                currentSrcType = ns.CurrentSrc().src[me.bunchSq].data.sourcetype;
            }
            //this condition checks for youtube videos to enable or disable caption.
            currentSrcType === ns.sourceTypeEnum.youtube ? caption.toggleYTCaption() : caption.toggleNonYTCaption();
        },

        toggleYTCaption: function () {
            // Set language option for Caption either "en" or null 
            var ccLang = (caption.isCcOn) ? {} : { "languageCode": "en" };
            ns.yt.player.setOption('captions', 'track', ccLang);
            caption.isCcOn = !caption.isCcOn;
        },

        toggleNonYTCaption: function () {
            // Set track mode to either disable or showing
            var trackMode = (caption.isCcOn) ? ns.VideoTrackMode.disable : ns.VideoTrackMode.show;
            me.ctrl.video.textTracks[0].mode = trackMode;
            caption.isCcOn = !caption.isCcOn;
        },

        addTrackTag: function (capSrc) {
            me.ctrl.$video.append(me.cp.createEle({ ele: "track", id: "enTrack", attribs: [{ attr: "label", value: "English" }, { attr: "kind", value: "subtitles" }, { attr: "srclang", value: "en-us" }, { attr: "src", value: ViTag.config.captionpath + capSrc }] }));
        }


    };


    /// <summary>            
    ///Timer setting,timer resetting and firing all functionalities grouped 
    /// </summary> 
    var timer = {

        tmr: null,
        s: null,
        listeners: null,

        init: function (handlers) {
            try {
                ViTag.debug("Visap:timer:init: intialize timer");
                timer.listeners = null;
                timer.reset();
                //adding fn to addHanler method to display actions.
                for (var index in handlers) {
                    timer.addHandler(handlers[index])
                }
            } catch (err) {
                ViTag.error("Visap:timer:Error while intializing timer.init " + err);
            }
        },

        reset: function () {
            clearInterval(timer.tmr);
            timer.tmr = setInterval(timer.tick, 1000);
        },

        tick: function () {
            if (ViTag.paused()) return false;
            if (ns.getCurrentTime() > 0) {
                var t = Math.floor(ns.getCurrentTime());
                timer.fire({ "t": t });
                //posting max time played to GA.
                analytics.postingTimeInterval(t);
            }
        },

        fire: function (d) {
            try {
                if (timer.listeners != null) {
                    var i = 0;
                    while (i < timer.listeners.length) {
                        timer.listeners[i].call(this, d);
                        i++;
                    }
                }
            } catch (ex) {
                ViTag.error("Visap:fire:Error in fire " + ex);
            }
        },

        addHandler: function (fn) {
            if (timer.listeners == null)
                timer.listeners = [];

            timer.listeners.push(fn);
        },


        clearInterval: function () {
            if (timer.tmr) clearInterval(timer.tmr);

        }
    };
    /// <summary>            
    ///Timer setting,timer resetting and firing all functionalities grouped 
    /// </summary> 
    var test = {

        qList: [],
        curQuen: null,
        quesHolder: "tblQuesViTag",

        init: function () {
            ViTag.debug("Visap:test:init:question init");
            if (me.curSrc)
                test.qList = ns.CurrenQuestList();
            test.qList.sort(function (a, b) { return a.data.StartTime - b.data.StartTime });
        },

        // To get the next question from the current source questions list.
        getNext: function (t) {
            var lst = test.qList;
            var found = null;
            if (lst.length > 0) {
                for (var i = 0; i < lst.length; i++) {
                    if (Math.floor(lst[i].data.StartTime) > t && found != null) {
                        break;
                    }
                    if (Math.floor(lst[i].data.StartTime) <= t) {
                        found = lst[i];
                    }
                }
            }
            return found;
        },

        // Called from the timer to get the question which matches the video currenttime.
        tickHandler: function (d) {
            if (test.qList) {
                var q = test.getNext(d.t);
                if (q && Math.floor(q.data.StartTime) === d.t) {
                    test.showQues(q);
                }
            }
        },

        //Pause the video and show the tagged question to user.
        showQues: function (q) {
            //show's question action and hide the default action container for new theme.
            if (ns.suppressActions) {
                return false;
            }
            ns.pauseByAction = true;
            if (timer.tmr) {
                clearInterval(timer.tmr);
            }

            if (q.sourcetype === ns.actionSourceType.aelibquestion) {
                ViTag.aelib.renderQuestion(q, timer.reset); //This will invoke the visap.aelib.js method.
                $("body").triggerHandler("showSliderContent", "question", "block");

            } else {
                ViTag.quiz.showQues(q.data, me.ctrl.$mainContainer, me.ctrl.$videoMContainer, timer.reset); //This will invoke the visap.quiz.js method.
                ns.passPlayerData("question", "viewed", { source: "native", type: "" });
            }
        }
    };
    //#endregion



    ns.init = function (args) {

        if ($) {

            ViTag.debug("Visap:Initilization  with the arguments:" + args.mode + "," + args.path + "," + args.username + "," + args.snapRepopath);
            //creation of all container and dynamically generation of html elements
            me.cp.createElement();
            me.draggable.init(); //binds draggable events.
            me.annotation.initResize(); //binds mouse event for resizing annotation.
            if (args) {
                $.extend(me.video, args);
            }
            // Getggr all controls from document.  
            me.readControls();
            me.init([annotator, sketcher, hotspot, whiteboard, test]);

            //Need to verify this block
            ns.isTest = args.isTest;
            // Set timer with some interval to handle Overlay, Annotations and Question.
            //Initilization of the timer and tickhandlers for all actions

            me.bindEvents();

            // Youtube player support variables
            ns.yt = {
                player: null,
                enabled: false,
                videoState: -1
            };

            //Need to verify this property 
            ns.mode = args.mode;
            //set token url to global value
            ns.tokenURL = args.tokenURL;
            //question type
            ns.questionType = args.questionType;
            //get posting interval from config file.
            ns.postingVidTmInterval = args.postingVidTmInterval;
            //get snapshot repository path.
            ns.snapRepoPath = args.snapRepopath;

            // if videolist aleady fetched then no need to call
            // load data to set the ns.source
            if (args.videoList) {
                ns.source = args.videoList;
            } else {
                me.loadData(ns.mode);
            }

            me.cp.init({ ctrl: me.ctrl, args: me.video });
            //fullscreen element
            me.enableFullScreenEle(args.fullscreenEle);
            //This line is to initialize the analytics object.
            $(document).trigger("init");
            return { ctrl: me.ctrl, args: me.video };

        } else ViTag.showMessage("No jQuery refernce!", "Info", "GetData.load");
    };

    ns.sourceType = -1;

    //#region Initactions 
    /// <summary>
    ///Captures all sketches from common CurrentActionList() 
    /// to its list
    /// </summary> 
    ns.initSketcher = function () {
        try {
            sketcher.init(me.curSrc);
        } catch (err) {
            ViTag.error("Visap:initSketcher:Error in init sketch" + err);
        }
    }

    /// <summary>
    ///Captures all annotation from common CurrentActionList() 
    /// to its list  
    /// </summary>
    ns.initAnnotator = function () {
        try {
            annotator.init(me.curSrc);
        } catch (err) {
            ViTag.error("Visap:initAnnotator:Error in init annotation" + err);
        }
    }

    /// <summary>
    ///Captures all whiteboard from common CurrentActionList() 
    /// to its list  
    /// </summary>
    ns.initWhiteboard = function () {
        try {
            whiteboard.init(me.curSrc);
        } catch (err) {
            ViTag.error("Visap:initAnnotator:Error in init annotation");
        }
    }

    /// <summary>
    ///Captures all hotspot from common CurrentActionList() 
    /// to its list  
    /// </summary>
    ns.initHotspot = function () {
        try {
            hotspot.init(me.curSrc);
        } catch (err) {
            ViTag.error("Visap:initHotspot:Error in init hotspot" + err);
        }
    }

    /// <summary>
    ///Captures all question from commonquestion list 
    ///to its list  
    /// </summary>
    //How does the page determine "isTest", Test or question is part of video conten
    ns.initTest = function () {
        try {
            test.init();
        } catch (err) {
            ViTag.error("Visap:initTest:Error in init question" + err);
        }
    }

    //#endregion

    //#region  play pause playat 

    /// <summary>
    ///Play function called for playing particular video 
    /// </summary>
    ns.play = function (_id, ishome) {
        var analyticsObj = {};
        try {
            ViTag.debug("Visap:play:Playing the Video with the id:" + _id);
            //Gets the particular source from list of sources based on ID
            me.setSource(_id);
            ns.videoId = _id;
            ns.currentSrcTypeName = me.currentSrcTypeName(); //to get the srctype name(timeline,yt,uploaded)
            //Based on type of video  respective playmethod is called ForEx-uploaded:play
            ViTag.debug("Visap:play:Playing the Video for the src:" + ns.CurrentSrc().src);
            //passing event data to visap analytics after clicking play event.
            ns.passPlayerData(ns.Events.play, "", {});
            ns.postedTime = 0; //clear previous time.
            timer.init(CurrentActions._handlers());//starts timer to display actions.
            me[ns.currentSrcTypeName].play(ns.CurrentSrc().src);
        } catch (err) {
            ViTag.error("Visap:play:Error in play for the id " + err);
        }
    };

    //get real video dimensions.
    ns.getVideoDimensions = function () {

        var video = me.ctrl.video;
        var vidHeight = me.ctrl.$videoMContainer.outerHeight();
        var vidWidth = me.ctrl.$videoMContainer.outerWidth();

        if (ViTag.CurrentSrc().sourcetype === ns.sourceTypeEnum.youtube || ns.yt.enabled === true) {
            //ToDo: YouTube 
            return { width: vidWidth, height: vidHeight, top: '0px', left: '0px' };
        }
        // Ratio of the video's intrisic dimensions
        var videoRatio = video.videoWidth / video.videoHeight;
        // The width and height of the video element
        var width = video.offsetWidth, height = video.offsetHeight;
        // The ratio of the element's width to its height
        var elementRatio = width / height;
        // If the video element is short and wide
        if (elementRatio > videoRatio) width = height * videoRatio;
        // It must be tall and thin, or exactly equal to the original ratio
        else height = width / videoRatio;

        var top = (vidHeight - height) / 2;
        var left = (vidWidth - width) / 2;

        return { width: width, height: height, top: top, left: left };
    }

    //This method will get the video auth token
    ns.getVideoAuthToken = function (id) {
        $.ajax({
            url: ViTag.tokenURL,
            type: "POST",
            async: false,
            data: { ID: id },
            success: function (token) {
                ns.tokenId = token;
            },
            error: function (err) {
                ViTag.error("Visap:getVideoAuthToken:error while getting video token" + err);
                ViTag.showMessage("Error while getting video token", "Info", "GetData.load");
            }
        });
    }

    /// <summary>
    ///plays the video from a particular time
    /// </summary>
    /// <param name="t">time video to be played from</param>
    // This should be in the lists of ns.play method
    //Library should know is the type of video being played.
    //Each sub-namespace "uploaded, yt and timeline" should have playAt method
    //This can have only single line: me[ns.currentSrcTypeName].playAt(t)
    ns.playAt = function (t) {
        try {
            ViTag.debug("Visap:playAt:Playing the tag which is created at time:" + t);
            //This trigger will be used in visap integration for customization of tag link panel. 
            $("body").trigger("hideTagLinkContainer");
            me[ns.currentSrcTypeName].playAt(t);
        } catch (err) {
            ViTag.error("Visap:playAt:Error in playAt for the time " + err);
        }
    };
    //To continue the video from whereever it is paused.
    ns.continuePlay = function () {
        if (ns.yt.enabled)
            ns.yt.player.playVideo();
        else
            me.ctrl.video.play();
    };
    /// <summary>
    ///plays the video from a particular time
    /// </summary>
    /// <param name="t">time video to be played from</param>
    //This method needs to be named as "pause()"
    //This will enable caller to pause the video, without knowing what is the video type
    //Should be in line with ns.play and ns.playAt - single like me[type].pause()
    ns.pause = function () {
        try {
            // Pause the video when ever needed 
            if (ns.currentSrcTypeName)
                me[ns.currentSrcTypeName].pause();
        } catch (err) {
            ViTag.error("Visap:pause:Error in pause" + err);
        }
    };

    //this method will stop the video.
    ns.stop = function () {
        try {
            if (ns.currentSrcTypeName)
                me[ns.currentSrcTypeName].stop();
        } catch (err) {
            ViTag.error("Visap:stop:Error while stoping the video " + err);
        }
    };

    //#endregion 

    //#region enum declarations for the sourcetype.
    ns.playerCtrls = {
        imgPause: 'imgPause',
        imgPlay: 'imgPlay',
        imgReplay: 'imgReplay',
        icnfullscreen: 'icn-fullscreen',
        imgFSLow: 'imgFSLow',
        imgMute: 'imgMute',
        imgValx: 'imgValx',
        imgVal: 'imgVal',
        imgValm: 'imgValm'
    }
    ns.sourceTypeEnum = {
        uploaded: 0,
        youtube: 1,
        timeline: 2,
        directURL: 3
    }

    ns.actionSourceType = {
        nativequestion: 'native',
        aelibquestion: 'aelib'
    }
    ns.actionType = {
        question: 'questions',
        annotation: 'annotation',
        hotspot: 'hotspot',
        whiteboard: 'whiteboard',
        sketch: 'sketch',
        tag: 'tag',
        link: 'link'
    }

    ns.roles = {
        Student: '4',
        Instructor: '3'
    }

    ns.VideoTrackMode = {
        show: 'showing',
        disable: 'disabled'
    }

    ns.CaptionType = {
        vtt: "vtt"
    }
    /// <summary>
    ///Gets the attributes of the videoby ID
    /// </summary>
    /// <param name="_id">Unique GUID</para

    // Check how is it different than ns.CurrentSrc
    //This method should be avoided. See if we can remove this meth
    ns.getSource = function (_id) {
        try {
            return me.GetSource(_id);
        } catch (err) {
            ViTag.error("Visap:getSource:Error while getting  data from source for the id" + err);
        }
    };

    //To check the video is in pause mode(for all the type of videos)
    ns.paused = function () {
        try {
            if (ns.currentSrcTypeName)
                return me[ns.currentSrcTypeName].paused();
        } catch (err) {
            ViTag.error("Visap:paused:Error:while paused");
        }
    };

    /// <summary>
    ///Loads the source  from database
    /// </summary>
    /// <param name="autoplay">Attribute of video</param>
    /// <param name="mode">Depicts whether stage or collabration data</param>
    /// <param name="user">Logged in UserName</param>
    ns.loadData = function (mode) {
        try {
            ViTag.debug("Visap:loadData:load data for the mode :" + mode);
            me.loadData(mode);
            ns.suppressActions = false;
        } catch (err) {
            ViTag.error("Visap:loadData:Error while loading the data for the user" + err);
        }
    };

    /// <summary>
    ///Loads the metaData from database
    /// </summary>
    /// <param name="vidId">Video ID</param>
    ns.GetMetaData = function (vidId) {
        try {
            ViTag.debug("Visap:GetMetaData:get metadata for the videoid :" + vidId);
            return me.getMetaDataTimeLine = me.GetMetaData(vidId);
        } catch (err) {
            ViTag.error("Visap:GetMetaData:Error while loading the metadata for the videoid" + err);
        }
    }

    //This method should be inline with ns.play - single line
    //  single line - return me[type].currentTim

    /// <summary>
    ///To get current playing time of the video
    ///currentSrcTypeName means either upload,yt or timeline
    /// </summary>

    ns.getCurrentTime = function () {
        try {
            if (ns.currentSrcTypeName)
                return me[ns.currentSrcTypeName].currentTime();
        } catch (err) {
            ViTag.error("Visap:getCurrentTime:Error while getting the currenttime of the video" + err);
        }
    }

    /// <summary>
    /// Duration of current video which is playing
    ///currentSrcTypeName means either upload,yt or timeline
    /// </summary>
    /// <returns>Returns total duration</returns>
    ns.getDuration = function () {
        try {
            return me[ns.currentSrcTypeName].totalDuration();
        } catch (err) {
            ViTag.error("Visap:getDuration:Error while Getting the total duration of the video" + err);
        }
    }

    /// <summary>
    /// Renders the html tag which is displayed in UI
    /// </summary>
    /// <param name="isFS">Indificates full screen</param>

    //Need to re-review at later stage
    // Render current video attributes -Start- 
    ns.RenderCurrentTags = function (isFS) {
        try {
            ViTag.debug("Visap:RenderCurrentTags:Render the tags for the video ");
            if ($.isFunction(me.ctrl.$tags)) {
                me.ctrl.$tags(me.curSrc, isFS);
            }
        } catch (err) {
            ViTag.error("Visap:RenderCurrentTags:Renders the tags for the currently played video" + err);
        }

    }


    /// <summary>
    /// Renders the html links which is displayed in UI
    /// </summary>
    /// <param name="isFS">Indificates full screen</param>
    //Re-revie
    ns.RenderCurrentLinks = function (isFS) {
        try {
            ViTag.debug("Visap:RenderCurrentLinks:Render the links for the video ");
            if ($.isFunction(me.ctrl.$links)) {
                me.ctrl.$links(me.curSrc, isFS);
            }
        } catch (err) {
            ViTag.error("Visap:RenderCurrentLinks:Error while Rendering the links for the currently played video" + err);
        }
    }


    /// <summary>
    /// Renders the annotation and its html capabilities are decided here
    /// </summary>
    /// <param name="annotationObj">Annotation object to be displayed</param>
    ns.RenderCurrentAnnotates = function (annotationObj, ispreview) {
        try {
            me.setVideoRatio();
            var vidContainerWidth = 540,
                annotationWidth = 200,
                annotationHeight = 44,
                a = annotationObj; //these values are fixed.
            // Video tag total width
            var l = me.ctrl.$videoMContainer.outerWidth(),
                ta = $("#tempAnnotate");
            //used in Testpage
            if (ta.length < 1) {
                $("body").append("<div id='tempAnnotate' class='divAnnotate'></div>");
            }

            $('#annotates').find("p").remove();
            ns.ispreview = ispreview;
            $('#annotateContent').html("");
            if (a) {
                me.isDragging = true;
                ns.pauseByAction = true; //show's annotation action and hide the default action container for new theme.
                var marginLeft, marginTop;
                // Adding temporary div to get actual height of the annotation text
                ta.html("Annotations: " + ViTag.htmlEncode(a.title) + a.description);

                // Display annotation in a particular position.
                marginLeft = a.AnnotationAttributes.left;
                marginTop = a.AnnotationAttributes.top;

                if (a.PauseOnShow === true) {
                    ViTag.PauseOnShow();
                }
                me.ctrl.$annotates.animate({ height: me.vidHeightRatio * parseInt(a.AnnotationAttributes.height), width: me.vidWidthRatio * parseInt(a.AnnotationAttributes.width), left: (me.vidWidthRatio * parseInt(marginLeft)) + "px", opacity: "show", top: (me.vidHeightRatio * parseInt(marginTop)) + "px" }, 1500, function () {

                    $('#annotateContent').find("p").remove();

                    $('#annotateContent').append("<p class='ansContent'>" + ViTag.htmlEncode(unescape(a.title)) + "</p>" + ns.htmlDecode(a.description));
                });
                ns.passPlayerData(ns.actionType.annotation, "viewed", {});
            } else {
                // Hide annotation meaning css attributes  are explicitly as shown below
                if (me.ctrl.$annotates.html() !== "")
                    me.ctrl.$annotates.slideUp(1000);
                else me.ctrl.$annotates.hide().css({ left: "0px", width: "0px", top: "0px" });
            }
        } catch (err) {
            ViTag.error("Visap:RenderCurrentAnnotates:Error while Rendering annotation object" + err);
        }
    }

    ns.PauseOnShow = function () {
        //If user select PauseOnShow Checkbox, then the Video will Pause.
        $("#imgPlay").removeClass("imgPause").addClass("imgPlay");
        me.toggleAttr($("#imgPlay").attr('class'));//For  localization(passing particular html element class to localize when the element class is dynamically changing)
        ns.pause();
        //If user selects stop button and starts playing 
        //  when it pause the video automatically after click on play button 
        //video will start playing from beggining(snippetPlaY)
        // To avoid this ns.tmVideoEnd is set to false
        ns.tmVideoEnd = false;
    }

    /// <summary>
    /// Renders the whiteboard and its html capabilities are decided here
    /// </summary>
    /// <param name="whiteboardObj">Whiteboard object to be displayed</param>
    ns.RenderCurrentWhiteboard = function (whiteboardObj) {
        try {
            me.setVideoRatio();
            if (whiteboardObj) {
                me.ctrl.$textcontainerWB.hide();
                ns.pauseByAction = true; //show's whiteboard action and hide the default action container for new theme.
                var whiteboardWidth = whiteboardObj.whiteboardAttributes.width; //Width of the whiteboard.
                var whiteboardPosition = whiteboardObj.whiteboardPosition; //Postion of the whiteboard(left,right,leftout,rightout).
                ViTag.debug("Visap:RenderCurrentWhiteboard:position and width of the whiteboardobject:" + whiteboardWidth + "," + whiteboardPosition);
                me.ctrl.$whiteBoardWrapper.css('display', 'block');
                me.ctrl.$wboardContainer.css('display', 'block');
                me.ctrl.$wbdragbar.css('display', 'none');
                $("#canvasWB").hide();
                $('#wrapperTxtSketch').scrollTop(0, 0);//By default scroll bars should be display in top.
                me.ctrl.$wboardContainer.css({ width: me.vidWidthRatio * parseInt(whiteboardWidth) });
                me.ctrl.$textcontent.show().css("z-index", "0");
                me.ctrl.$textcontent.html(ViTag.htmlDecode(whiteboardObj.description)); //Text Content will display on the whiteboard.   
                me.ctrl.$WbimgOverlay.attr("src", whiteboardObj.sketchData);
                me.ctrl.$WbimgOverlay.attr("height", "auto");
                me.ctrl.$WbimgOverlay.attr("width", "auto");
                
                if (whiteboardObj.sketchData) { //if only text needs to save then Wbimageoverlay should be hide.
                    me.ctrl.$WbimgOverlay.show();
                }
                ns.passPlayerData(ns.actionType.whiteboard, "viewed", { pauseOnShow: whiteboardObj.PauseOnShow });
                ViTag.debug("Visap:RenderCurrentWhiteboard:Gets the direction of the current whiteboard:" + whiteboardPosition);
                if (whiteboardObj.PauseOnShow === true) {
                    ViTag.PauseOnShow();
                }
                if (ns.isFullScreenON) {
                    ns.whiteboardFullScreen(whiteboardPosition, whiteboardObj); //whiteboard will display left by defualt in fullscreen
                } else {
                    ViTag.animateWb(whiteboardPosition, me.vidWidthRatio * parseInt(whiteboardWidth), function () { });
                }
            } else { //To disappear the whiteboard when the object is not found.           
                me.ctrl.$wboardContainer.animate().hide();
                me.ctrl.$whiteBoardWrapper.animate().hide(); //Hide parent element of whiteboard.
            }
        } catch (err) {
            ViTag.error("Visap:RenderCurrentWhiteboard:Error while Rendering whiteboard" + err);
        }
    }

    //To get height of txt content, depending on this hieght imgoverlay height will be set.
    ns.whiteboardTxtHeight = function () {
        var textcontentHeight = me.ctrl.$textcontent.prop('scrollHeight');
        if (textcontentHeight > me.ctrl.$videoMContainer.height()) { //if textcontent height is greater then wbcontainer height.
            var height = textcontentHeight;
        } else {
            height = me.ctrl.$videoMContainer.height();
        }
        return height;
    }

    //whiteboard will display left by defualt in fullscreen
    ns.whiteboardFullScreen = function (position, whiteboardObj) {
        try {
            if (ns.isFullScreenON) { //If it full screen,whiteboard will display left by defualt.
                ViTag.debug("Visap:whiteboardFullScreen:whiteboard full screen event raised");
                var whiteboardWidth = whiteboardObj.whiteboardAttributes.width;
                var originalwrapperTxtSketch = parseInt(whiteboardWidth);
                ViTag.animateWb(position, originalwrapperTxtSketch, function () { });
            }
        } catch (err) {
            ViTag.error("Visap:whiteboardFullScreen:Error while Displaying whiteboard in fullscreenboard" + err);
        }
    }

    //Animating whiteborad depending on direction in create/edit/render mode.
    ns.animateWb = function (direction, width, callbackFn) {

        me.ctrl.$wboardContainer.stop().animate(); //stops animate(when user click multiple times).
        var videoHeight = me.ctrl.$videoMContainer.outerHeight(); //get the height of video container.
        me.ctrl.$wboardContainer.removeClass("wbLeftPos wbRightPos"); //removing all previous classes.
        me.ctrl.$wbdragbar.removeClass("wbDragbarLeft wbDragbarRight");
        me.ctrl.$wboardContainer.css({ 'display': 'block', 'height': videoHeight, 'width': '0px', 'min-width': '0px' });
        if (direction === "left") {
            me.ctrl.$wboardContainer.animate({ left: '0px', width: width }, { complete: function () { callbackFn(); } }, "slow");
            me.ctrl.$wbdragbar.addClass("wbDragbarLeft");
            me.ctrl.$wboardContainer.addClass("wbLeftPos");
        } else {
            me.ctrl.$wboardContainer.animate({ 'width': width }, { complete: function () { callbackFn(); } }, "slow"); //animating by right.
            me.ctrl.$wbdragbar.addClass("wbDragbarRight");
            me.ctrl.$wboardContainer.addClass("wbRightPos");
        }
        if (!ns.isFullScreenON) {
            setTimeout(function () { me.ctrl.$wboardContainer.css("min-width", '53%') }, 500);
        }
    }

    /// <summary>
    /// Renders the hotspot and its html capabilities are decided here
    /// </summary>
    /// <param name="annotationObj">Annotation object to be displayed</param>
    ns.RenderCurrentHotspot = function (hotspotObj, ispreviewMode) {
        try {
            me.setVideoRatio();
            var vidContainerWidth = 540,
                hotspotWidth = 15,
                hotspotHeight = 15; //these values are fixed.
            // Video tag total width
            var l = me.ctrl.$videoMContainer.outerWidth();
            //used in Testpage
            ns.previewModehotspot = ispreviewMode;
            if (hotspotObj) {
                ViTag.debug("Visap:RenderCurrentHotspot:hotspot rendered having tittle,description:" + unescape(hotspotObj.title) + "," + unescape(hotspotObj.description));
                ns.pauseByAction = true; //show's hotspot action and hide the default action container for new theme.
                var marginLeft, marginTop;
                // Adding temporary div to get actual height of the annotation text
                marginLeft = hotspotObj.hotspotAttributes.left;
                marginTop = hotspotObj.hotspotAttributes.top;

                me.ctrl.$hotspotCircle.css({ left: me.vidWidthRatio * parseInt(marginLeft), top: me.vidHeightRatio * parseInt(marginTop) });
                me.ctrl.$hotspotCircle.show().delay(2000);
                ns.passPlayerData(ns.actionType.hotspot, "viewed", { pauseOnShow: (hotspotObj.showOnpause === 1) ? true : false });
                $('#hotspotBox').css('display', 'none');
                me.isDragging = false;
                me.ctrl.$hotspotCircle.bind("click", function (e) {
                    if ($(e.target).is('.closeHS'))
                        return false;
                    ns.previewHotspot(hotspotObj);
                    ns.passPlayerData(ns.actionType.hotspot, "popped", {});
                    me.isDragging = false;
                });
                if (hotspotObj.showOnpause === 1) {
                    ViTag.PauseOnShow();
                    ns.previewHotspot(hotspotObj);
                    me.isDragging = false;
                    $('#hotspotCircle').attr('draggable', 'false');
                }
            } else {
                me.ctrl.$hotspotCircle.unbind("click");
                me.ctrl.$hotspotCircle.hide();
                me.isDragging = true;
                $('#hotspotCircle').attr('draggable', 'false');
            }
        } catch (err) {
            ViTag.error("Visap:RenderCurrentHotspot:Error in Rendering  the hotspot" + err);
        }

    }
    ///When user click on preview button 
    ///also while rendering hotspot on screen need to show popup box
    ///Here popup box opens and close button is appended
    ns.previewHotspot = function (hotspotObj) {
        try {
            me.isDragging = true;
            me.ctrl.$hotspotCircle.html('');
            ViTag.debug("Visap:previewHotspot:Hotspot tittle and hotspot descrpition:" + unescape(hotspotObj.title) + "," + unescape(hotspotObj.description));
            me.ctrl.$hotspotCircle.append("<div id='hotspotBox'  class='hotspotBox'> <strong> <span class='hstitle'>" + ViTag.htmlEncode(unescape(hotspotObj.title)) + " </span></strong><br/>" + ViTag.htmlEncode(unescape(hotspotObj.description)) + "</div>");
            $('#hotspotBox').prepend("<div class='closeHS' onclick='ViTag.removeHotspot()' >X</div>");
            $('#hotspotBox').css('display', 'block');
        } catch (err) {
            ViTag.error("Visap:previewHotspot:Error in previewing the hotspot" + err);
        }
    }

    /// when user clicks on close button of the popup box of hotspot
    /// pop up box closed and hotspot circle will remain untill duration
    ns.removeHotspot = function () {
        try {
            $('#hotspotBox').css('display', 'none');
        } catch (err) {
            ViTag.error("Visap:removeHotspot:Error while removing the hotspot" + err);
        }
    }

    // Render current video attributes -Start- 
    // Current source attributes -Start- 
    /// <summary>
    /// Function exposed to access the current playing source
    /// </summary>
    /// <returns>Returns Currentsource</returns>
    ns.CurrentSrc = function () {
        try {
            return me.curSrc;
        } catch (err) {
            ViTag.error("Visap:CurrentSrc:Error while getting the currentsource attribute" + err);
        }
    };

    ns.CurrentTimelineSrc = function () { //Function exposed to access the metadata of timeline
        try {
            return me.getMetaDataTimeLine;
        } catch (err) {
            ViTag.error("Visap:CurrentTimelineSrc:Error while getting the metadata of timeline" + err);
        }
    };

    /// <summary>
    /// Function exposed to access the tags of current playing source
    /// </summary>
    /// <returns>Returns tags of Currentsource</returns>
    ns.CurrentTags = function () {
        try {
            return me.curSrc.tags;
        } catch (err) {
            ViTag.error("Visap:CurrentTags:Error while getting the tagsof currently played video" + err);
        }
    };

    ns.getActionsListOnType = function (type) {
        var actionAry = [];
        var actions = me.curSrc.actions;
        $(actions).each(function (i) {
            $(actions[i].listAction).each(function (j) {
                if (actions[i].listAction[j].type === type) {
                    actionAry.push(actions[i].listAction[j]);
                }
            });

        });
        return actionAry;
    },


        /// Function which Extracts the actions from actionlist of currentsource
        /// </summary>
        /// <returns>Returns list of respective actions</returns>
        ns.CurrentActionList = function (type) {
            try {
                ViTag.debug("Visap:CurrentActionList: Extracts action from actionlist");
                var a = ns.getActionsListOnType(type);
                var data = [];
                $(a).each(function (i) {
                    data.push(a[i].data);
                });
                return data;
            } catch (err) {
                ViTag.error("Visap:CurrentActionList:Error while getting the list of action" + err);
            }
        };

    /// <summary>
    /// Function which Extracts the questions  from actionlist of currentsource
    /// </summary>
    /// <returns>Returns list of questions</returns>
    ns.CurrenQuestList = function () {
        try {
            return ns.getActionsListOnType('questions');
        } catch (err) {
            ViTag.error("Visap:CurrenQuestList:Error while getting the questions from actions" + err);
        }
    };

    /// <summary>
    /// Function which points to list of links of currentplayed video
    /// </summary>
    /// <returns>Returns list of links</returns>
    ns.CurrentLinks = function () {
        try {
            return me.curSrc.links;
        } catch (err) {
            ViTag.error("Visap:CurrentLinks:Error while accessing the currentlinks");
        }
    };



    //#region toggleScreen 
    /// <summary>
    /// Moving from normal to fullscreen and from fullscreen to normal screen.
    /// </summary>   
    ns.toggleScreen = function () {
        try {
            //The below line added to hide the annotation while toggling from fullscreen to normal screen and normal to full screen and also to set the css for its default height and width.
            me.ctrl.$annotates.hide().css({ left: "0px", width: "180px", top: "0px", height: "100px" });
            me.ctrl.$annotates.stop(); //to stop the animate function 
            if (!(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement)) {
                if (!ns.isCustomFullScreen) {
                    ns.raiseFullScreen(false);
                }
            } else ns.isCustomFullScreen = false;
            me.ctrl.$imgOverLays.hide();

        } catch (err) {
            ViTag.error("Visap:toggleScreen:Error while moving from fulscreen to normal screen" + err);
        }
    };
    //#endregion 

    //#region closePlayer 
    /// <summary>
    /// Event triggered for closing the player to be handled wherever required
    /// </summary>   
    ns.closePlayer = function (isNotCloseBtn) {
        try {
            $("body").trigger("closePlayer");
            ViTag.debug("Visap:closePlayer:making me.curSrc null because when user try to delete the playing video,it should allow");
            var source = (isNotCloseBtn) ? "backToVideos" : "closeButton";
            //passing event data to visap analytics for video stop event
            ns.passPlayerData(ns.Events.playCtl, "stop", { source: source });
            me.curSrc = null;
            ViTag.tokenId = null;
            me.ctrl.$video.attr('src', '');
            ViTag.isTimelIneMode = false;
            ns.isFullScreenON = false;
            me.resetCustomState();
        } catch (err) {
            ViTag.error("Visap:closePlayer:Error while triggering closeplayer" + err);
        } //making me.curSrc null because when user try to delete the playing video,it should allow.
    };

    //#endregion 

    //#region  Unnecessary global variables 
    // Unnecessary global variables are created, check the functionlaity and remove those 
    ns.disableEditMode = false;
    ns.editmodeValue = false;
    ns.isFullScreenON = false;
    ns.showActions = true;
    ns.isCustomFullScreen = false;
    ns.isTimelIneMode = false;
    ns.pauseByAction = false;
    //if suppressActions  is false display actions else no need to display actions. 
    ns.suppressActions = false;
    //#endregion 
    ns.htmlEncode = function (value) {
        try {
            //create a in-memory div, set it's inner text(which jQuery automatically encodes)
            //then grab the encoded contents back out.  The div never exists on the page.
            return $('<div/>').text(value).html();
        } catch (err) {
            ViTag.error("Visap:htmlEncode:Error while encode" + err);
        }
    };
    ns.htmlDecode = function (value) {
        try {
            return $('<div/>').html(value).text();
        } catch (err) {
            ViTag.error("Visap:htmlDecode:Error while htmlDecode" + err);
        }
    };

    ns.getTimeFormat = function (time) {
        return me.cp.getTimeFormat(time);
    };
    ns.getsourceTypeName = function (type) {
        return me.sourceTypeName(type);
    };

    //#endregion 

    //This method is used to send user information to post data.    
    ns.getUserInfo = function () {
        ns.user = {};
        ns.user.id = sessionStorage.getItem("userid");
        ns.user.email = sessionStorage.getItem("userEmail");
        ns.user.role = ns.getRoleName(sessionStorage.getItem("Role"));
        return ns.user;
    };
    //passing player related event data to visap analytics.
    ns.passPlayerData = function (action, actionType, actionDetails) {
        var eventData = {};
        eventData.action = action;
        eventData.actionType = actionType;
        actionDetails.time = (actionType === "end") ? ViTag.CurrentSrc().videototalduration : ns.getCurrentTime();
        eventData.actionDetails = JSON.stringify(actionDetails);
        $(document).trigger("VisapLog", eventData);
    };

    // resize action container to respective position while
    // showing angular quesion
    ns.resizeActions = function () {
        setTimeout(() => {
            // check for the respective action 
            if (CurrentActions._HotspotList.length > 0) {
                // Do for hotspot
                ns.RenderCurrentHotspot(CurrentActions._HotspotList[0].listObj);
            }
            if (CurrentActions._SketchList.length > 0) {
                // do for sketch
                sketcher.setImgAttr(true);
            }
            else if (CurrentActions._anotateList.length > 0) {
                me.setVideoRatio();
                var a = CurrentActions._anotateList[0].listObj;
                var marginLeft = a.AnnotationAttributes.left;
                var marginTop = a.AnnotationAttributes.top;
                var height = (me.vidHeightRatio * parseInt(a.AnnotationAttributes.height)),
                    width = me.vidWidthRatio * parseInt(a.AnnotationAttributes.width),
                    left = (me.vidWidthRatio * parseInt(marginLeft)) + "px",
                    top = (me.vidHeightRatio * parseInt(marginTop)) + "px";
                me.ctrl.$annotates.css('left', parseInt(left) + "px");
                me.ctrl.$annotates.css('top', parseInt(top) + "px");
                me.ctrl.$annotates.css('height', parseInt(height) + "px");
                me.ctrl.$annotates.css('width', parseInt(width) + "px");
            }
        }, 300);
    }

 
    

    

 

})(window.ViTag = window.ViTag || {});