import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersActivity from '../components/AdminPanelComponents/UsersActivity';
import '../style/Header.css'
import '../style/AdminPanel.css'

const AdminActivityLog = () => {
    const [logs, setLogs] = useState([]); // Save user's action
    const [totalPages, setTotalPages] = useState(1); // For pagination
    const [search, setSearch] = useState(''); // For search by username
    const [roleFilter, setRoleFilter] = useState(''); // For search by role
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const logsPerPage = 10; // How logs in 1 page 
    const navigate = useNavigate();

    useEffect(() => {
        // Every time filters or page changes, we load the data
        const fetchLogs = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:5000/auth/admin/action-logs?page=${currentPage}&per_page=${logsPerPage}&search=${search}&role=${roleFilter}`);
                const data = await res.json();
                setLogs(data.logs);          
                setTotalPages(data.pages);    
            } catch (err) {
                console.error('Failed to fetch logs:', err);
            }
        };
        fetchLogs();
    }, [currentPage, search, roleFilter]);

    return (
        // Rendering the log table component with filters and pagination
        <UsersActivity
            navigate={navigate}
            search={search}
            setSearch={setSearch}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            currentLogs={logs} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
        />
    );
};

export default AdminActivityLog;
