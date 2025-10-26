import React from 'react';
import { useParams, Link } from 'react-router-dom';

/**
 * Displays the most recent acknowledgment for the given RWP and allows exporting it to JSON.
 */
const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const acks = JSON.parse(localStorage.getItem('acknowledgments') || '[]');
  const ack = acks.filter((a: any) => a.rwpId === id).slice(-1)[0];

  const exportJson = () => {
    const blob = new Blob([
      JSON.stringify(ack, null, 2),
    ], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ack-${id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!ack) {
    return <div className="p-4">No acknowledgment found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Review Acknowledgment</h1>
      <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">
        {JSON.stringify(ack, null, 2)}
      </pre>
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={exportJson}
      >
        Export JSON
      </button>
      <div className="mt-4">
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ReviewPage;