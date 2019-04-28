import * as types from './actionTypes';

export function forwardMonth() {
  return dispatch => {
    dispatch({ type: types.CALENDAR_ADD_MONTH })
  }
}

export function backwardMonth() {
  return dispatch => {
    dispatch({ type: types.CALENDAR_MINUS_MONTH })
  }
}