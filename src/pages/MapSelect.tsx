import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../db/dexie';
import { Area } from '../lib/entryTypes';

function drawPin(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

const MapSelect: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const nav = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [area, setArea] = useState<Area | null>(null);
  const [rel, setRel] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    (async () => {
      if (!areaId) return;
      const a = await db.areas.get(areaId);
      setArea(a || null);
    })();
  }, [areaId]);

  useEffect(() => {
    const cvs = canvasRef.current;
    const img = imgRef.current;
    if (!cvs || !img) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const render = () => {
      cvs.width = img.naturalWidth;
      cvs.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      if (rel) {
        drawPin(ctx, rel.x * cvs.width, rel.y * cvs.height);
      }
    };
    if (img.complete) render();
    else img.onload = render;
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [rel, area]);

  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRel({ x, y });
  };

  const onNext = async () => {
    if (!area || !rel || !canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    sessionStorage.setItem(
      'mapSelection',
      JSON.stringify({
        areaId: area.id,
        areaName: area.name,
        spotX: rel.x,
        spotY: rel.y,
        mapSnapshotDataUrl: dataUrl,
      }),
    );
    nav(`/final/${area.id}`);
  };

  if (!area) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{area.name}</h1>
        <Link to="/" className="text-sm text-blue-600">
          Back
        </Link>
      </div>

      <div className="border rounded overflow-auto bg-slate-100">
        <img ref={imgRef} src={area.mapPath} alt={area.name} className="hidden" />
        <canvas
          ref={canvasRef}
          onClick={onClick}
          className="w-full h-auto block cursor-crosshair"
          title="Tap to drop pin"
        />
      </div>

      <div className="flex gap-3">
        <button
          disabled={!rel}
          onClick={onNext}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          Continue
        </button>
        <span className="text-sm text-slate-600">
          Tap your work location on the map to continue.
        </span>
      </div>
    </div>
  );
};

export default MapSelect;