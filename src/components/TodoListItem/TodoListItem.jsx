import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './TodoListItem.css'

function setDate(date) {
  return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
}

const TodoListItem = (props) => {
  const { id, description, editing, done, created, onDelete, onDone, onEdit, saveEdit, min, sec, updateTimer } = props
  const [timer, setTimer] = useState(min * 60 + sec)
  const [startTime, setStartTime] = useState(null)
  const [timerActive, setTimerActive] = useState(false)

  useEffect(() => {
    if (!timerActive) return
    const interval = setInterval(() => {
      if (timer >= 1) {
        const currentTime = Math.floor(Date.now() / 1000)
        const timePassed = currentTime - startTime
        const newTimer = timer - timePassed
        const minutesPassed = Math.floor(timePassed / 60)
        const secondsPassed = Math.floor(timePassed % 60)

        updateTimer(id, minutesPassed, secondsPassed)
        setTimer(newTimer)
        setStartTime(currentTime)
      }
    }, 1000)

    if (timer === 0 || done) {
      clearInterval(timer)
      setTimerActive(false)
    }

    return () => {
      clearInterval(interval)
    }
  }, [timerActive, timer, done])

  const startTimer = () => {
    if (timerActive) return
    const start = Math.floor(Date.now() / 1000)
    setTimerActive(true)
    setStartTime(start)
  }

  const pauseTimer = () => {
    setTimerActive(false)
    setStartTime(null)
  }

  let classNames = ''
  if (done) {
    classNames += ' completed'
  }

  if (editing) {
    classNames += ' editing'
  }
  const date = setDate(created)
  const minutes = Math.floor(timer / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(timer % 60)
    .toString()
    .padStart(2, '0')

  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={done} onChange={() => onDone(id)} id={`task-${id}`} />
        <label htmlFor={`task-${id}`}>
          <span className="title" role="presentation" onChange={() => onDone(id)}>
            {description}
          </span>

          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={pauseTimer}></button>
            <span className="timeleft">{`${minutes}:${seconds}`}</span>
          </span>
          <span className="created">{date}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdit(id)}></button>
        <button className="icon icon-destroy" onClick={() => onDelete(id)}></button>
      </div>
      {editing ? (
        <input
          type="text"
          className="edit"
          placeholder="edit"
          defaultValue={description}
          onKeyDown={(event) => saveEdit(id, event)}
        />
      ) : null}
    </li>
  )
}

TodoListItem.defaultProps = {
  id: 1,
  description: '',
  created: new Date(),
  done: false,
  editing: false,
  onDeleted: () => {},
  onDone: () => {},
  onEdit: () => {},
  saveEdit: () => {},
  updateTimer: () => {},
}

TodoListItem.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  created: PropTypes.object,
  done: PropTypes.bool,
  editing: PropTypes.bool,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  onEdit: PropTypes.func,
  saveEdit: PropTypes.func,
  updateTimer: PropTypes.func,
}

export default TodoListItem
