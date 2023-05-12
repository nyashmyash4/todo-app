import React, { Component } from 'react';

import { formatDistanceToNow } from 'date-fns';

import './todo-list-item.css';

export default class TodoListItem extends Component {
  setDate = (date) => {
    return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
  };

  render() {
    const {
      id,
      description,
      created,
      done,
      editing,
      onDeleted,
      onDone,
      onEdit,
      saveEdit,
    } = this.props;
    let classNames = '';
    if (done) {
      classNames += ' completed';
    }

    if (editing) {
      classNames += ' editing';
    }
    return (
      <li className={classNames} key={id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={done}
            onChange={onDone}
          />
          <label>
            <span className="description" onClick={onDone}>
              {description}
            </span>
            <span className="created">{this.setDate(created)}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <input
            type="text"
            className="edit"
            placeholder="edit"
            defaultValue={description}
            onKeyDown={(event) => saveEdit(id, event)}
          />
        ) : null}
      </li>
    );
  }
}
