import React from 'react'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  render() {
    const { value, sec, min, onSubmit, onChange } = this.props

    return (
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input className="new-todo" placeholder="Todo?" value={value} required onChange={onChange} />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          value={min}
          required
          onChange={onChange}
          min={0}
          max={60}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          value={sec}
          required
          onChange={onChange}
          min={0}
          max={60}
        />
        <button type="submit"></button>
      </form>
    )
  }
}
