import React from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

const TaskFilter = (props) => {
  const buttons = [
    { name: 'All', description: 'All' },
    { name: 'Active', description: 'Active' },
    { name: 'Completed', description: 'Completed' },
  ]

  const { getFilter, filter } = props

  const elements = buttons.map((item) => {
    const { name, description } = item
    const isActive = filter === item.name

    return (
      <label key={name} className={isActive ? 'selected' : ''} onClick={() => getFilter(name)} role="presentation">
        <input key={name} type="radio" name={name} />
        {description}
      </label>
    )
  })

  return (
    <ul className="filters">
      {elements.map((el) => (
        <li key={el.key}>{el}</li>
      ))}
    </ul>
  )
}

TaskFilter.defaultProps = {
  getFilter: () => {},
  filter: '',
}

TaskFilter.propTypes = {
  getFilter: PropTypes.func,
  filter: PropTypes.string,
}

export default TaskFilter
