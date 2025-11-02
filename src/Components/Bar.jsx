import React from 'react'
import { Link } from 'react-router-dom'
import shopping_cart from '../assets/shopping-cart.png'
import files from '../assets/files.png'


const Bar = () => {
  
  return (
    
    <div className='w-screen bg-bgColorWhite  dark:bg-DbgColorGray  flex justify-around items-center h-20 md:flex-col md:w-3/12 lg:w-2/12 md:h-screen md:justify-start md:gap-4 md:shadow-xl md:pt-10 dark:border-r-1 border-DtextColorGray'>
       <div className='w-1.5/3 bg-bgColorGray  dark:bg-DbgColorDark flex items-center text-xl p-3 justify-center  rounded-lg shadow-lg md:w-full md:me-3 md:my-4 md:rounded-none md:shadow '><img className='h-5 me-2' src={shopping_cart} alt="image" /><Link to={'/addproduct'}>AddProduct</Link></div>
      <div className='w-1.5/3 bg-bgColorGray  dark:bg-DbgColorDark flex items-center text-xl p-3 justify-center  rounded-lg shadow-lg  md:w-full md:me-3 md:rounded-none md:shadow'> <img className='h-5 me-2 dark:bg-bgColorWhite rounded' src={files } alt="image" /><Link to={'/productlist'}>ProductList</Link> </div>
    </div>
  )
}

export default Bar
