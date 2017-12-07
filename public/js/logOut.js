/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

function handleLogout(){
   firebase.auth().signOut().then(function () {
      // Sign-out successful.
        window.location = "/login.html";
      "use strict";
    }, function (error) {
      // An error happened.
      "use strict";
       window.location = "/login.html";
    });

}

/*ESLint Problems: None*/