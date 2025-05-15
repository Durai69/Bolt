import React from 'react';
import { ClipboardCheck } from 'lucide-react';

interface HeaderProps {
  onSave: () => void;
  hasChanges: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSave, hasChanges }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <ClipboardCheck className="h-6 w-6 text-blue-600 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">
            Manage Survey Permissions
          </h1>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button 
            onClick={onSave}
            disabled={!hasChanges}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all
              ${hasChanges 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
            `}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;