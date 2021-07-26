import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import React from 'react';

function Cal({range}){
    const range_date = [new Date(range[0]),new Date(range[1])]

    return (
        <>
            
            <Calendar 
                value={range_date}
                calendarType="Arabic"
            />
        </>
    )
}

export default Cal;