import axios from "axios";
import { destroyCookie } from "nookies";


const apiClient = axios.create({
  baseURL: "http://localhost:8000/",
  // headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`},
  // withCredentials:true // Accès au cookie généré par le serveur (accessToken)
});


// Intercepteur pour ajouter le token aux requêtes
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token") || null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);


let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error:any,token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


apiClient.interceptors.response.use(
  async (response) => response,
  async (error) => {

    if(error.response.status === 401) 
    {

      const originalRequest = error.config;

      if(!isRefreshing) 
      {
        isRefreshing = true;

        try 
        {
          const refresh_token = localStorage.getItem("refresh_token");
          const response = await apiClient.post("http://localhost:8000/token/refresh/",{refresh:refresh_token});
          if (response.status === 200) {
            console.log("Access Token refreshed successfully!");
            localStorage.setItem("access_token", response?.data?.access);
            localStorage.setItem("refresh_token", response?.data?.refresh);
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
            processQueue(null,response.data.access);
          }
        } 
        catch (err) 
        {
          console.error("Token refresh failed:", err);
          processQueue(err, null);
          destroyCookie(null,"access_token")
          destroyCookie(null,"refresh_token")
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          // const response = await apiClient.post("http://localhost:8000/api/logout");
          // console.log(response)
          // window.location.href = "/login";
        } 
        finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token:any) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject: (err:any) => reject(err),
        });
      });
    }

    return Promise.reject(error);
  }
);



export default apiClient;
