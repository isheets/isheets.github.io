console.log("javascript linked!");
 // Get a reference to the database service
 var database = firebase.database();

// Create a storage reference from our storage service
var storageRef = database.ref("leaderboard");

var q1;
var q2;
var q3;
var q4;
var q5;
var name;
var leaders = [];
var score = 0;

$(document).ready(function() {
  $('#check').click(getAnswers);

    storageRef.on("child_added", function(snapshot){
      console.log(snapshot.val());
      var user = snapshot.val().name;
      var userScore = snapshot.val().score;
      $('#scoreboard').prepend("<p class='scoreItem'>" + user + ": " + userScore + "</p>");
  });

});


function getAnswers() {
  //$('#check').hide();
  score = 0;

  name = $('#name').val();
  console.log(name);

  q1 = $('input[name=q1]:checked').val();
  console.log(q1);
  q2 = $('input[name=q2]:checked').val();
  console.log(q2);
  q3 = $('input[name=q3]:checked').val();
  console.log(q3);
  q4 = $('input[name=q4]:checked').val();
  console.log(q4);
  q5 = $('input[name=q5]:checked').val();
  console.log(q5);

  if (q1 == "true") {
    score += 20;
    $('#quest1').css('background-color', 'rgba(0, 200, 0, .5)');
    $('#a1').slideUp(500);
  }
  else {
    $('#quest1').css('background-color', 'rgba(200, 0, 0, .5)');
    $('#a1').slideDown(500);
  }

  if (q2 == "false") {
    score += 20;
    $('#quest2').css('background-color', 'rgba(0, 200, 0, .5)');
    $('#a2').slideUp(500);
  }
  else {
    $('#quest2').css('background-color', 'rgba(200, 0, 0, .5)');
    $('#a2').slideDown(500);
  }

  if (q3 == "false") {
    score += 20;
    $('#quest3').css('background-color', 'rgba(0, 200, 0, .5)');
    $('#a3').slideUp(500);
  }
  else {
    $('#quest3').css('background-color', 'rgba(200, 0, 0, .5)');
    $('#a3').slideDown(500);
  }

  if (q4 == "true") {
    score += 20;
    $('#quest4').css('background-color', 'rgba(0, 200, 0, .5)');
    $('#a4').slideUp(500);
  }
  else {
    $('#quest4').css('background-color', 'rgba(200, 0, 0, .5)');
    $('#a4').slideDown(500);
  }

  if (q5 == "false") {
    score += 20;
    $('#quest5').css('background-color', 'rgba(0, 200, 0, .5)');
    $('#a5').slideUp(500);
  }
  else {
    $('#quest5').css('background-color', 'rgba(200, 0, 0, .5)');
    $('#a5').slideDown(500);
  }

  $('#score').text("SCORE: " + score);

//push data to firebase
if (name == "") {
  storageRef.push({
    name: "Anonymous",
    score: score
  });
}
else {
    storageRef.push({
    name: name,
    score: score
  });
}
}