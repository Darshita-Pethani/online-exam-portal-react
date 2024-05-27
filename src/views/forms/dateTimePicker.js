import React from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { CFormLabel } from '@coreui/react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

//date picker
export const FormDatePicker = ({ value, setAddData, error, setError, label = 'Enter Date', name = 'Date', ...props }) => {
    const handleDateChange = (date) => {
        if (date && moment(date).isValid()) {
            const momentDate = moment(date).format('YYYY-MM-DD');
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: momentDate }));
            setError('');
        } else {
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: '' }));
            setError('Invalid Date');
        }
    };

    return (
        <>
            <CFormLabel><strong>{label}</strong></CFormLabel>
            <DatePicker
                value={value}
                onChange={handleDateChange}
                name={name}
                className={error ? 'is-invalid' : ''}
            />
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </>
    );
};

// time picker
export const FormTimePicker = ({ value, setAddData, error, setError, label = 'Enter Time', name = 'Time', ...props }) => {
    const handleTimeChange = (time) => {
        console.log('time: ', time);

        if (time && moment(time, 'HH:mm', true).isValid()) {
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: time }));
            setError('');
        } else {
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: '' }));
            setError('Invalid Time');
        }
    };

    return (
        <>
            <CFormLabel><strong>{label}</strong></CFormLabel>
            <TimePicker
                value={value}
                onChange={handleTimeChange}
                name={name}
                className={error ? 'is-invalid' : ''}
            />
            {error && <div className="invalid-feedback d-block">{error}</div>}
        </>
    );
};