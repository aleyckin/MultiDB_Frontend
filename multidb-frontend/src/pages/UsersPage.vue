<template>
    <div class="users-container">
      <h1>Users List</h1>
      
      <!-- Загрузка -->
      <div v-if="isLoading" class="loading">
        <div class="spinner"></div> Loading...
      </div>
      
      <!-- Сообщения об ошибках -->
      <div v-else-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      
      <div v-else>
        <!-- Список пользователей -->
        <div v-if="users.length > 0" class="user-list">
          <div v-for="(user, index) in users" :key="index" class="user-item">
            <div class="user-content">
              <strong>{{ user.login }}</strong>
              <p class="user-id">ID: {{ user.id }}</p>
            </div>
          </div>
        </div>
        <p v-else class="no-data">No users found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import DataService from '../Dataservice';
  import { User } from '../models/User';

  export default {
    data() {
      return {
        users: [],
        isLoading: false,
        errorMessage: ''
      };
    },
    methods: {
      async fetchUsers() {
        this.isLoading = true;
        this.errorMessage = '';
        try {
            const response = await DataService.readAll('/users/', item => new User(item));
            this.users = response;
          if (!Array.isArray(this.users)) {
            throw new Error('Invalid data format.');
          }
        } catch (error) {
          if (error.response) {
            this.errorMessage = error.response.data.message || 'Failed to load users.';
          } else {
            this.errorMessage = error.message || 'An error occurred while fetching users.';
          }
        } finally {
          this.isLoading = false;
        }
      }
    },
    mounted() {
      this.fetchUsers();  // Загружаем пользователей при монтировании компонента
    }
  };
  </script>
  
  <style scoped>
  .users-container {
    max-width: 900px;
    margin: 40px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f4f4f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    color: #4f6d7a;
    margin-bottom: 20px;
  }
  
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #007bff;
  }
  
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-message {
    color: #d9534f;
    text-align: center;
    font-size: 1.1rem;
    margin-top: 20px;
  }
  
  .user-list {
    margin-top: 20px;
  }
  
  .user-item {
    background-color: #ffffff;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .user-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .user-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .user-id {
    font-size: 0.9rem;
    color: #777;
  }
  
  .no-data {
    text-align: center;
    font-size: 1.2rem;
    color: #999;
  }
  
  @media (max-width: 768px) {
    .users-container {
      padding: 15px;
    }
  
    h1 {
      font-size: 1.6rem;
    }
  
    .user-item {
      padding: 10px;
    }
  
    .user-id {
      font-size: 0.8rem;
    }
  }
  </style>
  