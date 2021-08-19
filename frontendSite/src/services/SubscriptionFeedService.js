import AuthService from './AuthService.js';
import axiosApiInstance from './index.js';
import {url} from '@/settings/settings.js';

export default class SubscriptionFeed {


    async addFeed(credentials) {

        var authService = new AuthService()
        var config = authService.headerWithToken()
        var response = await axiosApiInstance
            .post(url + 'feed/', credentials,
                config
            )
        return response
    }

    async getFeeds() {
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var resp = await axiosApiInstance
            .get(url + 'feed/',
                config
            )
        return (resp.data);
    }

    async getFolders() {
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var resp = await axiosApiInstance
            .get(url + 'folder',
                config
            )
        return (resp.data);
    }

    async getArticles(subscription_id) {

        var authService = new AuthService()
        var config = authService.headerWithToken()
        var page_url = `${url}subscriptions/${subscription_id}/articles/`
        var resp = await axiosApiInstance
            .get(page_url, config
            )
        return (resp.data);

    }
    async refreshFeed(subscription_id){
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var response = await axiosApiInstance
            .put(`${url}subscriptions/${subscription_id}/`,config
            )
        return response

    }
    async removeFeed(subscription_id){
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var response = await axiosApiInstance
            .delete(`${url}subscriptions/${subscription_id}/`,config

            )
        return response

    }
    async updateReadState(user_article_pk,read){
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var readState= {'read': read}
        var response = await axiosApiInstance
            .put(`${url}articles/${user_article_pk}/`,readState,config)
        return response
    }
}