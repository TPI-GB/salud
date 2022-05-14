import { axios } from "axios";

axios.interceptors.request.use(
  (config) => {
    console.log("asdsad");
    const user = JSON.parse(sessionStorage.getItem("user"));

    config.headers["Authorization"] = `Bearer ${user.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)


//we intercept every response
axiosAuth.interceptors.request.use(async function(config){
    
  return config;
}, error => {
//check for authentication or anything like that
  return Promise.reject(error)
});
