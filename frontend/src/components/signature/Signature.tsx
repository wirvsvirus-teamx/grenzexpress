import React, { FunctionComponent, useEffect, useRef } from 'react';

import style from './Signature.module.scss';

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent | Touch) {
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
      const startSignature = (evt: MouseEvent | Touch) => {
        const mousePos = getMousePos(canvas, evt);
        context.beginPath();
        context.moveTo(mousePos.x, mousePos.y);
        started = true;
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
      canvas.addEventListener('touchstart', (evt) => {
        startSignature(evt.touches[0]);
      });
      canvas.addEventListener('touchmove', (evt) => {
        updateSignature(evt.changedTouches[0]);
      });
      canvas.addEventListener('touchend', (evt) => {
        endSignature(evt.targetTouches[0]);
      });
      canvas.addEventListener('mousedown', startSignature);
      canvas.addEventListener('mousemove', updateSignature);
      canvas.addEventListener('mouseup', endSignature);
    }
  });
  return (
    <canvas ref={canvasRef} className={style.border} height="200" id="canvas" width="300">
      <p>Please activate JavaScript.</p>
    </canvas>
  );
};
