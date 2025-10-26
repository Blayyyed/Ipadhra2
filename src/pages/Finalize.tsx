import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../db/dexie';
import { EntryRecord } from '../lib/entryTypes';

const Finalize: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const nav = useNavigate();
  const [badge, setBadge] = useState('');
  const [wo, setWo] = useState('');
  const [selection, setSelection] = useState<any>(null);

  useEffect(() => {
    const sel = sessionStorage.getItem('mapSelection');
    setSelection(sel ? JSON.parse(sel) : null);
  }, []);

  const onSubmit = async () => {
    if (!selection) return;
    const rec: EntryRecord = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      areaId: selection.areaId,
      areaName: selection.areaName,
      spotX: selection.spotX,
      spotY: selection.spotY,
      mapSnapshotDataUrl: selection.mapSnapshotDataUrl,
      badge,
      workOrder: wo,
      status: 'entry_pending',
      deviceInfo: navigator.userAgent,
      appVersion: 'v0',
    };
    await db.entries.add(rec);
    sessionStorage.removeItem('mapSelection');
    nav('/thanks');
  };

  if (!selection) {
    return (
      <div className="p-6">
        <p>
          Missing map selection.{' '}
          <Link className="text-blue-600" to="/">
            Start over
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Finalize Entry</h1>
        <Link to={`/map/${areaId}`} className="text-sm text-blue-600">
          Back
        </Link>
      </div>

      <img
        src={selection.mapSnapshotDataUrl}
        alt="Selected spot"
        className="border rounded w-full"
      />

      <div className="space-y-3">
        <label className="block text-sm">
          Badge
          <input
            value={badge}
            onChange={e => setBadge(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="Scan or type badge #"
          />
        </label>
        <label className="block text-sm">
          Work Order #
          <input
            value={wo}
            onChange={e => setWo(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="WO-123456"
          />
        </label>
      </div>

      <button
        onClick={onSubmit}
        disabled={!badge || !wo}
        className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
      >
        Submit (sets status: entry_pending)
      </button>

      <p className="text-sm text-slate-600">
        Your group will appear in the <b>Entry Pending</b> queue.
      </p>
    </div>
  );
};

export default Finalize;