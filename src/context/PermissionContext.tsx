import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Department, PermissionMatrix, PermissionSummary } from '../types';
import { 
  createEmptyPermissionMatrix, 
  calculatePermissionSummary,
  setAllPermissions
} from '../utils/permissions';

interface PermissionContextType {
  permissions: PermissionMatrix;
  summary: PermissionSummary;
  hasChanges: boolean;
  setPermission: (fromDept: string, toDept: string, value: boolean) => void;
  allowAll: (departmentId?: string) => void;
  revokeAll: (departmentId?: string) => void;
  saveChanges: () => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

interface PermissionProviderProps {
  children: ReactNode;
  departments: Department[];
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ 
  children, 
  departments 
}) => {
  const [permissions, setPermissions] = useState<PermissionMatrix>(
    createEmptyPermissionMatrix(departments)
  );
  const [savedPermissions, setSavedPermissions] = useState<PermissionMatrix>(
    createEmptyPermissionMatrix(departments)
  );
  const [summary, setSummary] = useState<PermissionSummary>(
    calculatePermissionSummary(permissions)
  );
  
  const hasChanges = JSON.stringify(permissions) !== JSON.stringify(savedPermissions);

  useEffect(() => {
    // Update summary whenever permissions change
    setSummary(calculatePermissionSummary(permissions));
  }, [permissions]);

  const setPermission = (fromDept: string, toDept: string, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [fromDept]: {
        ...prev[fromDept],
        [toDept]: value
      }
    }));
  };

  const allowAll = (departmentId?: string) => {
    setPermissions(prev => setAllPermissions(prev, true, departmentId));
  };

  const revokeAll = (departmentId?: string) => {
    setPermissions(prev => setAllPermissions(prev, false, departmentId));
  };

  const saveChanges = () => {
    // In a real app, you would send permissions to the server here
    console.log('Saving permissions:', permissions);
    
    // Update saved state
    setSavedPermissions(JSON.parse(JSON.stringify(permissions)));
    
    // Mock API call
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  return (
    <PermissionContext.Provider 
      value={{
        permissions,
        summary,
        hasChanges,
        setPermission,
        allowAll,
        revokeAll,
        saveChanges
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
};