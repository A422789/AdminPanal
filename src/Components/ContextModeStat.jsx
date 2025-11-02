import { createContext } from "react";
import useLocalStorage from './useLocalStorage'




export const ModeContext=createContext(null)

export const ModeContextProvider=({children})=>{
const[mode,setmode]=useLocalStorage('mode','light')
const ModeState=()=>{
  if(mode==='light'){
    setmode('dark')
   }else{
    setmode('light')
   }
   console.log('clicked')
  
}

const ModeContextValue={mode,ModeState}


   
   return(
    <>
     <ModeContext.Provider value={ModeContextValue}>
        {children}
     </ModeContext.Provider>
   
    </>
   )
}
export default ModeContextProvider;
