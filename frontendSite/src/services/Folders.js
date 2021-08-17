import AuthService from './AuthService.js';
import axiosApiInstance from './index.js';
import url from '@/settings/settings.js';

export default class Folders {

    async getFolders() {
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var resp = await axiosApiInstance
            .get(url + 'folder',
                config
            )
        return (resp.data);
    }
    async createFolder(name){
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var resp = await axiosApiInstance
            .post(url + 'folder',name,
                config
            )
        return resp;
    }
    async addSubscriptionToFolder(subscription,folderPK){
        var authService = new AuthService()
        var config = authService.headerWithToken()
        var resp = await axiosApiInstance
            .put(url + 'folder/' + folderPK,subscription,
                config
            )
        return resp;
    }
}