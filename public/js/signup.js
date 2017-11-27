/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

function handleSignUp() {
  "use strict";
  var fName = document.getElementById("inputFName").value.trim(),
    lName = document.getElementById("inputLName").value.trim(),
    email = document.getElementById("inputEmail").value.trim(),
    password = document.getElementById("inputPassword").value,
    tos = document.getElementById("tosAgree").checked;

  if (!tos) {
    // toggle some attribute in html
    // TODO form validation & notify user by modifying hidden HTML elements
    alert("Please accept the tos");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    //var errorCode = error.code;
    //var errorMessage = error.message;
  });

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      
      // fetch userID
      firebase.database().ref('/Users/' + user.uid).set({
        fName: fName,
        lName: lName,
        email: email,
        tos: tos
      }).then(function onSuccess(res) {
        window.location = "/view-game-schedule.html";
      }).catch(function onError(err) {
        // Handle Error
      });
    } 
  });
}

firebase.auth().signOut().then(function () {
  // Sign-out successful.
  "use strict";
}, function (error) {
  // An error happened.
  "use strict";
});
