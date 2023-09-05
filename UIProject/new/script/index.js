/*************************************************************************************
******************** Change the following items to customize *************************/


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
//var repoPath = "http://visap.excelindia.com/VideoRepo/",
//var snapRepoPath = "http://visap.excelindia.com/SnapshotRepo/",
var PlayerId = "vid1";

//this is the default imagefile name
var defaultImage="defaultImage.png";

//Main video container and sub container deatils 
//Need to use container ID for playing videos and hiding carousel
var mainViContainer = "#mainViConatainer",
    playContainer = "#playContainer",
    subcontainer = "#subcontainer",
    editContainer = "#editContainer",
    timeLinevidList=[]; 
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
        h += "<li class='thumb-main'><div class='checkbox'> <div>"
        if (!ishome) {
            if (this.sourcetype == 2)
                editIcons = "<ul class='controll'><li class='editTimeline' title='Edit' onclick=\"ViTag.editTimeLine('" + this._id + "')\"></li><li class='actions-list-delete' title='Delete' onclick=\"ViTag.deleteVideo('" + this._id + "')\"></li></Ul>";
            else
                editIcons = "<ul class='controll'><li class='actions-list-delete' title='Delete' onclick=\"ViTag.deleteVideo('" + this._id + "')\"></li></Ul>";

        }
        if (isStaging) {
            h += "<input type='checkbox' value='" + this._id + "' name='chklist'>";
            editIcons = "<ul class='controll'><li class='actions-list-edit' title='Edit Video Properties' onclick=\"ViTagUI.EditTittleDesc('" + this.title + "','" + this.desc + "','" + this._id + "')\"></li><li class='publish' title='Publish' onclick=\"ViTag.publish('" + this._id + "')\"></li><li class='actions-list-delete' title='Delete' onclick=\"ViTag.deleteVideo('" + this._id + "')\"></li></Ul>";
        }

        var commonUI = "</div></div> <div class='thumb' onclick=\"ViTagUI.play('" + this._id + "')\" ><img alt='' width='60' height='60' class='vidSS-Size' src='" + ViTagUI.snapRepoPath + this.snap + "' onError=\"javascript:ViTagUI.onImgError(this);\"/>";

        if (this.sourcetype == ViTag.sourceTypeEnum.uploaded)
            h += commonUI+"</div>";

        else if (this.sourcetype == ViTag.sourceTypeEnum.youtube)
            h += "</div></div> <div class='thumb' onclick=\"ViTagUI.play('" + this._id + "')\" ><img alt='' width='60' height='60' class='vidSS-Size' src='" + this.snap + "' onError=\"javascript:ViTagUI.onImgError(this);\"/><span class='YTimg'></span></div>";

        else if(this.sourcetype==ViTag.sourceTypeEnum.timeline){
             var timeLineSnap=setSnapPath(this.src[0].data.sourcetype,ViTag.sourceTypeEnum.youtube,this.snap);
             h += "</div></div> <div class='thumb' onclick=\"ViTagUI.play('" + this._id + "')\" ><img alt='' width='60' height='60' class='vidSS-Size' src='" + timeLineSnap + "' onError=\"javascript:ViTagUI.onImgError(this);\"/><span class='Timelineimg'></span></div>";
        }

        else if (this.sourcetype == ViTag.sourceTypeEnum.directURL)
            h += commonUI + "</div>";

        h += "<div title='" +unescape(this.title) + "'class='title' onclick=\"ViTagUI.play('" + this._id + "')\">" + unescape(this.title) + "</div>";
        h += "<div class='details'>" + unescape(this.desc) + " </div>";
        h += editIcons;
        h += "</li>";
    }); 
    return h;
}

//to set the snapshot path for the timeline videos.
function setSnapPath(currsrcType,srcType,snap){
		var timeLineSnap="";
		 if(currsrcType==srcType)  timeLineSnap=snap;  //for the timeline video snapshot should be the first snippet snapshot.
		 else timeLineSnap=ViTagUI.snapRepoPath + snap;
		return timeLineSnap;

}

/* Carousel initialisation : Neeed to get Coarousel containerID.
Assign active class for first IMG and rest images are inactive
Prepending all elements containerID for movement of the images.*/
function initSlider(source) {
    lst = "", isactive = true, indicatorList = "",snapshot="";
    if (source && source.length > 0) {
        $.each(source, function (i) {
        if (this.sourcetype == ViTag.sourceTypeEnum.uploaded) 
        snapshot = ViTagUI.snapRepoPath + this.snap;  //if sourcetype 0 only then we need get the snapshotrepopath(snapshot)
        else if(this.sourcetype == ViTag.sourceTypeEnum.timeline) 
          snapshot=setSnapPath(this.src[0].data.sourcetype,ViTag.sourceTypeEnum.youtube,this.snap);
        else
        snapshot=this.snap;
            if (isactive) {
                lst += "<div class='item active'><img alt='' src='" + snapshot + "'  onclick=\"ViTagUI.play('" + this._id + "')\"   onError=\"javascript:ViTagUI.onImgError(this);\" /><span class='imgArrow' onclick=\"ViTagUI.play('" + this._id + "','" + this.yt + "')\"   onError=\"javascript:ViTagUI.onImgError(this);\"></span>";
                indicatorList += "<li data-target='#myCarousel' data-slide-to='0' class='active'></li>";
                lst += "<div class='carousel-details'><div><p class='car-title'>" + unescape(this.title) + "</p>" +  unescape(this.desc) + "</div></div></div>";
                isactive = false;
            }
            else {
                if (i < 5) {

                    lst += "<div class='item'  ><img alt='' src='" + snapshot+ "' onclick=\"ViTagUI.play('" + this._id + "')\"  onError=\"javascript:ViTagUI.onImgError(this);\"/><span class='imgArrow' onclick=\"ViTagUI.play('" + this._id + "','" + this.yt + "')\"   onError=\"javascript:ViTagUI.onImgError(this);\"></span>";
                    lst += "<div class='carousel-details'><div><p class='car-title'>" +  unescape(this.title) + "</p>" + unescape(this.desc)+ "</div></div></div>";
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
//Moving from fullscreen to normal screen in firfox.
function firefoxfullScreenEvent() {
    document.addEventListener("mozfullscreenchange", function () {
        ViTag.toggleScreen();
    }, false);

};
 /************************************************/

(function (ns) {
    ns.getReady = function () {
        var userName = localStorage.getItem('AppUser');
        ViTagUI.getAppSettingsValues();           //to get the videorepo and snapshotrepo path from the webconfig
        if (userName == null)
            ns.logout();
        else {
            internal.bindEvents();
              //internal.getUserDBdetails();
            ns.user = localStorage.getItem('authT'); //internal.getUserDetails(userName);
            //localStorage.setItem('role',ns.user.role);
            if (!internal.disableEditMode(localStorage.getItem('role')))
                return false;
            internal.setVideo(ns.user);
            $(lblUserName).text(userName);

        }
        firefoxfullScreenEvent();
        internal.attachEvents();   
        initSlider(ViTag.source);
        
    };

    /*Appliaction needs to be reloaded When user closes close or cancel button.
    To over come from UnblockUI issues window reload needed. */
    ns.ishome=true;
    ns.isStaging = false;
    ns.reload = function () {
        document.location.reload();
    };

    //To show a pop up box for while uploading video 
    //Hide the player and show pop up box here
    ns.showPopup = function (opt) {
        ns.showPlayer(false);
        $.blockUI(opt.msg);
        $(".blockOverlay").addClass("blockOverlayTemp");
    };

    //To remove pop up box global method to access accross the theme
    ns.unblockUI = function () {
        $.unblockUI();
    };

    // While uploading videos if user gets time out exception a loading message is displayed here.
    // Temp pop up  with loading image is shown to user
    ns.blockEle = function (opt) {
        $(opt.e).block(opt.msg);
        if (opt.bg)
            $(".blockOverlay").addClass("blockOverlayTemp");
    };

    //Once Videos uploaded successfully loading messages are removed here
    ns.unblockEle = function (e) {
        $(e).unblock();
    };

    //To get the videoRepository and snapshotrepository path from the webconfig file.
    ns.getAppSettingsValues=function(){
     $.ajax({
                url: "config.do",
                async: false,
                type:"GET",
                headers: { videoRepositoryURL: "videoRepositoryURL",snapshotRepositoryURL: "snapshotRepositoryURL"},
                success: function (data) {
                     data = data.replace(/\n/g, "");
                     var appSettings = JSON.parse(eval(data));           
                     ns.videoRepoPath=appSettings["videoRepositoryURL"];   //set video repository path into global variable.
                     ns.snapRepoPath=appSettings["snapshotRepositoryURL"]; //set snapshot repository path into global variable.
                },
                error: function () {
                    alert('Error in getting AppSettingsValues');
                }
            });
    };

    /* While uploading Snapshot of the image is captured.
    If there is a problem while fetching snapshot then default image is placed instead of snapshot.
    Image is encoded to base64 format as image is not access at parent directory */
    ns.onImgError = function (o) {
          //var s = "~/images/visap1.png";
         o.src = ViTagUI.snapRepoPath + defaultImage;     //defaultImage variable is the default image in the video repository (SnapshotRepo)
    };

    /*Login Validation and entry to index page.*/
    ns.login = function () {
        internal.getUserDBdetails();
       var $l = $(uNametxtBoxId), $p = $(pwdtxtBoxId), l = $l.val(), p = $p.val();     
      // var $l = $(uNametxtBoxId), $p = $(pwdtxtBoxId), l = "Instructor1", p = "Instructor1";    
        if (l == "") { $(wrgMsg).show().html("Enter username."); }
        else {
            if (p == "") { $(wrgMsg).show().html("Enter password."); }
            else {
              msg = internal.validateUser(internal.users);
              if (!msg) {
                  localStorage.setItem('authT',  internal.users);
                    localStorage.setItem('AppUser', l);//retianing this as we are setting only after user validation, so that username is used in local scope.
                    ViTag.debug("index.login:Login  successfull for the user:"+ l);
                    window.location.href = 'index.html';
                }
                else {
                 ViTag.debug("index.login:Login  unsuccessfull for the user:"+ l);
                $l.val(""); $p.val("");
                $(wrgMsg).show().html(msg);
                }
            }
        }
    };

    ns.enterKey=function(evt)
    {
            var key;
            if (window.event)
                key = window.event.keyCode;     //IE
            else
                key = evt.which;     //firefox

        if(key == 13){
            ns.login();
        }
    };

    /* Logout is clicked and to clear all user session and returns user back to login page */
    ns.logout = function () {
        window.location.href = 'login.html';
        localStorage.clear();
    };
       
   
    /* When user clicks on video in menu or carousel videos are started playing.
    At this time carousel needs to hide and player container needs to show. */
    ns.showPlayer = function (isShowPlayer) {
        if (isShowPlayer) {
		    $("#taglinks").show();   
            $(subcontainer).hide();
            $(playContainer).show();
            $(mainViContainer).css('background', 'transparent');
             
        }
        else {
            internal.getEditordetails();
        }
      $("#allActions").html('');//to clear the pause time and specific actions for the pause time when the src changed
      $("#savedActions").html(''); 
    };
   

    /* When user clicks on close button of the player, video has to close and carousel has to display
    Once Video is closed video time need to reset and it has to pause else video still plays on background  */
    ns.hidePlayer = function () {
    $("#divNotes").show();
	$("#taglinks").hide();
        internal.getEditordetails();
        vid1.currentTime = 0
        vid1.pause();
        if (ViTag.yt.player)
            ViTag.yt.player.pauseVideo();
    };

    
    // Play video is called when user clicks on video 
    //Conditons are checked here if the video is normal or Youtube and player is called
  
   ns.play = function (ID) {    //Here based on Id the video will be played  //soucetype may be 0,1,2(0=uploaded,1=youtube,2=timeline)
        $("#divNotes").hide();
        if(!ns.ishome){          //This is to clear the values for all the actions when the user play the video.(These methods are in visap.edit.js so we need to check this condition(ns.ishome))
            ViTag.ClearEditValues();
            ViTag.resetSketches();
            $("#sketchDuration").val("");    //to clear the duration of the sketch explicitly.
        }
        ViTag.play(ID);         //This will invoke visap.js play method.
        setTimeout(function () {
            ns.showPlayer(true);
        }, 500);
          $("#CaptureBtn").removeClass('endCapture').addClass('startCapture');
      
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

    // get the list of category view
     ns.getCategoryThumbnails = function(){
        $("#vid1")[0].src=null;   //to avoid the background video play(audio),for youtube,timline,static and uploaded video.
        $("#playerYT")[0].src=null;
        $('.content').hide();
        $('#categoryView').show();
        $('#editContainer').hide();
        $('#taglinks').hide();
        $('#timelineContainer').hide();
        $('#category').attr('src',"../toc/catagory.html");
        $('#homeTabs').removeClass('link-catalogue-s'); 
        $('#homeTabs').addClass('link-catalogue-n');
       
        $('#editTabs').removeClass('link-edit-s'); 
        $('#editTabs').addClass('link-catalogue-n');

        $('#categoryTabs').removeClass('link-catalogue-n');
        $('#categoryTabs').addClass('link-catalogue-s'); 
     };


   
    //Private region starts
    var internal = {
        videoArgs: {}, imgIndex: [],users: [],timle:{},bunchSq:0,
      // users: [{ "UserID": "1", "l": "Instructor1", "pwd": "Instructor1", "f": "user1.data.js", "e": true, "sf": "staging.js" }, { "UserID": "2", "l": "Instructor2", "pwd": "Instructor2", "f": "user2.data.js", "e": true, "sf": "staging.js" }, { "UserID": "1", "l": "Student1", "pwd": "Student1", "f": "user1.data.js", "e": false }, { "l": "Student2", "pwd": "Student2", "f": "user2.data.js", "e": false}],
        getUserDBdetails: function () {
            $.ajax({
                url: "auth.do",
                async: false,
                headers: { username: $(uNametxtBoxId).val(), password: $(pwdtxtBoxId).val() },
                type: "POST",
 				success: function (data) {
                    data = data.replace(/\n/g, "");
					internal.users = JSON.parse(data).split("~")[0];
					localStorage.setItem('role',JSON.parse(data).split("~")[1]);

                },
                error: function () {
                    alert('Error in loading data');
                }
            });
        },

        attachEvents: function () {
            var entKey = 13;
            $(pwdtxtBoxId).keypress(function (e) {
                if (e.which == entKey) ns.login();
            });
        },
      

        //Event is binded  When user clicks on close button of the player to hide the player division and to show caraouselViTagUI.play
        bindEvents: function () {
            $("body").on("closePlayer", function () {
                  ViTagUI.hidePlayer();

            });
            $("body").on("clearContainer", function () {
                  initSlider(ViTag.source);
            });

            $("body").on("onFullScreen", function (event, isFullScreenON) {
               // internal.setCustomUI(isFullScreenON);
            });
           
            $("body").on("onYTError", function (event) {
                alert("This video is either no longer available, or unplayable for technical reasons ");
                return false;
            });
           
            $("body").on("showLoadingimg", function () {
                   internal.showimgOnloading() //to render the markers on the seekbar.
           });

        },
        
        //Show loading image when user clicks 
        //on menu or on change of video in list 
        //Untill video start playing loading image will appears
        showimgOnloading: function()
        {
             var spacerimage = "data:image/gif;base64,R0lGODlhAgACAIAAAAAAAAAAACH5BAEAAAAALAAAAAACAAIAAAIChFEAOw==";

            $(playContainer).block({ message: "<br/><br/><br/><br/><img src='" + spacerimage + "'class='loading' /><br /><lable class='lblLoading'>Please Wait while this video is loading...</lable>", css: { borderRadius: "11px"} });
            $(".blockOverlay").addClass("blockOverlayTemp");
            $(".blockOverlayTemp").css({ "left": "40px" });
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


        //To validate user name and passowrd while logging in.
        //validateUser: function (loginName, passWord) {
        //    var userDetails = $.grep(internal.users, function (userDetails) {
        //        return userDetails.username.toLowerCase() == loginName.toLowerCase();
        //    })[0], passWord = (userDetails ? userDetails.pwd == passWord : false), msg = false;

        //    if (!userDetails || !passWord) msg = "Username or Password is incorrect!";
        //    //else if (!passWord) msg = "Password is incorrect!";
        //    return msg;
        //},

        validateUser: function (authToken) {
            var msg = false;
            if (authToken == undefined && authToken == "")
            {
                msg = "Username or Password is incorrect!";
            }
            //else if (!passWord) msg = "Password is incorrect!";
            return msg;
        },

        disableEditMode: function (userRole) {
           if (userRole == "Student") {
           $("#editTabs").hide();
		  
//                if (document.location.href.indexOf("edit") > -1) {
//                    document.location.href = document.location.origin + "/visap/brown";
//                    return false;
//                }
//                var $li = $(".mucd-men li");
//                $li.eq(2).remove();
//                $li.css({ width: "33.3%" });
            }
            return true;
        },

        //To hide player when close button of the player is clicked.
        getEditordetails: function () {
            if (ViTag.isFullScreenON)
                ViTag.raiseFullScreen(true);
            $(editContainer).hide();
            $(subcontainer).show();
            $(playContainer).hide();
            $(mainViContainer).css('background', 'white');
        },
        
        //While login user name is compared with existing user id and returns true if exists
        getUserDetails: function (loginName) {
            var userDetails = $.grep(internal.users, function (userDetails) { return userDetails.username.toLowerCase() == loginName.toLowerCase(); })[0];
            return userDetails ? userDetails : false;
        },

        //Full screen of the video height and width are set here.
        setCustomUI: function ($c, $v) {
            var $c = $(mainViConatainer),
            $v = $("#tbl2"), h = $c.height(), w = $c.width(), vh = $v.height(), vw = $v.width();
            //Here id tbl2 is the TD of the player.
            $v.css({ marginLeft: Math.floor((w - vw) > 0 ? ((w - vw) / 2) : 0) + "px" });
            $("#tags").css("width", w);
            $("#myLinks").css("width", w);
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
            internal.videoArgs.UserId = ns.isStaging ? "stage" : usersDtails;  //usersDtails.username;
            internal.videoArgs.menu = internal.createVidMenu;
            internal.videoArgs.player = PlayerId;
            internal.videoArgs.mode = ns.isStaging ? true : false;
            internal.videoArgs.tags = internal.CreateCurrentTags;
            internal.videoArgs.links = internal.CreateCurrentLinks;
            internal.videoArgs.username = ns.isStaging ? "stage" : usersDtails;//usersDtails.username;
        },
         CreateCurrentTags: function (curSrc, tagstype) {
          if(curSrc)
          { if (tagstype)
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
                vidEle = getVidMenu(vidSrcList, ns.isStaging,ns.ishome);
            }
            $vl.prepend(vidEle);
        }
    };


})(window.ViTagUI = window.ViTagUI || {});

 

