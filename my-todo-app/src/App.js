import React, { useState, useEffect } from 'react';
import todoService from './services/todoService';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Загружаем данные при старте
  useEffect(() => {
    todoService.getAll().then(data => setTodos(data));
  }, []);

const handleAddTodo = async () => {
  if (!inputValue.trim()) return;
  
  try {
    // Пытаемся отправить на сервер
    const newTodo = await todoService.create(inputValue);
    setTodos([newTodo, ...todos]);
  } catch (error) {
    console.error("Ошибка сети, но мы добавим задачу локально:", error);
    // Если сервер упал, создаем задачу локально, чтобы всё работало
    const localTodo = { id: Date.now(), title: inputValue, completed: false };
    setTodos([localTodo, ...todos]);
  }
  
  setInputValue('');
};

 const handleDelete = async (id) => {
  // 1. Сразу удаляем из интерфейса (пользователь видит мгновенный результат)
  setTodos(todos.filter(t => t.id !== id));

  try {
    // 2. Пытаемся уведомить сервер
    await todoService.delete(id);
  } catch (error) {
    // Если сервер не ответил — ничего страшного, 
    // в консоль упадет ошибка, но приложение не вылетит.
    console.error("Сервер не смог удалить, но мы убрали задачу из списка:", error);
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h1>My ToDo List</h1>
      <input 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Что нужно сделать?"
      />
      <button onClick={handleAddTodo}>Добавить</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ margin: '10px 0' }}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '10px' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
