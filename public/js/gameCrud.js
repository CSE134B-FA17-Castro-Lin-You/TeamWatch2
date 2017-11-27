/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/
function handleAddGame(){
  var gameType = document.getElementById("gameType").value.trim();
  var oTeam = document.getElementById("addOpponentTeam").value.trim();
  var gLoc = document.getElementById("addLocation").value.trim();
  var gDate = document.getElementById("addDate").value.trim();
  var gTime = document.getElementById("addTime").value;
  var status = document.getElementById("status").value.trim();
  

  firebase.database().ref('/Games/' + gDate + gLoc).set({
      gameType: gameType,
      oTeam: oTeam,
      gLoc: gLoc,
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

function handleCreateGame(){
  window.addEventListener('DOMContentLoaded', function () {
    var query = firebase.database().ref("Games").orderByKey();
    query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) { // for loop here
      // childData will be the actual contents of the child
        //console.log(childSnapshot.val());    
        

        var gameType = childSnapshot.child("gameType").val();
        var oTeam = childSnapshot.child("oTeam").val();
        var gLoc = childSnapshot.child("gLoc").val();
        var gDate = childSnapshot.child("gDate").val();
        var gTime = childSnapshot.child("gTime").val();
        var status = childSnapshot.child("status").val();
        
        
        var tmpl = document.getElementById('previousGame').content.cloneNode(true);
        tmpl.querySelector('.gDate').innerText = gDate + " at " + gTime;
        tmpl.querySelector('.gLocation').innerText = gLoc;
        tmpl.querySelector('.matchUp').innerText = "My Team vs " + oTeam;
        tmpl.querySelector('.gameType').innerHTML = gameType + " at " + status;
        document.querySelector('#viewPrevious').appendChild(tmpl); 
        
        
        
        
/*        var when = 0;
        
        // determining time
        var currentDate = new Date();
        
        if(currentDate.getFullYear() == gDate.substring(0,4)){
          if(currentDate.getMonth == gDate.substring(5,7)){
            // current day
            if(currentDate.getDate == gDate.substring(8,10)){
              when = "1";
            }
            // previous
            else if(currentDate.getDate > gDate.subString(8,10)){
              when = "0";
            }
            // future
            else if(currentDate.getDate < gDate.subString(8,10)){
              when = "2";
            }
          }
          // previous
          else if(currentDate.getMonth > gDate(5,7)){
            when = "0";
          }
          // future
          else if(currentDate.getMonth < gDate(5,7)){
            when = "2";
          }
        }
        // previous
        else if(currentDate.getFullYear() > gDate.substring(0,4)){
          when = "0";
        }
        // future
        else if (currentDate.getFullYear() < gDate.substring(0,4)){
          when = "2";
        }
        
        console.log("when is it? it's " + when);
        
        console.log("date and time = " + datatime);
        
        
        // previous
        if(when == 0){
          var tmpl = document.getElementById('previousGame').content.cloneNode(true);
          tmpl.querySelector('.gDate').innerText = gDate + " at " + gTime;
          tmpl.querySelector('.gLocation').innerText = gLoc;
          tmpl.querySelector('.matchUp').innerText = "My Team vs " + oTeam;
          tmpl.querySelector('.gameType').innerHTML = gameType + " at " + status;
          document.querySelector('#viewPrevious').appendChild(tmpl); 
        }
        
        // current
        else if(when == 1){
          var tmpl = document.getElementById('currentGame').content.cloneNode(true);
          tmpl.querySelector('.gDate').innerText = gDate + " at " + gTime;
          tmpl.querySelector('.gLocation').innerText = gLoc;
          tmpl.querySelector('.matchUp').innerText = "My Team vs " + oTeam;
          tmpl.querySelector('.gameType').innerHTML = gameType + " at " + status;
          document.querySelector('#viewCurrent').appendChild(tmpl); 
        }
        
        // future
        else if(when == 3){
          var tmpl = document.getElementById('upcomingGame').content.cloneNode(true);
          tmpl.querySelector('.gDate').innerText = gDate + " at " + gTime;
          tmpl.querySelector('.gLocation').innerText = gLoc;
          tmpl.querySelector('.matchUp').innerText = "My Team vs " + oTeam;
          tmpl.querySelector('.gameType').innerHTML = gameType + " at " + status;
          document.querySelector('#viewUpcoming').appendChild(tmpl); 
        }
        */
        
        
        });      
    });
  });     
}