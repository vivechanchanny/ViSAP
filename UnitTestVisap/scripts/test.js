(function (ns) {
    var ut = ns.unitTest,
    me = {
        /// Set video source and timing 
        setVideoSrc: function (args) {
            ns.play(args.src);
            ut.stop();
            setTimeout(function () {
                args.t = args.t ? args.t : 0;
                args.d = args.d ? args.d : 0;
                ns.playAt(args.t - args.d);
                ut.start();
            }, 250);
        },

        vArgs: null
    };

    /// Set default video arguments
    /// This method is guaranteed to be called once before any of the test methods are called
    ut.initClass = function () {

        ut.video.args = {};

        // Global video arguments
        var args = ut.video.args;
        args.annotations = "annotates";
        args.path = "http://pegtestdev.excelindia.com/VideoRepo/";
        args.manifest = ut.video.args.path + "manifest.js";
        args.dataPath = "../../data/sSDtaging.js";
        args.dataService = "http://" + location.host + "/visap/data.do";
        args.quesContainer = "tblQuesViTag";
        args.autoplay = true;
        args.username = "Instructor1";
        args.mode = false;

        // Unit test testdata
        ut.testData = {
            currentTime: 15,
            src0: 0, src1: 0,
            src2: 0, src3: 0,
            onAttrSave: null,
            tag: { d: "testTag", t: 15, ed: "editTestTag", et: 25 },
            ans: { ti: "testAnnotation", de: "testAnnotationDescription", t: 15, d: 10, eti: "testEditAnnotation", ede: "testEditAnnotationDescription", et: 25, ed: 5 },
            links: { n: "testTitle", u: "testURL", en: "testEditTitle", eu: "testEditURL" },
            quets: { q: "testQuestionTitle", o: ["option1", "option2", "option3"], a: 2, st: 5, r: "testVideoTag", eq: "testEditQuestionTitle", eo: ["editOption1", "editOption2", "editOption3"], ea: 1, est: 6, er: "testEditVideoTag" }
        };

        // Callback methods used to check the status of the video argument creation and deletion
        ut.onSaving = function () { ut.testData.onAttrSave = null; };
        ut.onSave = function () { ut.testData.onAttrSave = true; };
        ut.onError = function () { ut.testData.onAttrSave = false; };
    };

    // Grouping the tests
    module("Video Init");
    // To test video init method 
    ut.test("ViTag.init", function () {
        me.vArgs = ns.init(ut.video.args)

        // Expect three assert
        expect(3);
        // Test will stop for movement
        ut.stop();
        var c = me.vArgs.ctrl, st = setTimeout(function () {
            ut.assert.ok(ns.source, "Repository source is set");
            me.testVideoList();
            // Test will start again
            ut.start();
        }, 500);

        if (!$.isEmptyObject(c)) {
            // Checking is video tag exits 
            ut.assert.equal(c.$video ? c.$video.length : 0, 1, "Video tag exits");
            // Checking is video container exits 
            ut.assert.equal(c.$videoContainer ? c.$videoContainer.length : 0, 1, "Video container exits");
        }
        else ut.assert.ok(!$.isEmptyObject(c), "Video controls not set");

    });

    // Checking is all video title are listed
    me.testVideoList = function () {
        ut.test("ViTag.me.listVideos", function () {
            ut.assert.equal(me.vArgs.ctrl.$menu.find("a").length, ns.source.length, "All video titles are listed");
        });
    };



    module("Play video");
    // Test play functionality
    ut.test("ViTag.play", function () {
        var src = ns.source[ut.testData.src2].src;
        ns.play(src);
        expect(2);
        ut.stop();
        setTimeout(function () {
            // Check video control available 
            ut.assert.ok(me.vArgs.ctrl.video.src.indexOf(src) > -1, "Selected video is playing");
            // Check video control container available
            ut.assert.ok(ns.CurrentSrc().src.indexOf(src) > -1, "Selected video source is set");
            me.testTagsList();
            me.testLinksList();
            me.testAnnotatesCtr();
            me.testSketcherCtr();
            me.testTester();
            ut.start();
        }, 500);
    });

    // Test playAt functionality
    ut.asyncTest("ViTag.playAt", function () {
        setTimeout(function () {
            me.setVideoSrc({ src: ns.source[ut.testData.src1].src, t: ut.testData.currentTime, d: 0 });
            ut.stop();
            setTimeout(function () {
                ut.assert.equal(Math.floor(me.vArgs.ctrl.video.currentTime), ut.testData.currentTime, "Video playing from given time");
                ut.start();
            }, 250);
            ut.start();
        }, 250);
    });

    // Check the source related tags list
    me.testTagsList = function () {
        ut.asyncTest("ViTag.RenderCurrentTags", function () {
            setTimeout(function () {
                var t = ns.CurrentTags();
                ut.assert.equal(t ? t.length : 0, me.vArgs.ctrl.$tags.find("a").length, "All Tags are rendered");
                ut.start();
            }, 250);
        });
    };

    // Check the source related links list
    me.testLinksList = function () {
        ut.asyncTest("ViTag.RenderCurrentLinks", function () {
            setTimeout(function () {
                var l = ns.CurrentLinks();
                ut.assert.equal(l ? l.length : 0, me.vArgs.ctrl.$links.find("a").length, "All links are rendered");
                ut.start();
            }, 250);
        });
    };

    // Check Annotator container 
    me.testAnnotatesCtr = function () {
        // TODO: Checking only annotates controls
        ut.test("ViTag.annotator.init", function () {
            ut.assert.equal(me.vArgs.ctrl.$annotates.length, 1, "Annotates enabled");
        });
    };

    // Check Overlay container 
    me.testSketcherCtr = function () {
        // TODO: Checking only overlay controls
        ut.test("ViTag.sketcher.init", function () {
            ut.assert.equal(me.vArgs.ctrl.$imgOverLays.length, 1, "Sketches enabled");
        });
    };

    // Check Question container 
    me.testTester = function () {
        // TODO: Checking only question exists
        ut.asyncTest("ViTag.test.init", function () {
            setTimeout(function () {
                me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: 0, d: 0 });
                ut.assert.ok(!$.isEmptyObject(ns.CurrenQuestList()), "Questions are exits");
                ut.start();
            }, 250);
        });
    };

    module("Video Attributes");
    // To test annotation functionality
    ut.asyncTest("ViTag.me.RenderAnnotate", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: 0, d: 0 });
        setTimeout(function () {
            // To set player duration based on annotation timing
            if (ns.CurrentAnnotList())
                me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: ns.CurrentAnnotList()[0].StartTime, d: 2 });
            ut.start();
        }, 500);
        ut.stop();
        setTimeout(function () {
            // Checking the annotation text.
            ut.assert.equal($("#" + ut.video.args.annotations).text(), "Annotations: " + ns.CurrentAnnotList()[0].title + " " + ns.CurrentAnnotList()[0].description, "Display annotate pass")
            ut.start();
        }, 3000);
    });

    // To test sketch functionality
    ut.asyncTest("ViTag.sketcher.begin", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: 0, d: 0 });
        setTimeout(function () {
            // To set player duration based on overlay timing
            if (ns.CurrentSketchList())
                me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: ns.CurrentSketchList()[0].StartTime, d: 2 });
            ut.start();
        }, 500);
        ut.stop();
        setTimeout(function () {
            // Checking the overlay display
            ut.assert.ok(me.vArgs.ctrl.$imgOverLays.is(":visible"), "Showing overlay on video player");
            ut.start();
        }, 2500);
    });

    // To test show question functionality
    ut.asyncTest("ViTag.test.showQues", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: 0, d: 0 });
        setTimeout(function () {
            // To set player duration based on question timing
            if (ns.CurrenQuestList())
                me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: ns.CurrenQuestList()[0].StartTime, d: 2 });
            ut.start();
        }, 500);
        ut.stop();
        setTimeout(function () {
            // Checking is proper question displaying or not
            var q = $("#" + ut.video.args.quesContainer);
            ut.assert.ok(q.is(":visible"), "Showing question on video player");
            ut.assert.ok(q.text().indexOf(ns.CurrenQuestList()[0].qtitle) > -1, "Showing right question");
            $.unblockUI();
            ut.start();
        }, 2500);
    });

    module("Video Edit mode");
    /// Before run edit init must run default init, once run default init me.vArgs will set
    ut.test("ViTag.initEditing", function () {
        me.vArgs.args.dataPath = "data/user1.data.js";
        // All default args will merge
        $.extend(me.vArgs, ViTag.initEditing(me.vArgs));
        ut.assert.ok(me.vArgs.ctrl.$editContainer ? me.vArgs.ctrl.$editContainer.length : 0 > 0, "Edit mode enabled");
        ut.assert.ok(me.vArgs.ctrl.$tags ? me.vArgs.ctrl.$tags.length : 0 > 0, "Tags are enabled for Add and Edit");
        ut.assert.ok(me.vArgs.ctrl.$cmtTitle ? me.vArgs.ctrl.$cmtTitle.length : 0 > 0, "Annotates are enabled for Add and Edit");
        ut.assert.ok(me.vArgs.ctrl.$linkName ? me.vArgs.ctrl.$linkName.length : 0 > 0, "Tags are enabled for Add and Edit");
        ut.assert.ok(me.vArgs.ctrl.$qTitle ? me.vArgs.ctrl.$qTitle.length : 0 > 0, "Tags are enabled for Add and Edit");
    });

    /// Pause Video and check is edit tools enabled
    //ut.test("Pause Video", function () {
    //    me.setVideoSrc({ src: ns.source[ut.testData.src2].src, t: 0, d: 0 });
    //    me.vArgs.ctrl.video.pause();
    //    ut.stop();
    //    setTimeout(function () {
    //        ut.assert.ok(me.vArgs.ctrl.$editContainer.is(":visible"), "Edit tools enabled");
    //        ut.start();
    //    }, 3000);
    //});

    /// Pause Video and check is edit tools enabled
    ut.test("Play Video", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src2].src, t: 0, d: 0 });
        me.vArgs.ctrl.video.play();
        ut.stop();
        setTimeout(function () {
            ut.assert.ok(me.vArgs.ctrl.$editContainer.is(":hidden"), "Edit tools enabled");
            ut.start();
        }, 3000);
    });

    // Check functionlity of create tag
    ut.asyncTest("Create tag", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src1].src, t: ut.testData.tag.t, d: 0 });

        var totalTags = 0;
        setTimeout(function () {
            totalTags = ns.CurrentTags() ? ns.CurrentTags().length : 0;
            // Saving tag test data
            ns.AddAndSaveTag({ d: ut.testData.tag.d, t: ut.testData.tag.t }, ut.onSaving, ut.onSave, ut.onError);
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentTags().length, totalTags + 1, "Tag created successfully");
            else
                ut.assert.ok(false, "Save tag is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of edit tag
    ut.asyncTest("Edit tag", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src1].src, t: 0, d: 0 });

        var totalTags = 0;
        setTimeout(function () {
            totalTags = ns.CurrentTags() ? ns.CurrentTags().length : 0;
            // Remove tag first 
            ns.RemoveTag(ut.testData.tag.d);
            // Using same tag id create new tag with edited value
            ns.AddAndSaveTag({ d: ut.testData.tag.ed, t: ut.testData.tag.et }, ut.onSaving, ut.onSave, ut.onError);
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentTags().length, totalTags, "Tag edited successfully");
            else
                ut.assert.ok(false, "Edit tag is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of remove tag
    ut.asyncTest("Remove tag", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src1].src, t: 0, d: 0 });

        var totalTags = 0;
        setTimeout(function () {
            totalTags = ns.CurrentTags() ? ns.CurrentTags().length : 0;
            // Remove tag using time
            ns.RemoveTag(ut.testData.tag.ed, { onSaving: ut.onSaving, onSave: ut.onSave, onError: ut.onError });
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentTags().length, totalTags - 1, "Tag removed successfully");
            else
                ut.assert.ok(false, "Remove tag is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of create Annotation

    ut.asyncTest("Create Annotation", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: ut.testData.ans.t, d: 0 });

        var totalAns = 0;
        setTimeout(function () {
            totalAns = ns.CurrentAnnotList() ? ns.CurrentAnnotList().length : 0;
            // Save annotation with test data
            //ans: { ti: "testAnnotation", de: "testAnnotationDescription", t: 15, d: 10, eti: "testEditAnnotation", ede: "testEditAnnotationDescription", et: 25, ed: 5 },
            ns.AddAndSaveAnnotate({ ti: ut.testData.ans.ti, de: ut.testData.ans.de, t: ut.testData.ans.t, d: ut.testData.ans.d }, ut.onSaving, ut.onSave, ut.onError);
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentAnnotList().length, totalAns + 1, "Annotate created successfully");
            else
                ut.assert.ok(false, "Save Annotate is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });
    // Check functionlity of edit Annotation
    ut.asyncTest("Edit Annotation", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: ut.testData.ans.t, d: 0 });
        var type = 'annotate';
        var totalAns = 0;
        setTimeout(function () {
            totalAns = ns.CurrentAnnotList() ? ns.CurrentAnnotList().length : 0;
            //ns.updateAnnotation(ut.testData.ans.t, ut.testData.ans.t, ut.testData.ans.eti, ut.testData.ans.ede, { onSaving: ut.onSaving, onSave: ut.onSave, onError: ut.onError });
            ns.updateActionsList(type, ut.testData.ans.t, ut.testData.ans.t, { ti: ut.testData.ans.eti, de: ut.testData.ans.ede }, { onSaving: ut.onSaving, onSave: ut.onSave, onError: ut.onError });

            ut.start();
        }, 250);
        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentAnnotList().length, totalAns, "Annotate edited successfully");
            else
                ut.assert.ok(false, "Edit Annotate is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of delete Annotation
    ut.asyncTest("Delete Annotation", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src0].src, t: 0, d: 0 });

        var totalAns = 0;
        setTimeout(function () {
            totalAns = ns.CurrentAnnotList() ? ns.CurrentAnnotList().length : 0;
            // Remove annotation
            ns.RemoveAction(ut.testData.ans.t, ut.testData.ans.t, { onSaving: ut.onSaving, onSave: ut.onSave, onError: ut.onError });
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentAnnotList().length, totalAns - 1, "Annotate deleted successfully");
            else
                ut.assert.ok(false, "Delete Annotate is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of create Link
    ut.asyncTest("Create Link", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src3].src, t: 0, d: 0 });

        var totalLinks = 0;
        setTimeout(function () {
            totalLinks = ns.CurrentLinks() ? ns.CurrentLinks().length : 0;
            // Save link using test data
            ns.AddLinks({ n: ut.testData.links.n, u: ut.testData.links.u }, ut.onSaving, ut.onSave, ut.onError);
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentLinks().length, totalLinks + 1, "Link created successfully");
            else
                ut.assert.ok(false, "Save Link is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of edit Link
    ut.asyncTest("Edit Link", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src3].src, t: 0, d: 0 });

        var totalLinks = 0;
        setTimeout(function () {
            totalLinks = ns.CurrentLinks() ? ns.CurrentLinks().length : 0;
            // Remove link first
            ns.RemoveLink(ut.testData.links.n);
            // Then create new link with existing id 
            ns.AddLinks({ n: ut.testData.links.en, u: ut.testData.links.eu }, ut.onSaving, ut.onSave, ut.onError);
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrentLinks().length, totalLinks, "Link edited successfully");
            else
                ut.assert.ok(false, "Edit Link is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of delete Link
    ut.asyncTest("Delete Link", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src3].src, t: 0, d: 0 });

        var totalLinks = 0;
        setTimeout(function () {
            totalLinks = ns.CurrentLinks() ? ns.CurrentLinks().length : 0;
            // Remove link using link name 
            ns.RemoveLink(ut.testData.links.en, { onSaving: ut.onSaving, onSave: ut.onSave, onError: ut.onError });
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal((ns.CurrentLinks() ? ns.CurrentLinks().length : 0), totalLinks - 1, "Link deleted successfully");
            else
                ut.assert.ok(false, "Delete Link is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Get next question from question list
    me.getQuestionID = function () {
        var id = 0;
        if (ns.CurrenQuestList() && ns.CurrenQuestList() != "") {
            ns.CurrenQuestList().sort(function (a, b) { return a.id - b.id });
            id = ns.CurrenQuestList()[ns.CurrenQuestList().length - 1].id;
        }
        return id;
    };

    // Check functionlity of create question
    ut.asyncTest("Create Question", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src3].src, t: 0, d: 0 });

        var totalQues = 0, q = ut.testData.quets;

        setTimeout(function () {
            // Create question with using test data
            totalQues = ns.CurrenQuestList() ? ns.CurrenQuestList().length : 0;
            ns.question.add({ "id": me.getQuestionID() + 1, "q": q.q, "o": q.o, "a": q.a, "r": q.r }, ut.onSaving, ut.onSave, ut.onError);
            ut.start();
        }, 250);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrenQuestList().length, totalQues + 1, "Question created successfully");
            else
                ut.assert.ok(false, "Save Question is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of edit question
    ut.asyncTest("Edit Question", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src3].src, t: 0, d: 0 });
        var totalQues = 0, q = ut.testData.quets;
        var type = "question"
        setTimeout(function () {
            totalQues = ns.CurrenQuestList() ? ns.CurrenQuestList().length : 0;
            // In case of question edit previous question will get delete and new question will be added with same ID
            ns.updateActionsList(type, 0, 0, { "id": me.getQuestionID() + 1, "q": q.eq, "o": q.eo, "a": q.ea, "st": q.est, "r": q.er }, { onSaving: ut.onSaving, onSave: ut.onSave, onError: ut.onError });
            ut.start();
        }, 1000);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrenQuestList().length, totalQues, "Question edited successfully");
            else
                ut.assert.ok(false, "Edit Question is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 2000);
    });

    // Check functionlity of delete question
    ut.asyncTest("Delete Question", function () {
        me.setVideoSrc({ src: ns.source[ut.testData.src3].src, t: 0, d: 0 });

        var totalQues = 0, q = ut.testData.quets;

        setTimeout(function () {
            totalQues = ns.CurrenQuestList() ? ns.CurrenQuestList().length : 0;
            // Delete question from list
            ns.RemoveAction(0, 0, { onSaving: ut.onSaving, onSave: ut.onSave, onError: ut.onError });
            ut.start();
        }, 2000);

        ut.stop();
        setTimeout(function () {
            // Below variable will set based on ajax call in callback methods
            if (ut.testData.onAttrSave)
                ut.assert.equal(ns.CurrenQuestList().length, totalQues - 1, "Question deleted successfully");
            else
                ut.assert.ok(false, "Delete Question is failed");
            ut.testData.onAttrSave = null;
            ut.start();
        }, 4000);
    });

    //junit report genertion and results which has to be stored in db
    QUnit.jUnitReport = function (report) {
        console.log(report.xml);
        console.log(report.results);
        //saveTestData(report);
        saveXmlTestData(report);
    };

    function saveXmlTestData(report) {
        var data = report.xml;
        $.ajax({
            url: "data.do",
            type: "POST",
            data: { testData: data, Environment: "Test" },
            success: function (data) {
            },
            error: function (xhr, err) { }
        });
    };

})(window.ViTag = window.ViTag || {});