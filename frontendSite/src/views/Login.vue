
<template>
    
<div id="app">
  <v-app id="login">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
      >
        <v-card height="300px">
          <v-card-title class="orange white--text">
            <span class="text-h5">Member Login</span>
  
            <v-spacer></v-spacer>
  
              <template v-slot:activator="{ on,attrs }">
                <v-btn
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                > 
               </v-btn>
              </template>
  
        
          </v-card-title>
  
          <v-card-text>
           
      <v-form v-model="isFormValid">
      <v-text-field
        v-model="username"

        label="Username"
        required
        :rules="[rules.required]"


      ></v-text-field>
       <v-text-field type="password"
        v-model="password"
        label="Password"
        required
        :rules="[rules.required]"


      ></v-text-field>        
   
      <v-btn
        class="mr-4"
        @click="login"
        :loading="loading"
        :disabled="!isFormValid"

      >
        Log in
      </v-btn>
        <v-btn to="register/"> Sign up</v-btn>
       

    
     
      </v-form>
          </v-card-text>
               <v-alert
                  v-if="msg"
                  dense
                  outlined
                  type="error"
                >
                  {{msg}}
              </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</div>

</template>

<script>

import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      rules:{
        required: value => !!value || 'Required.',
      },
      username: '',
      password: '',
      msg: '',
      loading: false,
      isFormValid: false,

    };
  },
  methods: {
    handleError(){
         this.msg = 'Unable to login'
    },
    async login() {
      if(!this.loading){
        try{
            this.loading = true
            const credentials = {
              username: this.username,
              password: this.password
            }
            var authService = new AuthService() 
            await (authService.login(credentials));
            
            this.$router.push({ name: 'register'});
          
          }
        catch(error){
            this.handleError();
            
        }
        this.loading = false;
      }
    }
  }
};
</script>