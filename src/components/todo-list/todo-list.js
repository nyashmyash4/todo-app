import React, { Component } from 'react';

import TodoListItem from '../todo-list-item/todo-list-item';

import './todo-list.css';

export default class TodoList extends Component {
  render() {
    const { todos, onDeleted } = this.props;

    const elements = todos.map((item) => {
      const { id } = item;
      return (
        <TodoListItem key={id} item={item} onDeleted={() => onDeleted(id)} />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
