
<template>

  <v-app id="inspire">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
      >
        <v-card height="400px" >
          <v-card-title class="blue white--text">
            <span class="text-h5">Register</span>
  
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
        ref="name"
        v-model="username"
        label="Username"
        required
        :rules="[rules.required]"
      >
       
      
      </v-text-field>
    
     
       <v-text-field 
       type="password"
       v-model="password"
       label="Password"
       :rules="[rules.required,rules.passwordMinSize]"
       required >
     
      </v-text-field>
      <v-text-field type="password"
        v-model="passwordRepeat"
        label="Repeat password"
        required
        :rules="confirmPasswordRules"

      ></v-text-field>                
      <v-text-field
        v-model="email"
        label="E-mail"
        required
        :rules="[rules.required]"
        
      ></v-text-field>
      <v-btn
        class="mr-4"
        @click="signUp" 
        :disabled="!isFormValid"
        :loading="loading"

      >
        Create
      </v-btn>
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
</template>

<script>

import AuthService from '@/services/AuthService.js';
export default {
  data() {

    return {
      rules:{
        required: value => !!value || 'Required.',
        passwordMinSize: value => (value.length > 7) || ' The password must have at least 8 characters.',
      },
      confirmPasswordRules: [
        (value) => !!value || 'type confirm password',
        (value) =>
          value === this.password || 'The password confirmation does not match.',
      ],
      username: null,
      password: '',
      email: '',
      msg: '',
      passwordRepeat: '',
      isFormValid: false,
      loading: false,

    };
  },


  methods: {

    handleError(error){
          if(error.toString().includes('400')){
            this.msg = 'Username already registered';
          }
          else{
            this.msg = 'Unable to create user, try again.';
          }
    },
    async signUp() {
      if(!this.loading){
        this.loading = true
        try{
          const credentials = {
            username:  this.username,
            password:  this.password,
            email:  this.email
          }
          var authService = new AuthService() 
          await (authService.signUp(credentials));
          this.$router.push({ name: 'register'});
    
        }
        catch (error) {
          this.handleError(error)
        }
      this.loading = false
      }
    },
  }
}
</script>