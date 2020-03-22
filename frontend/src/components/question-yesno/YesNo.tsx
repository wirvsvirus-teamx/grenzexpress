import { Button, ButtonGroup } from '@material-ui/core';
import * as React from 'react';

import { IQuestionProps } from '../../types';

export const YesNo = ({ question, setAnswer, answer }: IQuestionProps<'yes-no'>) => (
  <div>
    <div>{question.question}</div>
    <ButtonGroup color="primary" style={{ marginTop: '5px' }} variant="text">
      <Button
        disabled={answer && answer.yes}
        type="button"
        onClick={() => setAnswer({
          type: 'yes-no',
          id: question.id,
          yes: true,
        })}
      >
        Ja
      </Button>
      <Button
        disabled={answer && !answer.yes}
        type="button"
        onClick={() => setAnswer({
          type: 'yes-no',
          id: question.id,
          yes: false,
        })}
      >
        Nein
      </Button>
    </ButtonGroup>
  </div>
);
