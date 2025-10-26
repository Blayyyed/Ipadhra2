import React, { useEffect, useState } from 'react';
import { db } from '../db/dexie';
import { EntryRecord } from '../lib/entryTypes';
import { seedMock } from '../db/seed';

const AdminPage: React.FC = () => {
  const [pending, setPending] = useState<EntryRecord[]>([]);

  const refresh = async () => {
    const rows = await db.entries.where('status').equals('entry_pending').reverse().sortBy('timestamp');
    setPending(rows);
  };

  useEffect(() => {
    refresh();
  }, []);

  const clearAll = async () => {
    await db.entries.clear();
    await refresh();
  };

  const seed = async () => {
    await seedMock();
    await refresh();
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin</h1>

      <div className="flex gap-3">
        <button onClick={seed} className="px-3 py-2 rounded border">Seed Areas</button>
        <button onClick={refresh} className="px-3 py-2 rounded border">Refresh Queue</button>
        <button onClick={clearAll} className="px-3 py-2 rounded border text-red-600">Clear All Entries</button>
      </div>

      <h2 className="text-xl font-semibold">Entry Pending</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {pending.map(p => (
          <div key={p.id} className="border rounded p-3 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.areaName}</div>
                <div className="text-xs text-slate-600">{new Date(p.timestamp).toLocaleString()}</div>
              </div>
              <div className="text-xs">
                Badge: <b>{p.badge}</b>
                <br />
                WO: <b>{p.workOrder}</b>
              </div>
            </div>
            <img src={p.mapSnapshotDataUrl} className="mt-2 rounded border" alt="Selection" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;