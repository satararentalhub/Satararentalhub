// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDkfpl8yE4uRUp8XSPNGethYIKaGOPS1Kk",
  authDomain: "satara-rental-hub.firebaseapp.com",
  projectId: "satara-rental-hub",
  storageBucket: "satara-rental-hub.firebasestorage.app",
  messagingSenderId: "93825020558",
  appId: "1:93825020558:web:f496397bd9941823a34fdf",
  measurementId: "G-T8BEMBL1BM"
};

// Initialize Firebase (ही ओळ अत्यंत महत्त्वाची आहे)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();       
const storage = firebase.storage();    
