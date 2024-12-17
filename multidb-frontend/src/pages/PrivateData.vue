<template>
  <div class="user-data-container">
    <h1>User Data</h1>
    
    <!-- Загрузка -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div> Loading...
    </div>
    
    <!-- Сообщения об ошибках -->
    <div v-else-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div v-else>
      <!-- Список данных -->
      <div v-if="userData.length > 0" class="data-list">
        <div v-for="(data, index) in userData" :key="index" class="data-item">
          <div class="data-content">
            <strong>{{ data.description }}</strong>
            <p class="data-date">{{ formatDate(data.createdDate) }}</p>
          </div>
        </div>
      </div>
      <p v-else class="no-data">No data found for this user.</p>
    </div>
  </div>
</template>

  
<script>
import DataService from '../Dataservice';
import { Data } from '../models/Data';

export default {
  data() {
    return {
      userId: localStorage.getItem('userId'),
      userData: [],
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    async fetchUserData() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await DataService.readAll(`/keymappings/${this.userId}`, item => new Data(item));
        this.userData = response;
        if (!Array.isArray(this.userData)) {
          throw new Error('Invalid data format.');
        }
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message || 'Failed to load user data.';
        } else {
          this.errorMessage = error.message || 'An error occurred while fetching user data.';
        }
      } finally {
        this.isLoading = false;
      }
    },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
  },
  mounted() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.fetchUserData();
    } else {
      this.errorMessage = 'User ID is missing.';
    }
  }
};
</script>
  
<style scoped>
.user-data-container {
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

.data-list {
  margin-top: 20px;
}

.data-item {
  background-color: #ffffff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.data-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.data-date {
  font-size: 0.9rem;
  color: #777;
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}

@media (max-width: 768px) {
  .user-data-container {
    padding: 15px;
  }

  h1 {
    font-size: 1.6rem;
  }

  .data-item {
    padding: 10px;
  }

  .data-date {
    font-size: 0.8rem;
  }
}
</style>