import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCMQLAUo5QtSEq21D6b0X3xlGUL6WTXMIs",
  authDomain: "netflix-clone-daaa4.firebaseapp.com",
  projectId: "netflix-clone-daaa4",
  storageBucket: "netflix-clone-daaa4.firebasestorage.app",
  messagingSenderId: "149871041283",
  appId: "1:149871041283:web:b6c344973b63bd421ca736",
  measurementId: "G-E0PP1SQNLH"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
     const res = await createUserWithEmailAndPassword(auth, email, password );
     const user = res.user;
     await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "loal",
        email,
     });
    } catch (error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
       }
    }

    const logout =()=>{
        signOut(auth);
    }

    export {auth, db, login, signup, logout};