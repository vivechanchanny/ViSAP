//This is the intermediate js file to integrate new theme to  visap.js.
/*loginpage related values start*/
var slide = 1;
var uNametxtBoxId = "#txtUsername",
    pwdtxtBoxId = "#txtPassword",
    wrgMsg = "#loginmsg",
    lblUserName = "#uName",
    lblWorkapceName = "#wrokspace";
/*loginpage related values end*/

/*All container and elements id are set here*/
var vidMenuContainer = "#videoList",
    publishBtn = '#publish',
    importVideos = '#importVideos',
    caurouselList = '#itemsList',
    indicators = "#indicators",
    myCarousel = "#myCarousel",
maintable = "#maintable";

//this is the default imagefile name
var defaultImage = "defaultImage.png";

var PlayerId = "vid1";

//volumebar related id
var volumebar = "#volume-bar";

//to clear time interval
var timeInterval = null;

var loginDetails = null;

/*This method will return the videoMenu item. 
By using this method we can customize the video menu style
Based on staging  or publish respective menu will be displayed*/
function getVidMenu(vidSrcList, isStaging, ishome) {
    if (!isStaging) {
        $(publishBtn, importVideos).hide();
    }
    //checking this condition,to differentiate gallary view and myspace collaboration view.
    if (ishome) {
        ViTagUI.getCategoryView(vidSrcList.Categories);
        // If displayCarousel is 1 then show the carosel in the gallary or if it is 0 then hide the carousel.
        if (parseInt(ViTagUI.displayCarousel) === ViTagUI.carousel.Show) {
            $(myCarousel).show();
            //initSlider method will fill the carousel with the latest published videos.
            initSlider(ViTag.source);
        }
        else $(myCarousel).hide();
        return;
    }
    if (!isStaging) {
        var vidList = ViTagUI.getVideoList(vidSrcList);
        ViTagUI.getCommonView(vidList, isStaging, ishome);
        return true;
    }
    ViTagUI.getCommonView(vidSrcList, isStaging, ishome);
}

//to set the snapshot path for the timeline videos.
function setSnapPath(currsrcType, srcType, snap) {
    var timeLineSnap;
    if (currsrcType === srcType) {
        timeLineSnap = snap;  //for the timeline video snapshot should be the first snippet snapshot.
    }
    else {
        timeLineSnap = ViTagUI.snapRepoPath + snap;
    }
    return timeLineSnap;
}

//Moving from fullscreen to normal screen in firfox.
function firefoxfullScreenEvent() {
    document.addEventListener("mozfullscreenchange", function () {
        ViTag.toggleScreen();
    }, false);
    document.addEventListener("webkitfullscreenchange", function () {
        ViTag.toggleScreen();
    }, false);

    //To hide the volumebar where ever user clicks on the window.
    $(document).click(function (event) {
        var target = $(event.target);
        if (target.attr('id') === 'imgMute' || target.attr('id') === 'volume-bar') {
            $(volumebar).removeClass("bar");
            $(volumebar).show();
        } else {
            $(volumebar).addClass("bar");
            $(volumebar).hide();
        }
    });

};
function initSlider(source) {
    var lst = "", isactive = true, indicatorList = "", snapshot = "";
    if (source && source.length > 0) {
        $.each(source, function (i) {
            if (this.sourcetype === ViTag.sourceTypeEnum.uploaded)
                snapshot = ViTagUI.snapRepoPath + this.snap;  //if sourcetype 0 only then we need get the snapshotrepopath(snapshot)
            else if (this.sourcetype === ViTag.sourceTypeEnum.timeline)
                snapshot = setSnapPath(this.src[0].data.sourcetype, ViTag.sourceTypeEnum.youtube, this.snap);
            else
                snapshot = this.snap;
            if (isactive) {
                lst += "<div class='item active'><img alt='First slide' src='" + snapshot + "' class='first-slide'  onclick=\"ViTagUI.playVideo('" + this._id + "')\"   onError=\"javascript:ViTagUI.onImgError(this);\" /><div class='container'><div class='carousel-caption'><span class='imgArrow' onclick=\"ViTagUI.playVideo('" + this._id + "','" + this.yt + "')\"   onError=\"javascript:ViTagUI.onImgError(this);\"></span><h1 class='truncate-text large-width'>" + ViTag.htmlEncode(unescape(this.title)) + "</h1><p>" + ViTag.htmlEncode(unescape(this.desc)) + "</p></div></div></div>";
                indicatorList += "<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";
                isactive = false;
            }
            else {
                if (i < 5) {
                    lst += "<div class='item'><img alt='Second slide' src='" + snapshot + "'  class='second-slide' onclick=\"ViTagUI.playVideo('" + this._id + "')\"  onError=\"javascript:ViTagUI.onImgError(this);\"/> <div class='container'><div class='carousel-caption'><span class='imgArrow' onclick=\"ViTagUI.playVideo('" + this._id + "','" + this.yt + "')\"   onError=\"javascript:ViTagUI.onImgError(this);\"></span><h1 class='truncate-text large-width'>" + ViTag.htmlEncode(unescape(this.title)) + "</h1><p>" + ViTag.htmlEncode(unescape(this.desc)) + "</p></div></div></div>";
                    indicatorList += "<li data-target='#myCarousel' data-slide-to='" + slide + "' ></li>";
                    slide++;
                }
            }
        });
    }
    $(indicators).html("");
    $(indicators).prepend(indicatorList);
    $(caurouselList).html("");
    $(caurouselList).prepend(lst);
};

(function (ns) {

    //Private region starts
    var internal = {
        videoArgs: {}, imgIndex: [], users: [], timle: {}, bunchSq: 0, curtags: {},

        getUserDBdetails: function () {
            var objectData =
                {
                    userName: $(uNametxtBoxId).val(),
                    pwd: $(pwdtxtBoxId).val()
                };

            var objectDataString = JSON.stringify(objectData);
            $.ajax({
                url: ViTag.config.workspaceUrl,
                async: false,
                data: objectDataString,
                type: "POST",
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    if (data !== '') {
                        internal.users = JSON.parse(data).split("~")[0];
                        sessionStorage.setItem('Role', JSON.parse(data).split("~")[1]);
                        loginDetails = true;
                    }
                    else
                        loginDetails = false;
                },
                error: function () {
                    ViTagUI.initMsg("msg.errorMsg", "Info", "GetData.load");
                }
            });
        },

        //to get ownerid from visapworkspacename based on x-Authorization token.
        getOwnerid: function () {
            $.ajax({
                url: ViTag.config.workspaceUrl,
                async: false,
                headers: { 'X-Authorization': sessionStorage.getItem('authT') },
                type: "GET",
                success: function (data) {
                    data = data.replace(/\"/g, "");
                    ns.ownerid = data;
                },
                error: function () {
                    ViTagUI.initMsg("msg.ownerid", "Info", "GetData.load");
                }
            });
        },

        getVidList: function () {
            ViTag.closePlayer(true);
            $('#vidSearch').val('');
            if (ns.ishome && ns.isCategory === true) {
                ViTagUI.getCatVideos(ns.catIndex);
            }
            else {
                ViTag.loadData(ns.isStaging, sessionStorage.getItem('authT'));//loading video's.
            }
        },

        //to get the workspace from visapworkspacename based on x-Authorization token.
        getWorkspaceName: function () {
            $.ajax({
                url: ViTag.config.getworkspaceURL,   //workspace url
                type: "GET",
                async: false,
                headers: { 'X-UserToken': "true", 'X-Authorization': sessionStorage.getItem('authT') }, //sending X-UserToken parameter
                success: function (response) {
                    var workspaceDetails = JSON.parse(response);  //response will be stored in localstorage(workspaceName)
                    sessionStorage.setItem('workSpaceName', workspaceDetails.name);
                    ns.workspaceId = workspaceDetails._id;
                },
                error: function () {
                    ViTagUI.initMsg("msg.WrkSpaceError", "Info", "GetData.load");
                }
            });
        },
        //Show loading image when user clicks 
        //on menu or on change of video in list 
        //Untill video start playing loading image will appears
        showimgOnloading: function () {

            var spacerimage = "data:image/gif;base64,R0lGODlhAgACAIAAAAAAAAAAACH5BAEAAAAALAAAAAACAAIAAAIChFEAOw==";
            $(playContainer).block({ message: "<br/><br/><br/><br/><img src='" + spacerimage + "'class='loading' /><br /><lable class='lblLoading' data-i18n=\"msg.loadingMsg\"></lable>", css: { borderRadius: "11px" } });
            $(".blockOverlay").addClass("blockOverlayTemp")
            $(".blockElement").css({ "background-color": "", "border": "0px", "width": "100%", "height": "100%", "top": "0px", "left": "0px" });
            $(".blockOverlay").css({ "opacity": "0.6", "background-color": "#000" });

            if (ViTag.yt.enabled) {
                $(playContainer).unblock();
            }
            else {
                vid1.onplaying = function () {
                    setTimeout(function () {
                        $(playContainer).unblock();
                    }, 500);
                };
            }

        },
        //Event is binded  When user clicks on close button of the player to hide the player division and to show caraouselViTagUI.play
        bindEvents: function () {

            $("body").on("playVideo", function () { //This event is using to play the video when it is an android device,because
                if (navigator.userAgent.toLowerCase().indexOf("android") > -1)   //in android device static and direct url video's are not playing if we just assing the src to video (explicit play is required.)
                {
                    $("#vid1")[0].play();                                        //in android device static and direct url video's are not playing if we just assing the src to video (explicit play is required.)     
                }                                                               //need to check this conditon for only android for future use() if(navigator.userAgent.toLowerCase().indexOf("android")>-1))                    

            });
            //This event we are binding to give confirmation message when the user is in edit mode(and also not in gallery page) 
            jQuery(window).bind('beforeunload', function () {
                if (($("#editContainer").is(":visible") || ViTag.isTimelIneMode) && !ViTagUI.ishome) {
                    return "Do u want to cancel";
                }
                else {
                    return;
                }
            });

            $("body").on("closePlayer", function () {
                ViTagUI.hidePlayer();
            });
            $("body").on("clearContainer", function () {
                initSlider(ViTag.source);
            });

            $("body").on("onFullScreen", function (event, isFullScreenON) {
                internal.handleFullscreenUI(isFullScreenON);
                ns.editDelIcon(false);
            });

            $("body").on("showSliderContent", function (event, type) {
                internal.showSliderContent(type);
            });

            $("body").on("onYTError", function () {
                ViTagUI.initMsg("msg.onYTError", "Info", "GetData.error");
                return false;
            });

            $("body").on("showLoadingimg", function () {
                internal.showimgOnloading() //to render the markers on the seekbar.
            });
            $("body").on('hide.bs.modal', function () {
                $(".modal-subtitle").scrollTop(0);
            });
        },

        enableEditMode: function (userRole) {
            if (userRole === ViTag.roles.Instructor) {
                $("#footerlinks,#myspace,#collaboration,#divider,#group").removeClass('hidden');
            }
            return true;
        },
        //Core libraries are called here to initaialise all arguments which are passing
        setVideo: function (usersDtails) {
            internal.setVideoArgs(usersDtails);
            ns.videoArgs = ViTag.init(internal.videoArgs);
        },
        //Arguments are passed to core libraries
        setVideoArgs: function (usersDtails) {
            internal.videoArgs.autoplay = false;
            internal.videoArgs.path = ns.videoRepoPath;
            internal.videoArgs.snapRepopath = ns.snapRepoPath;
            internal.videoArgs.UserId = ns.isStaging ? "stage" : usersDtails;
            internal.videoArgs.menu = internal.createVidMenu;
            internal.videoArgs.player = PlayerId;
            internal.videoArgs.mode = ns.isStaging ? true : false;
            internal.videoArgs.tags = internal.CreateCurrentTags;
            internal.videoArgs.links = internal.CreateCurrentLinks;
            internal.videoArgs.username = ns.isStaging ? "stage" : usersDtails;
            internal.videoArgs.tokenURL = ViTag.config.visapTokenurl;
            internal.videoArgs.questionType = ViTag.config.questionType;
            internal.videoArgs.fullscreenEle = $(maintable)[0];//fullscreen element for the video.
            internal.videoArgs.postingVidTmInterval = ns.postingVidTmInterval;
        },
        CreateCurrentTags: function (curSrc, tagstype) {
            if (curSrc) {
                if (tagstype)
                    tagstype = $("#FStags1");
                else
                    tagstype = $("#tagDiv1");
                if (tagstype.length) {
                    tagstype.html("");
                    $(curSrc.tags).each(function () {
                        var tagTime = this.t;
                        tagstype.append("<span onclick=\"ViTag.playAt('" + tagTime + "')\">" + ViTag.htmlEncode(unescape(this.d)) + "</span>");
                    });
                }
            }
        },
        CreateCurrentLinks: function (curSrc, linkstype) {
            if (curSrc) {
                if (linkstype)
                    linkstype = $("#FSlinks1");
                else
                    linkstype = $("#linkDiv1");

                if (linkstype.length) {
                    linkstype.html("");
                    $(curSrc.links).each(function () {
                        linkstype.append("<span><a href='" + this.u + "' target='_blank'\">" + ViTag.htmlEncode(unescape(this.n)) + "</a></span>");
                    });
                }
            }
        },
        createVidMenu: function (vidSrcList) {//vidSrc contains all the videos(timeline,uploded and youtube.)
            var $vl = $(vidMenuContainer), vidEle = "<div data-i18n=\"msg.checkVideos\"></div>";
            $(vidMenuContainer).children().remove("div");
            if (vidSrcList && vidSrcList.length > 0) {
                vidEle = getVidMenu(vidSrcList, ns.isStaging, ns.ishome);
                if (ViTag.isTimelIneMode)
                    ViTagUI.tmVideoList();
            }
            else {
                $vl.prepend(vidEle);
                ViTag.localize($vl);
            }
        },
        // get metadata information
        getmetadata: function (id) {
            $.ajax({
                url: ViTag.config.wsMetadataurl,
                type: "GET",
                async: false,
                headers: { isStage: false,'X-Authorization': sessionStorage.getItem('authT') },
                data: { ID: id },
                success: function (data) {
                    var obj = JSON.parse(data);
                    if (obj[0] !== undefined && obj[0].tags !== undefined) {

                        internal.curtags = obj[0].tags;
                        return internal.curtags;
                    }
                },
                error: function () {
                    ViTagUI.initMsg("msg.errorMsg", "Info", "GetData.load");
                }
            });
        },
        /// <summary>
        /// Formats the duration from seconds to hour mints and secs
        /// Header will have duartion in hr mins and sec and contents in mins and secs  
        /// </summary>
        /// <param name="secs">seconds which need to be formatted</param>
        /// <param name="istag">bool condition to check the type of formatting</param>
        formattime: function (secs, istag) {
            if (secs === undefined)
                return "--";
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = secs - (hr * 3600) - (min * 60);
            if (hr < 10) { hr = "0" + hr; }
            if (min < 10) { min = "0" + min; }
            if (sec < 10) { sec = "0" + sec; }
            if (istag)
                return min + ':' + sec;
            else
                return hr + ':' + min + ':' + sec;
        },
        /// <summary>
        /// Searches a particular video based on the ID.
        /// Passed as parameter.   
        /// </summary>
        /// <param name="_id">Unique id of the video</param>
        GetSource: function (_id) {
            return ViTag.source ? $.grep(ViTag.source, function (e) { return e._id === _id; })[0] : null;
        },

        handleFullscreenUI: function (callback) {
            $('#actionsContainer').hide();
            var elem = "#maintable";
            callback(elem);
            if (ViTag.isFullScreenON) {
                $("#slider").removeClass("sliderFS");
                $("#questContainer").removeClass("questContainerFS").addClass("questContainer");
                $("#questContainer").css("height", internal.vHeight);
            }
            //This toggleClasses event triggereing to add and remove bootstrap classes in only gallary page.
            $("body").trigger("toggleClasses");
        },
        showSliderContent: function (type) {
            $("#slider").toggle(1000);
            if (type === "tags") {
                $("#questContainer").hide();
                $("#accordion").show();
            }
            else {
                $("#questContainer").show();
                $("#accordion").hide();
                $("#slider").show(1000); // incase if the tags and links are visible then show the slidser explicitly
            }
        },
        addReqElements: function (className, id) {
            $("#commonToc").append("<div class='toc-divider'><table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr> <td id='" + id + "'  class='" + className + "'></td> <td class='toc-duration' ></td></tr></table> </div>");
            ViTagUI.seti18n('#' + id, "playerEdit." + id);//for localization
        },
        // todo: this block has to discuss to group category videos in gallery
        removeCatVideos: function (vidSrce, searchTxt) {
            var videoSource = vidSrce;
            for (var i = 0; i < videoSource.length; i++) {
                for (var x = 0; x < videoSource[i].category.length; x++) {
                    if (unescape(videoSource[i].category[x]).toLowerCase().includes(searchTxt) && !unescape(videoSource[i].title).toLowerCase().includes(searchTxt)) {
                        videoSource.splice(i, 1);
                        --i;
                        break;
                    }
                }
            }
            return videoSource;
        },
        //seraches for categories in video source
        SearchCategory: function (vidSource, catSearchVal) {
            var videoSource = vidSource, Categories = [];
            for (var i = 0; i < videoSource.length; i++) {
                for (var x = 0; x < videoSource[i].category.length; x++) {
                    if (unescape(videoSource[i].category[x].toLowerCase()).match(catSearchVal))
                        Categories.push(unescape(videoSource[i].category[x]));
                }
            }
            var uniqueCat = internal.duplicateCheck(Categories);
            return uniqueCat;
        },

        //checks for duplicate categories
        duplicateCheck: function (obj) {
            for (var i = 0; i < obj.length; i++) {
                internal.removeDuplicateValue(obj, i);
            }
            return obj;
        },
        removeDuplicateValue: function (obj, i) {
            var newObj = $.extend(true, [], obj);
            for (var j = 0; j < obj.length; j++) {
                if (i !== j && (obj[i].toLowerCase() === obj[j].toLowerCase())){                   
                        obj[i] = newObj[i];
                        obj.splice(j, 1);                  
                }
            }
        },

        //  question list  data based on video and user 
        getQuestionListHeader: function (data) {
            var tempData = [];
            for (var i = 0; i < data.length; i++) {
                var userid =  data[i].userid[0];
                var fullname =   data[i].username[0];
                var obtainedscore = data[i].obtainedscore % 1 === 0 ?data[i].obtainedscore: data[i].obtainedscore.toFixed(2);
                var raw = obtainedscore +"/" +data[i].maxscore;
                var percentage  = (( obtainedscore/data[i].maxscore)*100).toFixed(2);
                var videotitle= internal.getTrimmedText( unescape(ViTag.CurrentSrc().title));
                if (ViTag.user.role === "Student")
                    tempData.push({ videoname: videotitle, raw: raw  , percentage: percentage, userid: userid });
                else
                    tempData.push({ videoname: videotitle, username: fullname,   raw: raw  , percentage: percentage, userid: userid });
            }
            return  tempData;
        },

               //  question list  data based on video and user 
        getQuestionListDetails: function (data) {
            var tempData = [];
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                var title=  data[i][j].questiontitle;
                var obtainedscore = data[i][j].score % 1 === 0 ? data[i][j].score: data[i][j].score.toFixed(2);  
                  tempData.push({ "Quiz Name": title, "Max Score": data[i][j].maxScore, "Obtained Score": obtainedscore, "Status": data[i][j].status });
                }
               
            }
             
            return  tempData;
        },
        // unique list of response data
         getUniqueResponse: function(tempData){
             var cleaned = [];
            tempData.forEach(function (itm) {
                var unique = true;
                cleaned.forEach(function (itm2) {
                    if (_.isEqual(itm, itm2)) unique = false;
                });
                if (unique) cleaned.push(itm);
            });
            return cleaned;
         },
        //table headers based on roles
        getScemaforQuestResponse: function () {
            var tableschema;
            if (ViTag.user.role === "Student") {
                tableschema = [
                    { "header": "Video Name", "key": "videoname" },
                   
                    { "header": "Raw", "key": "raw" },
                    { "header": "Percentage", "key": "percentage" },
                    { "header": "", "key": "userid", "template": '<a href="#"  data-target=\'#myModalQestRespFullDetails\' data-toggle=\'modal\'  onclick=\'ViTagUI.viewResponseDetails("{{userid}}")\'>View Details</a>' }

                ]
            }
            else {
                tableschema = [
                    { "header": "Video Name", "key": "videoname" },
                    { "header": "User Name", "key": "username" },
                   
                    { "header": "Raw", "key": "raw" },
                    { "header": "Percentage", "key": "percentage" },
                    { "header": "", "key": "userid", "template": '<a href="#"  data-target=\'#myModalQestRespFullDetails\' data-toggle=\'modal\'  onclick=\'ViTagUI.viewResponseDetails("{{userid}}")\'>View Details</a>' }

                ]
            }
            return tableschema;

        },
        // get the truncated string for the lengthy text 
        getTrimmedText : function(title){                      
           return (title.length >10) ? jQuery.trim(title).substring(0, 20).trim(this) + "..." : title;
        }

    };

    ns.getReady = function () {

        ViTag.visapLocalize();//localization of strings.
        ViTag.addMessageHandler(ViTagUI.initMsg);
        var userName = sessionStorage.getItem('AppUser');
        var loginUser = JSON.parse(userName);
        ViTagUI.getAppSettingsValues();           //to get the videorepo and snapshotrepo path from the webconfig
        if (userName === null || loginUser.environment !== ViTag.config.environment) //checking user enviroment.
            ns.logout();
        else {
            internal.bindEvents();
            ns.user = sessionStorage.getItem('authT');
            $.cookie('authToken', ns.user, { path: '/' });
            internal.getWorkspaceName();
            internal.getOwnerid();
            if (!internal.enableEditMode(sessionStorage.getItem('Role')))
                return false;
            internal.setVideo(ns.user);
            $(lblUserName).text(loginUser.lastname + ',' + loginUser.firstname);
            ViTag.userName =  ns.userName = loginUser.lastname + ',' + loginUser.firstname;
            $(lblWorkapceName).text(sessionStorage.getItem('workSpaceName'));
            $('[data-toggle="tooltip"]').tooltip();
            ViTagUI.initCategory();
            $("time.timeago").timeago();
        }
        firefoxfullScreenEvent();
    };
    //Declaring enums 
    ns.carousel = {
        Show: 1,
        Hide: 0
    };

    ns.ishome = true;
    ns.isStaging = false;
    ns.page = {
        gallery: 'gallery',
        myspace: 'myspace',
        collaboration: 'collaboration'
    };
    ns.distinctCategories = function () {
        var categorylist = [];
        $.ajax({
            url: ViTag.config.wsCategorySearchurl,
            type: "GET",
            headers: { isStage: ns.isStaging,'X-Authorization': sessionStorage.getItem('authT') },
            async: false,
            success: function (data) {
                categorylist = JSON.parse(data);
            },
            error: function () {
                ViTagUI.initMsg("msg.errorMsg", "Info", "GetData.load");
            }
        });
        return categorylist;
    };

    /* Logout is clicked and to clear all user session and returns user back to login page */
    ns.logout = function () {
        window.location.href = ViTag.config.LoginPage;//Redirecting to workspace login page.
        sessionStorage.clear();
    };

    // click on thumbnail video to play a video
    ns.playVideo = function (videoId) {
        ns.hideActions();
        $("#thumbnails,#category,#slider,#searchcontainer,#saveCancel,#videoTagTilte,#videotitle").hide();
         $("#videotitle,#videoTagTilte").text('');
        $("#playerpart,#videodesc,#backToList,#gradesreport").show();
        if (ViTag.isTimelIneMode) {
            $("#timeLineContainer").show();
            $("#gradesreport").hide();
            $("#CaptureBtn").removeClass('endCapture').addClass('startCapture');
            ViTagUI.modTmLnSaveBtn(false);
        }
        else {
            $("#timeLineContainer,#actionsContainer").hide();
            sessionStorage.removeItem("CurrentAction");
        }
        ViTag.play(videoId);
        ns.bindTagsLinks();
        $("#accordionActions").html('');
        var title = ViTag.CurrentSrc().title;
        var description = ViTag.CurrentSrc().desc;
        $("#pagetitle").text(unescape(title));
        $('#videodesc').text(unescape(description));
        internal.vHeight = $("#videoContainer").height();
    }

    // click on back button when video in play mode
    ns.backToThumnails = function () {
        ns.hideActions();
        var activeTab = $("#editContainer .active-tag").attr('id');
        if (activeTab !== undefined) {
            $("#" + activeTab).removeClass("active-tag");
        }
        if (ViTag.isTimelIneMode) {
            var msg = ViTag.getLocalizeValue("confirmationMsg.cancelMsg");
            $.confirm(msg).then(function (istrue) {
                if (istrue) {
                    ViTag.isTimelIneMode = false;
                    ViTagUI.resettmvalues(); //to reset the values.
                    internal.getVidList();
                }
                return;
            });
        } else
            internal.getVidList();
    }


    // fetch submision of the question response 
    ns.viewResponse = function () {
        ViTag.aelib.getQuestResponse(function (data) {
            internal.questResponseData = data = JSON.parse(data);
            ///check for no records in DB
            $("#tblQuestData").html('');
            if (data.length === 0){
                $("#tblQuestData").html('NO DATA FOUND');
            }
                      
           var  tempData = internal.getQuestionListHeader(data);
            
            // DOM manupulation for dynamic records update
            $("#tblQuestData").find("#table-wrapper").remove();
            var template = "<div id='table-wrapper'></div>";
            $("#tblQuestData").append(template);
            // get the table headers based on role
            var tableschema = internal.getScemaforQuestResponse();
            $('#table-wrapper').columns({
                data: tempData,
                schema: tableschema
            });

        },true,ViTag.user.id);
    }


    // fetch submision of the question response in details 
    ns.viewResponseDetails = function (userid) {
       ViTag.aelib.getQuestResponse(function (data) {
        data = JSON.parse(data);
        var  tempData = internal.getQuestionListDetails(data);
        $("#tblQuestDetails").find("#table-wrapperResponse").remove();
        var template = "<div id='table-wrapperResponse'></div>";
        $("#tblQuestDetails").append(template);
        $('#table-wrapperResponse').columns({
            data: tempData
        });
        },false,userid);
    }

    //Hides all actions.
    ns.hideActions = function () {
        $("#annotates").stop();
        $("#imgOverlay,#annotates,#hotspotCircle,#whiteBoardWrapper,#sketchcontainerDefault").hide();
    }

    ns.showHideContainer = function () {
        $("#thumbnails,#category,#searchcontainer").show();
        $("#playerpart,#slider,#editContainer,#timeLineContainer,#backToList,#gradesreport").hide();
        $("#videotitle,#videodesc","#videoTagTilte").text('');
        $("time.timeago").timeago();
    }
    // current source related all tags and links are populated here
    ns.bindTagsLinks = function () {
        var source = ViTag.CurrentSrc();
        var tags = ViTag.CurrentSrc().tags;
        var links = ViTag.CurrentSrc().links;
        var markup = "", notags = false, nolink = false;
        $("#accordion").html('');
        markup += "<div class='panel panel-default'>";
        markup += "<div id='collapseOne' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne'>";
        markup += "<div class='panel-body toc-pad' id='commonToc' ></div></div></div>";
        $("#accordion").append(markup);
        if (tags && tags.length > 0) {
            $(source.tags).each(function (index) {
                var editedValue = 'ViTagUI.EditTag(' + this.t + ', "' + escape(this.d) + '")';
                var markup2 = "";
                markup2 += "<div class='toc-divider'><table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr  onclick=\"ViTag.playAt('" + this.t + "')\"> <td class='toc-vi-newname toc-icn-tag truncate-text text-width' id='" + "tag" + index + "' onclick=\"ViTag.passPlayerData('tag','click', { name:'" + escape(this.d) + "' })\" data-toggle='tooltip'> </td><td class='toc-duration'>" + ViTag.getTimeFormat(this.t) + "</td>";
                if (!ns.ishome)
                    markup2 += "<td class='action-controls1'><ul class='act-controls-main' ><li data-i18n='[title]common.edit' class='edit-small hideEle' onclick='" + editedValue + "'><li data-i18n='[title]common.delete' class='delete-small hideEle' onclick='ViTagUI.DeleteTag(\"" + escape(this.d) + "\"\)'></li></li></ul></td></div>";
                markup2 += "</tr></table></div>";
                $("#commonToc").append(markup2);
                ViTag.localize($("#commonToc"));
                $("#tag" + index).attr('title', this.d);
                $("#tag" + index).text(this.d);
            });
        }
        else
            notags = true;

        if (notags) {
            internal.addReqElements('toc-vi-name toc-icn-tag', 'noTag');//this method adds div elements if no tags found.
        }

        if (links && links.length > 0) {
            $(source.links).each(function (index) {
                var markup3 = "";
                var editedValue = 'ViTagUI.EditLink("' + this.n + '", "' + this.u + '")';
                markup3 += "<div class='toc-divider'> <table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr> <td class='toc-vi-newname toc-icn-link truncate-text text-width' id='" + "link" + index + "' data-toggle='tooltip'><a href='" + this.u +
                    "' class='navigatelink' onclick=\"ViTag.passPlayerData('link','viewed',{'name':'" + this.u + "'})\" target='_blank'\">" + ViTag.htmlEncode(unescape(this.n)) + "</a></td>";
                if (!ns.ishome)
                    markup3 += "<td  class='action-controls1'><ul class='act-controls-main'><li data-i18n='[title]common.edit'  class='edit-small hideEle' onclick='" + editedValue + "'><li data-i18n='[title]common.delete' class='delete-small hideEle' onclick='ViTagUI.DeleteLink(\"" + this.n + "\"\)'></li></li></ul></td></div>";
                markup3 += "</tr> </table> </div>";
                $("#commonToc").append(markup3);
                ViTag.localize($("#commonToc"));
                $("#link" + index).attr('title', (unescape(this.n)));
            });
        }
        else
            nolink = true;

        if (nolink) {
            internal.addReqElements('toc-vi-name toc-icn-link', 'noLink');
        }
    }

    //Enable and disable edit/delete icons for tags and links. 
    ns.editDelIcon = function (val) {

        var enableIcons = val;
        if (ViTag.isFullScreenON) {
            enableIcons = false;
        }
        if (ViTag.paused() === false || enableIcons === false) {
            $(".delete-small,.edit-small").hide();
        }
        else {
            $(".delete-small,.edit-small").show();
        }
    }

    // tags and links accordian
    ns.getTagsLinks = function () {
        $("body").trigger("addRemoveClass");//This event is to add and remove bootstrap classes to make palyer responsive for only gallary page
        ns.editDelIcon(true);
        internal.showSliderContent("tags");
    }

    ns.toc = function (categoryname, type, videoId) {

        ns.isCategory = false;
        var markup = "";
        $("#category,#thumbnails,#searchcontainer,#slider,#videodesc,#videoTitleContainer,#tocLabel").hide();
        $("#playerpart,#accordion,#gradesreport").show();
        $("#accordion").html('');
        $('#videotitle,#videoTagTilte').text('');
        if (type === undefined) {
            $("#slider").show();
            // get the videos which are belongs to the categoryname and build the accordian
            ns.categoryinfo = ViTagUI.getVideoinfoByCategory(categoryname);
            var source = ns.categoryinfo.vidDetails;

            $(source).each(function (i) {
                markup += "<div class='panel panel-default'>";
                markup += " <div class='panel-heading' role='tab' id='heading" + i + "'>";
                markup += " <table width='100%' border='0' cellspacing='0' cellpadding='10'>";
                markup += " <tr> <td class='toc-exp-col'><a   role='button' data-toggle='collapse' data-parent='#accordion' href='#collapse" + i + "'><img  src='images/common/video/arrow-ex-col.png' id='icon" + i + "'  class='glyphicon glyphicon-chevron-up' onclick=\"ViTagUI.expandTags(" + i + ",'" + source[i]._id + "')\"></img></a></td>";
                markup += "  <td id='vidName" + i + "' class='toc-vi-name truncate-text text-width' >" + ViTag.htmlEncode(unescape(source[i].title)) + "</td> <td class='toc-duration'>" + ViTag.getTimeFormat(source[i].videototalduration) + "</td>"
                markup += " <td class='toc-play-pause'><img src='images/common/video/toc-play.png'  onclick=\"ViTagUI.play('" + source[i]._id + "')\"  width='15' height='20'></td></tr></table> </div>";
                // end of header//
                markup += "<div id='collapse" + i + "'  role='tabpanel' aria-labelledby='heading" + i + "'>";
                markup += "<div class='panel-body toc-pad' id='tagslinkspanel" + i + "' >";
                markup += "</div></div></div>";
                $("#accordion").append(markup);
                $("#vidName" + i).attr('title', unescape(source[i].title))
                markup = '';
            });
            // play first index video  to avoid empty video container
            ViTag.play(source[0]._id);
            $("#pagetitle").text(unescape(categoryname));
            $("#videoTitleContainer,#tocLabel").show();
            $('#videotitle').text(unescape(source[0].title));
            internal.vHeight = $("#videoContainer").height();
        }
        else
            ns.playVideo(videoId);
    }

    ns.changeIconCollpase = function (index, id, list) {
        var imgSrc = "images/common/video/arrow-ex-col1.png";
        var a = $(id + index)[0].src.split("/");
        //to get category video length
        if (a[a.length - 1] === "arrow-ex-col.png") {
            $(id + index)[0].src = imgSrc;
        }
        else {
            $(id + index)[0].src = "images/common/video/arrow-ex-col.png";
        }

        for (var i = 0; i < list.length; i++) {
            if (i !== index) {
                $(id + i)[0].src = "images/common/video/arrow-ex-col.png ";
            }
        }
    }

    // expand tags based on video
    ns.expandTags = function (index, videoID) {
        var vidLength = ns.categoryinfo.vidDetails;
        ns.changeIconCollpase(index, "#icon", vidLength);
        var markup = "";
        internal.curtags = {};
        $("#tagslinkspanel" + index).html('');
        internal.getmetadata(videoID);
        var alltags = internal.curtags;
        if (alltags.length > 0) {
            $(alltags).each(function (j) {
                var duration = internal.GetSource(videoID);
                var time = internal.formattime(ViTagUI.getTagTime(alltags[j].t, alltags, duration.videototalduration), true);
                var tagName = unescape(alltags[j].d);
                markup += "<div class='toc-divider'><table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr> <td id='" + "tagNm" + j + index + "' class='toc-vi-name toc-icn-tag truncate-text text-width' onclick=\"ViTagUI.playCurrentVideoTags('" + alltags[j].t + "','" + videoID + "','" + tagName + "')\" ></td> <td class='toc-duration' >" + time + "</td>  </tr> </table> </div>";
                $("#tagslinkspanel" + index).append(markup);
                markup = "";
                $("#tagNm" + j + index).attr('title', tagName);
                $("#tagNm" + j + index).text(tagName);
            });
        }
        else {
            ViTagUI.initMsg("msg.tags", "Info", "GetData.load");
        }
    }

    /// <summary>
    /// Gets the next tag ahead of the passed tagtime`
    /// </summary>
    /// <param name="tagtime">current tag time to compare</param>
    /// <param name="tags">source to iterate</param>
    /// <param name="duration">total duration of the video</param>
    ns.getTagTime = function (tagtime, tags, duration) {
        var t = $.grep(tags, function (e) { return e.t > tagtime; })[0];
        //Take the next tag time to calculate the duartion      
        return t ? t.t - tagtime : duration - tagtime;
    };

    // play only current video tags on accordian
    ns.playCurrentVideoTags = function (tagtime, videoID, desc) {
        if (!(ViTag.CurrentSrc()._id === videoID)) {
            ViTagUI.play(videoID);
        }
        // Triggers on src change to set seekbar and totalduration before playAt  setTimeout is used
        setTimeout(function () {
            ViTagUI.playAt(tagtime, desc);
        }, 1000);

    }

    /// <summary>
    /// Below method is called only when tag is played
    /// plays only the content of the video
    /// </summary>
    /// <param name="tagtime">time at which video has to play</param>
    /// <param name="desc">description of the tag</param>
    ns.playAt = function (tagtime, desc) {

        clearInterval(timeInterval);
        var nexttagtime = $.grep(ViTag.CurrentTags(), function (e) { return e.t > tagtime; })[0];
        timeInterval = setInterval(function () {
            if (nexttagtime !== undefined && parseInt(ViTag.getCurrentTime()) === nexttagtime.t) {
                ViTag.pause();
                clearInterval(timeInterval);
                $("#imgPlay").removeClass("imgPause").addClass("imgPlay");
            }
        }, 1000);
        $('#videotitle').text(unescape(ViTag.CurrentSrc().title));
        $('#videoTagTilte').text(": " + unescape(desc));
        ViTag.playAt(tagtime);
    };

    /// <summary>
    /// Plays the full  video for the entire duration
    /// This method is invoked when user clicks on play icon
    /// </summary>
    /// <param name="ID">unique id of the video to be played</param>
    // Play directly from icon 
    ns.play = function (ID) {
        ns.hideActions();
        //Ideally if container is taken we need not show/hide controls   
        ViTag.play(ID);
        $('#videotitle').text(unescape(ViTag.CurrentSrc().title));
        $('#videoTagTilte').text('');
        return false;
    };

    //To get the videoRepository and snapshotrepository path from the webconfig file.
    ns.getAppSettingsValues = function () {
        var URLvalues =
            {
                videoRepositoryURL: "videoRepositoryURL",
                snapshotRepositoryURL: "snapshotRepositoryURL",
                displayCarousel: "displayCarousel",
                postingVidTmInterval:"postingVidTmInterval"
            };
            
        $.ajax({
            url: ViTag.config.wsConfigLoadurl,
            async: false,
            type: "POST",
            headers: {'X-Authorization': sessionStorage.getItem('authT')},
            contentType: "application/json",
            data: JSON.stringify(URLvalues),
            success: function (data) {
                var appSettings = JSON.parse(data);
                ns.videoRepoPath = appSettings["videoRepositoryURL"];   //set video repository path into global variable.
                ns.snapRepoPath = appSettings["snapshotRepositoryURL"]; //set snapshot repository path into global variable.
                ns.displayCarousel = appSettings["displayCarousel"];   //set displayCarousel value to global variable
                ns.postingVidTmInterval = appSettings["postingVidTmInterval"]; 
            },
            error: function () {
                ViTagUI.initMsg("msg.AppSettings", "Info", "GetData.load");
            }
        });
    };

    /* While uploading Snapshot of the image is captured.
  If there is a problem while fetching snapshot then default image is placed instead of snapshot.
  Image is encoded to base64 format as image is not access at parent directory */
    ns.onImgError = function (o) {
        o.src = ViTagUI.snapRepoPath + defaultImage;     //defaultImage variable is the default image in the video repository (SnapshotRepo)
    };

    // set the current Time of the video to zero and then pause the video to diable the edit panal
    // close the player when back button is clicked
    ns.hidePlayer = function () {
        ViTagUI.showHideContainer();
             if (ViTag.isFullScreenON === true) {
            ViTag.raiseFullScreen(ViTag.isFullScreenON);
        }
        ViTag.stop();
        $('#accordionActions').hide();
    };

    //To Display the timeline video in gallaery page.
    ns.getTimelineVideo = function (vidSrc) {
        $.each(vidSrc, function () {
            if (this.sourcetype === ViTag.sourceTypeEnum.timeline) {
                var snapShot = setSnapPath(this.src[0].data.sourcetype, ViTag.sourceTypeEnum.youtube, this.snap);
                ViTagUI.getCommonCategory(snapShot, unescape(this.title), ViTag.getTimeFormat(this.videototalduration), true, this.sourcetype, this._id);
            }
        });
    };

    ns.getCommonView = function (vidSrcList, isStaging, ishome, category) {
        if (vidSrcList.length > 0) {
            var $vl = $(vidMenuContainer);
            var markup = "";
            $.each(vidSrcList, function (j) {
                var specSnap = ViTagUI.getSnapShotPath(this.sourcetype, this.snap, vidSrcList[j]);
                var videoEle = { title: this.title, duration: this.videototalduration, snap: specSnap, isStaging: isStaging, ishome: ishome, id: this._id, desc: this.desc, userid: this.userid, ownername: this.ownername, modifiedDate: this.modifieddate };
                markup = ViTagUI.getCommonMarkUp(videoEle, this.sourcetype, category, j);
                $vl.append(markup);
                ViTag.localize($vl);
                $("#videoTtl" + j).attr("title", unescape(videoEle.title));
                $("time.timeago").timeago();
            });
        }
        else {
            if (ishome) return;
            $(vidMenuContainer).html("");
            $(vidMenuContainer).html(ViTag.getLocalizeValue("msg.checkVideos"));
        }
    };

    ns.getCommonMarkUp = function (videodetails, sourcetype, category, vidCount) {

        var html = "";
        html += "<div class='col-xs-6 col-sm-3'>";
        html += "<img src='" + videodetails.snap + "' height='120' class='vi-img'/>";
        html += "<div class='vi-control'>";
        html += "<div class='vi-click' onclick=\"ViTagUI.playVideo('" + videodetails.id + "')\" ></div>";
        if (category === true || videodetails.ishome === true) {
            html += " <div class='grad1'></div>";
        }
        else {
            html += " <div class='grad'>";
            html += ViTagUI.getCheckboxHtml(videodetails);
            html += "<div style='float:right;'>";
            if (videodetails.ishome === false)
                html += " <a href='#' class='icn-integration' data-i18n='[title]snippet.integration' data-toggle='modal' data-target='#visapIntmodal' onclick=\"ViTagUI.setVideoID('" + videodetails.id + "')\"></a>";
            if (videodetails.userid === ns.ownerid && videodetails.ishome === false) {
                html += ViTagUI.getEditHtml(videodetails);
                html += " <a href='#' class='icn-delete' data-i18n='[title]snippet.delete' onclick=\"ViTag.deleteVideo('" + videodetails.id + "')\"></a>";
                html += " <a href='#' class='icn-assign' data-i18n='[title]assign.assign' data-toggle='modal' data-target='#assignModal' onclick=\"ViTagUI.assignVideo('" + videodetails.id + "','" + videodetails.title + "','" + videodetails.isStaging + "')\"></a>";
            }
            if (sourcetype === ViTag.sourceTypeEnum.timeline && videodetails.userid === ns.ownerid) {
                html += " <a href='#' class='icn-edit'  data-i18n='[title]snippet.edit' onclick=\"ViTagUI.editTimeline('" + videodetails.id + "')\"></a>";
            }
            html += "</div></div>";
        }
        return ViTagUI.getHtml(videodetails, sourcetype, html, vidCount);
    };
    //To get the checkbox icon
    ns.getCheckboxHtml = function (videodetails) {

        if (videodetails.isStaging) {
            return "<div class='vi-checkbox'> <input value='" + videodetails.id + "' name='chklist' type='checkbox' value='' onclick=\"ViTagUI.selectCheckBox()\"  /></div><div style='float:right;'><a href='#' class='icn-publish' data-i18n='[title]subMenu.copyToMyspace' onclick=\"ViTag.publish('" + videodetails.id + "')\"></a></div>";
        }
        return "";
    };

    //To get the edit icon
    ns.getEditHtml = function (videodetails) {

        if (videodetails.isStaging) {
            return "<a href='#' class='icn-edit' title='Edit' onclick=\"ViTagUI.EditTittleDesc('" + videodetails.title + "','" + videodetails.desc + "','" + videodetails.id + "')\"></a>"
        }
        return "";
    };

    ns.getHtml = function (videodetails, sourcetype, html, vidCount) {

        html += "</div>";
        html += " <div class='details'>";
        html += "<div id='" + "videoTtl" + vidCount + "' class='vi-title1 truncate-text text-width'><span>" + ViTag.htmlEncode(unescape(videodetails.title)) + "</span></div>";
        html += " <div class='vi-dura1 clearfix'>";
        html += "<div class='" + ViTagUI.getIcon(sourcetype) + "' onclick=\"ViTagUI.playVideo('" + videodetails.id + "')\"></div>";
        html += "<div class='pull-right default-cursor'><span data-i18n=\"playerEdit.duration\"></span>" + ": " + ViTag.getTimeFormat(videodetails.duration) + "</div>";
        html += "</div><div class='vi-dura1 clearfix'>";
        html += "<div class='pull-right default-cursor'><span data-i18n=\"snippet.by\"></span>" + ": " + videodetails.ownername + "</div>";
        html += "<time class='timeago' datetime='" + videodetails.modifiedDate + "'><span data-i18n=\"snippet.updated\"></span>" + ": " + videodetails.modifiedDate + "</time>";
        html += "</div></div></div>";
        return html;
    };
    //To get the timeline and youtube icon
    ns.getIcon = function (Type) {

        switch (Type) {
            case ViTag.sourceTypeEnum.youtube: return "pull-left ind-yt";
            case ViTag.sourceTypeEnum.timeline: return "pull-left ind-tl";
            default: break;
        }
    };
    ns.htmlEncode = function (value) {
        return $('<div/>').text(value).html();
    };
    ns.setVideoID = function (videoid) {
        $("#videoId").val(videoid);
    };

    ns.getSnapShotPath = function (srcType, snap, videoData) {
        switch (srcType) {
            case ViTag.sourceTypeEnum.uploaded:
            case ViTag.sourceTypeEnum.directURL: return ViTagUI.snapRepoPath + snap;
            case ViTag.sourceTypeEnum.youtube: return snap;
            case ViTag.sourceTypeEnum.timeline: return setSnapPath(videoData.src[0].data.sourcetype, ViTag.sourceTypeEnum.youtube, snap);
            default: return "";
        }
    };
    /// <summary>
    /// Category Search - Grops video by category and searchs video by title,tag,caption and category
    /// Headers are populated with the tittle of the videos.
    /// </summary>
    /// <param name="opt">search key </param>
    ns.doVidSearch = function (opt) {

        var categorySerachKey, vidSrc = null;
        var txtVal = $('#vidSearch').val();
        if ($.trim(txtVal) === "")
            return;
        if (opt === undefined || opt.obj.value === "") {
            categorySerachKey = txtVal;
        }
        else
            categorySerachKey = opt.obj.value;
        //for & and # we need to encode for serverice to get value else it will have null value
        if (categorySerachKey === "&") {
            categorySerachKey = categorySerachKey.replace("&", "%26");
        }
        if (categorySerachKey === "#") {
            categorySerachKey = categorySerachKey.replace("#", "%23");
        }
        if (categorySerachKey === "+") {
            categorySerachKey = categorySerachKey.replace("+", "%2B");
        }
        //video sources of matched with search key
        var videoSource = ViTagUI.SearchVideo(opt);
        var videosCount = videoSource.length;
        var catSearchKey = $.trim(txtVal.toLowerCase());
        //this method will search category from video source.
        var uniqCategories = internal.SearchCategory(videoSource, catSearchKey);

        ns.getCategoryView(uniqCategories, "search");
        if (uniqCategories.length === 0 && videosCount === 0) {
            $(vidMenuContainer).html("");
            $(vidMenuContainer).html(ViTag.getLocalizeValue("msg.checkVideos"));
        }
         $('li span.cate-active').removeClass('cate-active');
         $("#anycategory").addClass('cate-active'); 
    };
    /// <summary>
    /// Video Search - Searches the video by caption, title ,category.
    /// Headers are populated with the tittle of the videos.
    /// </summary>
    /// <param name="opt">search key </param>
    ns.SearchVideo = function (opt) {
        var txtVal = $('#vidSearch').val();
        if ($.trim(txtVal) === "") {
            ViTagUI.clrSearchTxt();
            return false;
        }
        ns.carouselHideAndShow();
        $(vidMenuContainer).html('');
        var searchKey, vidSrc = null;

        if (opt.obj === undefined || opt.obj.value === "") {
            searchKey = txtVal;
        }
        else
            searchKey = opt.obj.value;
        $.ajax({
            url: ViTag.config.wsVideoSearchurl,
            type: "POST",
            headers: { isStage: ns.isStaging, 'X-Authorization': sessionStorage.getItem('authT'), isGallery: ns.ishome },
            data: { searchKey: searchKey, isGallery: ns.ishome },
            async: false,
            success: function (data) {
                vidSrc = JSON.parse(data);
                var page = (opt.gallery) ? ns.page.gallery : (ns.isStaging) ? ns.page.collaboration : ns.page.myspace;
                //passing event data after searching. as discussed, value of videoID is "search".
                $(document).trigger("VisapLog", [{ action: ViTag.Events.search, actionType: page }, { searchText: searchKey, videoID: "search" }]);
            },
            error: function () {
                ViTagUI.initMsg("msg.errorMsg", "Info", "GetData.load");
            }
        });
        if (opt.gallery !== true && opt.isStaging !== true)
            vidSrc = ViTagUI.getVideoList(vidSrc);
        var videoSource = $.extend(true, [], vidSrc);
        var searchVal = $.trim(txtVal).toLowerCase();
        if (opt.gallery) {
            //Videos which is matched with category is removed to avoid multiple display of videos in gallery page.
            videoSource = internal.removeCatVideos(videoSource, searchVal);
        }
        ns.getCommonView(videoSource, opt.isStaging, opt.ishome);
        return vidSrc;
    };

    ns.getVideoList = function (vidSrc) {
        var vidList = [];
        $(vidSrc).each(function (i) {
            if (sessionStorage.getItem("userid") === vidSrc[i].userid)
                vidList.push(vidSrc[i]); //to get only published video for owner.
        });
        return vidList;
    };

    //To clear text in search box for all html pages and load videoList.
    ns.clrSearchTxt = function () { 
        
        $('#vidSearch').val('');
        if(!ns.isCategory)
        {      
          $('#videoList').text('');
          $(myCarousel).show();
          internal.createVidMenu(ViTag.source); 
        }      
        $("time.timeago").timeago();
    };

    //When user press enter key,This method will search the video's.
    ns.SearchVidOnEnterKey = function (obj) {
        var txtVal = $('#vidSearch').val();
        if ($.trim(txtVal) === "") {
            ViTagUI.clrSearchTxt();
            return false;
        }
        var keycode = (obj.e.keyCode ? obj.e.keyCode : obj.e.which);
        if (keycode === 13) {
            if (obj.gallery !== true)
                ViTagUI.SearchVideo(obj);
            else
                ViTagUI.doVidSearch(obj);
        }
        $("time.timeago").timeago();
    };
    //To hide and show the carousel when user search the video by category,title or tags. 
    ns.carouselHideAndShow = function () {
        var videoSearch = $("#vidSearch").val();
        if (videoSearch !== "")
            $(myCarousel).hide();
        else
            $(myCarousel).show();
    };
    //To dynamically set the data-i18n attribute
    ns.seti18n = function (containerId, key) {
        $(containerId).text("");
        $(containerId).attr('data-i18n', ViTag.getLocalizeValue(key)).i18n();//for localization

    };

})(window.ViTagUI = window.ViTagUI || {});