import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../components/AdminPanelComponents/Header';
import UserList from '../components/AdminPanelComponents/UsersList';
import '../style/Header.css'
import '../style/AdminPanel.css'
import { useTranslation } from 'react-i18next';

const AdminPanel = () => {
    const currentUser = useSelector((state) => state.auth.currentUser); // Take current user
    const [users, setUsers] = useState([]); // List of users
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);
    const { t } = useTranslation(); // for translation

    const fetchUsers = async () => {
        // Take all users from backend
        try {
            setLoading(true);
            const response = await axios.get('http://127.0.0.1:5000/auth/admin/users');
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const changeUserRole = async (userId, newRole) => {
        // Check: only superadmin can change role
        if (currentUser?.role !== 'superadmin') {
            alert(t('alert-admin'));
            return;
        }

        try {
            await axios.put(
                `http://127.0.0.1:5000/auth/admin/users/${userId}`,
                { role: newRole },
                {
                    headers: {
                        'X-User-Role': currentUser?.role || 'user'
                    }
                }
            );
            fetchUsers(); // Render list after changing
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(t('alert_admin_error'));
        }
    };

    // Function for deleting user
    const deleteUser = async (userId, roleToDelete) => {
        // Check: only syperadmin can delete user
        if (currentUser?.role !== 'superadmin') {
            alert("Only superadmin can delete users");
            return;
        }
        // Nobody can delete superadmin
        if (roleToDelete === 'superadmin') {
            alert("You can't delete another superadmin");
            return;
        }

        // Confirmation before deletion
        const confirmDelete = window.confirm(t('admin_sure'));
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:5000/auth/admin/users/${userId}`, {
                headers: { 'X-User-Role': currentUser.role }
            });
            fetchUsers();
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    // Loading users when the page open
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Header extraLinkText={t('activity')} extraLinkTo="/activity" />
            <div className='page-container'>
                <h2 className="page-title" style={{ marginLeft: '100px', marginBottom: '10px' }}>{t('users-list-title')}</h2>
                <div className="user-list-container">
                    <button
                        className="refresh-btn"
                        onClick={fetchUsers}
                        disabled={loading}
                        style={{ marginBottom: '15px' }}
                    >
                        {loading ? t('refreshing') : t('refresh_user')}
                    </button>

                    {error && <div className="error">{error}</div>}

                    {loading ? (
                        <div className="loading">t('loading')</div>
                    ) : (
                        <UserList
                            users={users}
                            currentUser={currentUser}
                            onChangeRole={changeUserRole}
                            onDelete={deleteUser}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPanel;
