import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  state = {
    text: '',
  };

  onChangeInput = (evt) => {
    this.setState({ text: evt.target.value });
  };

  onSubmitForm = (evt) => {
    evt.preventDefault();
    const { onAdd } = this.props;
    onAdd(this.state.text);
    this.setState({ text: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.text}
          onChange={this.onChangeInput}
        />
      </form>
    );
  }
}
