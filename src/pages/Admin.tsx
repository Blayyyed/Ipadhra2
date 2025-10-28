// src/pages/Admin.tsx
import React, { useEffect, useState } from "react";
import { db } from "../db/dexie";
import { EntryRecord, Area } from "../lib/entryTypes";
import { useAuth } from "../auth/AuthContext";

type AreaOption = { id: string; name: string; mapPath?: string };

const AdminPage: React.FC = () => {
  const { logout } = useAuth();

  // entries and areas
  const [pending, setPending] = useState<EntryRecord[]>([]);
  const [areas, setAreas] = useState<AreaOption[]>([]);

  // update maps modal state
  const [showUpdateMaps, setShowUpdateMaps] = useState(false);
  const [selectedAreaId, setSelectedAreaId] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [incomingDataUrl, setIncomingDataUrl] = useState<string | undefined>(
    undefined
  );
  const [saving, setSaving] = useState(false);

  const loadAreas = async () => {
    const all = await db.areas.toArray();
    all.sort((a, b) => a.name.localeCompare(b.name));
    setAreas(all.map((a) => ({ id: a.id, name: a.name, mapPath: a.mapPath })));
  };

  const refreshEntries = async () => {
    const rows = await db.entries
      .where("status")
      .equals("entry_pending")
      .reverse()
      .sortBy("timestamp");
    setPending(rows);
  };

  useEffect(() => {
    refreshEntries();
    loadAreas();
  }, []);

  const clearAll = async () => {
    await db.entries.clear();
    await refreshEntries();
  };

  // ==== Update Maps modal helpers ====
  const openUpdateMaps = () => {
    setSelectedAreaId("");
    setPreviewUrl(undefined);
    setIncomingDataUrl(undefined);
    setShowUpdateMaps(true);
  };

  const closeUpdateMaps = () => {
    setShowUpdateMaps(false);
  };

  const onAreaChange = (val: string) => {
    setSelectedAreaId(val);
    const found = areas.find((a) => a.id === val);
    setPreviewUrl(found?.mapPath);
    setIncomingDataUrl(undefined);
  };

  const onFile = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setIncomingDataUrl(dataUrl);
      setPreviewUrl(dataUrl); // show new preview immediately
    };
    reader.readAsDataURL(file);
  };

  const saveMap = async () => {
    if (!selectedAreaId || !incomingDataUrl) return;
    setSaving(true);
    try {
      await db.areas.update(selectedAreaId, { mapPath: incomingDataUrl });
      await loadAreas();
      setShowUpdateMaps(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* controls */}
      <div className="flex gap-3">
        <button
          onClick={openUpdateMaps}
          className="px-3 py-2 rounded border bg-white hover:bg-slate-50"
        >
          Update Maps
        </button>
        <button
          onClick={refreshEntries}
          className="px-3 py-2 rounded border bg-white hover:bg-slate-50"
        >
          Refresh Queue
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-2 rounded border text-red-600 bg-white hover:bg-slate-50"
        >
          Clear All Entries
        </button>
      </div>

      {/* list */}
      <h2 className="text-xl font-semibold">Entry Pending</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {pending.map((p) => (
          <div key={p.id} className="bg-white border rounded p-3">
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-semibold">{p.areaName}</div>
                <div className="text-xs text-slate-600">
                  {new Date(p.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-right">
                {/* Badges: comma-separated */}
                {p.badges?.length ? (
                  <div>
                    Badges: <b>{p.badges.join(", ")}</b>
                  </div>
                ) : (
                  <div>
                    Badges: <b>—</b>
                  </div>
                )}
                <div>
                  WO: <b>{p.workOrder}</b>
                </div>
                {p.overheadNeeded !== undefined && (
                  <div>
                    Overhead:{" "}
                    <b>
                      {p.overheadNeeded
                        ? `Yes${p.overheadHeight ? ` (${p.overheadHeight} ft)` : ""}`
                        : "No"}
                    </b>
                  </div>
                )}
              </div>
            </div>

            {p.mapSnapshotDataUrl && (
              <img
                src={p.mapSnapshotDataUrl}
                className="mt-2 rounded border"
                alt="Map snapshot"
              />
            )}
          </div>
        ))}
      </div>

      {/* ---- Update Maps modal ---- */}
      {showUpdateMaps && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[680px] max-w-[90vw]">
            <div className="px-5 py-3 border-b flex justify-between items-center">
              <h3 className="font-semibold">Update Map Image</h3>
              <button
                className="text-sm text-slate-600 hover:text-black"
                onClick={closeUpdateMaps}
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Area selector */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Choose an area
                </label>
                <select
                  value={selectedAreaId}
                  onChange={(e) => onAreaChange(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                >
                  <option value="">— Select an area —</option>
                  {areas.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Current / new preview */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">Preview</label>
                <div className="border rounded bg-slate-100 p-2">
                  {previewUrl ? (
                    <img src={previewUrl} className="max-h-[320px] mx-auto" />
                  ) : (
                    <div className="text-sm text-slate-500 p-8 text-center">
                      Select an area to preview its current map.
                    </div>
                  )}
                </div>
              </div>

              {/* File input */}
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Upload new map image (PNG/JPG)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-xs text-slate-500">
                  The image will be stored in the browser’s database and used
                  for this area going forward.
                </p>
              </div>
            </div>

            <div className="px-5 py-3 border-t flex justify-end gap-2">
              <button
                className="px-3 py-2 rounded border bg-white hover:bg-slate-50"
                onClick={closeUpdateMaps}
              >
                Cancel
              </button>
              <button
                disabled={!selectedAreaId || !incomingDataUrl || saving}
                onClick={saveMap}
                className={`px-3 py-2 rounded text-white ${
                  !selectedAreaId || !incomingDataUrl || saving
                    ? "bg-slate-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
