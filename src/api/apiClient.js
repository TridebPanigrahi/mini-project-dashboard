import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

//Request interceptors

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || "hfsjhjashaskjasjhkashdajadsajk";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

//Response interceptors

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => Promise.reject(err)
);

export default apiClient;
