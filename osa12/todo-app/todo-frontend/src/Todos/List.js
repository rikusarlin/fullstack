import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <span>
      {todos.map(todo => {
        return (
          <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
        )
      }).reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </span>
  )
}

export default TodoList
