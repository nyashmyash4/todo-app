import React from 'react'
import { customAlphabet } from 'nanoid'

import TodoList from '../todo-list/todo-list'
import NewTaskForm from '../new-task-form/new-task-form'
import Footer from '../footer/footer'

import './app.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.nanoid = customAlphabet('1234567890', 5)
    this.state = {
      todos: [this.createItem('Learn React'), this.createItem('Sleep'), this.createItem('And Learn React')],
      filter: 'All',
    }
  }

  deleteTask = (id) => {
    this.setState(({ todos }) => {
      const index = todos.findIndex((el) => el.id === id)
      const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]

      return {
        todos: newTodos,
      }
    })
  }

  deleteCompleted = () => {
    this.setState(({ todos }) => {
      const copyTodos = todos.map((el) => el)
      const notCompleted = copyTodos.filter((el) => !el.done)

      return {
        todos: notCompleted,
      }
    })
  }

  onDone = (id) => {
    this.setState(({ todos }) => {
      const index = todos.findIndex((el) => id === el.id)
      const oldItem = todos[index]
      const newItem = { ...oldItem, done: !oldItem.done }
      const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)]
      return {
        todos: newArr,
      }
    })
  }

  createItem(text) {
    return {
      editing: false,
      done: false,
      created: new Date(),
      description: text,
      id: Number(this.nanoid()),
    }
  }

  addTask = (text) => {
    const value = text.trim()
    if (value.length) {
      const newTask = this.createItem(value)

      this.setState(({ todos }) => {
        const newArr = [newTask, ...todos]
        return {
          todos: newArr,
        }
      })
    }
  }

  onEdit = (id) => {
    this.setState(({ todos }) => {
      const index = todos.findIndex((el) => id === el.id)
      const oldItem = todos[index]
      const newItem = { ...oldItem, editing: true }
      const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)]
      return {
        todos: newArr,
      }
    })
  }

  saveEdit = (id, event) => {
    this.setState(({ todos }) => {
      const value = event.target.value.trim()
      const index = todos.findIndex((el) => id === el.id)
      const oldItem = todos[index]
      let newItem = {
        ...oldItem,
        editing: true,
      }
      if (event.which === 13 && value.length) {
        newItem = {
          ...oldItem,
          editing: false,
          description: value,
        }
      }
      if (event.which === 27) {
        newItem = {
          ...oldItem,
          editing: false,
        }
      }

      const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)]
      return {
        todos: newArr,
      }
    })
  }

  taskFilter(arr, filter) {
    if (filter === 'Active') {
      return arr.filter((item) => !item.done)
    }
    if (filter === 'Completed') {
      return arr.filter((item) => item.done)
    }

    return arr
  }

  getFilterName = (buttonName) => {
    this.setState({ filter: buttonName })
  }

  render() {
    const { todos, filter } = this.state
    const visibleTasks = this.taskFilter(todos, filter)
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onAdd={this.addTask} />
        </header>
        <div className="main">
          <TodoList
            todos={visibleTasks}
            filter={filter}
            onDeleted={this.deleteTask}
            onDone={this.onDone}
            onEdit={this.onEdit}
            saveEdit={this.saveEdit}
            endEdit={this.endEdit}
          />
        </div>
        <Footer todos={todos} filter={filter} getFilter={this.getFilterName} deleteCompleted={this.deleteCompleted} />
      </section>
    )
  }
}
