import * as types from './actionTypes';
import { getAppointments } from '../../data/appointments';

export function appointmentsFetchAll() {
  return dispatch => {
    const appointments = getAppointments();
    dispatch({ type: types.APPOINTMENTS_FETCH_ALL, appointments})
  }
}

export function appointmentsAdd(appt) {
  return dispatch => {
    dispatch({ type: types.APPOINTMENTS_ADD, appt})
  }
}