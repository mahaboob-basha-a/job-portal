import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './components/ApplyJob'
import Applications from './components/Applications'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import {ToastContainer} from 'react-toastify'

const App = () => {
  const {userLogin} = useContext(AppContext);

  return (
    <div className=''>
      {userLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/apllications' element={<Applications />} />
      </Routes>
      <ToastContainer position="top-right" draggable autoClose={2000} />
    </div>
  )
}

export default App