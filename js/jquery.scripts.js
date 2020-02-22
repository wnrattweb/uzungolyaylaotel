$(window).load(function() {
	// Homepage Slider
	
	$('#home-slider').flexslider({
		controlNav: false,
		start: function(slider){
			var src = slider.slides.eq(0).find('img').attr('alt');
			$('.flex-captions p').html(src);
		},
		after: function(slider){
			var src = slider.slides.eq(slider.currentSlide).find('img').attr('alt');
			$('.flex-captions p').html(src);
		}
	});
	
	$('#home-slider .flex-direction-nav, #home-slider .flex-captions').wrapAll('<div class="flex-utils container" />');
	
	$('#room-carousel').flexslider({
		animation: "slide",
		animationLoop: true,
		slideshow: false,
		itemWidth: 223,		
		asNavFor: '#room-gallery'
	});
	
	$('#room-gallery').flexslider({
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		sync: "#room-carousel"
	});	
});

jQuery(document).ready(function ($) {
	
	//Submenu
	$('.nav').superfish({
        animation: {
            opacity: "show",
            height: "show"
        },
        speed: "fast",
        delay: 250
    });    
    	
	//Datepickers
	$('.calendar').datepicker();
	
	// Responsive Menu
    // Create the dropdown base
    $("<select class='alt-nav' />").appendTo("#navigation");

    // Create default option "Go to..."
    $("<option />", {
       "selected": "selected",
       "value"   : "",
       "text"    : "Go to..."
    }).appendTo("#navigation select");

    // Populate dropdown with menu items
    $("#navigation a").each(function() {
     var el = $(this);
     $("<option />", {
         "value"   : el.attr("href"),
         "text"    : el.text()
     }).appendTo("nav select");
    });

    $("#navigation select").change(function() {
      window.location = $(this).find("option:selected").val();
    });
	
	// Weather
    var location = 'GRXX0044'; 
    var unit = 'c';

    var wq = "SELECT * FROM weather.forecast WHERE location='" + location + "' AND u='" + unit + "'";
    var cb = Math.floor((new Date().getTime()) / 1200 / 1000);
    var wu = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(wq) + '&format=json&_nocache=' + cb;

    window['ywcb'] = function(data) {
        var info = data.query.results.channel.item.condition;
        var city = data.query.results.channel.location.city;
        var country = data.query.results.channel.location.country;
        $('#ywloc').html(city + ", " + country);
        $('#ywtem').html(info.temp + '<span>' + '&deg;' + (unit.toUpperCase()) + '</span>');
    };

    $.ajax({
        url: wu,
        dataType: 'jsonp',
        cache: true,
        jsonpCallback: 'ywcb'
    });
    
	// Google Maps code
	if( $('#map').length > 0)
	{
		var firstLocation = new google.maps.LatLng(40.6181036,40.3053018,14.95);
		//center map to first event
		var myOptions = {
			zoom: 18,
			center: firstLocation,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			streetViewControl: false,
			mapTypeControl: false
		};
		var map = new google.maps.Map(document.getElementById("map"), myOptions);
	} //end if( $('.map').length > 0)
	
	//Fancybox
	if( $('.fb').length > 0) {
	$(".fb").fancybox({
		padding 	: 0,
		helpers	: {
			title	: {
				type: 'outside'
			},
			overlay	: {
				opacity : 0.8,
				css : {
					'background-color' : '#000'
				}
			},
			thumbs	: {
				width	: 50,
				height	: 50
			}
		}
	});
	}
	
	//Block hover
	if( $('.block .fb').length > 0) {
	$(".block .fb").hover(
	  function () {
	  	var o = $(this).find('.overlay');
	  	o.fadeIn('fast');
	  },
	  function () {
	    $(this).find('.overlay').fadeOut('fast');
	  });	
	 }
    
});
