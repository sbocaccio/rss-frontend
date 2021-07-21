import AuthService from './AuthService.js';
import axiosApiInstance from './index.js';
import url from '@/settings/settings.js';
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
   
async getFeed() {
  var authService = new AuthService()
  var config = authService.headerWithToken()
  var resp = await axiosApiInstance
  .get(url + 'feed/', 
  config
  )
  return (resp.data);
}

}
