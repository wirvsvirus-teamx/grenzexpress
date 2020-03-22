import {
  Button, Card, CardActionArea, CardActions, CardContent, Typography,
} from '@material-ui/core';
import React, { useRef } from 'react';

import { IQuestionProps } from '../../types';

export const FormInput = ({ answer, setAnswer, question }: IQuestionProps<'upload-form'>) => {
  const input = useRef<HTMLInputElement>(null);
  function checkFile() {
    if (!input || !input?.current?.files || input?.current?.files?.length < 1) return;

    const data = URL.createObjectURL(input.current.files[0]);

    setAnswer({ id: question.id, type: 'upload-form', image: data });
  }

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography component="h2" gutterBottom variant="h5">
            {question.title}
          </Typography>
          <Typography color="textSecondary" component="p" variant="body2">
            {question.description}
          </Typography>
          {answer && <img alt={question.title} src={answer.image} style={{ maxWidth: '300px' }} />}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" variant="outlined" onClick={() => input.current?.click()}>
          {!!answer && 'Anderes '}
          Foto hochladen
        </Button>
        <input ref={input} accept="image/*" capture="environment" id="file-upload" style={{ display: 'none' }} type="file" onChange={checkFile} />
      </CardActions>
    </Card>
  );
};
