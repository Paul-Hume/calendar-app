import React from 'react';
import './DateCell.css';
import moment from 'moment';

import Appointment from '../Appointment/Appointment';

const DateCell = (props) => {
  const {date, appointments} = props;

  return ( 
    <div className={`date-cell ${!date && 'empty'}`}>
      {date && (<div className="date">{moment(date).date()}</div>)}
      <div className="appointment-container">
        {appointments.length > 0 && appointments.map((appt, index) => <Appointment appt={appt} key={index} />)}
      </div>
    </div>
  );
}
 
export default DateCell;