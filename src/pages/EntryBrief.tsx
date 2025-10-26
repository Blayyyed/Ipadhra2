import React from 'react';
import { useParams, Link } from 'react-router-dom';
import rwpsData from '../data/mock_rwps.json';
import { RWP } from '../lib/types';

/**
 * Presents the entry requirements for a given work permit (RWP) and links to the acknowledgment page.
 */
const EntryBrief: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const rwp = (rwpsData as any as RWP[]).find((r) => r.id === id);

  if (!rwp) {
    return <div className="p-4">Permit not found</div>;
  }

  const reqs = rwp.entryReqs;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Entry Requirements</h1>
      <ul className="list-disc ml-4 mb-4">
        {reqs.hra && <li>High Radiation Area entry</li>}
        {reqs.fr && <li>Full protective clothing</li>}
        <li>Dosimeter: {reqs.dosimeter}</li>
        {reqs.respirator && <li>Respirator: {reqs.respirator}</li>}
        {reqs.other && reqs.other.map((o, idx) => <li key={idx}>{o}</li>)}
      </ul>
      <Link
        to={`/acknowledge/${rwp.id}`}
        className="text-blue-600 underline"
      >
        Acknowledge and Continue &rarr;
      </Link>
      <div className="mt-4">
        <Link
          to={`/area/${rwp.areaId}`}
          className="text-blue-600 underline"
        >
          &larr; Back
        </Link>
      </div>
    </div>
  );
};

export default EntryBrief;