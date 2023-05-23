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
      inputText: '',
      inputMin: '',
      inputSec: '',
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

  createItem(text, min = 2, sec = 30) {
    return {
      editing: false,
      done: false,
      created: new Date(),
      description: text,
      id: Number(this.nanoid()),
      min: min,
      sec: sec,
    }
  }

  addTask = (text, min, sec) => {
    const value = text.trim()
    if (text.length) {
      const newTask = this.createItem(value, min, sec)
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
  onSubmitForm = (evt) => {
    evt.preventDefault()

    this.addTask(this.state.inputText, this.state.inputMin, this.state.inputSec)
    this.setState({ inputText: '', inputMin: '', inputSec: '' })
  }

  onChangeInput = (evt) => {
    const target = evt.target.placeholder
    if (target === 'Todo?') {
      this.setState({ inputText: evt.target.value })
    }

    if (target === 'Min') {
      this.setState({ inputMin: evt.target.value })
    }

    if (target === 'Sec') {
      this.setState({ inputSec: evt.target.value })
    }
  }

  updateTimer = (id, min, sec) => {
    this.setState(({ todos }) => {
      const index = todos.findIndex((el) => id === el.id)
      const oldItem = todos[index]
      const newItem = { ...oldItem, min: min, sec: sec }
      const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)]
      return {
        todos: newArr,
      }
    })
  }

  render() {
    const { todos, filter, inputMin, inputSec, inputText } = this.state
    const visibleTasks = this.taskFilter(todos, filter)
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm
            min={inputMin}
            sec={inputSec}
            value={inputText}
            onSubmit={(evt) => this.onSubmitForm(evt)}
            onChange={(evt) => this.onChangeInput(evt)}
          />
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
            updateTimer={this.updateTimer}
          />
        </div>
        <Footer todos={todos} filter={filter} getFilter={this.getFilterName} deleteCompleted={this.deleteCompleted} />
      </section>
    )
  }
}
