import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from './pages/HomePage'
import POSPage from './pages/POSPage'

export const VITE_BACKEND_URI = import.meta.env.VITE_BACKEND_URI

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/pos' element={<POSPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App

