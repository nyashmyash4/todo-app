import React from 'react';

import TodoList from '../todo-list/todo-list';
import NewTaskForm from '../new-task-form/new-task-form';
import Footer from '../footer/footer';

import './app.css';

const App = () => {
  const todos = [
    {
      isEditing: false,
      className: 'completed',
      created: new Date('2023-05-8'),
      description: 'Completed task',
      id: 1,
    },
    {
      isEditing: true,
      className: 'editing',
      created: new Date('2023-05-8'),
      description: 'Editing task',
      id: 2,
    },
    {
      isEditing: false,
      className: '',
      created: new Date('2023-05-9'),
      description: 'Active task',
      id: 3,
    },
  ];

  const taskFilter = [
    { id: 1, className: 'selected', description: 'All' },
    { id: 2, className: '', description: 'Active' },
    { id: 3, className: '', description: 'Completed' },
  ];

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm />
      </header>
      <div className="main">
        <TodoList todos={todos} />
      </div>
      <Footer filter={taskFilter} />
    </section>
  );
};

export default App;
