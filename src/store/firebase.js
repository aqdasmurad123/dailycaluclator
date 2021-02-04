import firebase from 'firebase/app' 
import 'firebase/firestore'
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
var firebaseConfig = {
  apiKey: "AIzaSyBkpiuGnWds942-Jm0147at3pXT8A9G03s",
  authDomain: "dcal-e8cf3.firebaseapp.com",
  projectId: "dcal-e8cf3",
  storageBucket: "dcal-e8cf3.appspot.com",
  messagingSenderId: "85354192740",
  appId: "1:85354192740:web:7848f557e3f60e55b96471",
  measurementId: "G-9411RBHZ0Z"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
//   firebase.analytics();
export default firebase