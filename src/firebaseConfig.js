// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKL5kKvEKTs4d3JYa46xUSkP6GMbunPHo",
  authDomain: "mochimochi-4865b.firebaseapp.com",
  projectId: "mochimochi-4865b",
  storageBucket: "mochimochi-4865b.appspot.com",
  messagingSenderId: "289967999639",
  appId: "1:289967999639:web:2a032d6ddfc1f0822e77d2",
  measurementId: "G-58BZSR56HE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default getFirestore();