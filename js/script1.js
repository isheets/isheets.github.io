console.log("js working");

var pink = "#ffb896";
var brown = "#b2a589";
var yellow = "#fff9b1";
var green = "#9ab285";
var blue = "#11929e";
var silver = "#d8d8d8";
var tan = "rgba(196,187,165,1)";
var grey = "#212628";

//this is for resume

var width, height;
//added to remove intial jump when using on load
width = this.innerWidth;
width = (980/width) * 100;
document.getElementById('outline').style.width = width + '%';

window.onresize = window.onload = function flexw() {
	width = this.innerWidth;
	height = this.innerHeight;

	width = (980/width) * 100;

	if(width <= 100) {
		document.getElementById('outline').style.width = width + '%';
	}
	else{
		document.getElementById('outline').style.width = '100%';

	}
}


var border1 = "";
var outline = "";

var x = 0;
var i = 7; //start width, keeps track of cumulative width
while(x < 50) {
	border1 += '0 0 0 ' + i + "px " + pink + " inset, ";
	i += 6 - Math.pow(2, (.15 * x));
	x++;
	border1 += '0 0 0 ' + i + "px " + grey + " inset, ";
	i += 5 + Math.pow(2, (.15 * x));
	x++;
}

x = 0;
var j = 4;
while(x < 100) {
	outline += '0 0 0 ' + j + "px " + grey + ", ";
	j += 9 - Math.pow(2, (.13 * x));
	x++;
	outline += '0 0 0 ' + j + "px " + pink + ", ";
	j += 5 + Math.pow(2, (.15 * x));
	x++;
}

border1 += '0 0 0 ' + 0 + "px " + blue;
outline += '0 0 0 ' + 0 + "px " + blue;

//document.getElementById('outline').style.boxShadow = outline;
document.getElementById('educationbg').style.boxShadow = border1;
document.getElementById('skillsbg').style.boxShadow = border1;
document.getElementById('expbg').style.boxShadow = border1;
document.getElementById('outline').style.boxShadow = outline;
