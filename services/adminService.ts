import { apiRequest } from './api';
import { getToken } from './authService';

export type AdminUser = { id: number; full_name: string; email: string; role: string; is_active: boolean; created_at: string };
export type AdminProject = { id: number; name: string; description: string; manager_id: number | null; manager_name: string | null; members: number; status: string; archived: boolean; start_date: string | null; end_date: string | null; created_at: string };
export type AdminActivity = { id: number; action: string; module: string; status: string; user?: string; created_at: string };
export type AdminTask = { id: number; title: string; description: string; project_id: number; assignee_id: number | null; assignee_name: string | null; status: string; priority: string; due_date: string | null; created_at: string };

const authHeaders = () => ({ Authorization: `Bearer ${getToken() ?? ''}` });

export const adminApi = {
  dashboard: () => apiRequest<{ metrics: { users: number; projects: number; tasks: number; risks: number; repositories: number }; activity: AdminActivity[] }>('/admin/dashboard', { headers: authHeaders() }),
  users: () => apiRequest<AdminUser[]>('/admin/users', { headers: authHeaders() }),
  createUser: (payload: { full_name: string; email: string; password: string; role: string }) => apiRequest<AdminUser>('/admin/users', { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) }),
  updateUser: (id: number, payload: Partial<Pick<AdminUser, 'full_name' | 'role' | 'is_active'>>) => apiRequest<AdminUser>(`/admin/users/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(payload) }),
  deactivateUser: (id: number) => apiRequest<{ ok: boolean }>(`/admin/users/${id}`, { method: 'DELETE', headers: authHeaders() }),
  projects: () => apiRequest<AdminProject[]>('/admin/projects', { headers: authHeaders() }),
  createProject: (payload: { name: string; description: string; manager_id: number | null; status: string; start_date: string | null; end_date: string | null }) => apiRequest<AdminProject>('/admin/projects', { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) }),
  updateProject: (id: number, payload: { name: string; description: string; manager_id: number | null; status: string; start_date: string | null; end_date: string | null }) => apiRequest<AdminProject>(`/admin/projects/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(payload) }),
  archiveProject: (id: number) => apiRequest<{ ok: boolean }>(`/admin/projects/${id}`, { method: 'DELETE', headers: authHeaders() }),
  tasks: () => apiRequest<AdminTask[]>('/admin/tasks', { headers: authHeaders() }),
  createTask: (payload: Omit<AdminTask, 'id' | 'assignee_name' | 'created_at'>) => apiRequest<AdminTask>('/admin/tasks', { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) }),
  updateTask: (id: number, payload: Omit<AdminTask, 'id' | 'assignee_name' | 'created_at'>) => apiRequest<AdminTask>(`/admin/tasks/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(payload) }),
  activity: () => apiRequest<AdminActivity[]>('/admin/activity', { headers: authHeaders() }),
  settings: () => apiRequest<Record<string, boolean>>('/admin/settings', { headers: authHeaders() }),
  updateSettings: (settings: Record<string, boolean>) => apiRequest<Record<string, boolean>>('/admin/settings', { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ settings }) }),
};