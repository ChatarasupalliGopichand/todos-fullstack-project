import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onNewTodo }) => {
  const [title, setTitle] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/todos', { title }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    onNewTodo(response.data);
  };

  return (
    <form onSubmit={handleAdd}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
