import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBFmRVPgT-SQvHzYqbRWqy5xldLCYQe71g",
  authDomain: "sinapsis-arkon.firebaseapp.com",
  projectId: "sinapsis-arkon",
  storageBucket: "sinapsis-arkon.appspot.com",
  messagingSenderId: "215841677003",
  appId: "1:215841677003:web:6ceaf6891292f06fac854e",
  measurementId: "G-9EW69L96HM"
};

  //INICIAMOS FIREBASE
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db;