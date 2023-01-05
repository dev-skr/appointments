import './index.css'

import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

export default class Appointments extends Component {
  changeBackground = ''

  state = {
    appointments: [],
    starredAps: [],
    eventValue: '',
    date: '',
    starred: false,
    starredButton: false,
  }

  addItem = event => {
    event.preventDefault()
    const {eventValue, date, starred, appointments} = this.state
    const temp = {
      id: v4(),
      eventValue,
      date,
      starred,
    }
    this.setState({
      appointments: [...appointments, temp],
      eventValue: '',
      date: '',
    })
  }

  addTitle = event => {
    this.setState({eventValue: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  getItem = id => {
    const {appointments} = this.state
    const item = appointments.filter(each => each.id === id)
    return item[0]
  }

  starringItem = id => {
    const {starred, starredAps} = this.state
    if (!starred) {
      const item = this.getItem(id)
      this.setState(prev => ({
        starred: true,
        starredAps: [...prev.starredAps, item],
      }))
    }
    const restOfStarred = starredAps.filter(each => each.id !== id)
    this.setState({starred: false, starredAps: restOfStarred})
  }

  getAppointments = () => {
    const {starredButton, appointments, starredAps} = this.state
    if (starredButton) {
      return starredAps.map(each => (
        <AppointmentItem
          key={each.id}
          eventType={each.eventValue}
          date={each.date}
          starred={each.starred}
          id={each.id}
          starringItem={this.starringItem}
        />
      ))
    }
    return appointments.map(each => (
      <AppointmentItem
        key={each.id}
        eventType={each.eventValue}
        date={each.date}
        starred={each.starred}
        id={each.id}
        starringItem={this.starringItem}
      />
    ))
  }

  getStarredItems = () => {
    const {starredButton} = this.state
    if (starredButton) {
      this.changeBackground = ''
      this.setState({starredButton: false})
    }
    this.changeBackground = 'starred-button-background'
    this.setState({starredButton: true})
  }

  render() {
    return (
      <div className="bg">
        <div className="card">
          <div className="input-container">
            <div className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-container">
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.addTitle}
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  type="date"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.addDate}
                />
                <br />
                <button
                  type="submit"
                  className="add-btn"
                  onSubmit={this.addItem}
                >
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr />
          <div className="appointments-text">
            <p className="ap-heading">Appointments</p>
            <button
              type="button"
              className={`starred-button ${this.changeBackground}`}
              onClick={this.getStarredItems}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">{this.getAppointments()}</ul>
        </div>
      </div>
    )
  }
}
