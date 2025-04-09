// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase , ref , set , get , child } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7DhaluGWVeK680NOdtfM7v6UnHIhKoy8",
  authDomain: "unbm-version1.firebaseapp.com",
  projectId: "unbm-version1",
  storageBucket: "unbm-version1.firebasestorage.app",
  messagingSenderId: "206133162418",
  appId: "1:206133162418:web:8cb7d8a2df9c37821c74ab",
  measurementId: "G-F9M3MR7LHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//get ref to database services
const db = getDatabase(app);

document.getElementById("submit").addEventListener('click' , function(e) {
    set(ref(db, 'user/' + document.getElementById("username").value), 
{

    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    PhoneNumber: document.getElementById("phone").value

});
    alert("Login Successfull")
})