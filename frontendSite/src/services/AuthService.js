import axiosApiInstance from './index.js';
import store from "../store/store.js";

import {basic_url, url} from '@/settings/settings.js';

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

    async checkLoggedIn() {
        var accessToken = window.localStorage.getItem('access_token')

        if (!accessToken) {
            store.commit('setAuthentication', false)
            return false
        }
        try {
            await axiosApiInstance
                .post(basic_url + 'token/verify', {'token': accessToken});
            store.commit('setAuthentication', true)
            await this.setUsername();
        } catch {
            store.commit('setAuthentication', false)
            return false
        }


    }

    async setUsername() {
        var config = this.headerWithToken();
        store.commit('setAuthentication', true)
        const response = await axiosApiInstance
            .get(basic_url + 'user_data/', config);
        store.commit('setUsername', response.data.username)
    }

    headerWithToken() {
        var token = window.localStorage.getItem('access_token')
        var config = {
            headers: {Authorization: `Bearer ` + token}
        }
        return config
    }
}
