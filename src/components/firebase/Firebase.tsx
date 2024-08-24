import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAirOMh-yLicJpGugXoHg_kb12A_D6gDlo",
  authDomain: "alertify-app-397b6.firebaseapp.com",
  projectId: "alertify-app-397b6",
  storageBucket: "alertify-app-397b6.appspot.com",
  messagingSenderId: "292125355007",
  appId: "1:292125355007:web:a6270b2431652f00bc55ca"
};

// Initialize Firebase
const appconf = initializeApp(firebaseConfig);
export const image_db= getStorage(appconf);
export const db = getFirestore(appconf);


export default appconf
