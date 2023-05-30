import React from 'react'
import PropTypes from 'prop-types'

import TodoListItem from '../TodoListItem/TodoListItem'

import './TodoList.css'

const TodoList = (props) => {
  const { todos, onDelete, onDone, onEdit, saveEdit, updateTimer } = props
  const elements = todos.map((item) => {
    const { id } = item

    return (
      <TodoListItem
        key={id}
        {...item}
        onDelete={onDelete}
        onDone={onDone}
        onEdit={onEdit}
        saveEdit={saveEdit}
        updateTimer={updateTimer}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TodoList.defaultProps = {
  todos: [],
  filter: '',
  onDeleted: () => {},
  onDone: () => {},
  onEdit: () => {},
  saveEdit: () => {},
  updateTimer: () => {},
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool,
      editing: PropTypes.bool,
      created: PropTypes.object,
      description: PropTypes.string,
      id: PropTypes.number,
    })
  ),
  filter: PropTypes.string,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  onEdit: PropTypes.func,
  saveEdit: PropTypes.func,
  updateTimer: PropTypes.func,
}

export default TodoList
