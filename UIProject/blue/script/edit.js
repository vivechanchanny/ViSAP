
(function (ns) {

    ns.getEditModeReady = function () {
        var opt = localStorage.getItem('editMode');
        if (opt) {
            opt = jQuery.parseJSON(opt);
            internal.setActiveTab(opt);
        }
        else
            opt = { isStaging: true };

        ns.isStaging = opt.isStaging;
        ns.getReady();

        var EditvideoArgs = internal.setEditArgs();
        ViTag.initEditing(EditvideoArgs);
        ViTag.InitCanvas({});
        internal.Onchangedropdown();
        //internal.getStagingData();
        internal.getUserData();
    };

    ns.uploadVid = function () {
        ViTag.PauseOnClick();
        ns.clearuploadelements();
        ns.blockUI({
            msg: { message: $("#uploadform"), css: { top: "90px", width: "0px", height: "0px"} }
        });
    };

    ns.changeMode = function (opt) {
        if ($(opt.active).hasClass("inactiveTab")) {
            localStorage.setItem('editMode', JSON.stringify(opt));
            ns.reload();
        }
    };

    ns.clearuploadelements = function () {
        $("#fileTitle").val('');
        $("#fileDesc").val('');
        $("#txtYTvideo").val('');
        $("#chkYTvideo").removeAttr('checked');
        $("#lblWrgMsg").show().html("");
    };

    ns.enableFileBrowsee = function (obj) {
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
    };

    ns.upload = function () {
        //internal.video.upload();
        ViTag.upload();
    };


    //to validate the values of textbox in annotation 
    ns.validatenumber = function (el) {

        var theEvent = el || window.event;
        var key = theEvent.keyCode || theEvent.which;

        var regex = /^[0-9]*(?:\.\d{1,2})?$/;  // allow only numbers [0-9] 
        if (!regex.test(el.value)) {
            alert('Please enter valid numbers');
            $("#cmtDuration").val("");
            $("#sketchDuration").val("");
        }

        if (parseInt($("#cmtDuration").val(), 10) > 180) {
            alert("Sorry,Maximum duration is 3 min");
            $("#cmtDuration").val("");
        }
    };

    ns.publishVideo = function () {
        //List of checked items, src
        var srcList = [], $chkList = $("[name = 'chklist']:checked"), staged = null, usrD = null;


        if ($chkList.length > 0) {
            $chkList.each(function (i) {
                //objSrc.src = this.value;
                srcList.push(this.value);
            });

            for (var i = 0; i < srcList.length; i++) {
                var checkedsrc = srcList[i],
                //staged = ViTag.GetSource(checkedsrc);
                staged = internal.getStageMetadata(ViTag.source, checkedsrc);

                //staged.UserID = parseInt(ns.user.UserID);
                usrD = internal.getUserMetadata(internal.userSrc, checkedsrc);

                //Extend to merge in internal.userSrc
                if (internal.userSrc == null) internal.userSrc = [];

                if (usrD == null) internal.userSrc.push(staged);
                else {
                    //$.extend(true, usrD, usrD, staged);
                    internal.video.extendAttrs(usrD, staged);
                }
            }
            //Save User Data

            internal.video.savePublishVideo(JSON.stringify(internal.userSrc), internal.MsgSaving, internal.MsgSaved, internal.MsgError);
            //ns.reload();
        }
        else alert("Please select atleast one video to publish");

    };

    ns.GetActions = function (selvalues) {

        if (selvalues.value == "sketch") {
            $('#sketch').css("display", "block");
            $('#annotate').css("display", "none");
            $('#questions').css("display", "none");
            $("#sketchDuration").removeAttr("readonly");
            ViTag.enableSketch();
            ViTag.ClearEditValues();
        }
        else if (selvalues.value == "annotate") {
            $('#annotate').css("display", "block");
            $('#sketch').css("display", "none");
            $('#questions').css("display", "none");
            $("#cmtDuration").removeAttr("readonly");
            ViTag.disableSketch();
            ViTag.ClearEditValues();
        }
        else if (selvalues.value == "questions") {
            $('#questions').css("display", "block");
            $('#sketch').css("display", "none");
            $('#annotate').css("display", "none");
            ViTag.disableSketch();
            ViTag.ClearEditValues();
        }
        else {
            ns.hideOtherTabs();
        }

    };
    ns.hideOtherTabs = function () {
        $('#drop').val('Choose Actions');
        $('#sketch').css("display", "none");
        $('#annotate').css("display", "none");
        $('#questions').css("display", "none");
        ViTag.disableSketch();
    }

    var internal = {
        stagingSrc: null, userSrc: null, updatevalue: null,

        setActiveTab: function (opt) {
            $(opt.active).removeClass("inactiveTab").addClass("activeTab");
            $(opt.inActive).removeClass("activeTab").addClass("inactiveTab");
        },

        getStagingData: function () {
            $.get("video.do?username=stage", function (data) {
                data = data.replace(/\n/g, "");
                internal.stagingSrc = JSON.parse(eval(data));

            }).fail(function (e) {
                alert('Error in loading data');
            });

        },

        getUserData: function () {
            $.ajax({
                url: "video.do",
                type: "GET",
                headers: { isStage: false, username: ns.user.username },
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    internal.userSrc = JSON.parse(eval(data));
                },
                error: function () {
                    alert('Error in loading data11');
                }
            });
        },

        getStageMetadata: function (dataObj, src) {
            var source = null, obj = null;
            if (dataObj && dataObj != "") source = $.grep(dataObj, function (e) { return e.src == src; })[0];
            $.ajax({
                url: "metadata.do?src=" + src,
                type: "GET",
                async: false,
                headers: { isStage: false, username: "stage" },
                //data: { isStage: mode, username: user },
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    obj = JSON.parse(eval(data));
                    if (obj[0] != undefined) {
                        //                        
                        if (obj[0].actions != undefined)
                            source.actions = obj[0].actions;
                        else
                            source.actions = [];

                        if (obj[0].tags != undefined)
                            source.tags = obj[0].tags;
                        else
                            source.tags = [];

                        if (obj[0].links != undefined)
                            source.links = obj[0].links;
                        else
                            source.links = [];
                    }

                },
                error: function () {
                    alert('Error in loading data');
                }
            });

            return source;
        },

        getUserMetadata: function (dataObj, src) {
            var source = null, obj = null;
            if (dataObj && dataObj != "") source = $.grep(dataObj, function (e) { return e.src == src; })[0];

            $.ajax({
                url: "metadata.do?src=" + src,
                type: "GET",
                async: false,
                headers: { isStage: false, username: ns.user.username },
                //data: { isStage: mode, username: user },
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    obj = JSON.parse(eval(data));
                    //If there is edited work and check for each actions are available
                    if (obj[0] != undefined) {

                        if (obj[0].actions != undefined)
                            source.actions = obj[0].actions;
                        else
                            source.actions = [];

                        if (obj[0].tags != undefined)
                            source.tags = obj[0].tags;
                        else
                            source.tags = [];

                        if (obj[0].links != undefined)
                            source.links = obj[0].links;
                        else
                            source.links = [];
                    }


                },
                error: function () {
                    alert('Error in loading data');
                }
            });

            return source;
        },
        Onchangedropdown: function () {
            $('#editContainer').tabs({
                activate: function (event, ui) {
                    if (ui.newPanel.selector == "#actions") {
                        $('#savedActions').css('display', 'none');
                        $('#allActions').css('display', 'block');
                        $('#sketchDuration').removeAttr("readonly");
                        $('#cmtDuration').removeAttr("readonly");
                        $('#cmtDuration').val('');
                        $('#sketchDuration').val('');
                        //removeAttr("readonly"); 
                    }
                    else {
                        $('#savedActions').css('display', 'none');
                        $('#allActions').css('display', 'none');

                        //                        me.ctrl.$dropdownSelect.val('Choose Actions');
                        //                        me.ctrl.$dropdownSketch.css("display", "none");
                        //                        me.ctrl.$dropdownAnnotate.css("display", "none");
                        //                        me.ctrl.$dropdownQuestion.css("display", "none");
                    }
                }
            });
            //            me.ctrl.$savedActions.css('display', 'none');
            //            me.ctrl.$allActions.css('display', 'none');
        },

        getSource: function (dataObj, src) {
            var source = null;
            if (dataObj && dataObj != "") source = $.grep(dataObj, function (e) { return e.src == src; })[0];
            return source;
        },

        MsgSaving: function () {
            internal.ShowMessage("Publishing...");
        },

        MsgSaved: function () {
            internal.ShowMessage("Published successfully", true);

        },

        MsgError: function (msg) {
            if (!msg)
                msg = "There was an error saving data";

            internal.ShowMessage("<span class='redmsg'>Publish Failed:</span>" + msg, true);
        },

        ShowMessage: function (msg, hide) {
            ns.blockEle({ e: "#divVideoList", msg: { message: "<lable class='whitemsg'>" + msg + "</lable>", css: { borderRadius: "11px", border: " 0px solid rgb(97, 163, 193)", margin: "-170px -8px", backgroundColor: "rgb(0, 69, 51)", width: "280px"} }, bg: false });
            if (hide) setTimeout(function () { $("#divVideoList").unblock(); }, 3000);
        },
        setEditArgs: function () {
            EditvideoArgs = ns.videoArgs;
            EditvideoArgs.args.tagList = internal.PrintTagsToEdit;
            EditvideoArgs.args.LinkList = internal.PrintLinksToEdit;
            return EditvideoArgs;

        },

        PrintTagsToEdit: function () {
            var tl = $("#tagList");
            tl.html('');
            ViTag.IterateCurrentTags(function (tag) {
                var desc = escape(tag.d);
                var click = 'ViTag.EditTags(' + tag.t + ', "' + desc + '")';
                tl.append(tag.d + "&nbsp;<img height='16' src='images/DeleteRed.png' class='lnk'  title='Remove this tag' onclick='javascript:if(ViTag.getConfirmToDel(\"Tag\")) ViTag.RemoveTag(\"" + tag.d + "\"\)'/> &nbsp;<img height='16' src='images/edit-icon.png' class='lnk' onclick='" + click + "' title='Edit this tag' />&nbsp;|&nbsp;");
            })
        },

        PrintLinksToEdit: function () {
            var ll = $('#LinkList');
            ll.html('');
            ViTag.IterateCurrentLinks(function (link) {
                var click = 'ViTag.EditLinks("' + link.n + '", "' + link.u + '")';
                ll.append(link.n + "&nbsp;<img height='16' src='images/DeleteRed.png' class='lnk' onclick='javascript:if(ViTag.getConfirmToDel(\"Link\")) ViTag.RemoveLink(\"" + link.n + "\"\)' title='Remove this link' />&nbsp;<img height='16' src='images/edit-icon.png' class='lnk' onclick='" + click + "' title='Edit this Link' />&nbsp;|&nbsp;");
            })
        },

        video: {
            upload: function () {
                if ($("#fileTitle").val() == '' || $("#fileDesc").val() == '') {
                    $("#lblWrgMsg").css({ "display": "block", "visibility": "visible" }).text("Upload fails, Title and Description field should not be blank.");
                    return false;
                }

                // While uploading youtube video details 
                if ($("#chkYTvideo")[0].checked) {
                    internal.video.uploadYT();
                    return false;
                }

                if ($("#vidFile").val() === '' || $("#vidFile").val().toLowerCase().indexOf("mp4") < 0) {
                    $("#lblWrgMsg").css({ "display": "block", "visibility": "visible" }).text("Upload fails, please select MP4 videos to upload.");
                    return false;
                }

                $("#lblWrgMsg").css({ "visibility": "hidden" });

                var data = new FormData(), file = $("#vidFile")[0].files[0], replaceVid = true;

                if (internal.getSource(internal.stagingSrc, file.name))
                    replaceVid = confirm("Video " + file.name + " is already exits in the repository do you want to replace it ?");

                if (replaceVid) {
                    internal.updatevalue = "insert";
                    data.append(file.name, file);
                    $.ajax({
                        type: "POST",
                        url: "file.do",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function () { internal.video.getVidSS(file.name); },
                        beforeSend: internal.video.loading("Uploading...."),
                        error: internal.video.error
                    });
                }
            },

            uploadYT: function () {
                var ytVideoID = $("#txtYTvideo").val(), replaceVid = true;

                if (ytVideoID.trim() === '') {
                    $("#lblWrgMsg").css({ "visibility": "visible" }).text("Upload fails, Youtube video id not entered.");
                    return false;
                }

                if (internal.getSource(internal.stagingSrc, ytVideoID))
                    replaceVid = confirm("Video ID " + ytVideoID + " is already exits in the repository do you want to replace it ?");

                if (replaceVid) {
                    // Include Youtube details into data file
                    internal.video.success({ title: $("#fileTitle").val(), t: "http://img.youtube.com/vi/" + ytVideoID + "/0.jpg", desc: $("#fileDesc").val(), src: ytVideoID, yt: "true" });
                    //internal.video.closeBrowser();
                    internal.video.loading("Video uploaded successfully....");
                    setTimeout(function () {
                        ns.unblockUI();
                    }, 1500);
                }
            },

            savePublishVideo: function (data, fnPreSend, fnSuccess, fnError) {
                var dataService = "video.do";
                var request = $.ajax({
                    url: "video.do", // + "?file=" + "data/" + ns.user.f,
                    type: "POST",
                    async: false,
                    data: { d: data, username: ns.user.username }, //hard coded
                    success: fnSuccess,
                    error: function (xhr, err) {
                        var title = xhr.responseText.substr(xhr.responseText.indexOf("<title>") + 7, xhr.responseText.indexOf("</title>"));
                        var msg = title.substr(0, title.indexOf("</title>"));
                        fnError(msg);
                    },
                    beforeSend: fnPreSend
                });

                var request = $.ajax({
                    url: "metadata.do", // + "?file=" + "data/" + ns.user.f,
                    type: "POST",
                    async: false,
                    data: { d: data, username: ns.user.username }, //hard coded
                    success: fnSuccess,
                    error: function (xhr, err) {
                        var title = xhr.responseText.substr(xhr.responseText.indexOf("<title>") + 7, xhr.responseText.indexOf("</title>"));
                        var msg = title.substr(0, title.indexOf("</title>"));
                        fnError(msg);
                    },
                    beforeSend: fnPreSend
                });
            },


            getVidoID: function (filename) {
                var id = null;
                //To get the next video ID
                ViTag.source = internal.stagingSrc;
                if (ViTag.source == undefined) {
                    id = 1;
                }
                else {
                    ViTag.source.sort(function (a, b) { return a.ab - b.ab });
                    id = ViTag.source[ViTag.source.length - 1].ab + 1;
                    ViTag.source.forEach(function (srcObj) {
                        if (srcObj.src == filename) {
                            id = srcObj.ab;
                            internal.updatevalue = "update"
                        }
                    });
                }
                return id;
            }
            ,
            extendAttrs: function (usrD, staged) {
                if (staged.tags) {
                    if (!usrD.tags) usrD.tags = [];
                    $.each(staged.tags, function () {
                        var tags = this;
                        $.each(usrD.tags, function (index) {
                            if (tags.t == this.t) {
                                usrD.tags.splice(index, 1);
                                return false;
                            }
                        });
                        usrD.tags.push(tags);
                    });
                    usrD.tags.sort(function (a, b) { return a.t - b.t; });
                }
                if (staged.title) {
                    usrD.title = staged.title;
                }

                if (staged.actions) {

                    for (var i = 0; i < staged.actions.length; i++) {

                        for (var j = 0; j < usrD.actions.length; j++) {

                            if (staged.actions[i].currentTime == usrD.actions[j].currentTime) {
                                usrD.actions.splice(j, 1);

                            }
                        }
                        usrD.actions.push(staged.actions[i]);
                    }
                    usrD.actions.sort(function (a, b) { return a.currentTime - b.currentTime; });

                }


                if (staged.links) {
                    if (!usrD.links) usrD.links = [];
                    $.each(staged.links, function (i) {
                        var links = this;
                        $.each(usrD.links, function (index) {
                            if (links.n == this.n) {
                                usrD.links.splice(index, 1);
                                return false;
                            }
                        });
                        usrD.links.push(links);
                    });
                    usrD.links.sort(function (a, b) { return a.n - b.n; });
                }
            },



            getVidSS: function (f) {
                var opt = internal.video.getCanVid(f);
                setTimeout(function () {
                    var w, h, cxt, vidID;

                    w = opt.vid.videoWidth;
                    h = opt.vid.videoHeight;
                    opt.can.width = w;
                    opt.can.height = h;

                    cxt = opt.can.getContext('2d');
                    cxt.fillRect(0, 0, w, h);
                    cxt.drawImage(opt.vid, 0, 0, w, h);

                    //snapshot = opt.can.toDataURL();
                    internal.video.success({ title: $("#fileTitle").val(), t: "snap shot", desc: $("#fileDesc").val(), src: f });
                }, 1000);

            },

            getCanVid: function (f) {
                var can = document.createElement('canvas'),
                vid = document.createElement('video');
                file = $("#vidFile")[0].files[0];
                var fileURL = URL.createObjectURL(file);
                vid.src = fileURL;
                vid.addEventListener('loadedmetadata', function () {
                    vid.currentTime = 10;
                }, false);

                vid.muted = true;
                vid.autoplay = true;
                vid.crossOrigin = "anonymous";
                //vid.src = "../ViTagRepo/" + f;
                return { can: can, vid: vid };
            },

            customBlockUI: function () {
                $(".blockElement").css({ "background-color": "", "border": "0px", "width": "100%", "height": "100%", "top": "0px", "left": "0px" });
                $(".blockOverlay").css({ "opacity": "0.6", "background-color": "#616161" });
            },

            loading: function (msg) {
                var spacerimage = "data:image/gif;base64,R0lGODlhAgACAIAAAAAAAAAAACH5BAEAAAAALAAAAAACAAIAAAIChFEAOw==";
                ns.blockEle({ e: "#uploadform", msg: { message: "<br/><br/><br/><br/><img src='" + spacerimage + "'class='loading' /><br /><lable class='lblLoading'>" + msg + "</lable>", css: { borderRadius: "11px"} }, bg: false });
                internal.video.customBlockUI();
            },

            success: function (opt) {
                //                if (internal.stagingSrc == undefined)
                //                    internal.stagingSrc = [];

                //                for (var i = 0; i < internal.stagingSrc.length; i++) {
                //                    if (internal.stagingSrc[i].src == opt.src)
                //                        internal.stagingSrc.splice(i, 1);
                //                }

                //                internal.stagingSrc.push(opt);

                $.ajax({
                    url: "video.do",
                    type: "POST",
                    data: { d: JSON.stringify([opt]), key: internal.updatevalue, username: "stage" },
                    success: function () {

                        internal.video.loading("Video uploaded successfully....")
                        setTimeout(function () {
                            internal.video.closeBrowser();
                        }, 2000);

                    },
                    error: internal.video.error
                });
            },

            error: function () {
                alert("There was error in uploading files!");
                internal.video.closeBrowser();
            },

            closeBrowser: function () {
                ns.unblockUI();
                ns.reload();
            }
        }
    };

})(window.ViBlue = window.ViBlue || {});