import React, { useContext } from 'react'
import logo from '../assets/logo.png'

import DarkToggle from './DarkToggle'
import { ModeContext } from './ContextModeStat';
const MyNavbar = () => {
   
   const ContextValue=useContext(ModeContext)
  return (
    <div className='bg-bgColorWhite dark:bg-DbgColorDark  h-20 shadow-sm  mb-3 md:mb-0 relative z-1 flex items-center justify-between'>
      <div className=' h-full flex  items-center ml-10 text-3xl font-medium '><img src={logo} alt="image"/>SHOPPER <span className='font-normal text-sm text-red-700 relative top-6 right-32 w'> Admin_Panel</span></div>
      <div className='me-15'><DarkToggle onClick={ContextValue.ModeState}/></div>
      
    </div>
  )
}

export default MyNavbar
