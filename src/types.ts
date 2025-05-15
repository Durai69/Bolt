export interface Department {
  id: string;
  name: string;
  shortName?: string; // For mobile/compact views
}

export interface Permission {
  fromDepartment: string;
  toDepartment: string;
  allowed: boolean;
}

export type PermissionMatrix = Record<string, Record<string, boolean>>;

export interface PermissionSummary {
  total: number;
  allowed: number;
  denied: number;
  percentage: number;
}