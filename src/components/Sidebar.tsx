import { Box, Button, Divider, Drawer, Stack, Typography } from '@mui/material';
import { AutoAwesome, BugReport, Checklist, DashboardOutlined, Groups, MenuBook, Settings, Speed, ViewKanban } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 264;

const navigation = [
	{ label: 'Workspace Overview', path: '/dashboard', icon: DashboardOutlined },
	{ label: 'Projects', path: '/projects', icon: ViewKanban },
	{ label: 'Tasks', path: '/tasks', icon: Checklist },
	{ label: 'Team', path: '/team', icon: Groups },
	{ label: 'Issues', path: '/issues', icon: BugReport },
	{ label: 'Sprints', path: '/sprints', icon: Speed },
	{ label: 'AI Insights', path: '/insights', icon: AutoAwesome },
	{ label: 'Knowledge', path: '/knowledge', icon: MenuBook },
	{ label: 'Settings', path: '/settings', icon: Settings },
];

interface SidebarProps {
	open: boolean;
	onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const content = <Box sx={{ width: drawerWidth, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#10243e', color: '#d7e0ec' }}>
		<Box sx={{ px: 2.5, py: 3 }}>
			<Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.02rem', lineHeight: 1.25 }}>AI DevFlow</Typography>
			<Typography sx={{ color: '#76d0c5', fontWeight: 800, fontSize: '1.02rem', lineHeight: 1.25 }}>Intelligence Suite</Typography>
			<Typography sx={{ color: '#8092a9', fontSize: '.7rem', mt: 1.5 }}>PROJECT OPERATIONS</Typography>
		</Box>
		<Divider sx={{ borderColor: 'rgba(255,255,255,.1)' }} />
		<Stack component="nav" spacing={.5} sx={{ px: 1.5, py: 2, flex: 1 }} aria-label="Workspace navigation">
			{navigation.map(({ label, path, icon: Icon }) => {
				const active = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(`${path}/`));
				return <Button key={path} onClick={() => { navigate(path); onClose(); }} startIcon={<Icon sx={{ fontSize: 19 }} />} sx={{ justifyContent: 'flex-start', px: 1.5, py: 1.15, borderRadius: '9px', color: active ? '#10243e' : '#aebed0', bgcolor: active ? '#76d0c5' : 'transparent', '&:hover': { bgcolor: active ? '#76d0c5' : 'rgba(255,255,255,.08)' }, textTransform: 'none', fontSize: '.86rem', fontWeight: active ? 800 : 600 }}>{label}</Button>;
			})}
		</Stack>
		<Box sx={{ px: 2.5, py: 2, borderTop: '1px solid rgba(255,255,255,.1)' }}><Typography sx={{ color: '#8092a9', fontSize: '.68rem' }}>NORTHSTAR ENGINEERING</Typography><Typography sx={{ color: '#cbd7e4', fontSize: '.78rem', mt: .5 }}>Development workspace</Typography></Box>
	</Box>;

	return <><Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 0, boxSizing: 'border-box' } }} open>{content}</Drawer><Drawer variant="temporary" open={open} onClose={onClose} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 0 } }}>{content}</Drawer></>;
}

export { drawerWidth };
