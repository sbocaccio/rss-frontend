
import axiosApiInstance from './index.js';
const url = 'http://127.0.0.1:8000/main_app/';
export default class AuthService {
  
  savetokens(responseData){
      localStorage.setItem('access_token', responseData.access);
      localStorage.setItem('refresh_token', responseData.refresh);
  }
  
  async login(credentials) {
    const response = await axiosApiInstance
    .post(url + 'login/', credentials);

    if(response.status == '200'){ this.savetokens(response.data) }
  }
  async signUp(credentials) {
    const response = await axiosApiInstance
    .post(url + 'register/', credentials);
    
    if(response.status == '200'){ this.savetokens(response.data) }
    
  }
 
  headerWithToken(){
    var token =  window.localStorage.getItem('access_token')
    var config = {
      headers: { Authorization: `Bearer ` + token}
     }
    return config
  }

}
