console.log("javascript linked!");
 // Get a reference to the database service
 var database = firebase.database();

// Create a storage reference from our storage service
var storageRef = database.ref("sightings");


$(document).ready(function() {
	$('#enter').click(pushData);

    //fetch firebase
    storageRef.on("child_added", function(snapshot){
    	console.log(snapshot.val());
    	var location = snapshot.val().location;
    	var structures = snapshot.val().structures;
    	var description = snapshot.val().description;
    	$('#fireSight').append("<tr class='fireRow'> <th>" + location + "</th> <th>" + structures + "</th> <th>" + description + "</th> </tr>");
    });

    var params = {
    	client_secret: "gOptKQLPYlz34MgvgPb43JTj0bxLBpWVZps7oUer",
    	client_id: "BsfZmhyTBPzUxbIN74fdy",
    	p: "80305",
    	limit: "10",
    	radius: "200mi"
    }

  //url for search
  var url = 'https://api.aerisapi.com/fires/closest?client_id=BsfZmhyTBPzUxbIN74fdy&client_secret=gOptKQLPYlz34MgvgPb43JTj0bxLBpWVZps7oUer&p=boulder,co&filter=critical&radius=200miles&from=-10months&limit=10&';

  //get JSON results
  $.getJSON(url, showFires);

});



function showFires(response) {

	var location;
	var name;
	var perCon;

	for (var i = 0; i < response.response.length; i++) {
		location = response.response[i].place.name;
		name = response.response[i].report.name;
		perCon = response.response[i].report.perContained;
		$('#pastFire').append("<tr class='fireRow'> <th>" + location + "</th> <th>" + name + "</th> <th>" + perCon + "</th> </tr>");

	}
}


function pushData() {
	var name;
	var email;
	var phone;
	var people;
	var structures;
	var description;
	var location;

	people = $("input[name='caught']:checked").val();
	

	structures = $("input[name='trigger']:checked").val();
	

	name = $('#name').val();
	email = $('#email').val();
	phone = $('#phone').val();
	location = $('#location').val();
	description = $('#description').val();

	storageRef.push({
		name: name,
		email: email,
		phone: phone,
		people: people,
		structures: structures,
		location: location,
		description: description
	});
}

