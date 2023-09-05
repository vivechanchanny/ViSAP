
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

    // Based on the test data and type of videos are neeeds to test then this method is invoked
    me.callTestSuits = function (testData) {
        //testData = testData;

        module(testData.args.name);
        ut.test("ViTag.init", function () {
        
           ViTag.visapLocalize();//localization of strings.
            me.vArgs = ns.init(testData.args)
            // Expect three assert
            // expect(3);
            // Test will stop for movement
            ut.stop();
            var c = me.vArgs.ctrl, st = setTimeout(function () {
                ut.assert.ok(ns.source, "Repository source is set ");
                ut.start();
            }, 500);

            if (!$.isEmptyObject(c)) {
                // Checking is video tag exits 
                ut.assert.equal(c.$video ? c.$video.length : 0, 1, "Video tag exits ");
                // Checking is video container exits 
                ut.assert.equal(c.$videoContainer ? c.$videoContainer.length : 0, 1, "Video container exits ");
            }
            else ut.assert.ok(!$.isEmptyObject(c), "Video controls not set");

        });

        // Test play functionality
        ut.test("ViTag.play ", function () {
            var src = ns.source[testData.src0]._id;
            var filesrc = ns.source[testData.src0].src;
            ns.play(src);
            expect(2);
            ut.stop();
            setTimeout(function () {
                if (ns.source[testData.src0].sourcetype == 0 || ns.source[testData.src0].sourcetype == 3) {
                    // Check video control available 
                    ut.assert.ok(me.vArgs.ctrl.video.src.indexOf(filesrc) > -1, "Selected video is playing");
                    // Check video control container available
                    ut.assert.ok(ns.CurrentSrc().src.indexOf(filesrc) > -1, "Selected video source is set");
                }
                else {
                    // Check video control available 
                    ut.assert.ok(me.vArgs.ctrl.video.src.indexOf(filesrc[0].data.srcTimeline) > -1, "Selected video is playing");
                    // Check video control container available
                    ut.assert.ok(ns.CurrentSrc().src[0].data.srcTimeline.indexOf(filesrc[0].data.srcTimeline) > -1, "Selected video source is set");
                }
                ut.start();
            }, 500);
        });

        //Test CurrentTime of the video 
        ut.asyncTest("ViTag.getCurrentTime", function () {
            setTimeout(function () {
                me.setVideoSrc({ src: ns.source[testData.src0]._id, t: testData.currentTime, srctype: ns.source[testData.src0].sourcetype });
                ut.stop();
                setTimeout(function () {
                    ut.assert.equal(Math.floor(ns.getCurrentTime()), testData.currentTime, "given time matched with the currentTime of the video");
                    ut.start();
                }, 250);
                ut.start();
            }, 250);
        });

        /// Video duration calculation and tested
        ut.test("Get Video duration", function () {
            // set video attr:play to get duration
            if (ns.source[testData.src0].sourcetype == 0)
                testData.totalDuration = me.vArgs.ctrl.video.duration;
            else if (ns.source[testData.src0].sourcetype == 2) {

                var timelineTotalDuration = 0;
                for (var i = 0; i < ns.CurrentSrc().src.length; i++) {
                    timelineTotalDuration = (timelineTotalDuration + ns.CurrentSrc().src[i].data.duration); //to get total duration
                }
                testData.totalDuration = timelineTotalDuration;
            }
            var duration = ns.getDuration();
            ut.assert.equal(Math.floor(testData.totalDuration), duration, "duation is valid");
        });


        /// Before run edit init must run default init, once run default init me.vArgs will set
        ut.test("ViTag.initEditing", function () {
            // All default args will merge
            $.extend(me.vArgs, ViTag.initEditing(me.vArgs));
            ut.assert.ok(me.vArgs.ctrl.$editContainer ? me.vArgs.ctrl.$editContainer.length : 0 > 0, "Edit mode enabled");
            ut.assert.ok(me.vArgs.ctrl.$tags ? me.vArgs.ctrl.$tags.length : 0 > 0, "Tags are enabled for Add and Edit");
            ut.assert.ok(me.vArgs.ctrl.$cmtTitle ? me.vArgs.ctrl.$cmtTitle.length : 0 > 0, "Annotates are enabled for Add and Edit");
            ut.assert.ok(me.vArgs.ctrl.$linkName ? me.vArgs.ctrl.$linkName.length : 0 > 0, "Tags are enabled for Add and Edit");
            ut.assert.ok(me.vArgs.ctrl.$qTitle ? me.vArgs.ctrl.$qTitle.length : 0 > 0, "Questions are enabled for Add and Edit");
        });


        //when the video is paused check editpanal is visible or not
        ut.test("ViTag.pause", function () {
            ut.stop();
            setTimeout(function () {
                ns.pause();
                ut.assert.ok(me.vArgs.ctrl.video.paused, "Video is paused");
                ut.start();
            }, 500);
        });

        //Test Time format in hh:mm:ss : pass seconds and get the proper timeformat in hh:mm:ss
        ut.asyncTest("ViTag.getTimeFormat", function () {
            ut.assert.equal(ns.getTimeFormat(testData.currentTime), testData.currentTimeinformat, "Time format is validated");
            ut.start();
        });


        //Pass hours,minutes,seconds and get only seconds
        ut.asyncTest("ViTag.getTimeInSeconds", function () {
            var h = testData.formatHour, m = testData.formatMinutes, sec = testData.currentTime;
            ut.assert.equal(ns.getTimeInSeconds(h, m, sec), testData.currentTime, "time in seconds is validated");
            ut.start();
        });


        // Check the source related tags list
        ut.asyncTest("ViTag.CurrentTags", function () {
            var t = ns.CurrentTags();
            ut.assert.equal(t ? t.length : 0, $("#" + testData.args.tagslist).find("a").length, "All Tags are rendered");
            ut.start();

        });


        // Check functionlity of create tag
        ut.asyncTest("Create tag", function () {
            me.setVideoSrc({ src: ns.source[testData.src0]._id, t: testData.tag.t, srctype: ns.source[testData.src0].sourcetype });
            var totalTags = 0;
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs

            totalTags = ns.CurrentTags() ? ns.CurrentTags().length : 0;
            // Saving tag test data
            ns.AddAndSaveTag({ d: testData.tag.d, t: testData.tag.t },
                    function () { },
                    function () {
                        ut.assert.equal(ns.CurrentTags().length, totalTags + 1, "Tag created successfully");
                        ut.assert.equal(ns.CurrentTags()[0].d, testData.tag.d, "Tags  Data validated");
                        ut.start();
                    },
                    function () { ut.assert.ok(false, "Save tag is failed"); }
                    );

        });

        // Check functionlity of edit tag
        ut.asyncTest("Edit tag", function () {
            me.setVideoSrc({ src: ns.source[testData.src0]._id, t: testData.tag.t, srctype: ns.source[testData.src0].sourcetype });
            var totalTags = 0;
            expect(2);
            totalTags = ns.CurrentTags() ? ns.CurrentTags().length : 0;
            // Remove tag first 
            ns.RemoveTag(testData.tag.d);
            // Using same tag id create new tag with edited value
            ns.AddAndSaveTag({ d: testData.tag.ed, t: testData.tag.et },
                    function () { },
                    function () {
                        ut.assert.equal(ns.CurrentTags().length, totalTags, "Tag edited successfully");
                        ut.assert.equal(ns.CurrentTags()[0].d, testData.tag.ed, "Tags Data validated");
                        ut.start();
                    },
                    function () { ut.assert.ok(false, "Edit tag is failed"); }
                );

        });

        // saved tag should be avilable for edit
        ut.asyncTest("Saved Tags in Edit mode", function () {
            ns.EditTags(testData.tag.et, testData.tag.ed);
            ut.assert.equal(me.vArgs.ctrl.$tag.val(), testData.tag.ed, "saved tag is visible in edit mode");
            ut.start();
        });

        /// stop Video and check edit panel is hidden
        ut.test("Disable Editpanel", function () {
            ns.disabelEditPanel();
            ut.stop();
            ut.assert.ok(me.vArgs.ctrl.$editContainer.is(":hidden"), "Edit tools disabled");
            ut.start();
        });


        // Check Annotator initaialisation 
        ut.test("Annotation control initialised", function () {
            ut.assert.equal(me.vArgs.ctrl.$annotates.length, 1, "Annotates enabled");
        });

        // Check functionlity of create Annotation
        ut.asyncTest("Create Annotation", function () {
            me.setVideoSrc({ src: ns.source[testData.src0]._id, t: testData.ans.t, srctype: ns.source[testData.src0].sourcetype });
            expect(2);
            var totalAns = 0;
            var type = "annotation";
            totalAns = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            ns.AddAndSaveAnnotate({ ti: testData.ans.ti, de: testData.ans.de, t: testData.ans.t, d: testData.ans.d, AnnotationAttributes: { left: "50px", top: "200px"} },
             function () { },
             function () {
                 ut.assert.equal(ns.CurrentActionList(type).length, totalAns + 1, "Annotate created successfully");
                 ut.assert.equal(ns.CurrentActionList(type)[0].title, testData.ans.ti, "Annotation Data validated");
                 ut.start();
             },
             function () { ut.assert.ok(false, "Annotate creation failed"); });

        });

        // Check functionlity of annotator init
        ut.asyncTest("annotator.init", function () {
            var totalannotations = 0;
            var type = "annotation";
            ns.initAnnotator();
            totalannotations = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            ut.assert.equal(ns.CurrentActionList(type).length, totalannotations, "Annotations initiated");
            ut.start();
        });


        // To test annotation functionality
        ut.asyncTest("ns.RenderAnnotate", function () {
            var type = "annotation";
            var annoateobj = ns.CurrentActionList(type);
            ns.RenderCurrentAnnotates(annoateobj[0]);
            // setTimeout(function () {
            //     ut.assert.equal($("#" + testData.args.annotations).text(), " " + ns.CurrentActionList(type)[0].title + " " + ns.CurrentActionList(type)[0].description, "Display annotate pass")
            //     ut.start();
            // }, 2000);
         ut.assert.equal(me.vArgs.ctrl.$annotates.length, 1, "Display annotate pass");
         ut.start();

        });


        // Check functionlity of edit Annotation
        ut.asyncTest("Edit Annotation", function () {
            var totalHotspot = 0;
            var type = 'annotation';
            var totalAns = 0; 
            expect(2);
            totalAns = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            ns.updateActionsList(type, testData.ans.t, testData.ans.t, { ti: testData.ans.eti, de: testData.ans.ede,duration: testData.ans.d, AnnotationAttributes: { left: "50px", top: "200px"} },
                            { onSave: function () { },
                                onSaving: function () {
                                    ut.assert.equal(ns.CurrentActionList(type).length, totalAns, "Annotate edited successfully");
                                    ut.assert.equal(ns.CurrentActionList(type)[0].title, testData.ans.eti, "Edited Annotation Data validated");
                                },
                                onError: function () { ut.assert.ok(false, "Edit Annotate is failed"); }
                            }
             );
            ut.start();
        });

        // saved tag should be avilable for edit
        ut.asyncTest("Saved Annotations in Edit mode", function () {
             
             var editAnnotParams ={
               title: testData.ans.eti, description: testData.ans.ede,
               sTime: testData.ans.t, duration: testData.ans.d,
               PausedTime: testData.ans.t, Left: testData.ans.left, Top: testData.ans.top,
               Width: testData.ans.width, Height: testData.ans.height,
               PauseOnShow :testData.ans.PauseOnShow
            };
            ns.EditAnnotate(editAnnotParams);
            ut.assert.equal(me.vArgs.ctrl.$cmtTitle.val(), testData.ans.eti, "saved annotation is visible in edit mode");
            ut.start();
        });

        // Check functionlity of creation of  Hotspot
        ut.asyncTest("Create Hotspot", function () {
            var type = "hotspot";
            var totalHotspot = 0;
            totalHotspot = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs
            // Save hotspot with test data
            expect(2);
            ns.AddAndSaveHotspot({ ti: testData.hotspot.ti, de: testData.hotspot.de, t: testData.hotspot.t, d: testData.hotspot.d, showOnpause: testData.hotspot.showOnpause, hotspotAttributes: { left: "150px", top: "200px"} },
              function () { },
              function () {
                  ut.assert.equal(ns.CurrentActionList(type).length, totalHotspot + 1, "Hotspot created successfully");
                  ut.assert.equal(ns.CurrentActionList(type)[0].title, testData.hotspot.ti, "Hotspot Data validated");
                  ut.start();
              },
              function () { ut.assert.ok(false, "Hotspot creation is failed"); }
             );

        });

        // To test hotspot render functionality
        ut.asyncTest("RenderHotspot", function () {
            var type = "hotspot";
            var hotspotObj = ns.CurrentActionList(type);
            //ns.playAt(hotspotObj[0].StartTime -1);
            ns.RenderCurrentHotspot(hotspotObj[0]);
            //ut.stop();
            //  alert(me.vArgs.ctrl.$hotspotCircle.is(":visible"));
            ut.assert.ok(me.vArgs.ctrl.$hotspotCircle.is(":visible"), "Hotspot shown successfully ");
            ut.start();
        });

        // To test hotspot nitialisation functionality
        ut.asyncTest("hotspot.init", function () {
            var totalHotspot = 0;
            var type = "hotspot";
            ns.initHotspot();
            totalHotspot = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            ut.assert.equal(ns.CurrentActionList(type).length, totalHotspot, "Hotspot initiated");
            ut.start();
        });


        // To test hotspot dialogue box and its contents are rendered
        ut.asyncTest("PreviewHotspot", function () {
            var type = "hotspot";
            var hotspotObj = ns.CurrentActionList(type);
            ns.previewHotspot(hotspotObj[0]);
            ut.assert.equal($("#" + testData.args.hotspotDialogueBox).text(), "X  " + ns.CurrentActionList(type)[0].title + ' ' + ns.CurrentActionList(type)[0].description, "Hotspot previewed successfully")
            ut.start();
        });

        //saved hotspot should be avilable for edit
        ut.asyncTest("Saved hotspot in Edit mode", function () {
            // me.setVideoSrc({ src: ns.source[testData.src0]._id, t: 0, d: 0, srctype: ns.source[testData.src0].sourcetype });
            ns.EditHotspot(testData.hotspot.ti, testData.hotspot.de, testData.hotspot.t, testData.hotspot.d, testData.hotspot.t, testData.hotspot.showOnpause);
            ut.assert.equal(me.vArgs.ctrl.$hotspotTittle.val(), testData.hotspot.ti, "saved hotspot is visible in edit mode");
            ut.start();
        });

        // Check Overlay is initaiated  
        ut.test("Sketch overlay initialised", function () {
            ut.assert.equal(me.vArgs.ctrl.$imgOverLays.length, 1, "Sketches enabled");
        });

        // Check functionlity of sketches
        ut.asyncTest("Create Sketches", function () {
            var totalsketches = 0;
            var type = "sketch";
            expect(2);
            totalsketches = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs
            // Save sketches with test data
            ns.AddOverlay({ t: testData.sketch.time, i: testData.tempSketch, d: testData.sketch.duration },
             function () { },
             function () {
                 ut.assert.equal(ns.CurrentActionList(type).length, totalsketches + 1, "Sketches created successfully");
                 ut.assert.equal(ns.CurrentActionList(type)[0].img, testData.tempSketch, "Sketch Data validated");
                 ut.start();
             },
             function () { ut.assert.ok(false, "sketch creation failed"); });


        });

        // To test sketch functionality
        ut.asyncTest("Render sketches", function () {
            setTimeout(function () {
            
                var type = "sketch";
                // To set player duration based on overlay timing
                if (ns.CurrentActionList(type))
                    me.setVideoSrc({ src: ns.source[testData.src0]._id, t: ns.CurrentActionList(type)[0].StartTime, srctype: ns.source[testData.src0].sourcetype });
                ut.start();
            }, 500);

            ut.stop();
            setTimeout(function () {
                // Checking the overlay display
                ut.assert.ok(me.vArgs.ctrl.$imgOverLays.is(":visible"), "Showing overlay on video player");
                ut.start();
            }, 2500);
        });

        // To test sketch initialisation functionality
        ut.asyncTest("ns.sketcher.init", function () {
            var totalsketches = 0;
            var type = "sketch";
            ns.initSketcher();
            expect(2);
            totalsketches = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            ut.assert.equal(ns.CurrentActionList(type).length, totalsketches, "Sketches initiated");
            ut.assert.equal(ns.CurrentActionList(type)[0].img, testData.tempSketch, "Sketch Data validated");
            ut.start();
        });

        // Check the source related links list
        ut.asyncTest("ViTag.CurrentLinks", function () {
            var l = ns.CurrentLinks();
            ut.assert.equal(l ? l.length : 0, $("#" + testData.args.linklist).find("a").length, "All links are rendered");
            ut.start();
        });

        // Check functionlity of create Link
        ut.asyncTest("Create Link", function () {
            var totalLinks = 0;
            totalLinks = ns.CurrentLinks() ? ns.CurrentLinks().length : 0;
            expect(2);
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs
            ns.AddLinks({ n: testData.links.n, u: testData.links.u },
             function () { },
             function () {
                 ut.assert.equal(ns.CurrentLinks().length, totalLinks + 1, "Link created successfully");
                 ut.assert.equal(ns.CurrentLinks()[0].n, testData.links.n, "Links Data validated");
                 ut.start();

             },
              function () { ut.assert.ok(false, "Save Link is failed"); }
             );

        });


        // Check functionlity of edit Link
        ut.asyncTest("Edit Link", function () {
            var totalLinks = 0;
            expect(2);
            totalLinks = ns.CurrentLinks() ? ns.CurrentLinks().length : 0;
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs
            // Remove link first
            ns.RemoveLink(testData.links.n);
            // Then create new link with existing id 
            ns.AddLinks({ n: testData.links.en, u: testData.links.eu },
             function () { },
             function () {
                 ut.assert.equal(ns.CurrentLinks().length, totalLinks, "Link edited successfully");
                 ut.assert.equal(ns.CurrentLinks()[0].n, testData.links.en, "Links Data validated");
                 ut.start();
             },
              function () { ut.assert.ok(false, "Edit Link is failed"); }
             );


        });

        //saved link should be avilable for edit
        ut.asyncTest("Saved link in Edit mode", function () {
            ns.EditLinks(testData.links.en, testData.links.eu);
            ut.assert.equal(me.vArgs.ctrl.$linkName.val(), testData.links.en, "saved link is visible in edit mode");
            ut.start();
        });


        //  Check functionlity of timeline metadata
        ut.asyncTest("Get Timeline MetaData", function () {
            var currentSrc = ns.source[testData.src0];
            var metadata = ns.GetMetaData(currentSrc);
            if (ns.source[testData.src0].sourcetype == 0) {
                ut.assert.ok(true, "Not Applicable for uploaded videos");
                ut.start();
            }
            else {
                expect(4);
                ut.assert.ok(ns.CurrentTimelineSrc, "MetaData source is set");
                ut.assert.ok(metadata.actions, "All actions set");
                ut.assert.ok(metadata.links, "All links set");
                ut.assert.ok(metadata.tags, "All tags set");
                ut.start();
            }
        });

        // clear defualt edit values when user changes tabs or on chnage of source
        ut.asyncTest("Clear values in Edit mode", function () {
            expect(2);
            ns.ClearEditValues();
            ut.assert.equal(me.vArgs.ctrl.$cmtTitle.val(), "", "annotation  values cleared in edit mode");
            ut.assert.equal(me.vArgs.ctrl.$hotspotTittle.val(), "", "hotspot values cleared in edit mode");
            ut.start();
        });


        // get Actions and related sub actions
        ut.asyncTest("Get actions and sub action", function () {
            expect(2);
            var listActions = ns.getPausedAction(testData.time);
            var type = listActions[0].type;
            var action = ns.getEditedListAction(type, listActions, testData.time);
            ut.assert.ok(listActions.length > 0, "All list actions avialable");
            ut.assert.ok(action, "Specific action is avialable");
            ut.start();
        });


        // Check functionlity of remove tag
        ut.asyncTest("Remove tag", function () {
            var totalTags = 0;
            totalTags = ns.CurrentTags() ? ns.CurrentTags().length : 0;
            setTimeout(function () { ut.start(); }, 500);
            ut.stop();
            ns.RemoveTag(testData.tag.ed, {
                onSaving: function () { },
                onSave: function () {
                    ut.assert.equal(ns.CurrentTags().length, totalTags - 1, "Tag removed successfully");
                },
                onError: function () {
                    ut.assert.ok(false, "Remove tag is failed");
                }
            });
            // ut.assert.equal(ns.CurrentTags().length, totalTags - 1, "Tag removed successfully");
            ut.start();
        });



        // To test hotspot render functionality
        ut.asyncTest("close / remove Hotspot content", function () {
            ns.removeHotspot();
            ut.assert.ok($("#" + testData.args.hotspotDialogueBox).is(":hidden"), "Hotspot content box closed ");
            ut.start();
        });

        // Check functionlity of delete Annotation
        ut.asyncTest("Remove Annotation", function () {
            var totalAns = 0;
            var type = "annotation";
            var questionId= [];
            totalAns = ns.CurrentActionList(type) ? ns.CurrentActionList(type).length : 0;
            // Remove annotation
            setTimeout(function () { ut.start(); }, 1550);
            ut.stop();
            ns.RemoveAction(testData.ans.t, testData.ans.t,type,questionId, 
            {
                onSaving: function () { },
                onSave: function () {
                    ut.assert.equal(ns.CurrentActionList(type).length, totalAns - 1, "Annotate deleted successfully");
                },
                onError:
            function () {
                ut.assert.ok(false, "Delete Annotate is failed");
            }
            }
          );
            ut.start();

        });



        // Check functionlity of delete Link
        ut.asyncTest("Delete Link", function () {
            var totalLinks = 0;
            totalLinks = ns.CurrentLinks() ? ns.CurrentLinks().length : 0;
            // Remove link using link name 
            setTimeout(function () { ut.start(); }, 500);
            ut.stop();
            ns.RemoveLink(testData.links.en,
            {
                onSaving: function () { },
                onSave: function () {
                    ut.assert.equal((ns.CurrentLinks() ? ns.CurrentLinks().length : 0), totalLinks - 1, "Link deleted successfully");
                },
                onError: function () {
                    ut.assert.ok(false, "Delete Link is failed");
                }
            }
            );

            //ut.assert.equal((ns.CurrentLinks() ? ns.CurrentLinks().length : 0), totalLinks - 1, "Link deleted successfully");
            ut.start();

        });


        // saved action time is updated
        ut.asyncTest("update Paused time", function () {
            var pauseTime = ns.CurrentSrc().actions[0].currentTime,
            newTimeInsec = Math.floor(pauseTime + 10);
            pauseTmAnchorId = "pauseTmanchor0",
            pauseTmTextId = "pauseTmText0";
            ns.updatePauseTime(pauseTime, newTimeInsec, pauseTmAnchorId, pauseTmTextId);
            ut.assert.equal(ns.CurrentSrc().actions[0].currentTime, newTimeInsec, "Action is updated");
            ut.start();
        });

        // Check functionlity of delete all actions
        ut.asyncTest("Remove Actionlist", function () {
            totalActions = ns.CurrentSrc().actions.length;
            ns.RemoveActionList(ns.CurrentSrc().actions[0].currentTime, {
                onSaving: function () {
                },
                onSave: function () {
                    ut.assert.equal(ns.CurrentSrc().actions.length, totalActions - 1, "Actionslist deleted successfully");
                    ut.start();
                },
                onError: function () { ut.assert.ok(false, "actionlist deletion failed"); }
            });
        });

    };

    /// Timline Videos Creation ///
    //Check functionlity of create Timeline  Video's   
    me.testTimelineCreation = function (testData) {
        module(testData.args.name);
        ut.asyncTest("Create TimelineVideo", function () {
            if (testData.args.username != "stage" && !testData.args.mode) {
                me.vArgs = ns.init(testData.args)
                me.vArgs.ctrl.video.currentTime = 1;
                var totalTimeLineVideos = 0;
                var sourceCount = ns.source.length;
                var timelineSrc = [{ "sequence": 1, "data": { "srcTimeline": ns.source[0].src, "sourcetype": ns.source[0].sourcetype, "snap": "", "startTime": testData.timelineStartTime, "duration": testData.timelineDuration} }, { "sequence": 2, "data": { "srcTimeline": ns.source[1].src, "sourcetype": ns.source[1].sourcetype, "snap": "", "startTime": testData.timelineStartTime, "duration": testData.timelineDuration}}];
                var data = [{
                    title: testData.timeline.title,
                    sourcetype: testData.timeline.sourcetype,
                    desc: testData.timeline.desc,
                    src: timelineSrc
                }];

                ns.createTimeline(JSON.stringify(data),
             function () { },
             function () { },
             function () { ut.assert.ok(false, "TimeLineVideo is failed"); }
             );
                ns.loadData(testData.args.mode, testData.args.username);
                if (ns.source.length > sourceCount) {
                    for (i = 0; i < ns.source.length; i++) {
                        if (ns.source[i].sourcetype == 2) {
                            ut.assert.ok(ns.source[i].title.indexOf(testData.timeline.title) > -1, "TimeLineVideo Created is sucessfully");
                        }
                    }

                }
                else
                    ut.assert.ok(false, "TimeLineVideo is failed");
            }
            else
                ut.assert.ok(true, "TimeLineVideo cannot be created for Collabration videos");
            ut.start();
        });



        //Check functionlity of Edit Timeline  Video's   
        ut.asyncTest("Edit TimelineVideo", function () {
            ns.loadData(testData.args.mode, testData.args.username);
            for (i = 0; i < ns.source.length; i++) {

                if (ns.source[i].sourcetype == 2) {
                    var getId = ns.source[i]._id;
                    var timeLineEdit = ns.getSource(getId);
                    if (timeLineEdit.src.length && timeLineEdit.src.length > 0) {
                        var index = timeLineEdit.src.length - 1;
                        timeLineEdit.src[index].sequence = 2;
                        timeLineEdit.src[index].data.srcTimeline = ns.source[1].src;
                        timeLineEdit.src[index].data.snap = "";
                        timeLineEdit.src[index].data.startTime = 1;
                        timeLineEdit.src[index].data.duration = 10;
                    }
                    timeLineEdit.src.push({ "sequence": 3, "data": { "srcTimeline": ns.source[1].src,"sourcetype": ns.source[1].sourcetype, "snap": "", "startTime": testData.timelineStartTime, "duration": testData.timelineDuration} });
                    timeLineEdit.src.push({ "sequence": 4, "data": { "srcTimeline": ns.source[2].src,"sourcetype": ns.source[2].sourcetype, "snap": "", "startTime": testData.timelineStartTime, "duration": testData.timelineDuration} });

                    ns.createTimeline(JSON.stringify([{ _id: getId, title: testData.edittimeline.title, sourcetype: testData.timeline.sourcetype, desc: testData.edittimeline.desc, src: timeLineEdit.src}]),
                    function () { },
                    function () {
                        ns.loadData(testData.args.mode, testData.args.username);
                        ut.assert.ok(ns.source[0].title.indexOf(testData.edittimeline.title) > -1, "TimeLineVideo Editing is sucessfully");
                    },
                    function () { ut.assert.ok(false, "TimeLineVideo is failed"); }
                    );
                    ut.start();

                }
            }
        });


    }

    //Check functionlity of Delete Timeline Video's
    me.testTimelineDeletion = function () {
        ut.asyncTest("delete TimelineVideo", function () {
            setTimeout(function () { ut.start(); }, 1500);
            ut.stop();
            if (ns.source[0].sourcetype == 2) {
                var timeLineId = ns.source[0]._id;
                ns.calldelete(timeLineId,
                    function () { },
                    function () { ut.assert.ok(true, "Timeline Video is deleted successfully"); },
                    function () { ut.assert.ok(false, "TimeLineVideo Video is failed to delete"); }
                    );
                ut.start();
            }
        });
    }

    // Upload functions testing
    me.runUploadVideo = function () {
        module("Upload Service");
        ut.asyncTest("Uplaod new video", function () {
            testData = ns.testData.collaboration;
            var totalVideos = 0;
            me.vArgs = ns.init(testData.args)
            totalVideos = ns.source.length;
            expect(3);
            setTimeout(function () { ut.start(); }, 250);
            ut.stop(); // Stop Unit test then start else no assertion run error occurs
            //uploadData = ns.testData.upload.data;
            ns.testData.upload.uploadFile(ns.source,
            function () {
                ns.loadData(testData.args.mode, testData.args.username);
                ut.assert.equal(ns.source.length, totalVideos + 1, "Video uploaded successfully");
                ut.assert.equal(ns.source[0].title, uploadData.title, "Title of the video validated");
                ut.assert.equal(ns.source[0].desc, uploadData.desc, "description of the video validated");
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
            testData = ns.testData.myspace;
            var totalVideos = 0;
            // me.vArgs = ns.init(testData.args)
            ns.loadData(testData.args.mode, testData.args.username);
            totalVideos = ns.source.length;

            //get the collabration video to publish
            var publishdata = ns.testData.collaboration;
            ns.loadData(publishdata.args.mode, publishdata.args.username);

            publishdata = ns.source[0];
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


    // search service functions testing
    me.runSearchserviceVideo = function () {
        module("Search Service");
        testData = ns.testData.collaboration;

        ut.asyncTest("search tags and title of the video", function () {
            // Initialise the user data to add metadata information
            ViTag.initEditing(ns.init(testData.args));

            //Play the video to get the current source and add tag to the same source
            me.addTagsforsearch(testData.src0);
            me.addTagsforsearch(testData.src1);

            //get the title of the video and assign to search key
            var searchkey = ns.source[0].title;
            me.searchbyValue(searchkey, "Video title");

            //get the tag title and assign to search key
            searchkey = testData.tag.d;
            me.searchbyValue(searchkey, "Tags");
            ut.start();
            // me.removeTagsAfterSearch();

        });
    }

    // Add same tags for two videos
    me.addTagsforsearch = function (index) {
        ns.play(ns.source[index]._id);
        ns.AddAndSaveTag({ d: testData.tag.d, t: testData.tag.t });
    };

    //Remove Tags after search
    me.removeTagsAfterSearch = function () {
        ns.RemoveTag(testData.tag.d);
        ns.play(ns.source[0]._id);
        ns.RemoveTag(testData.tag.d);
    };

    // search based on title of the video or tag name
    me.searchbyValue = function (searchkey, mode) {
        ns.testData.search.searchVideo(searchkey,
            function (searchdata) {
                data = searchdata.replace(/\n/g, "");
                vidSrc = JSON.parse(eval(data));
                ut.assert.ok(vidSrc.length > 0, "Searched sucessfully based on " + mode);
            },
            function () { ut.assert.ok(false, "Search failed based on " + mode); });
    };



    ///*************************************************************************************************************//
    ///****************************** Test suits initialisation ****************************************************//
    ///*************************************************************************************************************//


    var testData;
    //  Change data to run Collaboration videos
    me.runCollaborationVideos = function () {
        testData = ns.testData.collaboration;
        me.callTestSuits(testData);
    };

    //  Change data to run MYSPACE videos
    me.runMyspaceVideos = function () {
        testData = ns.testData.myspace;
        me.callTestSuits(testData);
    };

    // Change data to run timline methods
    me.runTimelineVideos = function () {
        testData = ns.testData.timeline;
        me.testTimelineCreation(testData);
        me.callTestSuits(testData);
        me.testTimelineDeletion()
    };

    //run test suits for all kinds of videos
    ut.runTestSuits = function () {
        ViTag.getAuthToken();//to generate auth token.
        me.runCollaborationVideos();
        me.runMyspaceVideos();
        me.runTimelineVideos();
        //        me.runSearchserviceVideo();
        //        me.runUploadVideo();
        //        me.runPublishVideo();
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
            url: ViTag.config.wsTestDataServiceurl,
            type: "POST",
            data: { testData: data, Environment: "Test" },
            success: function (data) {
            },
            error: function (xhr, err) { }
        });
    };
  
    

})(window.ViTag = window.ViTag || {});