(function (ns) {
 
   var userName="testuser";
   var pwd="testuser";
 
   //get auth token and storing to session.    
    ns.getAuthToken=function (){
     
	       $.ajax({
                url: ViTag.config.workspaceUrl,
                type: "POST",
                async: false,
                data:JSON.stringify({userName:userName,pwd:pwd}),
                success: function (response) {
                  var res = JSON.parse(response.replace('/\\/g', ""));
                  sessionStorage.setItem('authT',res.split("~")[0]);
                  $.cookie('authToken', res.split("~")[0], { path: '/' });
                  sessionStorage.setItem('role',res.split("~")[1]);
                },
                error: function () {
                    alert('Error in loading data');
                }
            });			
    },

    ns.testData = {
    
        // Data needed to test timline video
        collaboration: {
            args: {
                annotations: "annotates",
                hotspot: "hotspot",
                sketch: "sketch",
                questions: "questions",
                hotspotDialogueBox: "hotspotBox",
                tagslist: "tempTags",
                linklist: "tempLinks",
                path: "http://visapdemo.excelindia.com/VisapAutomationTesting/VisapAutoTestrepo/",
                quesContainer: "tblQuesViTag",
                autoplay: false,
                mode: true,
                name: "Collabration",
                tokenURL:ViTag.config.visapTokenurl
            },

            currentTime: 5,
            currentTimeinformat: "00:05",
            formatHour: "00",
            formatMinutes: "00",
            totalDuration: 0,
            time: 0,
            duration: 0,
            src0: 0, src1: 1,
            src2: 0, src3: 0,
            onAttrSave: null,
            tempSketch: "data:image/png;base64,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",
            tag: { d: "testTag", t: 15, ed: "editTestTag", et: 25 },
            ans: { ti: "testAnnotation", de: "testAnnotationDescription", t: 0, d: 6, eti: "testEditAnnotation", ede: "testEditAnnotationDescription", et: 0,
                    ed: 6,PauseOnShow:false,left:"0px",right:"0px",width:"180px",height:"100px" },
            hotspot: { ti: "testHotspot", de: "testHotspotDescription", t: 0, d: 6, showOnpause: 0, eti: "testEditHotspot", ede: "testEditHotspotDescription", et: 0, ed: 6, edShowOnPause: 1 },
            sketch: { time: 5, duration: 5 },
            links: { n: "testTitle", u: "testURL", en: "testEditTitle", eu: "testEditURL" },
            quets: { q: "testQuestionTitle", o: ["option1", "option2", "option3"], a: 3, st: 7, r: "testVideoTag", eq: "testEditQuestionTitle", eo: ["editOption1", "editOption2", "editOption3"], ea: 1, est: 7, er: "testEditVideoTag" }

        },
        // Data needed to test timeline video
        timeline: {
            args: {
                annotations: "annotates",
                hotspot: "hotspot",
                sketch: "sketch",
                questions: "questions",
                hotspotDialogueBox: "hotspotBox",
                tagslist: "tempTags",
                linklist: "tempLinks",
                path: "http://visapdemo.excelindia.com/VisapAutomationTesting/VisapAutoTestrepo/",
                quesContainer: "tblQuesViTag",
                autoplay: false,
                mode: false,
                name: "Timeline"
            },

            currentTime: 5,
            currentTimeinformat: "00:05",
            formatHour: "00",
            formatMinutes: "00",
            totalDuration: 0,
            time: 0,
            duration: 0,
            timelineStartTime: 1,
            timelineDuration: 10,
            src0: 0, src1: 1,
            src2: 0, src3: 0,
            onAttrSave: null,
            tempSketch: "data:image/png;base64,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",
            tag: { d: "testTag", t: 15, ed: "editTestTag", et: 25 },
            ans: { ti: "testAnnotation", de: "testAnnotationDescription", t: 0, d: 6, eti: "testEditAnnotation", ede: "testEditAnnotationDescription", et: 0, ed: 6 },
            hotspot: { ti: "testHotspot", de: "testHotspotDescription", t: 0, d: 6, showOnpause: 0, eti: "testEditHotspot", ede: "testEditHotspotDescription", et: 0, ed: 6, edShowOnPause: 1 },
            sketch: { time: 5, duration: 5 },
            links: { n: "testTitle", u: "testURL", en: "testEditTitle", eu: "testEditURL" },
            quets: { q: "testQuestionTitle", o: ["option1", "option2", "option3"], a: 3, st: 7, r: "testVideoTag", eq: "testEditQuestionTitle", eo: ["editOption1", "editOption2", "editOption3"], ea: 1, est: 7, er: "testEditVideoTag" },
            timeline: { title: "TestTLTittle", sourcetype: 2, desc: "testTLDescription" },
            edittimeline: { title: "TLTittleChanged", sourcetype: 2, desc: "DesIsChanged" }
        },
        // Data needed to test myspace video
        myspace: {
            args: {
                annotations: "annotates",
                hotspot: "hotspot",
                sketch: "sketch",
                questions: "questions",
                hotspotDialogueBox: "hotspotBox",
                tagslist: "tempTags",
                linklist: "tempLinks",
                path: "http://visapdemo.excelindia.com/VisapAutomationTesting/VisapAutoTestrepo/",
                quesContainer: "tblQuesViTag",
                autoplay: false,
                mode: false,
                name: "Myspace",
                tokenURL:ViTag.config.visapTokenurl
            },

            currentTime: 5,
            currentTimeinformat: "00:05",
            formatHour: "00",
            formatMinutes: "00",
            totalDuration: 0,
            time: 0,
            duration: 0,
            timelineStartTime: 1,
            timelineDuration: 10,
            src0: 0, src1: 1,
            src2: 0, src3: 0,
            onAttrSave: null,
            tempSketch: "data:image/png;base64,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",
            tag: { d: "testTag", t: 15, ed: "editTestTag", et: 25 },
            ans: { ti: "testAnnotation", de: "testAnnotationDescription", t: 0, d: 6, eti: "testEditAnnotation", ede: "testEditAnnotationDescription", et: 0, ed: 6 },
            hotspot: { ti: "testHotspot", de: "testHotspotDescription", t: 0, d: 6, showOnpause: 0, eti: "testEditHotspot", ede: "testEditHotspotDescription", et: 0, ed: 6, edShowOnPause: 1 },
            sketch: { time: 5, duration: 5 },
            links: { n: "testTitle", u: "testURL", en: "testEditTitle", eu: "testEditURL" },
            quets: { q: "testQuestionTitle", o: ["option1", "option2", "option3"], a: 3, st: 7, r: "testVideoTag", eq: "testEditQuestionTitle", eo: ["editOption1", "editOption2", "editOption3"], ea: 1, est: 7, er: "testEditVideoTag" }

        },
        // Upload service:Adds video to mypace
        upload:
        {
            args: {
                mode: true,
                name: "Collabration"
            },
            data:
            {
                desc: "Test Description of the Video",
                sourcetype: 0,
                src: "earthView.mp4",
                snap: "",
                category: ["testcategory1,testcategory2"],
                title: "Test Title of the video",
                videototalduration: 327
            },
            
            addVideo: function (data, fnSuccess, fnError) {
              $.ajax({
                    url: ViTag.config.wsvideourl,
                    type: "POST",
                    headers: {'X-Authorization': sessionStorage.getItem('authT') },
                    data: {
                    d: JSON.stringify([data]), key: "insert", isStage: ns.testData.collaboration.args.mode,  isUpload: true },//key - can be removed - Code review - savitha
                    success:fnSuccess,  
                    error: fnError  
                });
            }

        },
        // publish service : Publishes video from collaboration to myspace
        publish:
        {
            publishVideo: function (data, fnSuccess, fnError) {
                 $.ajax({
                    url:ViTag.config.wsPublishVideourl ,
                    type: "POST",
                    async: false,
                    headers: {'X-Authorization': sessionStorage.getItem('authT') },
                    data: {d: JSON.stringify([data])}, //hard coded
                    success:  fnSuccess,
                    error: fnError
                });
            }
        },
        
        toc: {
            args: {
                accordion: "accordion",
                thumbnailView: "thumbnailView",
                mode: false,
                name: "Myspace"
            },
            getcategory: function (fnSuccess, fnError) {
                $.ajax({
                    url: ViTag.config.wsCategorySearchurl,
                    type: "GET",
                   // headers: { isStage: ns.testData.myspace.args.mode, username: ns.testData.myspace.args.username, role: ns.testData.myspace.args.role },
                    headers: { isStage: ns.testData.myspace.args.mode,'X-Authorization': sessionStorage.getItem('authT') },
                    async: false,
                    success:  fnSuccess,
                    error:  fnError
                });
            }
        },
        
        //whiteboard  data information.
        whiteboard:
        {
            args: {
                path: "http://visapdemo.excelindia.com/VisapAutomationTesting/VisapAutoTestrepo/",
                autoplay: false,
                mode: true,
                src0: 0,
                currentTime: 0,
                 name: "Collabration",
                textcontent:"textcontent",
                WbimgOverlay:"WbimgOverlay"
            },
            data:
            {
            description:"whiteboard text data", 
            duration: 3,
            sketchData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAABuCAIAAAB6LmzgAAARRklEQVR4nO2ceVBU253HOzPzx/wxqalM1dT8kZqazNT8m6lUJXlJXmZJMk7yXpKq1EyeG7sgKqKiuLCvIgIqDwGNILLz4kazbyIiTbM3IKtsgoACIrJIr/Ry53vv6b7v2jTdrQGbG+63TnVdTp+7nc/5Lefc24goQdteAiQeSIDEAwmQeCABEg8kQOKBBEg8kACJBxIg8UACJB5IgMQDCZB4IAESDyRA4oEESDyQAIkHEiDxQAIkHkiAxAMJkHggARIPJEDigbYFJIPBsLa2plSqXr9+PTHxvLe3r7Oze2lpiRLE6ONB0mq1KpVqcWlpavrF0NCwrLP7cYOkrKLyzt37mVm5yanX4y9duRAbHxl9ITQ8KigkPC7hSll55dTUNLXjtZmQdDq9Wq1ZWXn7cmZmdHSsq/tJo7SpuubB/cKi7Jz86zfSEy4nxsYlRMdcDI88HxwacS4wJCAoNDAkHNshYVFhEdEo+CoiKgYlNDwa34JZbv5XA4ODer2e2ql6P0jELymUylfz8+PjE339A80tbQ9q64pLywq+up12MzMxKTk27tL5C3Ho5eCwyHNBoSARGBzGYIg0wwAANgsaBwaHY98baRntHTKlUkntPFmAZPRLi/BL04ODT9vaZY/qH5eVV9y+e+9WVg78EhxRjMkvAQBtEMFhcFCgghqCgZCwycB6wRHIoXDYswHB/mcCMAJKSsufT07pdDpqx4iGBLOQNEqra2rv3itk/dKFi/BLsehx9D7jlxgMX/ulTcNASOCYIAGLwVkIeHyiMup8LAZEwqVEXFVOXgECmLiopK29Q7GTTIqGVPeozuOAZ3BoODorKDQiOPRD/JJ1EsQgCAmQBokAxhNiG/UggTFxOTHpD2kZefl/BAa40OaW1v7+ARjNwsIbWDbsm9qpoiFJJJJ9+/cf8fEJDglFZ8XEJtjsd3tIIJYwJEKxjW8RqC7GX066mnorM/v2nXvwn/WPJR2yzqdDw/Cry8vLKpVau5OcmP0yQnJ2cfE6eNDTy8v32LHQ8Ag2+FshAdfEkDDGpJDwKBOJSwyJnDt3Cyuqqhsk0s6u7pGRsZnZ2dVVuUaj2cl52oeJhtTQ0ABIB729vQ8dAiqvg14n/PwioqIx8OGIaNcUHHY2gCYRGhENVAgS8QlXUq+nZefm3xcX1zx42NTc8qSnF2n37Nzc29VVhoSBErRJoiE1Nze7uLoSSKQwqA6ePOUPs8gvuF1cUvawrh4kkHNPTDyfn3+NVHhtBweJjywaUodM5ubuzoVECshFRkXphDjhaNGQ2js6LELyOHAgMCgIvosS5FDRkGSdne4eHhYhBQQGIv2lBDlUNKTevr4Dnp4IQgKk7SkBEg9EQ+rZGBJikgDJ4aIhDQwMYBprEdLpM2d25sLzthINaXR0FFnDekgwL8xq5XI59XGl1RtWVNrnC8qmscW7spnosuH7XTOGHTw5tgHJ7+TJLYWkWtPPLKtaxhfvd84k142fKxzcnSb78UXpt8/VfvNY5V8eKRd5loh+d3tPeie1g+VISLCNvemdf+tT/leA4VUici0SORWKXMUi92LRgRK6xqtUdLBU5Cz2zO2hdrAcCUlvMPzwQqPIudAIw7tMdMhScRb7ftVLbZlwGdt8zZeGNDU1dejw4Y8PSaPVf++8hLabQ2XWilOh/71+amvU3tERff58dHR0c3PzRm00Gg06QaVWO2qFjIY0PT19+MgRJHjrIR0/cWLrXq1Sa/XfjW4QediGdOqubUiYKpSXl2fcujU0NGSlWUtr682MjJqaGoPBMDk5idt0cnZ2cnHB7Y+MjnJbarVaqVR6/fr1kNBQJFCYMgJnXl7e2NgYtbFWVlbuFxYmJiVlZmVNTk1t1Axn737ypKqqqqS0tIxRaWkp/mxta5uZmTFrbA0Sao4dP/769WtqawRI/2YfpJO2IOGes7Kzd+/Z88Xu3SdPnXrz5o3FZgODg+4eHnv27kXLBomksbERhMjN7t23r6y8nG2J/o2JiXF2cUHBLhivmJC4ubvvd3JCY4lEYvH4mK7Excfj4C6urjjgiZMnLXLC1ebk5uLIONq+/fvZgovBWXyOHr2anDw+McG2tw1pYWGB2hrZD+n0vQHrh4JHOnPmDHoTl73PyQmj0mKzG2lppJfxCajDIyOk67EjurW7u5s0e/XqFSaIaEPWM/HJnUeiJcaBxShQXVODvmZXQbGdnJKyvtnCmzcgQa7WrJBzgdYRH58u0/XQkF68eIGq7Qtpf2F46bD1QyHyJ1y6hO7DZaPTIyMj18ePpeVlhFjYBIEkFotRWVlZifEOr15UXGwwzcXSb95E/6IZQjWxoaO+vviTGBZM5JS//3pIarU6OCQEZ+d2II4wtc6YJiYmuFbh6uZGu1xnZ1d3d3YooBI+dnFxkSKQ4NBwEdsZUoQtSNCj+nry6JK8BzD49KlZA/g3tgE+2dACK+QufeF+fY8fJyzxeebs2abmZsQJhLqKyspr164lXb3a12/B/T7p6WEfJpDdvZmAt96skU4TSKRxUlJSfkEBHCDGGel2b5MhFhcXU39OkBCx/U+fxqgnXZObl2fWAI6emBo+4xMSSNqN3s/KysrMzITPJ836+vpY5waDK6+ooOzTrcxMnBf9DreE7sYntmFYSDd076b4GB8EEhkubKYDU26USkklcQm4TrgER0KSa3T/GvJosyBB2Tk5JBEAqrPnznE90vz8vO+xY2TwAtLjhgaKfi9adzEuDrkGCrqSvDXW29tL3h4gPufLpCSFQkHZ0vLyMgIVDAgFp4ZDgwmSZWuccfTdvNEMUv+7dhkVHU3CFXYPDApCMmIDEupnZ2eprdGqWvdPQXWiA7YgOYsTaqxlvayGhofZO0f/tra2sl89qK1FOCH8YHBv376lGHII4NgFBRv4E5Vzr15xIzSGc3h4eO3Dh6inNhbyPZwR58VZ0tLSUJN67RoxXIybe/fucRubQYLtcr+NjY0lgQ2QzgUEyBUKGhISVjLK1kPCpU9Nb9XvGgDpO/ZAchFfefCMskN6gyH24kV0ljcT5FNSU0k93EhCQgKpR5fB+5P68fFxwoPc6fSLF6iEa0LUIYkDywndjfGakpLCZoBmSkxMJAEPZyHz4vrHjwkkmAVmWty3EMwgDQ9/7SeeP3/OGgzGE6xKs7ZGQ4JbQHrDxjozSOTSt0L2Q7psHyToYV0dsRjiq4lxTJnmGMSPjYyMkMZsADe705cvX8JZgRM7cElmjCMDWOKXX75616rQnsBGH8LpwfVRjEWSoY8zenh6cnMNFhIOi4KwNzg4iLyj5sED+DcSVsl4QpyjSOKw/SFdqrEXEhsbiDFh4oJKzOdJrMIwh6npTak221nr73Rubu5mRga6ns6M3dzYzBgbyCYQdbjrApgFk5HB+jqiK4x5ke7Oy89n69nzsiOAHBmNQeiQqfORkZMclYaEwOgoSP9sDyRXccqjCcpuYZbKIsH8H+nABZOXRyciurAtrUAiwgwSwxy7ezM5ITtLBSfMUkl+iOwDTom8bgXPZhYIyV7oekQXNgFZD4mYOHt8fIXZWMatW6Q9DQm3wY4+M0gYStz1ic3VslL7D2ce0E8lrBDyLhO5F92UTlJ2C6OP9WzweJiu4hPbZL2YuxRpExIRYMAxpqene5pmNp7MLJVk7U+HhtjogkoEP4QupPv4BF3i0Ai/zq4us/OSfibrHRhSKGStCJUFBQWYHZP2NCSMBYuQcGKclfXgm65Fxdq3TlbTj/VsQUqTvAck9GnMhQskTUA5evSot8nFZ2ZlcVvaCYkVdifuixhHR0cHKuHH2AVAbo/jk7vwgzasZXBjEr7C1SYnJyNbQbqflp4O52xmGLYhmeX4myhA+rtTdkDyKM5peb8MEz6NBAlyF+QTNzgwOMht9r6QpFIpeWmeWEZ7ezu6DvGJDfWs3XAL+QpnP+Xvv7yywj2vxXnSehkhYf/tCqkUDe7IXlLvo8XFRXaZjhQMbXrm/+6C3kaQ4MHERUV1dXWISezvolQqFQY7MVDSuUjqenp6SDRCR+Eg2F5faN/I8MO+TU1N1IdBggICA9nhsA0h/bH9/SBRpkUa9l5gATVMpseVWQo+xUBCrow/yeMGHx8fJAXZ2dn5BQXnY2JY94XujoiMxPTrDzduEJPFV5FRURLm8YfEVKCGhgb0LZttYoaLUzx79szKZHa9jJC46flHg7SktA+SV0lR93uvesCzsS8T0k8vLT0YQxrNTmaxActAZXFx8e+/+MLbNDdC76NzwdvNRAhHA78OmQzzUz8/PwIADTDLsXQhdNAiuQDJXJRK5UvTeUl2s60hvV1V/41vhY3sjn73obSq39qSjEXBs2HskxVPTEvZoM0V+sv/9GkXNzc4JUxCyFrR5OQkIjR2QZ+yEcXblCgDDxojtqMl2h/19QVFFBjiqw3WjXp7e2F5QELPgQ4ffrO4iLQNtFCJGhz2ha1YaNvdbW52pzNQqzrDhFLfsqTLm1B9J0oqchPTLwZZhVTZ996QoK6uLjL3POHnN73B4lZ1dbUns1JQxDwUIEKv3UhLAzb0PjCTx6bOzIwnKipKJpORZnB3uXl55CFTIfN0yqIwXG4wXhEFE2QDM7vC6dDhOH5Obq7B1juFRkihYWEWIdkT1jaS3kApdIYppb51SVc8t5YxqYkZVR/tU/1epvhVq/xnzfKfNis+a1n9QebgN49VitzFtGfbVEgUszpXX18/bXX5cWJiAs3W1y8sLGBmWlVVVVxSglJbWzsyOmqWeiDd7+ru3mhBjxX2gnvEoOHuDhc1PDJikxDFQkLms/5prp1hjQhIZtX6rhVd1bw2e2otbkx9ol+1p1PxWRvN48fS1e83rn7SuPoT6ep/NMn/s5mu/HmL/Bdtis+61Ltq5/8ltuUbnsUWVh8YSBW9Hwjpz0NGSOwzjA+G9Fyp/18Z3fufNsm/L1n9IcPj37k8Ni67ZOrPO5Sf3n7292draZM6WMqF9I1DZbWDW/UyDC+0aZCeKfS7WuU/bbLBY8PSqvhll+ZXjcvfTX3y14cxgS0yvit5sPQvDpdLRy2//bNDZITEnQRwIaEgOaHs0LhCD88Gu7HNw0ppV37epf5Zxcw/RkpoTsjOGUiNAiQoPiGB+5qLtynpRNpDVqhsanMgMWVXp/rzNsUnOcPf8qsSuRbCpARItLYVJJSftyp2dWp+Ubfw7dgWGFPb+CK1g2WEFBcf7yhIiGHILP6rWY6s79Om1U+YPBDZIOp/06ly61Edq52eXNjRP2QzQrqSmPhxIKHrwQPNkGKAxA+YvBx//rJV/n8yxZFeZdSIOm1Sg3mVbFk3ozYot/XPHT6SjJCSU1LYBzCbBYmYCGqQiCMdR1IOE0GC/t8t8t+2K9y7lUFPVUnjmjsv1xoXdWNy/arWoLU9sduJMkK6mpz8p0P6n1b5T2iXJf8R47J+JKU5gRymtH79yotj6uxpTfW8tuet7rXGoBZMxG5tJqTftMt/3abw6lGGDatuTGqKZrXtS7oplV6hMwj/DupPkRES+zhrPSR2PdG6QGJErn+zZtAIJrLZ+jomkaf3ZpA8Dhxo4bz+IsghMkLKyMj4Ys8e7uMTAgkpn6SxkRLkUBkhzc7NXb58eb+Tkxfnl7MCpG0iEbu1traWX1BAHhcKkLaVvoZE9OjRo8NHjpAkQoC0TWQOiWKeGAaHhDg5O8P10ZCkUkqQQ2UBErS0tJSSmkp+yEl+byXIgbIMiWLeshCLxbv37rX/94iCtkgbQiKqf/xYKrg7R8sGJIoxKUqQQ2UbkiCHS4DEAwmQeCABEg8kQOKBBEg8kACJBxIg8UACJB5IgMQDCZB4IAESDyRA4oEESDyQAIkHEiDxQAIkHkiAxAMJkHggARIPJEDigQRIPND/A8qVijCsXGsWAAAAAElFTkSuQmCC",
            PauseOnShow: true, 
            whiteboardPosition: "wbLeftPos", 
            whiteboardAttributes: { width: "270px"}
            },
            editedData:
            {
            description:"Edited whiteboard text data",
            sketchData: "data:image/png;base64,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",
            PauseOnShow: false, 
            whiteboardPosition: "wbRightPos", 
            whiteboardAttributes: { width: "150px"}
            }
        },
        aelib: {
            args: {
                path: "http://visapdemo.excelindia.com/VisapAutomationTesting/VisapAutoTestrepo/",
                autoplay: false,
                mode: true,
                src0: 0,
                currentTime: 10,
                name: "Collabration"
            },
            data : {title: "DemoTest",questionType: 108,assetIds: [],questionsData: { title: "DemoTest",testid: "1",questionsData: [{ id: "", heading: [], maxpoints: [ "1"],answers: ["0"],leftCol: [],modelParagraph: "",options: [{ data: "statment 1", type: "text"},{data: "<br />", type: "text" }],optionsLayout: "",questionBody: [{data: "TestData",type: "text" }],questionMedia: [{ data: "", type: ""}],optionsMedia: [],questionLayout: "",responseType: "BINARY",rightCol: [],rubric: [{ data: "TestData",type: "text"}],title: "DemoTest",type: "MCQ",labelTrue: "True", labelFalse: "False",metadata: "Metadata" }],quesType: 108 }} 
        },
         // Upload service:Adds video to mypace
        assign:
        {
            args: {
                mode: true,
                name: "Collabration"
            },
            data:
            {
                desc: "Test Description of the Video",
                sourcetype: 0,
                src: "earthView.mp4",
                snap: "",
                category: ["testcategory1,testcategory2"],
                title: "Test Title of the video",
                videototalduration: 327
            },
            
            getGroups: function (fnSuccess, fnError) {
               $.ajax({
                 url:ViTag.config.wsGroup,
                 async: false,
                 type: "GET",
                 headers: {'UserID':ViTagUI.ownerid},
                 success:fnSuccess,
                 error: fnError
            });
         }
        }

    };

})(window.ViTag = window.ViTag || {});