import { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AdminDashboard } from '../pages/AdminDashboard';
import { Dashboard as WorkspaceDashboard, InsightsPage, ProjectDetails, Projects, SettingsPage, Tasks, TeamPage } from '../pages/WorkspacePages';
import Sidebar, { drawerWidth } from '../src/components/Sidebar';

function ProtectedRoute() {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function AdminRoute() {
  const { token, user } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return user?.role === 'admin' ? <Outlet /> : <Navigate to={user?.role === 'developer' ? '/developer-dashboard' : user?.role === 'team_member' ? '/team-member-dashboard' : '/project-manager-dashboard'} replace />;
}
function WorkspaceShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <Box sx={{ minHeight: '100vh', bgcolor: '#f7f9fc' }}><Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} /><Box sx={{ ml: { xs: 0, md: `${drawerWidth}px` }, minHeight: '100vh' }}><AppBar position="sticky" elevation={0} sx={{ display: { xs: 'block', md: 'none' }, bgcolor: '#fff', color: '#142b46', borderBottom: '1px solid #e5eaef' }}><Toolbar><IconButton edge="start" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></IconButton><Typography sx={{ ml: 1, fontWeight: 800 }}>AI DevFlow</Typography></Toolbar></AppBar><Box component="main" sx={{ maxWidth: 1600, mx: 'auto', px: { xs: 2, sm: 3.5, lg: 5 }, py: { xs: 3, md: 5 } }}><Outlet /></Box></Box></Box>;
}

function ComingSoonPage({ title, detail }: { title: string; detail: string }) {
  return <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: '#fff', border: '1px solid #e5eaef', borderRadius: '14px' }}><Typography sx={{ color: '#278f87', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.13em', fontSize: '.68rem' }}>Workspace</Typography><Typography component="h1" sx={{ color: '#142b46', mt: .7, fontWeight: 850, fontSize: '2rem' }}>{title}</Typography><Typography sx={{ color: '#718096', mt: .7 }}>{detail}</Typography></Box>;
}

function RoleLanding({ title, detail }: { title: string; detail: string }) {
  return <Box><Typography sx={{ color: '#278f87', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.13em', fontSize: '.68rem' }}>Role workspace</Typography><Typography component="h1" sx={{ color: '#142b46', mt: .7, fontWeight: 850, fontSize: { xs: '1.7rem', sm: '2rem' } }}>{title}</Typography><Typography sx={{ color: '#718096', mt: .7 }}>{detail}</Typography><Box sx={{ mt: 3, p: { xs: 2.5, sm: 4 }, bgcolor: '#fff', border: '1px solid #e5eaef', borderRadius: '14px', boxShadow: '0 8px 30px rgba(20,43,70,.04)' }}><Typography sx={{ color: '#142b46', fontWeight: 800 }}>Your role workspace is ready</Typography><Typography sx={{ color: '#718096', mt: .8, lineHeight: 1.6 }}>This role-specific view is protected by your existing JWT session. Use the sidebar to move between projects, tasks, team activity and intelligence.</Typography></Box></Box>;
}

export default function App() {
  return <Routes><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route element={<AdminRoute />}><Route path="/admin-dashboard/*" element={<AdminDashboard />} /></Route><Route element={<ProtectedRoute />}><Route element={<WorkspaceShell />}><Route path="/dashboard" element={<WorkspaceDashboard />} /><Route path="/project-dashboard" element={<WorkspaceDashboard />} /><Route path="/project-manager-dashboard" element={<WorkspaceDashboard />} /><Route path="/developer-dashboard" element={<RoleLanding title="Developer workspace" detail="Focus on assigned work, code activity, reviews and personal delivery flow." />} /><Route path="/team-dashboard" element={<TeamPage />} /><Route path="/team-member-dashboard" element={<TeamPage />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:id" element={<ProjectDetails />} /><Route path="/tasks" element={<Tasks />} /><Route path="/team" element={<TeamPage />} /><Route path="/issues" element={<ComingSoonPage title="Issues" detail="Track blockers, defects and delivery risks across your projects." />} /><Route path="/sprints" element={<ComingSoonPage title="Sprints" detail="Plan sprint scope, monitor velocity and keep delivery on track." />} /><Route path="/insights" element={<InsightsPage />} /><Route path="/knowledge" element={<ComingSoonPage title="Knowledge" detail="Keep project documentation, decisions and development context connected." />} /><Route path="/settings" element={<SettingsPage />} /></Route></Route><Route path="*" element={<Navigate to="/login" replace />} /></Routes>;
}
