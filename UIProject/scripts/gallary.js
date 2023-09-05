/*This js mainly contains responsive player css for gallary page*/ 
(function (ns) {

    ns.ready = function () {
        if (ViTagUI.ishome) {  //This code should excecute only for gallary.html
            internal.bindEvent(); //Binding events when  the page is loaded.
        }

    };
    var internal = {
        bindEvent: function () {
            //This event will trigger when the fullscreen button is clicked and also when exited from fullscreen
            $("body").on("toggleClasses", function () {
                $("#questContainer").removeClass("questContent");
                if (!ViTag.isFullScreenON) {
                    //This block of code will excecute while switching to fullscreen from normal screen.
                    //#tagQuestContainer is the parent div to display the tag and question.
                    $("#tagQuestContainer").removeClass("col-md-3");
                    $("#tagQuestContainer").removeClass("col-xs-12");
                 
                    if ($("#slider").is(":visible")) {  //This is to check question or tag is visible or not(slider is the the html tag id for parent of question and tag container)
                        $("#playerCont").addClass("col-md-6");
                    }
                } else {
                    //This block of code will excecute while switching to normal screen from fullscreen screen mode.
                    if ($("#slider").is(":visible")) {
                        $("#tagQuestContainer").removeClass("col-md-4");
                    }
                    $("#tagQuestContainer").addClass("col-md-3");
                    $("#playerCont").removeClass();           //playerCont is the id of player parent div.
                    $("#playerCont").addClass("col-xs-12");
                    $("#playerCont").addClass("col-md-6");
                    $("#playerCont").addClass("no-margin");
                }
            });
            //This event will trigger when the user clicks on getTagsLinks button
            $("body").on("addRemoveClass", function () {
                if (ViTag.isFullScreenON) {
                    $("#playerCont").addClass("col-md-6");
                    $("#playerCont").addClass("col-md-10");
                }
                $("#slider").removeClass("sliderFS");
            });
            //This event will trigger when the while rendering question(from visap.aelib.js)
            $("body").on("toggleQuestContClass", function () {
                if (ViTag.isFullScreenON) {
                    $("#tagQuestContainer").addClass("col-md-4");
                }
                if (!ViTag.isFullScreenON) {
                   $("#tagQuestContainer").removeClass("col-md-3");
                   $("#tagQuestContainer").addClass("col-xs-12");
                   $("#tagQuestContainer").addClass("questClass");
                }
            });
             //This event will trigger when the user submit the answer for question to reset all the classe which are required.
            $("body").on("resetQuestContClass", function () {
                if (ViTag.isFullScreenON) {
                     $("#tagQuestContainer").removeClass("col-md-4");
                }
                if (!ViTag.isFullScreenON) {
                    $("#tagQuestContainer").addClass("col-md-3");
                    $("#tagQuestContainer").removeClass("questClass");
                }
            });
        },
    };
})(window.ViTagUI = window.ViTagUI || {});