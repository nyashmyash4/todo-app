import React from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

const NewTaskForm = (props) => {
  const { value, sec, min, onSubmit, onChange } = props
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

NewTaskForm.defaultProps = {
  value: '',
  sec: '',
  min: '',
  onSubmit: () => {},
  onChange: () => {},
}
NewTaskForm.propTypes = {
  value: PropTypes.string,
  sec: PropTypes.string,
  min: PropTypes.string,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
}
export default NewTaskForm
