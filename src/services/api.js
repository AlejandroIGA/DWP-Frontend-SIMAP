import axios from 'axios';

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false
});

api.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        console.error("Error in interceptor configuration", error)
        Promise.reject(error)
    }
)

export default api;