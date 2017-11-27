/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

document.addEventListener("DOMContentLoaded", function (event) {
  "use strict";
  var url = new URL(window.location.href),
    id = url.searchParams.get("id");
  if (parseInt(id) > 0) {
    firebase.database().ref('/Games/GameId:' + id).once('value').then(function (snapshot) {
      if (!snapshot.exists()) {
        alert('Not a recorded game');
        window.location = "/view-game-schedule.html";
      }

      var datetime = snapshot.child('datetime'),
        location = snapshot.child('location'),
        type = snapshot.child('type'),
        us = snapshot.child('stats').child('us'),
        them = snapshot.child('stats').child('them'),
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
    });
  } else {
    alert('Not a valid game');
    window.location = "/view-game-schedule.html";
  }
});

/*ESLint Problems: None */