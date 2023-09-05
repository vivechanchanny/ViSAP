
var video = {}, currentSource;

video.users = [{ "l": "Instructor1", "f": "user1.data.js", "e": 1 }, { "l": "Instructor2", "f": "user2.data.js", "e": 1 }, { "l": "Student1", "f": "user1.data.js", "e": 0 }, { "l": "Student2", "f": "user2.data.js", "e": 0}];
video.myVideoArgs = {};
video.myVideoArgs.player = "vid1";
video.myVideoArgs.annotations = "annotates";
video.myVideoArgs.links = "myLinks";
video.myVideoArgs.path = "http://pegtestdev.excelindia.com/VideoRepo/";
video.myVideoArgs.autoplay = true;
video.myVideoArgs.manifest = "data/staging.js"; //video.myVideoArgs.path + "manifest.js";

video.myVideoArgs.menu = function (src) {
    currentSource = src;
    var lst = $("#divContainer");
    lst.html("");
    var index = 0
    lst.html('<ul>');
    if (currentSource) {
        $.each(currentSource, function () {
            // ViSAP logo image
            var src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAYCAYAAAABHCipAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3Mzg2REIwOUFFMDExRTNBRTQ1OTA1MDcwQzZFODNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3Mzg2REIxOUFFMDExRTNBRTQ1OTA1MDcwQzZFODNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTczODZEQUU5QUUwMTFFM0FFNDU5MDUwNzBDNkU4M0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTczODZEQUY5QUUwMTFFM0FFNDU5MDUwNzBDNkU4M0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6lb6w+AAALbklEQVR42qxaC1BU1xm+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",
            videoTitle = "<ul><li><div title='" + this.title + "' class='textDecNone divVideoList' onclick=\"video.play('" + this.src + "','" + this.yt + "')\" ><img src='" + this.t + "' class=' vidMeasure' onError=\"javascript:this.onerror=null;this.src='" + src + "';\"/>&nbsp;&nbsp;" + this.title + "</div>";
            if (StagingMode)
                lst.append(videoTitle + "<input type='checkbox' id='chk" + index + "' value='" + this.src + "' name='chklist'  class='chkstaging'> </li></ul>");
            else
                lst.append(videoTitle + "</li></ul>");
        });
        lst.append('</ul>');
    }
    var c = lst.children("ul").children();
    if (c && c.length === 0)
        lst.append("<label class='Novideo'>No Video found<label>");
}

video.play = function (src, yt) {
    if (yt != "undefined")
        ViTag.playYT(src);
    else
        ViTag.play(src);
}

video.getReady = function (u) {

    if (StagingMode) {
        video.myVideoArgs.dataPath = "data/staging.js?time=" + $.now() + "";
        video.myVideoArgs.savePath = "data/staging.js";
        video.myVideoArgs.StagingMode = true;
    }

    else {
        video.myVideoArgs.dataPath = "data/" + u.f + "?time" + $.now() + "";
        video.myVideoArgs.savePath = "data/" + u.f;
        video.myVideoArgs.StagingMode = false;
    }

    // u.e will be zero for students to hide edit tab
    if (u.e === 0) {
        if (editMode) {
            document.location.href = document.location.origin + "/visap/index.htm";
            return true;
        }
        $("#tabEdit").hide();
    }
    else $("#tabEdit").show();

    // To get all files list from repository
    video.file.getVideoList();

    $("body").click(function () {
        video.displayMenu(false);
    });

    $("#" + video.myVideoArgs.player).on("onSourceChange", function (event, curSrc) {
        $("#curSrcTitile").html(curSrc.title);
    });

    $("#videoMenu").click(function (e) {
        // For tablet
        video.displayMenu(true);
        e.preventDefault();
        return false;
    }).mouseover(function (e) {
        video.displayMenu(true);
    });

};

video.file = {
    browser: "browserContainer", fileList: [], selectedVideos: 0,

    showBrowser: function () {
        $("#" + video.myVideoArgs.player)[0].pause();

        var browseFileHTML = "<div class='MainDiv' id='" + video.file.browser + "'><header class='tittlebar'>&nbspVideo Upload</header>";
        browseFileHTML += "<main><div class='wrgMsg' id='lblWrgMsg'>error</div>";
        browseFileHTML += "<fieldset><legend>&nbsp Choose File &nbsp</legend>";
        browseFileHTML += "<label class='labelupload'>Tittle:</label> <input type='text' class='inputvalue1' maxlength='25' id='fileTitle'><label class='mandatory'>*</label></br>";
        browseFileHTML += "<label  class='labelupload'>Description:</label><input type='text'class='inputvalue2' id='fileDesc' maxlength='150'><label class='mandatory'>*</label></br>";
        browseFileHTML += "<label  class='labelupload'>Upload video:</label><input type='file' class='inputvalue3' id='vidFile'><label class='mandatory'>*</label></br>";
        browseFileHTML += "<label class='message'>Support only MP4 files.</label></br>";
        browseFileHTML += "<label class='labelupload'>Upload youtube videos:</label> <input type='checkbox' class='checkbox' id='chkYTvideo' onclick='video.file.enableFileBrowsee(this);'></br>";
        browseFileHTML += " <label  class='labelupload'>Enter Youtube video ID:</label><input type='text' class='youtuid' id='txtYTvideo' maxlength='40' disabled></br></fieldset>";
        browseFileHTML += "<div class='buttonsection'><button class='donebutton' id='btnUpload' onclick='video.file.upload();'>Done</button>  <button class='cancelbutton' id='btnUploadCnl' onclick='video.file.closeBrowser();'>Cancel</button></div></main></div>";

        $.blockUI({ message: browseFileHTML, css: { top: "126px", border: "4px solid gainsboro", borderRadius: "11px"} });
        $(".blockMsg").css("z-index", "2147483642");
        video.customBlockUI();
    },

    enableFileBrowsee: function (obj) {
        if (obj.checked) {
            // Enable youtube video id text box
            $("#vidFile").attr('disabled', 'disabled');
            $("#txtYTvideo").removeAttr('disabled');
            $("#vidFile").val("");
        }
        else {
            // Enable HTML5 file browser element
            $("#vidFile").removeAttr('disabled');
            $("#txtYTvideo").attr('disabled', 'disabled');
            $("#txtYTvideo").val('');
        }
    },

    closeBrowser: function () {
        $.unblockUI();
        location.reload();
    },

    uploadYTvideo: function () {
        var ytVideoID = $("#txtYTvideo").val();
        if (ytVideoID.trim() === '') {
            $("#lblWrgMsg").css({ "visibility": "visible" }).text("Upload fails, Youtube video id not entered.");
            return false;
        }
        if ($("#divContainer").html().toString().indexOf(ytVideoID) > -1) {
            // Checking is video already exists in the data file
            $("#lblWrgMsg").css({ "visibility": "visible" }).text("Video ID" + ytVideoID + " is already exits in the repository.");
            return false;
        }

        // Include Youtube details into data file
        ViTag.AddVideo([{ title: $("#fileTitle").val(), d: $("#fileDesc").val(), f: ytVideoID, yt: "true", t: "http://img.youtube.com/vi/" + ytVideoID + "/0.jpg"}]);
        video.file.loading("Video uploaded successfully....");
        setTimeout(function () {
            video.file.closeBrowser();
        }, 1500);
    },

    upload: function () {
        if ($("#fileTitle").val() == '' || $("#fileDesc").val() == '') {
            $("#lblWrgMsg").css({ "visibility": "visible" }).text("Upload fails, Title and Description field should not be blank.");
            return false;
        }

        // While uploading youtube video details 
        if ($("#chkYTvideo")[0].checked) {
            video.file.uploadYTvideo();
            return false;
        }

        if ($("#vidFile").val() === '' || $("#vidFile").val().toLowerCase().indexOf("mp4") < 0) {
            $("#lblWrgMsg").css({ "visibility": "visible" }).text("Upload fails, please select MP4 videos to upload.");
            return false;
        }

        $("#lblWrgMsg").css({ "visibility": "hidden" });

        var data = new FormData(), file = $("#vidFile")[0].files[0];

        var replace = true;
        if (ViTag.GetSource(file.name))
            replace = confirm("Video " + file.name + " is already exits in the repository do you want to replace it ?");
        if (replace) {
            data.append(file.name, file);
            $.ajax({
                type: "POST",
                url: "file.do",
                contentType: false,
                processData: false,
                data: data,
                success: function () { video.getSnapshot(file.name); },
                beforeSend: video.file.loading("Uploading..."),
                error: video.file.error
            });
        }
    },


    loading: function (msg) {
        $("#" + video.file.browser).block({ message: "<br/><br/><br/><br/><img src='images/spacer.gif' class='loading' /><br /><lable class='lblLoading'>" + msg + "</lable>", css: { borderRadius: "11px"} });
        video.customBlockUI();
    },

    getVideoList: function (viArgs) {
        $.get(video.myVideoArgs.manifest, function (data) {
            data = data.replace(/\n/g, "");
            video.file.fileList = eval(data);
        }).fail(function (e) {
            //alert('Error in loading data');
        });

        video.myVideoArgs.StagingMode = true;

        var args = ViTag.init(video.myVideoArgs);
        if (ViTag.cp) ViTag.cp.init(args);
        // If script called from edit page
        if (editMode) {
            ViTag.initEditing(args);
            ViTag.InitCanvas({});
        }
    },

    success: function (opt) {

        if (video.file.fileList == undefined)
            video.file.fileList = [];
        for (var i = 0; i < video.file.fileList.length; i++) {
            if (video.file.fileList[i].src == opt.src)
                video.file.fileList.splice(i, 1);
        }

        video.file.fileList.push(opt);
        $.ajax({
            //url: "manifest.do",
            url: "data.do?file=" + video.myVideoArgs.manifest,
            type: "POST",
            data: { d: JSON.stringify(video.file.fileList) },
            success: function () {
                // ViTag.AddVideo([opt.src]);
                video.file.loading("Video uploaded successfully....")
                setTimeout(function () {
                    video.file.closeBrowser();
                }, 2000);
            },
            error: video.file.error
        });

    },
    error: function () {
        alert("There was error in uploading files!");
        video.file.closeBrowser();
    },

    showVideos: function () {
        if (video.file.fileList.length != 0)
            video.file.list(video.file.fileList);
    },

    list: function (fileList) {
        // Showing all files name list in popup
        $("#" + video.myVideoArgs.player)[0].pause();

        var html = "<div id='fileList' class='divStyle10'><lable>Select videos below.</lable>";
        fileList.forEach(function (f, i) {
            var disable = "";
            if (ViTag.GetSource(f.f))
                disable = "disabled";

            if (f) html += "<div class='divStyle9'><span for='" + f.title + "'><input onclick='video.file.enableAdd(this);' type='checkbox' id='" + i + "' " + disable + "/>" + f.title + "</span></div>";
        });
        html += "<br /><br /><input type='button' id='btnFileAdd' value='Add' disabled onclick='video.file.addVideos();'/>&nbsp;<input type='button' id='closeVidList' value='Cancel' onclick='javascript:$.unblockUI();' /></div>";

        $.blockUI({ message: html, css: { top: 150} });
    },

    enableAdd: function (chk) {
        if (chk.checked) video.file.selectedVideos++;
        else video.file.selectedVideos--;

        if (video.file.selectedVideos)
            $("#btnFileAdd")[0].disabled = false;
        else $("#btnFileAdd")[0].disabled = true;
    },

    addVideos: function () {
        var fList = [];
        $("#fileList input:checked").each(function () {
            fList.push(video.file.fileList[this.id]);
        });

        ViTag.AddVideo(fList);
        $.unblockUI();
    }

};

video.displayMenu = function (show) {
    if (show) $("#menuContainer").show();
    else $("#menuContainer").hide()
};

video.setHeight = function () {
    $("#annHolder").css({ "height": $("#videoContainer").height() + 16 + "px" });
};

video.fillUserDetails = function (isLogout) {

    if (isLogout) video.deleteCookie("username");

    if (!video.getCookie() || isLogout) {
        // Pause HTML5 video player
        $("#" + video.myVideoArgs.player)[0].pause();
        // Pause youtube player
        if (ViTag.yt.enabled)
            ViTag.yt.player.pauseVideo();

        var html = "<label class='wrnMsg' id='lblWarMsg'>User name is incorrect!</label>";
        html += '<br /><br />';
        html += 'Select user:&nbsp;<input id="users" class="txtStyle" list="dtUserList" class="ipStyle1"/><datalist id="dtUserList"></datalist><br /><br />';
        html += '<input type="button" value="Login" onclick="javascript:video.login();"/>&nbsp<input type="button" value="Cancel" onclick="javascript:$.unblockUI();"/><br /><br />';

        $.blockUI({ message: html, css: { top: 150} });
        video.customBlockUI();

        video.users.forEach(function (user) {
            $("#dtUserList").append("<option value='" + user.l + "'>");
        });
    }
    else {
        video.login(video.getCookie());
    }
};

video.customBlockUI = function () {
    $(".blockElement").css({ "background-color": "#A0A0A0", "border": "0px", "width": "100%", "height": "100%", "top": "0px", "left": "0px" });
    $(".blockOverlay").css({ "opacity": "0.6", "background-color": "#616161" });
};

video.login = function (ln) {
    var l = ln ? ln : $("#users").val();
    if (l == undefined) video.logout();
    
    var u = video.getUserDetails(l);
    if (u) {
        $.unblockUI();
        video.setCookie(l);
        $("#username").text("Welcome, " + l);
        video.getReady(u);
    }
    else {
        if (ln) alert("Invalid User");
        else $("#lblWarMsg").show();
    }
};

video.logout = function () {
    localStorage.clear();
    window.location.href = 'demo/login.htm';
}

video.getUserDetails = function (l) {
    var u = $.grep(video.users, function (u) { return u.l.toLowerCase() == l.toLowerCase(); })[0];
    return u ? u : false;
};

video.setCookie = function (uname) {
    document.cookie = "username=" + uname;
}


video.getSnapshot = function (filename) {

    video.creatensapshot(filename);
   // video.upldSucess();
    setTimeout(function () {
        var w, h, ratio;

        w = vidsnap.videoWidth;
        h = vidsnap.videoHeight;

        var ratio = vidsnap.videoWidth / vidsnap.videoHeight;
        //h = parseInt(w / ratio, 10);

        cansnap.width = w;
        cansnap.height = h;

        var context = cansnap.getContext('2d');
        context.fillRect(0, 0, w, h);
        context.drawImage(vidsnap, 0, 0, w, h);
        var dataUrl = cansnap.toDataURL();
        video.file.success({ title: $("#fileTitle").val(), t: dataUrl, desc: $("#fileDesc").val(), src: filename });
        
    }, 1000);
  
};

video.creatensapshot = function (filename) {
    cansnap = document.createElement('canvas');
    vidsnap = document.createElement('video');
    file = $("#vidFile")[0].files[0];
    var fileURL = URL.createObjectURL(file);
    vidsnap.src = fileURL;

    vidsnap.addEventListener('loadedmetadata', function () {
        vidsnap.currentTime = 10;
    }, false);

    vidsnap.muted = true;
    vidsnap.autoplay = true;
    vidsnap.crossOrigin = "anonymous";
    // vidsnap.src = 'mov_bbb.mp4';
    //vidsnap.src = video.myVideoArgs.path + filename;
    //vidsnap.src = "ViTagRepo/" + filename;
    //vidsnap.src = "vitagRepo/" + filename;
    // alert(vidsnap.src);
}


video.getCookie = function () {
    var c = document.cookie, uname = null;

    // Get all the cookies pairs in an array
    a = c.split(';');

    // Now take key value pair out of this array
    for (var i = 0; i < a.length; i++) {
        name = a[i].split('=')[0];

        if (name.trim() == "username") {
            uname = a[i].split('=')[1];
            break;
        }
    }
    return uname;
}

video.deleteCookie = function () {
    var now = new Date();
    now.setMonth(now.getMonth() - 1);
    document.cookie = "username=" + video.getCookie();
    document.cookie = "expires=" + now.toUTCString() + ";"
}
