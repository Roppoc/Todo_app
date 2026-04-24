import axios from 'axios';

// Базовый URL твоего API (можно использовать JSONPlaceholder для тестов)
const API_URL = 'https://typicode.com';

const todoService = {
  // Получить все задачи
  getAll: async () => {
    const response = await axios.get(`${API_URL}?_limit=10`);
    return response.data;
  },

  // Создать новую задачу
  create: async (title) => {
    const response = await axios.post(API_URL, {
      title,
      completed: false
    });
    return response.data;
  },

  // Удалить задачу
  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },

  // Обновить статус (выполнено/нет)
  toggleComplete: async (todo) => {
    const response = await axios.put(`${API_URL}/${todo.id}`, {
      ...todo,
      completed: !todo.completed
    });
    return response.data;
  }
};

export default todoService;
