(function (ns) {

  var volumebar = "#volume-bar";
  ns.getReady = function () {
   ViTag.visapLocalize();
    //initial parameters for init method in visap.
    internal.setArgs();
    var videoId = internal.getQueryString();

    //visap player initialization.
    ViTag.init(internal.videoArgs);
    //To play the video
    ViTagUI.play(videoId);

    //to hide the volume bar when page is loaded.
    $(volumebar).hide();
    //To bind events.
    internal.bindEvents();

    if (ViTag.CurrentSrc().sourcetype === ViTag.sourceTypeEnum.youtube) {
      $("#playerYT").width($("#playerpart").width());
      return;
    }
    ViTagUI.isValidVideoId(videoId);
  }

  ns.play = function (videoId) {
    //To play the video with default video id
    ViTag.play(videoId);
    $("#slider").hide();
    ns.bindTagsLinks();
  }
  //To check video id valid or not
  ns.isValidVideoId = function (videoId) {
		  if (videoId === "" || $("#vid1").attr("src") == undefined) {
      $("#playerpart").append("<div></div").html("<h3>Invalid video detail!</h3>");
      $("#tagLinkBtn").hide();
      $("#playContainer").hide();
      return;
		  }
		  else {
      $("#tagLinkBtn").show();
      $("#playContainer").show();
		  }
  }

  // current tags and links are initailzed while playing viedo and populate html structure.
  ns.bindTagsLinks = function () {
    var source = ViTag.CurrentSrc();//get current source.
    var tags = ViTag.CurrentSrc().tags;//get current source tags.
    var links = ViTag.CurrentSrc().links;//get current source links.

    var markup = "", notags = false, nolink = false;
    $("#accordion").html('');
    markup += "<div class='panel panel-default'>";
    markup += "<div id='collapseOne' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne'>";
    markup += "<div class='panel-body toc-pad'>";

    //These block of code is to dispaly created tags.	
    if (tags) {
      if (tags.length > 0) {
        $(source.tags).each(function () {
          var editedValue = 'ViTagUI.EditTag(' + this.t + ', "' + escape(this.d) + '")';
          markup += "<div class='toc-divider'><table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr  onclick=\"ViTag.playAt('" + this.t + "')\"> <td class='toc-vi-newname toc-icn-tag truncateTxt' title='" + unescape(this.d) + "' data-toggle='tooltip'>" + ViTag.htmlEncode(unescape(this.d)) + "</td><td class='toc-duration'>" + ViTag.getTimeFormat(this.t) + "</td>";
          if (!ns.ishome)
            markup += "<td class='action-controls1'><ul class='act-controls-main'><li class='edit-small hideEle' onclick='" + editedValue + "'><li class='delete-small hideEle' onclick='javascript:if(ViTag.getConfirmToDel(\"Tag\")) ViTagUI.DeleteTag(\"" + escape(this.d) + "\"\)'></li></li></ul></td></div>";
          markup += "</tr></table></div>";
        });
      }
      else notags = true;
    }
    else
      notags = true;
    if (notags) {
      markup += "<div class='toc-divider'><table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr> <td class='toc-vi-name toc-icn-tag'>No Tags Found</td> <td class='toc-duration' ></td>  </tr> </table> </div>";
    }

    //These block of code is to dispaly created links.	      
    if (links) {
      if (links.length > 0) {
        $(source.links).each(function () {
          var editedValue = 'ViTagUI.EditLink("' + this.n + '", "' + this.u + '")';
          markup += "<div class='toc-divider'> <table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr> <td class='toc-vi-newname toc-icn-link truncateTxt' title='" + unescape(this.n) + "' data-toggle='tooltip'><a href='" + this.u + "' class='navigatelink'  target='_blank'\">" + ViTag.htmlEncode(unescape(this.n)) + "</a></td>";
          if (!ns.ishome)
            markup += "<td  class='action-controls1'><ul class='act-controls-main'><li class='edit-small hideEle' onclick='" + editedValue + "'><li class='delete-small hideEle' onclick='javascript:if(ViTag.getConfirmToDel(\"Link\")) ViTagUI.DeleteLink(\"" + this.n + "\"\)'></li></li></ul></td></div>";
          markup += "</tr> </table> </div>";
        });
      } else
        nolink = true;
    }
    else
      nolink = true;
    if (nolink) {
      markup += "<div class='toc-divider'><table width='100%' border='0' cellspacing='0' cellpadding='10'> <tr> <td class='toc-vi-name toc-icn-link'>No Links Found</td> <td class='toc-duration' ></td>  </tr> </table> </div>";
    }
    markup += "</div></div></div>";
    $("#accordion").append(markup);
  }

  // Sliding tags and links.
  ns.getTagsLinks = function () {
    internal.showSliderContent("tags");
  }

  var internal = {
    videoArgs: {},
    setArgs: function () {
      internal.videoArgs.autoplay = false;
      internal.videoArgs.path = ViTag.config.videoRepoPath;
      internal.videoArgs.player = "vid1";
      internal.videoArgs.mode = true;
      internal.videoArgs.tokenURL = ViTag.config.visapTokenurl;
    },

    bindEvents: function () {
      //To show tags and links
      $("body").on("showSliderContent", function (event, type) {
        internal.showSliderContent(type);
      });
      //To hide and show the volumebar.
      $("#playContainer").click(function (event) {
        var target = $(event.target);
        if (target.attr('id') == 'imgMute' || target.attr('id') == 'volume-bar') {
          $(volumebar).removeClass("bar");
          $(volumebar).show();
        } else {
          $(volumebar).addClass("bar");
          $(volumebar).hide();
        }
      });
      $("body").on("hideTagLinkContainer", function () {
         $("#slider").toggle(1000);
      });
    },
    getQueryString: function () {
      var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        return urlparam[1];
      }
    },
    // Sliding tags and links and Question container..
    showSliderContent: function (type) {
      $("#slider").toggle(1000);
      if (type === "tags") {
        $("#questContainer").hide();
        $("#accordion").show();
      }
      else {
        $("#questContainer").show();
        $("#accordion").hide();
        $("#slider").show(1000); // incase if the tags and links are visible then show the slidser explicitly
      }
    }
  }
})(window.ViTagUI = window.ViTagUI || {});

