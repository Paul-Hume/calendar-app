import React from 'react';

import './DayLabel.css';

const DayLabel = (props) => {
  return ( 
    <div className="day-label">{props.title}</div>
  );
}
 
export default DayLabel;