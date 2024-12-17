<template>
    <nav v-if="token" class="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div class="container-fluid">
        <router-link to="/home" class="navbar-brand">
          <img src="../assets/logo.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top">
          MultiDB
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/users" class="nav-link">Пользователи</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/allData" class="nav-link">Все данные</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/privateData" class="nav-link">Приватные данные</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Регистрация</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Вход</router-link>
          </li>
        </ul>
        <div class="navbar-text ms-auto">
          <span v-if="user">Пользователь: <strong>{{ user }}</strong></span>
        </div>
        <button v-if="token" @click="logout" class="btn btn-danger">Выйти</button>
      </div>
      </div>
    </nav>
  </template>
  
  <script>
  import eventBus from '../eventBus';
  
  export default {
    data() {
      return {
        token: localStorage.getItem("token"),
        user: ''
      };
    },
    mounted() {
      this.getUserData();
      eventBus.on('login', this.getUserData);
    },
    beforeUnmount() {
      eventBus.off('login', this.getUserData);
    },
    methods: {
      getUserData() {
        this.user = localStorage.getItem("user") || '';
        this.token = localStorage.getItem("token")
      },
      logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        this.token = null;
        this.user = '';
        this.role = '';
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style>
  .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
  }
  
  .nav-link {
      color: black;
      font-weight: bold;
      text-transform: uppercase;
      transition: color 0.3s ease-in-out;
  }
  
  .nav-link:hover {
      color: #dc3545;
  }
  
  .navbar-text {
      font-size: 1rem;
  }
  
  .btn-danger {
      transition: background-color 0.3s ease-in-out;
  }
  
  .btn-danger:hover {
      background-color: #c82333;
  }
  </style>