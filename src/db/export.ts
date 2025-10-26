import { db } from './dexie';

export async function exportJSON() {
  const [acks, areas, rwps] = await Promise.all([
    db.acks.toArray(),
    db.areas.toArray(),
    db.rwps.toArray(),
  ]);
  return { acks, areas, rwps };
}

export async function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}