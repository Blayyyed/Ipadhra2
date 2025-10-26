import { db } from './dexie';

// Drywell area definitions
const DW = [
  { id: 'DW-100', name: "100' Drywell", mapPath: '/maps/dw100.png' },
  { id: 'DW-114', name: "114' Drywell", mapPath: '/maps/dw114.png' },
  { id: 'DW-147', name: "147' Drywell", mapPath: '/maps/dw147.png' },
  { id: 'DW-161', name: "161' Drywell", mapPath: '/maps/dw161.png' },
  { id: 'DW-MISC', name: 'Drywell Misc', mapPath: '/maps/dw-misc.png' },
];

export async function seedMock() {
  await db.transaction('rw', db.areas, db.entries, async () => {
    await db.entries.clear();
    await db.areas.clear();
    await db.areas.bulkAdd(DW as any);
  });
}