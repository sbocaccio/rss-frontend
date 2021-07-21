import AuthService from './AuthService.js';
import axiosApiInstance from './index.js';
const url = 'http://127.0.0.1:8000/main_app/';
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
