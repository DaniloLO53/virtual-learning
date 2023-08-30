import React from 'react';

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calendar({ day, handleDay }: any) {
  let footer = <p>Please pick a day.</p>;
  if (day) {
    footer = <p>You picked {format(day, 'PP')}.</p>;
  }
  return (
    <DayPicker
      mode="single"
      selected={day}
      onSelect={handleDay}
      footer={footer}
    />
  );
}