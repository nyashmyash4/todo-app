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
        <li key={name}>
          <button name={name} className={isActive ? 'selected' : ''} onClick={() => getFilter(name)}>
            {description}
          </button>
        </li>
      )
    })

    return <ul className="filters">{elements}</ul>
  }
}
