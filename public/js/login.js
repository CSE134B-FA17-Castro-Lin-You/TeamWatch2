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

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    console.log("Welcome " + user.displayName + ": email = " + user.email);
  } else {
    console.log("Goodbye");
  }
});