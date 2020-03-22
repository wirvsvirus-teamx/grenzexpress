import './Choice.scss';

import { Button, ButtonGroup } from '@material-ui/core';
import * as React from 'react';

import { IQuestionProps } from '../../types';

export const ChoiceInput = ({ question, setAnswer, answer }: IQuestionProps<'multiple-choice'>) => (
  <div className="choice-input-group">
    <div className="question">{question.question}</div>
    <ButtonGroup color="primary" variant="text">
      {question.choices.map((choice) => (
        <Button
          disabled={answer && answer.choice === choice}
          type="button"
          onClick={() => setAnswer({
            type: 'multiple-choice',
            id: question.id,
            choice,
          })}
        >
          {choice}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);
