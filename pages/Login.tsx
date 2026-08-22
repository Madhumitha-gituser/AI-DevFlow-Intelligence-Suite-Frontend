import { useState, type FormEvent } from 'react';
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
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
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
			setLoading(false);
		}
	}

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
}
