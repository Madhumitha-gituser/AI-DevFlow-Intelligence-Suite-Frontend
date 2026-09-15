export type ProjectStatus = 'On track' | 'At risk' | 'Planning';
export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Completed';
export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Workspace {
  id: number;
  name: string;
  description: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  members: string[];
  dueDate: string;
  health: 'Healthy' | 'Watch' | 'Risk';
  color: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  dueDate: string;
  project: string;
}

export interface Activity {
  id: number;
  type: string;
  title: string;
  detail: string;
  actor: string;
  time: string;
  color: string;
}

export interface AIInsight {
  id: number;
  label: string;
  value: string;
  detail: string;
  tone: 'success' | 'warning' | 'info';
}

export interface Notification {
  id: number;
  title: string;
  time: string;
  unread: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  assigned: number;
  completed: number;
  workload: number;
  status: 'Available' | 'Focused' | 'Away';
}
