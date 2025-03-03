import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import Navbar from './Navbar';
import { assets } from '../assets/assets';
import kConvert from 'k-convert';
import moment from 'moment';
import JobCard from './JobCard';
import Footer from './Footer';
import { toast } from 'react-toastify';
import { applyForJob } from '../api/api';

const ApplyJob = () => {
    const {user,jobs,appliedJobData,setAppliedJobData,setUserLogin} = useContext(AppContext);
    const { id } = useParams();
    const [jobData,setJobData] = useState(null);
    const [applied,setApplied] = useState(false)
    const token = localStorage.getItem('token')
    
    const fetchJobData = (id) =>{
        const data = jobs.filter(job=>{
            return job._id === id;
        })
        if(data.length !== 0){
            setJobData(data[0])
            const checkAppliedStatus = appliedJobData.some(item=>{
                return item.companyId === data[0]._id;
            })
            setApplied(checkAppliedStatus)
        }
    }
    const handleApplyNow = async () => {
        if(jobData){
            const appliedObj = {
                companyId : jobData._id,
                company: jobData.companyId.name,
                title: jobData.title,
                location: jobData.location,
                date: new Date(),
                status: 'pending',
                logo: jobData.companyId.image,
            }

            try {
                await applyForJob(appliedObj)
                toast.success('Job applied success')
                setAppliedJobData(prev=>[...prev,appliedObj])
                
            } catch (error) {
               console.log(error.response.data.message)
               return toast.error('Applying job failed')
            }

            // console.log(appliedObj)
        }
    }

    useEffect(()=>{
        const jobDetails = ()=>{
            if(jobs.length > 0){
                fetchJobData(id)
            }
        }
        jobDetails()
    },[jobs,id,appliedJobData])
    if(!token || !user){
        return <Navigate replace={'/'}  />
    }

  return (
    jobData ? <>
        <Navbar />
        <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
            <div className='bg-white text-black rounded-lg w-full'>
                <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl'>
                    <div className='flex flex-col md:flex-row items-center'>
                        <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={jobData.companyId.image} alt="" />
                        <div className='text-center md:text-left text-neutral-700'>
                            <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>
                            <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-green-600 mt-2'>
                                <span className='flex items-center gap-1'>
                                 <img src={assets.suitcase_icon} alt="" />
                                 {jobData.companyId.name}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.location_icon} alt="" />
                                    {jobData.location}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.person_icon} alt="" />
                                    {jobData.level}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <img src={assets.money_icon} alt="" />
                                CTC: {kConvert.convertTo(jobData.salary)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
                    <button disabled={applied} onClick={handleApplyNow} className={`cursor-pointer ${applied ? 'bg-gray-400' : 'bg-blue-600'} p-2.5 px-10 text-white rounded`}>{applied ? 'Applied' : 'Apply Now'}</button>
                        <p className='mt-1 text-gray-600'>Posted {moment(jobData.date).fromNow()}</p>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between items-start'>
                    <div className='w-full lg:w-2/3'>
                       <h2 className='font-bold text-2xl mb-4'>Job description</h2>
                       <div className='rich-text' dangerouslySetInnerHTML={{__html:jobData.description}}></div>
                    {!applied && <button onClick={handleApplyNow} className='cursor-pointer bg-blue-600 p-2.5 px-10 text-white rounded'>Apply Now</button>} 
                    </div>
                    {/* Right more jobs section */}
                    <div className='w-full lg:w-1/3 mt-8 lg:ml-8 space-y-5'>
                        <h2>More jobs from {jobData.companyId.name}</h2>
                        {jobs.filter(job=>job._id !== id && job.companyId._id === jobData.companyId._id).slice(0,4).map((job,index)=> <JobCard key={index} job={job} />)}
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </> :
    <Loading />
  )
}

export default ApplyJob