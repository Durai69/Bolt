import React, { useState } from 'react';
import Header from './components/Header';
import PermissionMatrix from './components/PermissionMatrix';
import SummaryPanel from './components/SummaryPanel';
import BulkActions from './components/BulkActions';
import { departments } from './data/mockData';
import { PermissionProvider, usePermissions } from './context/PermissionContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    permissions, 
    summary, 
    hasChanges,
    setPermission, 
    allowAll, 
    revokeAll, 
    saveChanges 
  } = usePermissions();
  
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    try {
      setSaveStatus('saving');
      await saveChanges();
      setSaveStatus('success');
      
      // Reset status after a delay
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      
      // Reset status after a delay
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSave={handleSave} hasChanges={hasChanges} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Status message */}
        {saveStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-800 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Changes saved successfully!</span>
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Error saving changes. Please try again.</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Main matrix */}
            <div className="bg-white rounded-md shadow-sm p-1">
              <PermissionMatrix 
                departments={departments} 
                permissions={permissions}
                onPermissionChange={setPermission}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Summary panel */}
            <SummaryPanel summary={summary} />
            
            {/* Bulk actions */}
            <BulkActions 
              departments={departments}
              onAllowAll={allowAll}
              onRevokeAll={revokeAll}
              selectedDepartment={selectedDepartment}
              onSelectDepartment={setSelectedDepartment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <PermissionProvider departments={departments}>
      <AppContent />
    </PermissionProvider>
  );
}

export default App;