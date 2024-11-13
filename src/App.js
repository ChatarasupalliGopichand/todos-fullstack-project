import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('pending');

  // Fetch todos from the backend when the component is mounted
  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://todolist-1-6whs.onrender.com/todos');
      // Filter out "Learn Node.js - pending" and "Complete Todo App - in progress"
      const filteredTodos = response.data.filter(todo => 
        !(todo.task === 'Learn Node.js' && todo.status === 'pending') &&
        !(todo.task === 'Complete Todo App' && todo.status === 'in progress')
      );
      setTodos(filteredTodos); // Set filtered todos after fetching
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const newTodo = { task, status };
      // Send POST request to add the new todo
      const response = await axios.post('https://todolist-1-6whs.onrender.com/todos', newTodo);

      // Clear the input fields after adding the todo
      setTask('');
      setStatus('pending');

      // Immediately add the new todo to the list without refetching
      setTodos([...todos, response.data]); // Add the new todo to the state directly
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Function to apply dynamic styles based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'done':
        return {
          backgroundColor: '#4caf50',
          color: 'white',
        };
      case 'in progress':
        return {
          backgroundColor: '#ff9800',
          color: 'white',
        };
      case 'pending':
        return {
          backgroundColor: '#f44336',
          color: 'white',
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, []);

  return (
    <div style={styles.container}>
      <h1>Todo Lists </h1>
      <form onSubmit={addTodo} style={styles.form}>
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          style={styles.input}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.select}
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" style={styles.button}>
          Add Todo
        </button>
      </form>

      <h2>Todos</h2>
      <ul style={styles.todoList}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              ...styles.todoItem,
              ...getStatusStyle(todo.status),
            }}
          >
            {todo.task} - {todo.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  select: {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  todoList: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  todoItem: {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    fontSize: '18px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
};

export default App;
