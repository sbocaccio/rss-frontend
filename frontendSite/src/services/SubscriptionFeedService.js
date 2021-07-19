
import axiosApiInstance from './index.js';
const url = 'http://127.0.0.1:8000/main_app/';
export default class SubscriptionFeed {
  

  
  async addFeed(credentials) {

    var token =  window.localStorage.getItem('access_token')
    const config = {
      headers: { Authorization: `Bearer ` + token}
     };
    await axiosApiInstance
    .post(url + 'create_feed/', credentials,
    config
    )
  }
 
}
