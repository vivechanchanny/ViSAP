/*************************************************************************************
******************** Change the following items to customize *************************/


ViTag.isDebugEnabled = false;
ViTag.isErrorEnabled = false;
ViTag.isInfoEnabled = false;
ViTag.isFatalEnabled = false;

/*loginpage related values start*/
var slide = 1;
var uNametxtBoxId = "#txtUsername",
    pwdtxtBoxId = "#txtPassword",
    wrgMsg = "#loginmsg",
    lblUserName = "#uName";
/*loginpage related values end*/


/*All container and elements id are set here*/
var vidMenuContainer = "#videoList",
    publishBtn = '#publish',
    importVideos = '#importVideos',
    caurouselList = '#itemsList',
    indicators = "#indicators";


//Arguments needs to pass to core libraries
var videoRepoPath = "http://visap.excelindia.com/VideoRepo/";
var snapRepoPath = "http://visap.excelindia.com/SnapshotRepo/";


var PlayerId = "vid1";

//this is the default imagefile name
var defaultImage = "defaultImage.png";

//Main video container and sub container deatils 
//Need to use container ID for playing videos and hiding carousel
var mainViContainer = "#mainViConatainer",
    playContainer = "#playContainer",
    subcontainer = "#subcontainer",
    editContainer = "#editContainer",
    timeLinevidList = [];
/*This method will return the videoMenu item. 
By using this method we can customize the video menu style
Based on staging  or publish respective menu will be displayed*/
function getVidMenu(vidSrcList, isStaging, ishome) {
    var h = "", editIcons = "<ul class='controll'></Ul>";
    if (!isStaging) {
        $(publishBtn).hide();
        $(importVideos).hide();
    }
    $.each(vidSrcList, function (i) {
        h += "<li class='thumb-main'><div class='checkbox'><div>"


        var commonUI = "</div></div> <div class='thumb' onclick=\"ViTagUI.play('" + this._id + "')\" ><table><tr><td><img alt='' width='60' height='60' class='vidSS-Size' src='" + ViTagUI.snapRepoPath + this.snap + "' onError=\"javascript:ViTagUI.onImgError(this);\"/></td>";

        if (this.sourcetype == ViTag.sourceTypeEnum.uploaded)
            h += commonUI;

        else if (this.sourcetype == ViTag.sourceTypeEnum.youtube)
            h += "</div></div> <div class='thumb' onclick=\"ViTagUI.play('" + this._id + "')\" ><img alt='' width='60' height='60' class='vidSS-Size' src='" + this.snap + "' onError=\"javascript:ViTagUI.onImgError(this);\"/><span class='YTimg'></span>";

        else if (this.sourcetype == ViTag.sourceTypeEnum.timeline) {
            var timeLineSnap = setSnapPath(this.src[0].data.sourcetype, ViTag.sourceTypeEnum.youtube, this.snap);
            h += "</div></div> <div class='thumb' onclick=\"ViTagUI.play('" + this._id + "')\" ><img alt='' width='60' height='60' class='vidSS-Size' src='" + timeLineSnap + "' onError=\"javascript:ViTagUI.onImgError(this);\"/><span class='Timelineimg'></span>";
        }

        else if (this.sourcetype == ViTag.sourceTypeEnum.directURL)
            h += commonUI;

        h += "<td><div title='" + unescape(this.title) + "'class='title' onclick=\"ViTagUI.play('" + this._id + "')\">" + unescape(this.title) + "</div>";
        h += "<div class='details'>" + unescape(this.desc) + " </div></td></tr></table>";

        h += "</div></li>";
    });
    return h;
}

//to set the snapshot path for the timeline videos.
function setSnapPath(currsrcType, srcType, snap) {
    var timeLineSnap = "";
    if (currsrcType == srcType) timeLineSnap = snap;  //for the timeline video snapshot should be the first snippet snapshot.
    else timeLineSnap = ViTagUI.snapRepoPath + snap;
    return timeLineSnap;

}


/************************************************/

(function (ns) {
    ns.getReady = function () {
        var userName = localStorage.getItem('AppUser');
        // ViTagUI.getAppSettingsValues();           //to get the videorepo and snapshotrepo path from the webconfig
        //internal.bindEvents();
        ns.user = "YyJi1SaWI+f5cbEgrNfTqcLHCuvdH/xb";//localStorage.getItem('authT'); //internal.getUserDetails(userName);
        //localStorage.setItem('role',ns.user.role);
        internal.bindEvents();
        internal.setVideo(ns.user);
    };




    /* While uploading Snapshot of the image is captured.
    If there is a problem while fetching snapshot then default image is placed instead of snapshot.
    Image is encoded to base64 format as image is not access at parent directory */
    ns.onImgError = function (o) {
        //var s = "~/images/visap1.png";
        o.src = snapRepoPath + defaultImage;     //defaultImage variable is the default image in the video repository (SnapshotRepo)
    };


    // Play video is called when user clicks on video 
    //Conditons are checked here if the video is normal or Youtube and player is called

    ns.play = function (ID) {    //Here based on Id the video will be played  //soucetype may be 0,1,2(0=uploaded,1=youtube,2=timeline)
        ViTag.play(ID);
        $(playContainer).show();        //This will invoke visap.js play method.
    };
    /*Search functionality : Gets user input and display result on menu
    Serach result is based on tags or title of the video */
    ns.doVidSearch = function (opt) {

        var s = opt.obj.value, vidSrc = null;
        var userName = localStorage.getItem('AppUser');

        var loggedUserRole = localStorage.getItem('role');
        //src related to tittle
        $.ajax({
            url: "search.do",
            type: "POST",
            headers: { isStage: ns.isStaging, 'X-Authorization': localStorage.getItem('authT') },
            data: { searchKey: s },
            async: false,
            success: function (data) {
                data = data.replace(/\n/g, "");
                vidSrc = JSON.parse(eval(data));
            },
            error: function () {
                alert('Error in loading data');
            }
        });
        internal.createVidMenu(vidSrc);
    };

    /* When user clicks on close button of the player, video has to close and carousel has to display
    Once Video is closed video time need to reset and it has to pause else video still plays on background  */
    ns.hidePlayer = function () {

        internal.getEditordetails();
        vid1.currentTime = 0
        vid1.pause();
        if (ViTag.yt.player)
            ViTag.yt.player.pauseVideo();
    };



    //Private region starts
    var internal = {
        videoArgs: {}, imgIndex: [], users: [], timle: {}, bunchSq: 0,
        //Core libraries are called here to initaialise all arguments which are passing
        setVideo: function (usersDtails) {
            internal.setVideoArgs(usersDtails);
            ns.videoArgs = ViTag.init(internal.videoArgs);
        },
        //Event is binded  When user clicks on close button of the player to hide the player division and to show caraouselViTagUI.play
        bindEvents: function () {
            $("body").on("closePlayer", function () {
                ViTagUI.hidePlayer();

            });


        },
        //Arguments are passed to core libraries
        setVideoArgs: function (usersDtails) {
            internal.videoArgs.autoplay = false;
            internal.videoArgs.path = videoRepoPath;
            internal.videoArgs.snapRepopath = snapRepoPath;
            internal.videoArgs.UserId = ns.isStaging ? "stage" : usersDtails;  //usersDtails.username;
            internal.videoArgs.menu = internal.createVidMenu;
            internal.videoArgs.player = PlayerId;
            internal.videoArgs.mode = ns.isStaging ? true : false;
            internal.videoArgs.tags = internal.CreateCurrentTags;
            internal.videoArgs.links = internal.CreateCurrentLinks;
            internal.videoArgs.username = ns.isStaging ? "stage" : usersDtails;//usersDtails.username;
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
                        tagTime = this.t;
                        tagstype.append("<span onclick=\"ViTag.playAt('" + tagTime + "')\">" + unescape(this.d) + "</span>");
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
                        linkstype.append("<span><a href='" + this.u + "' target='_blank'\">" + unescape(this.n) + "</a></span>");
                    });
                }
            }
        },
        //Left panel creation and carousel initialisation
        createVidMenu: function (vidSrcList) {//vidSrc contains all the videos(timeline,uploded and youtube.)
            var $vl = $(vidMenuContainer), vidEle = "<li>No video found</li>";
            $(vidMenuContainer).children().remove("li");
            if (vidSrcList && vidSrcList.length > 0) {
                vidEle = getVidMenu(vidSrcList, ns.isStaging, ns.ishome);
            }
            $vl.prepend(vidEle);
        },
        //To hide player when close button of the player is clicked.
        getEditordetails: function () {
            if (ViTag.isFullScreenON)
                ViTag.raiseFullScreen(true);
            $(playContainer).hide();
            $(mainViContainer).css('background', 'white');
        },

    };


})(window.ViTagUI = window.ViTagUI || {});



