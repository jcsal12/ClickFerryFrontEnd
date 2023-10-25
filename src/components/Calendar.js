import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../components/Calendar.css";

function Calendario() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Realiza una llamada a la API de Java para obtener los días habilitados
    fetch('http://localhost:8080/available-departures?route=ALGECEUT')
      .then((response) => response.json())
      .then((data) => {
        const dates = data.map((item) => new Date(item.time));
        setAvailableDates(dates);
      });
  }, []);

  const isDateAvailable = (date) => {
    return availableDates.some((availableDate) => {
      return (
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className='calendar-container'>
      <div className='centered-calendar'>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileDisabled={({ date }) => !isDateAvailable(date)}
          view='month'
        />
        <button className="confirm-button">CONFIRMAR</button>
      </div>
    </div>
  );
}

export default Calendario;
