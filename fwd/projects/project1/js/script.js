var controller = new ScrollMagic.Controller();
// var width;


var xStart;


$( document ).ready(function() {
	var winH = $(window).height();
	$('#head').css({height: (winH-20)});
	xStart = $(window).width();
	var yStart = winH*.95;
	var yPos;




	//insert header scene here

	var headTimeline = new TimelineMax();
	headTimeline
	.to("#title", 5, {left: 200, opacity: 0})
	.to("#tagline", 10, {left: -200, opacity: 0});

	var headscene = new ScrollMagic.Scene({ 
		triggerHook: "onLeave", 
		duration: (winH-20),
		tweenChanges: false
	})
	.setTween(headTimeline)
	.addTo(controller);

	//******************SCENE 1*********************


	var timeline = new TimelineMax();
	timeline
	.staggerFrom(".badText", 7, {
		cycle: {left: [500, -500]}, 
		opacity: 0
	}, 1.3)
	.staggerFromTo(".badText", 9, {
		top: winH
	}, { 
		top: $(window).scrollTop
	},
	.1);




	var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", 
		triggerHook: "onLeave", 
		duration: 3800,
		tweenChanges: false
	})
	.setPin('.pin', {pushfollowers: false})
	.setTween(timeline)
	.addTo(controller);


	


	//***************SCENE 2***********************

	
	var timeline2 = new TimelineMax();
	timeline2
	.staggerFrom(".goodText", 5, {
		cycle: {left: [500, -500]}, 
		opacity: 0
	}, 1)
	.staggerFromTo(".goodText", 6, {
		top: winH
	}, { 
		top: $(window).scrollTop
	},
	.1);

	var scene2 = new ScrollMagic.Scene({triggerElement: "#trigger2", 
		triggerHook: "onLeave", 
		duration: 3000,
		tweenChanges: false
	})
	.setPin('#bg2', {pushfollowers: false})
	.setTween(timeline2)
	.addTo(controller);



});