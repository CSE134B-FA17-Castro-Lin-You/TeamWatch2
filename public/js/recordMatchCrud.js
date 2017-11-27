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

document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";
  firebase.database().ref('/Globals').once('value').then(function (snapshot) {
    teamName = snapshot.child('TeamName');
    id = snapshot.child('GameCounter').val();
    document.getElementById('us').innerHTML = teamName.val();
    firebase.database().ref('/Globals/GameCounter').set(parseInt(id, 10) + 1);
  });
});