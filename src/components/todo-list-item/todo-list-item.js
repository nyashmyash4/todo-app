import React, { Component } from 'react';

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

export default class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { done: false, editing: false, checked: false };
  }

  setDate = (date) => {
    return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
  };

  onCompleted = () => {
    this.setState(({ done, checked }) => {
      return {
        done: !done,
        checked: !checked,
      };
    });
  };

  onEdit = () => {
    this.setState(({ editing }) => {
      return {
        editing: !editing,
      };
    });
  };

  render() {
    const { id, description, created } = this.props.item;
    const { done, editing } = this.state;

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
            checked={this.state.checked}
            onChange={this.onCompleted}
          />
          <label>
            <span className="description" onClick={this.onCompleted}>
              {description}
            </span>
            <span className="created">{this.setDate(created)}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEdit}></button>
          <button
            className="icon icon-destroy"
            onClick={this.props.onDeleted}
          ></button>
        </div>
        {editing ? <EditingInput /> : null}
      </li>
    );
  }
}
