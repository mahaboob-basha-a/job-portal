import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
    const {seachFilter, setSearchFilter, isFiltered, jobs} = useContext(AppContext)
    
    const [showFilter,setShowFilter] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [selectedCategories,setSelectedCategories] = useState([]);
    const [selectedLocations,setSelectedLocations] = useState([]);

    const [filteredJobs,setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c=> c !== category) : [...prev,category]
        )
    }
    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(l=> l !== location) : [...prev,location]
        )
    }

    useEffect(()=>{

        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category);

        const mathesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location);

        const matchesTitle = job => setSearchFilter.title === "" || job.title.toLowerCase().includes(seachFilter.title.toLowerCase());

        const matchesSearchLocation = job => seachFilter.location === "" || job.location.toLowerCase().includes(seachFilter.location.toLowerCase())

        const newFilteredJobs = jobs.filter(job => {

            return matchesCategory(job) && mathesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        })

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    },[jobs,selectedCategories,selectedLocations,seachFilter])

  return (
    <div className='container 2xl:px-20 px-2 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
        {/* side bar */}
        <div className='w-full lg:w-1/4 bg-white px-4'>
            {/* current search */}
            {(isFiltered && (seachFilter.title !== '' || seachFilter.location !== '')) && 
            <div>
                <h4 className='font-medium text-lg py-2'>Current Search</h4>
                <div className='flex gap-1.5 items-center'>
                   {seachFilter.title && <span className='bg-blue-50 inline-flex px-3 py-1 gap-2 border-blue-200 border rounded'>{seachFilter.title} <img className='w-3 cursor-pointer' onClick={()=>setSearchFilter(prev=>({...prev,title:''}))} src={assets.cross_icon} alt="" /></span> }
                   {seachFilter.location && <span className='bg-red-50 inline-flex px-3 py-1 gap-2 border-red-200 border rounded'>{seachFilter.location} <img className='w-3 cursor-pointer' onClick={()=>setSearchFilter(prev=>({...prev,location:''}))} src={assets.cross_icon} alt="" /></span> }
                   
                </div>
            </div>
            }

            <button onClick={()=>setShowFilter(prev=>!prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>{showFilter ? "Close" : "Filters"}</button>

            {/* search by category */}
            <div className={showFilter ? "" : "max-lg:hidden"}>
                <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
                <ul className='text-gray-600 space-y-4'>
                    {JobCategories.map((category,index)=>{
                      return (<li key={index} className=' flex items-center gap-1.5'>
                            <input onChange={()=>handleCategoryChange(category)} checked={selectedCategories.includes(category)} className='scale-125' type='checkbox' />
                            {category}
                        </li>)
                    })}
                </ul>
            </div>
            {/* search by location */}
            <div className={showFilter ? "" : "max-lg:hidden"}>
                <h4 className='font-medium text-lg py-4 pt-12'>Search by Location</h4>
                <ul className='text-gray-600 space-y-4'>
                    {JobLocations.map((location,index)=>{
                      return (<li key={index} className=' flex items-center gap-1.5'>
                            <input onChange={()=>handleLocationChange(location)} checked={selectedLocations.includes(location)} className='scale-125' type='checkbox' />
                            {location}
                        </li>)
                    })}
                </ul>
            </div>
        </div>
        {/* Job listing */}
        <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
            <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
            <p className='mb-8'>Get your desired job from top companies</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                {filteredJobs.slice((currentPage - 1)*6,currentPage*6).map((job,index)=>{
                    return (
                        <JobCard key={index} job={job} />
                    )
                })}
            </div>
            {/* Pagination */}
            {filteredJobs.length > 0 && (
                <div className='flex items-center justify-center space-x-2 mt-10'>
                <a href='#job-list'><img onClick={()=>setCurrentPage(Math.max(currentPage-1,1))} src={assets.left_arrow_icon} alt="" /></a>
                {Array.from({length:Math.ceil(filteredJobs.length/6)}).map((_,index)=>{
                    return (
                        <a href="#job-list" key={index}>
                            <button onClick={()=>setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-gray-500' : 'text-gray-500'}`}>{index + 1}</button>
                        </a>
                    )
                })}
                <a href='#job-list'><img onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" /></a>
            </div>)}
        </section>
    </div>
  )
}

export default JobListing;