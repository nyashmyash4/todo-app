import React from 'react'
import PropTypes from 'prop-types'

import TodoListItem from '../todo-list-item/todo-list-item'

import './todo-list.css'

export default class TodoList extends React.Component {
  static defaultProps = {
    todos: [{}],
    filter: '',
    onDeleted: () => {},
    onDone: () => {},
    onEdit: () => {},
    saveEdit: () => {},
  }

  static propTypes = {
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
  }

  render() {
    const { todos, filter, onDeleted, onDone, onEdit, saveEdit, updateTimer } = this.props

    const elements = todos.map((item) => {
      const { id } = item

      return (
        <TodoListItem
          key={id}
          {...item}
          filter={filter}
          onDeleted={() => onDeleted(id)}
          onDone={() => onDone(id)}
          onEdit={() => onEdit(id)}
          updateTimer={updateTimer}
          saveEdit={saveEdit}
        />
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
