/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*global jerseyToDelete*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

function handleAddPlayer() {
  var fName = document.getElementById("addPlayerFName").value.trim();
  var lName = document.getElementById("addPlayerLName").value.trim();
  var email = document.getElementById("addPlayerEmail").value.trim();
  var dob = document.getElementById("addPlayerDOB").value;
  var jersey = document.getElementById("addPlayerJersey").value.trim();  
  var e = document.getElementById("addPlayerPosition");
  var position = e.options[e.selectedIndex].text;
  var captainCheck = document.getElementById("captainCheck").value;

  if (captainCheck != "on") {
    // toggle some attribute in html
    // TODO form validation & noty user by modifying hidden HTML elements
  }

  firebase.database().ref('/Players/' + "JerseyNumber" + jersey).set({
      fName: fName,
      lName: lName,
      email: email,
      dob: dob,
      jersey:jersey,
      position:position,
      captainCheck: captainCheck
      
  }).then(function onSuccess(res) {
      window.location = "/teamstats.html";
  }).catch(function onError(err) {  
  });
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleRead(){
    window.addEventListener('DOMContentLoaded', function () {
        var query = firebase.database().ref("Players").orderByKey();
        query.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot){
            var dob = childSnapshot.child("dob").val();
            var fName = childSnapshot.child("fName").val();  
            var jersey = "Jersey #" + childSnapshot.child("jersey").val();
            var lName = childSnapshot.child("lName").val();
            var position = childSnapshot.child("position").val();

            fName = capitalizeFirstLetter(fName);
            lName = capitalizeFirstLetter(lName);
            var tmpl = document.getElementById('rosterTemplate').content.cloneNode(true);
            tmpl.querySelector('.playerName').innerText = fName + " " + lName ;
            tmpl.querySelector('.playerPosition').innerText = position;
            tmpl.querySelector('.playerJersey').innerText = jersey;
            tmpl.querySelector('.playerDOB').innerHTML = dob;
            tmpl.querySelector('#viewPlayerButton').value = jersey;
            // add it to the view
            document.querySelector('#view').appendChild(tmpl);    
            });      
        });
      });
}

function saveJerseyNum(objButton){
    var fired_button = objButton.value;
    fired_button = fired_button.split('#').pop();        
    localStorage.setItem("jerseyNumber", fired_button);
}

function handleReadForViewPlayer(){
    var jNum = localStorage.getItem("jerseyNumber");
    window.addEventListener('DOMContentLoaded', function () {
        var query = firebase.database().ref('Players/JerseyNumber' +jNum);
        query.once("value").then(function(snapshot) {
            var dob = snapshot.child("dob").val();
            var fName = snapshot.child("fName").val();  
            var jersey = "Jersey #" + snapshot.child("jersey").val();
            var lName = snapshot.child("lName").val();
            var position = snapshot.child("position").val();

            fName = capitalizeFirstLetter(fName);
            lName = capitalizeFirstLetter(lName);
            var tmpl = document.getElementById('viewPlayerTemplate').content.cloneNode(true);
            tmpl.querySelector('.viewplayerName').innerText = fName + " " + lName ;
            tmpl.querySelector('.viewplayerPosition').innerText = position;
            tmpl.querySelector('.viewplayerJersey').innerText = jersey;
            tmpl.querySelector('.viewplayerDOB').innerHTML = dob;
            // add it to the view
            document.querySelector('#viewPlayerView').appendChild(tmpl);          
        });
      });
}