import axios from "axios";

const usersApi = axios.create({});

usersApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'Authorization' : sessionStorage.getItem("token")
    }
    return config;
});

export default usersApi;


