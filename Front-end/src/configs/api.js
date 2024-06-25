import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";
import { getNewToken } from "../services/tokens";


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((request) => {
    const accessToken = getCookie("accessToken");
    if(accessToken) {
        request.headers["Authorization"] = `bearer ${accessToken}`
    }
    return request
}, (error) =>{
    return Promise.reject(error)
})

api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    console.log("hallo")
  const originalRequest = error.config;
  if(error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const res = await getNewToken()
    console.log(res)
    if(!res?.response) return;
    console.log(res)
    
    setCookie(res.response.data)
    return api(originalRequest)
  }
})

export default api