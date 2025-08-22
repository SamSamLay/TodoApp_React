import React, { useState } from 'react'


const TodoForm = ({addTodo}) => {
  let [title,setTitle]=useState();

  const handleSubmit = (e)=>{
    e.preventDefault();
    let todo = {
      id:Math.random(),
      //id:Math.floor(Math.random() * 10),
      title,
      completed:false
    }
    addTodo(todo)
    setTitle('');
  }

  return (
     <form action="#" onSubmit={handleSubmit}>
          <input
            value={title}
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            onChange={(e)=>setTitle(e.target.value)}
          />
        </form>
  )
}

export default TodoForm