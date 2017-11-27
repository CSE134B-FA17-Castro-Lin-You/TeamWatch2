/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/
function handleAddPlayer(){
  var gameType;
  var oTeam = document.getElementById("addOpponentTeam").value.trim();
  var gLoc = document.getElementById("addLocation").value.trim();
  var gDate = document.getElementById("addDate").value.trim();
  var gTime = document.getElementById("addTime").value;
  var status;
  
  if(document.getElementById("practice") == "on"){
    gameType = "Practice";
  }
  else{
    gameType = "Match"
  }
  
  if(document.getElementById("home").value.trim() == "on"){
    status = "Home";
  }
  else{
    status = "Away";
  }
  
  

  console.log("gameType is = " + gameType);
  
  if (gameType == "on") {
    // toggle to hide "opponent team" field in html
    // TODO form validation & noty user by modifying hidden HTML elements
  }

  firebase.database().ref('/Games/' + 0).set({
      gameType: gameType,
      oTeam: oTeam,
      gLoc: gLoc,
      gDate: gDate,
      gTime: gTime,
      status: status,      
  }).then(function onSuccess(res) {
      window.location = "/record-match-stats.html";
  }).catch(function onError(err) {
        // Handle Error 
      Console.log(err);
  });
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleCreate(){
  window.addEventListener('DOMContentLoaded', function () {
    var query = firebase.database().ref("Players").orderByKey();
    query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) { // for loop here
      // childData will be the actual contents of the child
        //console.log(childSnapshot.val());    
        
        /*
        let captainCheck = childSnapshot.child("captain").val();
        let dob = childSnapshot.child("dob").val();
        let email = childSnapshot.child("email").val();
        let fName = childSnapshot.child("fName").val();  
        let jersey = "Jersey #" + childSnapshot.child("jersey").val();
        let lName = childSnapshot.child("lName").val();
        let position = childSnapshot.child("position").val();
*/
        oTeam = capitalizeFirstLetter(oTeam);
        var tmpl = document.getElementById('upcomingGame').content.cloneNode(true);
        tmpl.querySelector('.upcomingTime').innerText = gDate + " at " + gTime;
        tmpl.querySelector('.gLocation').innerText = gLocation;
        tmpl.querySelector('.matchUp').innerText = "My Team vs " + oTeam;
        if(gameType == on){
          tmpl.querySelector('.gameType').innerHTML = gameType + " at " + status;
        }
        // add it to the view
        document.querySelector('#view').appendChild(tmpl);    
        });      
    });
  });     
}