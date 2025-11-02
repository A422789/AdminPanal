import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import ModeContextProvider from './Components/ContextModeStat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <HashRouter>
    <ModeContextProvider>
    <App />
    </ModeContextProvider>
</HashRouter>
  </StrictMode>,
)
