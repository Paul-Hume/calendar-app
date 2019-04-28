import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DateTime from 'react-datetime';
import * as _ from 'lodash';
import { GithubPicker } from 'react-color';

import { appointmentsFetchAll, appointmentsAdd } from './stores/appointments/actions';
import { forwardMonth, backwardMonth } from './stores/calendar/actions';

import DayLabel from './components/DayLabel/DayLabel';
import DateCell from './components/DateCell/DateCell';

import './App.css';
import './datetime.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apptForm: {
        id: '',
        color: '#000000',
        date: '',
        title: ''
      }
    }
  }

  componentDidMount() {
    this.props.fetchAppointments();
  }

  filterAppointments = (date) => {
    return _.sortBy(this.props.appointments.filter(appt => moment(appt.date).isSame(moment(date), 'date')), o => o.date);
  }

  colorChange = (color) => {
    this.setState( prevState => ({
      ...prevState,
      apptForm: {
        ...prevState.apptForm,
        color: color.hex
      }
    }))
  }

  dateChange = (date) => {
    this.setState( prevState => ({
      ...prevState,
      apptForm: {
        ...prevState.apptForm,
        date: date.toString()
      }
    }))
  }

  titleChange = (event) => {
    event.persist();
    this.setState( prevState => ({
      ...prevState,
      apptForm: {
        ...prevState.apptForm,
        title: event.target.value
      }
    }))
  }

  addAppointment = () => {
    this.props.addAppointment({
      ...this.state.apptForm
    });
  }

  render() { 

    const { backwardMonth, forwardMonth } = this.props;
    const { currentMonth, daysOfWeek, dates } = this.props.calendar;
    const { color, date, title } = this.state.apptForm;

    return ( 
      <div>
        <section className="calendar-header">
          <button onClick={backwardMonth}>{moment().month(currentMonth -1).format('MMM')}</button>
          <h2>{moment().month(currentMonth).format('MMMM')}</h2>
          <button onClick={forwardMonth}>{moment().month(currentMonth + 1).format('MMM')}</button>
        </section>

        <section className="calendar-container">
          {daysOfWeek.map(day => <DayLabel title={day} key={day} />)}

          {dates.map( (date, index) => <DateCell date={date.toString()} appointments={this.filterAppointments(date)} key={index} />)}
        </section>

        <h3 className="form-title">Add new appointment</h3>
        <section className="appt-form">
          <div className="form-group">
            <GithubPicker color={color} onChangeComplete={this.colorChange} triangle="hide"/>
          </div>

          <div className="form-group">
            <label>Date &amp; Time</label>
            <DateTime dateFormat="DD/MM/YY" onChange={this.dateChange} />
          </div>

          <div className="form-group">
            <label>Title</label>
            <input type="text" maxLength="30" value={title} onChange={this.titleChange} />
          </div>

          <div className="form-group">
            <button disabled={(!title.length || !date.length)} onClick={this.addAppointment}>Add Appointment</button>
          </div>
        </section>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  appointments: state.appointments.all,
  calendar: state.calendar
});

const mapDispatchToProps = dispatch => ({
  fetchAppointments() {
    dispatch(appointmentsFetchAll())
  },
  addAppointment(appt) {
    dispatch(appointmentsAdd(appt))
  },
  forwardMonth() {
    dispatch(forwardMonth())
  },
  backwardMonth() {
    dispatch(backwardMonth())
  }
})
 
export default connect(mapStateToProps, mapDispatchToProps)(App);