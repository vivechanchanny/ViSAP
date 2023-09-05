
(function (ns) {
    //**********abstract class where Initialisation of canvas depending on version  ***************/
    // choosen which version of the sketch 

    /*************private region starts ****************/
    var objinstance = null;
    var internal = {
        // option parameter may needed
        options: {
            version1: "V1.0",
            version2: "V2.0"
        },
        // hiding the sketch when different actions are choosen
        handleEvents: function () {
            // hide the canvas when ever different actions are choosen while editing video
            $("body").on("hideSketches", function () {
                    objinstance.hideSketcher();
            });
            // show the canvas when ever needed
             $("body").on("showSketches", function () {
                    objinstance.showSketcher();
            });
           // Reset all the tools and elements to default when reset button is clicked
            $("body").on("resetSketches", function () {
                    objinstance.resetSketcher({container:ns.sketchcontainer});
            });
        },

        // 
        setSketcherInstance:function(){
            objinstance=  sketchv2 ;
        }

    }

   
    /*************private region ends ****************/
    internal.setSketcherInstance();

    //instialise the sketh based on version 
    ns.sketchInitialise = function (args) {
         internal.handleEvents();
         objinstance.initSketchTools(args);
    }
    
    // Draw sketches on screen when user selects while editing sketch
    ns.setImager = function (skethData, container,wbheight,wbwidth) {
        internal.handleEvents();
        objinstance.setImager(skethData, container,wbheight,wbwidth)
         
    }

    // get any kind of  image data like base64,ping,jpeg etc from sketch and store into DB
    ns.getImager = function () {
        var dataimage;
        dataimage = objinstance.getImager();
        return dataimage;
    }

    // public methods to show canvas
    ns.showSketcher = function () {
            objinstance.showSketcher();
    };

    // Check whether sketch is drwn on skreen or not
    ns.isSketchEmpty = function () {
        var isdrawn;
       isdrawn = objinstance.isSketchEmpty();
        return isdrawn;
    }

// size of the canvas vary when text container changes during whiteboard
    ns.setSize = function(width,height){
        objinstance.setSize(width,height);
    }


})(window.ViTag = window.ViTag || {});