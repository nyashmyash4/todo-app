import React, { Component } from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

export default class TodoList extends Component {
  render() {
    const { todos, filter, onDeleted, onDone, onEdit, saveEdit } = this.props;

    const elements = todos.map((item) => {
      const { id } = item;

      return (
        <TodoListItem
          key={item.id}
          {...item}
          filter={filter}
          onDeleted={() => onDeleted(id)}
          onDone={() => onDone(id)}
          onEdit={() => onEdit(id)}
          saveEdit={saveEdit}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
