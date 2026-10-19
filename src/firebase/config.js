import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA_r7Ig4AGPrh6N1PfRqHrODIVNPklpnQ",
  authDomain: "mtaabiz-97f50.firebaseapp.com",
  projectId: "mtaabiz-97f50",
  storageBucket: "mtaabiz-97f50.firebasestorage.app",
  messagingSenderId: "228503411838",
  appId: "1:228503411838:web:537ae5b93f70d5461a4c2f",
  measurementId: "G-30DHRJMTL1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
