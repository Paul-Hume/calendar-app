import * as types from './actionTypes';
import moment from 'moment';

import { weekdays } from '../../data/weekdays';

const calculateDays = (month = moment().month()) => {

  const monthString = `${moment().year()}-${month + 1}`;

  // Get start and end dates of month
  const start = moment(monthString).startOf('month');
  const end = moment(monthString).endOf('month');
  
  const days = [];
  let day = start;

  // Add blank days to start
  for (let i = 0; weekdays[i] !== day.format('dddd'); i++) {
    days.push('');
  }

  // Add the days of the month
  while (day < end) {      
    days.push(day);
    day = day.clone().add(1, 'd');
  }

  // Add blank days at the end of the month
  if (weekdays[0] !== day.format('dddd')) {
    for (let i = 7; weekdays[i] !== day.format('dddd'); i--) {
      days.push('');
    }
  }

  return days
}

const initialState = {
  currentMonth: moment().month(),
  currentYear: moment().year(),
  daysOfWeek: weekdays,
  dates: calculateDays()
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CALENDAR_ADD_MONTH:
      return {
        ...state,
        currentMonth: state.currentMonth + 1,
        dates: calculateDays(state.currentMonth + 1)
      }
    case types.CALENDAR_MINUS_MONTH:
      return {
        ...state,
        currentMonth: state.currentMonth - 1,
        dates: calculateDays(state.currentMonth - 1)
      }
    default:
      return state
  }
}