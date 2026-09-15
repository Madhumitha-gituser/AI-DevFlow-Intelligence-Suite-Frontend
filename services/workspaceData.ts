import type { Activity, AIInsight, Project, Task, TeamMember, User, Workspace } from '../types/workspace';

export const currentUser: User = { id: 1, name: 'Kavya Iyer', email: 'kavya@example.com', role: 'Engineering lead', avatar: 'KI' };
export const workspace: Workspace = { id: 1, name: 'Northstar Engineering', description: 'Product engineering workspace' };

export const projects: Project[] = [
  { id: 1, name: 'DevFlow Intelligence', description: 'Operational intelligence for high-velocity engineering teams.', status: 'On track', progress: 74, members: ['KI', 'AM', 'JR', 'SL'], dueDate: 'Oct 18, 2026', health: 'Healthy', color: '#278f87' },
  { id: 2, name: 'Mobile release 2.4', description: 'Performance and accessibility improvements across the mobile app.', status: 'At risk', progress: 46, members: ['AM', 'TC', 'NP'], dueDate: 'Sep 29, 2026', health: 'Watch', color: '#d99045' },
  { id: 3, name: 'Design system refresh', description: 'A shared component language for product and marketing surfaces.', status: 'Planning', progress: 18, members: ['SL', 'JR'], dueDate: 'Nov 06, 2026', health: 'Healthy', color: '#7186c7' },
];

export const tasks: Task[] = [
  { id: 1, title: 'Map deployment lead-time signals', description: 'Connect release events to the project health model.', status: 'In Progress', priority: 'High', assignee: 'Amelia Moore', dueDate: 'Today', project: 'DevFlow Intelligence' },
  { id: 2, title: 'Review onboarding empty states', description: 'Check copy and interaction states before handoff.', status: 'Review', priority: 'Medium', assignee: 'Jamal Reed', dueDate: 'Tomorrow', project: 'Design system refresh' },
  { id: 3, title: 'Add mobile crash alerts', description: 'Create an alert route for the release dashboard.', status: 'Todo', priority: 'Critical', assignee: 'Nia Patel', dueDate: 'Sep 25', project: 'Mobile release 2.4' },
  { id: 4, title: 'Instrument PR review time', description: 'Capture open-to-merge duration for insights.', status: 'Completed', priority: 'High', assignee: 'Kavya Iyer', dueDate: 'Sep 18', project: 'DevFlow Intelligence' },
  { id: 5, title: 'Refine workspace permissions', description: 'Document role boundaries and invite flows.', status: 'In Progress', priority: 'Medium', assignee: 'Theo Chen', dueDate: 'Sep 26', project: 'DevFlow Intelligence' },
  { id: 6, title: 'Prepare sprint demo narrative', description: 'Turn the latest project signals into a concise story.', status: 'Todo', priority: 'Low', assignee: 'Kavya Iyer', dueDate: 'Sep 30', project: 'Mobile release 2.4' },
];

export const activities: Activity[] = [
  { id: 1, type: 'Pull request merged', title: 'PR #284 merged into main', detail: 'Instrument PR review time', actor: 'Kavya Iyer', time: '12 min ago', color: '#278f87' },
  { id: 2, type: 'Task completed', title: 'API contract tests completed', detail: 'DevFlow Intelligence', actor: 'Amelia Moore', time: '48 min ago', color: '#7186c7' },
  { id: 3, type: 'Issue created', title: 'Mobile crash rate above threshold', detail: 'Mobile release 2.4', actor: 'Nia Patel', time: '2 hours ago', color: '#d99045' },
  { id: 4, type: 'Commit pushed', title: 'feat: add release health query', detail: '8 files changed on feature/health-query', actor: 'Jamal Reed', time: '3 hours ago', color: '#a86c9b' },
  { id: 5, type: 'Project updated', title: 'Sprint scope was updated', detail: 'Design system refresh', actor: 'Theo Chen', time: 'Yesterday', color: '#7186c7' },
];

export const insights: AIInsight[] = [
  { id: 1, label: 'Project health', value: 'Healthy', detail: 'Delivery signals are stable this sprint.', tone: 'success' },
  { id: 2, label: 'Risk detection', value: '3 risks detected', detail: 'Two are related to review queue age.', tone: 'warning' },
  { id: 3, label: 'Bottleneck', value: 'Code review', detail: 'Review time is 22% above your team baseline.', tone: 'warning' },
  { id: 4, label: 'Productivity', value: '+18%', detail: 'Development activity increased over the last 14 days.', tone: 'info' },
];

export const team: TeamMember[] = [
  { id: 1, name: 'Kavya Iyer', role: 'Engineering lead', avatar: 'KI', assigned: 8, completed: 22, workload: 68, status: 'Focused' },
  { id: 2, name: 'Amelia Moore', role: 'Senior engineer', avatar: 'AM', assigned: 6, completed: 19, workload: 82, status: 'Focused' },
  { id: 3, name: 'Jamal Reed', role: 'Product engineer', avatar: 'JR', assigned: 4, completed: 15, workload: 48, status: 'Available' },
  { id: 4, name: 'Nia Patel', role: 'Mobile engineer', avatar: 'NP', assigned: 7, completed: 12, workload: 91, status: 'Away' },
  { id: 5, name: 'Theo Chen', role: 'Product designer', avatar: 'TC', assigned: 3, completed: 11, workload: 35, status: 'Available' },
];
