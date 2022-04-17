import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD6vYa27oCuxgRLnzTUTG2EjBvLcOzX7WY",
  authDomain: "dummy-app-96a38.firebaseapp.com",
  databaseURL: "https://dummy-app-96a38-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dummy-app-96a38",
  storageBucket: "dummy-app-96a38.appspot.com",
  messagingSenderId: "909146252876",
  appId: "1:909146252876:web:4e10e9ccc0083c935936e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export {auth}