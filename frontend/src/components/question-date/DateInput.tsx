import { FormControl, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { IQuestionProps } from '../../../../shared/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    marginRight: theme.spacing(1),
    minWidth: 90,
  },
}));

export const DateInput = ({ question, answer, setAnswer }: IQuestionProps<'date-input'>) => {
  const classes = useStyles();
  const [year, setYear] = useState<number | false | undefined>(
    () => (!!answer && !!answer.value && new Date(answer.value).getFullYear()),
  );
  const [month, setMonth] = useState<number | false | undefined>(
    () => (!!answer && !!answer.value && new Date(answer.value).getMonth() + 1),
  );
  const [day, setDay] = useState<number | false | undefined>(
    () => (!!answer && !!answer.value && new Date(answer.value).getDate()),
  );

  const value = answer?.value;

  useEffect(() => {
    if (
      typeof year === 'number'
      && typeof month === 'number'
      && typeof day === 'number'
      && new Date(year, month - 1, day).getTime().toString() !== value
    ) {
      setAnswer({
        id: question.id,
        type: 'date-input',
        value: new Date(year, month - 1, day).getTime().toString(),
      });
    }
  }, [year, month, day, setAnswer, question.id, value]);

  type SelectChangeEvent = ChangeEvent<{ value: any }>;

  const handleDayChange = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const generateYears = () => {
    const years = [];
    for (let i = 2020; i > 1900; i--) {
      years.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return years;
  };

  const generateMonth = () => {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return months;
  };

  const generateDay = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return days;
  };

  return (
    <div>
      <p>Geburtsdatum:</p>
      <FormControl className={classes.formControl}>
        <InputLabel id="day-label">Tag</InputLabel>
        <Select
          id="day"
          labelId="day-label"
          value={day || ''}
          onChange={handleDayChange}
        >
          {generateDay()}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="month-label">Monat</InputLabel>
        <Select
          id="month"
          labelId="month-label"
          value={month || ''}
          onChange={handleMonthChange}
        >
          {generateMonth()}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="year-label">Jahr</InputLabel>
        <Select
          id="year"
          labelId="year-label"
          value={year || ''}
          onChange={handleYearChange}
        >
          {generateYears()}
        </Select>
      </FormControl>
    </div>
  );
};
