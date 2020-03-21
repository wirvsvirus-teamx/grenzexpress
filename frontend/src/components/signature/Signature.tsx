import React, { FunctionComponent, useEffect, useRef } from 'react';

import style from './Signature.module.scss';

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

export const Signature: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    if (context) {
      canvas.addEventListener('mousedown', (evt) => {
        const mousePos = getMousePos(canvas, evt);
        context.beginPath();
        context.moveTo(mousePos.x, mousePos.y);
        started = true;
      });

      canvas.addEventListener('mousemove', (evt) => {
        if (started) {
          const mousePos = getMousePos(canvas, evt);
          context.lineTo(mousePos.x, mousePos.y);
          context.stroke();
        }
      });

      canvas.addEventListener('mouseup', (evt) => {
        if (started) {
          const mousePos = getMousePos(canvas, evt);
          context.lineTo(mousePos.x, mousePos.y);
          context.stroke();
          started = false;
          context.drawImage(canvas, 0, 0);
        }
      });
    }
  });

  return (
    <canvas ref={canvasRef} className={style.border} height="200" id="canvas" width="300">
      <p>Please activate JavaScript.</p>
    </canvas>
  );
};
