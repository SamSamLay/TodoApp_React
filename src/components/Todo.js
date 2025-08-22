import React,{useState} from 'react'

function Todo({todo,deleteTodo,updateTodo}) {

  let [isEdit,setIsEdit] = useState(false);
  let [title,setTitle] = useState(todo.title)

  const handleSubmit = (e)=>{
    e.preventDefault();
    let updatedTodo = {
      id:todo.id,
      //id:Math.floor(Math.random() * 10),
      title,
      completed:todo.completed
    }
    updateTodo(updatedTodo)
    setIsEdit(false);
  }

  return (
    <li className="todo-item-container">
            <div className="todo-item">
              <input type="checkbox" />
             {!isEdit && <span onDoubleClick={()=>setIsEdit(true)} className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>}
              {isEdit && 
              <form onSubmit={handleSubmit}>
                <input type="text" className="todo-item-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
              </form> }
            </div>
            <button className="x-button">
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={()=>deleteTodo(todo.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
  )
}

export default Todo