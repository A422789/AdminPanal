

import React, { useState } from 'react'; 
import RemoveIcon from '../assets/trash_2312162.png';


import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";


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
const db = getFirestore(app);


const CartItem = ({ id, name, image, new_price, old_price, Category, onProductDeleted }) => {
  const [loading, setLoading] = useState(false); 

  const deleteHandling = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
      
        const productDocRef = doc(db, "products", id);
        
    
        await deleteDoc(productDocRef);
        
        console.log(`Product with ID ${id} deleted successfully.`);
        
       
        if (onProductDeleted) {
          onProductDeleted();
        }

      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <tr style={{ borderBottom: '1px solid #d5d5d5' }}>
  
      <td className='p-4'><img className='h-30' src={image} alt="image" /></td>
      <td className='p-4' style={{ height: '40px' }}>{name}</td>
      <td className='p-4'><del>${old_price}</del></td>
      <td className='p-4'>${new_price}</td>
      <td className='p-4'>{Category}</td>
      <td className='p-4' onClick={deleteHandling}>
        <img 
          src={RemoveIcon} 
          alt="image" 
          style={{ height: '30px', cursor: loading ? 'not-allowed' : 'pointer' }} 
          className='ms-6 dark:text-bgColorWhite hover:cursor-pointer dark:bg-bgColorWhite p-1 dark:rounded'
        />
      </td>
    </tr>
  );
}

export default CartItem;
