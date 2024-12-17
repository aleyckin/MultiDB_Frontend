<template>
  <div class="data-container">
    <h1>All Data</h1>
    
    <!-- Loading and Error Messages -->
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    
    <div v-else>
      <!-- Add New Data Form -->
      <form @submit.prevent="addData" class="form">
        <label for="description">Description:</label>
        <input type="text" v-model="newDataDescription" placeholder="Enter description..." required />
        <button type="submit" class="btn-submit">Add Data</button>
      </form>

      <!-- Data List -->
      <ul v-if="dataList.length" class="data-list">
        <li v-for="(data, index) in dataList" :key="index" class="data-item">
          <div class="data-content">
            <p><strong>User ID:</strong> {{ data.userId }}</p>
            <p><strong>Description:</strong> {{ data.description }}</p>
            <p><strong>Created Date:</strong> {{ formatDate(data.createdDate) }}</p>
            <p><strong>Shard Name:</strong> {{ data.shardName }}</p>
          </div>
        </li>
      </ul>
      <p v-else class="no-data">No data found.</p>

      <!-- Delete All Data Button -->
      <div class="delete-btn-container">
        <button @click="deleteAllData" class="btn-delete">Delete All Data</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import DataService from '../Dataservice';
import { Data } from '../models/Data';

export default {
  data() {
    return {
      dataList: [],
      newDataDescription: '',
      isLoading: false,
      errorMessage: ''
    };
  },
  methods: {
    async fetchAllData() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const response = await DataService.readAll('/keymappings/', item => new Data(item));
        this.dataList = response;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to load data.';
      } finally {
        this.isLoading = false;
      }
    },
    async addData() {
      if (!this.newDataDescription.trim()) return;

      const newData = {
        description: this.newDataDescription,
        userId: localStorage.getItem('userId')
      };

      this.isLoading = true;
      try {
        await DataService.create('/keymappings', newData);
        this.newDataDescription = '';
        this.fetchAllData();
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to add data.';
      } finally {
        this.isLoading = false;
      }
    },
    async deleteAllData() {
      this.isLoading = true;
      try {
        await DataService.delete('/keymappings');
        this.fetchAllData();
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Failed to delete all data.';
      } finally {
        this.isLoading = false;
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  },
  mounted() {
    this.fetchAllData();
  }
};
</script>

<style scoped>
.data-container {
  max-width: 800px;
  margin: auto;
  padding: 30px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #4a4a4a;
  font-size: 2rem;
  margin-bottom: 30px;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 1rem;
  margin-top: 10px;
}

form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input {
  width: 70%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.data-list {
  margin-top: 20px;
  padding: 0;
}

.data-item {
  background-color: #ffffff;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.data-item p {
  margin: 8px 0;
  font-size: 1rem;
  color: #555;
}

.data-item p strong {
  color: #333;
}

.delete-btn-container {
  text-align: center;
  margin-top: 30px;
}

.btn-delete {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #c82333;
}

.no-data {
  text-align: center;
  font-size: 1.1rem;
  color: #777;
}
</style>
