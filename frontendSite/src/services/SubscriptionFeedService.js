
import axiosApiInstance from './index.js';
const url = 'http://127.0.0.1:8000/main_app/';
export default class SubscriptionFeed {
  

  
  async addFeed(credentials) {
    const response = await axiosApiInstance
    .post(url + 'create_feed/', credentials);

    if(response.status == '200'){ console.log('vamo boquita') }
  }
 
}
