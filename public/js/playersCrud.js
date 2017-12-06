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
    
  var fullPath = document.getElementById('imgInp').value;
  if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        fullPath = filename;
  }        

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
      captainCheck: captainCheck,
      profilePic: fullPath
      
  }).then(function onSuccess(res) {
     var fullPath = document.getElementById('imgInp').value;
     var actualFile = null;
     var fileButton = document.getElementById('imgInp');
     actualFile = fileButton.files[0];  
    
      
      if(fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            fullPath = filename;
      } 
      
      var storageRef = firebase.storage().ref('profile-pictures/' + actualFile.name);
      storageRef.put(actualFile).then(function(snapshot){
       window.location = "/teamstats.html";
    });
  })
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function handleRead(){
     var dob = 0;
     var fName = 0; 
     var jersey = 0;
     var lName = 0;    
     var position = 0;
    window.addEventListener('DOMContentLoaded', function () {
        var query = firebase.database().ref('Players');
        query.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot){
            dob = childSnapshot.child("dob").val();
            fName = childSnapshot.child("fName").val();  
            jersey = "Jersey #" + childSnapshot.child("jersey").val();
            lName = childSnapshot.child("lName").val();    
            position = childSnapshot.child("position").val();
            var profilePic = childSnapshot.child("profilePic").val();    
            
            var tmpl = document.getElementById('rosterTemplate').content.cloneNode(true);
            fName = capitalizeFirstLetter(fName);
            lName = capitalizeFirstLetter(lName);
            tmpl.querySelector('.playerName').innerText = fName + " " + lName ;
            tmpl.querySelector('.playerPosition').innerText = position;
            tmpl.querySelector('.playerJersey').innerText = jersey;
            tmpl.querySelector('.playerDOB').innerHTML = dob;
            tmpl.querySelector('#viewPlayerButton').value = jersey;      
            // add it to the view
            var folderRef = firebase.storage().ref().child( "profile-pictures/" );
            var contentRef = folderRef.child(profilePic);

            //Dynamically set the content
            contentRef.getDownloadURL().then(function( url ){
                tmpl.querySelector('#playerPic').src = url;
                document.querySelector('#view').appendChild(tmpl);
            })    
                
           
            });      
        })
    
      });
}

function saveJerseyNum(objButton){
    var fired_button = objButton.value;
    fired_button = fired_button.split('#').pop();        
    localStorage.setItem("jerseyNumber", fired_button);
}

function getJerseyNum(){
    var num = document.querySelector('.viewplayerJersey').innerHTML;
    num = num.split('#').pop();
    localStorage.setItem("jerseyNumber",num);
    
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
            var profilePic = snapshot.child("profilePic").val();
            
            fName = capitalizeFirstLetter(fName);
            lName = capitalizeFirstLetter(lName);
            var tmpl = document.getElementById('viewPlayerTemplate').content.cloneNode(true);
            tmpl.querySelector('.viewplayerName').innerText = fName + " " + lName ;
            tmpl.querySelector('.viewplayerPosition').innerText = position;
            tmpl.querySelector('.viewplayerJersey').innerText = jersey;
            tmpl.querySelector('.viewplayerDOB').innerHTML = dob;
            var folderRef = firebase.storage().ref().child( "profile-pictures/" );
            var contentRef = folderRef.child(profilePic);

            //Dynamically set the content
            contentRef.getDownloadURL().then(function( url ){
                tmpl.querySelector('#playerPicture').src = url;
                document.querySelector('#viewPlayerView').appendChild(tmpl);
            })
            // add it to the view
                      
        });
      });
}

function handleEditPlayer(){
   
    var jNum = localStorage.getItem("jerseyNumber");
    var query = firebase.database().ref('Players/JerseyNumber' +jNum);
    query.once("value").then(function(snapshot) {
            var dob = snapshot.child("dob").val();
            var fName = snapshot.child("fName").val();  
            var jersey = snapshot.child("jersey").val();
            var lName = snapshot.child("lName").val();
            var position = snapshot.child("position").val();
            var email = snapshot.child("email").val();
            var checkBox = snapshot.child("captainCheck").val();
            document.getElementById("editPlayerFName").value = fName;
            document.getElementById("editPlayerLName").value = lName;
            document.getElementById("editPlayerPosition").value = position;
            document.getElementById("editPlayerJersey").value = jersey;
            document.getElementById("editPlayerDOB").value = dob;
            document.getElementById("editPlayerEmail").value = email;
            if(checkBox == true){
                document.getElementById("editCaptainCheck").checked = true;
            }
            else{
                document.getElementById("editCaptainCheck").checked = false;
            }
        });
    
}

function handleSaveEdit() {
  var fName = document.getElementById("editPlayerFName").value.trim();
  var lName = document.getElementById("editPlayerLName").value.trim();
  var email = document.getElementById("editPlayerEmail").value.trim();
  var dob = document.getElementById("editPlayerDOB").value;
  var jersey = document.getElementById("editPlayerJersey").value.trim();  
  var e = document.getElementById("editPlayerPosition");
  var position = e.options[e.selectedIndex].text;
  var captainCheck = document.getElementById("editCaptainCheck").checked;
  var fullPath = document.getElementById('imgInp').value;
  if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        fullPath = filename;
  }    
  if (captainCheck != "on") {
    // toggle some attribute in html
    // TODO form validation & notiy user by modifying hidden HTML elements
  }   
  firebase.database().ref('/Players/' + "JerseyNumber" + jersey).set({
      fName: fName,
      lName: lName,
      email: email,
      dob: dob,
      jersey:jersey,
      position:position,
      captainCheck: captainCheck,
      profilePic: fullPath  
      
  }).then(function onSuccess(res) {
     var fullPath = document.getElementById('imgInp').value;
     var actualFile = null;
     var fileButton = document.getElementById('imgInp');
     actualFile = fileButton.files[0];  
    
      
      if(fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            fullPath = filename;
      } 
      
      var storageRef = firebase.storage().ref('profile-pictures/' + actualFile.name);
      storageRef.put(actualFile).then(function(snapshot){
       window.location = "/teamstats.html";
    });
     
  })
}

function handleSave(){
  handleSaveEdit();    
}

function handleDeletePlayer(){
    var jNum = localStorage.getItem("jerseyNumber");
    firebase.database().ref('Players/JerseyNumber' +jNum).remove();
    window.location = "/teamstats.html";
}

/*ESLint Problems: None */


