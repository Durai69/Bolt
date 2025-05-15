import React from 'react';
import { Department, PermissionMatrix } from '../types';
import Checkbox from './Checkbox';
import { Info } from 'lucide-react';

interface PermissionMatrixProps {
  departments: Department[];
  permissions: PermissionMatrix;
  onPermissionChange: (fromDept: string, toDept: string, value: boolean) => void;
}

const PermissionMatrixComponent: React.FC<PermissionMatrixProps> = ({
  departments,
  permissions,
  onPermissionChange
}) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200 bg-gray-50 sticky left-0 z-20">
              Department
            </th>
            {departments.map(dept => (
              <th 
                key={dept.id}
                className="p-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[140px]"
              >
                <div className="flex flex-col items-center">
                  <span className="hidden sm:block">{dept.name}</span>
                  <span className="sm:hidden">{dept.shortName || dept.name}</span>
                  <span className="text-xs text-gray-400 font-normal normal-case mt-1">
                    To Be Rated
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200 bg-white">
          {departments.map(fromDept => (
            <tr key={fromDept.id} className="hover:bg-gray-50">
              <td className="p-4 text-sm font-medium text-gray-900 border-r border-gray-200 bg-gray-50 sticky left-0">
                <div className="flex flex-col">
                  <span>{fromDept.name}</span>
                  <span className="text-xs text-gray-500">Surveying Department</span>
                </div>
              </td>
              
              {departments.map(toDept => {
                const isSameDepartment = fromDept.id === toDept.id;
                const isAllowed = permissions[fromDept.id]?.[toDept.id] || false;
                
                return (
                  <td 
                    key={toDept.id}
                    className={`
                      p-4 text-center border-r border-gray-100
                      ${isSameDepartment ? 'bg-gray-100' : ''}
                      group relative
                    `}
                  >
                    {isSameDepartment ? (
                      <div className="flex items-center justify-center">
                        <Checkbox 
                          checked={false}
                          onChange={() => {}}
                          disabled={true}
                          label="Self-rating not allowed"
                        />
                        <div className="hidden group-hover:flex items-center absolute left-full ml-2 z-30 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                          <Info size={12} className="mr-1" />
                          Self-rating not allowed
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <Checkbox 
                          checked={isAllowed}
                          onChange={() => onPermissionChange(fromDept.id, toDept.id, !isAllowed)}
                          label={`${isAllowed ? 'Allowed' : 'Not allowed'}: ${fromDept.name} → ${toDept.name}`}
                        />
                        <div className="hidden group-hover:flex items-center absolute top-full left-1/2 transform -translate-x-1/2 mt-1 z-30 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none">
                          {isAllowed ? 'Click to revoke permission' : 'Click to allow permission'}
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionMatrixComponent;