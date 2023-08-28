import React, { useRef, useEffect } from 'react';

const Canvas = ({ fileString }: { fileString: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = `data:image/png;base64,${fileString}`;

    img.onload = () => {
      canvas.width = 130;
      canvas.height = 70;
      ctx.drawImage(img, 0, 0, 130, 70);
    };
  }, [fileString]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
