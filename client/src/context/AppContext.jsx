import { createContext, useEffect, useState } from "react";
import { getAllJobs, getAppliedJobs, getProfile } from "../api/api";


export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const [seachFilter,setSearchFilter] = useState({
      title:'',
      location:''
    })
    const [isFiltered,setIsFiltered] = useState(false);
    const [jobs,setJobs] = useState([]);
    const [userLogin,setUserLogin] = useState(false);
    const [appliedJobData,setAppliedJobData] = useState([]);
    const [user,setUser] = useState("")
    const token = localStorage.getItem('token');

    // function to fetch jobs
    const fetchJobs = async ()=>{
      const jobs = await getAllJobs();
      if(jobs.data.allJobs){
        setJobs(jobs.data.allJobs)
      }
    }

    // get profile
    const getProfileInfo = async ()=>{
        try {
          const profileRes = await getProfile();
          setUser(profileRes?.data?.name)
        } catch (error) {
          setUser("")
          return toast.error(error?.response?.data?.message || "Invalid user")
        }
      }
      // get job application info
    const getAppliedJobInfo = async ()=>{
        try {
          const appliedJobRes = await getAppliedJobs();
          setAppliedJobData(appliedJobRes?.data?.appliedJobs || [])  
        } catch (error) {
          setAppliedJobData([])
        }
      }

    useEffect(()=>{
      fetchJobs()
      if(token){
        getProfileInfo()
        getAppliedJobInfo()
      }
    },[])
    const value = {
      seachFilter,setSearchFilter,
      isFiltered,setIsFiltered,
      jobs,setJobs,
      userLogin,setUserLogin,
      appliedJobData,setAppliedJobData,
      user,setUser
    }
    return (
        <>
          <AppContext.Provider value={value}>
            {props.children}
          </AppContext.Provider>
        </>
    )
}