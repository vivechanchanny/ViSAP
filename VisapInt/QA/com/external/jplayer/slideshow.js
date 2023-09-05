$(document).ready(function(){    
	
	// Tiny Carousel Init      
	$('#slideshow').tinycarousel();

	// Circle Player Init	
	var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1",
	{
		m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
		oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
	}, {
		cssSelectorAncestor: "#cp_container_1",
		volume: 1
	});
});