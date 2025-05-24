import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Analytics from './components/DashboardComponents/Analytics';
import Tests from './components/DashboardComponents/Tests';
import ProtectedRoute from './components/ProtectedRouteComponent/ProtectedRoute';
import Test from "./pages/Test";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from './redux//store/themeSlice';
import AdminPanel from './pages/AdminPanel';
import AdminActivityLog from './pages/AdminActivityLog';
import AdminRoute from './components/ProtectedRouteComponent/AdminRoute';
import ResetPasswordRequest from './pages/ResetPasswordRequest';
import ResetPasswordForm from './pages/ResetPasswordForm';
import ProfilePage from './pages/ProfilePage';


function App() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        const loadTheme = async () => {
            // When the app loading, we get theme from localStorage
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            dispatch(setTheme(savedTheme));
            
            // If person authorized, true take theme from backend
            if (currentUser?.email) {
                try {
                    const res = await fetch(`http://127.0.0.1:5000/auth/profile?email=${currentUser.email}`);
                    const data = await res.json();
                    const backendTheme = data.theme || savedTheme;
                    // Apply them and save in localStorage
                    document.documentElement.setAttribute('data-theme', backendTheme);
                    dispatch(setTheme(backendTheme));
                    localStorage.setItem('theme', backendTheme); 
                } catch (err) {
                    console.error('Failed to load theme from backend:', err);
                }
            }
        };

        loadTheme();
    }, [currentUser, dispatch]);

    return (
        <Routes>
            {/* The main page */}
            <Route path="/" element={<AboutPage />} />
            {/* Register and login */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* Protected dashboard (only authorized user) */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            }>
                {/* Child elements of dashboard */}
                <Route path="analytics" element={<Analytics />} />
                <Route path="tests" element={<Tests />} />
            </Route>
            {/* Page for definite test */}
            <Route path="/test/:testId" element={
                <ProtectedRoute>
                    <Test />
                </ProtectedRoute>
            } />
            {/* List of users (open only admin or superadmin) */}
            <Route path="/admin" element={
                <AdminRoute>
                    <AdminPanel />
                </AdminRoute>
            } />
            {/* Table with users action (open only admin or superadmin) */}
            <Route path="/activity" element={
                <AdminRoute>
                    <AdminActivityLog />
                </AdminRoute>
            } />
            {/* Reset password */}
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            {/* Password reset request */}
            <Route path='/forgot-password' element={<ResetPasswordRequest onClose={() => console.log('Modal closed')} redirectTo="/login" />} />
            {/* Profile page with protecting */}
            <Route path="/profile" element={
                <ProtectedRoute>
                    <ProfilePage />
                </ProtectedRoute>
            }></Route>
            {/* Handling unknown routes */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default App;
