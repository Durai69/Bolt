import React from 'react';
import { PieChart, CheckCircle, XCircle } from 'lucide-react';
import { PermissionSummary } from '../types';

interface SummaryPanelProps {
  summary: PermissionSummary;
}

const SummaryPanel: React.FC<SummaryPanelProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center mb-3">
        <PieChart className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-medium text-gray-800">Permission Summary</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-3 bg-blue-50 rounded-md">
          <span className="text-sm text-gray-500 mb-1">Total Permissions</span>
          <span className="text-2xl font-semibold text-gray-800">{summary.total}</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-green-50 rounded-md">
          <div className="flex items-center mb-1">
            <CheckCircle size={14} className="text-green-600 mr-1" />
            <span className="text-sm text-gray-500">Allowed</span>
          </div>
          <span className="text-2xl font-semibold text-gray-800">{summary.allowed}</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-red-50 rounded-md">
          <div className="flex items-center mb-1">
            <XCircle size={14} className="text-red-600 mr-1" />
            <span className="text-sm text-gray-500">Restricted</span>
          </div>
          <span className="text-2xl font-semibold text-gray-800">{summary.denied}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Permission Rate</span>
          <span>{summary.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${summary.percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;