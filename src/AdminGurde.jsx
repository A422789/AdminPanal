

import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAiQyYfZNuLTGo8HhcIw3qvAkHpFAPfbLE",
  authDomain: "e-commers-b539d.firebaseapp.com",
  projectId: "e-commers-b539d",
  storageBucket: "e-commers-b539d.appspot.com",
  messagingSenderId: "572649721174",
  appId: "1:572649721174:web:c6c9bf99d16675be3d9af7",
  measurementId: "G-BKRT20Y24E"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const AdminGuard = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
     
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().role === 'admin') {
  
          setIsAdmin(true);
        } else {
  
          setIsAdmin(false);
        }
      } else {
 
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Checking permissions...</h1>
      </div>
    );
  }

  if (isAdmin) {

    return children;
  } else {

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
        <h1 className='text-4xl'>Access Denied: You do not have the required permissions.</h1>
      </div>
    );
  }
};

export default AdminGuard;
