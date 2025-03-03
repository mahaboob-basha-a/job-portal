import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import { toast } from 'react-toastify'
import { logout } from '../api/api.js'

const Navbar = () => {
  const navigate = useNavigate()
  const {user,setUser,setUserLogin} = useContext(AppContext); 
  const [showProfile,setShowProfile] = useState(false); 

  // handle logout
  const handleLogout = async ()=>{
    try {
      const logoutRes = await logout();
      localStorage.removeItem('token')
      setUser("");
      return toast.success(logoutRes?.data?.message);
    } catch (error) {
      return toast.error('LogOut failed');
    }
  }

  return (
    <div className='container w-full shadow py-4'>
      <div className='px-4 2xl:px-20 flex justify-between mx-auto items-center'>
        <img onClick={()=> navigate('/')} src={assets.logo} alt='logo' className='w-48 max-sm:w-28 cursor-pointer' />
        <div className='max-sm:text-xs flex items-center gap-3 lg:gap-8'>
          <NavLink to={'/apllications'}>Applied Jobs</NavLink>
          {!user && <button onClick={()=> setUserLogin(true)} className='px-6 py-2 rounded-full bg-blue-600 text-white font-semibold cursor-pointer'>Register</button> }
          {user && (<div className='relative'>
            <button onClick={()=>setShowProfile(prev=>!prev)} className='w-12  h-12 bg-blue-300 text-xl uppercase rounded-full border border-gray-600 text-neutral-800 cursor-pointer'>{user[0]}</button>
          {showProfile && user && (<div className='absolute py-1 px-4 border right-0 top-14 rounded border-gray-400 bg-gray-100 flex flex-col gap-2'>
            <h2 className='border-b border-gray-400'>Profile :</h2>
            <p className='capitalize text-sm border-b border-gray-400'>{user}</p>
            <button onClick={handleLogout} className='px-3 py-1 rounded-md bg-blue-600 text-white text-sm cursor-pointer'>LogOut</button>
          </div>) }
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default Navbar;