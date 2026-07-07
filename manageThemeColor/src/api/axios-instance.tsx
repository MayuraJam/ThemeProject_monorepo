import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VITE_SERVER_URL;
console.log("Current Server URL:", baseURL);

const api = axios.create({
  baseURL : baseURL,
});

//ในส่วนที่อาจจะมีการส่ง token จาก localstorage หลังจาก logib มาแนบไว้กับ header ในส่วนนี้
api.interceptors.request.use((config)=>{
    const googleAuthen = localStorage.getItem("googleAuthen");
    const token = googleAuthen ? JSON.parse(googleAuthen).access_token : null;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})
 
export default api;