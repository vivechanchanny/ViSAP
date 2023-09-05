//This is the intermediate  wrapper js file to integrate with visap.js.

(function (ns) {

    var questions_dropdown = "#questions_dropdown";
    var showQuizType = "#showQuizType";// container for holding QE
    var aelibTagList = "#aelibTagList";
    // Question rendering override for Angular UI 
    ns.showQuestion = null;
    ns.getqueType = function (num) {
        switch (num) {
            case 101:
                return "mcqSingleResponse";
            case 102:
                return "mcqMultipleResponse";
            case 103:
                return "fibText";
            case 104:
                return "fibTapAndPlace";
            case 105:
                return "fibDropDown";
            case 106:
                return "matchingQuestion";
            case 107:
                return "groupingQuestion";
            case 108:
                return "trueOrFalse";
            default:
                break;
        }
    }
    //****************private methods******************//

    var internal = {
        curQuen: null,
        pausedTime: null,
        addQuestion: function (questionId, qtag) {
            var toolType = "questions", ques, action;
            var sourcetype = ns.actionSourceType.aelibquestion;
            ques = { questionId: questionId, duration: 2, qtag: qtag };
            action = ns.getActionList(toolType, ques, sourcetype);
            return ns.getJsonString(action);


        },
        // Creation of new question and launches QE(quiz editor)
        initQuestion: function () {
            var _quizType = Number($(questions_dropdown).val()),
                _videoID = internal.getVidoID();

            if (_quizType !== 0) {
                var options = {
                    quesId: "",
                    quesType: _quizType,
                    QuesContainer: $(showQuizType),
                    url: "",
                    baseServiceURL: ViTag.config.baseServiceURL,
                    videoId: _videoID
                };

                $(showQuizType).html("");
                QuizEditor.init(options);
            }
            else
                $(showQuizType).html("");

        },

        // helps in redering question
        renderQuestion: function (quesObj, timer) {
            $("body").trigger("toggleQuestContClass");
            var questionData;
            ns.resetTime = timer;
            var questionID = quesObj.data.questionId;
            internal.curQuen = quesObj;
            //invoking service to get the questiondata based on the questionid
            $.ajaxSetup({ headers: { 'X-Authorization': sessionStorage.getItem('authT') } });
            $.getJSON(ViTag.config.questionServiceURL + questionID + "", function (data) {
                ViTag.debug("Visap:render:question:question data rendered ");
                questionData = JSON.parse(data);
                $("#aelibquestblock").empty();
                if (questionData != null) {
                    ViTag.pause();
                    var config = {
                        "obj": $("#aelibquestblock").get(0),
                        "options": {
                            quizId: questionID,
                            align: "center",
                            dataBorder: "false",
                            dataMode: "inline",
                            dataURL: "",
                            baseAssetPath: ViTag.config.baseAssetpath,
                            bookURL: "",
                            data_json: questionData,
                            layout: "reflow",
                            popout: "false",
                            bookFrameContent: $(document.body),
                            bookFrameContentRootEl: $("#aelibquestblock")
                        }
                    };
                    var widget = new AssessmentController(config);
                    widget.on(WIDGET_EVENTS.RENDER_COMPLETE, internal._onRenderCompleted);
                    widget.initCurrWidget();
                    if (ns.showQuestion == null) {
                        $("html").block({ message: '' });
                        $(".blockUI").css("cursor", "default");
                    
                    // If the question is appears during fullscreen mode then do the neccessary css chnages here
                    if (ViTag.isFullScreenON) {
                        $("#slider").addClass("sliderFS");
                        $("#questContainer").removeClass("questContainer");
                        $("#questContainer").addClass("questContainerFS");
                        $("#questContainer").addClass("questContent");  //This questContent is used to set question related css for gallary page (bootstrap related changes.)
                        $("#tblMain").block({ message: '' });
                    }
                    else {
                        $("#questContainer").removeClass("questContainerFS");
                        $("#questContainer").removeClass("questContent");  //This questContent is used to set question related css for gallary page (bootstrap related changes.)
                        $("#questContainer").addClass("questContainer");
                        $("#slider").removeClass("sliderFS");
                    }
                } 
                    var vHeight = $("#videoContainer").height();
                  //  $("#questContainer").css('height', vHeight);
                    $("#questContainer").css({ zIndex: "1010" });
                    $("#questContainer").show();
                    $("#aelibquestblock").show();
                    $("body").trigger("showQuestion",false);
                }
                else {
                    $("#aelibquestblock").hide(1000)
                    ViTag.continuePlay();
                }
            });
        },
        removeClass: function () {
            $("body").trigger("resetQuestContClass");

        },
        //Update question  
        editQuestion: function (questionId, pausedTm) {
            $.ajaxSetup({ headers: { 'X-Authorization': sessionStorage.getItem('authT') } });
            $.getJSON(ViTag.config.questionServiceURL + questionId + "", function (data) {
                var DBdata = JSON.parse(data);
                if (DBdata != null) {
                    var _videoID = internal.getVidoID();
                    var options = {
                        quesId: questionId,
                        quesType: DBdata.quesType,
                        QuesContainer: $(showQuizType),
                        url: ViTag.config.editQuestionURL + questionId + "",
                        baseServiceURL: ViTag.config.baseServiceURL,
                        baseAssetPath: ViTag.config.baseAssetpath,
                        videoId: _videoID
                    };
                    internal.pausedTime = pausedTm;
                    $(showQuizType).html("");
                    internal.addQuesTag(questionId, true);//adding tag to dropdown.
                    QuizEditor.init(options);
                    $(questions_dropdown).val(DBdata.quesType);
                }
                else
                    ViTag.showMessage("Error in loading question data.", "Info", "ActionList.delete");

            });
        },

        // deleting question from UI
        deleteQuestion: function (questionId, qSrc) {
            $.ajax({
                url: ViTag.config.deleteQuestion + questionId + "",
                type: "DELETE", // <- Change here
                headers: { 'X-Authorization': sessionStorage.getItem('authT') },
                contentType: "application/json",
                success: function (data) {
                    ViTag.debug("visap.aelib:deleteQuestion question deleted successfully " + data);
                    ViTag.showMessage("deleted successfully.", "Info", "Action.Delete");
                    //passing question data to visap analytics while deleting question by raising event  
                    ViTag.passEventData(ViTag.Events.deleteAction, ViTag.actionType.question, { StartTime: qSrc.data.StartTime, qtag: qSrc.data.qtag, sourceType: qSrc.sourcetype, questionId: questionId });
                },
                error: function () {
                    ViTag.showMessage("Question deletion is failed.", "Info", "ActionList.delete");
                }
            });
        },
        // Events are handled once questions are created and response are sent from AELIB interface
        question_created: function (questData, fnPreSend, fnSuccess, fnError) {
            var questinfo = questData.split("|");
            var questId = questinfo[0];
            var actionType = questinfo[1];
            var qtag = internal.getTagVal();

            var qType = ns.getqueType(Number($(questions_dropdown).val()));
            var time = ns.getCurrentTime();
            if (actionType !== "update") {
                var questiondata = internal.addQuestion(questId, qtag);
                ns.addQuestionData(questiondata, fnPreSend, fnSuccess, fnError);
                //passing question data to visap analytics while creating question by raising event
                ViTag.passEventData(ViTag.Events.createAction, ViTag.actionType.question, { StartTime: time, type: qType, qtag: qtag, sourceType: "aelib", questionId: questId });
            }
            else {
                //passing question data to visap analytics while editing question by raising event
                ViTag.passEventData(ViTag.Events.editAction, ViTag.actionType.question, { StartTime: time, type: qType, qtag: qtag, sourceType: "aelib", questionId: questId });
                internal.addQuesTag(questId, false);//adding tag to dropdown.
                ns.updateActionsList();
            }
            ns.initTest();
            ns.handleSeekBar();
            ns.aelib.clearData();
            // call back function for outside the visap
            $("body").trigger("onQuestionCreated");
            window.selectedQuesTag= '';
        },

        //When the question is rendered on the video this function will get trigger.
        //minwidth,minheight,maxwidth can be used as parameter onRenderCompleted function
        _onRenderCompleted: function (widget) {
            var correctAns = 'correct';
            $(".widget-ui").removeClass("invisible");
            widget.relayout();
            widget.off(WIDGET_EVENTS.SAVE_USER_RESPONSE_DATA).on(WIDGET_EVENTS.SAVE_USER_RESPONSE_DATA, function (quizID, data) {
                ViTag.passPlayerData("question", "viewed", { source: "aelib", type: "" });
                var now = new Date();
                var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
                var questResponse = { "videoId": ViTag.CurrentSrc()._id, username: ns.userName, "quizID": quizID, "status": data.response[0].status, "score": data.response[0].score, "maxScore": data.response[0].maxScore, datetime: utc };
                internal.saveQuestResponse(questResponse);
                if (data.response[0].status === correctAns) {
                    var msg = "correct answer";
                    internal.continueVideo(msg);  //To continue the video.
                }
                else
                    internal.replayVideo();//To replay the video.
                internal.removeClass();
            });
        },
        blockEle: function (opt) {
            $(opt.e).block(opt.msg);
        },
        //Making an ajax call to store the question response
        saveQuestResponse: function (questResponse) {
            $.ajax({
                url: ViTag.config.questResponse,
                type: "POST",
                async: false,
                headers: { 'X-Authorization': sessionStorage.getItem('authT') },
                data: { data: JSON.stringify([questResponse]) },
                success: function () {

                },
                error: function () {

                }
            });

        },
        //To replay video if user answered wrong.
        replayVideo: function () {
            var msg = "Wrong answer";
            if (internal.curQuen.data.qtag !== "") {
                var t = internal.getTagTime(); //Get tagged time.
                ViTag.playAt(t);
            }
            internal.continueVideo(msg);
        },

        //If the user response is correct this will trigger.
        continueVideo: function (msg) {
            $("#questContainer").hide();
            $("#aelibquestblock").hide();   //To remove the question block.
            $("#slider").hide(1000);
            //TODO: 
            $("body").triggerHandler("showSliderContent", "tags","continue");
            $("body").trigger("showQuestion",true);
            $('.blockUI').remove();   //Removing block UI.
            ViTag.continuePlay();
            ns.resetTime();          //To reset the timer when answer is correct.
            internal.blockEle({ e: "#tblMain", msg: { message: "<lable class='whitemsg'>" + msg + "! </lable>", css: { border: "none", borderRadius: "4px", padding: "10px", margin: "0px 1px", backgroundColor: "rgba(102,153,51,0.9)", width: "300px" } }, bg: false });
            setTimeout(function () { $("#tblMain").unblock(); }, 2000);
        },

        getVidoID: function () {
            var videoID = ns.CurrentSrc()._id
            return videoID;
        },

        getTagTime: function () {
            // Get time based on given tag
            var t = $.grep(ns.CurrentTags(), function (e) { return unescape(e.d) === internal.curQuen.data.qtag; })[0];
            return t ? t.t : ns.getCurrentTime();
        },

        // To check the tag is exists in the list
        validateTag: function (tag) {
            ViTag.debug("visap.aelib:To check the tag is exists in the list" + tag);
            var t = null;
            if (ns.CurrentTags())
                t = $.grep(ns.CurrentTags(), function (e) { return unescape(e.d) === tag })[0];
            return t ? true : false;
        },

        //Adding tag to question action.
        addQuesTag: function (questionId, isQuesEdit) {

           var qtag = internal.getTagVal();
            var pausedLstAction = ViTag.getPausedAction(internal.pausedTime);

            for (var i = 0; i < pausedLstAction.length; i++) {
                if (pausedLstAction[i].data.questionId === questionId) {
                    if (isQuesEdit === true) {
                        $(aelibTagList).val(pausedLstAction[i].data.qtag);
                        $("body").trigger("selectedQuesTag",pausedLstAction[i].data.qtag);
                    }
                    else
                        pausedLstAction[i].data.qtag = qtag;
                }
            }
        },

        //Get tag value.
        getTagVal: function() {
            var qtag = $(aelibTagList).val();
            if(qtag === "" || qtag === undefined) {
                qtag = window.selectedQuesTag;
            }
            return qtag;
        }
    };

    // Handle events after creation of question
    $(window).off("question_created").on('question_created', function (event, questId) {
        internal.question_created(questId);
    });


    ns.aelib = {
        // Initialises quiz editor for creation of new question
        initQuizEditor: function () {
            internal.initQuestion();
        },
        //Update question from Quiz editor
        editQuestion: function (questionId, pausedTm) {
            internal.editQuestion(questionId, pausedTm);
        },

        deleteQuestion: function (questionId, queData) {
            internal.deleteQuestion(questionId, queData);
        },
        //Clearing all edited Values of the question
        clearData: function () {
            $(aelibTagList).val("");
            $(showQuizType).html("");
            $(questions_dropdown).val("000");
        },

        //render questions on the video.
        renderQuestion: function (quesObj, timer) {
            internal.renderQuestion(quesObj, timer);
        },

        createQuestion: function (questId, fnPreSend, fnSuccess, fnError) {
            internal.question_created(questId, fnPreSend, fnSuccess, fnError);
        },

        continueVideo: function () {
            internal.continueVideo();
        },

        copyQuestion: function (questId, fncallback) {
            //here sending querystring flag true,because to get complete one question document(not only the questionData)
            $.ajax({
                url: ViTag.config.createcopyquestionURL + questId + "/copy/" + null + "?flag=true",
                type: "POST",
                async: false,
                headers: { isStage: false, 'X-Authorization': sessionStorage.getItem('authT') },
                success: fncallback,
                error: function (err) {
                    ViTag.error("visap.edit:Error while publishing with the question data" + err);
                    ViTag.showMessage("Error in loading data", "Info", "GetData.Error");
                }
            });

        },
        //To overwrite the staged question data with the published question data.(while publishing the video)
        overwriteQuestData: function (stagedQuestId, publishedQuestId) {
            //here sending querystring flag true,because to get complete one question document(not only the questionData)
            $.ajax({
                url: ViTag.config.createcopyquestionURL + stagedQuestId + "/copy/" + publishedQuestId + "?flag=true",
                type: "POST",
                async: false,
                headers: { isStage: false, 'X-Authorization': sessionStorage.getItem('authT') },
                success: function (data) {
                    ViTag.debug("Visap.edit:overwrite questData while republishing." + data);
                },
                error: function (err) {
                    ViTag.error("Visap.aelib:overwriteQuestData:Error in loading data " + err);
                    ViTag.showMessage("Error in loading data", "Info", "GetData.Error");
                }
            });
        },

        // get the submited data 
        getQuestResponse: function (fncallback, isheader, userid) {
            $.ajax({
                url: ViTag.config.questResponse,
                type: "GET",
                async: false,
                headers: { 'X-Authorization': sessionStorage.getItem('authT') },
                data: { ID: ns.CurrentSrc()._id, UserID: userid, isresponseheader: isheader },
                success: fncallback,
                error: function (err) {
                    ViTag.error("visap.edit:Error while getting response with the question data" + err);
                    ViTag.showMessage("Error in loading data", "Info", "GetData.Error");
                }
            });

        }
    }

})(window.ViTag = window.ViTag || {});


