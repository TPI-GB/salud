import axios from "axios";

export function jwtInterceptor() {
  axios.interceptors.request.use(
    (config) => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user.data) {
        config.headers["Authorization"] = `Bearer ${user.data.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //we intercept every response
  axios.interceptors.request.use(
    async function (config) {
      return config;
    },
    (error) => {
      //check for authentication or anything like that
      return Promise.reject(error);
    }
  );
}
export default jwtInterceptor;

// axios.interceptors.request.use((req) => {
//   // `req` is the Axios request config, so you can modify
//   // the `headers`.
//   req.headers.authorization = "my secret token";
//   return req;
// });

// // Automatically sets the authorization header because
// // of the request interceptor
// const res = await axios.get("https://httpbin.org/get");
