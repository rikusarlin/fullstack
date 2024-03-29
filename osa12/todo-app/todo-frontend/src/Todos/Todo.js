import React from 'react'

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  const doneInfo = (
    <span>
      <span className="todoDone">This todo is done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
      </span>
    </span>
  )

  const notDoneInfo = (
    <span>
      <span className="todoNotDone">This todo is not done</span>
      <span>
        <button onClick={onClickDelete(todo)}> Delete </button>
        <button onClick={onClickComplete(todo)}> Set as done </button>
      </span>
    </span>
  )

  return (
    <div className="todo" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span className="todoText">
        {todo.text} 
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  )
}

export default Todo
