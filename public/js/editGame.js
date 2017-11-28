/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

var id;
var teamName;

function handleUpdate(){
  "use strict";
  
  var inputs = document.querySelectorAll('form-control');
  
  if(parseInt(id, 10) > 0){
    firebase.database().ref('/Games/GameId"' + id).update({
      them: inputs[0].value,
      location: inputs[1].value,
      gDate: inputs[2].value,
      gTime: inputs[3].value
    }).then(function(res) {
        window.location="/view-game-schedule.html";
    });
  } else {
    alert('invalid id');
  }
}

function handleDelete() {
  "use strict";
  if (confirm("Are you sure you want to delete this event?")) {
    if (parseInt(id, 10) > 0) {
      firebase.database().ref('/Games/GameId:' + id).set(null).then(function (res) {
        window.location = "/view-game-schedule.html";
      });
    } else {
      alert('invalid id');
    }
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";
  firebase.database().ref('/Globals').once('value').then(function (snapshot) {
    teamName = snapshot.child('TeamName');
  });
  
  var url = new URL(window.location.href);
  id = url.searchParams.get("id");
  if (parseInt(id, 10) > 0) {
    firebase.database().ref('/Games/GameId:' + id).once('value').then(function (snapshot) {
      if (!snapshot.exists()) {
        alert('Not a recorded game');
        window.location = "/view-game-schedule.html";
      }

      var gDate = snapshot.child('gDate'),
      location = snapshot.child('location'),
      gTime = snapshot.child('gTime'),
      // gameType = snapshot.child('gameType'),
      them = snapshot.child('them'),
      // status = snapshot.child('status'),
      inputs = document.querySelectorAll('.form-control');
      

      inputs[0].value = them.val();
      inputs[1].value = location.val();
      inputs[2].value = gDate.val();
      inputs[3].value = gTime.val();
      
      /*
      document.getElementById('them').innerHTML = themName.val();
      document.getElementById('us').innerHTML = teamName.val();*/
    });
  } else {
    alert('Not a valid game');
    window.location = "/view-game-schedule.html";
  }
});

/*ESLint Problems: None */