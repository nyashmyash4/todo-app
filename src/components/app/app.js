import React, { Component } from 'react';

import TodoList from '../todo-list/todo-list';
import NewTaskForm from '../new-task-form/new-task-form';
import Footer from '../footer/footer';

import './app.css';

export default class App extends Component {
  state = {
    todos: [
      {
        isEditing: false,
        className: '',
        created: new Date(2023, 4, 10, 12, 55),
        description: 'Completed task',
        id: 11,
      },
      {
        isEditing: true,
        className: 'editing',
        created: new Date(2023, 4, 10, 12, 55),
        description: 'Editing task',
        id: 12,
      },
      {
        isEditing: false,
        className: '',
        created: new Date(2023, 4, 10, 12, 55),
        description: 'Active task',
        id: 13,
      },
    ],

    taskFilter: [
      { id: 1, className: 'selected', description: 'All' },
      { id: 2, className: '', description: 'Active' },
      { id: 3, className: '', description: 'Completed' },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ todos }) => {
      const index = todos.findIndex((el) => el.id === id);
      const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];

      return {
        todos: newTodos,
      };
    });
  };
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm />
        </header>
        <div className="main">
          <TodoList todos={this.state.todos} onDeleted={this.deleteTask} />
        </div>
        <Footer filter={this.state.taskFilter} />
      </section>
    );
  }
}
