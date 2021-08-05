const axios = require('axios');
const axiosApiInstance = axios.create();
const refresh_url = 'http://127.0.0.1:8000/token/refresh/';
import store from "../store/store.js";


async function refreshAccessToken() {
    var refreshToken = window.localStorage.getItem('refresh_token');
    var resp = await axios
        .post(refresh_url, {'refresh': refreshToken});

    if (!resp.status == 200) {
        Error('Imposible to create new token. Please login again')
    }
    localStorage.setItem('access_token', resp.data.access);
}

async function retryRequestRefreshingAccessToken(request) {
    try {
        await refreshAccessToken();
        var new_token = window.localStorage.getItem('access_token')
        request.headers.Authorization = 'Bearer ' + new_token
        return axiosApiInstance(request);
    } catch (refresh_error) {
        store.commit('setAuthentication', false)
        return Promise.reject(refresh_error)
    }
}

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response

}, async function (error) {
    var originalRequest = error.config;
    if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
        originalRequest._retry = true;
        return retryRequestRefreshingAccessToken(originalRequest)
    } else {
        return Promise.reject(error);
    }
});

export default axiosApiInstance