'use client';
import React from 'react';
import AppDatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import weekends from 'react-multi-date-picker/plugins/highlight_weekends';

const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const handleChange = (date: DateObject | DateObject[] | null) => {
    if (date && !Array.isArray(date) && date.isValid) {
      const formattedDate = date.format('YYYY-MM-DD');
      onChange(formattedDate);
    } else {
      onChange('');
    }
  };

  let parsedValue: DateObject | null = null;
  if (value) {
    parsedValue = new DateObject({
      date: value,
      calendar: persian,
      locale: persian_fa,
    });
    if (!parsedValue.isValid) {
      parsedValue = null;
    }
  }

  return (
    <AppDatePicker
      value={parsedValue}
      onChange={handleChange}
      placeholder='- - / - -/ - -'
      calendar={persian}
      locale={persian_fa}
      className='rmdp-mobile purple bg-dark'
      weekDays={weekDays}
      monthYearSeparator='|'
      style={{
        color: 'white',
        backgroundColor: '#1a1a1a1a',
        height: '24px',
        width: '100%',
        borderRadius: '8px',
        fontSize: '14px',
        padding: '3px 10px',
      }}
      plugins={[weekends()]}
    />
  );
}
