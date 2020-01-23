//javascript :]
console.log("js linked :)");
var oldColor;
var oldText;
var clicked;
var red = document.getElementById("red");
var blue = document.getElementById("blue");

red.addEventListener("mouseenter", function() {previewColor("red");}, false);
blue.addEventListener("mouseenter", function() {previewColor("blue");}, false);

red.addEventListener("click", function() {selectColor("red");}, false);
blue.addEventListener("click", function() {selectColor("blue");}, false);


function previewColor(whatColor) {
	clicked = false;
	oldColor = document.getElementById('text').style.color;
	document.getElementById('text').style.color=whatColor;
	
	oldText = text.innerHTML;
	var newText="click to keep this color"
	text.innerHTML = newText;

	red.addEventListener("mouseleave", function() {neverMind(oldColor, oldText);}, false);
	blue.addEventListener("mouseleave", function() {neverMind(oldColor, oldText);}, false);

}




function neverMind(oldColor, oldText) {
	if (clicked == false) {
		document.getElementById('text').style.color=oldColor;
		text.innerHTML = oldText;
	}
}

function selectColor(newColor) {
	document.getElementById('text').style.color=newColor;
	var newText="great, now it's " + newColor;
	text.innerHTML = newText;
	clicked = true;
}