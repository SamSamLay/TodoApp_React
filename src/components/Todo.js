import React from 'react'

function Todo({todo,deleteTodo}) {
  return (
    <li className="todo-item-container">
            <div className="todo-item">
              <input type="checkbox" />
              <span className={`todo-item-label ${todo.completed ? 'line-through' : ''}`}>{todo.title}</span>
              {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
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