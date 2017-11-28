/*jslint devel: true*/
/*eslint-env browser*/

/*global firebase:true*/
/*eslint no-undef: "error"*/
/*eslint no-unused-vars: ["error", { "vars": "local", "args": "none" }]*/

function handleLogout(){
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      "use strict";
    }, function (error) {
      // An error happened.
      "use strict";
    });

}

/*ESLint Problems: None*/