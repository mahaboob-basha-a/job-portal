import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import moment from 'moment'
import Footer from './Footer'
import { AppContext } from '../context/AppContext'
import { getAppliedJobs } from '../api/api'
import Loading from './Loading'

const Applications = () => {
    const {user,appliedJobData,setAppliedJobData} = useContext(AppContext);
    const token = localStorage.getItem('token');
    const [loader,setLoader] = useState(true);

    const getAppliedJobsData = async ()=>{
        setLoader(true)
        try {
            const appliedJobRes = await getAppliedJobs();
            setAppliedJobData(appliedJobRes?.data?.appliedJobs || [])
            setLoader(false)  
        } catch (error) {
            setAppliedJobData([])
            setLoader(false)  
        }
    }

    useEffect(()=>{
        setLoader(false)
        if(user && token){
          getAppliedJobsData()
        }
    },[])

  return (
    <>
      <Navbar />
      {loader ? <Loading /> : 
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        {appliedJobData.length > 0 ? (
            <table className='min-w-full bg-white border border-gray-300 rounded-lg'>
            <thead>
                <tr>
                    <th className='py-3 px-4 border-b border-gray-300 text-left'>Company</th>
                    <th className='py-3 px-4 border-b border-gray-300 text-left'>Job Title</th>
                    <th className='py-3 px-4 border-b border-gray-300 text-left max-sm:hidden'>Location</th>
                    <th className='py-3 px-4 border-b border-gray-300 text-left max-sm:hidden'>Date</th>
                    <th className='py-3 px-4 border-b border-gray-300 text-left'>Status</th>
                </tr>
            </thead>
            <tbody>
                {appliedJobData.map((job,index)=>{
                    return (
                        <tr key={index}>
                            <td className='py-3 px-4 flex items-center gap-2 border-b border-gray-300'>
                                <img className='h-8 w-8' src={job.logo} alt="" />
                                {job.company}
                            </td>
                            <td className='py-2 px-4 border-gray-300 border-b'>{job.title}</td>
                            <td className='py-2 px-4 border-gray-300 border-b max-sm:hidden'>{job.location}</td>
                            <td className='py-2 px-4 border-gray-300 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                            <td className='py-2 px-4 border-gray-300 border-b'>
                                <span className='bg-red-100 px-4 py-1.5 rounded'>
                                {job.status}
                                </span>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </table>
        ) : (
            <>
                <p className='text-center'>No jobs applied</p>
            </>
        )}
      </div> }
      <Footer />
    </>
  )
}

export default Applications