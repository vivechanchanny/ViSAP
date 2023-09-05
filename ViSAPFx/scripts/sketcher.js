
(function (v1) {
    // public variable needed for reseting and clearing sketches 
    //**********Initialisation of canvas ***************/
    //Sketches are drawn on places depending on the type of actions 
    // choosen from the list when user starts editing video
    v1.VideoTme = "";
    /*************private region starts ****************/
    var internal = {
        Actions: [],
        // option parameter may needed
        options: {
            sketcher: "sketcher",
            $sketcher: null,
            context: null,
            "undo": "undo",
            "clear": "clear",
            "colors": "colors",
            "brushSize": "brush_size",
            canvasTemp: null, contextTemp: null,
            textarea: null, textContainer: null,
            container: null,
            toolscontainer:"#sketch"            
        },

        // Line,color and cor-ordinates are set based on change of values
        graphicState: {
            BrushSize: 1, LineColor: null, Pencilcordinates: [], x: 0, y: 0, draw: false, textSize: 10
        },

        // create canvas element to used for sketch related actions
        createSketchInstance: function (args) {
            internal.options.container = args.container;
            internal.options.canvasTemp = document.createElement('canvas');
            internal.options.textarea = document.createElement('textarea');
            internal.options.textContainer = document.createElement('div');
            $('#' + args.container).append("<canvas id=sketcher class=sketchCanvas></canvas>");
            var sketcher = $("#" + internal.options.sketcher);
            internal.options.$sketcher = sketcher;
            internal.options.context = sketcher[0].getContext("2d"); // assign the context to internal value and can be  re usable
        },

        showBrushValue: function () {
            // Measure width of range input
            var width = $('#brush_size').width();
            // Figure out placement percentage between left and right of input
            var newPoint = ($('#brush_size').val() - $('#brush_size').attr("min")) / ($('#brush_size').attr("max") - $('#brush_size').attr("min"));
            var offset = -1;
            // Prevent bubble from going beyond left or right (unsupported browsers)
            var newPlace;
            if (newPoint < 0) {
                newPlace = 0;
            }
            else if (newPoint > 1) {
                newPlace = width;
            }
            else {
                newPlace = width * newPoint + offset; offset -= newPoint;
            }
            // Move bubble
            $('#brushValue').css({ left: newPlace, marginLeft: offset + "%" });
        },

        // this is the default sketch options which is pencil
        // without selecting any sketch tools this will act as default options for drawing
        defaultPencilSketch: function (canvasobject, context) {
            var $sketcher = canvasobject;
            $sketcher.mousedown(function (e) {
                if (e.button === 0) {
                    internal.stroke(e, "begin", $sketcher, context);
                    internal.graphicState.draw = true;
                    internal.graphicState.Pencilcordinates = [];
                }
            })
                .mouseup(function (e) {
                    if (e.button === 0 && internal.graphicState.draw === true) {
                        internal.stroke(e, "end", $sketcher, context);
                        context.closePath();
                        var action = { type: "pencil", data: { x1: e.pageX - ($sketcher.offset().left + 10), y1: e.pageY - ($sketcher.offset().top - 10), cor: internal.graphicState.Pencilcordinates }, color: context.strokeStyle, brushsize: context.lineWidth };
                        internal.addAction(action);
                    }
                    internal.graphicState.draw = false;
                })
                .mousemove(function (e) {
                    if (internal.graphicState.draw)
                        internal.stroke(e, "draw", $sketcher, context);
                });
        },

        // text area needs to hidden on change of any other tool
        removeTextTool: function () {
            // edited white board sketch data rae cleared here
            $("#" + internal.options.container + " textarea").hide();
            $("#" + internal.options.container + " textarea").val('').empty();
        },

        //clear the sketch and keep empty screen
        clearContext: function (context) {
            context.save();
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.restore();
        },

        // Each mouse movements are captured and drawn only for pencil
        stroke: function (event, mode, canvasobj, context) {
            var top = canvasobj.offset().top;
            var left = canvasobj.offset().left;
            var point = { x: event.pageX - left, y: event.pageY - top };

            if (mode === "begin") {
                context.beginPath();
                internal.graphicState.x = event.pageX - left;
                internal.graphicState.y = event.pageY - top;
                context.moveTo(event.pageX - left, event.pageY - top);
            }
            else {
                context.lineTo(point.x, point.y);
                context.stroke();
                internal.graphicState.Pencilcordinates.push({ x: point.x, y: point.y });
            }
        },

        // add list of actions when user draw any tools and stored into 
        // array and reused when uno is clicked
        addAction: function (action) {
            var exist = false;
            if (exist === false) {
                internal.Actions.push(action);
            }
        },

        // show sketch related elements 
        setSketcherPostion: function () {
            var vidAttr = ViTag.getVideoDimensions();//get real video dimensions.
            var sketcher = $('#' + internal.options.sketcher);
            sketcher.attr("height", vidAttr.height + "px");
            sketcher.attr("width", vidAttr.width + "px");
            sketcher[0].style.left = vidAttr.left + "px";
            sketcher[0].style.top = vidAttr.top + "px";
            sketcher.show();
                },
       
        // Reset to default values of all the sketch related elements
  
        // to reset edited values of other actions: like white board saved sketch data
        resetEditedValues: function () {
            if (v1.sketchDataWhiteboard || v1.sketchDataDefault) {
                v1.sketchDataWhiteboard = null;
                v1.sketchDataDefault = null;
            }
        },

        // redraw the saved action : redrawing saved sketches
        redrawEditedSketches: function () {
            if (v1.sketchDataWhiteboard)
                v1.setImager(v1.sketchDataWhiteboard);
            if (v1.sketchDataDefault)
                v1.setImager(v1.sketchDataDefault);

        },

        // Triggered events are handled here accross the application
        handleEvents: function () {
            //Init the brush and color
            var opts = internal.options, context = internal.options.context;
            $('#' + opts.colors + ' li:first').click();

            //Color chnage 
            $('#' + opts.colors + ' li').click(function (e) {
                e.preventDefault();
                $('#colors li').removeClass('selected');
                $(this).addClass('selected');
                internal.graphicState.LineColor = context.strokeStyle = $(this).css('background-color');
            });

            /// To celar canvas when user deletes sketch
            $("body").on("clearSketch", function () {
                internal.clearContext(context);
            });
           
            //To show the value of brushsize in sketch 
            $('#brush_size').on('input', function () {
                internal.showBrushValue();
                $(this).trigger('change');
            });
                   
        },

        // set the temp reference canvas and its eevnts
        //for drawing apert from pencil tool
        setTempSketch: function (mouseDownHandler, mouseMoveHandler, mouseUpHandler) {

            var container = $("#" + internal.options.container)[0];
            var canvasTemp = internal.options.canvasTemp;
            var vidAttr = ViTag.getVideoDimensions();//get real video dimensions.

            // Set the size of the sketcher elements to its default width of the container
            internal.setSize(vidAttr.width, vidAttr.height);
            canvasTemp.id = 'imageTemp';
            canvasTemp.className = 'image-Temp';
            container.appendChild(canvasTemp);
            canvasTemp.style.display = 'none';
            canvasTemp.style.left = vidAttr.left + "px";
            canvasTemp.style.top = vidAttr.top + "px";
            // set temp canvas context here and used any where in page
            internal.options.contextTemp = internal.options.canvasTemp.getContext('2d');

            // Attach the mousedown, mousemove and mouseup event listeners.
            canvasTemp.addEventListener('mousedown', mouseDownHandler, false);
            canvasTemp.addEventListener('mousemove', mouseMoveHandler, false);
            canvasTemp.addEventListener('mouseup', mouseUpHandler, false);
        },
        // Set the size of the sketcher elements based on any type of conatiner height and width
        setSize: function (width, height) {
            if (width > 0 && height > 0 && internal.options.$sketcher != null) {
                var canvasObject = internal.options.$sketcher[0];
                canvasObject.width = width;
                canvasObject.height = height;

                internal.options.canvasTemp.width = canvasObject.width;
                internal.options.canvasTemp.height = canvasObject.height;
            }

        },
        // add sketch tools markup when the sketch is choosen
        createSketchToolsMarkup: function(){
             $(internal.options.toolscontainer).html('');
             var markup = "<div class='div-block'> " +
            "<div data-i18n=\"playerEdit.colors\">Colors</div>" +
            "<ul id='colors' class='sketch-colors' style='margin-left: 0px; padding:0px;'>" +
            "<li style='background-color: black;' class='selected'></li>" +
            "<li style='background-color: red;'></li>" +
            "<li style='background-color: green;'></li>" +
            "<li style='background-color: orange;'></li>" +
            "<li style='background-color: brown;'></li>" +
            "<li style='background-color: #d2232a;'></li>" +
            "<li style='background-color: #fcb017;'></li>" +
            "<li style='background-color: #fff460;'></li>" +
            "<li style='background-color: #9ecc3b;'></li>" +
            "<li style='background-color: #fcb017;'></li>" +
            "<li style='background-color: #fff460;'></li>" +
            "<li style='background-color: #F43059;'></li>" +
            "<li style='background-color: #82B82C;'></li>" +
            "<li style='background-color: #0099FF;'></li>" +
            "<li style='background-color: #ff00ff;'></li>" +
            "</ul>" +
            "</div>" +
            "<div class='div-block'>" +
            "<div data-i18n=\"playerEdit.shapes\">Shapes</div>" +

            "<div id='dtool'>" +
            "<ul class='shapes'>" +
            "<li class='pencil buttonselected' onclick=ViTagUI.changeSketchTool('pencil') name='shapes' id='pencil' title='pencil'></li>" +
            "<li class='line' onclick=ViTagUI.changeSketchTool('line') name='shapes' id='line' title='line'></li>" +
            "<li class='box' onclick=ViTagUI.changeSketchTool('rect') name='shapes' id='rect' title='rect'></li>" +
            "<li class='box-fill' onclick=ViTagUI.changeSketchTool('fill') name='shapes' id='fill' title='fill'></li>" +
            "<li class='circle' onclick=ViTagUI.changeSketchTool('circle') name='shapes' id='circle' title='circle'></li>" +
            "<li class='tooltext' onclick=ViTagUI.changeSketchTool('text') name='shapes' id='text' title='Text'></li>" +
            "<li class='eraser' onclick=ViTagUI.changeSketchTool('eraser') name='shapes' id='eraser' title='Eraser'></li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "<div class='div-block'>" +
            "<div id='skecthDurationUI' style='display: block;'>" +
            "<div 'data-i18n='playerEdit.duration'>Duration</div>" +
            "<div>" +
            "<input class=\"modal-textfield\" name=\"\" type=\"text\" id=\"sketchDuration\" onkeyup=\"ViTagUI.validatenumber(this);ViTag.onChangeDuration(this.value,this.id)\" size=\"8\" maxlength=\"3\">"+

            "<input type='button' value='+' size='10' name='sketchDuration' onclick=ViTag.incDuration(this.name);> " +
            "<input type='button' value='-' size='10' name='sketchDuration' onclick=ViTag.decDuration(this.name);> " +
            " <span class='wrgmsg'>*</span>" +
            "</div>" +

            "</div>" +
            "</div>" +
            "<div class='div-block'>" +
            "<div data-i18n='playerEdit.brushSize'>Brush Size</div>" +
            "<div class='brush_main'>" +
            "<input name='brush' id='brush_size' class='sketch-brush-size ' type='range' value='1' onchange='sketchv1.setBrushSize(this.value)' min='1' max='40'>" +
            "<div id='brushValue' class='sketchbrush '>1</div>" +
            "</div>" +
            "</div>" +

            "<div class='btn-edit' id='sketchSaveCancel' style=\"display: block;\">" +
            "<button type='button' onclick=sketchv1.undo() id='undo' class='btn btn-default btn-color' data-i18n=\"playerEdit.undo\">Undo</button> " +
            " <button type='button' onclick=sketchv1.clear() id='clear' class='btn btn-default btn-color' data-i18n=\"playerEdit.reset\">Reset</button>" +
            "</div>";
            $(internal.options.toolscontainer).append(markup);
        }
    }
    /*************private region ends ****************/

    //Drawing tool initialisation
    var tools = {
        started: false, cordinates: [], mouse: { x: 0, y: 0 }, start_mouse: { x: 0, y: 0 }, last_mouse: { x: 0, y: 0 },

        // The drawing pencil.
        pencil: {
            // This is called when you start holding down the mouse button.
            // This starts the pencil drawing.
            initDrawing: function (ev) {
                var contextTemp = internal.options.contextTemp;
                contextTemp.beginPath();
                contextTemp.moveTo(ev._x, ev._y);
                tools.started = true;
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
                // Reset Undo capturing points
                tools.cordinates = [];
            },
            // This function is called every time you move the mouse. Obviously, it only 
            // draws if the tool.started state is set to true (when you are holding down 
            // the mouse button).
            draw: function (ev) {
                if (tools.started) {
                    var contextTemp = internal.options.contextTemp;
                    contextTemp.lineTo(ev._x, ev._y);
                    contextTemp.stroke();
                    contextTemp.lineWidth = internal.graphicState.BrushSize;
                    contextTemp.strokeStyle = internal.graphicState.LineColor;
                    // Push the current point of line to Undo data
                    tools.cordinates.push({ x: ev._x, y: ev._y });
                }
            },
            // This is called when you release the mouse button.
            getAction: function (ev) {
                if (tools.started) {
                    tools.pencil.addSketchs(ev, 'pencil', tools.cordinates);
                }
            },
            redraw: function (actionslist) {
                var context = internal.options.context;
                context.globalCompositeOperation = 'source-over';
                tools.pencil.drawSketch(context, actionslist);
            },
            //this fn will draw sketch.
            drawSketch: function (context, actionslist) {
                context.beginPath();
                for (var j = 0; j < actionslist.data.cor.length; j++) {
                    context.lineTo(actionslist.data.cor[j].x, actionslist.data.cor[j].y);
                    context.lineWidth = actionslist.brushsize;
                    context.strokeStyle = actionslist.color;
                    context.stroke();
                }
            },
            //On mouse up, sketchs drawn are added to array.
            addSketchs: function (ev, type, actions) {
                var action = {
                    type: type,
                    data: { x1: ev._x, y1: ev._y, cor: actions },
                    color: internal.graphicState.LineColor,
                    brushsize: internal.graphicState.BrushSize
                };
                internal.addAction(action);
                tools.started = false;
                tools.img_update.finish();
            }
        },

        //Eraser tool functionality.
        eraser: {
            pts: [], //eraser array points.
            initDrawing: function (ev) { //this fn will call on mousedown.
                var context = internal.options.context;
                context.beginPath();//starts a new path by emptying the list of sub-paths.
                context.moveTo(ev._x, ev._y);
                tools.started = true;
                tools.eraser.pts = []; //emptying up eraser points.
            },
            draw: function (ev) { //this fn will call on mousemove.
                if (tools.started) {
                    var context = internal.options.context;
                    //destination-out will remove existing drawings where a new drawing overlaps those existing drawings.
                    context.globalCompositeOperation = 'destination-out';
                    context.fillStyle = 'rgba(0,0,0,1)'; //transparent color.
                    context.strokeStyle = 'rgba(0,0,0,1)';
                    context.lineTo(ev._x, ev._y);
                    context.stroke();
                    context.lineWidth = internal.graphicState.BrushSize;//size of the eraser.
                    // Push the current point of line to Undo data
                    tools.eraser.pts.push({ x: ev._x, y: ev._y });
                }
            },
            getAction: function (ev) { //this fn will call on mouseup.
                //check actions length for create mode,if it is edit mode check sketch data.
                if (tools.started || internal.Actions.length > 0 || v1.sketchDataDefault || v1.sketchDataWhiteboard) {
                    tools.pencil.addSketchs(ev, 'eraser', tools.eraser.pts);
                }
                var context = internal.options.context;
                //displays the source image over the destination image.
                context.globalCompositeOperation = 'source-over';
            },
            redraw: function (actionslist) {
                //this fn will draw sketch on undo.
                var context = internal.options.context;
                //destination-out will remove existing drawings where a new drawing overlaps those existing drawings.
                context.globalCompositeOperation = 'destination-out';
                tools.pencil.drawSketch(context, actionslist);
            }
        },

        // The line tool.
        line: {
            initDrawing: function (ev) {
                var contextTemp = internal.options.contextTemp;
                tools.started = true;
                tools.line.x0 = ev._x;
                tools.line.y0 = ev._y;
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
            },
            draw: function (ev) {
                if (!tools.started) {
                    return;
                }
                var contextTemp = internal.options.contextTemp;
                contextTemp.clearRect(0, 0, internal.options.canvasTemp.width, internal.options.canvasTemp.height);
                contextTemp.beginPath();
                contextTemp.moveTo(tools.line.x0, tools.line.y0);
                contextTemp.lineTo(ev._x, ev._y);
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
                contextTemp.stroke();
                contextTemp.closePath();
            },
            getAction: function (ev) {
                if (tools.started) {
                    var action = { type: "", data: {}, color: "", brushsize: "" };
                    action.data = { x1: tools.line.x0, y1: tools.line.y0, x2: ev._x, y2: ev._y };
                    action.type = "line";
                    action.color = internal.graphicState.LineColor;
                    action.brushsize = internal.graphicState.BrushSize;
                    internal.addAction(action);
                    tools.line.draw(ev);
                    tools.started = false;
                    tools.img_update.finish();
                }
            },
            redraw: function (actionslist) {
                var context = internal.options.context;
                context.globalCompositeOperation = 'source-over';
                context.beginPath();
                context.moveTo(actionslist.data.x1, actionslist.data.y1);
                context.lineTo(actionslist.data.x2, actionslist.data.y2);
                context.lineWidth = actionslist.brushsize;
                context.strokeStyle = actionslist.color;
                context.stroke();
            }
        },

        // The rectangle tool.
        rect: {
            x: null, y: null, w: null, h: null,
            initDrawing: function (ev) {
                var contextTemp = internal.options.contextTemp;
                tools.started = true;
                tools.rect.x0 = ev._x;
                tools.rect.y0 = ev._y;
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
            },
            draw: function (ev) {
                if (!tools.started) {
                    return;
                }
                var contextTemp = internal.options.contextTemp;
                tools.rect.x = Math.min(ev._x, tools.rect.x0);
                tools.rect.y = Math.min(ev._y, tools.rect.y0);
                tools.rect.w = Math.abs(ev._x - tools.rect.x0);
                tools.rect.h = Math.abs(ev._y - tools.rect.y0);

                contextTemp.clearRect(0, 0, internal.options.canvasTemp.width, internal.options.canvasTemp.height);
                if (!tools.rect.w || !tools.rect.h) {
                    return;
                }
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
                contextTemp.strokeRect(tools.rect.x, tools.rect.y, tools.rect.w, tools.rect.h);
            },
            getAction: function (ev) {
                if (tools.started) {
                    var action = { type: "", data: {}, color: "", brushsize: "" };
                    action.type = "rect";
                    action.data = { x1: tools.rect.x, y1: tools.rect.y, x2: tools.rect.w, y2: tools.rect.h };
                    action.color = internal.graphicState.LineColor;
                    action.brushsize = internal.graphicState.BrushSize;
                    internal.addAction(action);
                    tools.rect.draw(ev);
                    tools.started = false;
                    tools.img_update.finish();
                }
            },
            redraw: function (actionslist) {
                var context = internal.options.context;
                context.globalCompositeOperation = 'source-over';
                context.beginPath();
                context.lineWidth = actionslist.brushsize;
                context.strokeStyle = actionslist.color;
                context.strokeRect(actionslist.data.x1, actionslist.data.y1, actionslist.data.x2, actionslist.data.y2);
                context.stroke();
            }
        },

        // The Fill Rect tool.
        fill: {
            //x: null, y: null, w: null, h: null,
            initDrawing: function (ev) {
                var contextTemp = internal.options.contextTemp;
                tools.started = true;
                tools.fill.x0 = ev._x;
                tools.fill.y0 = ev._y;
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
            },
            draw: function (ev) {
                if (!tools.started) {
                    return;
                }
                tools.fill.x = Math.min(ev._x, tools.fill.x0);
                tools.fill.y = Math.min(ev._y, tools.fill.y0);
                tools.fill.w = Math.abs(ev._x - tools.fill.x0);
                tools.fill.h = Math.abs(ev._y - tools.fill.y0);
                var contextTemp = internal.options.contextTemp;
                contextTemp.clearRect(0, 0, internal.options.canvasTemp.width, internal.options.canvasTemp.height);
                if (!tools.fill.w || !tools.fill.h) {
                    return;
                }

                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.fillStyle = internal.graphicState.LineColor;
                contextTemp.fillRect(tools.fill.x, tools.fill.y, tools.fill.w, tools.fill.h);
            },
            getAction: function (ev) {
                if (tools.started) {
                    var action = { type: "", data: {}, color: "", brushsize: "" };
                    action.type = "fill";
                    action.data = { x1: tools.fill.x, y1: tools.fill.y, x2: tools.fill.w, y2: tools.fill.h };
                    action.color = internal.graphicState.LineColor;
                    action.brushsize = internal.graphicState.BrushSize;
                    internal.addAction(action);
                    tools.fill.draw(ev);
                    tools.started = false;
                    tools.img_update.finish();
                }
            },
            redraw: function (actionslist) {
                var context = internal.options.context;
                context.globalCompositeOperation = 'source-over';
                context.beginPath();
                context.lineWidth = actionslist.brushsize;
                context.fillStyle = actionslist.color;
                context.fillRect(actionslist.data.x1, actionslist.data.y1, actionslist.data.x2, actionslist.data.y2);
                context.stroke();
            }
        },

        // The circle/Oval tool.
        circle: {
            initDrawing: function (ev) {
                tools.started = true;
                tools.circle.x0 = ev._x;
                tools.circle.y0 = ev._y;
                var contextTemp = internal.options.contextTemp;
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
            },
            draw: function (ev) {
                if (!tools.started) {
                    return;
                }
                var contextTemp = internal.options.contextTemp;
                contextTemp.clearRect(0, 0, internal.options.canvasTemp.width, internal.options.canvasTemp.height);
                tools.circle.x = Math.min(ev._x, tools.circle.x0);
                tools.circle.y = Math.min(ev._y, tools.circle.y0);
                tools.circle.w = Math.abs(ev._x - tools.circle.x0);
                tools.circle.h = Math.abs(ev._y - tools.circle.y0);

                var kappa = .5522848;
                var x = tools.circle.x, y = tools.circle.y, w = tools.circle.w, h = tools.circle.h;
                tools.circle.ox = (w / 2) * kappa; // control point offset horizontal
                tools.circle.oy = (h / 2) * kappa; // control point offset vertical
                tools.circle.xe = x + w;           // x-end
                tools.circle.ye = y + h;           // y-end
                tools.circle.xm = x + w / 2;       // x-middle
                tools.circle.ym = y + h / 2;       // y-middle
                contextTemp.beginPath();
                var ym = tools.circle.ym, xm = tools.circle.xm, ye = tools.circle.ye, xe = tools.circle.xe, oy = tools.circle.oy, ox = tools.circle.ox;
                contextTemp.moveTo(x, ym);
                contextTemp.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                contextTemp.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                contextTemp.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                contextTemp.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                contextTemp.closePath();
                contextTemp.lineWidth = internal.graphicState.BrushSize;
                contextTemp.strokeStyle = internal.graphicState.LineColor;
                contextTemp.stroke();
                if (!w || !h) {
                    return;
                }
            },
            getAction: function (ev) {
                if (tools.started) {
                    var action = { type: "", data: {}, color: "", brushsize: "" };
                    var ym = tools.circle.ym, xm = tools.circle.xm, ye = tools.circle.ye, xe = tools.circle.xe, oy = tools.circle.oy, ox = tools.circle.ox;
                    var x = tools.circle.x, y = tools.circle.y;
                    action.type = "circle";
                    action.data = { x1: x, y1: y, xm: xm, ym: ym, xe: xe, ye: ye, ox: ox, oy: oy };
                    action.color = internal.graphicState.LineColor;
                    action.brushsize = internal.graphicState.BrushSize;
                    internal.addAction(action);
                    tools.circle.draw(ev);
                    tools.started = false;
                    tools.img_update.finish();
                }
            },
            redraw: function (actionslist) {
                var context = internal.options.context;
                context.globalCompositeOperation = 'source-over';
                context.beginPath();
                context.moveTo(actionslist.data.x1, actionslist.data.ym);
                context.bezierCurveTo(actionslist.data.x1, actionslist.data.ym - actionslist.data.oy, actionslist.data.xm - actionslist.data.ox, actionslist.data.y1, actionslist.data.xm, actionslist.data.y1);
                context.bezierCurveTo(actionslist.data.xm + actionslist.data.ox, actionslist.data.y1, actionslist.data.xe, actionslist.data.ym - actionslist.data.oy, actionslist.data.xe, actionslist.data.ym);
                context.bezierCurveTo(actionslist.data.xe, actionslist.data.ym + actionslist.data.oy, actionslist.data.xm + actionslist.data.ox, actionslist.data.ye, actionslist.data.xm, actionslist.data.ye);
                context.bezierCurveTo(actionslist.data.xm - actionslist.data.ox, actionslist.data.ye, actionslist.data.x1, actionslist.data.ym + actionslist.data.oy, actionslist.data.x1, actionslist.data.ym);
                context.closePath();
                context.lineWidth = actionslist.brushsize;
                context.strokeStyle = actionslist.color;
                context.stroke();
            }
        },

        // The Text tool.
        text: {

            createTextWrapper: function () {
                var container = document.querySelector("#" + internal.options.container);
                tools.text.textContainer = internal.options.textContainer;
                var canvasTemp = internal.options.canvasTemp;
                tools.text.textContainer.id = "textContainer";
                tools.text.textContainer.style.display = 'none';
                container.appendChild(tools.text.textContainer);

                tools.text.textarea = internal.options.textarea;
                tools.text.textarea.id = 'text_tool';
                tools.text.textarea.className = 'text-tool';
                container.appendChild(tools.text.textarea);

                tools.text.textarea.addEventListener('mouseup', function () {
                    canvasTemp.removeEventListener('mousemove', tools.text.onPaint, false);
                }, false);
                /*Changes the cursor in textarea when mousemoves*/
                tools.text.textarea.addEventListener('mousemove', function (e) {
                    var myPos = $(this).offset();
                    myPos.bottom = $(this).offset().top + $(this).outerHeight();
                    myPos.right = $(this).offset().left + $(this).outerWidth();

                    if (myPos.bottom > e.pageY && e.pageY > myPos.bottom - 16 && myPos.right > e.pageX && e.pageX > myPos.right - 16) {
                        $(this).css({ cursor: "nw-resize" });
                    }
                    else {
                        $(this).css({ cursor: "" });
                    }
                }, false);

            },

            initDrawing: function (e) {
                tools.text.createTextWrapper(e)
                var canvasTemp = internal.options.canvasTemp;
                canvasTemp.addEventListener('mousemove', tools.text.onPaint, false);
                tools.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
                tools.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
                tools.start_mouse.x = tools.mouse.x;
                tools.start_mouse.y = tools.mouse.y;
            },

            draw: function (e) {
                tools.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
                tools.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
                // Draw text on text area with change of brush size
                $(tools.text.textarea).css("font-size", internal.graphicState.textSize + "px");
                $(tools.text.textarea).css({ 'color': internal.graphicState.LineColor });
            },

            getAction: function () {
                var canvasTemp = internal.options.canvasTemp;
                canvasTemp.removeEventListener('mousemove', tools.text.onPaint, false);
                var lines = tools.text.textarea.value.split('\n');
                var processed_lines = [];
                var tempY = [];
                var textAreaPadding = 5;
                $(tools.text.textContainer).width('');
                tools.text.textContainer.innerHTML = '';
                $(tools.text.textContainer).css("font-family", $(tools.text.textarea).css("font-family"));
                $(tools.text.textContainer).css("font-size", $(tools.text.textarea).css("font-size"));
                var action = { type: "", data: {}, color: "", brushsize: "", textlines: {}, font: "" };
                action.type = "text";
                action.color = internal.graphicState.LineColor;
                action.brushsize = internal.graphicState.textSize;

                var tempLine = '';
                for (var i = 0; i < lines.length; i++) {
                    // Init the temp. div to hold the text
                    // width of the text is calculated by adding the text to div
                    // and calculating width of the div
                    tools.text.textContainer.innerHTML = '';
                    var words = lines[i].split(' ');
                    for (var index in words) {
                        // Add word by word to the temp div
                        tools.text.textContainer.textContent += words[index] + ' ';
                        // Check the width of the div after adding the word, 
                        // if the width of the div is larger than the textarea
                        if ($(tools.text.textContainer).width() + textAreaPadding >= $(tools.text.textarea).width()) {
                            processed_lines.push(tempLine);
                            tools.text.textContainer.textContent = words[index] + ' ';
                        }
                        // Assign text contained in the temp div to a temp variable to hold text of current line
                        tempLine = tools.text.textContainer.textContent;
                    }
                    // Add the text to the processed lines collection
                    // FOr graphics it is needed that each like (including wrapped ones) are different lines
                    processed_lines.push(tempLine);
                }

                var ta_comp_style = getComputedStyle(tools.text.textarea);
                var fs = internal.graphicState.textSize + "px";
                var ff = ta_comp_style.getPropertyValue('font-family');
                var fontvalue = fs + ' ' + ff;
                var contextTemp = internal.options.contextTemp;
                contextTemp.font = fontvalue;
                contextTemp.textBaseline = 'top';
                for (var n = 0; n < processed_lines.length; n++) {
                    var processed_line = processed_lines[n];
                    contextTemp.lineWidth = internal.graphicState.textSize;
                    contextTemp.lineJoin = 'round';
                    contextTemp.lineCap = 'round';
                    contextTemp.strokeStyle = internal.graphicState.LineColor;
                    contextTemp.fillStyle = internal.graphicState.LineColor;
                    contextTemp.fillText(processed_line, parseInt(tools.text.textarea.style.left), parseInt(tools.text.textarea.style.top) + n * parseInt(fs));
                    tempY.push(parseInt(tools.text.textarea.style.top) + n * parseInt(fs));

                }
                action.data = { x1: parseInt(tools.text.textarea.style.left), y1: tempY, textlines: processed_lines };
                action.font = fontvalue;
                internal.addAction(action);
                // Writing down to real canvasTempText now
                tools.img_update.finish();
                tools.text.textarea.style.display = 'none';
                tools.text.textarea.value = '';
            },

            onPaint: function () {
                // Tmp canvasTemp is always cleared up before drawing.
                var contextTemp = internal.options.contextTemp;
                contextTemp.clearRect(0, 0, internal.options.canvasTemp.width, internal.options.canvasTemp.height);
                var x = Math.min(tools.mouse.x, tools.start_mouse.x);
                var y = Math.min(tools.mouse.y, tools.start_mouse.y);
                var width = Math.abs(tools.mouse.x - tools.start_mouse.x);
                var height = Math.abs(tools.mouse.y - tools.start_mouse.y);
                tools.text.textarea.style.left = x + 'px';
                tools.text.textarea.style.top = y + 'px';
                tools.text.textarea.style.width = width + 'px';
                tools.text.textarea.style.height = height + 'px';
                $(tools.text.textarea).css("max-height", internal.options.canvasTemp.height - y + "px");
                $(tools.text.textarea).css("max-width", internal.options.canvasTemp.width - x + "px");
                tools.text.textarea.style.display = 'block';
            },
            redraw: function (actionslist) {
                for (var j = 0; j < actionslist.data.textlines.length; j++) {
                    var processed_line = actionslist.data.textlines[j];
                    var context = internal.options.context;
                    context.lineWidth = actionslist.brushsize;
                    context.strokeStyle = actionslist.color;
                    context.fillStyle = actionslist.color;
                    context.font = actionslist.font;
                    context.fillText(processed_line, actionslist.data.x1, actionslist.data.y1[j]);
                }
            }
        },

        // This function draws the #imageTemp canvasTemp on top of #imageView, after which 
        // #imageTemp is cleared. This function is called each time when the user 
        // completes a drawing operation.
        img_update: {
            finish: function () {
                var contexto = internal.options.context;
                contexto.globalCompositeOperation = 'source-over';
                contexto.drawImage(internal.options.canvasTemp, 0, 0);
                internal.options.contextTemp.clearRect(0, 0, internal.options.canvasTemp.width, internal.options.canvasTemp.height);
            }
        }
    };

    // sketch tools are are selected and related reference canvas are initialised
    var shapes = {
        currentTool: null,
        toolObject: null,
        initSketchPosition: function (ev) {
            if (ev.layerX || ev.layerX === 0) { // Firefox
                ev._x = ev.layerX;
                ev._y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX === 0) { // Opera
                ev._x = ev.offsetX;
                ev._y = ev.offsetY;
            }
            return ev;
        },
        //  used to set the current tool 
        // which is selected from the list of tools
        setTool: function (id) {
            shapes.currentTool = id;
            internal.options.canvasTemp.style.display = 'block';
        },

        // Mouse down event associated with the temp canvas 
        //Holding down the mouse button will initiate this.
        initDrawing: function (ev) {
            ev = shapes.initSketchPosition(ev);
            tools[shapes.currentTool].initDrawing(ev);
        },

        //This function is called every time you move the mouse.
        // Mouse move event is associated with temp canvas
        draw: function (ev) {
            ev = shapes.initSketchPosition(ev);
            tools[shapes.currentTool].draw(ev);
        },

        //once mouse is released this events 
        //is fired and ends up tool action
        getAction: function (ev) {
            ev = shapes.initSketchPosition(ev);
            tools[shapes.currentTool].getAction(ev);
        }
    }

    v1.initSketchTools = function (args) {
        internal.createSketchToolsMarkup();
        internal.createSketchInstance(args);
        // to handle events which are tiriggered
        internal.handleEvents();
        internal.setTempSketch(shapes.initDrawing, shapes.draw, shapes.getAction);
        var sketcher = internal.options.$sketcher;
        var context = internal.options.context;
        // default action for pencil with out selecting any other tools
        internal.defaultPencilSketch(sketcher, context);
    }

    // Undo functionality
    var UndoRedo = {
        redrawAll: function () {
            var context = internal.options.context;
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            internal.redrawEditedSketches();
            // Due to load of the image take few mili second then first need to draw edited image
            // on top of that list of actions are drawn
            setTimeout(function () {
                for (var i = 0; i < internal.Actions.length; i++) {
                    var action = internal.Actions[i];
                    tools[action.type].redraw(action);
                }
            }, 25);
        },
        undoLast: function () {
            internal.Actions.pop();
        }
    };
    // sketch tools initialisation
    v1.sketchtools = function (id) {
        $("#imageTemp").css("display", "block");
        shapes.setTool(id);
        internal.removeTextTool();
        $('.shapes li').removeClass('buttonselected');
        $(".shapes #" + id).addClass('buttonselected');
    }
    // public methods to show canvas
    v1.showSketcher = function () {
        internal.setSketcherPostion();
    };

    // public method to undo
    v1.undo = function () {
        internal.removeTextTool();
        UndoRedo.undoLast();
        UndoRedo.redrawAll();
    }

    // public method to reset all
    v1.clear = function () {
        v1.resetSketcher();
        internal.resetEditedValues();
    }

    // Check whether sketch is drwn on skreen or not
    v1.isSketchEmpty = function () {
         if (internal.Actions)
          return internal.Actions.length > 0 ? true : false;        
    }

    // Get the canvas instance used inside the lib
    // can be utilised for any other places 
    v1.getSketcherDetails = function () {
        var sketcher = $('#' + internal.options.sketcher);
        return sketcher;
    }

    // Draw sketches on screen when user selects while editing sketch
    v1.setImager = function (skethData) {
        var context = internal.options.context;
        context.globalCompositeOperation = 'source-over';

        var image = new Image();
        image.onload = function () {
            context.drawImage(image, 0, 0);
        };
        if(skethData!=null){
        image.src = skethData;
        }
    }

    // // get any kind of  image  from the sketch : base64,ping,jpeg etc
    v1.getImager = function () {
        var obj = { imgdata: $("#" + internal.options.sketcher)[0].toDataURL(), color: "" };
        return obj;
     }

    // Set the size of the sketcher elements based on any type of conatiner height and width
    v1.setSize = function (width, hieght) {
        internal.setSize(width, hieght);
    }
    // After resizing  sketch container to redraw 
    // sketches this is usefull
    v1.getPrevSketches = function () {
        UndoRedo.redrawAll();
    }

    // Brush size of the different tools
    v1.setBrushSize = function (size) {
        $("#brushValue").text(size);
        if (shapes.currentTool === "text")
            internal.graphicState.textSize = internal.options.context.lineWidth = size;
        else
            internal.graphicState.BrushSize = internal.options.context.lineWidth = size;
    }
    // Get brush size of various tools
    v1.getBrushSize = function () {
        internal.showBrushValue();
        if (shapes.currentTool === "text")
            return internal.graphicState.textSize;
        else
            return internal.graphicState.BrushSize;
    }
    // Hide sketch related elements
    v1.hideSketcher = function () {
        $("#sketcher").hide();
        $('#imageTemp').hide();
        //for text tool text area hide
        $("#" + internal.options.container + " textarea").hide();
        $("#" + internal.options.container + " textarea").val('').empty();
    }

    v1.resetSketcher = function () {
            internal.Actions = [];
            $("[name = 'shapes']").parent().children().removeClass('buttonselected');
            $('#pencil').addClass('buttonselected');
            $('#colors li:first').click();
            internal.clearContext(internal.options.context);
            internal.removeTextTool();
            $('#brush_size').val(0);
            internal.graphicState.BrushSize = internal.options.context.lineWidth = 1;
            internal.graphicState.textSize = 10;
            $("#imageTemp").css("display", "none");
            internal.showBrushValue(); $('#brushValue').text(1);
    }

})(window.sketchv1 = window.sketchv1 || {});