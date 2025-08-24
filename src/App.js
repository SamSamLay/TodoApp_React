import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm.js';
import TodoList from './components/TodoList.js';
import CheckAllAndRemaining from './components/CheckAllAndRemaining.js';
import TodoFilters from './components/TodoFilters.js';
import ClearCompletedBtn from './components/ClearCompletedBtn.js';
import { useCallback, useEffect, useState } from 'react';
import Logo from './components/Logo.js';

function App() {

  let [ todos, setTodos ] = useState([]);
  let [ filteredTodos, setFilteredTodos ] = useState(todos);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
    .then(res => res.json())
    .then((todos) => {
      setTodos(todos)
      setFilteredTodos(todos);
    })
  }, [])

  let filterBy = useCallback((filter) => {
    if(filter === 'All') {
      setFilteredTodos(todos);
    }
    if(filter === 'Active') {
      setFilteredTodos(todos.filter(t => !t.completed))
    }
    if(filter === 'Completed') {
      setFilteredTodos(todos.filter(t => t.completed))
    }
  },[todos])


  let addTodo = (todo) => {
    fetch('http://localhost:3001/todos' ,{
      method : "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      //body : JSON.stringify(todo)
      body: JSON.stringify({ ...todo, id: Number(todo.id) })
    })
    setTodos(prevState => [...prevState,todo])
  }

  let deleteTodo = async(todoId) => {
     const id = Number(todoId);
    await fetch(`http://localhost:3001/todos/${id}`,{
      method : "DELETE"
    })
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id !== todoId
      });// [todo,todo]
    })
  }

  let updateTodo = async (todo) => {
    const id = Number(todo.id);
    await fetch(`http://localhost:3001/todos/${id}` ,{
      method : "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      //body : JSON.stringify(todo)
       body: JSON.stringify({ ...todo, id })
    })
    setTodos(prevState => {
      return prevState.map(t => {
        if(t.id === todo.id) {
          return todo
        }
        return t;
      });// [updatedTodo,todo,todo]
    })
  }

  let checkAll = () => {
    todos.forEach(t => {
      t.completed = true;
      updateTodo(t)
    })
    setTodos((prevState) => {
      return prevState.map(t => {
        return {...t,completed : true};
      })
    })
  }

  let clearCompleted = () => {
    todos.forEach(t => {
     if(t.completed) {
      deleteTodo(t.id)
     }
    })
    setTodos((prevState) => {
      return prevState.filter(t => !t.completed)
    })
  }

  let remainingCount = todos.filter(t => !t.completed).length

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
    <Logo />
    <div className="todo-app-container">
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        style={{ margin: "10px", padding: "8px 12px", borderRadius: "6px" }}
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo}/>
        <TodoList todos={filteredTodos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
        <CheckAllAndRemaining remainingCount={remainingCount} checkAll={checkAll}/>
        <div className="other-buttons-container">
          <TodoFilters filterBy={filterBy}/>
          <ClearCompletedBtn clearCompleted={clearCompleted}/>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default App;
