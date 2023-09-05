(function (ns) {

  var internal={
       curQuen: null, quesHolder: "tblQuesViTag",
        // Get question html template.
        getQuestion: function (q) {
          ViTag.debug("Visap:test:getQuestion:Prepare quetion template"+q); 
            // TO DO: Use Jquery templete, UI need to do, template.js added into the tfs
            internal.curQuen = q;
            // Question HTML 
            var html = "<table id='" + internal.quesHolder + "' cellspacing='0' cellpadding='0' class='vtbl' align='center' border='0'><tr><td align='left' style='word-break:break-all;'><h4>" + ViTag.htmlDecode(q.qtitle) + "</h4>";
            $(q.options).each(function (i) {
                html += "<label class='lblQues' for='rd" + i + "'><input type='radio' name='qOptions' id='rd" + i + "' value='" + (i + 1) + "' onclick='javascript:ViTag.quiz.correctAnswer = this.value;'/>" + this.toString() + "</label><br/>";
            });
            
            html += "</td></tr></table><input type='button' class='qutbtn' value='Submit' onclick='ViTag.quiz.evaluateTest()'/>";

            return html;
        },
        // To show successfull message if answer is correct.
        getPassMsg: function () {
         $('#'+internal.quesHolder).css('display','none');  
            return "<div class='divPass'>Great, you are right.<br /><br /><input type='button' class='qutbtn' onclick='ViTag.quiz.continuePlay(true);' value='Continue' />";
        },

        // To show error message if answer is not correct.
        getFailMsg: function () {
            
             $('#'+internal.quesHolder).css('display','none');  
            if (internal.curQuen.qtag == null)
               var failmsg = "<div class='divFail'>Oops!! That is not right answer.<br/><br /><input type='button' class='qutbtn' onclick='ViTag.quiz.continuePlay(false);' value='Continue' />";

            else
                failmsg = "<div class='divFail'>Oops!! That is not right answer.<br/>let us watch it again.<br /><br /><input type='button' class='qutbtn' onclick='ViTag.quiz.continuePlay(false);' value='Continue' />";

            return failmsg;
        },

        // To show warning message if non of the options are selected.
        getWarningMsg: function () {
          $('#'+internal.quesHolder).css('display','none');  
            return "<div class='divFail'>Any one of the options should be selected.<br /><br /><input type='button' class='qutbtn' onclick='javascript:$(\"#" + internal.quesHolder + "\").parent().unblock();' value='Okay' />";
        },

        // Evaluate test based on user response.
        evaluate: function () {
           ViTag.info("Visap:test:evaluate: Evaluate test based on user response"); 
            var quesContainer = $("#" + internal.quesHolder).parent();
           
            if (ViTag.quiz.correctAnswer) {
                // Comparing the submitted answer with correct answer
                if (internal.curQuen.qans === ViTag.quiz.correctAnswer)
                   var msg = internal.getPassMsg();
                else
                    msg = internal.getFailMsg();
                ViTag.quiz.correctAnswer = null;
            }
            else msg = internal.getWarningMsg();

            // Block the question with validated result message
            quesContainer.block({ message: msg, css: {border: 0, width: quesContainer.outerWidth(), height: quesContainer.outerHeight()} });
            $('#'+internal.quesHolder).css('display','block');      
      },
        // Based on user response video will continue play or take into given tag.
        continuePlay: function (result) {
          ViTag.debug("Visap:test:continuePlay: If result is failed video play from given tag");             
            
            if (!result && internal.curQuen.qtag != null){
                ViTag.playAt(internal.getTagTime());
            }   
           
             ViTag.continuePlay();
            internal.onClose();
            // Remove question block element
            $("#ques-block").remove();
            ns.mainContainer.css({ overflow: "visible" });
        },
        getTagTime: function () {
         ViTag.debug("Visap:test:getTagTime: Get tagtime if question is hooked to tag");  
            // Get time based on given tag
            var t = $.grep(ns.CurrentTags(), function (e) { return unescape(e.d) === internal.curQuen.qtag; })[0];
            return t ? t.t : ns.getCurrentTime();
        }
  };
  
  
  ns.quiz={
 		showQues: function (q,mainContainer,videoMContainer, onClose) {
        	ViTag.debug("Visap:test:showQues Pause the video and show the tagged question to user"+q); 
            mainContainer.css({ overflow: "scroll" });
            internal.onClose = onClose;
            ns.mainContainer=mainContainer;
            // Pause the video  or mute the video when question started showing
            ViTag.pause();
            var os = videoMContainer.offset();
            if (os === undefined)
                os = { top: 196, left: 270 };
            // Block the complete UI to show question based on video time.
            var w = screen.availWidth + "px",
            h = screen.availHeight + "px",
            t = os.top, l = os.left;
            $('#ques-block').show();
            $("<div id='ques-block' style='position:absolute;width:" + w + ";height:" + h + ";top:75px;left:0px;'/>").appendTo("body").block({ message: internal.getQuestion(q), css: { border: 0, top: os.top, left: os.left, height: videoMContainer.height(), width: videoMContainer.width(), textalign: "center"       ,overflowx:"scroll"} });
            $(".blockUI").css({ zIndex: "2147483647", overflow: "scroll" });
            $("#ques-block").find(".blockMsg").css({ top: t, left: l });
        },

        // Validate the answer once user submit
        evaluateTest: function () {
        try
        {
          ViTag.info("Visap:evaluateTest:Validate the answer once user submit");
            internal.evaluate();
        }
        catch(err)
	    {
	       ViTag.error("Visap:evaluateTest:Error while evaluating  the questions"+err);
	    }
        },
        // Based on result video will continue to play
        continuePlay: function (result) {
        try
        {
            internal.continuePlay(result);
        }
        catch(err)
	    {
	       ViTag.error("Visap:continuePlay:Error while continue playing question"+err);
	    }
        },
        // Will store the selected option index
        correctAnswer: null
   };

})(window.ViTag = window.ViTag || {});