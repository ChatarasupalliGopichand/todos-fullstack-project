import React from 'react';

const TodoItem = ({ todo }) => (
  <div>
    <h3>{todo.title}</h3>
    <p>Status: {todo.status}</p>
  </div>
);

export default TodoItem;
