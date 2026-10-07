import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  setDoc,
  query,
  orderBy
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBtYuJKTDShVQDle2sOKVUZaPEAamvhTAg",
  authDomain: "kabusia-hospital-gh.firebaseapp.com",
  projectId: "kabusia-hospital-gh",
  storageBucket: "kabusia-hospital-gh.firebasestorage.app",
  messagingSenderId: "1035388627877",
  appId: "1:1035388627877:web:c3304d51cebadccba2164c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  setDoc,
  query,
  orderBy 
};
