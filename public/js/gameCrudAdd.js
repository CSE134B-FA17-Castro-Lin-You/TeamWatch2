/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

var id;
var teamName;


function handleAddGame(){
  var gameType = document.getElementById("gameType").value.trim();
  var them = document.getElementById("addOpponentTeam").value.trim();
  var location = document.getElementById("addLocation").value.trim();
  var datetime = document.getElementById("addDateTime").value;
  var status = document.getElementById("status").value.trim();
  

  firebase.database().ref('/Games/GameId:' + id).set({
      gameType: gameType,
      them: them,
      location: location,
      datetime: datetime,
      status: status,      
  }).then(function onSuccess(res) {
      window.location = "/view-game-schedule.html";
  }).catch(function onError(err) {
        // Handle Error 
      //console.log(err);
  });
    
}

function handleUpdate() {
  "use strict";

  var inputs = document.querySelectorAll('.form-control');

  if (parseInt(id, 10) > 0) {
    firebase.database().ref('/Games/GameId:' + id).update({
      them: inputs[0].value,
      location: inputs[1].value,
      gDate: inputs[2].value,
      gTime: inputs[3].value
    }).then(function (res) {
      window.location = "/view-game-schedule.html";
    });
  } else {
    alert('invalid id');
  }
}

function handleReadGame(){
  var query = firebase.database().ref("Games").orderByKey();
  query.once("value").then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) { // for loop here

      var gameType = childSnapshot.child("gameType").val();
      var them = childSnapshot.child("them").val();
      var location = childSnapshot.child("location").val();
      var datetime = childSnapshot.child("datetime").val();

      var status = childSnapshot.child("status").val();


      var tmpl = document.getElementById('previousGame').content.cloneNode(true);
      tmpl.querySelector('.datetime').innerText = datetime;
      tmpl.querySelector('.gLocation').innerText = location;
      tmpl.querySelector('.matchUp').innerText = "My Team vs " + them;
      tmpl.querySelector('.gameType').innerHTML = gameType + " at " + status;
      document.querySelector('#viewPrevious').appendChild(tmpl); 

      });      
  });

}

document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";
  firebase.database().ref('/Globals').once('value').then(function (snapshot) {
    teamName = snapshot.child('TeamName');
    id = snapshot.child('GameCounter').val();
    firebase.database().ref('/Globals/GameCounter').set(parseInt(id, 10) + 1);
  });
  
  
});










