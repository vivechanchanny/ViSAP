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

    // Upload video with all header information
    me.runUploadVideo = function () {
        module("Upload Service");
        ut.asyncTest("Uplaod new video", function () {
            var testData = ns.testData.upload;
            ns.loadData(testData.args.mode, testData.args.username);
            var totalVideos = 0;
            totalVideos = ns.source.length;
            expect(3);
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs
            testData.data.category = [escape(testData.data.category)];
            testData.data.snap= ns.testData.collaboration.tempSketch;
            ns.testData.upload.addVideo(testData.data,
            function () {
                ns.loadData(testData.args.mode, testData.args.username);
                ut.assert.equal(ns.source.length, totalVideos + 1, "Video uploaded successfully");
                ut.assert.equal(ns.source[0].title, testData.data.title, "Title of the video validated");
                ut.assert.equal(ns.source[0].desc, testData.data.desc, "description of the video validated");
                ut.start();
            },
            function () { ut.assert.ok(false, "Video upload failed"); });
        });
    }

    // publish functions testing
    me.runPublishVideo = function () {
        module("Publish Service");
        ut.asyncTest("Publish video", function () {

            //get the myspace video to get the count 
            var testData = ns.testData.myspace;
            var totalVideos = 0;
            // me.vArgs = ns.init(testData.args)
            ns.loadData(testData.args.mode, testData.args.username);
            totalVideos = ns.source.length;

            //get the collabration video to publish
            var publishdata = ns.testData.collaboration;
            ns.loadData(publishdata.args.mode, publishdata.args.username);

            publishdata = ns.source[0];
            //publishdata.t= ns.testData.collaboration.tempSketch;
            ns.testData.publish.publishVideo(publishdata,
            function () {
                ns.loadData(testData.args.mode, testData.args.username);
                ut.assert.equal(ns.source.length, totalVideos + 1, "Video Published successfully");
                ut.assert.equal(ns.source[0].title, publishdata.title, "Title of the video validated");
                ut.assert.equal(ns.source[0].desc, publishdata.desc, "description of the video validated");
                ut.start();
            },
            function () { ut.assert.ok(false, "Video publish failed"); });
        });
    }


    // List of all categories to be shown in thumbnail list
    me.runCategoryView = function () {
        // Check the categories are listed 
        module("View categories");
        ut.asyncTest("Categories Thumbnails", function () {
            var testdata = ns.testData.toc;
            ns.loadData(testdata.args.mode, testdata.args.username);
            ViTagUI.getCategoryView(ns.source);
            ut.assert.ok($("#" + testdata.args.thumbnailView).find("a").length > 0, "Categories are listed");
            ut.start();
        });
    };


    // get the categories which are uploaded
    me.runCategorylist = function () {
        module("Category Service");
        ut.asyncTest("Get category list", function () {
            var testData = ns.testData.upload;
            var category = decodeURIComponent(testData.data.category);
            // get the total category list  from db
            ns.testData.toc.getcategory(
                    function (data) {
                        servicedata = JSON.parse(data);
                        var decodevalue = decodeURIComponent(servicedata.Categories[0] + "," + servicedata.Categories[1]);
                        ut.assert.equal(category, decodevalue, "category of the video validated");
                    },
                 function () { ut.assert.ok(false, "Category service failed"); });
            ut.start();

        });
    }

    // toc are checked
    me.runTocView = function () {
        module("View TOC");
        ut.asyncTest("TOC", function () {
            var testdata = ns.testData.toc;
            ns.loadData(testdata.args.mode, testdata.args.username);
            ViTagUI.populateSection(ns.source);
            var contents = $("#" + testdata.args.accordion).text();
            ut.assert.ok(contents.indexOf(ns.source[0].title) > -1, "TOC  listed");
            ut.start();
        });
    };

    me.deleteVideo = function () {
     setTimeout(function () {
          var testData = ns.testData.upload;
	      ns.loadData(testData.args.mode, testData.args.username);     
         if(ns.source.length > 0 )         
         ns.calldelete(ns.source[0]._id,function () { },function () { });
      },1500);
      
     setTimeout(function () {
          var testData = ns.testData.myspace;
	      ns.loadData(testData.args.mode, testData.args.username);   
          if(ns.source.length > 0 )
          ns.calldelete(ns.source[0]._id,function () { },function () { });
      },1500);
        
    }


    ///*************************************************************************************************************//
    ///****************************** Test suits initialisation ****************************************************//
    ///*************************************************************************************************************//


    var testData;
    //run test suits for all kinds of videos
    ut.runTestSuits = function () {
        ViTag.getAuthToken();//to generate auth token.
        me.runUploadVideo();
        me.runPublishVideo();
        me.runCategoryView();
        me.runCategorylist();
        me.runTocView();
        me.deleteVideo();
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
            url: ViTag.config.wsTocTestServiceurl,
            type: "POST",
            data: { testData: data, Environment: "Test" },
            success: function (data) {
            },
            error: function (xhr, err) { }
        });
    };

})(window.ViTag = window.ViTag || {});