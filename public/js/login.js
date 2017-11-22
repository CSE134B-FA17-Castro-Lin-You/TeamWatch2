function handleLogin(){
  var email = document.getElementById("inputEmail").value.trim();
  var password = document.getElementById("inputPassword").value; 
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
  });
}

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    console.log("Welcome " + user.displayName + ": email = " + user.email);
    window.location = "/view-game-schedule.html";
  } else {
    console.log("Goodbye");
  }
});