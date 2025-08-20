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

let addTodo = (todo)=>{
  //Update Server Side 
  fetch(url,{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body:JSON.stringify(todo)
})

  //Update Client Side
  setTodos(prevState=>[...prevState,todo])
}

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo}/>
        <TodoList todos={todos}/>
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
