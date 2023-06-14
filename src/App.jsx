import { useState, useEffect } from 'react';
import {BsCheck2Circle} from 'react-icons/bs';
import {RiCloseCircleLine} from 'react-icons/ri';
import {AiOutlineDelete} from 'react-icons/ai'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTodoDesc, setNewTodoDesc] = useState('');

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [
        ...todos,
        {
          id: Date.now(),
          title: newTodo,
          description: newTodoDesc,
          completed: false,
        },
      ];
      setTodos(updatedTodos);
      setNewTodo('');
      setNewTodoDesc('');
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Toggle the status of a todo
  const toggleStatus = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const toggleDescription = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, showDescription: !todo.showDescription } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className='text-center p-8 md:p-4 max-w-3xl mx-auto'>
      <h1 className='mb-4'>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="What do you want to do?"
        className='flex-1 p-2 mb-5 rounded-lg w-full mr-4 text-lg bg-slate-800 text-slate-200'
        
      />
      <textarea
        type="text"
        value={newTodoDesc}
        onChange={(e) => setNewTodoDesc(e.target.value)}
        placeholder="Description..."
        className='flex-1 p-2 rounded-lg w-full mr-4 text-lg bg-slate-800 text-slate-200'
      />
      <button onClick={addTodo}>Add</button>
      <ul className='mt-10 p-2 rounded-lg text-lg bg-slate-800 text-slate-200'>
        <h4 className='text-left'>Tasks</h4>
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between border-b-2 border-slate-500 p-3">
            <div className='w-2/3'>
              <h3 className='text-left' onClick={() => toggleDescription(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</h3>
              {todo.showDescription && <p className='text-left text-sm'>{todo.description}</p>}
            </div>
            <div>
              <button onClick={() => toggleStatus(todo.id)} className='pr-4'>
                {todo.completed ? <RiCloseCircleLine/> : <BsCheck2Circle/>}
              </button>
              <button onClick={() => deleteTodo(todo.id)}><AiOutlineDelete/></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
