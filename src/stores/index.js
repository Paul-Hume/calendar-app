import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import appointments from './appointments/reducer';
import calendar from './calendar/reducer';

const reducer = combineReducers({
  appointments,
  calendar
})
const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default store;