import React, { useState, useEffect } from 'react';

function App() {
  // Predefined list of todos
  const initialTodos = [
    { id: 1, text: 'Language study 1 hr 📖', checked: false },
    { id: 2, text: 'Piano 1 hr 🎹', checked: false },
    { id: 3, text: 'Web proj progress 💻', checked: false },
    { id: 4, text: 'Drawing practice 🖌️', checked: false },
  ];

  // Load todos from localStorage or use initialTodos
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return initialTodos;
  };

  // State to manage todos
  const [todos, setTodos] = useState(loadTodos);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to toggle the checked status of a todo
  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  // Function to reset checked status every day
  useEffect(() => {
    const resetCheckedStatus = () => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => ({ ...todo, checked: false }))
      );
    };

    // Get the current time and calculate the time until midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to next midnight
    const timeUntilMidnight = midnight - now;

    // Set a timeout to reset the checked status at midnight
    const timeoutId = setTimeout(resetCheckedStatus, timeUntilMidnight);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center bg-light-blue pt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Daily Tasks</h1>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center p-3 border-b border-gray-200">
              <input
                type="checkbox"
                checked={todo.checked}
                onChange={() => toggleTodo(todo.id)}
                className="mr-4 h-6 w-6 text-blue-500 rounded focus:ring-blue-500"
              />
              <span className={`text-xl font-roboto ${todo.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;