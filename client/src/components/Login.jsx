import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import {toast} from 'react-toastify'
import { getProfile, login, signUp } from '../api/api';

const Login = () => {
    const {setUser,setUserLogin} = useContext(AppContext);
    const [state,setState] = useState('Login');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');

    const onSubmitHandler =async e =>{
        e.preventDefault();
        if(state === 'Login'){
            try {
                if(email && password.length > 5){
                    const loginRes = await login({email,password});
                    toast.success(loginRes.data.message);
                    localStorage.setItem('token',loginRes.data.token);
                    const userInfo = await getProfile()
                    setUser(userInfo?.data?.name || "")
                    setUserLogin(false)
                    setName("");
                    setEmail("");
                    setPassword("");
                }else{
                    setUserLogin(true);
                    return toast.error('All fields required');
                }
            } catch (error) {
                setUserLogin(true)
                return toast.error(error?.response?.data?.message || "User not found");
            }
        }else{
            try {
                if(name && email && password.length > 5){
                    const signUpRes = await signUp({name,email,password});
                    toast.success(signUpRes.data.message);
                    setState('Login')
                    setUserLogin(true)
                }else{
                    setUserLogin(true)
                    return toast.error('All fields required');
                }
            } catch (error) {
                setUserLogin(true)
                return toast.error(error?.response?.data?.message || 'User already exists');
            }

        }
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden'
       return ()=>{
        document.body.style.overflow = 'unset'
       }
    },[])

  return (
    <div className='absolute top-0 left-0 ring-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center w-full'>
        <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>User {state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue </p>
            <>
                {state !== 'Login' && (
                    <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.person_icon} alt="" />
                    <input className='outline-none text-sm' type="text" value={name} onChange={e=>setName(e.target.value)} placeholder='Name' required />
                </div>
                )}
                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" />
                    <input className='outline-none text-sm' type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder='youremail@gmail.com' required />
                </div>
                <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" />
                    <input className='outline-none text-sm' type="text" value={password} onChange={e=>setPassword(e.target.value)} placeholder='.......' required />
                </div>
                <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
            </>
            <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer'>
                {state === 'Login' ? 'Login' : 'create account'}
            </button>
            {state === 'Login' ? (<p className='mt-4 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState('Sign Up')}>Sign Up</span></p>) : (<p className='mt-4 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState('Login')}>Login</span></p>)}
            <img onClick={()=>setUserLogin(false)} src={assets.cross_icon} className='absolute top-5 right-5 w-4 h-4 cursor-pointer' alt="" />
        </form>
    </div>
  )
}

export default Login