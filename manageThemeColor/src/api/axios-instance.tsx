import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VITE_SERVER_URL;
console.log("Current Server URL:", baseURL);

const api = axios.create({
  baseURL : baseURL,
});

//ในส่วนที่อาจจะมีการส่ง token จาก localstorage หลังจาก logib มาแนบไว้กับ header ในส่วนนี้
api.interceptors.request.use((config)=>{
    // const googleAuthen = localStorage.getItem("googleAuthen");
    const authToken = localStorage.getItem("auth-token");

    // const token = googleAuthen ? JSON.parse(googleAuthen).access_token : null;
    if(authToken) config.headers.Authorization = `Bearer ${authToken}`;
    return config;
})
 
export default api;