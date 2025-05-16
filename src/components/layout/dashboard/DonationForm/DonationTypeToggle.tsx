import React from 'react';
import { Heart, CalendarClock } from 'lucide-react';

interface DonationTypeToggleProps {
  value: 'oneTime' | 'monthly';
  onChange: (value: 'oneTime' | 'monthly') => void;
}

const DonationTypeToggle: React.FC<DonationTypeToggleProps> = ({ value, onChange }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex p-1 bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => onChange('oneTime')}
          className={`
            flex items-center px-4 py-2 rounded-md transition-all duration-200
            ${value === 'oneTime' 
              ? 'bg-white text-purple-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'}
          `}
        >
          <Heart size={18} className="mr-2" />
          <span className="font-medium">One-time</span>
        </button>
        <button
          type="button"
          onClick={() => onChange('monthly')}
          className={`
            flex items-center px-4 py-2 rounded-md transition-all duration-200
            ${value === 'monthly' 
              ? 'bg-white text-purple-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'}
          `}
        >
          <CalendarClock size={18} className="mr-2" />
          <span className="font-medium">Monthly</span>
        </button>
      </div>
    </div>
  );
};

export default DonationTypeToggle;