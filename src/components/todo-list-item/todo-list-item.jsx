import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './todo-list-item.css'

export default class TodoListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: +this.props.min * 60 + +this.props.sec,
      startTime: null,
      timerActive: false,
    }
    this.timerId = null
  }

  static defaultProps = {
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

  static propTypes = {
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
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
  setDate = (date) => {
    return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
  }

  timerTick = () => {
    if (!this.state.timerActive) return

    if (this.state.timer <= 0) {
      clearInterval(this.timerId)
      this.setState(() => {
        return {
          timerActive: false,
        }
      })
    } else {
      const currentTime = Math.floor(Date.now() / 1000)
      const timePassed = currentTime - this.state.startTime
      const newTimer = this.state.timer - timePassed
      const minutesPassed = Math.floor(timePassed / 60)
      const secondsPassed = Math.floor(timePassed % 60)

      this.props.updateTimer(this.props.id, minutesPassed, secondsPassed)

      this.setState(() => {
        return {
          timer: newTimer,
          startTime: currentTime,
        }
      })
    }
  }
  startTimer = () => {
    if (this.state.timerActive) return

    const startTime = Math.floor(Date.now() / 1000)

    this.setState((state) => {
      return {
        timerActive: !state.timerActive,
        startTime: startTime,
      }
    })

    this.timerId = setInterval(() => this.timerTick(), 1000)
  }

  pauseTimer = () => {
    clearInterval(this.timerId)
    this.setState(() => {
      return {
        timerActive: false,
        startTime: null,
      }
    })
  }

  render() {
    const { id, description, created, done, editing, onDeleted, onDone, onEdit, saveEdit } = this.props
    const { timer } = this.state
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')

    let classNames = ''
    if (done) {
      classNames += ' completed'
    }

    if (editing) {
      classNames += ' editing'
    }
    return (
      <li className={classNames} key={id}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onDone} />
          <label>
            <span className="title" onClick={onDone} role="presentation">
              {description}
            </span>
            <span className="description">
              <button className="icon icon-play" onClick={() => this.startTimer()}></button>
              <button className="icon icon-pause" onClick={() => this.pauseTimer()}></button>
              {`${minutes}:${seconds}`}
            </span>
            <span className="created">{this.setDate(created)}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
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
}
