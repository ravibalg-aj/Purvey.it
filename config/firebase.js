import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWE_rZ6TwOWTXLBrf64dGM-4GB-3ATg34",
  authDomain: "purvey-it-product-images.firebaseapp.com",
  databaseURL: "https://purvey-it-product-images.firebaseio.com",
  projectId: "purvey-it-product-images",
  storageBucket: "purvey-it-product-images.appspot.com",
  messagingSenderId: "177073242590",
  appId: "1:177073242590:web:06c43c8e64f06982db1d4f",
  measurementId: "G-DX31RND0CW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
