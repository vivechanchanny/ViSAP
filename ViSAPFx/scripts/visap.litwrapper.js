
(function (v2) {
    //**********wrapper class for Lit canvas library  ***************/
    /*************private region starts ****************/

    v2.bgColor = "";

    var internal = {
        Actions: [],
        // option parameter may needed
        options: {
            sketcher: "sketcher",
            $sketcher: "#sketcher",
            lc: null,
            toolscontainer: "#sketch",
            toolscontainerclass: ".sketchtools",
            sketcherContainerDefault: "sketchcontainerDefault",
            sketchcontainerWB: "sketchcontainerWB",
            wbTxtHeight: null,
            wbTxtWidth:null

        },

        // handle events triggered from lit canvas library 
        handleEvents: function () {
            // tools markup creation 
            $("body").on("createSketchTools", function (evnt, pickerElement, optionsElement) {
                internal.createSketchTools(pickerElement, optionsElement);
            });
            $("body").on("setCanvasSize", function (evnt, canvas) {
                internal.setCanvasSize(canvas);
            });
            //handling the backgrong color event
            $("body").on("colorCoder", function (evnt, color) {
                v2.bgColor = color;
            });


        },
        // sketch tools container creation
        createSketchTools: function (pickerElement, optionsElement) {
            $(internal.options.toolscontainer).html('');
            $(internal.options.toolscontainerclass).find('.lc-picker').remove();
            $(internal.options.toolscontainerclass).find('.lc-options').remove();

            var markup = "<div class='sketchtools'>";
            markup += "<div id='skecthDurationUI' style=\"display: block;\">";
            markup += "<div data-i18n=\"playerEdit.duration\">Duration</div>";
            markup += " <div><input class='modal-textfield' name='' type='text' id='sketchDuration' onkeyup=\"ViTagUI.validatenumber(this);ViTag.onChangeDuration(this.value,this.id)\" size='8' maxlength='3'/> ";
            markup += " <input type='button' value='+' size='10' name='sketchDuration' onclick=\"ViTag.incDuration(this.name);\">";
            markup += "  <input type='button' value='-' size='10' name='sketchDuration' onclick=\"ViTag.decDuration(this.name);\">";
            markup += "<span class='wrgmsg'>*</span></div></div></div>";
            $(internal.options.toolscontainer).append(markup);
            $(internal.options.toolscontainerclass)[0].appendChild(pickerElement);
            $(internal.options.toolscontainerclass)[0].appendChild(optionsElement);
        },

        // set the size and width of the LC canvas
        setCanvasSize: function (canvas) {
            canvas.id = internal.options.sketcher;
            var dimension = ViTag.getVideoDimensions();
            $("#" + internal.options.sketcherContainerDefault).css({ 'left': Math.floor(dimension.left), 'top': Math.floor(dimension.top)});
            $("#" + internal.options.sketchcontainerWB).css({ 'left': Math.floor(dimension.left), 'top': Math.floor(dimension.top)});
            var scale =  internal.getCanvasHeightandWidth(dimension.height,dimension.width);
            canvas.width = scale.width;
            canvas.height = scale.height;
        },
        // canvas height changes during white board text and while saving sketch or WB we need to check the hight of the canvas
        getCanvasHeightandWidth :function(height,width){
             if (internal.options.wbTxtHeight == null || internal.options.wbTxtHeight == undefined) {
             return {height:height,width:width};
            } else {
               // white borad hight more than normal sketch and hence canvas height has to set the WB text container height
                var canvasheight = $("#textcontent")[0].scrollHeight; 
                if( canvasheight === 0){
                    canvasheight = internal.options.wbTxtHeight;
                }
                return {height: canvasheight,width:  internal.options.wbTxtWidth };//to avoid scroolbar by default need to reduce WB canvas hight by 21
            }
        },

        clearTextTool : function(){
            if(internal.options.lc !== null){
                internal.options.lc.repaintAllLayers();
                internal.options.lc.trigger('drawingChange'); // This is to remove text container when user leaves text tool with out adding anything
            }
        }
    }
    /*************private region ends ****************/

    //instialise LC canvas 
    v2.initSketchTools = function (args) {
        internal.handleEvents();
        internal.options.lc = LC.init($("#" + args.container)[0]);
    }

    // while editing sketch : used to set the stored base64 string to image and assigned to canvas
    v2.setImager = function (skethData, container, wbheight,wbwidth) {
        internal.options.wbTxtHeight = wbheight;
        internal.options.wbTxtWidth = wbwidth;
        internal.handleEvents();
        internal.options.lc = LC.init($("." + container)[0]);
        var newImage = new Image()
        if (skethData != null)
            newImage.src = skethData;
        internal.options.lc.saveShape(LC.createShape('Image', { x: 0, y: 0, image: newImage }));
    }

    // show canvas of the sketch
    v2.showSketcher = function () {
        $("#" + internal.options.sketcher).show();
    }

    // hide canvas of the sketch
    v2.hideSketcher = function () {
        $("#" + internal.options.sketcher).hide();
    }

    // reset canvas of the sketch
    v2.resetSketcher = function (args) {
        v2.bgColor = "";
        $("#" + internal.options.sketcherContainerDefault).css({ 'left': 0, 'top': 0});
        $("#" + internal.options.sketchcontainerWB).css({ 'left': 0, 'top': 0});
        $("#" + args.container).find(".canvascontainer").remove();
        internal.options.lc = LC.init($("#" + args.container)[0]);
        if (args.container === "sketchcontainerWB") {
            internal.options.wbTxtWidth = $("#wboardContainer").width();
            ViTag.sketchDataWhiteboard = null;
            $('.color-well:nth-of-type(3)').hide();
            $("#skecthDurationUI").css('display', 'none');
        }
        else{
            // clear the heght of the WB text when moving oout of the whiteboard
            internal.options.wbTxtHeight = null;
            internal.options.wbTxtWidth = null;
        }
         
    }



    // get any kind of  image data like base64,ping,jpeg etc and background color from sketch and store into DB
    v2.getImager = function () {
        var obj = { imgdata: $("#" + internal.options.sketcher)[0].toDataURL(), color: v2.bgColor };
        return obj;
    }

    // Check whether sketch is drwn on skreen or not
    v2.isSketchEmpty = function () {
        internal.clearTextTool();
        var canvas = $("#" + internal.options.sketcher)[0];
        if (canvas === undefined) return false;
        var ctx = canvas.getContext('2d');
        var w = ViTag.getVideoDimensions();
        var canvasdata = internal.getCanvasHeightandWidth(w.height,w.width)
        var drawn = null;
        var d = ctx.getImageData(0, 0, canvasdata.width,canvasdata.height); //image data 
        var len = d.data.length;
        for (var i = 0; i < len; i++) {
            if (!d.data[i]) {
                drawn = false;
            } else if (d.data[i]) {
                drawn = true;
                break;
            }
        }

      
        if (!drawn) {
            return false;
        }
        else
            return true;
    }

    //set the height and width of the canvas when whiteboard text container changes
    v2.setSize = function (width, height) {
        // when reset is pressed canvas  heght will be vanished and hence retaining while switching between text and sketch radio buttons
      //  internal.options.wbTxtHeight = height;
       // internal.options.wbTxtWidth = width;
        var backgroundCanvas = null;
        var backingScale = 1;
        var elementToMatch = $("#textcontent")[0];
        var wbwidth = $("#wboardContainer").width();
        var el = $("#sketcher")[0];
        if(el != undefined){
            LC.util.matchElementSize(elementToMatch,wbwidth, [el], backingScale, () => {
            internal.options.lc.repaintAllLayers();
            internal.options.lc.trigger('drawingChange');
        });
        }
    }



})(window.sketchv2 = window.sketchv2 || {});