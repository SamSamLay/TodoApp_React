import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilters from './components/TodoFilters';
import ClearCompletedBtn from './components/ClearCompletedBtn';
import { useState,useEffect } from 'react';


function App() {

  let url = "http://localhost:3001/todos"
  let [todos,setTodos] = useState(null);

   useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then(todos=>setTodos(todos))
    
  },[url])

let addTodo = (todo) => {
    fetch('http://localhost:3001/todos' ,{
      method : "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(todo)
    })
    setTodos(prevState => [...prevState,todo])
  }

  let deleteTodo = (todoId)=>{
    fetch(`http://localhost:3001/todos/${todoId}`,{
      method:"DELETE",
    })

    setTodos(prevState=>{
      return prevState.filter((todo)=>{
        return todo.id !== todoId})
    })
  }

  let updateTodo = (todo) => {
    fetch(`http://localhost:3001/todos/${todo.id}`,{
      method : "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(todo)
    })
    setTodos(prevState=>{
      return prevState.map((t)=>{
        if(t.id === todo.id){
          return todo;
        }
        return t;
        })
    })
  }


  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo}/>
        <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
        <CheckAllAndRemaining/>

        <div className="other-buttons-container">
           <TodoFilters/>
          
          <ClearCompletedBtn/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
