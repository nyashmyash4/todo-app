import React from 'react';

import TaskFilter from '../task-filter/task-filter';

import './footer.css';

const Footer = ({ todos, deleteCompleted, getFilter, filter }) => {
  const done = todos.filter((item) => item.done).length;
  const tasksLeft = todos.length - done;

  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TaskFilter getFilter={getFilter} filter={filter} />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
