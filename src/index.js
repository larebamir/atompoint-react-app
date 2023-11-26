// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import App from './App';

const firebaseConfig = {
    apiKey: "something-MSRRgCEqTyU",
    authDomain: "atompoint-bdfe1.firebaseapp.com",
    databaseURL: "https://atompoint-something-default-rtdb.firebaseio.com",
    projectId: "atompoint-something",
    storageBucket: "atompoint-something.appspot.com",
    messagingSenderId: "something",
    appId: "1:something:web:something",
    measurementId: "G-something"
  };
  

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
