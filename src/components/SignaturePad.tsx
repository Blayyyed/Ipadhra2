import React, { useRef } from 'react';

export interface SignaturePadProps {
  onEnd?: (dataUrl: string) => void;
}

/**
 * A very simple signature pad implemented using a canvas. Users can draw
 * their signature with a mouse or finger. When they lift the pointer,
 * the dataURL is emitted via the onEnd callback. Includes a clear button.
 */
const SignaturePad: React.FC<SignaturePadProps> = ({ onEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    drawing.current = true;
    draw(e);
  };

  const endDraw = () => {
    drawing.current = false;
    if (canvasRef.current && onEnd) {
      const dataUrl = canvasRef.current.toDataURL();
      onEnd(dataUrl);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="border w-full"
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseOut={endDraw}
        onMouseMove={draw}
        onTouchStart={startDraw}
        onTouchEnd={endDraw}
        onTouchCancel={endDraw}
        onTouchMove={draw}
      ></canvas>
      <button
        type="button"
        className="mt-2 px-4 py-2 border rounded"
        onClick={clear}
      >
        Clear
      </button>
    </div>
  );
};

export default SignaturePad;