import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../task-filter/task-filter';

import './footer.css';

const Footer = (props) => {
  const { todos, deleteCompleted, getFilter, filter } = props;
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

Footer.defaultProprs = {
  todos: [{}],
  deleteCompleted: () => {},
  getFilter: () => {},
  filter: '',
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      done: PropTypes.bool,
      editing: PropTypes.bool,
      created: PropTypes.object,
      description: PropTypes.string,
      id: PropTypes.number,
    })
  ),
  deleteCompleted: PropTypes.func,
  getFilter: PropTypes.func,
  filter: PropTypes.string,
};

export default Footer;
