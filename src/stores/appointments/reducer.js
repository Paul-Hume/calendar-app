import * as types from './actionTypes';

const initialState = {
  all: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.APPOINTMENTS_FETCH_ALL:
      return {
        ...state,
        all: action.appointments
      }
    case types.APPOINTMENTS_ADD:
      return {
        ...state,
        all: state.all.concat(action.appt)
      }
    default: 
      return state
  }
}