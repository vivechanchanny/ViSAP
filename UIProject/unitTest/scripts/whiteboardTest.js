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
        vArgs: null
    };

    ///***********************************************************************************////
    ///*******************************Whiteboard test methods starts*******************************/////
    ///*********************************************************************************////

    // creating whiteboard in play mode//
    
    me.creatingWhiteboard = function () {
        module("Creating Whiteboard");
        ut.asyncTest("Creating whiteboard", function () {
          var type = 'whiteboard';
		  testData = ns.testData.whiteboard;       
         me.vArgs = ns.init(testData.args);
        $.extend(me.vArgs, ViTag.initEditing(me.vArgs));
        me.setVideoSrc({ 
                        src: ns.source[testData.args.src0]._id, 
                        t: testData.args.currentTime, 
                        srctype: ns.source[testData.args.src0].sourcetype 
                        });
            expect(6);
            var whiteboardData = 0;
            whiteboardData = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs
            ns.AddAndSaveWhiteboard(ns.testData.whiteboard.data,
             function () { },
             function () {
                 ut.assert.equal(ns.CurrentActionList(type).length, whiteboardData + 1, "Whiteboard created successfully");
                 ut.assert.equal(ns.CurrentActionList(type)[0].sketchData, testData.data.sketchData, "Whiteboard Sketch Data validated");
                 ut.assert.equal(ns.CurrentActionList(type)[0].description, testData.data.description, "Whiteboard Text Data validated");
                 ut.assert.equal(ns.CurrentActionList(type)[0].duration, testData.data.duration, "Whiteboard Duration validated");
                 ut.assert.equal(ns.CurrentActionList(type)[0].PauseOnShow, testData.data.PauseOnShow, "Whiteboard PauseOnShow validated");
                 ut.assert.equal(ns.CurrentActionList(type)[0].whiteboardPosition, testData.data.whiteboardPosition, "Whiteboard whiteboardPosition validated");
                 ut.start();
             },
            function () { ut.assert.ok(false, "Creation of whiteboard failed"); });
        });
    },

      // To Check functionlity of Whiteboard init
      
       me.initWhiteboard=function(){
        module("Whiteboard.init");
        ut.asyncTest("whiteboard.init", function () {
            var whiteboardDatas = 0;
            var type = 'whiteboard';
            expect(1);
            ns.initWhiteboard();
            whiteboardDatas = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            ut.assert.equal(ns.CurrentActionList(type).length, whiteboardDatas, "Whiteboard initiated");
            ut.start();
        });
         },
         
           // To test Render Whiteboard functionality
           
           me.RenderWhiteboard=function(){
            module("Rendering Whiteboard");
            ut.asyncTest("ns.RenderWhiteboard", function () {
            var type = 'whiteboard';
             expect(2);
            setTimeout(function () {
             var whiteboardobj = ns.CurrentActionList(type);
              ns.RenderCurrentWhiteboard(whiteboardobj[0]);
                ut.assert.equal($("#" + testData.args.textcontent).text(), ns.CurrentActionList(type) [0].description, "Whiteboard text data Rendered successfully");
                ut.assert.equal($("#" + testData.args.WbimgOverlay)[0].src, ns.CurrentActionList(type) [0].sketchData, "Whiteboard sketch data Rendered successfully");
                ut.start();
            }, 1000);

        });
        },
         
          // Check functionlity of Editing Whiteboard
            me.editWhiteboard = function () {
             module("Editing whitebord");
        ut.asyncTest("Edit Whiteboard", function () {
            var whiteboardAction = 0;
            var type = 'whiteboard';
              testData = ns.testData.whiteboard; 
            expect(5);
          setTimeout(function () {
            whiteboardAction = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            ns.updateActionsList(type, testData.args.currentTime,testData.args.currentTime,
            {
            description: testData.editedData.description,
            sketchData:testData.editedData.sketchData,
            PauseOnShow:testData.editedData.PauseOnShow,
            whiteboardPosition:testData.editedData.whiteboardPosition,
            whiteboardAttributes: testData.editedData.whiteboardAttributes 
            },
                   { onSave: function () { },
                       onSaving: function () {
                       ut.assert.equal(ns.CurrentActionList(type).length, whiteboardAction, "whiteboard Action edited successfully");
                       ut.assert.equal(ns.CurrentActionList(type) [0].description,testData.editedData.description, "Whiteboard text data Edited successfully");
                       ut.assert.equal(ns.CurrentActionList(type) [0].PauseOnShow,testData.editedData.PauseOnShow, "Whiteboard PauseOnShow Edited successfully");
                       ut.assert.equal(ns.CurrentActionList(type) [0].whiteboardPosition,testData.editedData.whiteboardPosition, "Whiteboard whiteboardPosition Edited successfully");
                       ut.assert.equal(ns.CurrentActionList(type) [0].sketchData,testData.editedData.sketchData, "Whiteboard text data Edited successfully");
                   },
                                onError: function () { ut.assert.ok(false, "Editing Whiteboard is failed"); }
                            }
             );
            ut.start(); },1000);
        });
        }, 
         
        // Check functionlity of delete whiteboard action
        
        me.deleteWhiteboard = function () {
         module("Deleting Whiteboard");
        ut.asyncTest("Delete whiteborad", function () {
            expect(1);
            var whiteboardActions = ns.CurrentSrc().actions.length;
            ns.RemoveActionList(ns.CurrentSrc().actions[0].currentTime, {
                onSaving: function () {
                },
                onSave: function () {
                    ut.assert.equal(ns.CurrentSrc().actions.length, whiteboardActions - 1, "Whiteboard Action is  deleted successfully");
                    ut.start();
                },
                onError: function () { ut.assert.ok(false, "Deleting Whiteboard Action is failed"); }
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
        me.creatingWhiteboard();
        me.initWhiteboard();
        me.editWhiteboard();
        me.RenderWhiteboard();
        me.deleteWhiteboard();
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
            url: ViTag.config.wsWhiteboardTestServiceurl,
            type: "POST",
            data: { testData: data, Environment: "Test" },
            success: function (data) {
            },
            error: function (xhr, err) { }
        });
    };

})(window.ViTag = window.ViTag || {});