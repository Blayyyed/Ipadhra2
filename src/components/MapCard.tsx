import React from 'react';
import { Area } from '../lib/types';

export interface MapCardProps {
  area: Area;
}

/**
 * Displays basic information about an area including its map image and dose rates.
 */
const MapCard: React.FC<MapCardProps> = ({ area }) => {
  return (
    <div className="border rounded shadow p-4">
      <h2 className="font-bold mb-2">{area.name}</h2>
      <img
        src={area.mapPath}
        alt={`Map of ${area.name}`}
        className="w-full mb-2"
      />
      <p>Dose Rate: {area.doseRate_mrem_hr} mrem/hr</p>
      {area.contamination_cpm && (
        <p>Contamination: {area.contamination_cpm} cpm</p>
      )}
    </div>
  );
};

export default MapCard;