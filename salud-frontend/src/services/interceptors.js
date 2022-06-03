import axios from "axios";

export function jwtInterceptor() {
  axios.interceptors.request.use(
    (config) => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && user.data && !config.url.endsWith("/users/login")) {
        config.headers["Authorization"] = `Bearer ${user.data.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //we intercept every response
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.message.includes("401") || error.message.includes("403")) {
        console.log("ENTRE");

        window.location = "/error401";
      }
      return Promise.reject(error);
    }
  );
}
export default jwtInterceptor;
