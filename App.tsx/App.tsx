import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

function ProtectedRoute() {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

function Dashboard() {
  const { signOut } = useAuth();
  return <Box sx={{ minHeight: '100vh', p: { xs: 3, md: 8 }, bgcolor: '#f7f9fc' }}><Stack direction="row" justifyContent="space-between" alignItems="center"><Box><Typography variant="overline" color="primary">AI DevFlow Intelligence Suite</Typography><Typography variant="h3" sx={{ color: '#142b46', fontWeight: 800 }}>Workspace dashboard</Typography><Typography sx={{ mt: 1, color: '#718096' }}>Your authenticated project workspace is ready.</Typography></Box><Button onClick={signOut} variant="outlined">Sign out</Button></Stack></Box>;
}

export default function App() {
  return <Routes><Route path="/login" element={<Login />} /><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<Dashboard />} /></Route><Route path="*" element={<Navigate to="/login" replace />} /></Routes>;
}
