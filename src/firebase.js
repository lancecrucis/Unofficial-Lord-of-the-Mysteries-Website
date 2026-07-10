import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDh04kdpWaYAjqWxGPXnQHa1ESaQjEbBc8",
  authDomain: "lotm-2f358.firebaseapp.com",
  projectId: "lotm-2f358",
  storageBucket: "lotm-2f358.firebasestorage.app",
  messagingSenderId: "1043038275421",
  appId: "1:1043038275421:web:a43b2c8ccd4354535ccab4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);