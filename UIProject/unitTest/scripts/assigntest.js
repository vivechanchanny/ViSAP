(function (ns) {
    ns.isFinished = null;
    var ut = ns.unitTest,
    me = {
        /// Set video source and timing 
        setVideoSrc: function (args) {
            ns.play(args.src);
            //window.console.debug("play here");
            ut.stop();
            setTimeout(function () {
                args.t = args.t ? args.t : 0;
                // args.d = args.d ? args.d : 0;
                ns.playAt(args.t);
                // window.console.debug("1 here");
                ut.start();
            }, 250);
        },
        vArgs: null
    };


    ///***********************************************************************************////
    ///*******************************test methods starts*******************************/////
    ///*********************************************************************************////

    // Assign video to groups/users
    me.runAssignVideo = function () {
        module("Assign video");
        ut.asyncTest("Assign video to group/users", function () {
            var testData = ns.testData.assign;
            ns.loadData(testData.args.mode);
            var groupList = 0;
           ut.start();
            ns.testData.assign.getGroups(
             function (data) {
                     groupList = JSON.parse(data); 
                     var mappedusers = groupList[0].mappedusers[0];
                     var groupid = groupList[0]._id;
                     var videoID= ViTag.source[0]._id;
                     var assignObj={assigneduser:[mappedusers],assignedgroup:[groupid],videoid:videoID}; //jason object for assignment
                     ViTagUI.AssigningVideo(assignObj,{
                        onSave:function(success){
                          ut.assert.ok(success, "Assinged Video successfully");
                        },
                        onError: function(){ut.assert.ok(false, "Assinged Video Failure");}
                     })

                 },
            function () {ut.assert.ok(false, "Getting grouplist fuilure");   });
        });


    }

    // Assign video to groups/users
    me.runUnAssignVideo = function () {
        module("Unassign video");
        ut.asyncTest("video Unassigning to group/users", function () {
            var testData = ns.testData.assign;
            ns.loadData(testData.args.mode);
            var groupList = 0;
           ut.start();
            ns.testData.assign.getGroups(
             function (data) {
                     groupList = JSON.parse(data); 
                     var mappedusers = groupList[0].mappedusers[0];
                     var user=[],group=[""];
                     var videoID= ViTag.source[0]._id;
                     var assignObj={assigneduser:user,assignedgroup:group,videoid:videoID}; //jason object for assignment
                     ViTagUI.AssigningVideo(assignObj,{
                        onSave:function(success){
                          ut.assert.ok(success, "Video Unassinged  successfully");
                        },
                        onError: function(){ut.assert.ok(false, "Video Unassinged Failure");}
                     })
                 },
            function () {ut.assert.ok(false, "Getting grouplist failure");   });
        });
    }


    ///*************************************************************************************************************//
    ///****************************** Test suits initialisation ****************************************************//
    ///*************************************************************************************************************//

    var testData;
    //run test suits for all kinds of videos
    ut.runTestSuits = function () {
        ViTag.getAuthToken();//to generate auth token.
        me.runAssignVideo();
        me.runUnAssignVideo();
        
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
            url: ViTag.config.wsAssignTestServiceurl,
            type: "POST",
            data: { testData: data, Environment: "Test" },
            success: function (data) {
            },
            error: function (xhr, err) { }
        });
    };

})(window.ViTag = window.ViTag || {});