/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/
  document.addEventListener("DOMContentLoaded", function (event){
    "use strict";
    var url = new URL(window.location.href),
    id = url.searchParams.get("id");
    //console.log("parse id is " + id);
    if(parseInt(id) > 0){
      //console.log('/Games/GameId:' + id);
      firebase.database().ref('/Games/GameId:' + id).once('value').then(function (snapshot){
        if(!snapshot.exists()){
          alert('No recorded game. id = ' + id);
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

      });
    } else{
      alert('Not a valid game');
      window.location = "/view-game-schedule.html"
    }
  });


function handleDeleteGame(){
    //"use strict";
    var url = new URL(window.location.href),
    id = url.searchParams.get("id");
    //console.log("id = " + id);
    alert("id = " + id);
    firebase.database().ref('/Games/GameId:' + id).remove().then(){
      window.location = "/view-game-schedule.html"
    };
  }