import React from 'react';

export interface AcknowledgeFormProps {
  checks: { [key: string]: boolean };
  onChange: (name: string, value: boolean) => void;
}

const items = [
  { name: 'readMap', label: 'I have reviewed the map' },
  { name: 'readEntryReqs', label: 'I have read the entry requirements' },
  { name: 'understandHRA', label: 'I understand this is an HRA' },
  { name: 'friskerAvail', label: 'A frisker is available' },
];

/**
 * Renders acknowledgment checkboxes for the user to confirm understanding.
 */
const AcknowledgeForm: React.FC<AcknowledgeFormProps> = ({ checks, onChange }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.name} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={checks[item.name]}
              onChange={(e) => onChange(item.name, e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">{item.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default AcknowledgeForm;