
import './App.css'
import MyNavbar from './Components/MyNavbar'
import Bar from './Components/Bar'
import { Route, Routes } from 'react-router-dom'
import Addproduct from './Components/Addproduct'
import ProductList from './Components/ProductList'
import { useContext } from 'react'
import { ModeContext } from './Components/ContextModeStat'
import AdminGuard from './AdminGurde'
function App() {
 const ContextValue=useContext(ModeContext)

  return (
    <AdminGuard>
    <div className={`bg-bgColorGray dark:bg-DbgColorGray min-h-screen w-screen pb-3 text-generalText dark:text-DgeneralText ${ContextValue.mode}`}>
    <MyNavbar/>
    <Bar/>
  

    <Routes>
      <Route path='/addproduct' element={<Addproduct/>}/>
      <Route path='/productlist' element={<ProductList/>}/>
       <Route index element={<ProductList/>}/>
    </Routes>
    </div>
    </AdminGuard>
  )
}

export default App
