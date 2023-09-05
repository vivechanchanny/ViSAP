
var editMode = true, StagingMode = true, PublishMode = false;

$(document).ready(function () {

    $("body").on("onEleCreated", function () {
        $("#videoMainContainer").parent().prepend("<div class='canvascontainer'><canvas id='canvas1'></canvas></div>");
    });

    video.login(localStorage.getItem('username'));

    var user = video.getUserDetails(video.getCookie()),
    datapath = "data/" + user.f;

    $('#vSearchEdit').on({ keyup: searcher.init });

    $("#button_publish").click(function (e) {
        e.preventDefault();
        var userData;
        //List of checked items, src
        var val = [];

        if ($("[name = 'chklist']:checked").length >= 1) {

            $("[name = 'chklist']:checked").each(function () {
                val.push($(this).val());
            });

            $.get(datapath, function (data) {

                data = data.replace(/\n/g, "");
                userData = eval(data);

                for (var i = 0; i < val.length; i++) {
                    var checkedsrc = val[i];
                    var staged = ViTag.GetSource(checkedsrc);
                    var usrD = GetSrc(userData, checkedsrc);

                    //if not found userData.append(obj)
                    //Extend to merge in userData
                    if (typeof userData == "undefined") userData = [];
                    if (usrD == null) userData.push(staged);
                    else {
                        //$.extend(true, usrD, usrD, staged);
                        internal.extendAttrs(usrD, staged);
                    }
                }
                //Save User Data
                savedata(JSON.stringify(userData), internal.MsgSaving, internal.MsgSaved, internal.MsgError);
            });

            //search the object from userData
            function GetSrc(data, src) {
                var source = null;
                if (data) source = $.grep(data, function (e) { return e.src == src; })[0];
                return source;
            }

            function savedata(data, fnPreSend, fnSuccess, fnError) {
                var dataService = "data.do";
                var request = $.ajax({
                    url: dataService + "?file=" + datapath,
                    type: "POST",
                    data: { d: data },
                    success: fnSuccess,
                    error: function (xhr, err) {
                        var title = xhr.responseText.substr(xhr.responseText.indexOf("<title>") + 7, xhr.responseText.indexOf("</title>"));
                        var msg = title.substr(0, title.indexOf("</title>"));
                        fnError(msg);
                    },
                    beforeSend: fnPreSend
                });
            }
        }
        else alert("Please select atleast one video to publish");
    });

    //Left panel Action
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content

    //On Click Tabs
    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content

        var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
        var user = video.getUserDetails(video.getCookie());

        if (activeTab == '#Staging') {
            $('#button_publish').css("display", "block");
            $('#vSearchEdit').val("");
            StagingMode = true;
            PublishMode = false;
            video.getReady(user);
        }
        else {
            $('#button_publish').css("display", "none");
            $('#vSearchEdit').val("");
            PublishMode = true;
            StagingMode = false;
            video.getReady(user);
        }
        $(activeTab).fadeIn(); //Fade in the active content
        return false;
    });    

});

var internal = {

    MsgSaving: function () {
        internal.ShowMessage("Publishing...");
    },

    MsgSaved: function () {
        internal.ShowMessage("Published successfully", true);

    },

    MsgError: function (msg) {
        if (msg) {
            internal.ShowMessage(msg);
        }
        else {
            internal.ShowMessage("There was an error saving data");
        }
    },

    ShowMessage: function (msg, hide) {
        $("#divVideoList").block({ message: msg, css: { border: 0, color: "#ffffff", fontWight: "bold", backgroundColor: "#000000", width: "150px", fontSize: "14px" } });
        if (hide) setTimeout(function () { $("#divVideoList").unblock(); }, 250);
    },

    validateURL: function (textval) {
        //return new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)", "i").test(textval);
        return true;
    },

    validateString: function (val) {
        return new RegExp("^$").test(val.trim());
    },

    extendAttrs: function (usrD, staged) {
        if (staged.tags) {
            if (!usrD.tags) usrD.tags = [];
            $.each(staged.tags, function () {
                var tags = this;
                $.each(usrD.tags, function (index) {
                    if (tags.t == this.t){
                        usrD.tags.splice(index, 1);
                        return false;
                    }
                });
                usrD.tags.push(tags);
            });
            usrD.tags.sort(function (a, b) { return a.t - b.t; });
        }

        if (staged.ol) {
            if (!usrD.ol) usrD.ol = [];
            $.each(staged.ol, function () {
                var ol = this;
                $.each(usrD.ol, function (index) {
                    if (ol.t == this.t){
                        usrD.ol.splice(index, 1);
                        return false;
                    }
                });
                usrD.ol.push(ol);
            });
            usrD.ol.sort(function (a, b) { return a.t - b.t; });
        }

        if (staged.ans) {
            if (!usrD.ans) usrD.ans = [];
            $.each(staged.ans, function (i) {
                var ans = this;
                $.each(usrD.ans, function (index) {
                    if (ans.t == this.t){
                        usrD.ans.splice(index, 1);
                        return false;
                    }
                });
                usrD.ans.push(ans);
            });
            usrD.ans.sort(function (a, b) { return a.t - b.t; });
        }

        if (staged.quests) {
            if (!usrD.quests) usrD.quests = [];
            $.each(staged.quests, function (i) {
                var quests = this, newQues = true, id = 1;
                $.each(usrD.quests, function (index) {
                    if (quests.st == this.st) {
                        usrD.quests.splice(index, 1);
                        newQues = false;                        
                        //return false;
                    }
                    id = (id > this.id ? id : this.id);
                });
                if (newQues)
                    quests.id = id + 1;
                usrD.quests.push(quests);
            });
            usrD.quests.sort(function (a, b) { return a.st - b.st; });
        }

        if (staged.links) {
            if (!usrD.links) usrD.links = [];
            $.each(staged.links, function (i) {
                var links = this;
                $.each(usrD.links, function (index) {
                    if (links.n == this.n){
                        usrD.links.splice(index, 1);
                        return false;
                    }
                });
                usrD.links.push(links);
            });
            usrD.links.sort(function (a, b) { return a.n - b.n; });
        }
    }

}

var searcher = {
    tags: [], tempSRC: [],

    init: function () {
        var search = $("#vSearchEdit");
        var divContainer = $("#divContainer");
        var searchval = search.val().toLowerCase();
        divContainer.html('');
        if (search && search.length) {
            searcher.setVideoDetails();

            for (var i = 0; i < searcher.tags.length; i++) {
                var tagname = searcher.tags[i].label.toLowerCase();
                var title = searcher.tags[i].title.toLowerCase();
                if (tagname.indexOf(searchval) > -1 || title.indexOf(searchval) > -1) {
                    var crntSRC = searcher.tags[i].src;
                    var isexist = false;
                    var index = 0
                    for (var j = 0; j < searcher.tempSRC.length; j++) {
                        if (crntSRC == searcher.tempSRC[j])
                            isexist = true;
                    }

                    if (isexist == false) {
                        var src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAYCAYAAAABHCipAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3Mzg2REIwOUFFMDExRTNBRTQ1OTA1MDcwQzZFODNGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk3Mzg2REIxOUFFMDExRTNBRTQ1OTA1MDcwQzZFODNGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTczODZEQUU5QUUwMTFFM0FFNDU5MDUwNzBDNkU4M0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTczODZEQUY5QUUwMTFFM0FFNDU5MDUwNzBDNkU4M0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6lb6w+AAALbklEQVR42qxaC1BU1xm+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",
                            vd = searcher.tags[i],
                            panelHTML = "<ul><li><div title='" + vd.title + "' class='textDecNone divVideoList' onclick=\"video.play('" + vd.src + "','" + vd.yt + "')\"><img src='" + vd.t + "' class='vidMeasure' alt='No image' onError=\"javascript:this.onerror=null;this.src='" + src + "';\" />&nbsp;&nbsp;" + vd.title + "</div>";
                        if (StagingMode)
                            panelHTML += "<input type='checkbox' id='chk" + index + "' value='" + vd.src + "' name='chklist'  class='chkstaging'/>";
                        panelHTML += "</li></ul>";
                        divContainer.append(panelHTML);
                        searcher.tempSRC.push(vd.src);
                    }
                }
            }
            searcher.tempSRC = []
        }

        var c = divContainer.children();
        if (c && c.length === 0)
            divContainer.append("<label class='Novideo'>No Video found<label>");
    },

    setVideoDetails: function () {
        var o = new Object();
        searcher.tags = [];
        if (ViTag.source) {
            $.each(ViTag.source, function (si, s) {
                if (s && s.tags) {
                    $.each(s.tags, function (ti, t) {
                        o = {};
                        o.value = t.d;
                        o.label = t.d;
                        o.time = t.t;
                        o.t = s.t;
                        o.title = s.title;
                        o.src = s.src;
                        o.yt = s.yt;
                        searcher.tags.push(o);
                    });
                }
                if (s.tags) {
                    if (s.tags.length === 0) {
                        o = {};
                        o.title = s.title;
                        o.src = s.src;
                        o.t = s.t;
                        o.yt = s.yt;
                        o.label = "null";
                        searcher.tags.push(o);
                    }
                }
                if (s) {
                    o = {};
                    o.title = s.title;
                    o.src = s.src;
                    o.t = s.t;
                    o.yt = s.yt;
                    o.label = "null";
                    searcher.tags.push(o);
                }
            });
        }
    },

    setFocus: function (e) {
        var key = (e.keyCode || e.charCode), keyType = { fSlash: 191, nfSlash: 111, esc: 27 };
        if (key == keyType.fSlash || key == keyType.nfSlash) me.ctrl.$search.focus();
        else if (key == keyType.esc) me.ctrl.$search.blur();
    }

};
//to validate the values of textbox in annotation 
function validatenumber(el) {
    var theEvent = el || window.event;
    var key = theEvent.keyCode || theEvent.which; 

    var regex = /^[0-9]*(?:\.\d{1,2})?$/;    // allow only numbers [0-9] 
    if (!regex.test(el.value)) {
        alert('Please enter valid numbers');
        $("#cmtDuration").val("");
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault(); 
    }

    if (parseInt($("#cmtDuration").val(), 10) > 180) {
        alert("Sorry,Maximum duration is 3 min");
        $("#cmtDuration").val("");
    }
}