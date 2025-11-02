// في ProductList.js

import React, { useState, useEffect } from 'react'; // 1. استيراد useState و useEffect
import CartItem from "./CartItem";

// 2. استيراد ما تحتاجه من Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 3. تهيئة Firebase (يمكنك وضع هذا في ملف منفصل لاحقاً)
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

const ProductList = () => {
  // 4. استخدام useState لإدارة الحالة
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 5. دالة جلب البيانات وتحديثها
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // <-- المهم: Firestore يعطينا الـ ID بشكل منفصل
        ...doc.data(),
      }));
      setAllProducts(productsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // 6. استدعاء الدالة عند تحميل المكون
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className='bg-bgColorWhite dark:bg-DbgColorDark  m-5 text-center font-medium text-xl  max-h-100   overflow-x-auto overflow-y-auto md:absolute md:top-20 md:right-0 md:w-8/12 lg:w-9/12 md:max-h-150  lg:min-h-[90vh] lg:mb-5'>
        <h1 className="m-2 me-50 text-sm md:me-100 lg:me-220 dark:text-foucsColorSky">Total Products ({allProducts ? allProducts.length : ''})</h1>
        <h1>All Product List</h1>
        <table className=' h-full w-full min-h-150'>
          <thead>
            <tr>
              <th className='py-3 px-4'>Products</th>
              <th className='py-3 px-4'>Title</th>
              <th className='py-3 px-7 '>Old_Price</th>
              <th className='py-3 px-7'>New_Price</th>
              <th className='py-3 px-4'>Category</th>
              <th className='py-3 px-4'>Remove</th>
            </tr>
          </thead>
          {loading && !error && <tbody ><tr><th >Loading...</th></tr></tbody>}
          {!loading && error && <tbody><tr><th>Error: {error}</th></tr></tbody>}
          {!loading && allProducts && (
            <tbody>
              {allProducts.map((item) => {
                // 7. تمرير دالة fetchProducts لتحديث القائمة بعد الحذف
                return <CartItem key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} Category={item.category} onProductDeleted={fetchProducts} />
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default ProductList;
