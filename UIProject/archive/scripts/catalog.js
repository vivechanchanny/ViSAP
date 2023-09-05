var videodata;
var currntbtscr;
$(document).ready(function () {

    var ln = localStorage.getItem('username');
    if (ln == null) logout();

    var u = video.getUserDetails(ln),
    userdatapath = "../data/" + u.f + "?time" + $.now() + "";

    $("body").on("onEleCreated", function () {
        $("#videoMainContainer").append("<div id='navigation'><a href='#' id='navPrev' title='Previous' class='jcarousel-control-prev'>&lsaquo;</a> <a href='#' id='navNext' title='Next' class='jcarousel-control-next'>&rsaquo;</a></div>");
    });

    if (ViTag.cp) ViTag.cp.init(ViTag.init({ menu: LoadThumbnails, dataPath: userdatapath, path: "http://pegtestdev.excelindia.com/VideoRepo/", autoplay: false }));

    $("#username").text("Welcome, " + ln);
    if (u.e === 0) {
        $("#tabCat_Edit").hide();
    }
    else $("#tabCat_Edit").show();

    function myFunction(text) {
        searcher.init();
    }
    $('#vSearchondemo').on({
        keyup: function () { myFunction('keyup') }

    });

    //Search in text box on enter
    $('#vSearchondemo').keypress(function (e) {
        if (e.keyCode == '13') {
            searcher.init();
        }
    });

    //pagination
    $("div.holder").jPages({
        containerID: "content",
        perPage: 3
    });

});


function LoadThumbnails(data) {
    videodata = data;
    var containerpage = "<ul id='content'>";

    var h = "";
    $(data).each(function () {
        h = $("#_tmpl").html();
        h = h.replace("#src#", this.t).replace("#description#", this.title).replace("#vSrc#", this.src).replace("#watchSrc#", this.src).replace("#ttl#", this.title);
        
        if (this.yt == undefined) {
            h = h.replace('#YT#', 'false');
            h = h.replace('#YT#', 'false');
        }
        else {
            h = h.replace('#YT#', 'true');
            h = h.replace('#YT#', 'true');
        }
        $("#contentGrid").append(h);
    });

    if ($("#contentGrid").children().length === 0)
        $("#contentGrid").append("<label class='Novideo'>No Video found<label>");
    
    containerpage += '</u>';
}

function showLightbox(src, yt) {
    currntbtscr = src;
    
    setNextPrev(src);
    $("body").block({ message: $("#playContainer") });
    $(".blockMsg").hide();

    setTimeout(function () {
        if (yt == "true")
            ViTag.playYT(src);
        else ViTag.play(src);
    }, 1000);

    setTimeout(function () {
        $(".blockMsg").center();
        if (yt == "true")
            ViTag.yt.play();
        else
            $(".blockMsg").find('#vid1')[0].play();
    }, 1500);
}

 

$.fn.center = function () {
    var lpanel = $('#tagspanel');
    if (lpanel.length) {
        lpanel.html('<ul>')
        $(ViTag.CurrentTags()).each(function () {
            lpanel.append("<ul><li><a href='#' onclick=\"ViTag.playAt('" + this.t + "')\">" + this.d + "</a></li></ul>");
        });
        lpanel.append('</ul>');
    }
    
    $(".blockMsg").show();
    var vEle = $(".blockMsg").find('#videoMainContainer');
    //vedio element height is setting to the tagspanel
    $("#tagspanel").css("height", vEle.height());
   
    var t = (($(window).height() - (vEle.outerHeight() + 30)) / 2) + "px";
    var l = (($(window).width() - (vEle.outerWidth() + lpanel.outerWidth() + 32)) / 2) + "px";
    $(this).css({ top: t, left: l, width: vEle.outerWidth() + lpanel.outerWidth() + 83, cursor: "default" });

    return this;
}

function setNextPrev(src) {
  
    $("#navPrev").css("opacity", "5").removeClass('defaultcursor');
    $("#navNext").css("opacity", "5").removeClass('defaultcursor');

    var curIndex = getCurrentIndex(src);
    //getLeftPanel();
    if (curIndex > 0) {
        
        $("#navPrev").unbind("click");
        $("#navPrev").click(function (e) {
            var p = videodata[curIndex - 1].src,
                yt = videodata[curIndex - 1].yt;

            setNextPrev(p);
            
            if (yt)
                ViTag.playYT(p);
            else
                ViTag.play(p);

            $(".blockMsg").hide();
            setTimeout(function () {
                $(".blockMsg").center();
            }, 500);
        });
    }
    else {
        $("#navPrev").css("opacity", "0.5");
        $("#navPrev").unbind("click");
        $("#navPrev").addClass('defaultcursor');
    }

    if (curIndex < videodata.length - 1) {
        $("#navNext").unbind("click");
        $("#navNext").click(function (e) {
            var n = videodata[curIndex + 1].src,
                yt = videodata[curIndex + 1].yt;
            setNextPrev(n);

            if (yt)
                ViTag.playYT(n);
            else
                ViTag.play(n);

            $(".blockMsg").hide();
            setTimeout(function () {
                $(".blockMsg").center();
            }, 500);
        });
    } else {
        $("#navNext").css("opacity", "0.5");
        $("#navNext").unbind("click");
        $("#navNext").addClass('defaultcursor');
    }
}


function getCurrentIndex(src) {
    for (var i = 0; i < videodata.length; i++) {
        if (videodata[i].src == src)
            return i;
    }
    return -1;
}

//Search functionality
var searcher = {
    tags: [], tempSRC: [],
    init: function () {
        var search = $("#vSearchondemo");

        var searchval = search.val().toLowerCase();

        if (searchval == 'search by tags:')
            searchval = "";


        if (search.length) {
            searcher.setVideoDetails();
            $('#contentGrid').empty();

            for (var i = 0; i < searcher.tags.length; i++) {
                var tagname = searcher.tags[i].label.toLowerCase();
                var title = searcher.tags[i].title.toLowerCase();
                if (tagname.indexOf(searchval) > -1 || title.indexOf(searchval) > -1) {
                    var crntSRC = searcher.tags[i].src;
                    var isexist = false;

                    for (var j = 0; j < searcher.tempSRC.length; j++) {
                        if (crntSRC == searcher.tempSRC[j])
                            isexist = true;
                    }

                    if (isexist == false) {
                        var h = $("#_tmpl").html();
                        h = h.replace("#src#", searcher.tags[i].thumbnail).replace("#description#", searcher.tags[i].title).replace("#vSrc#", searcher.tags[i].src).replace("#watchSrc#", searcher.tags[i].src).replace("#ttl#", searcher.tags[i].title);

                        if (searcher.tags[i].yt == undefined) {
                            h = h.replace('#YT#', 'false');
                            h = h.replace('#YT#', 'false');
                        }
                        else {
                            h = h.replace('#YT#', 'true');
                            h = h.replace('#YT#', 'true');
                        }

                        $("#contentGrid").append(h);
                        searcher.tempSRC.push(searcher.tags[i].src);
                    }
                }
            }

            searcher.tempSRC = []
        }
        if ($("#contentGrid").children().length === 0)
            $("#contentGrid").append("<label class='Novideo'>No Video found<label>");
    },

    setVideoDetails: function () {
        var o = new Object();
        searcher.tags = [];
        $.each(ViTag.source, function (si, s) {

            if (s && s.tags) {
                $.each(s.tags, function (ti, t) {
                    o = {};
                    o.value = t.d;
                    o.label = t.d;
                    o.time = t.t;
                    o.title = s.title;
                    o.src = s.src;
                    o.yt = s.yt;
                    o.thumbnail = s.t;
                    searcher.tags.push(o);
                });
            }
            if (s.tags) {
                if (s.tags.length === 0) {
                    o = {};
                    o.title = s.title;
                    o.src = s.src;
                    o.thumbnail = s.t;
                    o.yt = s.yt;
                    o.label = "null";
                    searcher.tags.push(o);
                }
            }

            if (s) {
                o = {};
                o.title = s.title;
                o.src = s.src;
                o.thumbnail = s.t;
                o.yt = s.yt;
                o.label = "null";
                searcher.tags.push(o);
            }
        });
    }
};

//log out
function logout() {
    localStorage.clear();
    window.location.href = 'login.htm';
}

var catalog = {
    closePlayer: function () {
        $("body").unblock();
        $("#" + video.myVideoArgs.player)[0].pause();
        
        if (ViTag.yt.enabled) {
            ViTag.yt.player.pauseVideo();
            document.location.reload();
        }
        
    }
};

 