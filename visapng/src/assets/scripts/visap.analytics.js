//This file is mainly used to post the data for GA		
(function (ns) {
    //events used to set dimension for analytics
    var eventNames = ["add", "edit", "play", "share", "publish", "search", "delete","duration"];
    ns.bindgaEvents = function () {
        //This event is to initialize the analytics object
        $(document).ready(function () {
            try {
                window.analytics.init();
            }
            catch (ex) {
                ViTag.error("analytics:init:Error while intializing analytics object" + ex);
            }
        });
        //This event is to post the data to GA
        $(document).on("VisapLog", function (event, data, actionDetails) {
            try {
                //based on event, data modification has to be made before posting to analytics
                switch (data.action) {
                    case ViTag.Events.play:
                        internal.modifyDataForPlay(data);
                        break;
                    case ViTag.Events.add:
                    case ViTag.Events.edit:
                        internal.modifyDataForImport(data, actionDetails);
                        break;
                    case ViTag.Events.createAction:
                    case ViTag.Events.editAction:
                    case ViTag.Events.deleteAction:
                        internal.modifyDataForAction(data, actionDetails);
                        break;
                    case ViTag.Events.del:
                        internal.modifyDataForDelete(data, actionDetails);
                        break;
                    case ViTag.Events.shared:
                        internal.modifyDataForShare(data);
                        break;
                    case ViTag.Events.publish:
                        internal.modifyDataForPublish(data, actionDetails);
                        break;
                    case ViTag.Events.search:
                        internal.modifyDataForSearch(data, actionDetails);
                        break;
                    default: break;
                }
                //  Based on the data.action, check if init needs to be called   analytics.init(...);
                if (eventNames.indexOf(data.action) !== -1) {
                    data.userID = ViTag.getUserInfo().id;//setting userid
                    data.userRole = ViTag.getUserInfo().role;//setting user role
                    //This event is to initialize the analytics object
                    window.analytics.setDimension(data);
                }
                if(eventNames.indexOf(data.duration) !== -1)
                {
                  window.analytics.setDuration(data.time);
                  return;
                }
                //post method requires 3 parameters,1.login user info. 2. The type of action user is performing. 3.object contains (id,name,desc).
                window.analytics.post(data.action, data.actionType, data.actionDetails);
            }
            catch (ex) {
                ViTag.error("analytics:VisapLog:Error while posting data to GA" + ex)
            }
        });
    }

    var internal = {
        //modifies event data for import and edit event, based on video source type 
        modifyDataForImport: function (data, vidSrc) {
            var typeName = ViTag.getsourceTypeName(vidSrc.sourcetype);
            data.videoID = vidSrc._id;
            switch (vidSrc.sourcetype) {
                case ViTag.sourceTypeEnum.timeline:
                    data.actionType = typeName;
                    data.actionDetails = JSON.stringify({ "videoTitle": vidSrc.title, "description": vidSrc.desc, "noOfSnips": vidSrc.src.length });
                    break;
                case ViTag.sourceTypeEnum.uploaded:
                case ViTag.sourceTypeEnum.youtube:
                case ViTag.sourceTypeEnum.directURL:
                    data.actionType = (data.action === ViTag.Events.add) ? typeName : "properties";
                    data.actionDetails = JSON.stringify({ "videoTitle": vidSrc.title, "description": vidSrc.desc, "videoCategory": vidSrc.category, "type": typeName });
                    break;
                default: break;
            }
        },
        //modifies data for play event
        modifyDataForPlay: function (data) {
            var page = (ViTagUI.ishome) ? ViTagUI.page.gallery : (ViTagUI.isStaging) ? ViTagUI.page.collaboration : ViTagUI.page.myspace;
            data.videoID = ViTag.CurrentSrc()._id;
            switch (page) {
                case ViTagUI.page.gallery:
                    data.actionType = ViTag.currentSrcTypeName;
                    data.actionDetails = JSON.stringify({ "videoTitle": ViTag.CurrentSrc().title, "videoCategory": ViTag.CurrentSrc().category, "isSearchResult": false });
                    break;
                case ViTagUI.page.myspace:
                case ViTagUI.page.collaboration:
                    data.action = ViTag.Events.edit;
                    data.actionType = "action";//value of actionType for video edit event is "action".
                    data.actionDetails = JSON.stringify({ "videoTitle": ViTag.CurrentSrc().title, "source": page });
                    break;
                default: break;
            }
        },

        //modifies data for create, edit and delete action events
        modifyDataForAction: function (data, src) {
            switch (data.actionType) {
                case ViTag.actionType.tag:
                case ViTag.actionType.link:
                    data.actionDetails = JSON.stringify(src);
                    break;
                case ViTag.actionType.sketch:
                    data.actionDetails = JSON.stringify({ time: src.StartTime, duration: src.duration });
                    break;
                case ViTag.actionType.annotation:
                    data.actionDetails = JSON.stringify({ time: src.StartTime, title: src.title, duration: src.duration, pauseOnShow: src.PauseOnShow });
                    break;
                case ViTag.actionType.whiteboard:
                    data.actionDetails = JSON.stringify({
                        time: src.StartTime, direction: src.whiteboardPosition, duration: src.duration, pauseOnShow: src.PauseOnShow
                    });
                    break;
                case ViTag.actionType.hotspot:
                    data.actionDetails = JSON.stringify({ time: src.StartTime, title: src.title, duration: src.duration, pauseOnShow: (src.showOnpause === 1) ? true : false });
                    break;
                case ViTag.actionType.question:
                    var qSrc = { time: src.StartTime, type: src.type || "", tag: (src.qtag == null) ? "" : src.qtag, sourceType: src.sourceType, questionId: src.questionId || "" };
                    data.actionDetails = JSON.stringify(qSrc);
                    break;
                //value of actionType will be "allActions" while deleting list of actions.
                case "allActions":
                    data.actionDetails = JSON.stringify({ time: src.StartTime });
                    break;
                default: break;
            }
        },
        //modifies event data for delete video event.
        modifyDataForDelete: function (data, src) {
            data.actionDetails = JSON.stringify({ videoTitle: src.title, category: src.category, isSearchResult: false });
            data.videoID = src._id;
        },
        //modifyes event data for video assigning event
        modifyDataForShare: function (data) {
            var currentSrc = ViTag.getSource(ViTagUI.Assign.videoid);
            data.actionType = ViTag.getsourceTypeName(currentSrc.sourcetype);
            data.actionDetails = JSON.stringify({
                videoTitle: currentSrc.title, category: currentSrc.category, userIDs: ViTagUI.Assign.assigneduser,
                groupIDs: ViTagUI.Assign.assignedgroup
            });
            data.videoID = ViTagUI.Assign.videoid;
        },
        //modifies event data for video publish event
        modifyDataForPublish: function (data, idlist) {
            //this condition is to distingwish single video publish or multiple videos 
            if (idlist.length === 1) {
                var currentSrc = ViTag.getSource(idlist[0]);
                data.actionType = ViTag.getsourceTypeName(currentSrc.sourcetype);;
                data.actionDetails = JSON.stringify({ videoTitle: currentSrc.title, category: currentSrc.category });
                data.videoID = idlist[0];
            }
            else {
                //as discussed, value of actionType and videoID for publishing multiple video is "publish"
                data.actionType = ViTag.Events.publish;
                data.actionDetails = JSON.stringify({ videoIDs: idlist });
                data.videoID = ViTag.Events.publish;
            }
        },
        //modifies event data for search event.
        modifyDataForSearch: function (data, src) {
            data.actionDetails = JSON.stringify({ searchText: src.searchText });
            data.videoID = src.videoID;
        }
    }

    ViTag.bindgaEvents();
})(window.ViTag = window.ViTag || {});


