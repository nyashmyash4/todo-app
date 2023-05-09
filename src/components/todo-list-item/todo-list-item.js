import React from 'react';

import { formatDistanceToNow } from 'date-fns';

import './todo-list-item.css';

const EditingInput = () => {
  return (
    <input
      type="text"
      className="edit"
      placeholder="edit"
      defaultValue="Editing task"
    />
  );
};

const TodoListItem = ({ item }) => {
  const { id, className, description, created, isEditing } = item;

  const setDate = (date) =>
    formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });

  return (
    <li className={className} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description">{description}</span>
          <span className="created">{setDate(created)}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {isEditing ? <EditingInput /> : null}
    </li>
  );
};

export default TodoListItem;
