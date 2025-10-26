import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { RWP } from '../lib/types';
import rwpsData from '../data/mock_rwps.json';
import AcknowledgeForm from '../components/AcknowledgeForm';
import CameraScan from '../components/CameraScan';
import SignaturePad from '../components/SignaturePad';

/**
 * Collects acknowledgments, badge scanning and signature from the user. Saves the record in
 * localStorage and navigates to the review page.
 */
const AcknowledgePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const rwp = (rwpsData as any as RWP[]).find((r) => r.id === id);

  const [checks, setChecks] = useState({
    readMap: false,
    readEntryReqs: false,
    understandHRA: false,
    friskerAvail: false,
  });
  const [scanValue, setScanValue] = useState('');
  const [signature, setSignature] = useState('');

  if (!rwp) {
    return <div className="p-4">Permit not found</div>;
  }

  const handleSave = () => {
    const acks = JSON.parse(localStorage.getItem('acknowledgments') || '[]');
    acks.push({
      id: Date.now().toString(),
      rwpId: rwp.id,
      areaId: rwp.areaId,
      checks,
      scanValue,
      signature,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('acknowledgments', JSON.stringify(acks));
    navigate(`/review/${rwp.id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Acknowledge</h1>
      <AcknowledgeForm
        checks={checks}
        onChange={(name, value) => setChecks((prev) => ({ ...prev, [name]: value }))}
      />
      <div className="mt-4">
        <CameraScan value={scanValue} onChange={setScanValue} />
      </div>
      <div className="mt-4">
        <p className="mb-2">Signature:</p>
        <SignaturePad onEnd={(url) => setSignature(url)} />
      </div>
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleSave}
      >
        Save
      </button>
      <div className="mt-4">
        <Link
          to={`/entry/${rwp.id}`}
          className="text-blue-600 underline"
        >
          &larr; Back
        </Link>
      </div>
    </div>
  );
};

export default AcknowledgePage;