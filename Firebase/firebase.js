import * as firebase from "firebase";
var Config = {
  apiKey: "AIzaSyDcCN0-e5eRb22_56lFq__cC-81DmKiy58",
    authDomain: "demo3-d4e3f.firebaseapp.com",
    databaseURL: "https://demo3-d4e3f-default-rtdb.firebaseio.com",
    projectId: "demo3-d4e3f",
    storageBucket: "demo3-d4e3f.appspot.com",
    messagingSenderId: "981255504738",
    appId: "1:981255504738:web:f12bc10f898bc5febae23b",
    measurementId: "G-X1B43EP3CJ"
  };
  export default (firebaseConfig =firebase.initializeApp(Config))