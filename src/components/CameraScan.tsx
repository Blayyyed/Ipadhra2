import React from 'react';

export interface CameraScanProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * A simple placeholder for a camera/QR scanner. In this manual scaffold it
 * falls back to a text input. Replace with a real scanner implementation
 * (e.g. zxing-js) in your production build.
 */
const CameraScan: React.FC<CameraScanProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Badge / QR Code
      </label>
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Scan or enter badge"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CameraScan;