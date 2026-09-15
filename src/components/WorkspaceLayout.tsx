import { useState, type ReactNode } from 'react';
import { AppBar, Avatar, Badge, Box, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { AutoAwesome, BarChart, Dashboard, FolderOpen, Menu as MenuIcon, NotificationsNone, People, Search, Settings, TaskAlt, Timeline, WorkspacePremium, Logout } from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { currentUser, workspace } from '../../services/workspaceData';

const drawerWidth = 248;
const navItems = [
  { label: 'Overview', path: '/dashboard', icon: Dashboard },
  { label: 'Projects', path: '/projects', icon: FolderOpen },
  { label: 'Tasks', path: '/tasks', icon: TaskAlt },
  { label: 'Activity', path: '/activity', icon: Timeline },
  { label: 'AI Insights', path: '/insights', icon: AutoAwesome },
  { label: 'Team', path: '/team', icon: People },
  { label: 'Reports', path: '/reports', icon: BarChart },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const drawer = <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#10243e', color: 'white' }}>
    <Box sx={{ px: 2.5, py: 3, display: 'flex', alignItems: 'center', gap: 1.4 }}><Box sx={{ width: 34, height: 34, display: 'grid', placeItems: 'center', bgcolor: '#76d0c5', color: '#10243e', borderRadius: '10px' }}><WorkspacePremium fontSize="small" /></Box><Box><Typography sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1 }}>DevFlow</Typography><Typography sx={{ color: '#8fa6c1', fontSize: '.68rem', mt: .5, letterSpacing: '.08em' }}>INTELLIGENCE SUITE</Typography></Box></Box>
    <Box sx={{ mx: 2, mb: 2, p: 1.3, border: '1px solid #29415e', borderRadius: '10px', bgcolor: '#18314e' }}><Typography sx={{ color: '#8fa6c1', fontSize: '.67rem', textTransform: 'uppercase', letterSpacing: '.1em' }}>Workspace</Typography><Typography sx={{ mt: .5, fontWeight: 700, fontSize: '.88rem' }}>{workspace.name}</Typography></Box>
    <List sx={{ px: 1.3, flex: 1 }}>{navItems.map(({ label, path, icon: Icon }) => <ListItemButton key={path} component={NavLink} to={path} onClick={() => setMobileOpen(false)} sx={{ mb: .5, borderRadius: '9px', color: '#9db0c6', '&:hover': { bgcolor: '#18314e', color: 'white' }, '&.active': { bgcolor: '#278f87', color: 'white', boxShadow: '0 8px 18px rgba(39,143,135,.22)' } }}><ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}><Icon fontSize="small" /></ListItemIcon><ListItemText primary={label} primaryTypographyProps={{ fontSize: '.84rem', fontWeight: 650 }} /></ListItemButton>)}</List>
    <Box sx={{ p: 1.5, borderTop: '1px solid #29415e' }}><ListItemButton onClick={signOut} sx={{ borderRadius: '9px', color: '#9db0c6', '&:hover': { bgcolor: '#18314e', color: 'white' } }}><ListItemIcon sx={{ minWidth: 38, color: 'inherit' }}><Logout fontSize="small" /></ListItemIcon><ListItemText primary="Log out" primaryTypographyProps={{ fontSize: '.84rem' }} /></ListItemButton><Box sx={{ px: 1, pt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}><Avatar sx={{ width: 30, height: 30, fontSize: '.72rem', bgcolor: '#d99045' }}>{currentUser.avatar}</Avatar><Box sx={{ minWidth: 0 }}><Typography noWrap sx={{ fontSize: '.78rem', fontWeight: 700 }}>{currentUser.name}</Typography><Typography noWrap sx={{ color: '#8fa6c1', fontSize: '.68rem' }}>{currentUser.role}</Typography></Box></Box></Box>
  </Box>;
  const title = navItems.find((item) => item.path === location.pathname)?.label ?? (location.pathname.startsWith('/projects/') ? 'Project details' : 'Workspace');
  return <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7f9' }}><AppBar position="fixed" elevation={0} sx={{ ml: { md: `${drawerWidth}px` }, width: { md: `calc(100% - ${drawerWidth}px)` }, bgcolor: 'rgba(255,255,255,.9)', color: '#142b46', borderBottom: '1px solid #e5eaef', backdropFilter: 'blur(16px)' }}><Toolbar sx={{ minHeight: '72px !important', px: { xs: 2, md: 4 } }}><IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, mr: 1 }}><MenuIcon /></IconButton><Box sx={{ flex: 1 }}><Typography sx={{ fontWeight: 800, fontSize: '1.05rem' }}>{title}</Typography><Typography sx={{ color: '#8290a0', fontSize: '.72rem' }}>{workspace.name} / 2026 sprint 18</Typography></Box><Tooltip title="Search"><IconButton sx={{ color: '#718096' }}><Search /></IconButton></Tooltip><Tooltip title="Notifications"><IconButton sx={{ color: '#718096', mr: 1 }}><Badge color="warning" variant="dot"><NotificationsNone /></Badge></IconButton></Tooltip><IconButton onClick={(event) => setProfileAnchor(event.currentTarget)}><Avatar sx={{ width: 34, height: 34, bgcolor: '#d99045', fontSize: '.76rem' }}>{currentUser.avatar}</Avatar></IconButton><Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={() => setProfileAnchor(null)}><MenuItem onClick={() => { setProfileAnchor(null); navigate('/settings'); }}>Profile settings</MenuItem><MenuItem onClick={signOut}>Log out</MenuItem></Menu></Toolbar></AppBar><Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}><Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 0 } }}>{drawer}</Drawer><Drawer variant="permanent" open sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 0 } }}>{drawer}</Drawer></Box><Box component="main" sx={{ ml: { md: `${drawerWidth}px` }, pt: '72px', minHeight: '100vh' }}><Box sx={{ maxWidth: 1500, mx: 'auto', p: { xs: 2, sm: 3, lg: 4 } }}>{children}</Box></Box></Box>;
}
