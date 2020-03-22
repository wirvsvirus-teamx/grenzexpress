/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
import { Button } from '@material-ui/core';
import React, {
  useEffect, useRef, useState,
} from 'react';

import { IQuestionProps } from '../../types';
import style from './Signature.module.scss';

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent | Touch) {
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
  const canSign = pointCount >= 1 && !answer;
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
      const touchStart = (evt: TouchEvent) => {
        evt.preventDefault();
        startSignature(evt.touches[0]);
      };
      const touchMove = (evt: TouchEvent) => {
        evt.preventDefault();
        updateSignature(evt.changedTouches[0]);
      };
      const touchEnd = (evt: TouchEvent) => {
        evt.preventDefault();
        endSignature(evt.targetTouches[0]);
      };
      const startSignature = (evt: MouseEvent | Touch) => {
        const mousePos = getMousePos(canvas, evt);
        context.beginPath();
        context.moveTo(mousePos.x, mousePos.y);
        started = true;
        setPointCount((p) => p + 1);
      };
      const updateSignature = (evt: MouseEvent | Touch) => {
        if (started) {
          const mousePos = getMousePos(canvas, evt);
          context.lineTo(mousePos.x, mousePos.y);
          context.stroke();
        }
      };
      const endSignature = (evt: MouseEvent | Touch) => {
        if (started) {
          if (evt) {
            const mousePos = getMousePos(canvas, evt);
            context.lineTo(mousePos.x, mousePos.y);
            context.stroke();
          }
          context.drawImage(canvas, 0, 0);
          started = false;
        }
      };
      canvas.addEventListener('touchstart', touchStart);
      canvas.addEventListener('touchmove', touchMove);
      canvas.addEventListener('touchend', touchEnd);
      canvas.addEventListener('mousedown', startSignature);
      canvas.addEventListener('mouseup', endSignature);
      canvas.addEventListener('mousemove', updateSignature);
      return () => {
        canvas.removeEventListener('mousedown', startSignature);
        canvas.removeEventListener('mouseup', endSignature);
        canvas.removeEventListener('mousemove', updateSignature);
        canvas.removeEventListener('touchstart', touchStart);
        canvas.removeEventListener('touchmove', touchMove);
        canvas.removeEventListener('touchend', touchEnd);
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
