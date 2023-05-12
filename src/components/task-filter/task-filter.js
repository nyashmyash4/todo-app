import React, { Component } from 'react';

import './task-filter.css';

export default class TaskFilter extends Component {
  buttons = [
    { name: 'All', description: 'All' },
    { name: 'Active', description: 'Active' },
    { name: 'Completed', description: 'Completed' },
  ];

  render() {
    const { getFilter, filter } = this.props;

    const elements = this.buttons.map((item) => {
      const { name, description } = item;
      const isActive = filter === item.name;

      return (
        <li key={name}>
          <button
            name={name}
            className={isActive ? 'selected' : ''}
            onClick={() => getFilter(name)}
          >
            {description}
          </button>
        </li>
      );
    });

    return <ul className="filters">{elements}</ul>;
  }
}
