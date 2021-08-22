import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyABVjGpSUOtYiTyEKD_dtbf8vssu_Vu0mE",
  authDomain: "ichat-e6c31.firebaseapp.com",
  projectId: "ichat-e6c31",
  storageBucket: "ichat-e6c31.appspot.com",
  messagingSenderId: "980893975279",
  appId: "1:980893975279:web:0c73d03293ebb31a4a511a",
  measurementId: "G-S17MSS7X7F",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
