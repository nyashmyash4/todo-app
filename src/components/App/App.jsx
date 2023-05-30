import React, { useState } from 'react'
import { customAlphabet } from 'nanoid'

import TodoList from '../TodoList/TodoList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'

import './App.css'

const nanoid = customAlphabet('1234567890', 5)

function taskFilter(arr, filter) {
  if (filter === 'Active') {
    return arr.filter((item) => !item.done)
  }
  if (filter === 'Completed') {
    return arr.filter((item) => item.done)
  }

  return arr
}

function createItem(text, min = 2, sec = 30) {
  return {
    editing: false,
    done: false,
    created: new Date(),
    description: text,
    id: Number(nanoid()),
    min: min,
    sec: sec,
  }
}

const App = () => {
  const [todos, setTodos] = useState([createItem('Learn React'), createItem('Sleep'), createItem('And Learn React')])
  const [filter, setFilter] = useState('All')
  const [inputText, setInputText] = useState('')
  const [inputMin, setInputMin] = useState('')
  const [inputSec, setInputSec] = useState('')

  const handleDeleteTask = (id) => {
    const index = todos.findIndex((el) => el.id === id)
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)]
    setTodos(newTodos)
  }

  const handleDeleteCompleted = () => {
    const copyTodos = todos.map((el) => el)
    const notCompleted = copyTodos.filter((el) => !el.done)
    setTodos(notCompleted)
  }

  const handleDone = (id) => {
    const index = todos.findIndex((el) => id === el.id)
    const oldItem = todos[index]
    const newItem = { ...oldItem, done: !oldItem.done }
    const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)]
    setTodos(newArr)
  }

  const handleEdit = (id) => {
    const index = todos.findIndex((el) => id === el.id)
    const oldItem = todos[index]
    const newItem = { ...oldItem, editing: true }
    const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)]

    setTodos(newArr)
  }

  const handleSaveEdit = (id, event) => {
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

    setTodos(newArr)
  }

  const handleInputChange = (event) => {
    const target = event.target.placeholder

    if (target === 'Todo?') {
      setInputText(event.target.value)
    }

    if (target === 'Min') {
      setInputMin(event.target.value)
    }

    if (target === 'Sec') {
      setInputSec(event.target.value)
    }
  }

  const addTask = (text, min, sec) => {
    const value = text.trim()
    if (text.length) {
      const newTask = createItem(value, min, sec)
      const newArr = [newTask, ...todos]

      setTodos(newArr)
    }
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()

    addTask(inputText, inputMin, inputSec)
    setInputText('')
    setInputMin('')
    setInputSec('')
  }

  const handleFilterName = (buttonName) => {
    setFilter(buttonName)
  }

  const handleUpdateTimer = (id, min, sec) => {
    const index = todos.findIndex((el) => id === el.id)
    const oldItem = todos[index]
    const newItem = {
      ...oldItem,
      min: oldItem.min - min,
      sec: oldItem.sec - sec,
    }
    const newArr = [...todos.slice(0, index), newItem, ...todos.slice(index + 1)]

    setTodos(newArr)
  }

  const visibleTasks = taskFilter(todos, filter)
  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm
          value={inputText}
          min={inputMin}
          sec={inputSec}
          onChange={(evt) => handleInputChange(evt)}
          onSubmit={(evt) => handleSubmitForm(evt)}
        />
      </header>
      <div className="main">
        <TodoList
          todos={visibleTasks}
          onDelete={handleDeleteTask}
          onDone={handleDone}
          onEdit={handleEdit}
          saveEdit={handleSaveEdit}
          updateTimer={handleUpdateTimer}
        />
      </div>
      <Footer todos={todos} filter={filter} getFilter={handleFilterName} deleteCompleted={handleDeleteCompleted} />
    </section>
  )
}

export default App
