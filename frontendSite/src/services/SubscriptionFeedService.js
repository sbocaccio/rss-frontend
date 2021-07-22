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
   
async getFeeds() {
  var authService = new AuthService()
  var config = authService.headerWithToken()
  var resp = await axiosApiInstance
  .get(url + 'feed/', 
  config
  )
  return (resp.data);
}
async getArticles(subscription_id){
  var authService = new AuthService()
  var config = authService.headerWithToken()
  var page_url = url + 'subscriptions/'+ subscription_id.toString() + '/'+ 'articles/'
  var resp = await axiosApiInstance
  .get(page_url, config
  )
  console.log(resp)
  return (resp.data);

}

}
