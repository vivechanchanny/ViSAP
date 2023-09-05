(function (ns) {
    ns.isFinished = null;
    var ut = ns.unitTest,
    me = {
        /// Set video source and timing 
        setVideoSrc: function (args) {
            ns.play(args.src);
            ut.stop();
            setTimeout(function () {
                args.t = args.t ? args.t : 0;
                ns.playAt(args.t);
                ut.start();
            }, 250);
        },
        onQuestionCreated :function(testData){
         var type = "questions";
         var totalQuestions = 0;
         totalQuestions = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
          $.ajax({
            type: "POST",
            data :JSON.stringify(testData.data),
            headers: {'X-Authorization': sessionStorage.getItem('authT') },
            url: ViTag.config.editQuestionURL,
            contentType: "application/json",
              success: function(data){ 
            
                 ns.aelib.createQuestion(data.url,{
                   onSaving: function () {

                   },
                   onSave: function () {
                    ut.assert.equal(ns.CurrentActionList(type).length, totalQuestions + 1, "AELIB Question created successfully");
                    ut.start();  

                   },
                   onErrors: function () { 
                    ut.assert.ok(false, "AELIB Question creation is failed"); 
                  }
                });
            }
        });
      },
       
        vArgs: null
    };

    ///***********************************************************************************////
    ///*******************************Aelib question unit test methods starts*******************************/////
    ///*********************************************************************************////

    // creating whiteboard in play mode//
          
          me.creatingAelibQuestion = function () {
            module("Create Question");
            ut.asyncTest("ns.aelib.createQuestion", function () {
              var testData = ns.testData.aelib;    
              me.vArgs = ns.init(testData.args);
              $.extend(me.vArgs, ViTag.initEditing(me.vArgs));
              me.setVideoSrc({ 
                src: ns.source[testData.args.src0]._id, 
                t: testData.args.currentTime, 
                srctype: ns.source[testData.args.src0].sourcetype 
              });
              me.onQuestionCreated(testData);
            });

          },

           // To test Render Question functionality
           me.renderQuestion=function(){
            module("Rendering Question");
            ut.asyncTest("ns.aelib.renderQuestion", function () {
              var type = 'questions';
              var testData = ns.testData.aelib;
             
              var questionobj = ns.CurrentActionList(type);
              ns.aelib.renderQuestion(questionobj[0].questionId);
            // If there is no time out then question text will be null
              setTimeout(function(){ 
                 var expected = ns.testData.aelib.data.questionsData.questionsData[0].questionBody[0].data;
                 
                 ut.assert.equal($('#questionText').text(),expected, "Display Question pass");
                 ut.start();
                 $('.blockUI').remove();
                 $("#questContainer").remove();
              },500);

            });
          },

          me.deleteQuestion = function(){
            module("Deleting Question");
            ut.asyncTest("ns.aelib.deleteQuestion", function () {
            
              totalActions = ns.CurrentSrc().actions.length;
              ns.RemoveActionList(ns.CurrentSrc().actions[0].currentTime, {
                onSaving: function () {
                },
                onSave: function () {
                    ut.assert.equal(ns.CurrentSrc().actions.length, totalActions - 1, "Questions deleted successfully");
                    ut.start();
                },
                onError: function () { ut.assert.ok(false, "Questions deletion failed"); }
            });

          });
        }
   
     
    ///*************************************************************************************************************//
    ///****************************** Test suits initialisation ****************************************************//
    ///*************************************************************************************************************//


    var testData;
    //run test suits for all kinds of videos
    ut.runTestSuits = function () {
        ViTag.visapLocalize();//localization of strings.
        ViTag.getAuthToken();//to generate auth token.
        me.creatingAelibQuestion();
       // me.renderQuestion();
        me.deleteQuestion();
        
    };

 


    /// Initialise the test suits : Call to wrapper class
    /// which inturns call test methods for default or uploaded videos
    ut.initTestSuits();

    //junit report genertion and results which has to be stored in db
    QUnit.jUnitReport = function (report) {
        saveXmlTestData(report);
    };

    // Test results are stored and picked up from Junkin
    function saveXmlTestData(report) {
        var data = report.xml;
        $.ajax({
            url: ViTag.config.wsAelibTestServiceurl,
            type: "POST",
            data: { testData: data, Environment: "Test" },
            success: function (data) {
            },
            error: function (xhr, err) { }
        });
    };

})(window.ViTag = window.ViTag || {});