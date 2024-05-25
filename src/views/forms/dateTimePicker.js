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
export const FormDatePicker = ({ value, setAddData, formDateError, setFormDateError, label = 'Enter Date', name = 'Date', ...props }) => {
    const handleDateChange = (date) => {
        if (date && moment(date).isValid()) {
            const momentDate = moment(date).format('YYYY-MM-DD');
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: momentDate }));
            setFormDateError('');
        } else {
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: '' }));
            setFormDateError('Invalid Date');
        }
    };

    return (
        <>
            <CFormLabel><strong>{label}</strong></CFormLabel>
            <DatePicker
                value={value}
                onChange={handleDateChange}
                name={name}
                className={formDateError ? 'is-invalid' : ''}
            />
            {formDateError && <div className="invalid-feedback d-block">{formDateError}</div>}
        </>
    );
};

// time picker
export const FormTimePicker = ({ value, setAddData, formTimeError, setFormTimeError, label = 'Enter Time', name = 'Time', ...props }) => {
    const handleTimeChange = (time) => {
        if (moment(time).isValid()) {
            const momentTime = moment(time).format('HH:mm');
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: momentTime }));
            setFormTimeError('');
        } else {
            setAddData((prevData) => ({ ...prevData, [props?.formKeyName]: '' }));
            setFormTimeError('Invalid Time');
        }
    };

    return (
        <>
            <CFormLabel><strong>{label}</strong></CFormLabel>
            <TimePicker
                value={value}
                onChange={handleTimeChange}
                name={name}
                className={formTimeError ? 'is-invalid' : ''}
            />
            {formTimeError && <div className="invalid-feedback d-block">{formTimeError}</div>}
        </>
    );
};