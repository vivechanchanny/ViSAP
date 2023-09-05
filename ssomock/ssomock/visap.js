
(function (ns) {

    //#region Public 
    /// <summary>
    /// Init-Creates elements,extends parameters ,bind events required
    ///loads initial data from database
    /// </summary>
    /// <param name="args">args which has to be overridden</param>
    /// <returns>args which will be used in edit</returns>
    ns.analyticsObj={};  //This object is used to post data to GA or tincan in multiple places.  
    ns.init = function (args) {


        if ($) {
         	
            ViTag.debug("Visap:Initilization  with the arguments:" + args.mode +"," + args.path +"," + args.username +"," + args.snapRepopath);            
            //creation of all container and dynamically generation of html elements
            me.cp.createElement();
            if (args){
	            $.extend(me.video, args);
	         }
            // Getggr all controls from document.  
            me.readControls();
            

            //Need to verify this block
            ns.isTest = args.isTest;
            // Set timer with some interval to handle Overlay, Annotations and Question.
            me.addHandlers();

            me.bindEvents();

            // Youtube player support variables
            ns.yt = {
                player: null,
                enabled: false,
                videoState: -1
            };

            //Need to verify this property 
            ns.mode = args.mode;
            //set token url to global value
            ns.tokenURL=args.tokenURL;
            
            me.loadData(ns.mode, args.username);
           	me.cp.init({ ctrl: me.ctrl, args: me.video });
            //This line is to initialize the analytics object.
            $(document).trigger("init");
            return { ctrl: me.ctrl, args: me.video };

        } else alert("No jQuery refernce!");

    };

    ns.sourceType = -1;

    //#region Initactions 
    /// <summary>
    ///Captures all sketches from common CurrentActionList() 
    /// to its list
    /// </summary> 
    ns.initSketcher = function () {
    	try
    	{
        sketcher.init(me.curSrc);
        me.addHandlers();
    	}
	    catch(err)
	    {
	       ViTag.error("Visap:initSketcher:Error in init sketch"+err);
	    }
    }

    /// <summary>
    ///Captures all annotation from common CurrentActionList() 
    /// to its list  
    /// </summary>
    ns.initAnnotator = function () {
    	try
    	{
        	annotator.init(me.curSrc);
        }
	    catch(err)
	    {
	       ViTag.error("Visap:initAnnotator:Error in init annotation"+err);
	    }
    }

    /// <summary>
    ///Captures all whiteboard from common CurrentActionList() 
    /// to its list  
    /// </summary>
    ns.initWhiteboard = function () {
    	try
    	{
          whiteboard.init(me.curSrc);
        }
        catch(err)
	    {
	       ViTag.error("Visap:initAnnotator:Error in init annotation");
	    }
    }

    /// <summary>
    ///Captures all hotspot from common CurrentActionList() 
    /// to its list  
    /// </summary>
    ns.initHotspot = function () {
   	    try
    	{
           hotspot.init(me.curSrc);
        }
        catch(err)
	    {
	       ViTag.error("Visap:initHotspot:Error in init hotspot"+err);
	    }
    }

    /// <summary>
    ///Captures all question from commonquestion list 
    ///to its list  
    /// </summary>
    //How does the page determine "isTest", Test or question is part of video conten
    ns.initTest = function () {
      try
    	{
        test.init();        
        }
        catch(err)
	    {
	       ViTag.error("Visap:initTest:Error in init question"+err);
	    }
    }

    //#endregion

    //#region  play pause playat 

    /// <summary>
    ///Play function called for playing particular video 
    /// </summary>
    ns.play = function (_id) {
        var analyticsObj={}; 
    	try
    	{
    	ViTag.debug("Visap:play:Playing the Video with the id:" + _id);    
        //Gets the particular source from list of sources based on ID
        me.setSource(_id);
        ns.videoId=_id;
        ns.currentSrcTypeName = me.currentSrcTypeName(); //to get the srctype name(timeline,yt,uploaded)
        //Based on type of video  respective playmethod is called ForEx-uploaded:play
         ViTag.debug("Visap:play:Playing the Video for the src:" + ns.CurrentSrc().src);  
         
         //Creating object to post the data To GA or tincan (currentsrc title should be passed in the place of id)
         analyticsObj.id=ViTag.CurrentSrc().title;
         $(document).trigger("VisapLog",[ns.getUserInfo(),"Play"+"."+ns.currentSrcTypeName,analyticsObj]);
         
        me[ns.currentSrcTypeName].play(ns.CurrentSrc().src);
         }
        catch(err)
	    {
	       ViTag.error("Visap:play:Error in play for the id "+err );
	    }
    };
    //This method will get the video auth token
     ns.getVideoAuthToken=function(id){
    	 $.ajax({
                url: ViTag.tokenURL,
                type: "POST",
                async: false,
                data : {ID:id},
                success: function (token) {
                  ns.tokenId=token;
                },
                error: function (err) {
                	ViTag.error("Visap:getVideoAuthToken:error while getting video token"+err);
                    alert('Error while getting video token');
                }
            });
    }

    /// <summary>
    ///plays the video from a particular time
    /// </summary>
    /// <param name="t">time video to be played from</param>
    // This should be in the lists of ns.play method
    //Library should know is the type of video being played.
    //Each sub-namespace "uploaded, yt and timeline" should have playAt method
    //This can have only single line: me[ns.currentSrcTypeName].playAt(t)
    ns.playAt = function (t) {
    try
    {
        ViTag.debug("Visap:playAt:Playing the tag which is created at time:" + t);  
        me[ns.currentSrcTypeName].playAt(t);
        }
        catch(err)
	    {
	       ViTag.error("Visap:playAt:Error in playAt for the time "+err);
	    }
    };
    //To continue the video from whereever it is paused.
    ns.continuePlay=function(){
        if (ns.yt.enabled)
          ns.yt.player.playVideo();
        else
          me.ctrl.video.play();
    };
    /// <summary>
    ///plays the video from a particular time
    /// </summary>
    /// <param name="t">time video to be played from</param>
    //This method needs to be named as "pause()"
    //This will enable caller to pause the video, without knowing what is the video type
    //Should be in line with ns.play and ns.playAt - single like me[type].pause()
    ns.pause = function () {
   	 try
   	 {
        // Pause the video when ever needed 
        if (ns.currentSrcTypeName)
            me[ns.currentSrcTypeName].pause();
        }
        catch(err)
	    {
	       ViTag.error("Visap:pause:Error in pause"+err);
	    }
    };

    //#endregion 

    //#region enum declarations for the sourcetype.
    ns.sourceTypeEnum = {
        uploaded: 0,
        youtube: 1,
        timeline: 2,
        directURL: 3
    }

    ns.actionSourceType ={
        nativequestion:'native',
        aelibquestion:'aelib'
    }
    ns.actionType={
     question:'questions',
     annotation:'annotation',
     hotspot:'hotspot',
     whiteboard:'whiteboard',
     sketch:'sketch'
    }
	
	ns.roles= {
	  Student:'4',
	  Instructor:'3'  
	
	}
    /// <summary>
    ///Gets the attributes of the videoby ID
    /// </summary>
    /// <param name="_id">Unique GUID</para

    // Check how is it different than ns.CurrentSrc
    //This method should be avoided. See if we can remove this meth
    ns.getSource = function (_id) {
   	 try
    	{
        return me.GetSource(_id);
         }
        catch(err)
	    {
	       ViTag.error("Visap:getSource:Error while getting  data from source for the id"+err);
	    }
    };

    //To check the video is in pause mode(for all the type of videos)
    ns.paused = function () {
    	try
    	{
        	if (ns.currentSrcTypeName)
            return me[ns.currentSrcTypeName].paused();
       }
        catch(err)
	    {
	       ViTag.error("Visap:paused:Error:while paused");
	    }
    };

    /// <summary>
    ///Loads the source  from database
    /// </summary>
    /// <param name="autoplay">Attribute of video</param>
    /// <param name="mode">Depicts whether stage or collabration data</param>
    /// <param name="user">Logged in UserName</param>
    ns.loadData = function (mode, user) {
   	 try
    	{
    	 
    	   ViTag.debug("Visap:loadData:load data for the user  and mode :" + user +"," + mode);  
        	me.loadData(mode, user);        
         }
        catch(err)
	    {
	       ViTag.error("Visap:loadData:Error while loading the data for the user" +err);
	    }
    };

    /// <summary>
    ///Loads the metaData from database
    /// </summary>
    /// <param name="vidId">Video ID</param>
    ns.GetMetaData = function (vidId) {
   	 try
    	{
    	ViTag.debug("Visap:GetMetaData:get metadata for the videoid :" + vidId);  
        return me.getMetaDataTimeLine = me.GetMetaData(vidId);
     	}
        catch(err)
	    {
	       ViTag.error("Visap:GetMetaData:Error while loading the metadata for the videoid" +err);
	    }
    }

    //This method should be inline with ns.play - single line
    //  single line - return me[type].currentTim

    /// <summary>
    ///To get current playing time of the video
    ///currentSrcTypeName means either upload,yt or timeline
    /// </summary>

    ns.getCurrentTime = function () {
    	try
    	{
        if (ns.currentSrcTypeName)
            return me[ns.currentSrcTypeName].currentTime();
        }
        catch(err)
	    {
	       ViTag.error("Visap:getCurrentTime:Error while getting the currenttime of the video"+err);
	    }
    }

    /// <summary>
    /// Duration of current video which is playing
    ///currentSrcTypeName means either upload,yt or timeline
    /// </summary>
    /// <returns>Returns total duration</returns>
    ns.getDuration = function () {    
    	try
    	{ 
        return me[ns.currentSrcTypeName].totalDuration();
     	}
        catch(err)
	    {
	       ViTag.error("Visap:getDuration:Error while Getting the total duration of the video"+err);
	    }
    }

    /// <summary>
    /// Renders the html tag which is displayed in UI
    /// </summary>
    /// <param name="isFS">Indificates full screen</param>

    //Need to re-review at later stage
    // Render current video attributes -Start- 
    ns.RenderCurrentTags = function (isFS) {
	    try
	    {
	    ViTag.debug("Visap:RenderCurrentTags:Render the tags for the video ");
	        if ($.isFunction(me.ctrl.$tags)) {
	            me.ctrl.$tags(me.curSrc, isFS);
	        }
		}   
	    catch(err)
	    {
	       ViTag.error("Visap:RenderCurrentTags:Renders the tags for the currently played video"+err);
	    }

    }


    /// <summary>
    /// Renders the html links which is displayed in UI
    /// </summary>
    /// <param name="isFS">Indificates full screen</param>
    //Re-revie
    ns.RenderCurrentLinks = function (isFS) {
    	try
	    {
	        ViTag.debug("Visap:RenderCurrentLinks:Render the links for the video ");
	        if ($.isFunction(me.ctrl.$links)) {
	            me.ctrl.$links(me.curSrc, isFS);
	        }
        }   
	    catch(err)
	    {
	       ViTag.error("Visap:RenderCurrentLinks:Error while Rendering the links for the currently played video"+err);
	    }
    }


    /// <summary>
    /// Renders the annotation and its html capabilities are decided here
    /// </summary>
    /// <param name="annotationObj">Annotation object to be displayed</param>
    ns.RenderCurrentAnnotates = function (annotationObj,ispreview) {
	    try
	    {
		        var vidContainerWidth = 540, annotationWidth = 200, annotationHeight = 44, a = annotationObj; //these values are fixed.
		        // Video tag total width
		        var l = me.ctrl.$videoMContainer.outerWidth(), ta = $("#tempAnnotate");
		        //used in Testpage
		        if (ta.length < 1){
			        $("body").append("<div id='tempAnnotate' class='divAnnotate'></div>");
			     }
		         
		         $('#annotates').find("p").remove();
		         ns.ispreview=ispreview;
		        if (a) {
		            ns.pauseByAction=true;//show's annotation action and hide the default action container for new theme.
		            var marginLeft, marginTop;
		            // Adding temporary div to get actual height of the annotation text
		            ta.html("Annotations: " + ViTag.htmlEncode(a.title) + a.description);

					// Display annotation in a particular position.
		            if (!ns.isFullScreenON) {
		                marginLeft = a.AnnotationAttributes.left;
		                marginTop = a.AnnotationAttributes.top;
		            } else {
		                var height = me.ctrl.$videoMContainer.outerHeight();
		                marginLeft = (((l * parseInt(a.AnnotationAttributes.left, 10)) / vidContainerWidth) * (1 + (annotationWidth / l)));
		                marginTop = (((height * parseInt(a.AnnotationAttributes.top, 10)) / ((height / 2) - 25)) * (1 + (annotationHeight / height))); //to get the normal screen height in fullscreen just deviding the fullscreen height by 2 
		            }
		             if (a.PauseOnShow === true){
                        ViTag.PauseOnShow();
                     }
		           me.ctrl.$annotates.animate({ height: a.AnnotationAttributes.height, width: a.AnnotationAttributes.width, left: marginLeft, opacity: "show", top: marginTop }, 1500, function () {
		                $(this).append("<p class='ansContent'>"+ViTag.htmlEncode(unescape(a.title))+"</p>"+ns.htmlDecode(a.description));
		            });
		        }
		        else {
		            // Hide annotation meaning css attributes  are explicitly as shown below
		            if (me.ctrl.$annotates.html() !== "") 
	                   me.ctrl.$annotates.slideUp(1000);
		            else me.ctrl.$annotates.hide().css({ left: "0px", width: "0px", top: "0px" });
		        }
		    }        
	     catch(err)
	    {
	       ViTag.error("Visap:RenderCurrentAnnotates:Error while Rendering annotation object"+err);
	    }
    }
    
    ns.PauseOnShow=function(){
       //If user select PauseOnShow Checkbox, then the Video will Pause.
       $("#imgPlay").removeClass("imgPause").addClass("imgPlay");
       ns.pause();
       //If user selects stop button and starts playing 
       //  when it pause the video automatically after click on play button 
       //video will start playing from beggining(snippetPlaY)
       // To avoid this ns.tmVideoEnd is set to false
       ns.tmVideoEnd = false;
    }   

    /// <summary>
    /// Renders the whiteboard and its html capabilities are decided here
    /// </summary>
    /// <param name="whiteboardObj">Whiteboard object to be displayed</param>
    ns.RenderCurrentWhiteboard = function (whiteboardObj) {
    try
    {
        ns.removeCKobjects();  //To remove Ck-Editor in play mode
        var whiteboardDirection;
        if (whiteboardObj) {
            ns.pauseByAction=true;//show's whiteboard action and hide the default action container for new theme.
            var whiteboardWidth = whiteboardObj.whiteboardAttributes.width; //Width of the whiteboard.
            //Postion of the whiteboard(left,right,leftout,rightout).
            var whiteboardPosition = whiteboardObj.whiteboardPosition;
            ViTag.debug("Visap:RenderCurrentWhiteboard:position and width of the whiteboardobject:"+whiteboardWidth+","+whiteboardPosition);

            var videoContainerHeight = me.ctrl.$videoMContainer.height(); //Height of the Video Container.
            me.ctrl.$whiteBoardWrapper.css('display', 'block');
            me.ctrl.$wboardContainer.css('display', 'block');
            me.ctrl.$wbdragbar.css('display', 'none');
            $("#canvasWB").hide();
            me.ctrl.$wboardContainer.removeClass(' wbLeftPos wbRightPos wbLeftOutPos wbRightOutPos wbRightFSPos');
            me.ctrl.$wboardContainer.css({ width: whiteboardWidth });
            me.ctrl.$textcontent.show().css("z-index","0");
            me.ctrl.$textcontent.html(ViTag.htmlDecode(whiteboardObj.description)); //Text Content will display on the whiteboard.   
            me.ctrl.$WbimgOverlay.attr("src", whiteboardObj.sketchData);
     
            var txtHeight=ns.whiteboardTxtHeight();	
            me.ctrl.$WbimgOverlay.attr("height", txtHeight);
            if (whiteboardObj.sketchData)//if only text needs to save then Wbimageoverlay should be hide.
             me.ctrl.$WbimgOverlay.show();
            whiteboardDirection = ns.DirectionOfWhiteboard(whiteboardPosition);//To display whiteboard when the object found(left and rightout).
            ViTag.debug("Visap:RenderCurrentWhiteboard:Gets the direction of the current whiteboard:"+whiteboardDirection);
            if (whiteboardObj.PauseOnShow === true) {
               ViTag.PauseOnShow();
            }
            if (ns.isFullScreenON) {
                ns.whiteboardFullScreen(whiteboardDirection);//whiteboard will display left by defualt in fullscreen
            }
            else {
                me.ctrl.$wboardContainer.hide(0).delay(0).toggle('slide', { direction: whiteboardDirection },
                    1000).css({ 'height': videoContainerHeight });
            }
        }
        else {    //To disappear the whiteboard when the object is not found.           
             me.ctrl.$wboardContainer.animate().hide();
             me.ctrl.$whiteBoardWrapper.animate().hide();//Hide parent element of whiteboard.
        }
        }        
	     catch(err)
	    {
	       ViTag.error("Visap:RenderCurrentWhiteboard:Error while Rendering whiteboard"+err);
	    }
    }
   
   //To get height of txt content, depending on this hieght imgoverlay height will be set.
    ns.whiteboardTxtHeight=function()
    {
          var textcontentHeight = $("#textcontent").prop('scrollHeight');
                if (textcontentHeight>me.ctrl.$videoMContainer.height()){//if textcontent height is greater then wbcontainer height.
                    var height = textcontentHeight;
                }
                else{
                    height = me.ctrl.$videoMContainer.height();
                }
                    return height;
       }
   
    //To display whiteboard depending on the direction(Left,Right,LeftOut and Rightout).
    ns.DirectionOfWhiteboard = function (whiteboardOption) {
    
    try
    {
    	ViTag.debug("Visap:DirectionOfWhiteboard:Getting direction based on option sent as parameter:"+whiteboardOption);
        if (whiteboardOption === 'wbLeftPos'||whiteboardOption === 'wbRightOutPos') {
	            //Declaring Directions of whiteboard,dragbar and canvas.
	            var direction = 'left',
	                wbdragbar = 'wbDragbarLeft',
	                canvascontainer = 'canvascontainerLeft',
	                textcontainerWB = 'textcontainerWBLeft';
	                
	        }
	            //To display whiteboard when the object is(Right and Leftout).
	        else if (whiteboardOption === 'wbRightPos' || whiteboardOption === 'wbLeftOutPos') {
	            direction = 'right';
	            wbdragbar = 'wbDragbarRight';
	            canvascontainer = 'canvascontainerRight';
	            textcontainerWB = 'textcontainerWBRight';
	             
	        }
	        me.ctrl.$wboardContainer.addClass(whiteboardOption);//adding the css class to displaying position
	        me.ctrl.$wbdragbar.addClass(wbdragbar);
	        me.ctrl.$sketchcontainerWB.addClass(canvascontainer);
	        me.ctrl.$textcontainerWB.addClass(textcontainerWB);
	        
	        return direction;
      }        
	     catch(err)
	    {
	       ViTag.error("Visap:DirectionOfWhiteboard:Error while display whiteboard depending on the direction");
	    }
    };

    //whiteboard will display left by defualt in fullscreen
    ns.whiteboardFullScreen = function (position)
    {
    try
    {
        if (ns.isFullScreenON) {//If it full screen,whiteboard will display left by defualt.
         ViTag.debug("Visap:whiteboardFullScreen:whiteboard full screen event raised");
            var videoHeight = me.ctrl.$videoMContainer.outerHeight();
            var videoWidth = me.ctrl.$videoMContainer.outerWidth() / 2;
            var WbimgOverlayWidth = videoWidth - 100;
            me.ctrl.$WbimgOverlay.attr("width", WbimgOverlayWidth);
            me.ctrl.$wboardContainer.removeClass(' wbLeftPos wbRightPos wbLeftOutPos wbRightOutPos wbRightFSPos');
            if(position==="left")
            me.ctrl.$wboardContainer.addClass('wbLeftPos');
            else
            me.ctrl.$wboardContainer.addClass('wbRightFSPos');
            me.ctrl.$wboardContainer.hide(0).delay(0).toggle('slide', { direction: position },
           1000).css({ 'height': videoHeight, width: videoWidth });
        }
        }
         catch(err)
	    {
	       ViTag.error("Visap:whiteboardFullScreen:Error while Displaying whiteboard in fullscreenboard"+err);
	    }
    }

    //To remove Ck-Editor in play mode
    ns.removeCKobjects = function () {
    try
    {
        if (window.CKEDITOR !== undefined) {
         ViTag.debug("Visap:removeCKobjects:if ckEditor exists destroy it while toggling");
            if (ns.editor.ckEditorInstanceAvilable(cmtWiteboard)) {
                for (obj in CKEDITOR.instances) {
                    var instance = CKEDITOR.instances[obj];
                    instance.destroy()
                }
            }
            
        	}
        	
        }
         catch(err)
	    {
	       ViTag.error("Visap:removeCKobjects:Error while removing Ck-Editor in play mode"+err);
	    }
    }

    /// <summary>
    /// Renders the hotspot and its html capabilities are decided here
    /// </summary>
    /// <param name="annotationObj">Annotation object to be displayed</param>
    ns.RenderCurrentHotspot = function (hotspotObj,ispreviewMode) {
    try
    {  
        var vidContainerWidth = 540, hotspotWidth = 15, hotspotHeight = 15;//these values are fixed.
        // Video tag total width
        var l = me.ctrl.$videoMContainer.outerWidth();
        //used in Testpage
        ns.previewModehotspot=ispreviewMode;
        if (hotspotObj) {
         ViTag.debug("Visap:RenderCurrentHotspot:hotspot rendered having tittle,description:"+unescape(hotspotObj.title) +"," + unescape(hotspotObj.description));
          ns.pauseByAction=true;//show's hotspot action and hide the default action container for new theme.
            var marginLeft, marginTop;
            // Adding temporary div to get actual height of the annotation text

           
            // Display annotation in a particular position.
            if (!ns.isFullScreenON) {
                marginLeft = hotspotObj.hotspotAttributes.left;
                marginTop = hotspotObj.hotspotAttributes.top;
            } else {
                var height = me.ctrl.$videoMContainer.outerHeight();
                marginLeft = (((l * parseInt(hotspotObj.hotspotAttributes.left, 10)) / vidContainerWidth) * (1 + (hotspotWidth / l)));
                marginTop = (((height * parseInt(hotspotObj.hotspotAttributes.top, 10)) / ((height / 2))) * (1 + (hotspotHeight / height))); //to get the normal screen height in fullscreen just deviding the fullscreen height by 2 
            }
            me.ctrl.$hotspotCircle.css({ left: marginLeft, top: marginTop });
            me.ctrl.$hotspotCircle.show().delay(2000);
            $('#hotspotBox').css('display', 'none');
            me.ctrl.$hotspotCircle.draggable('disable');
            me.ctrl.$hotspotCircle.bind("click", function (e) {
                if ($(e.target).is('.closeHS'))
                    return false;
                ns.previewHotspot(hotspotObj);
            });

            if (hotspotObj.showOnpause === 1) {
                ViTag.PauseOnShow();
                ns.previewHotspot(hotspotObj);
            }

        }
        else {

            me.ctrl.$hotspotCircle.unbind("click");
            me.ctrl.$hotspotCircle.hide();
            me.ctrl.$hotspotCircle.draggable('enable');
          
        }
        }
         catch(err)
	    {
	       ViTag.error("Visap:RenderCurrentHotspot:Error in Rendering  the hotspot"+err);
	    }

    }
    ///When user click on preview button 
    ///also while rendering hotspot on screen need to show popup box
    ///Here popup box opens and close button is appended
    ns.previewHotspot = function (hotspotObj) {
     try
    	{
	        me.ctrl.$hotspotCircle.html('');
	        ViTag.debug("Visap:previewHotspot:Hotspot tittle and hotspot descrpition:"+unescape(hotspotObj.title) +"," + unescape(hotspotObj.description));
	        me.ctrl.$hotspotCircle.append("<div id='hotspotBox'  class='hotspotBox'> <strong> <span class='hstitle'>" + ViTag.htmlEncode(unescape(hotspotObj.title)) + " </span></strong><br/>" + ViTag.htmlEncode(unescape(hotspotObj.description)) + "</div>");
	        $('#hotspotBox').prepend("<div class='closeHS' onclick='ViTag.removeHotspot()' >X</div>");
	        $('#hotspotBox').css('display', 'block');
        }
         catch(err)
	    {
	       ViTag.error("Visap:previewHotspot:Error in previewing the hotspot"+err);
	    }
    }

    /// when user clicks on close button of the popup box of hotspot
    /// pop up box closed and hotspot circle will remain untill duration
    ns.removeHotspot = function () {
     try
    	{
        $('#hotspotBox').css('display', 'none');
         }
         catch(err)
	    {
	       ViTag.error("Visap:removeHotspot:Error while removing the hotspot"+err);
	    }
    }

    // Render current video attributes -Start- 
    // Current source attributes -Start- 
    /// <summary>
    /// Function exposed to access the current playing source
    /// </summary>
    /// <returns>Returns Currentsource</returns>
    ns.CurrentSrc = function () {
    try
    {
        return me.curSrc;
      }
      catch(err)
	    {
	       ViTag.error("Visap:CurrentSrc:Error while getting the currentsource attribute"+err);
	    }
    };

    ns.CurrentTimelineSrc = function () {//Function exposed to access the metadata of timeline
        try
    	{
        return me.getMetaDataTimeLine;
        }
      	catch(err)
	    {
	       ViTag.error("Visap:CurrentTimelineSrc:Error while getting the metadata of timeline"+err);
	    }
    };

    /// <summary>
    /// Function exposed to access the tags of current playing source
    /// </summary>
    /// <returns>Returns tags of Currentsource</returns>
    ns.CurrentTags = function () {
    	try
    	{
        return me.curSrc.tags;
        }
      	catch(err)
	    {
	       ViTag.error("Visap:CurrentTags:Error while getting the tagsof currently played video"+err);
	    }
    };
 
    /// Function which Extracts the actions from actionlist of currentsource
    /// </summary>
    /// <returns>Returns list of respective actions</returns>
    ns.CurrentActionList = function (type) {
    try
    {
      ViTag.debug("Visap:CurrentActionList: Extracts action from actionlist");
        var actionAry = [];
        var actions = me.curSrc.actions;
        if (actions !== undefined && actions.length > 0) {
            for (var i = 0; i < actions.length; i++) {
                for (var j = 0; j < actions[i].listAction.length; j++) {
                    if (actions[i].listAction[j].type === type) {
                        actionAry.push(actions[i].listAction[j].data);
                    }

                }
            }
        }
        return actionAry;
        }
        catch(err)
	    {
	       ViTag.error("Visap:CurrentActionList:Error while getting the list of action"+err);
	    }
    };

    /// <summary>
    /// Function which Extracts the questions  from actionlist of currentsource
    /// </summary>
    /// <returns>Returns list of questions</returns>
    ns.CurrenQuestList = function () {
    try
    {
        var questAry = [];
        var actions = me.curSrc.actions;
         ViTag.debug("Visap:CurrenQuestList:read actions from currentsource");
        if (actions !== undefined && actions.length > 0) {
        ViTag.debug("Visap:CurrenQuestList:loop the actions based on the type question,action length being :"+actions.length);
            for (var i = 0; i < actions.length; i++) {
                for (var j = 0; j < actions[i].listAction.length; j++) {
                    if (actions[i].listAction[j].type === 'questions') {
                        questAry.push(actions[i].listAction[j]);
                    }
                }
            }
        }
        return questAry;
        }
        catch(err)
	    {
	       ViTag.error("Visap:CurrenQuestList:Error while getting the questions from actions"+err);
	    }
    };

    /// <summary>
    /// Function which points to list of links of currentplayed video
    /// </summary>
    /// <returns>Returns list of links</returns>
    ns.CurrentLinks = function () {
    try
    {
        return me.curSrc.links;
        }
        catch(err)
	    {
	       ViTag.error("Visap:CurrentLinks:Error while accessing the currentlinks");
	    }
    };



    //#region toggleScreen 
    /// <summary>
    /// Moving from normal to fullscreen and from fullscreen to normal screen.
    /// </summary>   
    ns.toggleScreen = function () {
    try
    {
        if (!(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement)) {
            if (!ns.isCustomFullScreen){
	            ns.raiseFullScreen(false);
	        }
        } else ns.isCustomFullScreen = false;
        //hide the overlays and annotations in full screen
        me.ctrl.$imgOverLays.hide();
        me.ctrl.$annotates.hide();
         }
        catch(err)
	    {
	       ViTag.error("Visap:toggleScreen:Error while moving from fulscreen to normal screen"+err);
	    }
    };
    //#endregion 

    //#region closePlayer 
    /// <summary>
    /// Event triggered for closing the player to be handled wherever required
    /// </summary>   
    ns.closePlayer = function () {
     try
    	{
        $("body").trigger("closePlayer");
        ViTag.debug("Visap:closePlayer:making me.curSrc null because when user try to delete the playing video,it should allow");
        me.curSrc = null; 
		}
        catch(err)
	    {
	       ViTag.error("Visap:closePlayer:Error while triggering closeplayer"+err);
	    }        //making me.curSrc null because when user try to delete the playing video,it should allow.
    };

    //#endregion 

    //#region  Unnecessary global variables 
    // Unnecessary global variables are created, check the functionlaity and remove those 
    ns.disableEditMode = false;
    ns.editmodeValue = false;
    ns.isFullScreenON = false;
    ns.showActions = true;
    ns.isCustomFullScreen = false;
    ns.isTimelIneMode = false;
    ns.pauseByAction=false;
    //#endregion 
    ns.htmlEncode = function (value) {
    try
    	{
        //create a in-memory div, set it's inner text(which jQuery automatically encodes)
        //then grab the encoded contents back out.  The div never exists on the page.
        return $('<div/>').text(value).html();
        }
        catch(err)
	    {
	       ViTag.error("Visap:htmlEncode:Error while encode"+err);
	    }
    };
    ns.htmlDecode = function (value) {
    	try
    	{
        	return $('<div/>').html(value).text();
        }
        catch(err)
	    {
	       ViTag.error("Visap:htmlDecode:Error while htmlDecode"+err);
	    } 
    };
    
    ns.getTimeFormat=function(time){
         return me.cp.getTimeFormat(time);
      };   
    ns.getsourceTypeName=function(type){
        return me.sourceTypeName(type);
    };
      
    //#endregion 

    //#region Private
    var me = {

        //Arrays declared further to be used
        curSrc: {}, ctrl: {}, curHeader: {}, getMetaDataTimeLine: {}, isTimeline: false,


        _misc: {
            SupportsHTML5: function () {
                return (me.ctrl.video.autoplay != "");
            },
            debug: function (s) {
                if (window.console && window.console.debug)
                    window.console.debug(s);
            }
        },

        /// <summary>
        /// Based on unique GUID source is searched 
        /// </summary>   
        SetCurrentSrc: function (_id) {
         ViTag.debug("Visap:SetCurrentSrc:Based on unique GUID source is searched "+_id);
            return ns.source ? $.grep(ns.source, function (e) { return e._id == _id; })[0] : null;
        },

        /// <summary>
        /// Based on sourcetype return text
        /// </summary>   
        currentSrcTypeName: function () {
         ViTag.debug("Visap:currentSrcTypeName: gets the sourcetype of the current video");
            return me.sourceTypeName(ns.CurrentSrc().sourcetype);
        },
        //To get the source type name
        sourceTypeName: function (type) { //type may be{0[uploaded],1[youtube],2[timeline],3[directURL]}
            switch (type) {
                case 0:
                    return "uploaded";
                case 1:
                    return "youtube";
                case 2:
                    return "timeline";
                case 3:
                    return "directURL";
                
            }
        },
        /// <summary>
        /// Time update invokes when video starts playing to get currentTime for the 
        /// custom seekbar
        ///currentSrcTypeName means either upload,yt or timeline
        /// </summary>
        /// <returns>Returns updated time</returns> 
        timeUpdate: function () {
            me[ns.currentSrcTypeName].timeupdate();
        },

        /// <summary>
        /// All functionality related to uploaded video in upload namespace
        /// </summary>   
        uploaded: {

            /// <summary> 
            /// Play uploaded video based on source
            /// </summary>   
            play: function (src, isTimeline) {
             ViTag.debug("Visap:uploaded: playing uploaded video" + src +"," +isTimeline);
                //check the condition if video is definrd or not
                if (me.ctrl.$video === undefined)
                    return false;
                // If youtube player API added
                me.ctrl.$playerDiv.css("display", "none");
                me.ctrl.$video.css("display", "block");
                if (ns.yt.player) {
                    ns.yt.player.pauseVideo();
                    me.ctrl.video.play();
                }
                ns.yt.enabled = false;
                // Height and width will set when full screen mode on
                //video attr source is set the repo path with source name 
                 //This method will get the video token
               if(ViTag.tokenURL!=null){
                	ViTag.getVideoAuthToken(ViTag.videoId);
               }
                
                me.ctrl.$video.attr("src", me.video.path + src+"?t="+ViTag.tokenId);
                me.ctrl.$video.removeAttr("width");
                me.ctrl.$video.removeAttr("height");
                if (!isTimeline) {  //These two lines of code should not execute for the timeline videos.so checking this condition
                    me.renderAttrs(src);
                     ViTag.debug("Visap:uploaded: raise an event if the playing source gets changed");                   
                    $("body").trigger("onSrcChange", src);
                }
            },
            //This function is written to set the currenttime value.
            //(firefox is not allowing to set the currenttime immediately after playing the video so,recursively calling this function in catch block)
            playAt: function (t) {
                try {
                    me.ctrl.video.currentTime = t;
                }
                catch (err) {
                    setTimeout(function () { me.uploaded.playAt(t) }, 100);
                }
            },
            ///to assign the src and to play from the particular time.(src is source name and type of that source(youtube,directurl,uploaded))
            playFromTime: function (src, time) {
             ViTag.debug("Visap:playFromTime:to assign the src and to play from the particular time"+ src +"," + time);
                me.uploaded.play(src, true); //this will invoke play of particular video.
                me.uploaded.playAt(time);   //this will invoke playAt of particular video.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>

            pause: function () {
                me.ctrl.video.pause();
            },

            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                return me.ctrl.video.paused;
            },
            /// <summary>
            /// Gets the currentTime of video
            /// </summary>   
            /// <returns>Returns current time of video</returns>
            currentTime: function () {
                return me.ctrl.video.currentTime;
            },

            /// <summary>
            ///sets the text of the duration and the playing timw
            /// </summary>   

            timeupdate: function () {
                me.cp.getplayTimer();
                //Formula for the seek position
                 if (Math.floor((100 / me.ctrl.video.duration) * me.ctrl.video.currentTime) >= 0)
                me.cp.ctrl.seek.value = Math.floor((100 / me.ctrl.video.duration) * me.ctrl.video.currentTime);
            },

            /// <summary>
            ///If the seekbar is changed(explicitly) video currenttime needs to eb updated 
            /// </summary>   

            seekbarchange: function () {
                var time = (me.cp.ctrl.seek.value / 100);
                me.ctrl.video.currentTime = time * me.ctrl.video.duration;
            },
            /// <summary>
            ///Total duration of the video 
            /// </summary>   

            totalDuration: function () {
                //return Math.floor(me.ctrl.video.duration); already stored total duration is used
                if(ns.CurrentSrc)
                return ns.CurrentSrc().videototalduration;
            },
            /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function(screenwidth,screenheight){
               
                me.ctrl.video.width = screenwidth - 100;
                // Based on player height, width will be calculated. Same will happen when width set to player.
                if (me.ctrl.$video.outerHeight() > (screenheight - 100)) {
                    me.ctrl.video.height = screenheight - 100;
                    me.ctrl.$video.removeAttr("width");
                }
                else
                me.ctrl.$video.removeAttr("height");
              
               }
        },


        //This is the namespace to upload video by url(mp4,ogg.webm)
        directURL: {

            play: function (src, isTimeline) {
             ViTag.debug("Visap:directURL:playing directURL video" + src +"," +isTimeline);
                //check the condition if video is definrd or not
                if (me.ctrl.$video === undefined)
                    return false;
                me.ctrl.$playerDiv.css("display", "none");
                me.ctrl.$video.css("display", "block");
                // If youtube player API added
                if (ns.yt.player) {
                    ns.yt.player.pauseVideo();
                    me.ctrl.video.play();
                }
                ns.yt.enabled = false;

                // Height and width will set when full screen mode on
                //video attr source is set the repo path with source name 
                me.ctrl.$video.attr("src", src);
                me.ctrl.$video.removeAttr("width");
                me.ctrl.$video.removeAttr("height");
                if (!isTimeline) {  //These two lines of code should not execute for the timeline videos.so checking this condition
                    me.renderAttrs(src);
                    //raise an event if the playing source gets changed
                    $("body").trigger("onSrcChange", src);
                }
            },
            //This function is written to set the currenttime value.
            //(firefox is not allowing to set the currenttime immediately after playing the video so,recursively calling this function in catch block )
            playAt: function (t) {
                try {
                 ViTag.debug("Visap:directURL:playAt: for the time "+t);
                    me.ctrl.video.currentTime = t;
                }
                catch (err) {
                    setTimeout(function () { me.directURL.playAt(t) }, 100);
                }
            },

            ///to assign the src and to play from the particular time.
            playFromTime: function (src, time) {
                ViTag.debug("Visap:directURL:playFromTime:play video for the src and time" + src +","+time);
                me.directURL.play(src, true); //this will invoke play of particular video.
                me.directURL.playAt(time);   //this will invoke playAt of particular video.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>

            pause: function () {
                me.uploaded.pause();
            },

            /// <summary>
            /// Gets the currentTime of video
            /// </summary>   
            /// <returns>Returns current time of video</returns>
            currentTime: function () {
                return me.uploaded.currentTime();
            },

            /// <summary>
            ///sets the text of the duration and the playing timw
            /// </summary>   

            timeupdate: function () {
                me.uploaded.timeupdate();
            },

            /// <summary>
            ///If the seekbar is changed(explicitly) video currenttime needs to eb updated 
            /// </summary>   

            seekbarchange: function () {
                me.uploaded.seekbarchange();
            },
            /// <summary>
            ///Total duration of the video 
            /// </summary>   
            totalDuration: function () {
             
              if(ns.CurrentSrc)
              return ns.CurrentSrc().videototalduration;
            },
            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                return me.uploaded.paused();
            },
               /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function(screenwidth,screenheight){
                      
                me.ctrl.video.width = screenwidth - 100;
                // Based on player height, width will be calculated. Same will happen when width set to player.
                if (me.ctrl.$video.outerHeight() > (screenheight - 100)) {
                    me.ctrl.video.height = screenheight - 100;
                    me.ctrl.$video.removeAttr("width");
                }
                else
                me.ctrl.$video.removeAttr("height");
                 
            }
        },


        /// <summary>
        /// youtube Namespace
        /// </summary>   
        youtube: {

            /// <summary>
            /// Play youtube video based on videoID
            /// </summary>   
            play: function (videoID, isTimeline) {
              ViTag.debug("Visap:youtube:play:playing video"+ videoID +","+isTimeline);
                //video is paused
                me.ctrl.video.pause();
                me.ctrl.$video.css("display", "none");
                me.ctrl.$playerDiv.css("display", "block");
                // To load the video to youtube player with using video ID
                if (ns.yt.player)
                    ns.yt.player.loadVideoById(videoID);
                else me.initYTplayer(videoID);
               
                // This variable will set to 'true' once youtube video selecteD to play
                ns.yt.enabled = true;
                //renders the attributes of the video
                if (!isTimeline) { //These two lines of code should not execute for the timeline videos.so checking this condition
                    me.renderAttrs(videoID);
                    $("body").trigger("onSrcChange", videoID);
                }
                 
                
            },
            //This function is written to set the currenttime value.
            //(firefox is not allowing to set the currenttime immediately after playing the video so,recursively calling this function in catch block )
            playAt: function (t) {
                try {
                    ns.yt.player.seekTo(t, true);
                }
                catch (err) {
                    setTimeout(function () { me.youtube.playAt(t) }, 100);
                }
            },
            ///to assign the src and to play from the particular time.(src is source name and type of that source(youtube,directurl,uploaded))
            playFromTime: function (src, time) {
                me.youtube.play(src, true); //this will invoke play of particular video.
                me.youtube.playAt(time); //this will invoke playAt of particular video.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>
            pause: function () {
                ns.yt.player.pauseVideo();
            },
            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                if (ns.yt.videoState == 2 || ns.yt.videoState == -1) return true;
                else return false;
            },
            /// <summary>
            /// Gets the currentTime of yt player
            /// </summary>   
            /// <returns>Returns current time of youtube video</returns> 
            currentTime: function () {
                return ns.yt.player.getCurrentTime();
            },

            /// <summary>
            ///Player time is adjusted when seekbar is moved
            /// </summary>   
            seekbarchange: function () {
                var time = (me.cp.ctrl.seek.value / 100);
                ViTag.debug("Visap:seekbarchange:adjust player time with respect to seekbar"+time);
                //similiar to timeupdate for other videos
                ns.yt.player.seekTo(time * ns.yt.player.getDuration(), true);

            },
            /// <summary>
            ///Gets the players duration
            /// </summary>   
            /// <returns>Returns total duration</returns> 
            totalDuration: function () {
            
 				if(ns.CurrentSrc)                
                return ns.CurrentSrc().videototalduration;
            },
                  /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function(sceenwidth,screenheight){
                // setsize is undefined if there is no timeout 
                setTimeout(function(){
                     ns.yt.player.setSize(sceenwidth-100, screenheight-100);
                 },1000)
            }


        },

        /////***********************timeline ************////////////////////////


        /// <summary>
        ///Timeline Namespace
        /// </summary>   
        /// <returns>Returns total duration</returns> 
        timeline: {

            snipType: -1,

            /// <summary>
            /// Play timeline video based on details of timeline
            /// </summary>   
            /// <param name="dt">dt is details of the timeline videos </param>
            play: function (dt) {
             ViTag.debug("Visap:timeline:play timeline video"+dt[0].data.srcTimeline);
                me.bunchSq = 0;
                ns.timelinePlay=true;
                me.timeline.snippetPlay(me.bunchSq);
                me.renderAttrs(dt);
                //triggers timeline Video
                $("body").trigger("onTmSrcChange", dt[0].data.srcTimeline);

            },
            /// <summary>
            /// Play timeline video based on details of timeline
            /// </summary>   
            /// <param name="t">Time at which video has to play</param>
            playAt: function (t) {
                me.cp.ctrl.seek.value = Math.floor((100 / me.timeline.totalDuration()) * t);
                me[ns.currentSrcTypeName].seekposition(t);
                ViTag.debug("Visap:timeline:playAt: timeline video tag play at the time: "+t);
                //relative movement of seek bar calculation
                if (ns.tmVideoEnd) 
                me.timeline.pause();
                ns.tmVideoEnd = false;  //if user stop the timeline video then click on the tag,
                //play the video it should play from the tag region.
            },
            ///<summary>
            /// pause the video when ever user wants to stop the video being played
            ///</summary>
            pause: function () {
                me[me.timeline.snipType].pause();
            },

            //This will check the video is in paused state.if its paused it will return true or it will return false.
            paused: function () {
                return me[me.timeline.snipType].paused();
            },

            /// <summary>
            /// plays right snippet on click of tags or seek bar change
            /// </summary>   
            /// <param name="dt">dt is details of the timeline videos </param>
            /// <param name="actualTime">time at which Timeline snippet has to play </param>
            snippetPlay: function (seq) {
                //to get the next src incrementing bunchsq.
                var snip = ns.CurrentSrc().src[seq];
                if (snip) {
                    me.timeline.snipType = me.sourceTypeName(snip.data.sourcetype);
                    ViTag.debug("Visap:timeline:snippetPlay:sequence of the timeline which is played "+seq);
                    //internal play methods of all the videos should know from where the play method has been called so passing true here.
                    me[me.timeline.snipType].playFromTime(snip.data.srcTimeline, parseInt(snip.data.startTime));
                    // when there is a change in snippet and video in fullscreen mode related changes will betaken here
                   me.cp.fullscreenOnsnippetChange();
                }
                else {
                    //once all the snippets are played tmVideoEnd variable is set to true
                    ViTag.pause();
                    ns.tmVideoEnd = true;
                    ViTag.debug("Visap:timeline:Timeline video played all the snippets");
                    //Enable imgreplay button
                    me.cp.ctrl.play.className = "imgReplay";
                    me.cp.clearInterval();
                }
            },

            /// <summary> 
            /// when user change seek bar or when video played at perticular position
            /// then seek bar position needs to be moved to the relavent position
            /// </summary>   
            /// <param name="t">Calculated time to which seek bar has to move</param>

            seekposition: function (t, seekbarValueChanged) {
				 ViTag.debug("Visap:seekposition:calculated time to which seek has to move "+t +"," +seekbarValueChanged);
                var duration = 0, actualTime = 0, stTime = 0, totalduration = 0, seekposition = t;
                actualTime = t;
                //looping for Snippets inside the TimelineVideo
                for (var i = 0; i < ns.CurrentSrc().src.length; i++) {
                    stTime = ns.CurrentSrc().src[i].data.startTime;
                    duration = ns.CurrentSrc().src[i].data.duration;
                    actualTime = parseInt((parseInt(t) + stTime));
                    var type = me.sourceTypeName(ns.CurrentSrc().src[i].data.sourcetype);
                    me.timeline.snipType = type;
                    //relative moving of the time based on duration
                    if (duration < t)
                        t = t - duration;
                    else {
                        //if the time is got then pass the data of that video based on index and actualtime to play snippet
                        me.bunchSq = i;
                        me.cp.ctrl.$currentTime.text(me.cp.getTimeFormat(seekposition));
                        me[type].playFromTime(ns.CurrentSrc().src[i].data.srcTimeline, parseInt(actualTime));
                        if (ns.videoPaused)
                            ViTag.pause();

                        return false;
                    }
                }
            },

            /// <summary>            
            /// Current Time of the timeline video
            /// </summary>  
            currentTime: function () {
                var duration = 0, index = me.bunchSq, time = me[me.timeline.snipType].currentTime(); 
                for (var i = 0; i < index; i++) {
                    duration += ((ns.CurrentSrc().src[i].data.duration + ns.CurrentSrc().src[i].data.startTime) - ns.CurrentSrc().src[i].data.startTime);
                }
                if (index < ns.CurrentSrc().src.length)
                    return Math.round((time - ns.CurrentSrc().src[index].data.startTime) + duration);

            },

            /// <summary>            
            /// timeupdate will return false for timeline video.(this is because to update the time setinterval method has been used.)
            /// </summary> 
            timeupdate: function () {
                return false;
            },
            /// <summary>            
            /// when bar is changed calculates the new seek position value
            /// </summary> 
            seekbarchange: function () {
             ViTag.debug("Visap:timeline:seekbarchange: seekbarchanges calculates the seek  values");
               var isseekChanged = true;
                var time = (me.cp.ctrl.seek.value / 100) * me.timeline.totalDuration();
                me[ns.currentSrcTypeName].seekposition(time, isseekChanged);

            },
            //To get the current snippet sourcetpe

            /// <summary>            
            /// total duration for the specific timeline
            /// </summary> 
            totalDuration: function () {
                var tmtotDuration = 0;
                if (ns.CurrentSrc() !== undefined) {
                    for (var i = 0; i < ns.CurrentSrc().src.length; i++) {
                        tmtotDuration = (tmtotDuration + ns.CurrentSrc().src[i].data.duration); //to get total duration
                    }
                }
 			ViTag.debug("Visap:timeline:totalDuration"+tmtotDuration);
                return Math.floor(tmtotDuration);
            },
            //setinterval method for the timeline videos
            setInterval: function () {
                if (me.cp.interval){
	                clearInterval(me.cp.interval);
	             }
                me.cp.interval = setInterval(me.cp.setSeekbarCurrentTime, 1000);
            },
               /// <summary>
            /// set the video size in fullscreen
            ///<summary>
            setVideoSize: function(screenwidth,screenheight){
                    me[me.timeline.snipType].setVideoSize(screenwidth,screenheight);
            }

        },
        ////////////***********timeline ends***************//////////

        /// <summary>            
        /// Initilization of the timer and tickhandlers fro all actions
        /// </summary> 
        addHandlers: function () {
            timer.init();
            timer.addHandler(sketcher.tickHandler);
            timer.addHandler(annotator.tickHandler);
            timer.addHandler(hotspot.tickHandler);
            timer.addHandler(whiteboard.tickHandler);
            timer.addHandler(test.tickHandler);
        },

        /// <summary>            
        /// Initilization of the  youtube player
        /// </summary> 
        initYTplayer: function (videoID) {
            // Create youtube player with using YouTube iframe API, here YT is global object of YouTube iframe API
            setTimeout(function () {
               ns.yt.player = new YT.Player(me.video.playerYT, {
                    height: '390',
                    width: '640',
                    videoId: videoID,
                    playerVars: {
                        'autoplay': 1,
                        'controls': 0,
                        'rel': 0,
                        'fs':0
                    },
                    events: {
                        'onReady': function () {
                            $("body").trigger("onYTinit", videoID);
                        },
                        'onStateChange': function (e) {
                            ns.yt.videoState = e.data;
                            if (e.data == YT.PlayerState.PLAYING) {
                                me.cp.ctrl.play.className = "imgPause";
                            }
                            if (e.data == YT.PlayerState.ENDED) {
                            	me.cp.ctrl.play.className = "imgReplay";
                                ViTag.disabelEditPanel();
                            }
                        }
                    }
                });
            }, 25);
        },

        /// <summary>            
        /// Renders the tags links of the video and initilizes the actions
        /// </summary> 
        renderAttrs: function (src) {
          ViTag.debug("Visap:renderAttrs:render tagslinks and other attributes of the video source"+src);
           
            me.RenderTags(src);
            me.RenderLinks();
         
            if (me.curSrc == undefined)
                return false;
            else
                $("#curSrcTitile").html(unescape(me.curSrc.title));
            annotator.init(me.curSrc);
            sketcher.init(me.curSrc);
            hotspot.init(me.curSrc);
            whiteboard.init(me.curSrc);
            test.init();
        },

        //defaults values used if not passed as args
        video: {
            player: "vid1",
            tags: "tags",
            FStags: "FStags",
            FSlinks: "FSlinks",
            links: "myLinks",
            overlays: "overlays",
            imgOverlay: "imgOverlay",
            annotations: "annotates",
            menu: "menuContainer",
            search: "vSearch",
            dataPath: "data/data.js",
            path: "videos/",
            mainContainer: "body",
            playerYT: "playerYT",
            playerDiv: "player",
            hotspotCircle: "hotspotCircle",
            wboardContainer: "wboardContainer",
            whiteBoardWrapper:"whiteBoardWrapper",
            textcontainerWB: "textcontainerWB",
            WbimgOverlay: "WbimgOverlay",
            textcontent: "textcontent",
            wbdragbar: "wbdragbar",
            MessageDiv: 'MessageDiv',
            videoContainer: "videoContainer",
            videoMContainer: "videoMainContainer",
            autoplay: 'true'

        },

        /// <summary>            
        /// Loading all header related information of both user and staging data
        /// </summary> 
        /// <param name="autoplay">not reuired can be removed</param>
        /// <param name="mode">to know stage or myspace</param>
        /// <param name="user">logged in username</param>
        loadData: function (mode, user) {            
            var keyvalue = null, isStage = null, username = null;
           
            
            $.ajax({
                url: ViTag.config.wsvideourl,
                type: "POST",
                async: false,
                headers: { isStage: mode, 'X-Authorization': localStorage.getItem('authT') },
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    ns.source = JSON.parse(eval(data));
                    me.listVideos();
                },
                error: function (err) {
                	ViTag.error("Visap:loadData:Error while loading data"+err);
                    alert('Error in loading data');
                }
            });
            
        },

        // Loading message to the user while uploading videos mongo
        showLoadingimg: function () {
            $("body").trigger("showLoadingimg");
        },

        // Render current video attributes -Start- 
        RenderTags: function () {
            ns.RenderCurrentTags();
        },

        /// <summary>            
        /// Renders the annotations for currentsource
        /// </summary> 
        /// <param name="a">annotation object</param>
        // Remove this method. Use ns.<method> directly
        RenderAnnotate: function (a) {
            ns.RenderCurrentAnnotates(a);
        },

        /// <summary>            
        /// Renders the links for currentsource
        /// </summary> 

        // Remove this method. Use ns.<method> directly
        RenderLinks: function () {
            ns.RenderCurrentLinks();
        },

        /// <summary>            
        /// Seraches the source based on ID
        /// </summary> 
        /// <param name="_id">unique ID</param>
        GetSource: function (_id) {
            return ns.source ? $.grep(ns.source, function (e) { return e._id == _id; })[0] : null;
        },

        /// <summary>            
        ///Metadata level informations are fetched only when video 
        ///started playing and merge the header level information 
        /// </summary> 
        /// <param name="curSrc">Currentsource</param>

        GetMetaData: function (curSrc) {
            $.ajax({
                url: ViTag.config.wsMetadataurl,
                type: "POST",
                async: false,
                headers: { isStage: ns.mode, 'X-Authorization': localStorage.getItem('authT') },
                data : {ID: curSrc._id},
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    obj = JSON.parse(eval(data));
                    if (obj[0] !== undefined) {
                        if (obj[0].actions !== undefined || obj[0].tags !== undefined || obj[0].links !== undefined) {
                            curSrc.tags = obj[0].tags;
                            curSrc.links = obj[0].links;
                            curSrc.actions = obj[0].actions;

                        }
                    }
                },
                error: function (err) {
                 ViTag.error("Visap:GetMetaData:Error while calling metadata service" +err);
                    alert('Error in loading data');
                }
            });
            return curSrc;
        },

        /// <summary>            
        ///Sets the source with header and metadata based on ID       
        /// </summary> 
        /// <param name="_id">unique ID</param>
        setSource: function (_id) {
            me.curHeader = me.GetSource(_id);
            me.curSrc = me.GetMetaData(me.curHeader);
        },
        /// <summary>            
        ///ListS the video /populates the menu with list of videos       
        /// </summary> 

        listVideos: function () {
            if ($.isFunction(me.ctrl.$menu)) {
                me.ctrl.$menu(ns.source);
            }
        },

        /// <summary>            
        ///Reading the controls values   
        /// </summary> 
        readControls: function () {
         ViTag.debug("Visap:readControls:Reading default controls values Begin");
            var attr = me.video;
            me.ctrl.$video = $("#" + me.video.player);
            me.ctrl.video = me.ctrl.$video[0];
            me.ctrl.$tags = $.isFunction(attr.tags) ? attr.tags : $("#" + attr.tags);
            me.ctrl.$links = $.isFunction(attr.links) ? attr.links : $("#" + attr.links);
            me.ctrl.$FStags = $("#" + attr.FStags);
            me.ctrl.$FSlinks = $("#" + attr.FSlinks);
            me.ctrl.$annotates = $("#" + attr.annotations);
            me.ctrl.$overLays = $("#" + attr.overlays);
            me.ctrl.$search = $("#" + me.video.search);
            me.ctrl.$menu = $.isFunction(attr.menu) ? attr.menu : $("#" + attr.menu);
            me.ctrl.$imgOverLays = $("#" + attr.imgOverlay);
            me.ctrl.$WbimgOverlay = $("#" + attr.WbimgOverlay);
            me.ctrl.$whiteBoardWrapper = $("#" + attr.whiteBoardWrapper);
            me.ctrl.$textcontent = $("#" + attr.textcontent);
            me.ctrl.$wbdragbar = $("#" + attr.wbdragbar);
            me.ctrl.$playerYT = $("#" + attr.playerYT);
            me.ctrl.$playerDiv = $("#" + attr.playerDiv);
            me.ctrl.$mainContainer = $(attr.mainContainer);
            me.ctrl.$hotspotCircle = $("#" + attr.hotspotCircle);
            me.ctrl.$wboardContainer = $("#" + attr.wboardContainer);
            me.ctrl.$textcontainerWB = $("#" + attr.textcontainerWB);
            me.ctrl.$MessageDiv = $("#" + attr.MessageDiv);
            me.ctrl.$videoContainer = $("#" + attr.videoContainer);
            me.ctrl.videoContainer = me.ctrl.$videoContainer[0];
            me.ctrl.$videoMContainer = $("#" + attr.videoMContainer);
        },

        /// <summary>            
        ///Binding the events
        /// </summary> 
        bindEvents: function () {
            me.ctrl.$videoContainer.unbind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange');
            me.ctrl.$videoContainer.bind('webkitfullscreenchange mozfullscreenchange fullscreenchange msfullscreenchange', function () {
                ns.toggleScreen();
            });

        },
        /*************************************************************************************
        ******************** Custom player private region starts *************************/
		///<summary>
		///custom player
		/// </summary>
       cp: {
            ctrl: {}, width: null, seekTime: 0, bunchSq: 0, interval: null,

            //default player controls
            elements: {
                play: "imgPlay",
                stop: "imgStop",
                volumeMax: "imgValx",
                volumeMin: "imgValm",
                mute: "imgMute",
                replay: "imgRe",
                volume: "volume-bar",
                seek: "seek-bar",
                fullScreen: "imgFS",
                trtags: "trtags",
                trlinks: "trlinks",
                imgOverlay: "imgOverlay",
                currentTime: "current",
                endtime: "endtime",
                annotations: "annotates",
                timelineContainer: "timelineContainer",
                CaptureBtn: "CaptureBtn",
                whiteBoardWrapper: "whiteBoardWrapper",
                actionsContainer:"actionsContainer"

            },

            /// <summary>            
            ///Initilization of player
            /// </summary> 
            /// <param name="args">args passed from page</param>
            init: function (args) {
            ViTag.debug("Visap:init:Initilization of player");
                // Calling many times while change the user [So if condition statement added].
                if (!me.cp.ctrl.$play) {
                    //Init player with custom css
                    if (args){
	                    $.extend(me.cp.elements, args);
	                 }
                    //reads the controls and sets the Events
                    me.cp.setControls();

                    // Set default player volume
                    var v = 0;
                    if (ns.yt.enabled)
                        v = (ns.yt.player.getVolume() * 100)
                    else
                        v = (me.ctrl.video.volume * 100);

                    me.cp.ctrl.volume.value = v;
                }
            },

            /// <summary>            
            /// Creates the Elements required to play video
            /// </summary> 
            createElement: function () {
                if ($("#videoMainContainer").length === 0) {
                    var spacerimage = "data:image/gif;base64,R0lGODlhAgACAIAAAAAAAAAAACH5BAEAAAAALAAAAAACAAIAAAIChFEAOw==";
                    $("#videoContainer").append(me.cp.createEle({ ele: "table", id: "tblMain", attribs: [{ attr: "cellpadding", value: "0" }, { attr: "cellspacing", value: "0"},{attr: "align", value: "center"}] }));
                    $("#tblMain").append(me.cp.createEle({ ele: "tr", id: "tblMainrow1" }));
                    $("#tblMainrow1").append(me.cp.createEle({ ele: "td", id: "tblMaintd1" }));
                    $("#tblMaintd1").append(me.cp.createEle({ ele: "table", id: "tbl2", attribs: [{ attr: "cellpadding", value: "0" }, { attr: "cellspacing", value: "0" }, { attr: "class", value: "midmidN3 defaultVideo" }, { attr: "align", value: "center"}] }));

                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr1" }));
                    $("#tbl2tr1").append(me.cp.createEle({ ele: "td", id: "tbl2td1", attribs: [{ attr: "class", value: "tdStyle"}] }));
                    
                    $("#tbl2td1").append(me.cp.createEle({ ele: "span", id: "curSrcTitile" }));
                    $("#tbl2td1").append("<div class='closeicon' onclick=\"javascript:ViTag.closePlayer();\"></div>");

                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr2" }));
                    $("#tbl2tr2").append(me.cp.createEle({ ele: "td", id: "tbl2td2" }));
                    
                   
                    $("#tbl2td2").append(me.cp.createEle({ ele: "div", id: "videoMainContainer", attribs: [{ attr: "class", value: "viStyle"}] }));

                    var vMainContainer = $("#videoMainContainer");
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "player", attribs: [{ attr: "class", value: "hideEle"}] }));
                    $("#player").append(me.cp.createEle({ ele: "div", id: "playerYT", attribs: [{ attr: "class", value: "videoTag"}] }));

                    if($("#vid1").length === 0)
                     vMainContainer.append(me.cp.createEle({ ele: "video", id: "vid1", attribs: [{ attr: "autoplay", value: "true" }, { attr: "class", value: "videoTag"}] }));
                    else 
                    $("#vid1").appendTo(vMainContainer); 
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "Overlay", attribs: [{ attr: "class", value: "imgOverlay"}] }));
                    $("#Overlay").append(me.cp.createEle({ ele: "img", id: "imgOverlay", attribs: [{ attr: "alt", value: "" }, { attr: "src", value: "#"}] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "annotates", attribs: [{ attr: "class", value: "divAnnotate ui-widget-content"}] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "hotspotCircle", attribs: [{ attr: "class", value: "circleBase hotspotCircle"}] }));
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "sketchcontainerDefault", attribs: [{ attr: "class", value: "canvascontainer"}] }));
                    
                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "whiteBoardWrapper", attribs: [{ attr: "class", value: "whiteBoardWrapper"}] }));
                    var whiteBoardWrapper = $("#whiteBoardWrapper");
                    whiteBoardWrapper.append(me.cp.createEle({ ele: "div", id: "wboardContainer", attribs: [{ attr: "class", value: "wbContainer"}] }));
                    var wbContainer = $("#wboardContainer");
                    wbContainer.append(me.cp.createEle({ ele: "div", id: "wbdragbar", attribs: [{ attr: "class", value: "wbdragbar"}] }));
                    wbContainer.append(me.cp.createEle({ ele: "div", id: "wrapperTxtSketch", attribs: [{ attr: "class", value: "wrapperTxtSketch"}] }));
                    var wrapperTxtSketch=$('#wrapperTxtSketch');
                    wrapperTxtSketch.append("<div class='textcontainerWB' id='textcontainerWB'><textarea name='' cols='' rows='4' id='cmtWiteboard' contenteditable='true' class='modal-textfield'></textarea></div>");
                    wrapperTxtSketch.append("<div class='canvascontainerWB' id='sketchcontainerWB'></div>");
                    wrapperTxtSketch.append(me.cp.createEle({ ele: "div", id: "textcontent", attribs: [{ attr: "class", value: "textcontent"}] }));
                    wrapperTxtSketch.append(me.cp.createEle({ ele: "img", id: "WbimgOverlay", attribs: [{ attr: "class", value: "WbimgOverlay" }, { attr: "alt", value: "" }, { attr: "src", value: "#"}] }));

                    vMainContainer.append(me.cp.createEle({ ele: "div", id: "MessageDiv", attribs: [{ attr: "textmessage", value: "Text Hotspot"}] }));
                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr3" }));
                    $("#tbl2tr3").append(me.cp.createEle({ ele: "td", id: "tbl2td3", attribs: [{ attr: "class", value: "tdStyle2"}] }));

                    var tblTD = $("#tbl2td3");
                    tblTD.append(me.cp.createEle({ele: "div", id: "controls", attribs: [{ attr: "class",value:"vi-control-main"}] }));
					$("#controls").append(me.cp.createEle({ele:"div",id:"ctrldiv1",attribs:[{attr:"class",value:"slider-main"}] }));
					$("#ctrldiv1").append(me.cp.createEle({ ele: "input", id: "seek-bar", attribs: [{ attr: "type", value: "range"},{attr:"class",value:""},{attr:"name",value:"seekbar"}] }));
					$("#ctrldiv1").append(me.cp.createEle({ ele: "div", id: "rangeContainer", attribs: [{attr:"class",value:"rangevalue"}] }));
					$("#controls").append(me.cp.createEle({ele:"div",id:"ctrldiv2",attribs:[{attr:"class",value:"control-main"}] }));
					
					$("#ctrldiv2").append(me.cp.createEle({ele:"div",id:"timerdiv",attribs:[{attr:"class",value:"player-duratoin"}] }));
					$("#timerdiv").append(me.cp.createEle({ele:"span",id:"current"}));
                    $("#timerdiv").append(me.cp.createEle({ ele: "span",id:"slashDivider"}));
                    $("#slashDivider").text(" / ");
                    $("#timerdiv").append(me.cp.createEle({ ele: "span", id: "endtime", attribs: [{ attr: "class", value: "player-duratoin1"}] }));
                     
					$("#current").text("00.00");
					$("#ctrldiv2").append(me.cp.createEle({ele:"div",id:"player-sound1",attribs:[{attr:"class",value:"player-sound"}] }));
                     
					$("#player-sound1").append(me.cp.createEle({ele:"div",id:"icn-sound1",attribs:[{attr:"class",value:"icn-sound"}] }));
					 
					$("#icn-sound1").append(me.cp.createEle({ ele: "div", id: "imgMute", attribs: [{ attr: "alt", value: "" }, { attr: "src", value: spacerimage }, , { attr: "class", value: "imgValx"}] }));
					$("#player-sound1").append(me.cp.createEle({ ele: "div", id: "imgFS", attribs: [{ attr: "class", value: "icn-fullscreen"}] }));
					$("#player-sound1").append(me.cp.createEle({ele:"input",id:"volume-bar", attribs: [{ attr: "type", value: "range" }, { attr: "value", value: "1" }, { attr: "class", value: "bar"},{ attr: "name", value: "volumebar"}] }));
					
					$("#ctrldiv2").append(me.cp.createEle({ele:"div",id:"play-pause",attribs:[{attr:"class",value:"play-pause"}] }));
					$("#play-pause").append(me.cp.createEle({ele:"div",id:"imgPlay",attribs:[{attr:"class",value:"play"},{ attr: "src", value: spacerimage }] }));
					$("#play-pause").append(me.cp.createEle({ele:"div",id:"imgStop",attribs:[{attr:"class",value:"stop"}] }));					 
                    
                    $("#tbl2").append(me.cp.createEle({ ele: "tr", id: "tbl2tr4" }));
                    $("#tbl2").append("<tr class='midmidN2 hideEle' id='trtags'><td class='tdStyle2'> <div class='tags-links'><div id='FStags' class='tags'><span class='tags-links-title'> <div id='FStags1' class='tagDiv1'></div></span></div></div></td></tr>");
                    $("#tbl2").append("<tr class='midmidN2 hideEle' id='trlinks'><td class='tdStyle2'> <div class='tags-links'><div id='FSlinks' class='links'><span class='tags-links-title'><div id='FSlinks1' class='linkDiv1'></div></span></div></div></td></tr>");

                    $("#annotates").draggable({ containment: "parent"  });
                    $("#annotates").resizable({ containment: "parent",
                            start: function() {
						       $('iframe').css('pointer-events','none');
						    },
						    stop: function() {
						        $('iframe').css('pointer-events','auto');
						    }});
                    $("#hotspotCircle").draggable({ containment: "#tbl2tr2", iframeFix: true });
                    $("body").trigger("onEleCreated");
                }
            },

            /// <summary>            
            /// Helper method to create elements
            /// </summary> 
            createDiv: function (obj) {          
                var ele = (document.createElement(obj.ele));
                $(ele).attr('id', "" + obj.id + "");
                if (obj.attribs) {
                    $(obj.attribs).each(function () {
                        $(ele).attr(this.attr, this.value);
                    });
                }
                return ele;
            },

            //Duplicate will be removed later
            /// <summary>            
            /// Helper method to create elements
            /// </summary> 
            createEle: function (obj) {              
                var ele = (document.createElement(obj.ele));
                $(ele).attr('id', "" + obj.id + "");

                if (obj.attribs) {
                    $(obj.attribs).each(function () {
                        $(ele).attr(this.attr, this.value);
                    });
                }
                return ele;
            },
            /// <summary>            
            /// reads the controls  and set the events like play,pause etc. 
            /// </summary> 
            setControls: function () {
            ViTag.debug("Visap:setControls:Reads the controls  and set the events like play,pause ");
                me.cp.readplayercontrols();
                me.cp.setevents();
            },
            /// <summary>            
            /// reads the controls  and assigns to jquery refrences.
            /// </summary> 
            readplayercontrols: function () {
                var ct = me.cp.elements;

                me.cp.ctrl.$FSTags = $("#" + ct.trtags);
                me.cp.ctrl.$FSlinks = $("#" + ct.trlinks);
                me.cp.ctrl.$play = $("#" + ct.play);
                me.cp.ctrl.play = me.cp.ctrl.$play[0];
                me.cp.ctrl.$stop = $("#" + ct.stop);
                me.cp.ctrl.$volumeMax = $("#" + ct.volumeMax);
                me.cp.ctrl.$volumeMin = $("#" + ct.volumeMin);
                me.cp.ctrl.$mute = $("#" + ct.mute);
                me.cp.ctrl.mute = me.cp.ctrl.$mute[0];
                me.cp.ctrl.$replay = $("#" + ct.replay);
                me.cp.ctrl.volume = $("#" + ct.volume)[0];
                me.cp.ctrl.seek = $("#" + ct.seek)[0];
                me.cp.ctrl.fullScreen = $("#" + ct.fullScreen)[0];
                me.cp.ctrl.fullScreenlow = $("#" + ct.fullScreen);
                me.cp.ctrl.$imgOverLays = $("#" + ct.imgOverlay);
                me.cp.ctrl.$WbimgOverlay = $("#" + ct.WbimgOverlay);
                me.cp.ctrl.$currentTime = $("#" + ct.currentTime);
                me.cp.ctrl.$endtime = $("#" + ct.endtime);
                me.cp.ctrl.$annotates = $("#" + ct.annotations);
                me.cp.ctrl.$timelineContainer = $("#" + ct.timelineContainer);
                me.cp.ctrl.$CaptureBtn = $("#" + ct.CaptureBtn);
                me.cp.ctrl.$editContainer = $("#" + ct.editContainer);
                me.cp.ctrl.$whiteBoardWrapper = $("#" + ct.whiteBoardWrapper);
                me.cp.ctrl.$actionsContainer = $("#" + ct.actionsContainer);
                ViTag.debug("Visap:readplayercontrols:Read player controls completed");
            },


            /// <summary>            
            ///Functionality of onclick of play,volumeMax,stop
            /// volumeMin ,mute click,replay
            /// </summary> 
            setevents: function () {  	         
  				ViTag.debug("Visap:setevents:setEvents for custom player starts");
                // Play and Pause functionality    
                me.cp.ctrl.$play.click(function () {
                    ns.videoPaused = false;
                    ns.pauseByAction=false;
                    me.cp.resetAfterchange();
                    // If youtube embed player enabled
                    var css = "";
                    if (ns.CurrentSrc().sourcetype === 1){
                        css = me.cp.changeYTstate();
                    }
                    else {
                        if (ViTag.paused() || me.ctrl.video.ended) {
                         ns.timelinePlay=true;
                            css = "imgPause";
                            if (ns.CurrentSrc().sourcetype === 2) {
                                //ns.tmVideoEnd is true only when user click stop and replay button.
                                //because when user click stop and replay it has to start from the first snippet.
                                //if the user click just pause and play then just play video should call.
                                if (ns.tmVideoEnd) {
                                    me.cp.resetCounters();
                                    me[ns.currentSrcTypeName].snippetPlay(me.bunchSq);
                                    ns.tmVideoEnd = false;
                                }
                                if (ns.yt.enabled)
                                    css = me.cp.changeYTstate();
                                else me.ctrl.video.play();

                                me.timeline.setInterval();
                            }
                            else
                                me.ctrl.video.play();

                        }
                        else {
                        ns.timelinePlay=false;
                            css = "imgPlay";
                            ViTag.pause();
                            ns.videoPaused = true;
                            me.cp.setSeekbarCurrentTime();
                            ns.tmVideoEnd = false;
                            if (ns.CurrentSrc().sourcetype === 2){
	                            me.cp.clearInterval();
	                        }
                        }
                    }
                    me.cp.ctrl.play.className = css;
                });
                // Stop playing
                me.cp.ctrl.$stop.click(function () {
                	ViTag.debug("Visap:setevents:stop button click functionality");
                    me.cp.ctrl.$editContainer.hide();
                    me.cp.ctrl.$whiteBoardWrapper.hide();
                    me.ctrl.$WbimgOverlay.hide();
                    ViTag.RenderCurrentAnnotates(null);
                    me.cp.ctrl.seek.value = 0;
                    me.cp.ctrl.play.className = "imgPlay";
                    ns.videoPaused = true;
                    if (ns.CurrentSrc().sourcetype === 1) {
                        ns.yt.player.seekTo(0, true);
                        ns.yt.player.pauseVideo();
                        me.cp.ctrl.$imgOverLays.hide();
                        me.cp.ctrl.$annotates.hide();
                        ViTag.disabelEditPanel();
                    }
                    else {
                        if (ns.CurrentSrc().sourcetype === 2) {
                            clearInterval(me.interval);
                            me.cp.resetCounters();
                            ns.tmVideoEnd = true;
                            me.cp.ctrl.$currentTime.text("00:00");

                        }
                        me.ctrl.video.currentTime = 0
                        ViTag.pause();
                        me.cp.ctrl.$imgOverLays.hide();
                        me.cp.ctrl.$annotates.hide();
                        ViTag.disabelEditPanel();
                    }
                });

                me.cp.ctrl.$mute.click(function () {
                	ViTag.debug("Visap:setevents:mute button click functionality");
                    var c = "imgMute";
                    if (ns.yt.enabled) {
                        if (ns.yt.player.isMuted()) {
                            ns.yt.player.unMute();
                            me.cp.ctrl.volume.value = ns.yt.player.getVolume();
                            me.ctrl.video.muted = false;
                            c = me.cp.getAudioClass();
                        }
                        else {
                            ns.yt.player.mute();
                            me.cp.ctrl.volume.value = 0;
                            me.ctrl.video.muted = true;
                            c = "imgMute";
                        }
                    }
                    else {
                        if (me.ctrl.video.muted) {
                            me.ctrl.video.muted = false;
                            me.cp.ctrl.volume.value = (me.ctrl.video.volume * 100);
                            c = me.cp.getAudioClass();
                           
                        }
                        else {
                            me.cp.ctrl.volume.value = 0;
                            me.ctrl.video.muted = true;
                            c = "imgMute";

                        }
                    }
                    me.cp.ctrl.mute.className = c;
                });

                /// <summary>            
                ///Replay video from beginning
                /// </summary> 
                me.cp.ctrl.$replay.click(function () {
                	ViTag.debug("Visap:setevents:replay button click functionality");
                    me.cp.ctrl.seek.value = 0;
                    me.ctrl.video.currentTime = 0;
                    me.ctrl.video.play();
                });

                /// <summary>            
                ///Attach "timeupdate" event to video control to get current playing position
                /// </summary> 
                me.ctrl.video.addEventListener('timeupdate', me.timeUpdate, false);

                ns.tmVideoEnd = false;
                /// <summary>            
                ///To change the src in case of Timeline Videos
                /// </summary> 
                ns.tmLineSrcChange = function () { 
                //bunchSq is to increment sequence number each time.
                    var tmSrcDt = ns.CurrentSrc().src[me.bunchSq]; //Each soruce details in timeline(timeline source deatils.).
                    				ViTag.debug("Visap:tmLineSrcChange:when timeline source is changed play event"+tmSrcDt);
                    if (tmSrcDt) {
                        ns.bnchSQ = me.bunchSq;                                     //bunchsq is sequnce of timelinevideo.
                        ns.tmcurrentTime = ns.getCurrentTime();
                        if ((tmSrcDt.data.duration + tmSrcDt.data.startTime) <= me[me.timeline.snipType].currentTime()) {
                            me.bunchSq++;
                            me.timeline.snippetPlay(me.bunchSq);
                        }
                    }
                };
                /// <summary>            
                ///If video ended replay control should show
                /// </summary> 

                me.ctrl.video.addEventListener('ended', function () {
                    me.cp.ctrl.play.className = "imgReplay";
                   
                    me.cp.ctrl.$CaptureBtn.addClass('startCapture');
                }, false);

                /// <summary>             
                ///If video ended replay control should show
                /// </summary> 

                me.ctrl.video.addEventListener('play', function () {
                    me.cp.ctrl.play.className = "imgPause";
                     if (ns.yt.enabled) {
                            me.cp.ctrl.play.className = "imgPlay";
                        }
                }, false);

                ///Function called on fullsvreen button click
                /// </summary> 
                ns.raiseFullScreen = function (customControl) {
                 ViTag.debug("Visap:raiseFullScreen:Full screen functionality"+customControl);    
                  
                 // place holder for fullscreen
                 var fsplaceholder = me.ctrl.videoContainer;
                  $("body").triggerHandler("onFullScreen", function(placeholdervalue){
                    fsplaceholder = $(placeholdervalue)[0];

                  });
                  
                   var elem = fsplaceholder, req;
                    me.cp.ctrl.$imgOverLays.hide();
                    me.cp.ctrl.$annotates.hide();
                    me.cp.ctrl.$whiteBoardWrapper.hide();
                    $("#hotspotCircle").hide();
                    ns.isCustomFullScreen = customControl;

                    // To remove backround color which is given when player in full screen mode
                    $(elem).removeAttr("style");

                    if (ns.isFullScreenON) {
                        $("#playerYT").addClass("videoTag");
                        $("#vid1").addClass("videoTag");
                        me.cp.ctrl.fullScreenlow.removeClass('imgFSLow');
                        // To exit full screen mode 
                        elem = document;
                        req = elem.cancelFullScreen || elem.webkitCancelFullScreen || elem.mozCancelFullScreen || elem.msCancelFullScreen || elem.exitFullscreen;

                        if (typeof req !== "undefined" && req) req.call(elem);

                        // Get back player from fullscreen mode
                        if (me.width) {
                            me.ctrl.video.width = me.width;
                            me.width = null;
                        }
                        if (ns.yt.enabled)
                            ns.yt.player.setSize(640, 390);

                        // If we set width for player height will automaticaly take 
                        me.ctrl.$video.removeAttr("height");
                        ns.isFullScreenON = false;

                        if ($("#ques-block").length > 0) {
                           ns.pause();
                          $("#ques-block").find(".blockMsg").css({ "top": "195px", "left": "195px","width":"540px","height":"350px","margin":"-3px" });
                          
                        }
                        $("body").trigger("onFullScreen", ns.isFullScreenON);
                        me.cp.ctrl.$FSTags.hide();
                        me.cp.ctrl.$FSlinks.hide();
                    } else {
                        // Get player in full screen mode 
                        $("#playerYT").removeClass("videoTag");
                        $("#vid1").removeClass("videoTag");
                        req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
                        // Applying background color to fill extra space in full screen mode
                        me.cp.ctrl.fullScreenlow.addClass('imgFSLow');
                        $(elem).css("background-color", "black");
                        req.call(elem);
                        me.width = me.ctrl.$video.outerWidth();
                       
                        me[ns.currentSrcTypeName].setVideoSize(screen.availWidth,screen.availHeight);
                        ViTag.debug("Visap:raiseFullScreen:Function call to render tags and links in fulscreen");  
                        // Render tags in full screen mode 
                         ns.RenderCurrentTags(true);
                         ns.RenderCurrentLinks(true);
                    
                        ns.isFullScreenON = true;
                        
                    }
                    // To place annotation container in original place, based on player width and height
                    me.cp.ctrl.$annotates.css({ left: me.ctrl.$video.outerWidth() + "px" });
                    return true;
                }
                me.cp.ctrl.fullScreen.addEventListener("click", function () { ns.raiseFullScreen(true) });
                // Set video control value 
                me.cp.ctrl.volume.addEventListener("change", function () { me.cp.setVolumeState(); });
                // Event listener for the seek bar
                me.cp.ctrl.seek.addEventListener("change", function () {
                    me.cp.resetAfterchange();
                    me[ns.currentSrcTypeName].seekbarchange();
                   if(ns.CurrentSrc().sourcetype == ns.sourceTypeEnum.timeline){
                    me.cp.fullscreenOnsnippetChange();
                   }
                    
                    ns.tmVideoEnd = false; //when we stop the timeline video and move the seekbar to certain postion
                    //again click on play button it should start from that position so set ns.tmVideoEnd to false.
                });
                // This event will raise when player source changed
                $("body").on("onSrcChange", function (event, videoID) {
                    me.cp.resetTime();
                    ViTag.debug("Visap:onSrcChange:Handling onsrcchange event"+videoID);   
                    ns.videoPaused = false;
                    setTimeout(function () {
		               $("body").trigger("clearTimer");
                        me.cp.ctrl.seek.value = 0;
                       if (me.cp.time.tmr){
	                       clearInterval(me.cp.time.tmr);
	                    }
                        // To set custom seekbar value
                        if (ns.yt.player &&  ns.yt.enabled ) {
                            me.cp.time.tmr = setInterval(me.cp.setSeekBarValue, 1000);
                        }
                        me.cp.ctrl.$whiteBoardWrapper.hide();
                        me.cp.renderAllMarker();
                       
                      
                        
                        me.cp.ctrl.play.className = "imgPause";
                    }, 200);

                    me.showLoadingimg();
                });
                $("body").on("handleseekBarValues", function () {
                    me.cp.renderAllMarker();  //to render the markers on the seekbar.
                });
               
                $("body").on("onTmSrcChange", function () { //when the timeline source changed.
                 	me.cp.resetTime();
                    ns.videoPaused = false;
                    $("body").trigger("clearTimer");
                    me.cp.resetCounters();
                    me.cp.renderAllMarker();
                    me.showLoadingimg();
                    me.timeline.setInterval();
                    if (me.cp.time.tmr){
	                    clearInterval(me.cp.time.tmr); //this clearinterval is for youtube video.
	                 }
                });
               
            },
            /// <summary>            
            ///Gets the Player Time  to display in UI
            /// </summary> 
            getplayTimer: function () {
             ViTag.debug("Visap:getplayTimer:Gets the Player Time  to display in UI");   
                //video element inbuilt currenttime
                var t = ns.getCurrentTime();
                //get formtted value of duration
                if(t>0)
                var totalduration = me.cp.getTimeFormat(Math.round(me.ctrl.video.duration));
                //set duration text
                else totalduration="00:00:00";
                me.cp.ctrl.$endtime.text(totalduration);
                 ViTag.debug("Visap:getplayTimer:total duration"+totalduration);   
                var time = me.cp.getTimeFormat(t);
                //set currentTime text
                me.cp.ctrl.$currentTime.text(time);
                ViTag.debug("Visap:getplayTimer:Current time duration"+time);   
            },

            /// <summary>            
            ///Format the Time sent -common method
            /// </summary> 
            getTimeFormat: function (s) {
              
                var h = Math.floor(s / 3600); //Get whole hours
                s -= h * 3600;
                var m = Math.floor(s / 60); //Get remaining minutes
                s -= m * 60;
                var sec = Math.floor(s);
                if (h === 0)
                    return (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
                else
                    return (h < 10 ? '0' + h : h) + ":" + (m < 10 ? '0' + m : m) + ":" + (sec < 10 ? '0' + sec : sec);
            },


            getAudioClass: function (v) {
                var val = 0, imgClass = null;

                if (typeof v != "undefined"){
	                val = v * 100;
	             }
                else {
                    val = me.ctrl.video.volume * 100;
                }
                if (val > 70){
	                imgClass = "imgValx";
	             }
                else if (val > 10){
	                imgClass = "imgVal";
	             }
                else if (val == 0){
	                imgClass = "imgMute";
	             }
                else imgClass = "imgValm";
                return imgClass;
            },

            resetAfterchange: function () {//when user create sketch's and don't save or cancel or change the seekbar,this method will clear the created sketch's                            
                $("body").trigger("resetAfterchange");
            },
            
            /// <summary>            
            ///Below are the youtube video state functionality
            /// </summary> 

            changeYTstate: function () {
                var css = "";
                switch (ns.yt.videoState) {
                    case YT.PlayerState.ENDED:
                        css = "imgPause";
                        ns.yt.player.playVideo();
                        break;
                    case YT.PlayerState.PLAYING:
                        css = "imgPlay";
                        ns.yt.player.pauseVideo();
                        break;
                    case YT.PlayerState.PAUSED:
                        css = "imgPause";
                        ns.yt.player.playVideo();
                        break;
                    default:
                        css = "imgPause";
                        ns.yt.player.playVideo();
                        break;
                }
                return css;
            },

            /// <summary>            
            ///Reset the values when timeline video playing is done
            /// </summary> 
            resetCounters: function () {
             ViTag.debug("Visap:resetCounters:timeline video sequence for the first time its 0");   
                me.cp.ctrl.seek.value = 0;  
                me.bunchSq = 0;
                me.seekTime = 0;
                me.ctrl.video.ended = false;
                me.cp.clearInterval();
            },
            setVolumeState: function () {
                var v = (me.cp.ctrl.volume.value / 100);
                if (ns.yt.enabled) {
                    ns.yt.player.unMute();
                    ns.yt.player.setVolume(v * 100);
                }
                else {
                    me.ctrl.video.muted = false;
                    me.ctrl.video.volume = v;
                }
                me.cp.ctrl.mute.className = me.cp.getAudioClass(v);
            },
            time: {
                tmr: false
            },

            /// <summary>            
            ///clearInterval method used in Timeline video
            /// </summary> 
            clearInterval: function () {
              ViTag.debug("Visap:clearInterval:TO clear interval");   
                if (me.cp.interval) {
                    clearInterval(me.cp.interval);
                    me.cp.interval = null;
                }
            },
            //to reset the vidoe currenttime and total duration
            resetTime:function(){
            	me.cp.ctrl.$currentTime.text("00:00");
                me.cp.ctrl.$endtime.text("00:00");
            },
           
            /// <summary>            
            ///Display seekbar  values,Totalduration
            /// </summary> 

            setSeekBarValue: function () {
                var d = ns.CurrentSrc().videototalduration;         
                var c, totalduration;
                if (c == undefined && d == undefined) {
                    c = 0;
                    totalduration = "00:00";
                }
                else {
                    c = ns.yt.player.getCurrentTime();
                    totalduration = me.cp.getTimeFormat(Math.round(d-1));  //disaplying total duration -1 becuase our video time starts from 0 so when the video ends curent time of the video and totalduration has 1 sec difference.
                }
                me.cp.ctrl.$endtime.text(totalduration);
               
                var time = me.cp.getTimeFormat(c);
                if(time.indexOf("NaN")<0) 
                  me.cp.ctrl.$currentTime.text(time);
                  
                //if (d == c && d != 0) me.cp.ctrl.play.className = "imgReplay";  This line of code is not required because there is an inbuild ended method is there in youtube api.
                if (Math.floor((100 / d) * c) >= 0)
                    me.cp.ctrl.seek.value = Math.floor((100 / d) * c);
            },
            removechild: function () {
                $("#rangeContainer").empty();
            },

            /// <summary>            
            ///will show the markers on the seekbar based on tagtime and action pausetime
            /// </summary> 

            renderAllMarker: function () {
                me.cp.removechild();
                me.cp.renderTagsMarkers(ns.CurrentSrc().tags, "red");
                me.cp.renderActionMarkers(ns.CurrentSrc().actions, "yellow");
            },

            /// <summary>            
            ///Tag time is pushed into Array
            /// </summary> 
            renderTagsMarkers: function (source, color) {
                var TimeArray = [];
                if (source != undefined && source.length != 0) {
                 ViTag.debug("Visap:renderTagsMarkers:Rendering the markers for the sourcelength and colour:"+source.length +","+color); 
                    for (var i = 0; i < source.length; i++) {
                        TimeArray.push(source[i].t);
                    }
                    me.cp.renderSpecificMarkers(TimeArray, color);
                }
            },

            /// <summary>            
            ///Currenttime of he actions are pushed into Array
            /// </summary> 
            renderActionMarkers: function (source, color) {
                var TimeArray = [];
                if (source != undefined && source.length != 0) {
                 ViTag.debug("Visap:renderActionMarkers:Rendering action markers for the sourcelength and colour:"+source.length +","+color);   
                    for (i = 0; i < source.length; i++) {
                        TimeArray.push(source[i].currentTime);
                    }
                    //calls the method to draw lines on seek bar
                    me.cp.renderSpecificMarkers(TimeArray, color);
                }
            },


            /// <summary>            
            ///Adding the markers on the based on the specific time
            /// </summary> 
            renderSpecificMarkers: function (timeArray, color) {
                if (timeArray != undefined && timeArray.length != 0) {
                  ViTag.debug("Visap:renderSpecificMarkers:Rendering specfic markers:"+timeArray+","+color); 
                    var Vduration;
                    Vduration = me[ns.currentSrcTypeName].totalDuration();
                    for (i = 0; i < timeArray.length; i++) {
                    
                        var tagtime = timeArray[i];
                        //formula to position the coloured tags
                        var timeInPercentage = (100 * tagtime) / Vduration;
                        var idvalue = color + i;
                        $("#rangeContainer").append(me.cp.createEle({ ele: "div", id: idvalue, attribs: [{ attr: "class", value: "marker"}] }));
                        $("#" + idvalue).css("margin-left", timeInPercentage + "%");
                        $("#" + idvalue).css("background-color", color);
                    }
                }
            },

            setSeekbarCurrentTime: function () {
              ViTag.debug("Visap:setSeekbarCurrentTime:Set the seek bar time"); 
                if (!ViTag.paused())
                    ViTag.tmLineSrcChange();
                if (ns.CurrentSrc().sourcetype === 2) {
                    if (ViTag.getCurrentTime() >= 0) {
                        //to find the seekbar value based on the timeline video currenttime and total duration of the video.
                        me.cp.ctrl.seek.value = Math.floor((100 / me.timeline.totalDuration()) * ViTag.getCurrentTime());
                        me.cp.ctrl.$currentTime.text(me.cp.getTimeFormat(ViTag.getCurrentTime()));
                        ViTag.debug("Visap:setSeekbarCurrentTime:Set the seek bar time with respect to timeline video:"+me.cp.getTimeFormat(ViTag.getCurrentTime())); 
                        
                    }
                     ViTag.debug("Visap:setSeekbarCurrentTime:Set the seek bar time:"+Math.round(me.timeline.totalDuration())); 
                    me.cp.ctrl.$endtime.text(me.cp.getTimeFormat(Math.round(me.timeline.totalDuration())));
                }
            },
            
            /// <summary>
            /// snippet change to get full screen
            // </summary>
            fullscreenOnsnippetChange: function(){
             if (ns.isFullScreenON) {
                       ns.isFullScreenON = false;
                       ns.raiseFullScreen(false);
              }
            }
            ///support methods ends
        }

    };
    /// <summary>            
    ///Generic list contains all actions to be show when the
    /// respective actions startTime matches and less than the duration
    ///sequence of action had blinking issue hence list to used to show thection and delete
    /// </summary> 

    var CurrentActions = {
        _anotateList: [], _SketchList: [], _HotspotList: [], _WhiteboardList: [],

        add: function (eTime, obj, type) {
            if (type === "annotation") {
                CurrentActions._anotateList = []; // Fix for the object which has not ended and still available in list 
                ViTag.debug("CurrentActions:annotation:pushes the annotation object to annataionlist having endtime:"+eTime+" action type is "+type);
                CurrentActions._anotateList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._anotateList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            if (type === "sketch") {
                CurrentActions._SketchList = []; // Fix for the object which has not ended and still available in list 
                  ViTag.debug("CurrentActions:pushes the object to annataionlist:"+eTime+" action type is "+type);
                CurrentActions._SketchList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._SketchList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            if (type === "hotspot") {
                CurrentActions._HotspotList = []; // Fix for the object which has not ended and still available in list 
                ViTag.debug("CurrentActions:annotation:pushes the hotspot object to hotspotlist having endtime:"+eTime+" action type is "+type);
                CurrentActions._HotspotList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._HotspotList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            if (type === "whiteboard") {
                CurrentActions._WhiteboardList = []; // Fix for the object which has not ended and still available in list 
                ViTag.debug("CurrentActions:whiteboard:pushes the annotation object to whiteboardlist having endtime:"+eTime+" action type is "+type);
                CurrentActions._WhiteboardList.push({ endTime: eTime, listObj: obj, isEnded: false });
                CurrentActions._WhiteboardList.sort(function (a, b) { return a.endTime - b.endTime });
            }
            //Sort based on endTime
        },

        remove: function (obj, type) {
        ViTag.debug("remove:removing the object from the list:"+type);
            //removes the item from the list  base on type of the action
            if (type === "annotation") {
                for (i = 0; i <= CurrentActions._anotateList.length; i++) {
                    if (CurrentActions._anotateList[i].listObj == obj.listObj) {
                        CurrentActions._anotateList.splice(i, 1);
                    }
                }
            }
            if (type === "sketch") {
                for (i = 0; i <= CurrentActions._SketchList.length; i++) {
                    if (CurrentActions._SketchList[i].listObj == obj.listObj) {
                        CurrentActions._SketchList.splice(i, 1);
                    }
                }
            }
            if (type === "whiteboard") {
                for (i = 0; i <= CurrentActions._WhiteboardList.length; i++) {
                    if (CurrentActions._WhiteboardList[i].listObj == obj.listObj) {
                        CurrentActions._WhiteboardList.splice(i, 1);
                    }
                }
            }
            if (type === "hotspot") {
                for (i = 0; i <= CurrentActions._HotspotList.length; i++) {
                    if (CurrentActions._HotspotList[i].listObj == obj.listObj) {
                        CurrentActions._HotspotList.splice(i, 1);
                    }
                }
            }
        }
    };

/// <summary>            
    ///Init of all actions list,showing the actions in respective time    
    /// </summary> 
      var allActions = {
            
             init: function (curSrc,type,arrayType) 
                 {
                   if (curSrc.actions==undefined)
                     return false;
                   ViTag.debug("Visap:allActions:init:Intilizaion of the actions list for the type"+type);
                   //pass the CurrentActionList to action list
                   arrayType= ns.CurrentActionList(type);
                   arrayType.sort(function (a, b) { return a.StartTime - b.StartTime });
                   return arrayType;
                 },
            
     //gets the next  object matching the passed time
        getNext: function (t,ArrayListType) {
              ViTag.debug("Visap:getNext:gets the next action object matching the  time"+t); 
               var lst = ArrayListType;
               var found = null;

            if (lst.length > 0) {
                for (i = 0; i < lst.length; i++) {
                    if (Math.floor(lst[i].StartTime) > t && found != null) {
                        break;
                    }
                    if (Math.floor(lst[i].StartTime) <= t && t <= Math.floor(lst[i].StartTime + lst[i].duration)) {
                        found = lst[i];
                    }
                }
            }
            return found;
        },
        
        
        //tickhandler is  called every second
        tickHandler: function (d,type,typeOfActionList,actionType,ArrayListType) {
          
            var a = allActions.getNext(d.t,ArrayListType);
            //If tick time cross the start time of the annotation and if the tick time less than the duration 
           
            if (a) {
                if (!allActions.checkObject(a,typeOfActionList)) {
                    //Endtime is addition of start time and duration
                    var endTime = Math.floor(a.StartTime + a.duration);
                    //type is not sent later to remove
                    CurrentActions.add(endTime, a, type);
                    //begin the action
                    actionType.begin(a);
                }
            }
            if (a == null)
            actionType.end(null); 
            var endObj = typeOfActionList[0];
            if (endObj != undefined) {
                if (d.t >= endObj.endTime || d.t < endObj.listObj.StartTime) {
                    //remove the action from list
                    CurrentActions.remove(endObj, type);
                    //end the  respective action 
                    actionType.end(endObj);
                }
            }
        },
        
       checkObject: function (obj,typeOfActionList) {
                   for (var i = 0; i < typeOfActionList.length; i++) {
                   if (typeOfActionList[i].listObj !== undefined) {
                    if (typeOfActionList[i].listObj === obj) {
                        return true;
                    }
                }
            }
            return false;
        }
    };
    
    /// <summary>            
    ///pauseOnShow method:If pauseOnShow is enabled,will check the object.
    /// </summary>
    var pauseOnShow={
       
       checkObj:function(startTime,duration){
          var objfound=false;
          var endTime = Math.floor(startTime + duration);
          var currentTime = Math.floor(ns.getCurrentTime());
          if(currentTime===endTime)
            objfound=true;
          return objfound;
       } 
    };

    /// <summary>            
    ///Init of annotator list,showing the annotation in respective time    
    /// </summary> 
    var annotator = {
        list: [, ],//list to store the action.
      
      init:function(curSrc)
          {
              annotator.list = [];
              var type = "annotation";
              ViTag.debug("Visap:annotator:init:Initilization of annatotaion"); 
              
              //Intializing the init method of allAction, depending on the type of action,will return respective action list. 
              annotator.list=allActions.init(curSrc,type,annotator.list);
          },
 
        //tickhandler will be called every second,if the action is found then respective action will be displayed.
        tickHandler: function (d) {
          
             ViTag.debug("Visap:annotator:tickHandler:tickhandler of annatotaion:"+d.t); 
             var ArrayListType=annotator.list;
             var type = "annotation";
             
             //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
             allActions.tickHandler(d,type,CurrentActions._anotateList,annotator,ArrayListType);
        },
        
      //if the object found at the respective time ,action will be displayed by calling RenderAnnotate method.
        begin: function (a) {
             
             ViTag.debug("Visap:annotator:begin:begin of annatotaion having title :"+ a.title+" and "+ a.description);
             if(pauseOnShow.checkObj(a.StartTime , a.duration))
               return false;            
             me.RenderAnnotate(a);
            
        },
        
         //if the object is not found at the respective time,then RenderAnnotate will end by passing null.
        end: function () {
        
             
            me.RenderAnnotate(null);
        } 
    };

  /// <summary>            
    ///Init of hotspot list,showing the hotspot in respective time    
    /// </summary> 
    var hotspot = {
        list: [, ],//list to store the action.
        
      init:function(curSrc)
          {
              hotspot.list = [];
              var type = "hotspot";
              ViTag.debug("Visap:hotspot:init:Initilization of hotspot"); 
              
              //Intializing the init method of allAction, depending on the type of action,will return action list. 
              hotspot.list=allActions.init(curSrc,type,hotspot.list);
          },

        //tickhandler is  called every second
        tickHandler: function (d) {
        
             
             var ArrayListType=hotspot.list;
             var type = "hotspot";
             
             //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
             allActions.tickHandler(d,type,CurrentActions._HotspotList,hotspot,ArrayListType);
        },
        
       //if the object found at the respective time ,action will be displayed by calling RenderCurrentHotspot method.
        begin: function (a) {
        
            ViTag.debug("Visap:hotspot:begin:begin of hotspot having title :"+ a.title+" and "+ a.description); 
             if(pauseOnShow.checkObj(a.StartTime , a.duration))
               return false; 
            ns.RenderCurrentHotspot(a);
        },

      //if the object is not found at the respective time,then RenderCurrentHotspot will end by passing null.  
        end: function () {
            ns.RenderCurrentHotspot(null);
        } 
    };

    /// <summary>            
    ///Init of whiteboard list,showing the whiteboard in respective time    
    /// </summary> 
    var whiteboard = {
        list: [, ],
        
        init:function(curSrc)
          {
              whiteboard.list = [];
              var type = "whiteboard";
              ViTag.debug("Visap:whiteboard:init:Initilization of whiteboard"); 
              
              //Intializing the init method of allAction, depending on the type of action,will return action list. 
              whiteboard.list=allActions.init(curSrc,type,whiteboard.list);
          },

        //tickhandler is  called every second
        tickHandler: function (d) {
        
             ViTag.debug("Visap:whiteboard:tickHandler:tickhandler of whiteboard:"+d.t);  
             var ArrayListType=whiteboard.list;
             var type = "whiteboard";
             
              //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
             allActions.tickHandler(d,type,CurrentActions._WhiteboardList,whiteboard,ArrayListType);
        },

        //if the object found at the respective time ,action will be displayed by calling RenderCurrentWhiteboard method.
        begin: function (a) {
            ViTag.debug("Visap:whiteboard:begin:begin of whiteboard having description :"+ a.description); 
            if(pauseOnShow.checkObj(a.StartTime , a.duration))
              return false; 
            ns.RenderCurrentWhiteboard(a);
        },

       //if the object is not found at the respective time,then RenderCurrentWhiteboard will end by passing null. 
        end: function () {
        
            ns.RenderCurrentWhiteboard(null);
            me.ctrl.$WbimgOverlay.hide();
            $('#textcontent').html('');
        } 
    };

    /// <summary>            
    ///Init of sketcher list,showing the sketch in respective time    
    /// </summary> 
    var sketcher = {
        s: [, ],
        
        init:function(curSrc)
            {
              sketcher.list = [];
              var type = "sketch";
             ViTag.debug("Visap:sketcher:init:Initilization of sketcher"); 
               
              //Intializing the init method of allAction, depending on the type of action,will return action list. 
              sketcher.list=allActions.init(curSrc,type,sketcher.list);
             },
        
        //tickhandler for sketches
        tickHandler: function (d) {
        
             ViTag.debug("Visap:sketcher:tickHandler:tickhandler of sketcher:"+d.t);    
             var ArrayListType=sketcher.list;
             var type = "sketch";
             
             //tick handler will call every second and returns action depending on arrayType, type, CurrentAction.
             allActions.tickHandler(d,type,CurrentActions._SketchList,sketcher,ArrayListType);
        },

        //show overlay for diaplaying sketch
        begin: function (o) {
            me.ctrl.$imgOverLays.show();
            me.ctrl.$imgOverLays.attr("src", o.img);
            me.ctrl.$imgOverLays.attr("height", me.ctrl.$videoMContainer.outerHeight() + "px");
            me.ctrl.$imgOverLays.attr("width", me.ctrl.$videoMContainer.outerWidth() + "px");
        },

        //hide overlay twhen sketch duration is done
        end: function () {
            me.ctrl.$imgOverLays.hide();
        } 
    }

    /// <summary>            
    ///Timer setting,timer resetting and firing all functionalities grouped 
    /// </summary> 
    var timer = {

        tmr: null,
        s: null,
        listeners: null,

        init: function () {
           ViTag.debug("Visap:timer:init:init of the timer"); 
            timer.listeners = null;
            timer.reset();
        },

        reset: function () {
            clearInterval(timer.tmr);
            timer.tmr = setInterval(timer.tick, 1000);
        },

        tick: function () {
		    if (ViTag.paused()) return false;
            if (ns.getCurrentTime() > 0) {
                var t = Math.floor(ns.getCurrentTime());
                timer.fire({ "t": t });
                
            }

        },

        fire: function (d) {
            try {
                if (timer.listeners != null) {
                    var i = 0;
                    while (i < timer.listeners.length) {
                        timer.listeners[i].call(this, d);
                        i++;
                    }
                }
            } catch (ex) {
               
            }
        },

        addHandler: function (fn) {
            if (timer.listeners == null)
                timer.listeners = [];

            timer.listeners.push(fn);
        },

        removeHandler: function (fn) {
            if (!typeof timer.listeners == "undefined") {
                for (i = 0; i < timer.listeners; i++) {
                    if (timer.listeners[i] == fn) {
                        timer.listeners.splice(i, 1);
                        break;
                    }
                }
            }
        },

        clearInterval: function () {
            if (timer.tmr) clearInterval(timer.tmr);

        }
    }
    /// <summary>            
    ///Timer setting,timer resetting and firing all functionalities grouped 
    /// </summary> 
    var test = {

        qList: [], curQuen: null, quesHolder: "tblQuesViTag",

        init: function () {
         ViTag.debug("Visap:test:init:question init"); 
            if (me.curSrc)
                test.qList = ns.CurrenQuestList();
            test.qList.sort(function (a, b) { return a.data.StartTime - b.data.StartTime });
        },

        // To get the next question from the current source questions list.
        getNext: function (t) {         
            var lst = test.qList;
            var found = null;
            if (lst.length > 0) {
                for (i = 0; i < lst.length; i++) {
                    if (Math.floor(lst[i].data.StartTime) > t && found != null){
	                    break;
	                 }
                    if (Math.floor(lst[i].data.StartTime) <= t){
	                    found = lst[i];
	                 }
                }
            }
            return found;
        },

        // Called from the timer to get the question which matches the video currenttime.
        tickHandler: function (d) {
            if (test.qList) {
                var q = test.getNext(d.t);
                if (q && Math.floor(q.data.StartTime) == d.t) {
                    test.showQues(q);
                }
            }
        },

        //Pause the video and show the tagged question to user.
        showQues: function (q) {
         ns.pauseByAction=true;//show's question action and hide the default action container for new theme.
          if (timer.tmr){
	          clearInterval(timer.tmr);
	       }
    	  if(q.sourcetype===ns.actionSourceType.aelibquestion){
              ViTag.aelib.renderQuestion(q,timer.reset); //This will invoke the visap.aelib.js method.
               $("body").triggerHandler("showSliderContent","question");
                  
          }
          else
           ViTag.quiz.showQues(q.data,me.ctrl.$mainContainer,me.ctrl.$videoMContainer,timer.reset); //This will invoke the visap.quiz.js method.
        }
    };
    //#endregion
    //This method is used to send user information to post data.    
    ns.getUserInfo=function(){
	    ns.user={};
	    ns.user.id=localStorage.getItem("userid");
	    ns.user.email=localStorage.getItem("userEmail");
	    return ns.user;
    }
  
})(window.ViTag = window.ViTag || {});