import axiosApiInstance from './index.js';

import url from '@/settings/settings.js';
export default class AuthService {

    savetokens(responseData) {
        localStorage.setItem('access_token', responseData.access);
        localStorage.setItem('refresh_token', responseData.refresh);
    }

    async login(credentials) {
        const response = await axiosApiInstance
            .post(url + 'login/', credentials);

        if (response.status == '200') {
            this.savetokens(response.data)
            localStorage.setItem('username', credentials.username);
        }
    }

    async signUp(credentials) {
        const response = await axiosApiInstance
            .post(url + 'register/', credentials);

        if (response.status == '200') {
            this.savetokens(response.data)
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
