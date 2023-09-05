(function (ns) {

    // #region Public
    ns.timeline = {

        init: function (args) {
            if (args) $.extend(me.defaults, args);
            me.video.readControls();
            ns.cp.init();
            me.loadData();
            me.video.listVideos();
            me.video.setVideoEvents();
        },

        // Play video with given source, get from currect source bunch
        play: function (ti) {
            me.video.resetConters();
            me.video.setCurSrc(ti);
            me.video.playTimeLine(me.curSrc.srcBunch[me.bunchSq].dt)
            ns.cp.ctrl.play.className = "imgPause";
            me.video.ctrl.$title.text(ti);
        }
    };

    //#endregion Public

    //#region me
    var me = {

        source: null, curSrc: null, bunchSq: 0, seekTime: 0, interval: null,

        defaults: {
            player: "vid1",
            player2: "vid2",
            curSrcTitile: "curSrcTitile",
            menu: "menu",
            path: "http://pegtestdev.excelindia.com/VideoRepo/"
        },

        // Load initial data and default value to global variables
        loadData: function () {
            me.source = videoSrc;
            ns.timeline.play(me.source[1].title);
        },

        // Get video source based on given video title
        getSource: function (title) {
            return $.grep(videoSrc, function (e) { return e.title.toLowerCase() == title.toLowerCase(); })[0];
        },

        video: {

            ended: false, ctrl: {},

            // Get current playing video source 
            setCurSrc: function (ti) {
                me.curSrc = me.getSource(ti);
                // To Pre-Fetch all videos
                $(me.curSrc.srcBunch).each(function (index) {
                    me.video.ctrl.player2.src = me.defaults.path + this.dt.src;
                });
            },

            resetConters: function () {
                me.bunchSq = 0;
                me.seekTime = 0;
                me.video.ended = false;
                ns.cp.ctrl.seek.value = 0;
                me.video.clearInterval();
            },

            // List all available videos in browse window
            listVideos: function () {
                $(me.source).each(function (e, t) {
                    me.video.ctrl.$menu.append("<li><a href='#' onclick=\"ViTag.timeline.play(\'" + this.title + "\')\">" + this.title + "</a></li>");
                });
                me.video.ctrl.$menu.menu();
            },

            playTimeLine: function (dt) {
                me.video.ctrl.player.src = me.defaults.path + dt.src;
                me.video.ctrl.player.load();
                me.video.ctrl.player.play();
                to = setTimeout(function () { me.video.ctrl.player.currentTime = dt.st; }, 150);
            },

            // Set events handler for all customized controls and video controls 
            setVideoEvents: function () {

                // Custom valume control value changes based on native control
                me.video.ctrl.player.addEventListener('volumechange', function () {
                    if (me.video.ctrl.player.muted)
                        ns.cp.ctrl.valume.value = 0;
                    else
                        ns.cp.ctrl.valume.value = (me.video.ctrl.player.volume * 100);

                }, false);

                // Playing video based on source bunch with given time time duration
                me.video.ctrl.player.addEventListener('timeupdate', function () {
                    var sb = me.curSrc.srcBunch[me.bunchSq];
                    if (sb) {
                        if ((sb.dt.d + sb.dt.st) <= me.video.ctrl.player.currentTime) {
                            me.bunchSq++;
                            var bunchSq = me.curSrc.srcBunch[me.bunchSq];
                            if (bunchSq)
                                me.video.playTimeLine(bunchSq.dt);
                            else {
                                // After reach end source in given video source bunch
                                me.video.ended = true;
                                me.video.ctrl.player.pause();
                                ns.cp.ctrl.play.className = "imgReplay";
                                me.video.clearInterval();
                            }
                        }
                    }
                }, false);

                // Set interval to change the customized seek bar value
                me.video.ctrl.player.addEventListener('play', me.video.setInterval);
            },

            readControls: function () {
                me.video.ctrl.$player = $("#" + me.defaults.player);
                me.video.ctrl.player = me.video.ctrl.$player[0];
                me.video.ctrl.$player2 = $("#" + me.defaults.player2);
                me.video.ctrl.player2 = me.video.ctrl.$player2[0];
                me.video.ctrl.$title = $("#" + me.defaults.curSrcTitile);
                me.video.ctrl.$menu = $("#" + me.defaults.menu);
            },

            // Set interval for customized seek bar value change based on native video control value
            setInterval: function () {
                me.video.clearInterval();
                if (!me.interval)
                    me.interval = setInterval(function () {
                        me.seekTime = me.seekTime + (100 / me.curSrc.td);
                        ns.cp.ctrl.seek.value = Math.floor(me.seekTime);
                    }, 1000);
            },

            // Clear all given time intervals
            clearInterval: function () {
                if (me.interval) {
                    clearInterval(me.interval);
                    me.interval = null;
                }
            }
        }
    };
    //#endregion me

    //#region CustomControls

    ns.cp = {

        ctrl: {},

        init: function (args) {
            //Init player with custom css
            if (args) $.extedns(meCP.Video, args);
            meCP.setControls();
            ns.cp.ctrl.valume.value = (ns.cp.ctrl.video.volume * 100);
        }

    };

    var meCP = {
        video: {
            player: "vid1",
            play: "imgPlay",
            stop: "imgStop",
            seek: "seek-bar",
            mute: "imgMute",
            valume: "valume-bar"
        },

        setControls: function () {
            meCP.readControls();

            ns.cp.ctrl.$play.click(function () {
                if (ns.cp.ctrl.video.paused) {
                    ns.cp.ctrl.play.className = "imgPause";
                    if (!me.video.ended) {
                        ns.cp.ctrl.video.play();
                        me.video.setInterval();
                    }
                    else {
                        me.video.resetConters();
                        me.video.playTimeLine(me.curSrc.srcBunch[me.bunchSq].dt);
                    }
                }
                else {
                    ns.cp.ctrl.play.className = "imgPlay";
                    ns.cp.ctrl.video.pause();
                    me.video.clearInterval();
                }
            });

            // Stop playing
            ns.cp.ctrl.$stop.click(function () {
                var dt = me.curSrc.srcBunch[me.bunchSq].dt;
                ns.cp.ctrl.video.src = me.defaults.path + dt.src;
                to = setTimeout(function () {
                    ns.cp.ctrl.video.pause();
                    ns.cp.ctrl.video.currentTime = dt.st;
                    me.video.resetConters();
                    ns.cp.ctrl.play.className = "imgPlay";
                }, 150);
            });

            // Update the video volume
            ns.cp.ctrl.valume.addEventListener("change", function () {
                ns.cp.ctrl.video.muted = false;
                ns.cp.ctrl.video.volume = (ns.cp.ctrl.valume.value / 100);
                ns.cp.ctrl.mute.className = meCP.getAudioImgClass();
            });

            // Customized value control event handling
            ns.cp.ctrl.mute.addEventListener("click", function () {
                if (ns.cp.ctrl.video.muted) {
                    ns.cp.ctrl.video.muted = false;
                    ns.cp.ctrl.mute.className = meCP.getAudioImgClass();
                }
                else {
                    ns.cp.ctrl.video.muted = true;
                    ns.cp.ctrl.mute.className = "imgMute";
                }
            });
        },

        readControls: function () {
            var ct = meCP.video;
            ns.cp.ctrl.video = $("#" + ct.player)[0];
            ns.cp.ctrl.$play = $("#" + ct.play);
            ns.cp.ctrl.play = ns.cp.ctrl.$play[0];
            ns.cp.ctrl.$stop = $("#" + ct.stop);
            ns.cp.ctrl.seek = $("#" + ct.seek)[0];
            ns.cp.ctrl.$mute = $("#" + ct.mute);
            ns.cp.ctrl.mute = ns.cp.ctrl.$mute[0];
            ns.cp.ctrl.valume = $("#" + ct.valume)[0];
        },

        // Get customized valume control image
        getAudioImgClass: function () {
            var val = ns.cp.ctrl.video.volume * 100, imgClass = null;
            if (val > 70) imgClass = "imgValx";
            else if (val > 10) imgClass = "imgVal";
            else if (val == 0) imgClass = "imgMute";
            else imgClass = "imgValm";
            return imgClass;
        }
    };

    //#ednregion CustomControls

})(window.ViTag = window.ViTag || {});
