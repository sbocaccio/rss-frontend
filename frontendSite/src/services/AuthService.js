import axiosApiInstance from './index.js';
import store from "../store/store.js";

import url from '@/settings/settings.js';

export default class AuthService {

    saveUserData(responseData, username) {
        localStorage.setItem('access_token', responseData.access);
        localStorage.setItem('refresh_token', responseData.refresh);
        store.commit('setUsername', username)

    }

    async login(credentials) {
        const response = await axiosApiInstance
            .post(url + 'login/', credentials);

        if (response.status == '200') {
            this.saveUserData(response.data, credentials.username)

        }
    }

    async signUp(credentials) {
        const response = await axiosApiInstance
            .post(url + 'register/', credentials);

        if (response.status == '200') {
            this.saveUserData(response.data, credentials.username)
        }
    }

    headerWithToken() {
        var token = window.localStorage.getItem('access_token')
        var config = {
            headers: {Authorization: `Bearer ` + token}
        }
        return config
    }
}
