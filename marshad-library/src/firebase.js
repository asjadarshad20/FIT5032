// import './styles.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3o4xiLyt01mZ-e6xdjZeHZJwdaolzwQg",
  authDomain: "week-7-mohamed-fit5032-24675.firebaseapp.com",
  projectId: "week-7-mohamed-fit5032-24675",
  storageBucket: "week-7-mohamed-fit5032-24675.appspot.com",
  messagingSenderId: "950390686741",
  appId: "1:950390686741:web:abc2c66c24e0cfc13a7a1c"
};

// Initialize Firebase
initializeApp(firebaseConfig);



const db = getFirestore()

export default db
