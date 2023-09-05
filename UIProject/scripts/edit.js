///This is the intermediate js file to integrate new theme to  visap.edit.js.

//id's related to upload dialogue starts
var upldVidTitle = "#fileTitle";
var upldVidDesc = "#fileDesc";
var ytVidId = "#txtYTvideo";
var chkBoxId = "#chkYTvideo";
var vidSrcName = "#vidFile";
var chkVideoUrl = "#chkVideoUrl";
var VideoUrl = "#VideoUrl";
var upldVidCategory = '#fileCategory';
var dtCategoryList = "#dtCategoryList";
var sketchDurationId = "#sketchDuration";
var whiteBoardWrapper = "#whiteBoardWrapper";
var canvascontainerWB = ".canvascontainerWB"
var wboardContainer = "#wboardContainer";
var hotspotCircle = "#hotspotCircle";
var hotspotDialogueBox = "#hotspotBox";
var title = "#cmtTitle";
var duration = "#cmtDuration";
var desc = "#cmtDesc";
var questEditor = "#aelib";
var currentTab;
var dirCcFile = "#dirCcFile";
var upldVidCc = "#ccFile";
var captionUrl = "#captionUrl";
var chkCaptionUrl = "#chkCaptionUrl"
var chkCaptionFile = "#chkCaptionFile"
//id's related to upload dialogue end

var saveCancel = "#saveCancel";
var timelineid = "#timeline";
var accordionActions = "#accordionActions";
var actionsContainer = "#actionsContainer";
var textcontent = "#textcontent";
var wbdragbar = "#wbdragbar";
var uploadform = "#uploadform";
var lblWrgMsg = "#lblWrgMsg";
var message = "#message";
var timelineMessage = "#timelineMessage";
var divVideoList = "#divVideoList";
var hotspotTittle = "#hotspotTittle";
var hotspotContent = "#hotspotContent";
var linkcontainer = "#linkcontainer";
var annotate = "#annotate";
var sketch = "#sketch";
var questions = "#questions";
var hotspot = "#hotspot";
var whiteboard = "#whiteboard";
var tagcontainer = "#tagcontainer";
var tagTab = "#tagTab";
var sketchTab = "#sketchTab";
var whiteboardTab = "#whiteboardTab";
var questionTab = "#questionTab";
var hotpotTab = "#hotpotTab";
var annotationTab = "#annotationTab";
var linkTab = "#linkTab";
var startcaptureid = "#startcapture";
var myModalLabel = "#myModalLabel";
var fileupload = "#fileupload";
var Import = "#Import";
var Update = "#Update";
var imgOverlay = "#imgOverlay";
var myModal = "#myModal";
var CaptureBtn = "#CaptureBtn";
var tmTitle = "#tmTitle";
var tmDesc = "#tmDesc";
var tagtimediv = "#tagtimediv";
var txtTag = "#txtTag";
var questions_dropdown = "#questions_dropdown";
var showQuizType = "#showQuizType";
var actionHeading = "#actionHeading";
var sketchContainerId = "#sketchContainerId";
var sketcher = "#sketcher";
var sketchcontainerDefault = "#sketchcontainerDefault";
var sketchcontainerWB = "#sketchcontainerWBss";
var tagTitle = "#tagTitle";
var wbtext = "#wbtext";
var whiteboardPauseOnShow = "#whiteboardPauseOnShow";
var headerActionTimeLabel = "#headerActionTimeLabel";
var headerActionTimeTextBox = "#headerActionTimeTextBox";
var btnCanceledit = "#btnCanceledit";
var btnEditheadertime = "#btnEditheadertime";
var brush_size = "#brush_size";
var brushValue = "#brushValue";
var hotspotDuration = "#hotspotDuration";
var whiteboardDuration = "#whiteboardDuration";
var selectchkBox = "#selectchkBox";
var timelineSaveBtn = "#timelineSaveBtn";
var aelibTagList = "#aelibTagList";
var editContainer = "#editContainer";

// id's related to upload file button
var uploadTxt = "#uploadTxt";
var ccFileTxt = "#ccFileTxt";
var dirCcTxt = "#dirCcTxt";
var dirCcFileBtn = "#dirCcFileBtn";
var vidFileBtn = "#vidFileBtn";
var ccFileBtn = "#ccFileBtn";

(function (ns) {

    // Private region starts
    var internal = {

        bindingEvents: function () {
            //enable's action container and display respective action. 
            $("body").on("enableActionContainer", function (event, pauseByAction) {
                $(saveCancel).show();
                var iseditmode = true;
                $(timelineid).hide();
                $(accordionActions).show();//to show list actions.
                var action = sessionStorage.getItem('CurrentAction');
                if (!pauseByAction) {
                    if (action === "whiteboardTab" || action === "annotationTab" && !ViTag.isFullScreenON) {
                        iseditmode = false;
                    }
                    $(actionsContainer).show();
                    ViTag.RenderCurrentWhiteboard(null);//to disappear whitebaord when we pause manually, if whitebaord object exist.
                    ViTagUI.ChangeTabs(action, iseditmode);//to display  respective action container.
                    $(textcontent).hide();
                    $(wbdragbar).show();
                }
                if (pauseByAction) {
                    $(editContainer).hide();
                    internal.hideContainer();
                }
                // if the video is in full screen hide right side container
                if (ViTag.isFullScreenON)
                    $(actionsContainer).hide();
                // if the video is paused by action  then disable editpanel : Todo 
                ViTagUI.editDelIcon(true);//adding icons when it is in pause mode. 
                //To clear question container and set default value.
                ns.clrQuesContainer();
            });
            //disable's action container for new theme
            $("body").on("disableActionContainer", function () {

                var action = sessionStorage.getItem('CurrentAction');
                if (action !== "timeline")
                    $(actionsContainer).hide();
                else if (!ViTag.isFullScreenON) {
                    $(actionsContainer).show();
                }
                ViTagUI.editDelIcon(false);//adding icons when it is in play mode.
                internal.hideContainer();
            });
            //to close upload blockUI when user try to upload invalid direct url video.
            $("body").on("unblock", function () {
                $(uploadform).unblock();
                $(lblWrgMsg).text("");
            });
            $("body").on("vidCapture", function (event, isCapture) {
                ns.modTmLnSaveBtn(isCapture);
            });

        },
        hideContainer: function () {
            $(accordionActions).hide();
            $(saveCancel).hide();
        },
        //setting video edit arguments
        setEditArgs: function () {
            var EditvideoArgs = ns.videoArgs;
            EditvideoArgs.args.tagList = internal.PrintTagsToEdit;
            EditvideoArgs.args.LinkList = internal.PrintLinksToEdit;
            EditvideoArgs.args.allActions = internal.PrintPauseTime;
            EditvideoArgs.args.savedActions = internal.getSpecAction;
            return EditvideoArgs;
        },
     //To split the values based on comma
        split:function( val ) {
          return val.split(",");
        },
       //To get the last entered value
        extractLast:function(term) {
        var val = term.replace(/ /g,'');                      
        return internal.split(val).pop();
       },
        //Binding the category names to category textbox while importing video and edit video.
        loadCategorylist: function () {
            var categorylist = ns.distinctCategories();//Get category list.
            if (categorylist.Categories !== undefined) {
              
               var data = []; //remove empty value in an array.
               data = $.grep(categorylist.Categories, function(n){ return (n); });

                $(upldVidCategory).autocomplete({
                    source: function (request, response) {
                        // delegate back to autocomplete, but extract the last term
                        response($.ui.autocomplete.filter(
                            data, internal.extractLast($.trim(request.term))));
                    },
                   //this func will call when focus is moved to an category
                    focus: function () {
                        // prevent value inserted on focus
                        return false;
                    },
                   //this func will call when an category is selected from the menu
                    select: function (event, ui) {
                        var categories = internal.split(this.value);
                        // remove the current input
                        categories.pop();
                        // add the selected category
                        categories.push(ui.item.value);
                        // add placeholder to get the comma-and-space at the end         
                        this.value = categories.join(",");
                        return false;
                    }
                });
            }
        },

        // Categories  for update 
        updateCategory: function (id) {
            var list = ns.distinctCategoriesbyvideoid(id);
            var categorystring = list.Categories.toString();
            $(upldVidCategory).val(categorystring);
        },

        //clear the text values and set to default text.
        clrFileValues: function () {
            $(uploadTxt).text(ViTag.getLocalizeValue('import.chooseText'));
            $(ccFileTxt).text(ViTag.getLocalizeValue('import.chooseText'));
            $(dirCcTxt).text(ViTag.getLocalizeValue('import.chooseText'));
        },

        //printing the pausedtime with delete option. 
        PrintPauseTime: function (actionsLst, issavePauseTime) {
            if (actionsLst !== undefined && actionsLst.length > 0 && !issavePauseTime) {
                actionsLst.sort(function (a, b) {
                    return a.currentTime - b.currentTime
                });
            }

            $(accordionActions).html('');
            var markup = "";
            var subactionMarkup = "";
            var actionOwnerName = "";

            $(actionsLst).each(function (i) {
                var subaction = actionsLst[i].listAction;
                if (subaction !== undefined && subaction.length > 0) {

                    markup = internal.printActionTime(actionsLst[i].currentTime, i);

                    $(subaction).each(function (j) {
                        subactionMarkup += "<div class='action-divider'>";
                        subactionMarkup += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
                        subactionMarkup += "<tbody><tr>";

                        if (subaction[j].userName !== undefined)
                            actionOwnerName = subaction[j].userName;
                        else actionOwnerName = ViTagUI.userName;
                        subactionMarkup += "<td class='action-name'>" + subaction[j].type + "    |   " + ViTag.getLocalizeValue("common.by") + ":" + actionOwnerName + "</td>";
                        subactionMarkup += "<td class='action-name'></td>";
                        subactionMarkup += "<td class='toc-duration'>" + ViTag.getTimeFormat(subaction[j].data.StartTime) + "</td>";
                        subactionMarkup += "<td class='action-controls'>";
                        subactionMarkup += "<ul class='act-controls-main'>";
                        subactionMarkup += "<li class='edit' data-i18n='[title]common.edit' onclick=\"ViTagUI.EditActions('" + subaction[j].type + "','" + subaction[j].data.StartTime + "','" + actionsLst[i].currentTime + "')\"></li>";
                        subactionMarkup += "<li class='delete' data-i18n='[title]common.delete' onclick='ViTagUI.RemoveAction(\"" + subaction[j].data.StartTime + "\"\,\"" + actionsLst[i].currentTime + "\"\,\"" + subaction[j].type + "\"\)'></li>";
                        subactionMarkup += "</ul>";
                        subactionMarkup += "</td>";
                        subactionMarkup += "</tr>";
                        subactionMarkup += "</tbody></table>"
                        subactionMarkup += "</div>";
                    });

                    markup += subactionMarkup;

                } else {
                    markup = internal.printActionTime(actionsLst[i].currentTime, i);
                }
                markup += "</div></div></div>";
                $(accordionActions).append(markup);
                ViTag.localize($(accordionActions));
                markup = "";
                subactionMarkup = ""
            });
        },

        printActionTime: function (currentTime, index) {
            var markup = "";
            markup += "<div class='panel panel-default'>";
            markup += "<div class='panel-heading' role='tab' id='headingOne'>";
            markup += "<table width='100%' border='0' cellspacing='0' cellpadding='0'>";
            markup += "<tbody><tr><td class='toc-exp-col'><a role='button' data-toggle='collapse' data-parent=" + accordionActions + " " + "href='#action" + index + "'";
            markup += "aria-controls='collapseOne'><img src='images/common/video/arrow-ex-col.png' width='13' height='10' onclick=\"ViTagUI.editPauseTime(ViTag.playAt(" + currentTime + "))\"></a></td>";
            markup += "<td class='toc-vi-name'>" + ViTag.getTimeFormat(currentTime) + "</td>";
            markup += "<td class='toc-duration'>";
            markup += "<span id='headerActionTimeLabel" + index + "'>" + ViTag.getTimeFormat(currentTime) + "</span>"
            markup += "<span ><input type='text' class='actionedittime' maxlength='8'  title='EditPauseTime' id='headerActionTimeTextBox" + index + "' /></span></td>";
            markup += "<td class='action-controls'> <ul class='act-controls-main'> <li class='save' data-i18n='[title]common.save' onclick='javascript:ViTagUI.SaveActionTimeHeader(\"" + currentTime + "\"\,\"" + index + "\"\)'   ></li>";
            markup += "<li class='edit' id='btnEditheadertime" + index + "' data-i18n='[title]common.edit' onclick=\"ViTagUI.editPauseTime('" + ViTag.getTimeFormat(currentTime) + "'," + index + ")\" ></li>";
            markup += "<span data-i18n='[title]common.cancel' id='btnCanceledit" + index + "' onclick=\"ViTagUI.editTimeclose(" + index + ")\"  class='closetext'>X</span>";
            markup += "<li class='delete' data-i18n='[title]common.delete' onclick='ViTagUI.deleteActionList(\"Pause Time\",\"" + currentTime + "\"\)'></li></ul></td></tr></tbody></table></div>";
            markup += "<div id='action" + index + "' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingOne' aria-expanded='false'>";
            markup += " <div class='panel-body toc-pad'>";
            return markup;
        },
        /// to Show only hotspot circle when user selects 
        /// hotspot option from dropdown also sets
        /// if the dialogue box is open while rendering it enforces to close
        showHotspot: function () {
            var hsobj = internal.getHotspotdetails();
            ViTag.RenderCurrentHotspot(hsobj, true);
            $(hotspotCircle).unbind("click");
            $(hotspotDialogueBox).css('display', 'none');
        },

        /// Kind of display hotspot circle position:If the new hotspot need
        /// to be created then its at center of the screen else circle will be posion of the 
        /// already created hotspot
        getHotspotdetails: function () {
            var title = ViTag.htmlEncode($(hotspotTittle).val()), description = ViTag.htmlEncode($(hotspotContent).val());
            var hsobj;
            if (ViTag.editPreviewHS) {
                hsobj = { title: title, description: description, hotspotAttributes: { left: ns.cssAttributeLeftHS, top: ns.cssAttributeTopHS } };
                ViTag.RenderCurrentHotspot(hsobj, true);
                $(hotspotCircle).attr('draggable', 'true');
                return hsobj;
            }
            else {
                // To setEditArgs get exact center of the hotspot circle
                var top = $(videoMainContainer).height() / 2;
                var left = $(videoMainContainer).width() / 2;
                hsobj = { title: title, description: description, hotspotAttributes: { left: left, top: top } };
                return hsobj;
            }
        },

        //to set the textbox content
        setTextValue: function (pauseTmTextId, pauseTmAnchorId) {
            $("#" + pauseTmTextId).val($("#" + pauseTmAnchorId)[0].innerHTML);
            return false;
        },

        hidetabs: function (showtab, removeCssTab) {
            if (showtab !== undefined) {
                $("#linkcontainer,#annotate,#sketch,#questions,#hotspot,#whiteboard,#tagcontainer").not(showtab).hide();
                if (showtab === questEditor) {
                    $(questEditor).show();
                }
                else {
                    $(questEditor).hide();
                    $(showtab).show();
                }
            }
            if (removeCssTab !== undefined) {
                $("#tagTab,#sketchTab, #whiteboardTab, #questionTab, #hotpotTab,#annotationTab, #linkTab").not(removeCssTab).removeClass("active-tag");
                $(removeCssTab).addClass("active-tag");
            }
        },

        displayNone: function (args) {
            $(args).each(function (i) {
                $(args[i]).css("display", "none");
            });
        },

        isValidTimeFormat: function (newvalue, textboxID, labelID) {
            return (newvalue) ? internal.setTextValue(textboxID, labelID) : true;

        },

        createTmVideoList: function (src) {
            var html = "";
            $(src).each(function (i) {
                var specSnap = ViTagUI.getSnapShotPath(this.sourcetype, this.snap, src[i]);
                html += "<div class='vi-list'  >";
                html += "<img src='" + specSnap + "' class='vi-list1' onclick=\"ViTagUI.playVideo('" + this._id + "')\"  onError=\"javascript:ViTagUI.onImgError(this);\"  />";
                html += "<div class='vi-list-control'  onclick=\"ViTagUI.playVideo('" + this._id + "')\"  onError=\"javascript:ViTagUI.onImgError(this);\" >";
                html += "<div class='lft' data-toggle='tooltip' title=" + ViTag.htmlEncode(unescape(src[i].title)) + ">" + ViTag.htmlEncode(unescape(src[i].title)) + "</div>";
                if (this.sourcetype === ViTag.sourceTypeEnum.youtube) {
                    html += "<div class='rt'><a class='youtubeimg'></a></div>";
                }
                if (this.sourcetype === ViTag.sourceTypeEnum.timeline) {
                    html += "<div class='rt'><a class='timelineimg'></a></div>";
                }
                html += "</div></div>";
            });
            return html;
        },
        getTime: function (newtime) {
            var time = {
                hrs: "",
                min: "",
                sec: ""
            };
            (newtime.length === 3) ? (time.hrs = newtime[0], time.min = newtime[1], time.sec = newtime[2]) : (time.hrs = "00", time.min = newtime[0], time.sec = newtime[1]);
            return time;
        },
        callHideClearResetFunc: function (id) {
            if (id !== "sketchTab") {
                ViTag.hideSketches();
                ViTag.ClearEditValues();
                ViTag.resetSketches();
            }
            else {
                ViTag.showSketcher();
                ViTag.ClearEditValues();
                ViTag.resetSketches();
            }
        },

        //Display's native question editor.
        nativeQues: function () {
            if (ViTag.config.questionType === "native") {
                $(questEditor).hide();
                $(saveCancel).show();
                $(questions).show();
                ViTag.editor.rePlaceCkeditor(qTitle);
            }
        },
        //To Select all the checkbox which are inside this Ele
        selectCheckBox: function (Ele) {
            $(Ele).prop('checked', true);
        },
        //To deSelect all the checkbox which are inside this Ele
        deSelectCheckBox: function (Ele) {
            $(Ele).prop('checked', false);
        },

        getActionOnId: function (Id, isEditMode) {
            var id = Id;
            var types = {
                "tagTab": function () {
                    internal.displayNone([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault]);
                    internal.hidetabs(tagcontainer, tagTab);
                    ViTagUI.seti18n(actionHeading, "playerEdit.tag");//for localization
                },
                "sketchTab": function () {
                    internal.hidetabs(sketch, sketchTab, questions);
                    ViTagUI.seti18n(actionHeading, "playerEdit.sketch");//for localization
                    ViTag.sketchDataWhiteboard = null;
                    ViTag.sketchDataDefault = null;
                    $(sketchcontainerDefault).show().html('');
                    $(sketchDurationId).val("");
                    $(sketchContainerId).show();
                    $(sketcher).removeClass('canvasWB');
                    $("#skecthDurationUI,#sketchSaveCancel").css("display", "block");
                    internal.displayNone([whiteBoardWrapper, hotspotCircle, annotates, imgOverlay]);//for localization
                    $('#text').show();
                    $(sketchcontainerWB).html('');
                    ViTag.sketchcontainer = "sketchcontainerDefault";
                    ViTag.sketchInitialise({ container: "sketchcontainerDefault" });
                    internal.callHideClearResetFunc(id);
                    // only when sketch is in edit mode we need to give alert
                    if (!isEditMode)
                        ns.imageExist();
                },
                "annotationTab": function () {
                    ViTag.editAns = false;   //This line is to exit from edit mode of annotation when user clicks on annotation tab.
                    internal.displayNone([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault]);
                    internal.hidetabs(annotate, annotationTab);
                    $(questEditor).hide();
                    ViTagUI.seti18n(actionHeading, "playerEdit.annotation");//for localization
                    // when annotation is in edit mode.  
                    if (!isEditMode) {
                        internal.callHideClearResetFunc(id);
                        ViTag.editor.rePlaceCkeditor(cmtDesc);
                    }
                },
                "questionTab": function () {
                    ns.clrQuesContainer();//to clear question container.
                    internal.displayNone([whiteBoardWrapper, hotspotCircle, annotates, imgOverlay, sketchcontainerDefault]);
                    var ques = (ViTag.config.questionType === "aelib") ? questEditor : questions;
                    internal.hidetabs(ques, questionTab);
                    $(saveCancel).hide();
                    ViTagUI.seti18n(actionHeading, "playerEdit.question");//for localization
                    $(tagTitle).val("");
                    internal.nativeQues();//Display's native question editor.
                    // when question is in edit mode.  
                    if (isEditMode === false && ViTag.config.questionType === "aelib")//Display's aelib question editor.
                    {
                        internal.callHideClearResetFunc(id);
                        ViTag.aelib.initQuizEditor();
                    }
                },
                "hotpotTab": function () {
                    ViTag.editPreviewHS = false; //This line is to exit from edit mode of hotspot when user clicks on hotspot tab.
                    internal.displayNone([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault]);
                    internal.hidetabs(hotspot, hotpotTab);
                    ViTagUI.seti18n(actionHeading, "playerEdit.hotspot");//for localization
                    internal.callHideClearResetFunc(id);
                },
                "whiteboardTab": function () {
                    ViTag.isSketchInitialisedforWB = false; // to initialise the sketcher instance for WB
                    internal.hidetabs(whiteboard, whiteboardTab);
                    ViTagUI.seti18n(actionHeading, "playerEdit.whiteboard");//for localization
                    $("#timeline, #skecthDurationUI,#WbimgOverlay").hide();
                    internal.displayNone([hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault]);
                    $(whiteBoardWrapper).css("display", "block");
                    // when whiteboard is in edit mode.  
                    if (!isEditMode) {
                        internal.callHideClearResetFunc(id);
                        $(wbtext).prop('checked', true);
                        $(whiteboardPauseOnShow).prop('checked', false);
                        $(canvascontainerWB).hide();
                        $("#wbLeftPos").prop('checked', true);
                        ViTag.showTextWB();
                    }
                },
                "linkTab": function () {
                    internal.displayNone([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault]);
                    internal.hidetabs(linkcontainer, linkTab);
                    ViTagUI.seti18n(actionHeading, "playerEdit.link");//for localization
                    internal.callHideClearResetFunc(id);
                },
                "timeline": function () {
                    internal.displayNone([whiteBoardWrapper, hotspotCircle, annotates, questions, imgOverlay, sketchcontainerDefault]);
                    internal.hidetabs(timeline);
                    $(whiteBoardWrapper).css("display", "none");
                    $(actionHeading).text(ViTag.getLocalizeValue('timeLine.timeLine'));
                    $(questEditor).hide();
                    $(saveCancel).hide();
                    internal.callHideClearResetFunc(id);
                }
            };
            types[null] = types["tagTab"];
            types[id] ? types[id]() : 0;
        }
    };

    //This method will invoke when the edit.hmtl is ready.
    //This method will load both staging and user data.
    ns.getEditModeReady = function (mode) {

        ns.ishome = false;
        ns.isStaging = mode.isStaging;
        ns.getReady();
        var EditvideoArgs = internal.setEditArgs();
        ViTag.initEditing(EditvideoArgs);
        ViTag.addMessageHandler(ViTagUI.initMsg);
        ns.iseditmode = false;
        ns.validateDigits("TagTime");
        internal.bindingEvents();
        $('[data-toggle="tooltip"]').tooltip();
        ViTagUI.initAssignVideo();
    };

    //validate text box only for digits excluding : and space.
    ns.validateDigits = function (textBoxID) {
        $("#" + textBoxID).keypress(function (e) {
            //arr which contians only allowed values in text box.
            var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", " "]
            var c = arr.indexOf(e.key);
            if (c < 0) {
                ViTagUI.initMsg("msg.validateDigits", "Info", "ActionList.VaidateDigits");
                return false;
            }
        });
    };

    //This method will invoke when we click on upload(import) tab or button
    //This will block UI and it will popup one dialogue.
    //That dialogue contains the fields to upload video from youtube or from local sytem.
    ns.uploadVid = function () {
        $(myModalLabel).html(ViTag.getLocalizeValue("subMenu.importVideo"));
        $(fileupload).show();
        $(Import).show();
        $(Update).hide();
        var imgoverlay = $(imgOverlay);
        if (imgoverlay.is(':visible')) {
            imgoverlay.hide();
        }
        $('#annotates').hide();
        //while uploading if the video is in play mode means,it should be paused and image should be play image.
        ViTag.pause();
        $("#imgPlay").removeClass("imgPause").addClass("imgPlay");
        ns.clearuploadelements();
        internal.loadCategorylist();
    };

    //The purpose of this method is to create object bcoz in looping we can't send object/array as parameter.
    ns.deleteActionList = function (type, currentTime) {

        var msg = ViTag.getLocalizeValue("confirmationMsg.deleteMsg");
        $.confirm(msg).then(function (istrue) {
            if (istrue) {
                ViTag.RemoveActionList(currentTime);
            }
        });
    };
    ns.chooseFile = function (id) {
        //trigger click event of corresponding file button.
        $("#" + id).trigger('click');
    };

    //get filename with truncating the text with file extension.
    ns.getFileName = function (obj, textId) {
        if (obj.value === "") {
            $('#' + textId).text(ViTag.getLocalizeValue('import.chooseText'));
        }
        else {    //get file name from the path.
            var str = obj.value.replace(/C:\\fakepath\\/i, '');
            var extension = str.split('.').pop();//get file extension.
            //trucate text with file extension.
            var val = str.length > 20 ? (str.substring(0, 20) + '...' + extension) : str;
            $('#' + textId).text(val);//assign file name to corresponding lable.
        }
    };

    //This method will clear the fields in the upload dialogue after uploading.
    ns.clearuploadelements = function () {
        $(upldVidTitle).val('');
        $(upldVidDesc).val('');
        $(ytVidId).val('');
        $(vidSrcName).val('');
        $(dirCcFile).val('');
        $(upldVidCc).val('');
        $(VideoUrl).val('');
        $(captionUrl).val('');
        $(chkVideoUrl).removeAttr('checked');
        $(VideoUrl).attr('disabled', 'disabled');
        $(ytVidId).attr('disabled', 'disabled');
        $(chkCaptionUrl).attr('disabled');
        $(chkCaptionFile).attr('disabled');
        $(dirCcFile).attr('disabled', 'disabled');
        $(dirCcFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
        $(captionUrl).attr('disabled', 'disabled');
        $(chkBoxId).removeAttr('checked');
        $(lblWrgMsg).show().html("");
        $(vidSrcName).removeAttr('disabled');
        $(upldVidCc).removeAttr('disabled');
        $(upldVidCategory).val('');
        $(dtCategoryList).html("");
        $(chkCaptionFile).attr('checked', false);
        $(chkCaptionUrl).attr('checked', false);
        internal.clrFileValues();//set default text.
    };

    //To enable the mp4 video url,if the checkbox is clicked.
    ns.enableURLField = function (obj) {
        if (obj.checked) {
            // Enable youtube video id text box
            $(chkBoxId).attr('checked', false);
            $(ytVidId).attr('disabled', 'disabled');
            $(VideoUrl).removeAttr('disabled');
            $(chkCaptionUrl).removeAttr('disabled');
            $(chkCaptionFile).removeAttr('disabled');
            $(vidSrcName).attr('disabled', 'disabled');
            $(upldVidCc).attr('disabled', 'disabled');
            $(vidSrcName).val("");
            $(upldVidCc).val('');
            $(ytVidId).val('');

            internal.clrFileValues();//clear the text values and set to default text.
            //Disable file buttons when youtbue enabled.
            $(vidFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
            $(ccFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
        }
        else {
            // Enable HTML5 file browser element
            $(vidSrcName).removeAttr('disabled');
            $(VideoUrl).val("");
            $(VideoUrl).attr('disabled', true);
            $(chkCaptionUrl).attr('disabled', 'disabled');
            $(chkCaptionFile).attr('disabled', 'disabled');
            $(captionUrl).val("");
            $(captionUrl).attr("disabled", true);
            $(ytVidId).attr('disabled', 'disabled');
            $(upldVidCc).removeAttr('disabled');
            $(ytVidId).val('');
            $(chkCaptionFile).attr('checked', false);
            $(chkCaptionUrl).attr('checked', false);
            $(dirCcFile).attr('disabled', 'disabled');
            $(dirCcFile).val('');
            $(dirCcTxt).text(ViTag.getLocalizeValue('import.chooseText'));

            //Disable file buttons when youtbue enabled.
            $(vidFileBtn).removeAttr('disabled').css('opacity', '');
            $(ccFileBtn).removeAttr('disabled').css('opacity', '');
            $(dirCcFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
        }
    };
    //In the upload dialogue,if the checkbox is clicked then upload file button will
    //disable and if its unchecked then it will enable.
    ns.enableFileBrowse = function (obj) {
        if (obj.checked) {
            // Enable youtube video id text box
            $(chkVideoUrl).attr('checked', false);
            $(chkCaptionFile).attr('checked', false);
            $(chkCaptionUrl).attr('checked', false);
            $(VideoUrl).attr('disabled', 'disabled');
            $(chkCaptionUrl).attr('disabled', 'disabled');
            $(chkCaptionFile).attr('disabled', 'disabled');
            $(captionUrl).attr('disabled', 'disabled');
            $(vidSrcName).attr('disabled', 'disabled');
            $(upldVidCc).attr('disabled', 'disabled');
            $(dirCcFile).attr('disabled', 'disabled');
            $(dirCcFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
            $(ytVidId).removeAttr('disabled');
            $(vidSrcName).val("");
            $(VideoUrl).val("");
            $(captionUrl).val("");
            $(dirCcFile).val('');
            $(upldVidCc).val('');

            internal.clrFileValues();//clear the text values and set to default text.
            //Disable file buttons when youtbue enabled.
            $(vidFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
            $(ccFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
        }
        else {
            // Enable HTML5 file browser element
            $(vidSrcName).removeAttr('disabled');
            $(upldVidCc).removeAttr('disabled');
            $(ytVidId).attr('disabled', 'disabled');
            $(ytVidId).val('');

            //Enable file buttons when youtube disabled.
            $(vidFileBtn).removeAttr('disabled').css('opacity', '');
            $(ccFileBtn).removeAttr('disabled').css('opacity', '');
        }
    };
    //in upload dialouge if caption url field is checked then url field will enable else it will be disable.
    ns.enableCapURLField = function (obj) {
        if (obj.checked) {
            $(captionUrl).removeAttr('disabled');
            $(chkCaptionFile).attr('checked', false);
            $(dirCcFile).attr('disabled', 'disabled');
            $(dirCcFile).val('');
            $(dirCcTxt).text(ViTag.getLocalizeValue('import.chooseText'));
            $(dirCcFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
        }
        else {
            $(captionUrl).val("");
            $(captionUrl).attr('disabled', 'disabled');

        }
    };
    //in upload dialouge if caption choose file is checked , choose file will be enable else t will be disable.
    ns.enableCapBrowse = function (obj) {
        if (obj.checked) {
            $(dirCcFile).removeAttr('disabled');
            $(dirCcFileBtn).removeAttr('disabled').css('opacity', '');
            $(captionUrl).attr('disabled', 'disabled');
            $(chkCaptionUrl).attr('checked', false);
            $(captionUrl).val("");
        }
        else {
            $(dirCcFile).attr('disabled', 'disabled');
            $(dirCcFileBtn).attr('disabled', 'disabled').css('opacity', '0.6');
            $(dirCcFile).val('');
            $(dirCcTxt).text(ViTag.getLocalizeValue('import.chooseText'));
        }
    }
    //Below method is added to edit the tittle and desc of the video
    //model popup is showN along with prepopulating the values given at the time of editing.
    ns.EditTittleDesc = function (tittle, desc, ID) {
        $(lblWrgMsg).html("");
        $(myModalLabel).html(ViTag.getLocalizeValue("import.edit"));
        $(fileupload).hide();
        $(Import).hide();
        $(Update).show();

        internal.updateCategory(ID);
        sessionStorage.setItem('videoid', ID);
        $(upldVidTitle).val(unescape(tittle));
        $(upldVidDesc).val(unescape(desc));
        $(myModal).modal('show');
        internal.loadCategorylist();
    };
    ns.distinctCategoriesbyvideoid = function (id) {
        var userName = sessionStorage.getItem('authT');
        var categorylist;
        $.ajax({
            url: ViTag.config.wsCategorySearchurl,
            type: "GET",
            headers: { isStage: ns.isStaging, 'X-Authorization': userName },
            data: { videoid: id },
            async: false,
            success: function (data) {
                categorylist = JSON.parse(data);
            },
            error: function () {
                ViTagUI.initMsg("msg.errorMsg", "Info", "GetData.Error");
            }
        });
        return categorylist;
    };

    //changes action tabs
    ns.ChangeTabs = function (id, isEditMode) {
        currentTab = id;
        sessionStorage.setItem('CurrentAction', id);
        $(actionsContainer).show();
        $(saveCancel).show();
        ViTag.resetVidTm();
        ViTagUI.GetActions(id, isEditMode);
    };

    //To clear all text box values while creating new timeline videos.
    ns.newTimeLine = function (timeline) {
        ViTagUI.timelineInit();
        ViTagUI.tmVideoList();
        ViTagUI.playVideo(ViTagUI.filtered[0]._id); //ViTagUI.filtered  object contains the video list excluding timeline videos. 
        ViTagUI.ChangeTabs(timeline.id);
        $(saveCancel).hide();
        $('.panel-body').scrollTop(0);

    };
    //to list the videos in timeline mode
    ns.tmVideoList = function () {
        //In timelinemode we need to display the others videos except timeline video.
        ns.filtered = ViTag.source.filter(excludeTimeline);
        $(timelineid).html("").append(internal.createTmVideoList(ViTagUI.filtered));
    };
    //To exclude the timeline videos from the videosrc
    function excludeTimeline(vidObj) {
        return vidObj.sourcetype !== ViTag.sourceTypeEnum.timeline;
    }
    //saving  timeline video.
    ns.timeLineSave = function () {
        var timelineSave = ViTag.timeLineSave();
        if (timelineSave === undefined) {   //timelineSave will be undefined only when the timeline video saved successully.
            ViTagUI.showHideContainer();
            if (ViTag.yt.enabled) {
                ViTag.yt.player.seekTo(0, true);
            }
            ViTag.pause();  //to pause the youtube video and to hide the editcontainer
            $("#vid1").attr("src", "");  //after saving timeline  to pause the video.
            $('#backToList').hide();   //To hide the back to list link
            ViTagUI.initMsg("msg.timeLine", "Info", "Timeline.create.saved");
        }
    };

    ns.timelineInit = function () {
        ns.modTmLnSaveBtn(false);
        ViTag.newTimeline();
        ViTag.isTimelIneMode = true;
        ViTag.editTimelineMode = false;
        ViTagUI.resettmvalues();
    };
    ns.resettmvalues = function () {
        $(CaptureBtn).removeClass('endCapture').addClass('startCapture');
        $(tmTitle).val("");
        $(tmDesc).val("");
        $(startcaptureid).html("");
    };
    //edit timeline 

    ns.editTimeline = function (videoId) {
        ViTag.editTimelineMode = true;
        ViTagUI.playVideo(videoId);
        $(CaptureBtn).removeClass('endCapture').addClass('startCapture');
        ViTagUI.tmVideoList();
        ViTagUI.ChangeTabs(timeline.id);
        $("#timeLineContainer").show();
        ViTag.editTimeLine(videoId);
    };

    // Saves the respective actions depending on the currentTab and invokes respective save method in Visap.edit.
    ns.SaveActions = function () {

        if (currentTab === 'tagTab' || currentTab == null || currentTab === "null") {
            ViTag.SaveTagAction();
            ns.bindTagsLinks();
        }
        else if (currentTab === 'linkTab') {
            ViTag.SaveLinkAction();
            ns.bindTagsLinks();
        }
        else if (currentTab === 'annotationTab') {
            ViTag.SaveAnnotationAction();
        }
        else if (currentTab === 'hotpotTab') {
            ViTag.SaveHotspotAction();
        }
        else if (currentTab === 'questionTab') {
            ViTag.SaveQuestionAction();
        }
        else if (currentTab === 'sketchTab') {
            ViTag.SaveSketchAction();
        }
        else if (currentTab === 'whiteboardTab') {
            ViTag.SaveWhiteboardAction();
        }
    };

    // Cancel the respective actions depending on the currentTab and invokes respective save method in Visap.edit.
    ns.CancelActions = function () {
        ViTag.resetVidTm();
        if (currentTab === 'tagTab' || currentTab == null || currentTab === "null") {
            ViTag.CancelTagAction();
            $(tagtimediv).hide();
            $(txtTag).val('');
        }
        else if (currentTab === 'linkTab') {
            ViTag.CancelLinkAction();
        }
        else if (currentTab === 'annotationTab') {
            ViTag.CancelAnnotationAction();
        }
        else if (currentTab === 'hotpotTab') {
            ViTag.CancelHotspotAction();
        }
        else if (currentTab === 'questionTab' && ViTag.config.questionType === "native") {
            ViTag.CancelQuestionAction();
        }
        else if (currentTab === 'sketchTab') {
            ViTag.CancelSketchAction();
        }
        else if (currentTab === 'whiteboardTab') {
            ViTag.CancelWhiteboardAction();
        }
    };

    //Editing tag based on time and description.
    ns.EditTag = function (time, description) {
        $(actionsContainer).show();
        $(tagcontainer).show();
        $(saveCancel).show();
        var tab = $(tagTab)[0].id;//to know which tab is selected for saving actions.
        ViTagUI.ChangeTabs(tab);
        ViTag.EditTags(time, description);
    };

    //Removing tag 
    ns.DeleteTag = function (tagName) {
        var msg = ViTag.getLocalizeValue("confirmationMsg.deleteMsg");
        $.confirm(msg).then(function (istrue) {
            if (istrue) {
                ViTag.RemoveTag(unescape(tagName)); //remove tags from action list.
                ns.bindTagsLinks();
            }
        });
    };
    //Editing link based on time and description
    ns.EditLink = function (name, url) {
        $(actionsContainer).show();
        $(linkcontainer).show();
        $(saveCancel).show();
        var tab = $(linkTab)[0].id;//to know which tab is selected for saving actions.
        ViTagUI.ChangeTabs(tab);
        ViTag.EditLinks(name, url);
    };

    //Removing Link 
    ns.DeleteLink = function (linkName) {
        var msg = ViTag.getLocalizeValue("confirmationMsg.deleteMsg");
        $.confirm(msg).then(function (istrue) {
            if (istrue) {
                ViTag.RemoveLink(unescape(linkName)); //remove tags from action list.
                ns.bindTagsLinks();
            }
        });
    };

    //clears Question container and set default value to dropdown.
    ns.clrQuesContainer = function () {
        $(questions_dropdown).val('000');
        $(showQuizType).html("");
        $(aelibTagList).val("");
    };

    // Actions will display on the selection of respective actions  are shown and hidden.
    ns.GetActions = function (id, isEditMode) {
        internal.getActionOnId(id, isEditMode);
    };

    ///Global method called from UI: to get preview of pop up box
    ///When user clicks on edit or create hotspot and clicks preivew button
    ns.previewHotspot = function () {
        internal.showHotspot();
        var hotspotObj = internal.getHotspotdetails();
        ViTag.previewHotspot(hotspotObj);
        $(hotspotCircle).attr('draggable', 'true');// draggable was not very smooth and hence set dargballe attr added
        $(hotspotCircle).unbind("click");
      
    };

    //To to see the annotation before saving it.
    ns.previewAnnotation = function () {
        var t = ViTag.getCurrentTime(),
            ti = ViTag.htmlEncode($(title).val());   //to get the title value
        var de = ViTag.editor.getValue(cmtDesc);  //to get the value to preview.
        var d = $(duration).val();
        var ansObj;
        if (ViTag.editAns) {
            ansObj = { title: ti, description: de, StartTime: t, duration: d, AnnotationAttributes: { left: ns.cssAttributeLeft, top: ns.cssAttributeTop, width: ns.cssAttWidth, height: ns.cssAttheight } };
        }
        else
            ansObj = { title: ti, description: de, StartTime: t, duration: d, AnnotationAttributes: { left: "0px", top: "0px", width: ViTag.annotationAttr.width, height: ViTag.annotationAttr.height } };//this is the default position of the annotation so left is 0px and top is 34px to place the annotation exactly below the title.
        //Here annotation top and left will calcualted based on videomaincontainer height and width.
        //dividing videoMainContainer width by 100 will set the annotation default position to almost top left corner.
        //dividing videoMainContainer height by 6 will set the annotation default position to almost top.
        ViTag.RenderCurrentAnnotates(ansObj, true);
    };


    // When edit button of the action is clicked respective actions data are set to be on its elements
    ns.EditActions = function (type, time, pausedTime) {
        $(saveCancel).show();
        setTimeout(function () { ViTag.playAt(time) }, 300);
        var Listactions = ViTag.getPausedAction(pausedTime);
        ViTag.setPauseTm();
        var action = ViTag.getEditedListAction(type, Listactions, time);
        var editedAction = action.data;
        if (type === 'annotation') {
            ns.isAnnotationEdit = true;
            ns.ChangeTabs('annotationTab', ns.isAnnotationEdit);
            ViTag.editor.rePlaceCkeditor(cmtDesc);
            ViTag.editor.rePlaceCkeditor(cmtDesc);
            ns.cssAttributeLeft = editedAction.AnnotationAttributes.left;
            ns.cssAttributeTop = editedAction.AnnotationAttributes.top;
            ns.cssAttWidth = editedAction.AnnotationAttributes.width;
            ns.cssAttheight = editedAction.AnnotationAttributes.height;
            var editAnnotParams = {
                title: editedAction.title, description: editedAction.description,
                sTime: editedAction.StartTime, duration: editedAction.duration,
                PausedTime: pausedTime, Left: ns.cssAttributeLeft, Top: ns.cssAttributeTop,
                Width: ns.cssAttWidth, Height: ns.cssAttheight,
                PauseOnShow: editedAction.PauseOnShow
            };
            ViTag.EditAnnotate(editAnnotParams);
        }
        if (type === 'sketch') {
            var isSketchEdit = true;
            ns.ChangeTabs('sketchTab', isSketchEdit);
            $(sketchDurationId).val(editedAction.duration);

            ViTag.enableSketchTabs(time, pausedTime, editedAction);
        }
        if (type === 'questions') {
            ns.isQuesEdit = true;
            ns.ChangeTabs('questionTab', ns.isQuesEdit);
            // for question type need to get entire list hence called separately
            var editvalues = ns.getEditedListAction(type, Listactions, time);
            if (editvalues.sourcetype !== undefined && editvalues.sourcetype === "aelib") {
                $(tagTitle).val(editvalues.data.qtag);
                ViTag.aelib.editQuestion(editvalues.data.questionId, pausedTime);
            }
            else {
                ViTag.editor.rePlaceCkeditor(qTitle);
                ViTag.question.edit(editvalues.data.id, time, pausedTime);
            }
        }
        if (type === 'hotspot') {
            ns.ChangeTabs('hotpotTab');
            ns.cssAttributeLeftHS = editedAction.hotspotAttributes.left;
            ns.cssAttributeTopHS = editedAction.hotspotAttributes.top;
            ViTag.EditHotspot(pausedTime, editedAction);
        }
        if (type === 'whiteboard') {
            ns.isWhiteboardEdit = true;
            ns.ChangeTabs('whiteboardTab', ns.isWhiteboardEdit);
            $(sketcher).hide();
            $(imgOverlay).hide();
            ViTag.EditWhiteboard(pausedTime, editedAction);
        }
    };

    // to get perticulat action data for editing
    ns.getEditedListAction = function (type, listaction, startTime) {
        try {
            var list;
            if (listaction !== undefined && listaction.length > 0) {

                ViTag.debug("visap.edit:getEditedListAction:Get the all the actions list for the type:" + type + "," + startTime + "," + listaction.length);
                //loop through inside actions based on type and starttime get 
                //the relavaent
                $(listaction).each(function (i) {
                    if (startTime === listaction[i].data.StartTime.toString() && type === listaction[i].type) {
                        list = listaction[i];
                        return false;
                    }
                });
                return list;
            }
        }
        catch (err) {
            ViTag.error("Visap.edit:getEditedListAction: Error while getting edited action list" + err);
        }
    };

    ns.RemoveAction = function (StartTime, CurrentTime, type) {
        try {
            var msg = ViTag.getLocalizeValue("confirmationMsg.deleteMsg");
            $.confirm(msg).then(function (istrue) {
                if (istrue) {
                    var questionId = [];
                    var Listactions = ViTag.getPausedAction(CurrentTime);
                    var editedAction = ns.getEditedListAction(type, Listactions, StartTime);
                    if (editedAction.data.questionId) {
                        questionId = [editedAction.data.questionId];
                    }
                    ViTag.RemoveAction(StartTime, CurrentTime, type, questionId);
                    if (type === 'questions' && editedAction.sourcetype !== undefined && editedAction.sourcetype === "aelib") {
                        ViTag.aelib.deleteQuestion(editedAction.data.questionId, editedAction.data.StartTime);
                        ns.clrQuesContainer();
                    }
                }
            });
        } catch (err) {
            ViTag.error("Edit:RemoveAction: Error while removing action " + err);
        }
    };
    // show canvas related elements when user choose sketch option from the drop down
    ns.imageExist = function () {
        var imgoverlay = $(imgOverlay);
        if (imgoverlay.is(':visible') && imgoverlay.attr('src') !== '#') {
            ViTagUI.initMsg("msg.sketch", "Info", "Action.SketchExists");
            ViTag.hideSketches();
            ns.ChangeTabs("tagTab");
        }
    };

    //This will invoke when user try to edit the the action pausetime.
    //It has 2 parameters 1.pauseTmAnchorId(It is Id of the anchor tag),2.pauseTmTextId(it of the text box)
    ns.editPauseTime = function (pauseTextTime, index) {
        ViTag.ispreview = false;
        $(headerActionTimeLabel + index).hide();
        $(headerActionTimeTextBox + index).show();
        $(headerActionTimeTextBox + index).val(pauseTextTime);
        $(btnCanceledit + index).show();
        $(btnEditheadertime + index).hide();
        ViTag.setPauseTm();
        return ViTagUI.validateDigits("headerActionTimeTextBox" + index);

    };

    // cancel from editing action time
    ns.editTimeclose = function (index) {
        $(btnCanceledit + index).hide();
        $(btnEditheadertime + index).show();

        $(headerActionTimeLabel + index).show();
        $(headerActionTimeTextBox + index).hide();
    }

    //this will invoke when the user click save while editing the action pause time.
    //It has 3 parameters 1.pause time for that action. 2.pauseTmAnchorId(It is Id of the anchor tag),3.pauseTmTextId(it of the text box)
    ns.SaveActionTimeHeader = function (pauseTime, index) {
        if ($(headerActionTimeTextBox + index).css("display") === "none") {
            return false;
        }
        var newTime = $(headerActionTimeTextBox + index).val().split(":");
        var labelID = "headerActionTimeLabel" + index;
        var textboxID = "headerActionTimeTextBox" + index; //newly entered value in the text box for editing action pausetime.

        var returnValue = ViTag.util.timeFormat($(headerActionTimeTextBox + index).val()); //newly entered value in the text box for editing action pausetime.
        var isValid = internal.isValidTimeFormat((newTime !== '') ? returnValue : true, textboxID, labelID);//to validate the newly entered time HH:mm:ss
        if (!isValid) { return; }

        var obj = internal.getTime(newTime);
        var newTimeInsec = ViTag.getTimeInSeconds(obj.hrs, obj.min, obj.sec); //to get the time in seconds
        ViTag.updatePauseTime(pauseTime, newTimeInsec, labelID, textboxID);

    };

    // When ever there is change in sketch tools then this method will retain the brushsize
    ns.changeSketchTool = function (type) {
        // call the respective tools to be initialised from sketcher.js
        sketchv1.sketchtools(type);
        //Set  brush size of the slider value by calling:
        if (type === "text")
            $(brush_size).attr('min', 10);
        else
            $(brush_size).attr('min', 1);
        $(brush_size).val(sketchv1.getBrushSize());
        $(brushValue).text(sketchv1.getBrushSize());
    };

    ns.emptyAllDuration = function () {
        $(duration).val("");
        $(hotspotDuration).val("");
        $(sketchDurationId).val("");
        $(whiteboardDuration).val("");
    };
    //to validate the values of textbox in annotation 
    ns.validatenumber = function (el) {

        var regex = /^[0-9]*(?:\.\d{1,2})?$/;  // allow only numbers [0-9] 
        if (!regex.test(el.value)) {
            ViTagUI.initMsg("playerEdit.msg_validnumbers", "Info", "Action.Validation")
            ViTagUI.emptyAllDuration();
        }

        if (parseInt($(duration).val(), 10) > 180 || parseInt($(sketchDurationId).val(), 10) > 180 || parseInt($(whiteboardDuration).val(), 10) > 180 || parseInt($(hotspotDuration).val(), 10) > 180) {
            iViTagUI.initMsg("playerEdit.msg_maxduration", "Info", "Action.Validation")
            ViTagUI.emptyAllDuration();
        }
    };
    //to select all the check box in the thumbnails
    ns.selectAll = function () {
        if ($(selectchkBox).is(":checked")) {
            internal.selectCheckBox("input[name*='chklist']");
        }
        else {
            internal.deSelectCheckBox("input[name*='chklist']");
        }
    };
    //This function will invoke when user clicks on indivisual checkbox in the video menu.
    //If all the indivisual checkbox are selected then from this function selectAll checkbox will check automatically.
    ns.selectCheckBox = function () {
        if ($('#videoList input[type="checkbox"]').length === $('#videoList input[type="checkbox"]').filter(":checked").length) {
            internal.selectCheckBox("#selectchkBox");
        }
        else {
            internal.deSelectCheckBox("#selectchkBox");
        }
    };
    ns.modTmLnSaveBtn = function (isCapture) {
        $(timelineSaveBtn).prop('disabled', isCapture);
    }


})(window.ViTagUI = window.ViTagUI || {});

