/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
import { Button } from '@material-ui/core';
import React, {
  FunctionComponent, useEffect, useRef, useState,
} from 'react';

import { IQuestionProps } from '../../types';
import style from './Signature.module.scss';

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

export const Signature = ({
  question, setAnswer, answer, removeAnswer,
}: IQuestionProps<'signature'>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pointCount, setPointCount] = useState(0);
  const canSign = pointCount >= 2 && !answer;

  function sign() {
    if (!canvasRef.current) return;
    const signature = canvasRef.current.toDataURL();
    setAnswer({
      id: question.id,
      type: 'signature',
      signature,
    });
  }

  useEffect(() => {
    let started = false;
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    if (!canvas.getContext('2d')) {
      return;
    }
    const context = canvas.getContext('2d');
    if (context && !answer) {
      const mousedown = (evt: MouseEvent) => {
        const mousePos = getMousePos(canvas, evt);
        context.beginPath();
        context.moveTo(mousePos.x, mousePos.y);
        started = true;
        setPointCount((p) => p + 1);
      };

      const mousemove = (evt: MouseEvent) => {
        if (started) {
          const mousePos = getMousePos(canvas, evt);
          context.lineTo(mousePos.x, mousePos.y);
          context.stroke();
        }
      };

      const mouseup = (evt: MouseEvent) => {
        if (started) {
          const mousePos = getMousePos(canvas, evt);
          context.lineTo(mousePos.x, mousePos.y);
          context.stroke();
          started = false;
          context.drawImage(canvas, 0, 0);
        }
      };

      canvas.addEventListener('mousedown', mousedown);
      canvas.addEventListener('mouseup', mouseup);
      canvas.addEventListener('mousemove', mousemove);

      return () => {
        canvas.removeEventListener('mousedown', mousedown);
        canvas.removeEventListener('mouseup', mouseup);
        canvas.removeEventListener('mousemove', mousemove);
      };
    }
  }, [answer]);

  // Restore & clear images
  React.useEffect(() => {
    if (canvasRef.current?.getContext('2d')) {
      const context = canvasRef.current?.getContext('2d');

      if (answer) {
        const image = new Image();
        image.onload = () => {
          context?.drawImage(image, 0, 0);
        };
        image.src = `data:image/png;base64${answer.signature}`;
      } else {
        context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  }, [answer, canvasRef]);

  return (
    <>
      <canvas ref={canvasRef} className={style.border} height="200" id="canvas" width="300">
        <p>Please activate JavaScript.</p>
      </canvas>
      <br />
      <br />
      <Button color="secondary" disabled={!answer} variant="contained" onClick={() => { setPointCount(0); removeAnswer(question.id); }}>
        Zurücksetzen
      </Button>
      <Button color="primary" disabled={!canSign} variant="contained" onClick={sign}>
        Signieren
      </Button>
    </>
  );
};
