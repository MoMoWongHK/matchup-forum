import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { isLocalhost } from "../utils/utiltyHelper";

const firebaseConfig = {
  apiKey: "AIzaSyAx65y3vWGrfVsphxr8MTX3MYZUU2XnsHU",
  authDomain: "matchup-forum.firebaseapp.com",
  projectId: "matchup-forum",
  storageBucket: "matchup-forum.appspot.com",
  messagingSenderId: "405463569447",
  appId: "1:405463569447:web:7fe8fb4c2d6a88a11fea02",
  measurementId: "G-Q1LN017EV5",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const functions = getFunctions(firebaseApp);

if (true) {
  connectFirestoreEmulator(db, "localhost", 8002);
  connectAuthEmulator(auth, "http://localhost:9099", {
    disableWarnings: true,
  });
  connectStorageEmulator(storage, "localhost", 9199);
  connectFunctionsEmulator(functions, "localhost", 5001);
}
export default firebaseApp;
