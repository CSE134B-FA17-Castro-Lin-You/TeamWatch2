/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/
function handleAddGame(){
  var gameType = document.getElementById("gameType").value.trim();
  var them = document.getElementById("addOpponentTeam").value.trim();
  var location = document.getElementById("addLocation").value.trim();
  var gDate = document.getElementById("addDate").value.trim();
  var gTime = document.getElementById("addTime").value;
  var status = document.getElementById("status").value.trim();
  

  firebase.database().ref('/Games/' + gDate + location).set({
      gameType: gameType,
      them: them,
      location: location,
      gDate: gDate,
      gTime: gTime,
      status: status,      
  }).then(function onSuccess(res) {
      window.location = "/view-game-schedule.html";
  }).catch(function onError(err) {
        // Handle Error 
      console.log(err);
  });
    
}

function handleReadGame(){
  window.addEventListener('DOMContentLoaded', function () {
    var query = firebase.database().ref("Games").orderByKey();
    query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) { // for loop here
      // childData will be the actual contents of the child
        //console.log(childSnapshot.val());    
        

        var gameType = childSnapshot.child("gameType").val();
        var them = childSnapshot.child("them").val();
        var location = childSnapshot.child("location").val();
        var gDate = childSnapshot.child("gDate").val();
        var gTime = childSnapshot.child("gTime").val();
        var status = childSnapshot.child("status").val();
        
        
        var tmpl = document.getElementById('previousGame').content.cloneNode(true);
        tmpl.querySelector('.gDate').innerText = gDate + " at " + gTime;
        tmpl.querySelector('.gLocation').innerText = location;
        tmpl.querySelector('.matchUp').innerText = "My Team vs " + them;
        tmpl.querySelector('.gameType').innerHTML = gameType + " at " + status;
        document.querySelector('#viewPrevious').appendChild(tmpl); 
        
        });      
    });
  });     
}
