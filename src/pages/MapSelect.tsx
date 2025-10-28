// src/pages/MapSelect.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../db/dexie";
import areasJson from "../data/mock_areas.json";

type Area = {
  id: string;
  name: string;
  elevation?: string;
  mapPath?: string;
};

const MapSelect: React.FC = () => {
  const { areaId = "" } = useParams();
  const nav = useNavigate();

  const [area, setArea] = useState<Area | undefined>(undefined);

  // Load from Dexie first, fallback to JSON
  useEffect(() => {
    let active = true;
    (async () => {
      const fromDb = await db.areas.get(String(areaId));
      if (active && fromDb) {
        setArea({
          id: fromDb.id,
          name: fromDb.name,
          elevation: (fromDb as any).elevation,
          mapPath: (fromDb as any).mapPath,
        });
        return;
      }
      // fallback to JSON
      const fromJson = (areasJson as Area[]).find(
        (a) => String(a.id) === String(areaId)
      );
      if (active) setArea(fromJson);
    })();
    return () => {
      active = false;
    };
  }, [areaId]);

  // Canvas + image
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // pin + overhead
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const [overhead, setOverhead] = useState<"yes" | "no" | null>(null);
  const [overheadHeight, setOverheadHeight] = useState<string>("");

  // Load image and draw
  useEffect(() => {
    if (!area) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
    img.src = area.mapPath || "/maps/placeholder.svg";
  }, [area?.mapPath]);

  useEffect(() => {
    draw();
  }, [pin]);

  const draw = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxW = Math.min(960, window.innerWidth - 48);
    const scale = maxW / img.width;
    const w = img.width * scale;
    const h = img.height * scale;

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    if (pin) {
      const px = pin.x * w;
      const py = pin.y * h;
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#e11d48";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#7f1d1d";
      ctx.stroke();
      ctx.restore();
    }
  };

  const onCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = Math.min(1, Math.max(0, x));
    const ry = Math.min(1, Math.max(0, y));
    setPin({ x: rx, y: ry });
  };

  const pinSelected = !!pin;
  const overheadValid =
    overhead === "no" || (overhead === "yes" && overheadHeight.trim() !== "");
  const ready = !!area && pinSelected && overheadValid;

  const handleContinue = () => {
    if (!ready || !area) return;

    const canvas = canvasRef.current;
    let dataUrl: string | undefined = undefined;
    if (canvas) dataUrl = canvas.toDataURL("image/png");

    nav(`/final/${areaId}`, {
      state: {
        areaId: area.id,
        areaName: area.name,
        mapPin: pin,
        mapSnapshotDataUrl: dataUrl,
        overheadNeeded: overhead === "yes",
        overheadHeight:
          overhead === "yes" ? overheadHeight.trim() || null : null,
      },
    });
  };

  if (!area) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">Map Select</h1>
        <p>Area not found.</p>
        <Link to="/" className="text-blue-600">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">{area.name}</h1>
        <div className="text-sm flex gap-4">
          <Link to="/" className="text-blue-600">Back</Link>
          <Link to="/admin" className="text-blue-600">Admin</Link>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white border rounded p-4">
        <canvas
          ref={canvasRef}
          onClick={onCanvasClick}
          className="w-full rounded border bg-slate-200"
          style={{ cursor: "crosshair" }}
        />
        {!pinSelected && (
          <p className="text-sm text-slate-600 mt-2">
            Tap your work location on the map to continue.
          </p>
        )}
      </div>

      {/* Overhead */}
      <div className="bg-white border rounded p-4 space-y-2">
        <p className="font-medium">Overhead needed?</p>
        <div className="flex flex-wrap items-center gap-6">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="overhead"
              value="no"
              checked={overhead === "no"}
              onChange={() => {
                setOverhead("no");
                setOverheadHeight("");
              }}
            />
            <span>No</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              name="overhead"
              value="yes"
              checked={overhead === "yes"}
              onChange={() => setOverhead("yes")}
            />
            <span>Yes</span>
          </label>

          {overhead === "yes" && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                step="0.1"
                className="border rounded px-2 py-1 w-28"
                placeholder="Height"
                value={overheadHeight}
                onChange={(e) => setOverheadHeight(e.target.value)}
              />
              <span className="text-sm text-slate-500">ft (approx.)</span>
            </div>
          )}
        </div>

        {overhead === "yes" && !overheadHeight && (
          <p className="text-xs text-rose-600 mt-1">
            Enter an approximate height.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!ready}
          className={`px-4 py-2 rounded text-white ${
            ready ? "bg-blue-600 hover:bg-blue-700" : "bg-slate-400"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MapSelect;
