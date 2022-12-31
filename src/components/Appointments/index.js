import './index.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

export default class Appointments extends Component {
  state = {
    appointments: [],
    starredAps: [],
    eventValue: '',
    date: '',
    starred: false,
  }

  addItem = event => {
    event.preventDefault()
    const {eventValue, date, starred} = this.state
    const temp = {
      id: uuidv4(),
      eventValue,
      date,
      starred,
    }
    this.setState(prev => ({
      appointments: [...prev.appointments, temp],
      eventValue: '',
      date: '',
    }))
  }

  addTitle = event => {
    this.setState({eventValue: event.target.value})
  }

  addDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {appointments} = this.state
    return (
      <div className="bg">
        <div className="card">
          <div className="input-container">
            <div className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.addItem}>
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
                <button type="submit" className="add-btn">
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
            <button type="button" className="starred-button">
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {appointments.map(each => (
              <AppointmentItem
                key={each.id}
                eventType={each.eventValue}
                date={each.date}
                starred={each.starred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
