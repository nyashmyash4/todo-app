import React from 'react';

import TaskFilter from '../task-filter/task-filter';

import './footer.css';

const Footer = ({ filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TaskFilter filter={filter} />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;
