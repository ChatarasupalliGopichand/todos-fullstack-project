// src/services/api.js (Frontend)
import axios from 'axios';

const API_URL = 'https://todolist-1-6whs.onrender.com'; // Make sure this URL is correct for your backend

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`); // Make sure the URL matches the backend route
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
