/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

var id;
var teamName;

function handleUpdate() {
  "use strict";

  var inputs = document.querySelectorAll('.form-control');

  if (parseInt(id, 10) > 0) {
    firebase.database().ref('/Games/GameId:' + id).update({
      datetime: inputs[0].value,
      location: inputs[1].value,
      gameType: inputs[2].value,
      stats: {
        us: {
          "0-foul": parseInt(inputs[3].value, 10),
          "1-red-card": parseInt(inputs[5].value, 10),
          "2-yellow-card": parseInt(inputs[7].value, 10),
          "3-shot-on-goal": parseInt(inputs[9].value, 10),
          "4-goal": parseInt(inputs[11].value, 10),
          "5-corner-kick": parseInt(inputs[13].value, 10),
          "6-goal-kick": parseInt(inputs[15].value, 10),
          "7-p-time": inputs[17].value
        },
        them: {
          "0-foul": parseInt(inputs[4].value, 10),
          "1-red-card": parseInt(inputs[6].value, 10),
          "2-yellow-card": parseInt(inputs[8].value, 10),
          "3-shot-on-goal": parseInt(inputs[10].value, 10),
          "4-goal": parseInt(inputs[12].value, 10),
          "5-corner-kick": parseInt(inputs[14].value, 10),
          "6-goal-kick": parseInt(inputs[16].value, 10),
          "7-p-time": inputs[18].value
        }
      }
    }).then(function (res) {
      window.location = "/teamstats.html";
    });
  } else {
    alert('invalid id');
  }
}

function handleDelete() {
  "use strict";
  if (confirm("Are you sure you want to delete these match stats?")) {
    if (parseInt(id, 10) > 0) {
      firebase.database().ref('/Games/GameId:' + id).set(null).then(function (res) {
        window.location = "/teamstats.html";
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

      var datetime = snapshot.child('datetime'),
        location = snapshot.child('location'),
        type = snapshot.child('gameType'),
        us = snapshot.child('stats').child('us'),
        them = snapshot.child('stats').child('them'),
        themName = snapshot.child('them'),
        usCtr = 3,
        themCtr = 4,
        inputs = document.querySelectorAll('.form-control');

      inputs[0].value = datetime.val();
      inputs[1].value = location.val();
      inputs[2].value = type.val();
      
      us.forEach(function (childSnapshot) {
        inputs[usCtr].value = childSnapshot.val();
        usCtr += 2;
      });
      
      them.forEach(function (childSnapshot) {
        inputs[themCtr].value = childSnapshot.val();
        themCtr += 2;
      });
      
      document.getElementById('them').innerHTML = themName.val();
      document.getElementById('us').innerHTML = teamName.val();
    });
  } else {
    alert('Not a valid game');
    window.location = "/view-game-schedule.html";
  }
});

/*ESLint Problems: None */