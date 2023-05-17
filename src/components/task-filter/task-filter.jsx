import React from 'react'
import PropTypes from 'prop-types'

import './task-filter.css'

export default class TaskFilter extends React.Component {
  buttons = [
    { name: 'All', description: 'All' },
    { name: 'Active', description: 'Active' },
    { name: 'Completed', description: 'Completed' },
  ]

  static defaultProps = {
    getFilter: () => {},
    filter: '',
  }

  static propTypes = {
    getFilter: PropTypes.func,
    filter: PropTypes.string,
  }

  render() {
    const { getFilter, filter } = this.props

    const elements = this.buttons.map((item) => {
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
}
