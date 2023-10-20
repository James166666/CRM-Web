import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function DateInput({ inputTitle, selectedDate, setSelectedDate, isEditing }) {
    return (
        <div className="mb-3">
            <label className="form-label">{inputTitle}</label>
            <div>
                <DatePicker 
                    selected={selectedDate} 
                    onChange={date => setSelectedDate(date)}
                    disabled={!isEditing}
                    dateFormat="dd/MM/yyyy"
                    className="form-control input-profile"
                />
            </div>
        </div>
    );
}

export default DateInput;
