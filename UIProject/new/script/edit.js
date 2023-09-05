 /**********************************************************************
ns=namespace
*********************************************************************/
//Below values we need to change for edit page.

//id's related to upload dialogue starts
var upldVidTitle = "#fileTitle";
var upldVidDesc = "#fileDesc";
var ytVidId = "#txtYTvideo";
var chkBoxId = "#chkYTvideo";
var msg = "#lblWrgMsg";
var vidSrcName = "#vidFile";
var chkVideoUrl = "#chkVideoUrl";
var VideoUrl = "#VideoUrl";
var upldVidCategory= '#fileCategory';
var dtCategoryList = "#dtCategoryList";
//id's related to upload dialogue end

 
//id's related to Actions starts
var sketchContainerId = "#sketch";
var ansContainerId = "#annotate";
var hotspotContainerId = "#hotspot";
var questContainerId = "#questions";
var sketchDurationId = "#sketchDuration";
var whiteboardId = "#whiteboard";
var wboardContainer = "#wboardContainer"
var whiteBoardWrapper = "#whiteBoardWrapper";
var hotspotCircle = "#hotspotCircle";
var annotates = "#annotates";
var canvasWB = "#canvasWB";
var canvascontainerWB = ".canvascontainerWB"
var hotspotCircle = "#hotspotCircle";
var hotspotDialogueBox = "#hotspotBox";
var dropDownId = "#drop";
  
//id's related to Actions end




//drop down values

var dropdownSelect = "#drop",
  dropdownAnnotate = "#annotate",
  dropdownSketch = "#sketch",
  dropdownHotspot ="#hotspot",
  dropdownQuestion = "#questions";
dropdownWhiteboard = "#whiteboard";

var importPublishbtn = "#importPublishbtn"; 
var vidSearch = "#vidSearch";
var cssAttributeLeft;
var cssAttributeTop;

//annotation title ,description and duration for the preview annotation
var title = "#cmtTitle";
var desc = "#cmtDesc";
var duration = "#cmtDuration";
var annotatesId = "#annotates";
/******************************************************************** 
*********************************************************************/
(function (ns) {
    //This method will invoke when the edit.hmtl is ready.
    //This method will load both staging and user data.
    ns.getEditModeReady = function () {
        var opt = localStorage.getItem('editMode');
        localStorage.setItem('edit', true);

        ns.ishome = false;
        if (opt) {
            opt = jQuery.parseJSON(opt);
            internal.setActiveTab(opt);
        }
        else
            opt = { isStaging: true };

        ns.isStaging = opt.isStaging;
        ns.getReady();       
        ns.SwappingTimeLine();
        var EditvideoArgs = internal.setEditArgs();
        ViTag.initEditing(EditvideoArgs);
        ViTag.addMessageHandler(internal.ShowMessage);
        ns.iseditmode = false;
        ns.validateDigits("TagTime");
    };
    //To clear all text box values while creating new timeline videos.
    ns.newTimeLine = function () {
        ViTag.newTimeline();
        $('#editContainer ').hide();
        $('.timeline ').show();
        $("#CaptureBtn").show();
        $("#divtimer").show();
        $("#tmTitle").val("");
        $("#tmDesc").val("");  
        $("#startcapture").html("");
        ViTag.isTimelIneMode = true;
        ViTag.editTimelineMode=false;

    };

    //This method will invoke when we click on upload(import) tab or button
    //This will block UI and it will popup one dialogue.
    //That dialogue contains the fields to upload video from youtube or from local sytem.
    ns.uploadVid = function () {    
         $('#myModalLabel').html("Video Upload"); 
          $('#fileupload').show();
           $('#Import').show();	
          $('#Update').hide();	
        var imgoverlay = $('#imgOverlay');
        if (imgoverlay.is(':visible')) {
            imgoverlay.hide();
        }
        $('#annotates').hide();
        //while uploading if the video is in play mode means,it should be paused and image should be play image.
        ViTag.pause();
        $("#imgPlay").removeClass("imgPause").addClass("imgPlay");
        ns.clearuploadelements();
        internal.getCategorylist();

    };

    //This will invoke when we change the staging and publishing tabs 
    //The method will switch the class from selected to not-selected and vice versa.
    ns.changeMode = function (opt) {
        if ($(opt.active).hasClass("not-selected")) {
            localStorage.setItem('editMode', JSON.stringify(opt));
            $(vidSearch).val("");
            ns.reload();
        }
    };
    //validate text box only for digits excluding : and space.
    ns.validateDigits=function(textBoxID){
        $("#"+textBoxID).keypress(function (e) {      //to restrict only  number for the text box field.
            if (e.which != 32 && !(e.which == 58)) {  //32 ASCII value for space (if user give space it should not give error)//58 ASCII value for :(because time format contains :)
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {  //{8=BS,0=NUL,}
                //$("#errmsg").html("Digits Only").show().fadeOut("slow");
                alert("Digits only");
                return false;
            }  
            }
        });
    };
   
    ///*Timeline sequence with viedo snapshot */   
    ns.SwappingTimeLine = function () {
        $("#startcapture").sortable({
            start: dragging = function (e, ui) {
                ViTag.getDivision(e, ui)
            },
       cursor: 'move'
        }).droppable();
    };
    
    ///* End Of Timeline sequence with viedo snapshot */
    ///*Timer Functionality */



    ///* End of Timer Functionality */
    //On change of tabs and disable canvas or sketches when tabs are changed
    ns.ChangeTabs = function (opt) {
        if (opt == "actionTab") {
            ViTag.setDropdown();
            ViTag.hideSketches();
        }
        else
        ViTag.hideSketches();
        ViTag.resetSketches();
    };
    //This method will clear the fields in the upload dialogue after uploading.
    ns.clearuploadelements = function () {
        $(upldVidTitle).val('');
        $(upldVidDesc).val('');
        $(ytVidId).val('');
        $(vidSrcName).val('');
        $(VideoUrl).val('');
        $(chkVideoUrl).removeAttr('checked');
        $(VideoUrl).attr('disabled', 'disabled');
        $(ytVidId).attr('disabled', 'disabled');
        $(chkBoxId).removeAttr('checked');
        $(msg).show().html("");
        $(vidSrcName).removeAttr('disabled');
        $(upldVidCategory).val('');
        $(dtCategoryList).html("");
    };


    //In the upload dialogue,if the checkbox is clicked then upload file button will
    //disable and if its unchecked then it will enable.
    ns.enableFileBrowsee = function (obj) {
        if (obj.checked) {
            // Enable youtube video id text box
            $(chkVideoUrl).attr('checked', false);
            $(VideoUrl).attr('disabled', 'disabled');
            $(vidSrcName).attr('disabled', 'disabled');
            $(ytVidId).removeAttr('disabled');
            $(vidSrcName).val("");
            $(VideoUrl).val("");
        }
        else {
            // Enable HTML5 file browser element
            $(vidSrcName).removeAttr('disabled');
            $(ytVidId).attr('disabled', 'disabled');
            $(ytVidId).val('');
        }
    }; 

    //To enable the mp4 video url,if the checkbox is clicked.
     ns.enableURLField = function (obj) {
        if (obj.checked) { 
            // Enable youtube video id text box
            $(chkBoxId).attr('checked', false);
            $(ytVidId).attr('disabled', 'disabled');
            $(VideoUrl).removeAttr('disabled');
            $(vidSrcName).attr('disabled', 'disabled');
            $(vidSrcName).val("");
            $(ytVidId).val('');
        }
        else {
            // Enable HTML5 file browser element
            $(vidSrcName).removeAttr('disabled');             
             $(VideoUrl).val("");
             $(VideoUrl).attr('disabled', true);
            $(ytVidId).attr('disabled', 'disabled');
            $(ytVidId).val('');
        }
    }; 
   
  
    //to validate the values of textbox in annotation 
    ns.validatenumber = function (el) {
        var theEvent = el || window.event;
        var key = theEvent.keyCode || theEvent.which;

        var regex = /^[0-9]*(?:\.\d{1,2})?$/;  // allow only numbers [0-9] 
        if (!regex.test(el.value)) {
            alert('Please enter valid numbers');
            $("#cmtDuration").val("");
            $("#hotspotDuration").val("");            
            $(sketchDurationId).val("");
            $("#whiteboardDuration").val("");
        }

        if (parseInt($("#cmtDuration").val(), 10) > 180 || parseInt($(sketchDurationId).val(), 10) > 180 || parseInt($("#whiteboardDuration").val(), 10) > 180) {
            alert("Sorry,Maximum duration is 3 min");
            $("#cmtDuration").val("");
            $("#hotspotDuration").val("");   
            $(sketchDurationId).val("");
            $("#whiteboardDuration").val("");
        }
    };
    //To switch class from one div to another div for the pausetime.
    ns.switchClass = function (divId, data) {
        $(divId).addClass("actions-border");
        $("#" + data + "").parent().children().removeClass('actions-border-selected');
        $("#" + data + "").addClass("actions-border-selected");
    };

    //To to see the annotation before saving it.
    ns.previewAnnotation = function () {   
        t = ViTag.getCurrentTime(),
        ti = $(title).val();   //to get the title value
        de=ViTag.editor.getValue(cmtDesc);  //to get the value to preview.
        d = $(duration).val();
        var ansObj; 
        if (ViTag.editAns) {
            ansObj = { title: ti, description: de, StartTime: t, duration: d, AnnotationAttributes: { left: cssAttributeLeft, top: cssAttributeTop} };
        }
        else 
            ansObj = { title: ti, description: de, StartTime: t, duration: d, AnnotationAttributes: {left: "0px", top: "34px"}};//this is the default position of the annotation so left is 0px and top is 34px to place the annotation exactly below the title.
        //Here annotation top and left will calcualted based on videomaincontainer height and width.
        //dividing videoMainContainer width by 100 will set the annotation default position to almost top left corner.
        //dividing videoMainContainer height by 6 will set the annotation default position to almost top.
        ViTag.RenderCurrentAnnotates(ansObj);
    };

    // When edit button of the action is clicked respective actions data are set to be on its elements
    ns.EditActions = function (type, time, pausedTime) {
        setTimeout(function(){ ViTag.playAt(time)},300);
        var Listactions = ViTag.getPausedAction(pausedTime);
        var editedAction = ViTag.getEditedListAction(type, Listactions, time);
        if (type == 'annotation') {            
            $(dropdownSelect).val("Annotations");
            $(dropdownAnnotate).css("display", "block");
            $(dropdownSketch).css("display", "none");
            $(dropdownQuestion).css("display", "none");
            $(dropdownHotspot).css("display", "none");
            $(dropdownWhiteboard).css("display", "none");
            $(whiteBoardWrapper).css("display", "none");
            $("#whiteboardSaveCancel").css("display", "none");
            $("#sketchContainerUI").css("display", "none");
            var tittle, description, duration, sTime, duration;
            ViTag.editor.rePlaceCkeditor(cmtDesc);
            sTime = editedAction.StartTime; 
            duration = editedAction.duration;  
            tittle = editedAction.title;
            description = editedAction.description;
            cssAttributeLeft = editedAction.AnnotationAttributes.left;
            cssAttributeTop = editedAction.AnnotationAttributes.top;
            ViTag.EditAnnotate(tittle, description, sTime, duration, pausedTime,cssAttributeLeft,cssAttributeTop); 
        }
        if (type == 'sketch') {
            $(dropdownSelect).val("sketch");
            $(dropdownAnnotate).css("display", "none");
            $(dropdownSketch).css("display", "block");
            $(dropdownQuestion).css("display", "none");
            $(dropdownHotspot).css("display", "none");
            $(dropdownWhiteboard).css("display", "none");
            $(whiteBoardWrapper).css("display", "none");
            $("#sketchContainerUI").css("display", "block");
            $("#skecthDurationUI").css("display", "block");
            $("#sketchSaveCancel").css("display", "block");
            $("#whiteboardSaveCancel").css("display", "none");
            var img = editedAction.img; 
            //$('#imgOverlay').show();
           // $('#imgOverlay').attr('src', img);
            $('#sketchDuration').val(editedAction.duration);
            $('#sketchDuration').attr("readonly", "readonly");
            ViTag.enableSketchTabs(time, pausedTime,editedAction);
        }
        if (type == 'questions') {
            $(dropdownSelect).val("Questions");
            $(dropdownAnnotate).css("display", "none");
            $(dropdownSketch).css("display", "none");
            $(dropdownQuestion).css("display", "block");
            $(dropdownHotspot).css("display", "none");
            $(dropdownWhiteboard).css("display", "none");
            $(whiteBoardWrapper).css("display", "none");
            $("#whiteboardSaveCancel").css("display", "none");
            $("#sketchContainerUI").css("display", "none");
             ViTag.editor.rePlaceCkeditor(qTitle);
            ViTag.question.edit(editedAction.id, time, pausedTime);
        }
        if (type == 'hotspot') {
            $(dropdownSelect).val("hotspot");
            $(dropdownAnnotate).css("display", "none");
            $(dropdownSketch).css("display", "none");
            $(dropdownQuestion).css("display", "none");
            $(dropdownHotspot).css("display", "block");
            $(dropdownWhiteboard).css("display", "none");
            $(whiteBoardWrapper).css("display", "none");
            $("#whiteboardSaveCancel").css("display", "none");
            $("#sketchContainerUI").css("display", "none");
            var tittle, description, duration, sTime, duration,showonpause;
            sTime = editedAction.StartTime;
            duration = editedAction.duration;
            tittle = editedAction.title;
            description = editedAction.description;
            ns.cssAttributeLeftHS = editedAction.hotspotAttributes.left; 
            ns.cssAttributeTopHS = editedAction.hotspotAttributes.top;
            showonpause = editedAction.showOnpause;
            ViTag.EditHotspot(tittle, description, sTime, duration, pausedTime,showonpause);
        }
        if (type == 'whiteboard') {
            ns.iseditmode = true;
            $(dropdownSelect).val("whiteboard");
            $(dropdownAnnotate).css("display", "none");
            $(dropdownSketch).css("display", "none");
            $(dropdownQuestion).css("display", "none");
            $(dropdownHotspot).css("display", "none");
            $(dropdownWhiteboard).css("display", "block");
            $("#whiteboardSaveCancel").css("display", "block");
            $("#sketchSaveCancel").css("display", "none");
            $("#sketchContainerUI").css("display", "none");
            $('#sketcher').hide();
            $('#imgOverlay').hide();
            ViTag.EditWhiteboard(pausedTime,editedAction);
        }
    };

    //This will invoke when user try to edit the the action pausetime.
    //It has 2 parameters 1.pauseTmAnchorId(It is Id of the anchor tag),2.pauseTmTextId(it of the text box)
    ns.editPauseTime = function (pauseTmAnchorId, pauseTmTextId, EditPauseTimeImageId,pauseTextTime) {
        $("#" + pauseTmAnchorId).hide();   //when we click to edit the action pause time the anchor tag will hide and text box will be visible.
        $("#" + pauseTmTextId).show();
        $("#" + pauseTmTextId).val(pauseTextTime);//This will get old pause time value to textbox.

        var getClassName = $("#" + EditPauseTimeImageId).attr('class');
        $("#" + EditPauseTimeImageId).removeClass('actions-list-edit').addClass("actions-list-close");
        if (getClassName == "actions-list-close") {//cancel action revert it back to edit.
            $("#" + pauseTmAnchorId).show();
            $("#" + pauseTmTextId).hide();
            $("#" + EditPauseTimeImageId).removeClass('actions-list-close').addClass("actions-list-edit");
        }
       return ns.validateDigits(pauseTmTextId);

    }; 

    //this will invoke when the user click save while editing the action pause time.
    //It has 3 parameters 1.pause time for that action. 2.pauseTmAnchorId(It is Id of the anchor tag),3.pauseTmTextId(it of the text box)
    ns.SaveActionTime=function(pauseTime,pauseTmAnchorId,pauseTmTextId){  
            var newTime=$("#"+pauseTmTextId).val().split(":");   //newly entered value in the text box for editing action pausetime.
            if(newTime!=''){                                     //to validate the newly entered time HH:mm:ss
                var returnValue=ViTag.util.timeFormat($("#"+pauseTmTextId).val());
                if(returnValue) return internal.setTextValue(pauseTmTextId,pauseTmAnchorId);
                } 
            else{ 
                alert("Time should not be blank."); 
                return internal.setTextValue(pauseTmTextId,pauseTmAnchorId);
            }
                if(newTime.length==3) 
                        hrs=newTime[0],min=newTime[1],sec=newTime[2];
                else    hrs="00",min=newTime[0],sec=newTime[1];
     
                var newTimeInsec=ViTag.getTimeInSeconds(hrs,min,sec);           //to get the time in seconds
                ViTag.updatePauseTime(pauseTime,newTimeInsec,pauseTmAnchorId,pauseTmTextId);
    };
    // Dropdown values selected based on the actions respective divisions are shown and hidden 
    ns.GetActions = function (selvalues) {
        if (selvalues.value == "sketch") {
            ViTag.sketchDataWhiteboard = null;
            ViTag.sketchDataDefault = null;
            ViTag.resetSketches();
            $(sketchDurationId).val("");
            internal.hideActionContainer(ansContainerId,questContainerId,hotspotContainerId,wboardContainer);
            internal.showActionContainer(sketchContainerId);
            $('#sketcher').removeClass('canvasWB');
            $(whiteboardId).css("display", "none");
            $(hotspotCircle).css("display", "none");
            $(annotates).css("display", "none");
            $("#sketchContainerUI").css("display", "block");
            $("#skecthDurationUI").css("display", "block");
            $("#sketchSaveCancel").css("display", "block");
            $("#whiteboardSaveCancel").css("display", "none");
            $('#text').show();
            $(sketchDurationId).removeAttr("readonly");
            $('#sketchcontainerDefault').html('');
            $('#sketchcontainerWB').html('');
            ViTag.initSketchTools({ container: "sketchcontainerDefault" });
            ViTag.showSketcher();
            ns.imageExist();
            ViTag.ClearEditValues();
           
        }
        else if (selvalues.value == "Annotations") {
            $(dropDownId).val('Annotations');
            internal.hideActionContainer(sketchContainerId,questContainerId,hotspotContainerId,wboardContainer);
            internal.showActionContainer(ansContainerId);
            $(whiteboardId).css("display", "none");
            $("#cmtDuration").removeAttr("readonly");
            $(hotspotCircle).css("display", "none");
            $("#sketchContainerUI").css("display", "none");
            $("#whiteboardSaveCancel").css("display", "none");
            ViTag.editor.rePlaceCkeditor(cmtDesc);
            ViTag.hideSketches();
            ViTag.ClearEditValues();
            ViTag.resetSketches();
          
        }
        else if (selvalues.value == "Questions") {
            $(dropDownId).val('Questions');
            internal.hideActionContainer(sketchContainerId,ansContainerId,hotspotContainerId,wboardContainer);
            internal.showActionContainer(questContainerId);
            $(whiteboardId).css("display", "none");
            $(hotspotCircle).css("display", "none");
            $(annotates).css("display", "none");
            $("#sketchContainerUI").css("display", "none");
            $("#whiteboardSaveCancel").css("display", "none");
            ViTag.hideSketches();
             ViTag.editor.rePlaceCkeditor(qTitle);
            ViTag.ClearEditValues();
            ViTag.resetSketches();
        }
           else if (selvalues.value == "hotspot") {
            $(dropDownId).val('hotspot');
            internal.hideActionContainer(ansContainerId,sketchContainerId,questContainerId,wboardContainer);
            internal.showActionContainer(hotspotContainerId);
            $(whiteboardId).css("display", "none");
            $(annotates).css("display", "none");
            $("#txtBubbleduration").removeAttr("readonly");
            $("#sketchContainerUI").css("display", "none");
            $("#whiteboardSaveCancel").css("display", "none");
            ViTag.hideSketches();
            internal.showHotspot();
            ViTag.ClearEditValues();
            ViTag.resetSketches(); 
        }
        else if (selvalues.value == "whiteboard") {
                $(dropDownId).val('whiteboard');
                $(whiteboardId).css("display", "block");
                $("#whiteboardSaveCancel").css("display", "block");
                $(whiteBoardWrapper).css("display", "block");
                 internal.hideActionContainer(hotspotContainerId,ansContainerId,sketchContainerId,questContainerId);
                $(hotspotCircle).css("display", "none");
                $(annotates).css("display", "none");
                $("#sketchContainerUI").css("display", "none");
                $("#sketchSaveCancel").css("display", "none");
                $("#skecthDurationUI").css("display", "none");
                ViTag.hideSketches();
                ViTag.ClearEditValues();
                ViTag.resetSketches();
                $("#wbtext").prop('checked', true);
                $("#whiteboardPauseOnShow").prop('checked', false);
                $(canvascontainerWB).hide();
                ViTag.removeCKobjects();
                $("#wbLeftPos").prop('checked', true);
                ViTag.showTextWB();
            }
            else {
                ViTag.setDropdown();
                ViTag.hideSketches();
                ViTag.resetSketches();
            }

    };
    
    // show canvas related elements when user choose sketch option from the drop down
    ns.imageExist = function () {
        var imgoverlay = $('#imgOverlay');
        if (imgoverlay.is(':visible')) {
            if (imgoverlay.attr('src') != '#') {
                alert("Sketch exists at this postion.Please choose different action");
                ViTag.setDropdown();
                ViTag.hideSketches();
            }
        }
    }
    ///Global method called from UI: to get preview of pop up box
   ///When user clicks on edit or create hotspot and clicks preivew button
    ns.previewHotspot=function(){
     internal.showHotspot();
      var videoContainerTop =$('#videoMainContainer').height(); 
      var videoContainerLeft =$('#videoMainContainer').width(); 
       hotspotObj=internal.getHotspotdetails();
       ViTag.previewHotspot(hotspotObj);
       $(hotspotCircle).unbind("click");
       $(hotspotCircle).draggable ('enable');
     }; 

      //Below method is added to edit the tittle and desc of the video
    //model popup is showN along with prepopulating the values given at the time of editing.
    ns.EditTittleDesc = function (tittle, desc, ID) {
        $('#lblWrgMsg').html("");
        $('#myModalLabel').html("Edit Video Properties");
        $('#fileupload').hide();
        $('#Import').hide();
        $('#Update').show();
        if (ViTag.CurrentSrc()) {
            if (ViTag.CurrentSrc()._id == ID) {
                alert("You cannot Edit Tittle/Desc of the video which is in play or pause mode.");
                return false;
            }
        }
        internal.updateCategory(ID);
        localStorage.setItem('videoid', ID);
        $('#fileTitle').val(unescape(tittle));
        $('#fileDesc').val(unescape(desc));
        $('#myModal').modal('show');
    };

    ns.distinctCategories = function () {
        var userName = localStorage.getItem('authT');   
          $.ajax({            
                url: "category.do",
                type: "POST",
                headers: { isStage: ns.isStaging, 'X-Authorization': userName },
                async: false,
                success: function (data) {               
                   data = data.replace(/\n/g, "");
                   categorylist = JSON.parse(eval(data));                    
                },
                error: function () {
                    alert('Error in loading data');
                }
            });          

    return categorylist;
    };

     ns.distinctCategoriesbyvideoid= function(id){  
         var userName = localStorage.getItem('authT'); 
         $.ajax({            
                url: "category.do",
                type: "POST",
                headers: { isStage: ns.isStaging, 'X-Authorization': userName },
                data: { videoid: id },
                async: false,
                success: function (data) {               
                    data = data.replace(/\n/g, "");
                    categorylist = JSON.parse(eval(data));                    
                },
                error: function () {
                    alert('Error in loading data');
                }
            });          

    return categorylist;
    };
// When ever there is change in sketch tools then this method will retain the brushsize
    ns.changeSketchTool = function(type){
        // call the respective tools to be initialised from sketcher.js
        ViTag.sketchtools(type);
            //Set  brush size of the slider value by calling:
            if(type == "text")
                $('#brush_size').attr('min', 10);
            else
                $('#brush_size').attr('min', 1);
            $("#brush_size").val(ViTag.getBrushSize()) ;
    };


    // Private region starts
    var internal = {

        setActiveTab: function (opt) {
            $(opt.active).removeClass("not-selected").addClass("selected");
            $(opt.inActive).removeClass("selected").addClass("not-selected");
            if ($(opt.active)[0].id == "published") {
                $(importPublishbtn).hide();
                $("#timelinebtn").show();
            }
        },

        
        /// to Show only hotspot circle when user selects 
        /// hotspot option from dropdown also sets
        /// if the dialogue box is open while rendering it enforces to close
        showHotspot:function(){
             hsobj=internal.getHotspotdetails();
             ViTag.RenderCurrentHotspot(hsobj);
             $(hotspotCircle).draggable('enable');
             $(hotspotCircle).unbind("click");
             $(hotspotDialogueBox).css('display', 'none');
        },
        //to hide the actions container
        hideActionContainer:function(container1,container2,container3,container4){
            $(container1).css("display", "none");
            $(container2).css("display", "none");
            $(container3).css("display", "none");
            $(container4).css("display", "none");
        },
        //to show the action container

        showActionContainer:function(actionContainer){
         $(actionContainer).css("display", "block");
        },
        //to set the textbox content
        setTextValue:function(pauseTmTextId,pauseTmAnchorId){
           $("#"+pauseTmTextId).val($("#"+pauseTmAnchorId)[0].innerHTML);
           return false;
        },
        /// Kind of display hotspot circle position:If the new hotspot need
        /// to be created then its at center of the screen else circle will be posion of the 
        /// already created hotspot
        getHotspotdetails:function(){
          var title=$('#hotspotTittle').val(),description=$('#hotspotContent').val() ;
           if (ViTag.editPreviewHS) {
            hsobj = { title: title, description: description, hotspotAttributes: { left: ns.cssAttributeLeftHS, top: ns.cssAttributeTopHS} };
            ViTag.RenderCurrentHotspot(hsobj);
            return hsobj;
          }
          else
           {
            var top =$('#videoMainContainer').height()/2; // To get exact center of the hotspot circle
            var left =$('#videoMainContainer').width()/2; 

            hsobj = {title:title,description:description,hotspotAttributes:{left:left,top:top}};
             return hsobj;
           }
           
        },
        /*Savitha -  As part of code review the below method (getUserData) can be deleted*/
        //Populate the user data and used for publish purpose 
        getUserData: function () {
            $.ajax({
                url: "video.do",
                type: "POST",
                async: false,
                headers: { isStage: false, 'X-Authorization': localStorage.getItem('authT') },
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    internal.userSrc = JSON.parse(data);
                },
                error: function () {
                    alert('Error in loading data');
                }
            });


            return internal.userSrc;
        },
        //Fetches saged metadata of the perticular source which renders all its metadata


        // When user selects video checkbox while publish need to get that respective data of the checked resource
        getSource: function (d, s) {
            var source = null;
            if (d && d != "") source = $.grep(d, function (e) { return e.src == s; })[0];
            return source;
        },

        //setting video edit arguments
        setEditArgs: function () {
            EditvideoArgs = ns.videoArgs;
            EditvideoArgs.args.tagList = internal.PrintTagsToEdit;
            EditvideoArgs.args.LinkList = internal.PrintLinksToEdit;
            EditvideoArgs.args.allActions = internal.PrintPauseTime;
            EditvideoArgs.args.savedActions = internal.getSpecAction;
            return EditvideoArgs;

        },
        //printing tags in the edit mode with edit and delete options.
        PrintTagsToEdit: function () {          
            var tl = $("#tagList");
            tl.html('');
            tags = ViTag.CurrentSrc().tags;
            if (tags)
            {               
                tags.forEach(function (tag) {
                var desc = escape(tag.d);
                var click = 'ViTag.EditTags(' + tag.t + ', "' + desc + '")';
                tl.append("<tr><td>" + unescape(tag.d) + "</td><td align='right'><a class='actions-list-edit' onclick='" + click + "'></a><a class='actions-list-small-delete' onclick='javascript:if(ViTag.getConfirmToDel(\"Tag\")) ViTag.RemoveTag(\"" + tag.d + "\"\)'></a></td></tr>");
              });
            }
            
        },

        //printing links in the edit mode with edit and delete options.   
        PrintLinksToEdit: function () {           
            var ll = $('#LinkList');
            ll.html('');

            links =  ViTag.CurrentSrc().links;
             if(links)
             {         
                links.forEach(function (link) {
                var click = 'ViTag.EditLinks("' + link.n + '", "' + link.u + '")';
                ll.append("<tr><td>" + unescape(link.n) + "</td><td align='right'><a class='actions-list-edit' onclick='" + click + "'></a><a class='actions-list-small-delete' onclick='javascript:if(ViTag.getConfirmToDel(\"Link\")) ViTag.RemoveLink(\"" + link.n + "\"\)'></a></td></tr>");
                 })
             }
        },
        //printing the pausedtime with delete option. 
        PrintPauseTime: function (actionsLst,issavePauseTime) {      
            var allActions = $("#allActions");
            ns.showActions = true;
            if(actionsLst!=undefined && actionsLst.length>0){
                if(!issavePauseTime) actionsLst.sort(function(a, b){return a.currentTime-b.currentTime});
            }
            var actions = actionsLst;
            var actionsContainer = "#allActions";
            allActions.html('');
            
            if (actions != undefined) {              
                for (var i = 0; i < actions.length; i++) {
                    var pauseTimeDivID = "pausetm" + i + "", pauseTmanchor = "pauseTmanchor" + i + "", pauseTmText = "pauseTmText" + i + "", EditPauseTimeImageId = "editImageId" + i + "";
                    allActions.append("<div  id='pausetm" + i + "' class='ans' onclick='javascript:ViTagUI.switchClass(\"" + actionsContainer + "\"\,\"" + pauseTimeDivID + "\"\)'><a class='pausetime' id='pauseTmanchor" + i + "'  onclick='javascript:ViTag.getSpecAction(\"" + actions[i].currentTime + "\"\)'>" + ViTag.getTimeFormat(actions[i].currentTime) + "</a><input type='text' maxlength='8' class='editPauseTime hideEle' title='EditPauseTime' id='pauseTmText" + i + "' ></input><a id='editImageId" + i + "' class='actions-list-edit'  title='Edit Pause Time' onclick='javascript:ViTagUI.editPauseTime(\"" + pauseTmanchor + "\"\,\"" + pauseTmText + "\"\,\"" + EditPauseTimeImageId + "\"\,\"" + ViTag.getTimeFormat(actions[i].currentTime) + "\"\)'></a><a class='savePauseTime' title='Save action' onclick='javascript:ViTagUI.SaveActionTime(\"" + actions[i].currentTime + "\"\,\"" + pauseTmanchor + "\"\,\"" + pauseTmText + "\"\)'></a><a class='actions-list-small-delete' id='ptm' onclick='javascript:if(ViTag.getConfirmToDel(\"Pause Time\"))ViTag.RemoveActionList(\"" + actions[i].currentTime + "\"\)' title='Remove this Action' /></div>");
                   
                }
                for (var k = 0; k < allActions.children().length; k++) {
                    var m = allActions.children()[k].firstChild.innerHTML;
                    if (m == ViTag.getTimeFormat(ViTag.getCurrentTime())) {
                        ViTagUI.switchClass(actionsContainer, allActions.children()[k].id);
                    }
                }
            }

        },
        //printing series of actions for a particular pausetime with delete and edit options. 
        getSpecAction: function (pausedTime) {
            var time = Math.floor(pausedTime);
            var savedlist = $("#savedActions");
            $("#savedActions").css('display', 'inline-block');
            savedlist.html('');
            ViTag.playAt(time);
            ns.showActions = false;
            var actions = ViTag.getPausedAction(time);
            if (actions != undefined && actions.length > 0) {          
                for (var j = 0; j < actions.length; j++) {
                    var click = 'ViTagUI.EditActions( "' + actions[j].type + '", "' + actions[j].data.StartTime + '","' + time + '")';
                    savedlist.append("<tr><td>" + actions[j].type + "-" + ViTag.getTimeFormat(actions[j].data.StartTime) + "</td><td align='right'><a class='actions-list-edit' title='Edit Action' onclick='" + click + "'></a><a class='actions-list-small-delete' title='Remove Action' onclick='javascript:if(ViTag.getConfirmToDel(\"" + actions[j].type + "\"\))ViTag.RemoveAction(\"" + actions[j].data.StartTime + "\"\,\"" + time + "\"\,\"" + actions[j].type + "\"\)'></a></td></tr>");
                }
            }
        },

        ShowMessage: function(msg, type, source){
            var msgSrc  = source ? source.split('.') : ["",""];
            switch(msgSrc[0])
            {
                case "Tags":
                   internal.showTagsMsg(msg, type, msgSrc[1]);
                    break;
                case "Action":
                    if(msgSrc[2]=="AlertMsg")
                       internal.showAlertMsg(msg, type, msgSrc[1]);
                    else
                       internal.showActionsMsg(msg, type, msgSrc[1]);
                   break;
                case "Links":
                    internal.showLinksMsg(msg, type, msgSrc[1]);
                  break;
                case "Timeline":
                    if(msgSrc[2]=="AlertMsg")
                    internal.showAlertMsg(msg, type, msgSrc[1]);
                    else
                    internal.showTimelineMsg(msg, type, msgSrc[1]);
                 break;
                 case "Publish":
                    internal.showPublishMsg(msg, type, msgSrc[1]);
                 break;
                  case "Upload":
                    if(msgSrc[2]=="AlertMsg")
                    internal.showAlertMsg(msg, type, msgSrc[1]);
                    else
                    internal.showUploadMsg(msg, type, msgSrc[1]);
                 break;
                   case "UploadImage":
                    internal.loading(msg, type, msgSrc[1]);
                 break; 
                 case "Video":
                  internal.showAlertMsg(msg, type, msgSrc[1]);
                  break;
                default:break;
                    
            }
        },
        showTagsMsg: function(msg, type, src){
            var m = $("#message");
            m.html(msg).show().delay(3000).fadeOut();
        },
          showLinksMsg: function(msg, type, src){
           var m = $("#message");
           m.html(msg).show().delay(3000).fadeOut(); 
        },
          showActionsMsg: function(msg, type, src){
            var m = $("#message");
           m.html(msg).show().delay(3000).fadeOut();
        },
         showAlertMsg: function(msg, type, src){
          alert(msg);
        },
          showTimelineMsg: function(msg, type, src){
            var m = $("#timelineMessage");
            m.html(msg).show().delay(3000).fadeOut();
        },
        showPublishMsg: function (msg, type, src) {
                internal.blockEle({ e: "#divVideoList", msg: { message: "<lable class='whitemsg'>" + msg + "</lable>", css: { border: "none", borderRadius: "4px", padding: "10px", margin: "-170px -1px", backgroundColor: "rgba(102,153,51,0.9)", width: "300px"} }, bg: false });
                setTimeout(function () { $("#divVideoList").unblock(); }, 3000);
        },
        blockEle: function (opt) {
                $(opt.e).block(opt.msg);
                if (opt.bg)
               $(".blockOverlay").addClass("blockOverlayTemp");
        },
        showUploadMsg: function(msg, type, src){
            var m = $("#lblWrgMsg");
             m.css({ "display": "block", "visibility": "visible" }).text(msg);
        },
         // Loading message to the user while uploading videos
        loading: function (msg) {
                var spacerimage = "data:image/gif;base64,R0lGODlhAgACAIAAAAAAAAAAACH5BAEAAAAALAAAAAACAAIAAAIChFEAOw==";
                internal.blockEle({ e: "#uploadform", msg: { message: "<br/><br/><br/><br/><img src='" + spacerimage + "'class='loading' /><br /><lable class='lblLoading'>" + msg + "</lable>", css: { borderRadius: "11px"} }, bg: false });
               internal.customBlockUI();
        },
         //Custom pop up with blockUI 
        customBlockUI: function () {
                $(".blockElement").css({ "background-color": "", "border": "0px", "width": "100%", "height": "100%", "top": "0px", "left": "0px" });
                $(".blockOverlay").css({ "opacity": "0.6", "background-color": "#000" });
        },

        // Categories of all the videos are listed 
        getCategorylist: function () {
         var list = ns.distinctCategories();
         var dataList = $(dtCategoryList),opt;
             if(list != null)
             {
                 $.each(list[0].category, function (i) {
                 opt = $("<option></option>").attr("value",list[0].category[i]);
            	 dataList.append(opt);
                  });
             }
            },

        // Categories  for update 
        updateCategory: function (id) {
            var list = ns.distinctCategoriesbyvideoid(id);
            var categorystring = list[0].category.toString();
            $("#fileCategory").val(categorystring);
        }
          };

})(window.ViTagUI = window.ViTagUI || {});