import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {eventType, date, starred, id, starringItem} = props
  const url = starred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const starItem = () => {
    starringItem(id)
  }
  return (
    <li className="item">
      <div className="ap-text-container">
        <h1 className="ap-name">{eventType}</h1>
        <p className="ap-date">
          {format(new Date({date}), 'dd MMMM yyyy, EEEE')}
        </p>
      </div>
      <button type="button" className="star-button" onClick={starItem}>
        <img src={url} className="star-icon" alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
