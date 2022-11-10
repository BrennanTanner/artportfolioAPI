const firebase = require('firebase');
const firebaseConfig = {
   apiKey: "AIzaSyB50vyAm8Xtj9Bo7dSBMwhb-rz_upZb4bo",
   authDomain: "artportfolio-4701e.firebaseapp.com",
   projectId: "artportfolio-4701e",
   storageBucket: "artportfolio-4701e.appspot.com",
   messagingSenderId: "88367457183",
   appId: "1:88367457183:web:04b910bcdd01624ac293aa",
   measurementId: "G-FFDMLG198S"
 };
 firebase.initializeApp(firebaseConfig);
 const db=firebase.firestore();
 const User=db.collection("Users");
 const Piece=db.collection("Pieces");
 module.exports = User; 
 module.exports = Piece;