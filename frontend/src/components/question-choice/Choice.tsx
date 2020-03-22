import './Choice.scss';

import {
  FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,
} from '@material-ui/core';
import * as React from 'react';

import { IQuestionProps } from '../../types';

export const ChoiceInput = ({ question, setAnswer, answer }: IQuestionProps<'multiple-choice'>) => (
  <div className="choice-input-group">
    <FormControl component="fieldset">
      <FormLabel component="legend">{question.question}</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={!!answer && answer.choice} onChange={(e) => setAnswer({ id: question.id, type: 'multiple-choice', choice: e.target.value })}>
        {question.choices.map((choice) => (
          <FormControlLabel
            key={choice}
            control={<Radio />}
            label={choice}
            value={choice}
          />
        ))}
      </RadioGroup>
    </FormControl>
  </div>
);
