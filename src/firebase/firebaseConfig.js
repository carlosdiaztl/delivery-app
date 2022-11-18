// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBiuEDSwrWaYOfh0kdbXFMxillqGwGz_M4",
//   authDomain: "ejemplo-clase-3024d.firebaseapp.com",
//   projectId: "ejemplo-clase-3024d",
//   storageBucket: "ejemplo-clase-3024d.appspot.com",
//   messagingSenderId: "301727099643",
//   appId: "1:301727099643:web:88a4e8ceb80c4916f79e5e",
//   measurementId: "G-M1XF97Q22B",
// };
const firebaseConfig = {
  apiKey: "AIzaSyDbHsAUVMcncMYjwYrNI4OTGKN4_0PtP0E",
  authDomain: "crud-completo-a347c.firebaseapp.com",
  projectId: "crud-completo-a347c",
  storageBucket: "crud-completo-a347c.appspot.com",
  messagingSenderId: "519562316437",
  appId: "1:519562316437:web:15d0098ff04fdda32ce99c",
  measurementId: "G-Z557RW81P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const dataBase= getFirestore(app)