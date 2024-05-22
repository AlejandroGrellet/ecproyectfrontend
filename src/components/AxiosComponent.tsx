import axios, { AxiosInstance as AxiosInstanceType } from 'axios';

// const baseUrl = 'http://127.0.0.1:8000/';
const baseUrl = 'https://ecproyect.onrender.com/';
const axiosInstance: AxiosInstanceType = axios.create({
    baseURL: baseUrl,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    }
});

export default axiosInstance;