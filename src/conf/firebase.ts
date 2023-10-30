// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5JcGSYSr7YeOpoYbdVdwE526s__DyHtk",
  authDomain: "ama-sn.firebaseapp.com",
  projectId: "ama-sn",
  storageBucket: "ama-sn.appspot.com",
  messagingSenderId: "299560701535",
  appId: "1:299560701535:web:98fc311af8d2deba4d55ea"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// export utils
export const db = getFirestore(app)
export const auth = getAuth(app)

// export collections

export default app