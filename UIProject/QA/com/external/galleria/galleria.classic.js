/**
 * Galleria Classic Theme 2012-08-08
 * http://galleria.io
 *
 * Licensed under the MIT license
 * https://raw.github.com/aino/galleria/master/LICENSE
 *
 */

(function($) {

/*global window, jQuery, Galleria */

Galleria.addTheme({
    name: 'classic',
    author: 'Galleria',
    css: 'galleria.classic.css',
    defaults: {
        transition: 'slide',
        thumbCrop:  'height',

        // set this to false if you want to show the caption all the time:
        _toggleInfo: true
    },
    init: function(options) {

        Galleria.requires(1.33, 'This version of Classic theme requires Galleria 1.3.3 or later');

        // add some elements
      //  this.addElement('info-link','info-close');
      /*  this.append({
            'info' : ['info-link','info-close']
        });

        // cache some stuff
        var info = this.$('info-link,info-close,info-text'),
            touch = Galleria.TOUCH;

        // show loader & counter with opacity
        this.$('loader,counter').show().css('opacity', 0.4);

        // some stuff for non-touch browsers
        if (! touch ) {
            this.addIdleState( this.get('image-nav-left'), { left:-50 });
            this.addIdleState( this.get('image-nav-right'), { right:-50 });
            this.addIdleState( this.get('counter'), { opacity:0 });
        }

        // toggle info
        if ( options._toggleInfo === true ) {
            info.bind( 'click:fast', function() {
                info.toggle();
            });
        } else {
            info.show();
            this.$('info-link, info-close').hide();
        }*/

        // bind some stuff
       /* this.bind('thumbnail', function(e) {

            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6).bind('click:fast', function() {
                    $(this).css( 'opacity', 1 ).parent().siblings().children().css('opacity', 0.6);
                });
            }
        });

        var activate = function(e) {
            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
        };

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
            window.setTimeout(function() {
                activate(e);
            }, touch ? 300 : 0);
            this.$('info').toggle( this.hasInfo() );
        });

        this.bind('loadfinish', function(e) {
            this.$('loader').fadeOut(200);
        });*/
        touch = Galleria.TOUCH;
       
       /*this.bind('thumbnail', function(e) {
        var carouselImagePath="images/circle-grey.png";
            e.thumbTarget.src=carouselImagePath;
            if (! touch ) {
                // fade thumbnails
                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
                    $(this).not('.active').children().stop().fadeTo(100, 1);
                }, function() {
                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
                });

                if ( e.index === this.getIndex() ) {
                    $(e.thumbTarget).css('opacity',1);
                }
            } else {
                var opacityVal = (e.index === this.getIndex()) ? 1 : 0.6;
				$(e.thumbTarget).css('opacity', opacityVal);
				//$(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
            }
        });*/

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }

            this.$('info').toggle( this.hasInfo() );

            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
			
			var infoTargetDiv=".galleria-info-description";
			$(infoTargetDiv, options.widgetRef).css("opacity",0);
		//	$(".more-less-description",options.widgetRef).css("opacity", .5);
        });
        
        this.bind('image', function(e) {

            if (e.imageTarget && e.imageTarget.parentElement) {
                var $imageParent = $(e.imageTarget.parentElement);
                $imageParent.css('opacity', 1);

                if ($imageParent.next().length > 0) {
                    $imageParent.next().css('opacity', 0);
                }
                if ($imageParent.prev().length > 0) {
                    $imageParent.prev().css('opacity', 0);
                }
            }

			//$(".gal-title").html(unescape(e.galleriaData.title));
            $(".gallary-img-caption").html(unescape(e.galleriaData.title));
        	
			var infoTargetDiv=".galleria-info-description";
			var desc = $(e.galleriaData.description).html();//$(infoTargetDiv).find(".gal-fig-description").html()
			//var desc = $(infoTargetDiv).html()
			_.delay(function(){
                options.widgetInstance.trigger(WIDGET_EVENTS.POPULATE_MORE, desc, infoTargetDiv, options.widgetRef);
                $(".more-less-description").removeClass("overflowed-content");
            },500);

        });
              
        this.bind('loadfinish', function(e) {

            if (e.imageTarget && e.imageTarget.parentElement) {
                var $imageParent = $(e.imageTarget.parentElement);
                $imageParent.css('opacity', 1);

                if ($imageParent.next().length > 0) {
                    $imageParent.next().css('opacity', 0);
                }
                if ($imageParent.prev().length > 0) {
                    $imageParent.prev().css('opacity', 0);
                }
            }

            this.$('loader').fadeOut(200);
             //$(".gal-title").html(unescape(e.galleriaData.title));
            // var infoTargetDiv=".galleria-info-description";
	        //options.widgetInstance.trigger(WIDGET_EVENTS.POPULATE_MORE, e.galleriaData.description, infoTargetDiv, options.widgetRef);
        });
        
		$(".galleria-image-nav-left, .galleria-image-nav-right").addClass("icon");
    }
});

}(jQuery));
