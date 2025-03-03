import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

  const titleRef = useRef(null)
  const locationRef = useRef(null)
  const { setSearchFilter, setIsFiltered } = useContext(AppContext)

  const onSearch = () =>{
    if(titleRef.current.value !== '' && locationRef.current.value !== '' ){
      setSearchFilter({
        title:titleRef.current.value,
        location: locationRef.current.value
      });
      setIsFiltered(true);
    }
  }

  return (
    <>
    <div className='container 2xl:px-20 mx-auto my-10'>
       <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-white rounded-xl py-16 text-center mx-2 flex flex-col items-center'>
         <h1 className='text-2xl md:text-3xl lg:text-4xl mb-4 font-medium'>Over 10,000+ jobs to apply</h1>
         <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
         {/* search filter */}
         <div className='flex gap-1 rounded mx-auto items-center justify-around py-1 px-1 bg-white'>
            <div className='flex gap-1 items-center'>
                <img src={assets.search_icon} className='w-4 h-4' alt='search_icon' />
                <input ref={titleRef} className='text-gray-950 text-sm outline-none w-full' placeholder='Search for jobs' />
            </div>
            <p className='text-gray-400 text-2xl font-extralight'>|</p>
            <div className='flex gap-1.5 items-center'>
                <img src={assets.location_icon} className='w-4 h-4' alt='location_icon' />
                <input ref={locationRef} className='text-gray-950 outline-none w-full text-sm' placeholder='Location' />
            </div>
            <button onClick={onSearch} className='cursor-pointer rounded-md px-3 py-2 bg-blue-600 text-sm font-medium'>Search</button>
         </div>
        </div> 
    </div>
    {/* trusted by */}
    <div className='2xl:px-10 xl:mx-10 mx-2 my-10'>
        <div className='border border-gray-300 rounded flex flex-wrap items-center gap-10 p-4 bg-white shadow-lg '>
            <p className='text-sm 2xl:text-md text-gray-400'>Trusted by</p>
            <img src={assets.microsoft_logo} className='lg:w-24 w-18' alt="microsoft_logo" />
            <img src={assets.walmart_logo} className='lg:w-24 w-18' alt="walmart_logo" />
            <img src={assets.accenture_logo} className='lg:w-24 w-18' alt="accenture_logo" />
            <img src={assets.samsung_logo} className='lg:w-24 w-18' alt="accenture_logo" />
            <img src={assets.amazon_logo} className='lg:w-24 w-18' alt="accenture_logo" />
            <img src={assets.adobe_logo} className='lg:w-24 w-18' alt="accenture_logo" />
        </div>
     </div>
  </>
  )
}

export default Hero