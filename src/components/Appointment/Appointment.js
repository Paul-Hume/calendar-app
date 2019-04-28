import React from 'react';
import moment from 'moment';
import './Appointment.css'

const Appointment = (props) => {
  const {color, date, title} = props.appt;

  return ( 
    <div className="appointment" style={{color}}>
      {moment(date).format('HH:mm')} - {title}
    </div>
  );
}
 
export default Appointment;