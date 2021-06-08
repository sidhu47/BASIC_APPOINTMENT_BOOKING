const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyAk1_wqJ3f0o3iEpm4YfVtDCk6YhBgoI_0",
    authDomain: "basicappointment.firebaseapp.com",
    projectId: "basicappointment",
    storageBucket: "basicappointment.appspot.com",
    databaseURL: "https://basicAppointment.firebaseio.com/",
    messagingSenderId: "99621733117",
    appId: "1:99621733117:web:575186d7bcb57ab5cbb494"
  };
  // Initialize Firebase
  const db = firebase.initializeApp(firebaseConfig);

  module.exports = db;