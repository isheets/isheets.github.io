console.log("javascript linked!");

$(document).ready(function() {
	console.log("jquery ready!");

	$('#oddButton').click(function() {
		console.log("odd clicked");
		$("li:even").toggleClass('hidden');
		if ($("li:even").hasClass('hidden')) {
			console.log('hidden');
			$('#oddButton').text("show odd numbers");
		}
		else {
			$('#oddButton').text("hide odd numbers");
		}
	});

	$('#evenButton').click(function() {
		console.log("even clicked");
		$("li:odd").toggleClass('hidden');
		if ($("li:odd").hasClass('hidden')) {
			console.log('hidden');
			$('#evenButton').text("show even numbers");
		}
		else {
			$('#evenButton').text("hide even numbers");
		}
	});

	$('li').click(function() {
		$(this).toggleClass('highlight');
	});

	$('#move').click(function() {
		$('#content').animate({top: "+=20%"}, 1000);
		$('#move').text("drop it LOWER");
	});
});