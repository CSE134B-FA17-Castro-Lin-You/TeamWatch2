function handleSignUp(){
  var fName = document.getElementById("inputFName").value.trim();
  var lName = document.getElementById("inputLName").value.trim();
  var email = document.getElementById("inputEmail").value.trim();
  var password = document.getElementById("inputPassword").value; 
  var tos = document.getElementById("tosAgree").value;

  if (tos != "on") {
    // toggle some attribute in html
    // TODO form validation & notify user by modifying hidden HTML elements
  }

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user){
      console.log("Welcome " + user.displayName + ": email = " + user.email);
      
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
        console.error(err);
      });
    } else {
      console.log("Goodbye");
    }
  });
}

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
