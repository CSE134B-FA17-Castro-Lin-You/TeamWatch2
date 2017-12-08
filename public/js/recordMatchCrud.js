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
      status: inputs[3].value,
      them: inputs[4].value,
      stats: {
        us: {
          "0-foul": parseInt(inputs[5].value, 10),
          "1-red-card": parseInt(inputs[7].value, 10),
          "2-yellow-card": parseInt(inputs[9].value, 10),
          "3-shot-on-goal": parseInt(inputs[11].value, 10),
          "4-goal": parseInt(inputs[13].value, 10),
          "5-corner-kick": parseInt(inputs[15].value, 10),
          "6-goal-kick": parseInt(inputs[17].value, 10),
          "7-p-time": inputs[19].value
        },
        them: {
          "0-foul": parseInt(inputs[6].value, 10),
          "1-red-card": parseInt(inputs[8].value, 10),
          "2-yellow-card": parseInt(inputs[10].value, 10),
          "3-shot-on-goal": parseInt(inputs[12].value, 10),
          "4-goal": parseInt(inputs[14].value, 10),
          "5-corner-kick": parseInt(inputs[16].value, 10),
          "6-goal-kick": parseInt(inputs[18].value, 10),
          "7-p-time": inputs[20].value
        }
      }
    }).then(function (res) {
      window.location = "/teamstats.html";
    });
  } else {
    alert('invalid id');
  }
}

function handleAccessRecordMatch(){
     var userId = localStorage.getItem("user");
    if(userId != null){
        var query = firebase.database().ref('Users/' + userId);
        query.once("value").then(function(snapshot) {
                var coach = snapshot.child("coach").val();
                var manager = snapshot.child("manager").val();

                if(coach == true || manager == true){
                    document.getElementById('record-match-id').className = "nav-item active";
                }

            })
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
})



function handleChooseDate(){
  
  var dropdown = document.getElementById("datetimeDropdown");
  var query = firebase.database().ref("Games").orderByKey();

  query.once("value").then(function(snapshot){

  snapshot.forEach(function(childSnapshot){ // looping

    var datetime = childSnapshot.child("datetime").val();
    
    var option = document.createElement("option");
    option.text = datetime;

    dropdown.add(option);
    })
  })
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  /*
  
  alert("calling choose date to populate dropdown");
  var query = firebase.database().ref("Games").orderByKey();
  
  query.once("value").then(function(snapshot){
    
    snapshot.forEach(function(childSnapshot){
      
      var datetime = childSnapshot.child("datetime").val();
      alert("populating " + datetime);
      
      var tmpl = document.getElementById('datetimeTemplate').content.cloneNode(true);
      tmpl.querySelector('.datetimeOption').innerText = datetime;
      document.querySelector('.datetimeList').appendChild(tmpl); // div id
    })
  })*/
}