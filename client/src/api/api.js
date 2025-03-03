import axios from 'axios';

// Backend API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// USER AUTHENTICATION API CALLS

// User Signup
export const signUp = async (userData) => {
    return await api.post('/user/sign-up', userData);
};

// User Login
export const login = async (userData) => {
    return await api.post('/user/login', userData);
};

// User Logout
export const logout = async () => {
        return await api.post(`/user/logout`);
};

// Get User Profile
export const getProfile = async () => {
    return await api.get('/user/profile');
};

// JOBS API CALLS

// Get All Jobs
export const getAllJobs = async () => {
    return await api.get('/jobs/all-jobs');
};

// Apply for a Job
export const applyForJob = async (jobData) => {
    return await api.post('/jobs/apply-for-jobs', jobData);
};

// Get Applied Jobs by User
export const getAppliedJobs = async (userId) => {
    return await api.get(`/jobs/applied-jobs`);
};

