import { Department, Permission, PermissionMatrix, PermissionSummary } from '../types';

export function createEmptyPermissionMatrix(departments: Department[]): PermissionMatrix {
  const matrix: PermissionMatrix = {};
  
  departments.forEach(fromDept => {
    matrix[fromDept.id] = {};
    departments.forEach(toDept => {
      // Default: all permissions denied, diagonal cells (self-rating) always denied
      matrix[fromDept.id][toDept.id] = false;
    });
  });
  
  return matrix;
}

export function flattenPermissionMatrix(matrix: PermissionMatrix): Permission[] {
  const permissions: Permission[] = [];
  
  Object.entries(matrix).forEach(([fromDepartment, toDepartments]) => {
    Object.entries(toDepartments).forEach(([toDepartment, allowed]) => {
      permissions.push({
        fromDepartment,
        toDepartment,
        allowed
      });
    });
  });
  
  return permissions;
}

export function calculatePermissionSummary(matrix: PermissionMatrix): PermissionSummary {
  let total = 0;
  let allowed = 0;
  
  Object.entries(matrix).forEach(([fromDepartment, toDepartments]) => {
    Object.entries(toDepartments).forEach(([toDepartment, isAllowed]) => {
      // Don't count diagonal cells in the total
      if (fromDepartment !== toDepartment) {
        total++;
        if (isAllowed) {
          allowed++;
        }
      }
    });
  });
  
  const denied = total - allowed;
  const percentage = total > 0 ? Math.round((allowed / total) * 100) : 0;
  
  return {
    total,
    allowed,
    denied,
    percentage
  };
}

export function setAllPermissions(
  matrix: PermissionMatrix, 
  value: boolean, 
  filter?: string
): PermissionMatrix {
  const newMatrix = { ...matrix };
  
  Object.entries(newMatrix).forEach(([fromDepartment, toDepartments]) => {
    if (!filter || fromDepartment === filter) {
      Object.keys(toDepartments).forEach(toDepartment => {
        // Skip diagonal cells (self-ratings)
        if (fromDepartment !== toDepartment) {
          newMatrix[fromDepartment][toDepartment] = value;
        }
      });
    }
  });
  
  return newMatrix;
}