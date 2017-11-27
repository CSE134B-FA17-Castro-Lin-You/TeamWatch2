function handleAddPlayer(){
  var fName = document.getElementById("addPlayerFName").value.trim();
  var lName = document.getElementById("addPlayerLName").value.trim();
  var email = document.getElementById("addPlayerEmail").value.trim();
  var dob = document.getElementById("addPlayerDOB").value;
  console.log(dob);
  var jersey = document.getElementById("addPlayerJersey").value.trim();  
  var e = document.getElementById("addPlayerPosition");
  var position = e.options[e.selectedIndex].text;
  var captainCheck = document.getElementById("captainCheck").value;

  if (captainCheck != "on") {
    // toggle some attribute in html
    // TODO form validation & noty user by modifying hidden HTML elements
  }

  firebase.database().ref('/Players/' + "JerseyNumber:" + jersey).set({
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
        // Handle Error 
      console.error(err);
  });
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleCreate(){
    window.addEventListener('DOMContentLoaded', function () {
        var query = firebase.database().ref("Players").orderByKey();
        query.once("value")
        .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            // childData will be the actual contents of the child
            console.log(childSnapshot.val());    
            let captainCheck = childSnapshot.child("captain").val();
            let dob = childSnapshot.child("dob").val();
            let email = childSnapshot.child("email").val();
            let fName = childSnapshot.child("fName").val();  
            let jersey = "Jersey #" + childSnapshot.child("jersey").val();
            let lName = childSnapshot.child("lName").val();
            let position = childSnapshot.child("position").val();

            fName = capitalizeFirstLetter(fName);
            lName = capitalizeFirstLetter(lName);
            var tmpl = document.getElementById('rosterTemplate').content.cloneNode(true);
            tmpl.querySelector('.playerName').innerText = fName + " " + lName ;
            tmpl.querySelector('.playerPosition').innerText = position;
            tmpl.querySelector('.playerJersey').innerText = jersey;
            tmpl.querySelector('.playerDOB').innerHTML = dob;
            // add it to the view
            document.querySelector('#view').appendChild(tmpl);    
            });      
    });

      });
   
    
}