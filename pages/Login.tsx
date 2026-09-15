import { useState, type FormEvent } from 'react';
<<<<<<< HEAD
import { Alert, Box, Button, ButtonBase, Checkbox, CircularProgress, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { AdminPanelSettings, ArrowBack, ArrowForward, AutoAwesome, Code, Groups, Insights, LockOutlined, TaskAlt, Visibility, VisibilityOff } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSessionUser, type UserRole } from '../services/authService';

const workflow = [
	{ label: 'GitHub', icon: Code, color: '#76d0c5' },
	{ label: 'Tasks', icon: TaskAlt, color: '#f5b85f' },
	{ label: 'Team Activity', icon: Groups, color: '#8ba8e8' },
	{ label: 'AI Insights', icon: Insights, color: '#e79aa8' },
];

const roles: Array<{ role: UserRole; title: string; description: string; icon: typeof AdminPanelSettings; accent: string }> = [
	{ role: 'admin', title: 'Workspace Administration', description: 'Manage users, projects, integrations and system settings.', icon: AdminPanelSettings, accent: '#dba84f' },
	{ role: 'project_manager', title: 'Project & Team Management', description: 'Manage projects, tasks, workflow risks and team progress.', icon: TaskAlt, accent: '#278f87' },
	{ role: 'developer', title: 'Development Workspace', description: 'Access tasks, GitHub activity, pull requests and development insights.', icon: Code, accent: '#7186c7' },
	{ role: 'team_member', title: 'Team Workspace', description: 'Access assigned work, team activity and project knowledge.', icon: Groups, accent: '#b56f93' },
];

const roleRoutes: Record<UserRole, string> = {
	admin: '/admin-dashboard',
	project_manager: '/project-manager-dashboard',
	developer: '/developer-dashboard',
	team_member: '/team-member-dashboard',
};

export default function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { signIn } = useAuth();
	const [selectedRole, setSelectedRole] = useState<UserRole | null>(() => (location.state?.role as UserRole | undefined) ?? null);
=======
import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { ArrowForward, AutoAwesome, CheckCircle, Code, LockOutlined, MenuBook, Visibility, VisibilityOff, TaskAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/authService';

const workflow = [
	{ label: 'Code', icon: Code, color: '#4db6ac' },
	{ label: 'Tasks', icon: TaskAlt, color: '#f5b85f' },
	{ label: 'Knowledge', icon: MenuBook, color: '#8ba8e8' },
	{ label: 'AI Insights', icon: AutoAwesome, color: '#e79aa8' },
];

export default function Login() {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [mode, setMode] = useState<'login' | 'register'>('login');
>>>>>>> Madhu
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
<<<<<<< HEAD
	const [success, setSuccess] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!selectedRole) return;
		setError('');
		setLoading(true);
		try {
			await signIn({ email, password, role: selectedRole }, remember);
			setSuccess(true);
			await new Promise((resolve) => window.setTimeout(resolve, 350));
			navigate(roleRoutes[getSessionUser()?.role ?? selectedRole], { replace: true });
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : 'Unable to sign in. Check your credentials and try again.');
=======
	const [notice, setNotice] = useState('');

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError('');
		setNotice('');
		setLoading(true);
		try {
			if (mode === 'register') {
				await register({ email, password });
				setMode('login');
				setNotice('Account created. Sign in with your new credentials.');
				setPassword('');
			} else {
				await signIn({ email, password }, remember);
				navigate('/dashboard', { replace: true });
			}
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : 'Unable to sign in. Check your credentials and try again.');
		} finally {
>>>>>>> Madhu
			setLoading(false);
		}
	}

<<<<<<< HEAD
	return <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1fr)' }, bgcolor: '#f5f8fa' }}>
		<Box sx={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', px: { xs: 3, sm: 7, xl: 11 }, py: { xs: 6, lg: 8 }, color: '#fff', bgcolor: '#0e223b' }}>
			<Box sx={{ position: 'absolute', inset: 0, opacity: .22, backgroundImage: 'linear-gradient(135deg, rgba(118,208,197,.25) 1px, transparent 1px), linear-gradient(45deg, rgba(141,168,223,.17) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
			<Box sx={{ position: 'relative', width: '100%', maxWidth: 600, mx: 'auto' }}>
				<Typography sx={{ color: '#fff', fontSize: { xs: '2.65rem', sm: '4rem' }, lineHeight: 1.02, fontWeight: 850, letterSpacing: '-.055em' }}>AI DEVFLOW<br /><Box component="span" sx={{ color: '#76d0c5' }}>INTELLIGENCE SUITE</Box></Typography>
				<Typography sx={{ mt: 3, color: '#d2dce8', fontSize: { xs: '1rem', sm: '1.15rem' }, lineHeight: 1.55, fontWeight: 650 }}>Intelligent Project Management<br />Seamless Development Continuity</Typography>
				<Box sx={{ mt: { xs: 5, lg: 7 }, p: { xs: 2, sm: 2.5 }, border: '1px solid rgba(255,255,255,.14)', bgcolor: 'rgba(255,255,255,.055)', borderRadius: '20px' }}><Typography sx={{ mb: 2.4, color: '#b9c7d9', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.14em', fontWeight: 800 }}>Development signals, connected</Typography><Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.1, sm: 0 }} alignItems="center" justifyContent="space-between">{workflow.map(({ label, icon: Icon, color }, index) => <Stack key={label} direction={{ xs: 'row', sm: 'column' }} spacing={{ xs: 1.2, sm: .9 }} alignItems="center" sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}><Box sx={{ width: 43, height: 43, display: 'grid', placeItems: 'center', borderRadius: '13px', color, bgcolor: `${color}1c`, border: `1px solid ${color}55` }}><Icon fontSize="small" /></Box><Typography sx={{ color: '#d7e0ec', fontSize: '.72rem', fontWeight: 700 }}>{label}</Typography>{index < workflow.length - 1 && <ArrowForward sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', ml: { sm: 10.5 }, color: '#61758e', fontSize: 17 }} />}</Stack>)}</Stack></Box>
				<Typography sx={{ mt: 3, color: '#9fb1c5', fontSize: '.84rem', lineHeight: 1.6, maxWidth: 470 }}>Connect GitHub, tasks, team activity and project knowledge in one intelligent workspace. DevFlow uses AI to understand development workflows, identify risks and provide actionable insights for better project continuity.</Typography>
			</Box>
		</Box>
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: { xs: 2.5, sm: 6, xl: 11 }, py: { xs: 5, lg: 8 } }}><Box component="main" sx={{ width: '100%', maxWidth: 560, transition: 'opacity .3s', opacity: success ? .55 : 1 }}>
			{selectedRole ? <>
				<Button type="button" startIcon={<ArrowBack />} onClick={() => { setSelectedRole(null); setError(''); }} sx={{ color: '#278f87', mb: 4, px: 0, textTransform: 'none', fontWeight: 750 }}>Back to workspace selection</Button>
				<Typography variant="overline" sx={{ color: '#278f87', fontWeight: 850, letterSpacing: '.16em' }}>Secure workspace access</Typography><Typography component="h1" sx={{ mt: .8, color: '#142b46', fontSize: { xs: '2rem', sm: '2.65rem' }, fontWeight: 850, letterSpacing: '-.045em' }}>{selectedRole} Login</Typography><Typography sx={{ mt: 1, color: '#718096' }}>Sign in to your {selectedRole.toLowerCase()} workspace.</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}><Stack spacing={2.2}>{error && <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: '12px' }}>{error}</Alert>}<TextField label="Email Address" placeholder="Enter your email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required fullWidth /><TextField label="Password" placeholder="Enter your password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#91a0b2', fontSize: 20 }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><Button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)} sx={{ minWidth: 40, p: 1, color: '#61758e' }}>{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</Button></InputAdornment> }} /><Stack direction="row" justifyContent="space-between" alignItems="center"><FormControlLabel control={<Checkbox checked={remember} onChange={(event) => setRemember(event.target.checked)} sx={{ color: '#a3b0bf', '&.Mui-checked': { color: '#278f87' } }} />} label={<Typography sx={{ color: '#5e6e81', fontSize: '.86rem' }}>Remember me</Typography>} /><Button type="button" sx={{ color: '#278f87', textTransform: 'none', fontSize: '.84rem', fontWeight: 750 }}>Forgot password?</Button></Stack><Button type="submit" variant="contained" size="large" disabled={loading} endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForward />} sx={{ py: 1.55, borderRadius: '12px', bgcolor: '#278f87', '&:hover': { bgcolor: '#20766f' }, textTransform: 'none', fontSize: '1rem', fontWeight: 800 }}>{loading ? 'Signing in...' : 'Login'}</Button></Stack></Box>
				<Typography sx={{ mt: 4, textAlign: 'center', color: '#758398', fontSize: '.9rem' }}>Don&apos;t have an account? <Button type="button" onClick={() => navigate('/register', { state: { role: selectedRole } })} sx={{ p: 0, ml: .5, minWidth: 0, color: '#278f87', textTransform: 'none', fontWeight: 800 }}>Create an account</Button></Typography>
			</> : <>
				<Typography variant="overline" sx={{ color: '#278f87', fontWeight: 850, letterSpacing: '.16em' }}>Workspace access</Typography><Typography component="h1" sx={{ mt: .8, color: '#142b46', fontSize: { xs: '2rem', sm: '2.65rem' }, fontWeight: 850, letterSpacing: '-.045em' }}>Welcome to DevFlow</Typography><Typography sx={{ mt: 1, color: '#718096' }}>Choose your workspace</Typography>
				<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5, mt: 4 }}>{roles.map(({ role, title, description, icon: Icon, accent }) => <ButtonBase key={role} onClick={() => { setSelectedRole(role); setError(''); }} sx={{ display: 'block', textAlign: 'left', borderRadius: '16px', '&:hover .role-card': { transform: 'translateY(-4px) scale(1.015)', borderColor: accent, boxShadow: `0 14px 28px ${accent}26` } }}><Box className="role-card" sx={{ minHeight: 170, p: 2.2, bgcolor: `${accent}0d`, border: `1px solid ${accent}3d`, borderRadius: '16px', boxShadow: `0 6px 18px ${accent}12`, transition: 'all .22s' }}><Box sx={{ width: 40, height: 40, display: 'grid', placeItems: 'center', color: accent, bgcolor: `${accent}20`, border: `1px solid ${accent}35`, borderRadius: '12px', mb: 2 }}><Icon fontSize="small" /></Box><Typography sx={{ color: '#142b46', fontWeight: 850, fontSize: '1rem' }}>{role}</Typography><Typography sx={{ color: accent, mt: .45, fontSize: '.78rem', lineHeight: 1.4, fontWeight: 800 }}>{title}</Typography><Typography sx={{ color: '#5f7083', mt: .65, fontSize: '.77rem', lineHeight: 1.5 }}>{description}</Typography></Box></ButtonBase>)}</Box>
				{location.state?.registered && <Alert severity="success" sx={{ mt: 3, borderRadius: '12px' }}>Account created. Choose a workspace to sign in.</Alert>}
			</>}
			<Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 5, color: '#a2adba' }}><AutoAwesome sx={{ fontSize: 16 }} /><Typography sx={{ fontSize: '.75rem' }}>JWT-secured workspace authentication</Typography></Stack>
		</Box></Box>
	</Box>;
=======
	return (
		<Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(420px, 0.92fr) 1.08fr' }, bgcolor: '#f7f9fc' }}>
			<Box sx={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', px: { xs: 3, sm: 7, lg: 11 }, py: { xs: 6, md: 8 }, color: 'white', bgcolor: '#10243e' }}>
				<Box sx={{ position: 'absolute', inset: 0, opacity: 0.25, backgroundImage: 'linear-gradient(135deg, rgba(77,182,172,.25) 1px, transparent 1px), linear-gradient(45deg, rgba(139,168,232,.18) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
				<Box sx={{ position: 'relative', maxWidth: 570, mx: 'auto', width: '100%' }}>
					<Typography sx={{ fontSize: { xs: '2.45rem', sm: '3.45rem' }, lineHeight: 1.06, fontWeight: 800, letterSpacing: '-.04em', maxWidth: 500 }}>AI DevFlow<br /><Box component="span" sx={{ color: '#76d0c5' }}>Intelligence Suite</Box></Typography>
					<Typography sx={{ mt: 3, color: '#b9c7d9', fontSize: '1.08rem', lineHeight: 1.65, maxWidth: 450 }}>Intelligent Project Management.<br />Seamless Development Continuity.</Typography>
					<Box sx={{ mt: 7, p: { xs: 2, sm: 3 }, border: '1px solid rgba(255,255,255,.13)', bgcolor: 'rgba(255,255,255,.055)', borderRadius: '20px', backdropFilter: 'blur(8px)' }}>
						<Typography sx={{ mb: 2.5, color: '#b9c7d9', fontSize: '.76rem', textTransform: 'uppercase', letterSpacing: '.15em', fontWeight: 700 }}>Your workflow, connected</Typography>
						<Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={{ xs: 1, sm: 0 }} justifyContent="space-between">
							{workflow.map(({ label, icon: Icon, color }, index) => <Stack key={label} direction={{ xs: 'row', sm: 'column' }} alignItems="center" spacing={{ xs: 1.5, sm: 1 }} sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}><Box sx={{ display: 'grid', placeItems: 'center', width: 46, height: 46, borderRadius: '14px', color, bgcolor: `${color}1f`, border: `1px solid ${color}55` }}><Icon fontSize="small" /></Box><Typography sx={{ fontSize: '.78rem', color: '#d7e0ec', fontWeight: 600 }}>{label}</Typography>{index < workflow.length - 1 && <ArrowForward sx={{ display: { xs: 'none', sm: 'block' }, position: 'absolute', ml: { sm: 11 }, color: '#61758e', fontSize: 18 }} />}</Stack>)}
						</Stack>
					</Box>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', px: { xs: 3, sm: 6, lg: 12 }, py: { xs: 6, md: 8 } }}>
				<Box component="main" sx={{ width: '100%', maxWidth: 470 }}>
					<Typography variant="overline" sx={{ color: '#4a8f89', fontWeight: 800, letterSpacing: '.16em' }}>Workspace access</Typography>
					<Typography component="h1" sx={{ mt: 1, color: '#142b46', fontSize: { xs: '2rem', sm: '2.45rem' }, fontWeight: 800, letterSpacing: '-.035em' }}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</Typography>
					<Typography sx={{ mt: 1, color: '#718096' }}>{mode === 'login' ? 'Sign in to continue to your workspace.' : 'Create your workspace credentials.'}</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
						<Stack spacing={2.2}>
							{error && <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: '12px' }}>{error}</Alert>}
							{notice && <Alert severity="success" onClose={() => setNotice('')} sx={{ borderRadius: '12px' }}>{notice}</Alert>}
							<TextField label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required fullWidth />
							<TextField label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required fullWidth inputProps={{ minLength: 8 }} InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: '#91a0b2', fontSize: 20 }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><Button aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)} sx={{ minWidth: 40, p: 1, color: '#61758e' }}>{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}</Button></InputAdornment> }} />
							{mode === 'login' && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}><FormControlLabel control={<Checkbox checked={remember} onChange={(event) => setRemember(event.target.checked)} sx={{ color: '#a3b0bf', '&.Mui-checked': { color: '#278f87' } }} />} label={<Typography sx={{ fontSize: '.86rem', color: '#5e6e81' }}>Remember me</Typography>} /><Button type="button" variant="text" sx={{ color: '#278f87', fontSize: '.84rem', textTransform: 'none', fontWeight: 700 }}>Forgot Password?</Button></Box>}
							<Button type="submit" variant="contained" size="large" disabled={loading} endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForward />} sx={{ mt: 1, py: 1.55, borderRadius: '12px', bgcolor: '#278f87', '&:hover': { bgcolor: '#20766f' }, boxShadow: '0 10px 22px rgba(39,143,135,.2)', textTransform: 'none', fontSize: '1rem', fontWeight: 700 }}>{loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign In' : 'Create Account')}</Button>
						</Stack>
					</Box>
					<Typography sx={{ mt: 5, textAlign: 'center', color: '#758398', fontSize: '.9rem' }}>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'} <Button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); setNotice(''); }} sx={{ p: 0, ml: .5, minWidth: 0, color: '#278f87', textTransform: 'none', fontWeight: 700 }}>{mode === 'login' ? 'Create Account' : 'Sign In'}</Button></Typography>
					<Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 7, color: '#a2adba' }}><CheckCircle sx={{ fontSize: 16 }} /><Typography sx={{ fontSize: '.75rem' }}>Secure workspace authentication</Typography></Stack>
				</Box>
			</Box>
		</Box>
	);
>>>>>>> Madhu
}
