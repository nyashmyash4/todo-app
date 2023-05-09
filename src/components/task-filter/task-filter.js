import React from 'react';

import './task-filter.css';

const TaskFilter = ({ filter }) => {
  const elements = filter.map((item) => {
    const { id, className, description } = item;
    return (
      <li key={id}>
        <button className={className}>{description}</button>
      </li>
    );
  });
  return <ul className="filters">{elements}</ul>;
};

export default TaskFilter;
