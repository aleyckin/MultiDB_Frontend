<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="login">Login</label>
          <input
            type="text"
            v-model="loginForm.login"
            id="login"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="loginForm.password"
            id="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>

import VueJwtDecode from 'vue-jwt-decode';
  import DataService from '../Dataservice';
  import eventBus from '../eventBus';
  
  export default {
    data() {
      return {
        loginForm: {
          login: '',
          password: ''
        },
        errorMessage: ''
      };
    },
    methods: {
      async loginUser() {
      try {
        const response = await DataService.create('/users/login', this.loginForm);
        console.log(response);

        const token = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', this.loginForm.login);
        console.log("before");
        const decodedToken = VueJwtDecode.decode(token);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        localStorage.setItem('userId', userId);

        eventBus.emit('login');
        this.$router.push({ name: 'users' });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = error.message || 'An error occurred. Please try again later.';
        }
      }
    }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
  }
  
  .form-group {
    margin-bottom: 15px;
    width: 100%;
  }
  
  .error-message {
    color: red;
  }
  </style>