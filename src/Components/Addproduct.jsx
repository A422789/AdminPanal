import React, { useActionState, useEffect, useState } from 'react';
import upload from '../assets/upload.png';
import mark from '../assets/mark.png';


import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


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

const Addproduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formMessage, setFormMessage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null);
  };

 
  async function handlForm(pervState, data) {

    if (!selectedFile) {
      return { success: false, error: "Please upload a product image." };
    }

    try {
     
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'ml_default'); 

      const cloudName = 'djwqb3ibk'; 
      const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    
      const response = await fetch(cloudinaryURL, {
        method: 'POST',
        body: formData,
      } );

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const cloudinaryData = await response.json();
      const imageUrl = cloudinaryData.secure_url; 
      console.log("Image uploaded to Cloudinary:", imageUrl);

      
      const title = data.get('title');
      const price = parseFloat(data.get('price'));
      const offerPrice = parseFloat(data.get('offerPrice'));
      const category = data.get('category');

      if (price <= 0 || offerPrice <= 0) {
        return { success: false, error: "Please enter a valid price." };
      }

 
      const newProduct = {
        name: title,
        category: category,
        image: imageUrl, 
        new_price: offerPrice,
        old_price: price,
      };


      const docRef = await addDoc(collection(db, "products"), newProduct);
      console.log("Product added to Firestore with ID: ", docRef.id);

      return { success: true, message: "Product added successfully!" };

    } catch (err) {
      console.error("Error adding product:", err);
      return { success: false, error: "An error occurred. Please try again." };
    }
  }

  const [state, action, pending] = useActionState(handlForm, {});

  useEffect(() => {
    if (state.message || state.error) {
      setFormMessage(state);
      const timer = setTimeout(() => setFormMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <form action={action} className='bg-bgColorWhite dark:bg-DbgColorDark  m-5  p-4 text-xl  h-1/2 md:h-2/3  md:absolute md:top-20 md:left-80  md:w-1/2 lg:h-[90vh] flex flex-col gap-5'>
  
      <div className='flex flex-col text-textColorGray dark:DtextColorGray '>
        <label htmlFor='title' >Product Title</label>
        <input name='title' id='title' type="text" className=' peer border-solid border-2  pl-2 mt-2 focus:outline-foucsColorSky focus:outline-solid foucs:outline-2 focus:border-foucsColorSky p-2 focus:invalid:border-errorColorRed focus:invalid:text-errorColorRed focus:invalid:outline-errorColorRed ' placeholder='Enter The Product Title' required />
      </div>
      <div className='flex  flex-col lg:flex-row justify-between'>
        <div className='flex flex-col text-textColorGray lg:min-w-11/24 '>
          <label>Price</label>
          <input name='price' type="number" className='peer border-solid border-2  pl-2 mt-2  focus:outline-foucsColorSky focus:outline-solid foucs:outline-2 focus:border-foucsColorSky  p-2 focus:invalid:border-errorColorRed focus:invalid:text-errorColorRed focus:invalid:outline-errorColorRed ' placeholder='Type here' required />
        </div>
        <div className=' flex flex-col text-textColorGray lg:min-w-11/24'>
          <label>Offer Price</label>
          <input name='offerPrice' type="number" className='peer border-solid border-2  pl-2 mt-2  focus:outline-foucsColorSky focus:outline-solid foucs:outline-2 focus:border-foucsColorSky  p-2 focus:invalid:border-errorColorRed focus:invalid:text-errorColorRed focus:invalid:outline-errorColorRed ' placeholder='Type here' required />
        </div>
      </div>
      <div className='flex flex-col text-textColorGray '><label>Product Category</label>
        <select name='category' required className='border-solid border-2  pl-2 mt-2 focus:outline-foucsColorSky p-2 focus:invalid:border-errorColorRed focus:invalid:text-errorColorRed focus:invalid:outline-errorColorRed  dark:bg-DbgColorDark '>
          <option>men</option>
          <option>women</option>
          <option>kid</option>
        </select>
      </div>
      <div className=' mt-4'><label htmlFor='inputImg' className='text-textColorGray'><img src={upload} alt="image" className='cursor-pointer h-15' />Upload</label>{selectedFile && (<span className='ms-3 text-textColorGray '>{selectedFile.name}</span>)}<input name='image' onChange={handleFileChange} id='inputImg' type="file" className='hidden' required /></div>
      <div><button disabled={pending} type='submit' className='border-solid border-1  pl-2 mt-10  p-2  w-40 rounded-xl bg-foucsColorSky dark:bg-DtextColorGray text-textColorWhite hover:cursor-pointer '>ADD</button></div>
      {formMessage && formMessage.success === true && <p className="text-green-500">{formMessage.message}</p>}
      {formMessage && formMessage.success === false && <p className="text-red-500">{formMessage.error}</p>}
    </form>
  );
};

export default Addproduct;
