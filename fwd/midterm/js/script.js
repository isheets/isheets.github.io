console.log("javascript linked!");

var imgNum = 2;

$(document).ready(function() {
	console.log("jquery ready!");
	//slideshow stuff
	setInterval(changeImage, 2500);

	//safety stuff
	$('.safeContent').hide();
	$("#rules").click(function() {
		$('#rulesContent').toggle(500)
		if ($("#rules").text == "+ Rules of the road") {
			$("#rules").text("- Rules of the road");
		}
		else {
			$("#rules").text("+ Rules of the road");
		}
	});
	$( "#equip" ).click(function() {
		$('#equipContent').toggle(500)
	});
	$( "#visible" ).click(function() {
		$('#visibleContent').toggle(500)
	});

	//destination stuff
	$('.content').hide();

	$('#road').click(function() {
		$('.content').hide();
		$('#roadContent').show();
	});
	$('#mtb').click(function() {
		$('.content').hide();
		$('#mtbContent').show();
	});
	$('#cross').click(function() {
		$('.content').hide();
		$('#crossContent').show();
	});
	

});


function changeImage() {
	console.log("changeImage called");
	$("#slideImage").attr("src","images/cycling" + imgNum + ".jpg");
	if(imgNum < 7) {
		imgNum++;
	}
	else {
		imgNum = 1;
	}
	console.log(imgNum);

}