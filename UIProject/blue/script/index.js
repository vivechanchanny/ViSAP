
(function (ns) {

    ns.getReady = function () {
        var ln = localStorage.getItem('viBlueUser');

        if (ln == null)
            ns.logout();
        else {
            internal.bindEvents();
            internal.getUserDBdetails();
            ns.user = internal.getUserDetails(ln);
            if (!internal.disableEditMode(ns.user))
                return false;

            internal.setVideo(ns.user);
            $("#uName").text(ln);
        }
        internal.attachEvents();
    };

    ns.isStaging = false;

    ns.reload = function () {
        document.location.reload();
    };

    ns.blockUI = function (opt) {
        ns.showPlayer(false);
        $.blockUI(opt.msg);
        $(".blockOverlay").addClass("blockOverlayTemp");
        internal.setNavVisibility(false);
    };

    ns.unblockUI = function () {
        $.unblockUI();
        internal.setNavVisibility(true);
    };


    ns.blockEle = function (opt) {
        $(opt.e).block(opt.msg);
        if (opt.bg)
            $(".blockOverlay").addClass("blockOverlayTemp");
        internal.setNavVisibility(false);
    };

    ns.unblockEle = function (e) {
        $(e).unblock();
        internal.setNavVisibility(true);
    };

    ns.onImgError = function (o) {
        var s = "data:image/png;base64,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";
        o.src = s;
    };

    ns.login = function () {
        internal.getUserDBdetails();
        var $l = $("#txtUsername"), $p = $("#txtPassword"), l = $l.val(), p = $p.val();
        if (l == "") { $("#loginmsg").show().html("Enter username."); }
        else {
            if (p == "") { $("#loginmsg").show().html("Enter password."); }
            else {
                msg = internal.validateUser(l, p);
                if (!msg) {
                    localStorage.setItem('viBlueUser', l);
                    window.location.href = 'index.html';

                }
                else $("#loginmsg").show().html(msg);

            }
        }
    };

    ns.logout = function () {
        $("#txtUsername").val("");
        $("#txtPassword").val("");
        $("#loginmsg").hide();
        localStorage.clear();
        ns.blockUI({
            msg: {
                message: $("#loginform"), css: { top: "90px", width: "0px", height: "0px" }
            }
        });
    };

    ns.showPlayer = function (isShowPlayer) {
        if (isShowPlayer) {
            internal.setNavVisibility(false);
            $("#subcontainer").hide();
            $("#playContainer").show();
            $("#mainViConatainer").css('background', 'transparent');
        }
        else {
            internal.getEditordetails();
        }

    };

    ns.hidePlayer = function () {
        internal.getEditordetails();
        ViTag.cp.ctrl.video.currentTime = 0
        ViTag.cp.ctrl.video.pause();

        if (ViTag.yt.player)
            ViTag.yt.player.pauseVideo();
    };



    ns.play = function (s, y) {
        y = (y == "undefined" || !y) ? false : true;

        //TODO: Player should be paused
        if (y) ViTag.playYT(s);
        else ViTag.play(s);

        setTimeout(function () {
            ns.showPlayer(true);
            internal.setCustomUI();
        }, 500);
    };

    ns.doVidSearch = function (opt) {
        var s = opt.obj.value, vidSrc = null;

        vidSrc = ViTag.source ? $.grep(ViTag.source, function (e) {
            return e.title.toLowerCase().indexOf(s.toLowerCase()) > -1;
        }) : null;

        $(ViTag.source).each(function () {
            var src = this;
            if (!(vidSrc ? $.grep(vidSrc, function (e) { return e.title.indexOf(src.title) > -1; }).length > 0 : null)) {
                if (src.tags ? $.grep(src.tags, function (e) { return e.d.toLowerCase().indexOf(s.toLowerCase()) > -1; }).length > 0 : null)
                    vidSrc.push(src);
            }
        });

        internal.createVidMenu(vidSrc, true);
    };


    var internal = {

        videoArgs: {}, imgIndex: [], users: [],

        // users: [{ "UserID": "1", "l": "Instructor1", "pwd": "Instructor1", "f": "user1.data.js", "e": true, "sf": "staging.js" }, { "UserID": "2", "l": "Instructor2", "pwd": "Instructor2", "f": "user2.data.js", "e": true, "sf": "staging.js" }, { "UserID": "1", "l": "Student1", "pwd": "Student1", "f": "user1.data.js", "e": false }, { "l": "Student2", "pwd": "Student2", "f": "user2.data.js", "e": false}],
        getUserDBdetails: function () {

            $.ajax({
                url: "auth.do",
                async: false,
                type: "GET",
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    internal.users = JSON.parse(eval(data));
                },
                error: function () {
                    alert('Error in loading data');
                }
            });
        },

        getImgIndex: function (d) {
            var l = d.length, c = (l < 4 ? l : 4);

            for (var i = 0; i < c; i++) {
                var num = Math.floor(Math.random() * l);

                if (num > (l - 1) || internal.imgIndex.indexOf(num) != -1) {
                    if (i != 0) i = -1;
                    continue;
                }
                else internal.imgIndex[i] = num;
            }
        },

        attachEvents: function () {
            var entKey = 13;
            $("#txtPassword").keypress(function (e) {
                if (e.which == entKey) ns.login();
            });
        },

        bindEvents: function () {
            $("body").on("closePlayer", function () {
                ns.hidePlayer();

            });
            $("body").on("onFullScreen", function (event, isFullScreenON) {
                internal.setCustomUI(isFullScreenON);
            });
        },

        setNavVisibility: function (isShow) {
            return ((isShow) ? $("nav").show() : $("nav").hide());
        },

        validateUser: function (l, p) {
            var u = $.grep(internal.users, function (u) {
                return u.username.toLowerCase() == l.toLowerCase();
            })[0], p = (u ? u.pwd == p : false), msg = false;

            if (!u) msg = "Username is incorrect!";
            else if (!p) msg = "Password is incorrect!";

            return msg;
        },

        disableEditMode: function (u) {
            if (u.role == "Student") {
                if (document.location.href.indexOf("edit") > -1) {
                    document.location.href = document.location.origin + "/visap/blue";
                    return false;
                }
                var $li = $(".mcd-menu li");
                $li.eq(2).remove();
                $li.css({ width: "33.3%" });
            }
            return true;
        },

        getEditordetails: function () {

            internal.setNavVisibility(true);
            if (ViTag.isFullScreenON)
                ViTag.raiseFullScreen(true);

            $("#editContainer").hide();
            $("#subcontainer").show();
            $("#playContainer").hide();
            $("#mainViConatainer").css('background', 'white');
        },

        getUserDetails: function (l) {
            var u = $.grep(internal.users, function (u) { return u.username.toLowerCase() == l.toLowerCase(); })[0];
            return u ? u : false;
        },

        setCustomUI: function ($c, $v) {

            internal.setNavVisibility(false);

            var $c = $("#mainViConatainer"),
            $v = $("#tbl2"), h = $c.height(), w = $c.width(), vh = $v.height(), vw = $v.width();
            //Here id tbl2 is the TD of the player.

            $v.css({ marginLeft: Math.floor((w - vw) > 0 ? ((w - vw) / 2) : 0) + "px" });

            $("#tags").css("width", w);
            $("#myLinks").css("width", w);

        },

        setVideo: function (u) {
            internal.setVideoArgs(u);
            //ViTag.cp.createElement();
            ns.videoArgs = ViTag.init(internal.videoArgs);
            //if (ViTag.cp) ViTag.cp.init(ns.videoArgs);
            internal.initSlider();


           // internal.setVideoArgs(u);
            //ns.videoArgs = ViTag.init(internal.videoArgs);
        },

        setVideoArgs: function (u) {
            internal.videoArgs.autoplay = false;
            internal.videoArgs.path = "http://pegtestdev.excelindia.com/VideoRepo/";
            internal.videoArgs.dataPath = "../data/" + (ns.isStaging ? u.sf : u.f) + "?time=" + $.now() + "";
            internal.videoArgs.savePath = "data/" + (ns.isStaging ? u.sf : u.f);
            internal.videoArgs.UserId = ns.isStaging ? "stage" : u.UserID;
            internal.videoArgs.username = ns.isStaging ? "stage" : u.username;
            internal.videoArgs.menu = internal.createVidMenu;
            internal.videoArgs.tags = internal.CreateCurrentTags;
            internal.videoArgs.links = internal.CreateCurrentLinks;
            internal.videoArgs.player = "vid1",
            internal.videoArgs.mode = ns.isStaging ? true : false;


        },

        initSlider: function () {
            setTimeout(function () {
                $('#da-slider').cslider({
                    autoplay: true,
                    bgincrement: 450,
                    interval: 2000
                });
            }, 1000);
        },

        clearVideoSS: function (s) {
            $("#videoList").children().remove("li");
            if (!s) {
                $("#favVid1").attr("src", "").attr("onclick", "");
                $("#favVid2").attr("src", "").attr("onclick", "");
                $("#da-slider .da-cusorD").remove();
            }
        },

        createVidMenu: function (d, s) {
            var $vl = $("#videoList"), h = "<li class='active'>&nbsp;&nbsp;No video found</li>", stagingEle = "", divW = "";

            internal.clearVideoSS(s);

            if (d && d.length > 0) {
                h = "";
                if (ns.isStaging) {
                    divW = "vidList1";
                    $("#videoListContainer").css("height", "255px");
                    $("#publish").css("display", "inline");
                }

                $.each(d, function (i) {
                    if (ns.isStaging) {
                stagingEle = "<div class='chkBox'><input type='checkbox' value='" + this._id + "' name='chklist'></div>";
                }
                    h += "<li><div><div title='" + this.title + "' class='vidList " + divW + "' onclick=\"ViBlue.play('" + this._id + "','" + this.yt + "')\" >";
                    h += "<img alt='' src='" + this.t + "' class='vidSS-Size' onError=\"javascript:ViBlue.onImgError(this);\"/>";
                    h += "<div class='vidTitle'>" + this.title + "</div></div>" + stagingEle.format([this.src]) + "</div></li>";
                });

                if (!s) {
                    internal.getImgIndex(d);
                    for (var i = 0; i < internal.imgIndex.length; i++) {
                        internal.createSlider(d[internal.imgIndex[i]]);
                        internal.createFavVideos(d[internal.imgIndex[i]]);
                    }
                }
            }
            $vl.prepend(h);
        },

        CreateCurrentTags: function (curSrc, tagstype) {
            if (tagstype)
                tagstype = $("#FStags");
            else
                tagstype = $("#tags");
            if (tagstype.length) {
                tagstype.html('Tags: ');
                $(curSrc.tags).each(function () {
                    tagstype.append("<a onclick=\"ViTag.playAt('" + this.t + "')\">" + this.d + "</a>&nbsp;|&nbsp;");
                });
            }
        },

        CreateCurrentLinks: function (curSrc) {   
                    if (curSrc) {
                        var l = $("#myLinks");
                        if (l.length) {
                            l.html('Further links: ');
                            $(curSrc.links).each(function () {
                                l.append("<a href='" + this.u + "' target='_blank'\">" + this.n + "</a>&nbsp;|&nbsp;");
                            });
                        }
                    }
        },

        createSlider: function (d) {
            var h = "<div class='da-slide da-cusorD'>",
                des = d.des ? d.des : "", $s = $("#da-slider"),
                yt = d.yt ? d.yt : false;

            h += "<h2>" + d.title + "</h2>";
            h += "<p  class='da-cusor' onclick=\"ViBlue.play('" + d._id + "'," + yt + ")\">" + des;
            h += "<br><img src='" + d.t + "' onError=\"javascript:ViBlue.onImgError(this);\" class='vidImg'>" + "</p>";
            h += "</div>";

            $s.append(h);
        },

        createFavVideos: function (d) {
            if ($("#favVid2").attr("src") == "") {
                var $f = $("#favVid1").attr("src") == "" ? $("#favVid1") : $("#favVid2"),
                yt = d.yt ? d.yt : false;

                $f.attr("src", d.t).attr("onclick", "ViBlue.play('" + d._id + "'," + yt + ")");
            }
        }

    };

})(window.ViBlue = window.ViBlue || {});

String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function (item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
