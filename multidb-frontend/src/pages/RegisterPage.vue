<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="login">Login</label>
          <input
            type="text"
            v-model="registerForm.login"
            id="login"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="registerForm.password"
            id="password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            v-model="registerForm.confirmPassword"
            id="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  import DataService from '../Dataservice';
  
  export default {
    data() {
      return {
        registerForm: {
          login: '',
          password: '',
          confirmPassword: ''
        },
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async registerUser() {
        this.errorMessage = '';
        this.successMessage = '';
  
        if (this.registerForm.password !== this.registerForm.confirmPassword) {
          this.errorMessage = "Passwords do not match.";
          return;
        }
  
        try {
          await DataService.create('/users', {
            login: this.registerForm.login,
            password: this.registerForm.password
          });
  
          this.successMessage = "Registration successful! You can now log in.";
          this.$router.push({ name: 'login' });
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.errorMessage = error.response.data.message || "Invalid registration data.";
          } else {
            this.errorMessage = "An error occurred. Please try again later.";
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
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
  
  .success-message {
    color: green;
  }
  </style>
  