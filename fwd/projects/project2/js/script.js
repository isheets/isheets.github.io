var controller = new ScrollMagic.Controller();
// var width;


var xStart;
var scene2;

//map vars
var latlon;
var address = "Boulder, CO";
var travelMode = "walk";
var map;
var polygonLayer;
var lat;
var lon;
var autocomplete;

//line vars
var winH = $(window).height();
var winW = $(window).width();
var lineLayer1 = SVG('polyLine1');
var line;
var progress = 0;

//global vars for circle bg
var maxDiam = 15;
var circleNum = 1;
var container = $("#head")
var containerWidth = $(window).width();
var containerHeight = $(window).height();
var headH;
var scroll;

$( document ).ready(function() {
	$('#head').css({height: (winH)});
	xStart = $(window).width();
	var yStart = winH*.95;
	var yPos;



	$('#form').css({height: (winH)});


	$("#use").click(function() {
		$("html, body").animate({ scrollTop: ($(document).height()-$(window).height()) }, 1000);
		return false;
	});

	$("#read").click(function() {
		$("html, body").animate({ scrollTop: ($(window).height() + 300) }, 1000);
		return false;
	});

	//insert header scene here

	var headTimeline = new TimelineMax();
	headTimeline
	.to("#title", 5, {left: 200, opacity: 0})
	.to(".tagline", 10, {left: 200, opacity: 0});

	var headscene = new ScrollMagic.Scene({ 
		triggerHook: "onLeave", 
		duration: (winH),
		tweenChanges: false
	})
	.setTween(headTimeline)
	.addTo(controller);

	//******************SCENE 1*********************


	var timeline = new TimelineMax();
	timeline
	.staggerFrom(".badText", 7, {
		cycle: {left: [900, -700 , -800, 600, -900, 1000, -600]}, 
		opacity: 0
	}, 1.2)
	.staggerFromTo(".badText", 9, {
		top: winH
	}, { 
		top: $(window).scrollTop
	},
	.1);




	var scene = new ScrollMagic.Scene({
		triggerElement: "#trigger1", 
		triggerHook: "onLeave", 
		duration: 4400,
		tweenChanges: false
	})
	.setPin('.pin', {pushfollowers: false})
	.setTween(timeline)
	.addTo(controller);


	


	//***************SCENE 2***********************

	
	var timeline2 = new TimelineMax();
	timeline2
	.staggerFrom(".goodText", 4, {
		cycle: {left: [900, -700 , -800, 600, -900, 1000, 900]}, 
		opacity: 0
	}, 1)
	.staggerFromTo(".goodText", 6, {
		top: winH
	}, { 
		top: $(window).scrollTop
	},
	.1);

	scene2 = new ScrollMagic.Scene({
		triggerElement: "#trigger2", 
		triggerHook: "onLeave", 
		duration: 3100,
		tweenChanges: false
	})
	.setPin('#bg2', {pushfollowers: false})
	.setTween(timeline2)
	.addTo(controller);


	//map stuff
	initAutocomplete();

	$('#legend').hide();
	$('#map').hide();

	$('#show').click(geocodeMe);


	//prevent form submit on enter key press
	$('#userInput').on('keyup keypress', function(e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode === 13) { 
			e.preventDefault();
			return false;
		}
	});


	map = L.map('map');
	r360.basemap({ style: 'bright', apikey: 'B80PPKFJNMRVS5L830GU92964375' }).addTo(map);
    // create the layer to add the polygons
    polygonLayer = r360.leafletPolygonLayer().addTo(map);

    $("#transitSelect").change(function(){
    	travelMode = $(this).children("option:selected").val();

    });



    //play circle animation if it's visible
    headH = $('#head').height();
    scroll = $(window).scrollTop();
    setInterval(function() {
    	headH = $('#head').height();
    	scroll = $(window).scrollTop();
    	if (headH > scroll) {
    		generateCircles();
    	}
    }, 300);
    setInterval(removeCircles, 300);


    //get some lines going if they're visible
    newLines();
    scene2.on("progress", function (event) {
    	progress = event.progress;
    	console.log("progress: " + progress);

    	if (progress > .6) {
    		newLines();
    	}
    });

});



//circle bg adapted from: http://jsfiddle.net/hephistocles/b63ja0h3/3/
function removeCircles() {
	$('.circle').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { $(this).remove(); });
}

function generateCircles() {
	headH = $('#head').height();
	scroll = $(window).scrollTop();

	for (var i = 0; i < circleNum; i++) {
		var newCircle = $("<div />")
		var d = Math.floor(Math.random() * maxDiam);

		newCircle.addClass("circle");

		var posL = Math.random() * Math.max(containerWidth - d, 0);
		var posT = Math.random() * Math.max(containerHeight - d, 0)
		var opacity = Math.random();
		newCircle.css({
			width: d,
			height: d,
			left: posL,
			top: posT,
			backgroundColor: getRandomColor(),
			opacity: opacity
		});
		container.append(newCircle);
	}
	
}

//line drawing animation for map

var line1;
var line2;
var line3;
var line4;



function newLines() {
	lineLayer1.clear();
	if (progress < .6) {
		console.log('progress too low, return');
		return;
	}


	line1 = randLine(line1, '1');
	line2 = randLine(line2, '2');
	line3 = randLine(line3, '3');
	line4 = randLine(line4, '4');


	$('.line1').playKeyframe('animate1 6000ms linear 0s 1 normal both');
	$('.line2').playKeyframe('animate2 6000ms linear 0s 1 normal both');
	$('.line3').playKeyframe('animate3 6000ms linear 0s 1 normal both');
	$('.line4').playKeyframe('animate3 6000ms linear 0s 1 normal both');

	$(".line4").bind('oanimationend animationend webkitAnimationEnd', function() { 
		console.log("fin") ;
		line4.remove();
		newLines();
	});



}

function randLine(lineSVG, num) {

	while((x1 = randXInt()) > winW/4);
	while((x2 = randXInt()) < x1);
	while((x3 = randXInt()) < x2);
	var y1 = randYInt();
	var y2 = randYInt();
	var y3 = randYInt();
	var y4 = randYInt();

	line = lineLayer1.size(winW, winH)
	.path()
	.attr({ 
		fill: 'none',
		stroke: getRandomColor(), 
		'stroke-width': 5,
		opacity: 1
	})
	.M(0, y1)
	.L(x1, y1)
	.L(x1, y2)
	.L(x2, y2)
	.L(x2, y3)
	.L(x3, y3)
	.L(x3, y4)
	.L(winW, y4);

	line.addClass("line" + num);
	line.addClass("line");

	var length = line.length();


	if (num < 3) {
		line.attr({'stroke-dasharray': length + 100, 'stroke-dashoffset': -length});

		$.keyframe.define([{
			name: 'animate' +  num,
			'80%': {'stroke-dashoffset': 0, opacity: 1},
			'100%': {'stroke-dashoffset': length, opacity: 0}
		}]);
	}

	else {
		line.attr({'stroke-dasharray': length + 100, 'stroke-dashoffset': length});

		$.keyframe.define([{
			name: 'animate' +  num,
			'80%': {'stroke-dashoffset': 0, opacity: 1},
			'100%': {'stroke-dashoffset': -length, opacity: 0}
		}]);

	}

	return line;
}


function getRandomColor() {
	var colours = ["#00A676", "#00CAE5", "#9B1D20"];
	return colours[Math.floor(Math.random() * 3)]
}

function randXInt() {
	return (winW*Math.random());
}

function randYInt() {
	return (winH*Math.random());
}


//auto complete address
function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
    	$('#address')[0],
    	{types: ['geocode']
    });
}

function geocodeMe() {
	address = $('#address').val();
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode( { 'address': address}, function(results, status) {
		console.log("geocoding");
		if (status == 'OK') {
			console.log('geocode success');
			lat = results[0].geometry.location.lat();
			lon = results[0].geometry.location.lng();
			latlon = [lat, lon];
			console.log(latlon);
			$('#map').slideDown(300, showMap);

            //showMap();
            //	getWeather();

        } else {
        	alert('Geocode was not successful for the following reason: ' + status);
        }
    });

}
var marker;

function showMap() {
	
	if(marker) {
		marker.remove();
	}
	console.log("show map");


	map.setView(latlon, 14);
    // create the marker and add it to the map
    marker = L.marker((latlon)).addTo(map);



    // you need to define some options for the polygon service
    // for more travel options check out the other tutorials
    var travelOptions = r360.travelOptions();
    // please contact us and request your own key if you don't already have one
    travelOptions.setServiceKey('B80PPKFJNMRVS5L830GU92964375');
    // set the service url for your area
    travelOptions.setServiceUrl('https://api.targomo.com/northamerica/');
    // we only have one source which is the marker we just added
    travelOptions.addSource(marker);
    // we want to have polygons for 10 to 30 minutes
    travelOptions.setTravelTimes([600, 1200, 1800]);
    // go by foot
    travelOptions.setTravelType(travelMode);
    travelOptions.setWalkSpeed(6.5);
    polygonLayer.setColors([{
    	'time': 600,
    	'color': '#00A676'
    }, {
    	'time': 1200,
    	'color': '#B1DDF1'
    }, {
    	'time': 1800,
    	'color': '#BF4342'
    }, ]);

    // call the r360°- service
    r360.PolygonService.getTravelTimePolygons(travelOptions, function(polygons){
        // add the returned polygons to the polygon layer
        // and zoom the map to fit the polygons perfectly
        polygonLayer.clearAndAddLayers(polygons, true);
        console.log("poly layer added");
    });

    $('#legend').slideDown(300);
}