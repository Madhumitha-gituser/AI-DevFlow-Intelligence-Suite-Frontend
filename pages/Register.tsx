import { useState, type FormEvent } from 'react';
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { ArrowBack, ArrowForward, AutoAwesome, LockOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { register, type UserRole } from '../services/authService';

const roles: UserRole[] = ['admin', 'project_manager', 'developer', 'team_member'];

export default function Register() {
	const navigate = useNavigate();
	const location = useLocation();
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState<UserRole>((location.state?.role as UserRole | undefined) ?? 'developer');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError('');
		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			return;
		}
		setLoading(true);
		try {
			await register(email, password, fullName, role);
			navigate('/login', { replace: true, state: { registered: true, role } });
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : 'Unable to create your account.');
		} finally {
			setLoading(false);
		}
	}

	return <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 3, bgcolor: '#f7f9fc' }}><Box sx={{ width: '100%', maxWidth: 480, p: { xs: 3, sm: 5 }, bgcolor: '#fff', borderRadius: '20px', boxShadow: '0 18px 50px rgba(20,43,70,.1)' }}><Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 5 }}><Box sx={{ width: 38, height: 38, borderRadius: '12px', display: 'grid', placeItems: 'center', bgcolor: '#10243e', color: '#76d0c5' }}><AutoAwesome fontSize="small" /></Box><Typography sx={{ color: '#142b46', fontWeight: 800 }}>AI DevFlow Intelligence Suite</Typography></Stack><Typography component="h1" sx={{ color: '#142b46', fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-.035em' }}>Create Account</Typography><Typography sx={{ mt: 1, color: '#718096' }}>Set up your workspace access.</Typography><Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}><Stack spacing={2.2}>{error && <Alert severity="error" sx={{ borderRadius: '12px' }}>{error}</Alert>}<TextField label="Full Name" value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" required fullWidth /><TextField label="Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required fullWidth /><TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required fullWidth helperText="Use 8 or more characters." InputProps={{ startAdornment: <LockOutlined sx={{ mr: 1, color: '#91a0b2', fontSize: 20 }} /> }} /><TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required fullWidth /><TextField select label="Workspace Role" value={role} onChange={(event) => setRole(event.target.value as UserRole)} required fullWidth SelectProps={{ native: true }}>{roles.map((option) => <option key={option} value={option}>{option}</option>)}</TextField><Button type="submit" variant="contained" size="large" disabled={loading} endIcon={loading ? <CircularProgress size={18} color="inherit" /> : <ArrowForward />} sx={{ py: 1.55, borderRadius: '12px', bgcolor: '#278f87', '&:hover': { bgcolor: '#20766f' }, textTransform: 'none', fontSize: '1rem', fontWeight: 700 }}>{loading ? 'Creating account...' : 'Create Account'}</Button></Stack></Box><Button onClick={() => navigate('/login')} startIcon={<ArrowBack />} sx={{ mt: 3, color: '#278f87', textTransform: 'none' }}>Back to sign in</Button></Box></Box>;
}