import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db/dexie';
import { Area } from '../lib/entryTypes';
import { seedMock } from '../db/seed';

/**
 * Landing page where users select a Drywell area. Seeds mock areas if none exist.
 */
const Home: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    (async () => {
      const count = await db.areas.count();
      if (count === 0) {
        await seedMock();
      }
      setAreas(await db.areas.toArray());
    })();
  }, []);

  return (
    <div className="max-w-screen-sm mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Select Drywell Area</h1>
      <p className="text-sm text-slate-600">Choose the area to begin the HRA entry flow.</p>
      <div className="grid gap-3">
        {areas.map((a) => (
          <Link
            key={a.id}
            to={`/map/${a.id}`}
            className="rounded border px-4 py-3 bg-white hover:bg-slate-50"
          >
            {a.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;