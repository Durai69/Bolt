import React, { useState } from 'react';
import { Filter, Check, X } from 'lucide-react';
import { Department } from '../types';

interface BulkActionsProps {
  departments: Department[];
  onAllowAll: (departmentId?: string) => void;
  onRevokeAll: (departmentId?: string) => void;
  selectedDepartment: string | null;
  onSelectDepartment: (departmentId: string | null) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  departments,
  onAllowAll,
  onRevokeAll,
  selectedDepartment,
  onSelectDepartment
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
      <h2 className="text-lg font-medium text-gray-800 mb-3">Bulk Actions</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Filter by Department</label>
            {selectedDepartment && (
              <button 
                onClick={() => onSelectDepartment(null)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="mt-1 relative">
            <button
              type="button"
              className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>
                {selectedDepartment 
                  ? departments.find(d => d.id === selectedDepartment)?.name || 'All Departments'
                  : 'All Departments'}
              </span>
              <Filter size={16} className="text-gray-500" />
            </button>
            
            {isOpen && (
              <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <ul className="py-1">
                  <li 
                    key="all"
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                      selectedDepartment === null ? 'bg-blue-50 text-blue-700' : ''
                    }`}
                    onClick={() => {
                      onSelectDepartment(null);
                      setIsOpen(false);
                    }}
                  >
                    All Departments
                  </li>
                  {departments.map(department => (
                    <li 
                      key={department.id}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        selectedDepartment === department.id ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                      onClick={() => {
                        onSelectDepartment(department.id);
                        setIsOpen(false);
                      }}
                    >
                      {department.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onAllowAll(selectedDepartment || undefined)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <Check size={16} className="mr-2" />
            Allow All
          </button>
          
          <button
            onClick={() => onRevokeAll(selectedDepartment || undefined)}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <X size={16} className="mr-2" />
            Revoke All
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;