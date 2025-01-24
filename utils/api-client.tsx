import axios from "axios";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";


export const apiBaseURL = "http://localhost:8000"
export const imageURL = "https://res.cloudinary.com/dqwr1xunf"


const apiClient = axios.create({
  baseURL: "http://localhost:8000",
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


let isRefreshing:boolean = false;
let failedQueue:any[] = [];

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

    if(error.response.status == 401) 
    {

      const originalRequest = error.config;

      if(!isRefreshing) 
      {

        isRefreshing = true;

        try 
        {

          const refresh_token = localStorage.getItem("refresh_token") || null;

          if(refresh_token)
          {

            const response = await apiClient.post("http://localhost:8000/token/refresh/",{refresh:refresh_token});

            if(response.status == 200) 
            {

              console.log("Access Token refresh successfully!");

              localStorage.setItem("access_token", response?.data?.access);
              localStorage.setItem("refresh_token", response?.data?.refresh);

              setCookie(null,"access_token",response.data?.access,{
                path:"/",
                // httpOnly:false,
                secure:true,
                sameSite:"lax",
                // maxAge:3600
              })
              setCookie(null,"refresh_token",response.data?.refresh,{
                path:"/",
                // httpOnly:false,
                secure:true,
                sameSite:"lax"
                // maxAge:3600
              })

              apiClient.defaults.headers.common["Authorization"] = `Bearer ${response.data?.access}`;

              processQueue(null,response.data?.access);
              
            }

          }
          else
          {
            console.log("refresh token not exist !");
            destroyCookie(null,"access_token",{path:"/"})
            destroyCookie(null,"refresh_token",{path:"/"})
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            window.location.reload()
          }

        } 
        catch (err) 
        {
          processQueue(err,null);
        } 
        finally {
          isRefreshing = false;
        }

      }
      else
      {
        console.log("refresh token invalid !");
        destroyCookie(null,"access_token",{path:"/"})
        destroyCookie(null,"refresh_token",{path:"/"})
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        window.location.reload();
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token:string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject: (err:any) => reject(err),
        });
      });

    }

    return Promise.reject(error);

  }

)



export default apiClient;
