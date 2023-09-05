
/*Current file has the methods supporting to display Table of contents to users
 and videos can be played based on the contents prepared byInstructors
*/


var repoPath = "http://visap.excelindia.com/VideoRepo/", timeInterval = null, onlyplay=false,
    PlayerId = "vid1";



/// <summary>
/// Initial function  called when page loads
/// </summary>

(function (ns) {

    ns.getReady = function () {
        var userName = localStorage.getItem('AppUser');
        if (userName == null)
            ns.logout();
        else {
            //container is displaying 
            $('#videoContainer').hide();           
            internal.setVideo(userName);        
            ns.getCategoryView(ViTag.source);
            internal.loadTOCView();
            ns.setClickEvents();
            internal.attachEvents();
            internal.firefoxfullScreenEvent();
        }

    };

    /// <summary>
    /// plays video and then tag if user has  not played the video
    /// </summary>
    /// <param name="id">unique id to play video</param>
    /// <param name="tagtime">time at which video has to play</param>
    /// <param name="desc">description of the tag</param>   
    ns.playVideothenTags = function (id, tagtime, desc) {
    
    	if(!(ViTag.CurrentSrc()._id == id))
    	{
    		 ViTagUI.play(id);
    	}
	
     // Triggers on src change to set seekbar and totalduration before playAt  setTimeout is used
	 setTimeout(function(){
       ViTagUI.playAt(tagtime, desc);
      },1000);
        
    };

    /// <summary>
    /// Below method is called only when tag is played
    /// plays only the content of the video
    /// </summary>
    /// <param name="tagtime">time at which video has to play</param>
    /// <param name="desc">description of the tag</param>
    ns.playAt = function (tagtime, desc) {
      //  ViTag.pause();
        $('#videoContainer').show();
        $('#divright').show();
        $("#controls").show();
        clearInterval(timeInterval);
       // $("#vid1")[0].play();
        $("#headerTittle").html('');
        var htmltittle = ViTag.CurrentSrc().title + ":" + desc;
        $("#headerTittle").html(unescape(htmltittle));
        var nexttagtime = $.grep(ViTag.CurrentTags(), function (e) { return e.t > tagtime; })[0];
        timeInterval = setInterval(function () {
        if(nexttagtime!=undefined)
        {   if (parseInt(ViTag.getCurrentTime()) == nexttagtime.t) {
                ViTag.pause();
                clearInterval(timeInterval);
                $("#imgPlay").removeClass("imgPause").addClass("imgPlay");
            }
        }}, 1000);

        ViTag.playAt(tagtime);
   };

    /// <summary>
    /// Plays the full  video for the entire duration
    /// This method is invoked when user clicks on play icon
    /// </summary>
    /// <param name="ID">unique id of the video to be played</param>
    ns.play = function (ID) {
    //Ideally if container is taken we need not show/hide controls   
        $('#videoContainer').show();
        $('#divright').show();
        onlyplay=true;
        $("#headerTittle").html("");
        $("#controls").show();
        ViTag.play(ID);
        var htmltittle = ViTag.CurrentSrc().title;
        $("#headerTittle").html(unescape(htmltittle));
        return false;
    };

    /// <summary>
    /// Clicking on ExpandAll all authored videos 
    /// is displayed along with tags.tags are contents
    /// </summary>
    ns.setClickEvents = function () {
        var contentAreas = $('#accordion .ui-accordion-content ').hide();
        var expandLink = $('.accordion-expand-all');
        expandLink.click(function () {
            var isAllOpen = !$(this).data('isAllOpen');
            if (isAllOpen)
                ViTagUI.populatemetadata(ViTag.source);
            contentAreas[isAllOpen ? 'slideDown' : 'slideUp']();
            expandLink.text(isAllOpen ? 'Collapse All' : 'Expand all').data('isAllOpen', isAllOpen);
        });
 
    };

    // On click of the category respective table of contents are diplayed
    ns.categoryTOC = function(category)
    {
         $('#categorycontents').hide();
         $('#tabelofcontents').show();
         localStorage.setItem('catgoryName',category);
         window.location.href = '../toc/index.htm';  
    };


     /// <summary>
        /// Gets the category lists view of thumbnails
        /// </summary>
     ns.getCategoryView =  function (source,type) {
            var list = null;
            $("#thumbnailView").html("");
            $('#tabelofcontents').hide();
            if(type == "search")
            list = source;
            else
            list = ns.distinctCategories();    

           if(list!= null && list.length > 0)
           {
             ns.categoryinfo = list;
             var categories = list[0].category;
             $.each(categories, function (i) {
                var containerpage = "";
                if(i==0)
                {
                	containerpage += "<br>";
                }
                containerpage += "<div class='thumbnail'><br><a class='subtitle' onclick='javascript:ViTagUI.categoryTOC(\"" + categories[i] + "\"\)' >";               
                if(categories[i] == "")
                   containerpage += "Others";
                else
                containerpage += categories[i];
                var info = internal.getVideoinfoByCategory(categories[i]);
                containerpage += "<span class='brace'> (" +info.count + ") </span><a></div>";               
                $("#thumbnailView").append(containerpage);
            });
           }
           else
           {
             $("#thumbnailView").html("");
             $("#thumbnailView").html("No Category found");
           }

     };

    /// <summary>
    /// Gets the next tag ahead of the passed tagtime`
    /// </summary>
    /// <param name="tagtime">current tag time to compare</param>
    /// <param name="tags">source to iterate</param>
    /// <param name="duration">total duration of the video</param>
    ns.getTagTime = function (tagtime, tags, duration) {
        var t = $.grep(tags, function (e) { return e.t > tagtime; })[0];
        //Take the next tag time to calculate the duartion      
        return t ? t.t - tagtime : duration - tagtime;
    };


    /// <summary>
    /// Fills the header content of the logged in users Videos without playing video
    /// Headers are populated with the tittle of the videos.
    /// </summary>
    /// <param name="tagtime">current tag time to compare</param>
    ns.populatemetadata = function (source) {
        //internal.hideDivisions();
        var html = "";
        $.each(source, function (i) {
            internal.curtags.tags = null;
            allTags = internal.getmetadata(this._id);
            internal.fillContent(internal.curtags.tags, this._id, this.videototalduration);
        });
    };

    /// <summary>
    /// Category Search - Searches the Category
    /// Headers are populated with the tittle of the videos.
    /// </summary>
    /// <param name="opt">search key </param>
    ns.doVidSearch = function (opt) {    
        var categorySerachKey = opt.obj.value, vidSrc = null;
        var userName = localStorage.getItem('AppUser');	 
		var loggedUserRole = localStorage.getItem('role'); 
        //for & and # we need to encode for serverice to get value else it will have null value
        if(categorySerachKey=="&")                 
         categorySerachKey= categorySerachKey.replace("&","%26");
        
          if(categorySerachKey=="#")
        categorySerachKey=categorySerachKey.replace("#","%23");

         
          if(categorySerachKey=="+")
        categorySerachKey=categorySerachKey.replace("+","%2B");

    
   
          $.ajax({            
                url: "category.do",
                type: "POST",
                headers: { isStage: ns.isStaging, 'X-Authorization': localStorage.getItem('authT'), },
                data: { searchKey: categorySerachKey },
                async: false,
                success: function (data) {               
                   data = data.replace(/\n/g, "");
                   vidSrc = JSON.parse(eval(data)); 
                },
                error: function () {
                    alert('Error in loading data');
                }
            });          
            ns.getCategoryView(vidSrc,"search");
    };
    
    /// <summary>
    /// Populate only accordion section
    /// </summary>
    /// <param name="source">list of the videos from visap</param>
    ns.populateSection = function (source) {
        $("#controls").hide();
        //internal.hideDivisions();
        var html = "";
        if (source && source.length > 0) {
            $.each(source, function (i) {
                html += "<h3 class='toc-fontcolor'  id=" + this._id + " onclick=\"ViTagUI.populatemetadata('" + this._id + "')\"><span class='imgvideo' id="+ this._id +" onclick=\"ViTagUI.play('" + this._id + "')\">&nbsp;</span>" + unescape(this.title) + " <span class='tagstime'>" + internal.formattime(this.videototalduration) + " </span></h3>";
                html += "<div id='tagcontainer'><div  id='tagDiv" + this._id + "'></div></div>"
            });
            $('#accordion').append($(html));
            $("#accordion").accordion({ header: "h3", collapsible: true, active: false, heightStyle: "content" });
        }
    }


    
    ns.distinctCategories = function(){
   var categorylist=[]; 
    var userName = localStorage.getItem('AppUser');	 
		 var loggedUserRole = localStorage.getItem('role');    
          $.ajax({            
                url: "category.do",
                type: "POST",
                headers: { isStage: ns.isStaging, 'X-Authorization': localStorage.getItem('authT') },
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

    //Private region starts
    var internal = {
        videoArgs: {}, curtags: {},
        // Before the page is loaded this method invokes to initailse the accordian 
        // once accordian gets activated all the source are listed
        // videos names are listed as header and its revelent tags are listed as content 

        attachEvents: function () {
          $('#accordion h3').click(function()
            {
                if(onlyplay)
                 {
                    return false;
                 }
            });

            $('#accordion').accordion().on('accordionactivate', function (event, ui) {
                $('#divright').hide();
                var id = $('.ui-accordion-header-active').attr('id');
                    if (id != undefined) {                      
                         onlyplay=false;
                        internal.curtags.tags = null;
                        //get metadata on click of tittle                           
                        internal.getmetadata(id);
                        //get the duration by looping the source
                        duration = internal.GetSource(id);
                        internal.getMarkup(id, internal.curtags.tags, duration.videototalduration);
                    }

            });

             $('#accordion').find('.imgvideo').click(function () {                  
                    onlyplay=true;
                    return false;
             });

               $("body").on("onFullScreen", function (event, isFullScreenON) {
                 //internal.setCustomUI(isFullScreenON);
            });
           
        },


        /// <summary>
        /// Searches a particular video based on the ID.
        /// Passed as parameter.   
        /// </summary>
        /// <param name="_id">Unique id of the video</param>
        GetSource: function (_id) {
            return ViTag.source ? $.grep(ViTag.source, function (e) { return e._id == _id; })[0] : null;
        },

        /// <summary>
        /// Logged in username needs to be passed to visap
        /// setting of the parameters which are to be passed to visap init   
        /// </summary>
        /// <param name="userName">name of the loggedin User</param>
        setVideo: function (userName) {
            internal.setVideoArgs(userName);
            ns.videoArgs = ViTag.init(internal.videoArgs);
        },

        /////Moving from fullscreen to normal screen in firfox.
        firefoxfullScreenEvent: function () {
            document.addEventListener("mozfullscreenchange", function () {
                ViTag.toggleScreen();
            }, false);
        },

        /// <summary>
        /// Service call to  get the metadata of the passed Video ID
        /// Tgas are the excepted results
        /// </summary>
        /// <param name="_id">Unique id of the video</param>
        getmetadata: function (id) {
            $.ajax({
                url: "metadata.do",
                type: "POST",
                async: false,
                headers: { isStage: false, 'X-Authorization': localStorage.getItem('authT') },
                data:{ID: id},
                success: function (data) {
                    data = data.replace(/\n/g, "");
                    obj = JSON.parse(eval(data));
                    if (obj[0] != undefined) {
                        if (obj[0].tags != undefined) {
                            internal.curtags.tags = obj[0].tags;
                            return internal.curtags.tags;
                        }
                    }
                },
                error: function () {
                    alert('Error in loading data');
                }
            });
        },

        //Arguments are passed to core libraries
        setVideoArgs: function (userName) {
            internal.videoArgs.autoplay = false;
            internal.videoArgs.path = repoPath;
            internal.videoArgs.player = PlayerId;
            internal.videoArgs.mode = ns.isStaging ? true : false;
            internal.videoArgs.username = ns.isStaging ? "stage" : userName;
        },


        /// <summary>
        /// To hide the  other contents when the player 
        /// is created from core library   
        /// </summary>
        hideDivisions: function () {
            $('#curSrcTitile').hide();
            $("#canvasDiv").hide();
            $("#annotates").hide();
            $("#imgOverlay").hide();

        },

        /// <summary>
        /// Formats the duration from seconds to hour mints and secs
        /// Header will have duartion in hr mins and sec and contents in mins and secs  
        /// </summary>
        /// <param name="secs">seconds which need to be formatted</param>
        /// <param name="istag">bool condition to check the type of formatting</param>
        formattime: function (secs, istag) {
            if (secs == undefined)
                return "--";
            var hr = Math.floor(secs / 3600);
            var min = Math.floor((secs - (hr * 3600)) / 60);
            var sec = secs - (hr * 3600) - (min * 60);
            if (hr < 10) { hr = "0" + hr; }
            if (min < 10) { min = "0" + min; }
            if (sec < 10) { sec = "0" + sec; }
           // if (hr) { hr = "00"; }
            if (istag)
                return min + ':' + sec;
            else
                return hr + ':' + min + ':' + sec;
        },


        /// <summary>
        /// Gets the marks up for tags content and adds to to accordian content  
        /// </summary>
        /// <param name="index">index to be append html</param>
        /// <param name="tags">list of tags</param>
        /// <param name="totalduration">duration in seconds</param>

        getMarkup: function (index, tags, totalduration) {
            $("#" + "tagDiv" + index).html("");
            var html = "";
            if (tags) {
                $(tags).each(function () {
                    var time = internal.formattime(ViTagUI.getTagTime(this.t, tags, totalduration), true);
                    html += "<div class='tab-list'><ul class='headerlist'><li class='detailsList'>"
                    html += "<span class='tagslist'><div onclick=\"ViTagUI.playVideothenTags( '" + index + "','" + this.t + "','" + this.d + "')\">" + unescape(this.d) + "<span class='tagstime'>" + time + "</span> </div></span>";
                    html += "</li></ul></div>"
                });
            }

            $("#" + "tagDiv" + index).append($(html));
        },

         // Get the Videos details based on category name to display table of contents
         // for that perticular category
        getVideoinfoByCategory: function (categoryname) { 
            if(categoryname!=null)
             {
                    var count = 0,videoDetail=[]; 
                    var vidsource = ViTag.source;
                    $.each(vidsource, function (i) {
                    if(vidsource[i].category!=undefined)
                    {
                        var data = unescape(vidsource[i].category);
                        if(data!=undefined)
                        {
                               var categoryvalue = data.split(",");
                               $.each(categoryvalue, function (j) {    
                                if (categoryname.trim() == categoryvalue[j].trim())// white space is is comming from server and hence validated
                                {
                                    count = count + 1;
                                    videoDetail.push(vidsource[i]);
                               }
                           });
                         }
                     }
                    });
                    return {count:count,vidDetails:videoDetail};
               }
       
        },

        //fill the content of the accordian when expand and collapse is called
        fillContent: function (tags, index, tagduration) {
            $('#accordion > h3').each(function (i) {
                internal.getMarkup(index, tags, tagduration);
            });

        },
        // Loads toc of the perticular category
        // Get category name and videos which are related to this perticular category are listed 
        loadTOCView: function(){
            var categoryName = localStorage.getItem('catgoryName');
            var vidInfo = internal.getVideoinfoByCategory(categoryName);     
            if(vidInfo != undefined)
            {      
	            if(categoryName == "")
	            {
	            	$('#categoryName').text("Others");
	            }
	            else
	            {
	             	$('#categoryName').text(categoryName);
	            }
             ns.populateSection(vidInfo.vidDetails);
            }
        }
    };


})(window.ViTagUI = window.ViTagUI || {});

 

