import { apiRequest } from './api';
import type { Activity, AIInsight, Project, Task, TeamMember } from '../types/workspace';

// These endpoints are ready for the matching backend resources. Current views use workspaceData.ts mock data.
export const workspaceApi = {
  listProjects: () => apiRequest<Project[]>('/projects'),
  createProject: (project: Pick<Project, 'name' | 'description' | 'dueDate'>) => apiRequest<Project>('/projects', { method: 'POST', body: JSON.stringify(project) }),
  updateProject: (id: number, project: Partial<Project>) => apiRequest<Project>(`/projects/${id}`, { method: 'PATCH', body: JSON.stringify(project) }),
  deleteProject: (id: number) => apiRequest<void>(`/projects/${id}`, { method: 'DELETE' }),
  listTasks: () => apiRequest<Task[]>('/tasks'),
  createTask: (task: Omit<Task, 'id'>) => apiRequest<Task>('/tasks', { method: 'POST', body: JSON.stringify(task) }),
  updateTask: (id: number, task: Partial<Task>) => apiRequest<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(task) }),
  deleteTask: (id: number) => apiRequest<void>(`/tasks/${id}`, { method: 'DELETE' }),
  listTeam: () => apiRequest<TeamMember[]>('/team'),
  listActivity: () => apiRequest<Activity[]>('/activity'),
  listInsights: (projectId?: number) => apiRequest<AIInsight[]>(projectId ? `/ai/insights?project_id=${projectId}` : '/ai/insights'),
};
