///This category.js file will list the category names and category video's in gallery page.

(function (ns) {
    //Private region starts.
    var internal = {

        setClickEvents: function () {

            //Applyig css,onclick of seleceted element in category name.
            $('#categorylist li span').on('click', function () {

                $('li span.cate-active').removeClass('cate-active');
                $(this).addClass('cate-active');
            });
        }
    };
    //Private region ends.

    //initializing the category(index.js file).
    ns.initCategory = function () {

        //Get category list.
        var categorylist = ViTagUI.distinctCategories();
        //Bind the category list to category container in gallery.
        ViTagUI.bindCatList(categorylist);
        //intialize all click events.
        internal.setClickEvents();
    };

    ns.isCategory = false;

    ns.getCategoryView = function (categoryList, type) {
        var uniqCategories;
        if (type === "search")
            uniqCategories = categoryList;
        else {
            var list = ViTagUI.distinctCategories();
            uniqCategories = ViTagUI.unqiueCategory(list.Categories);
        }

        if (uniqCategories !== null && uniqCategories !== undefined) {
            var categories = uniqCategories;

            $.each(categories, function (i) {
                var info = ViTagUI.getVideoinfoByCategory(categories[i]);
                var count = info.count;

                if (categories[i] === "") {
                    $.each(info.vidDetails, function (j) {
                        var videototalduration = info.vidDetails[j].videototalduration;
                        var specSnap = ViTagUI.getSnapShotPath(this.sourcetype, this.snap, info.vidDetails[j]);
                        var vidObj = {
                            specSnap: specSnap, title: unescape(info.vidDetails[j].title),
                            videototalduration: ViTag.getTimeFormat(videototalduration),
                            isCategory: true, sourcetype: this.sourcetype,
                            videoID: this._id, ownername: this.ownername,
                            modifiedDate: this.modifieddate
                        };
                        ViTagUI.getCommonCategory(vidObj, $(".details >.vi-title1").length);
                        $("#videoTtl" + ($(".details >.vi-title1").length - 1)).attr("title", vidObj.title);//here title atribute is added to div element of class .vi-title1. 
                    });
                }
                else {
                    var specSnap = ViTagUI.getSnapShotPath(info.vidDetails[0].sourcetype, info.vidDetails[0].snap, info.vidDetails[0]);
                    var videoObj = {
                        specSnap: specSnap, title: categories[i],
                        videototalduration: "",
                        isCategory: false, sourcetype: this.sourcetype,
                        videoID: this._id, count: count
                    };
                    ViTagUI.getCommonCategory(videoObj, $(".details>.vi-title1").length);
                    $("#videoTtl" + ($(".details >.vi-title1").length - 1)).attr("title", videoObj.title);

                }
            });
        }
        else {
            if (type === "search")
                return;
            $(vidMenuContainer).html("");
            $(vidMenuContainer).html(ViTag.getLocalizeValue("msg.checkCategory"));
        }
    };

    ns.getCommonCategory = function (videoObj, vidCount) {
        var html = ""; var $vl = $(vidMenuContainer);
        html += "<div class='col-xs-6 col-sm-3'>";
        html += "<img src='" + videoObj.specSnap + "'  height='120' class='vi-img'/>";
        html += "<div class='vi-control'>";
        html += "<div class='vi-click'  onclick=\"ViTagUI.toc('" + escape(videoObj.title) + "'," + videoObj.sourcetype + ",'" + videoObj.videoID + "')\"></div>";
        html += " <div class='grad1'></div>";
        html += "</div>";
        html += " <div class='details'>";
        var videoTitle = ViTag.htmlEncode(unescape(videoObj.title));
        if (videoObj.count !== undefined)
            html += "<div id='" + "videoTtl" + vidCount + "' class='vi-title1 truncate-text text-width' ><span>" + videoTitle + "(" + videoObj.count + ")</span></div>";
        else
            html += "<div  id='" + "videoTtl" + vidCount + "' class='vi-title1 truncate-text text-width' ><span>" + videoTitle + "</span></div>";
        html += " <div class='vi-dura1 clearfix'>";
        html += "<div class='" + ViTagUI.getIcon(videoObj.sourcetype) + "' onclick=\"ViTagUI.toc('" + escape(videoObj.title) + "'," + videoObj.sourcetype + ",'" + videoObj.videoID + "')\"></div>";
        return ViTagUI.getCategoryDetails(videoObj, html, $vl);
    };

    ns.getCategoryDetails = function (videoObj, html, $vl) {

        if (!videoObj.isCategory) {
            html += "<div class='pull-left ind-category' onclick=\"ViTagUI.toc('" + escape(videoObj.title) + "'," + videoObj.sourcetype + ",'" + videoObj.videoID + "')\"></div>";
            html += " <div class='vi-dura1 clearfix'> ";
        }
        else {
            html += "<div class='pull-right default-cursor'><span data-i18n=\"playerEdit.duration\"></span><span>"+": "+"</span>"+ videoObj.videototalduration + "</div>";
            html += " <div class='vi-dura1 clearfix'> <time class='timeago' datetime='" + videoObj.modifiedDate + "'><span data-i18n=\"snippet.updated\"></span><span><span>"+": "+"</span>"+ videoObj.modifiedDate + "</time> ";
        }
        if (videoObj.ownername !== undefined)
            html += "<div class='pull-right default-cursor'><span data-i18n=\"snippet.by\"></span><span>"+": "+"</span>"+ videoObj.ownername + "</div>";
        html += "</div></div></div>";
        $vl.append(html);
     
         ViTag.localize($vl);
        $("time.timeago").timeago();
    };

    // Get the Videos details based on category name to display table of contents
    // for that perticular category
    ns.getVideoinfoByCategory = function (categoryname) {
        if (categoryname !== null) {
            var count = 0, videoDetail = [];
            var vidsource = ViTag.source;
            $.each(vidsource, function (i) {
                if (vidsource[i].category !== undefined) {
                    var data = unescape(vidsource[i].category);
                    var categoryvalue = data.split(",");
                    $.each(categoryvalue, function (j) {
                        categoryname = categoryname.toLowerCase();
                        categoryvalue[j] = categoryvalue[j].toLowerCase();
                        if (unescape(categoryname.trim()) === categoryvalue[j].trim())// white space is is comming from server and hence validated
                        {
                            count = count + 1;
                            videoDetail.push(vidsource[i]);
                        }
                    });
                }
            });
            return { count: count, vidDetails: videoDetail };
        }
    };

    //Binding category list to category container in gallery.
    ns.bindCatList = function (categorylist) {
        if (ViTag.source.length === 0 && $("#categorylist li").length!==0) {
            $("#category").find(".any").text("");
            $("#categorylist li")[0].remove()
        }
        if (categorylist.Categories !== undefined) {
            var categories = ViTagUI.unqiueCategory(categorylist.Categories);//Getting category names from categorylist.
            //Sorting category in ascending order.
            categories.sort(function (a, b) {
                var alc = a.toLowerCase(), blc = b.toLowerCase();
                return alc > blc ? 1 : alc < blc ? -1 : 0;
            });

            $.each(categories, function (indexofCatName) {
                var html = "";
                if (categories[indexofCatName] !== "") {
                var categoryName = ViTagUI.htmlEncode(categories[indexofCatName]);
                    html += "<li><span class='truncate-text text-width' title='" +categoryName + "' id='cat" + indexofCatName + "' onclick=\"ViTagUI.getCatVideos(" + indexofCatName + ")\">" + categoryName + "</span></li>";
                    $('#categorylist').append(html);
                }
            });
        };

        //Listing category videos with the same category name.
        ns.getCatVideos = function (index) {
            ns.isCategory = true;
            ns.catIndex = index;
            $('#vidSearch').val('');
            var categoryName = $("#cat" + index).text();//Get the category name.
            $('#myCarousel').hide(); //Hide displaying Carousel.
            var isStaging = false, ishome = false, categroy = true//To display only specific video.
            //Get video category details by category name.
            var getCatinfo = ViTagUI.getVideoinfoByCategory(categoryName);
            $('#videoList').html(''); //Clear previous video's in video container.
            //Get category list of individual video.
            ViTagUI.getCommonView(getCatinfo.vidDetails, isStaging, ishome, categroy);
        };

        //Get all gallery Videos.
        ns.getGalleryVideos = function () {

            $('#videoList').html('');//clear previous videos.
            $('#myCarousel').show();//dispplay Carousel.
            //Get all videos.
            ViTagUI.getCategoryView();
            ns.isCategory = false;
        }
    };

    //To remove the duplicate category in categorylist
    ns.unqiueCategory = function (category) {
        for (var i = 0; i < category.length; i++) {
            ViTagUI.removeDuplicateCategory(category, i);
        }
        return category;
    };
    ns.removeDuplicateCategory = function (category, i) {
        for (var j = 0; j < category.length; j++) {
            if ((i !== j && i<category.length) && (category[i].toLowerCase() === category[j].toLowerCase())) {              
                    category[i] = category[i].toLowerCase();
                    category.splice(j, 1);
              
            }
        }
    };

})(window.ViTagUI = window.ViTagUI || {});