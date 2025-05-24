import React from 'react';
import Header from './Header';
import { useTranslation } from 'react-i18next';
import actionTranslations from '../../i18n/actionTranslations';

const UsersActivity = ({
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    currentLogs,
    currentPage,
    setCurrentPage,
    totalPages
}) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const formatTimestamp = (timestamp) => {
        let date;
        if (typeof timestamp === 'number') {
            date = new Date(timestamp);
        } else if (typeof timestamp === 'string') {
            if (!timestamp.includes('Z') && !timestamp.match(/[+/-]\d{2}:\d{2}$/)) {
                timestamp += 'Z';
            }
            date = new Date(timestamp);
        } else {
            return 'Invalid timestamp';
        }

        return isNaN(date.getTime())
            ? 'Invalid timestamp'
            : date.toLocaleString('ru-RU', {
                timeZone: 'Asia/Almaty',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
    };

    const translateDescription = (type, description) => {
        if (type === 'page_view' && actionTranslations.page_view) {
            const subType = description?.toLowerCase().match(/dashboard|about|mood|anxiety|stress/)?.[0];
            const pageEntry = subType && actionTranslations.page_view[subType];
            if (pageEntry) {
                return pageEntry[currentLang] || description;
            }
        }

        return actionTranslations[type]?.[currentLang] || description;
    };


    const translateRole = (role) => {
        return actionTranslations.role?.[role]?.[currentLang] || role;
    };

    return (
        <>
            <Header extraLinkText={t('userlist')} extraLinkTo="/admin" />
            <div className="page-container">
                <h2 className="page-title">{t('users_activity.title')}</h2>

                <div className="filters" style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder={t('users_activity.search_placeholder')}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ padding: '8px', marginRight: '10px' }}
                    />
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="">{t('users_activity.all_roles')}</option>
                        <option value="user">{t('roles.user')}</option>
                        <option value="admin">{t('roles.admin')}</option>
                        <option value="superadmin">{t('roles.superadmin')}</option>
                    </select>
                </div>

                <table className="log-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>{t('users_activity.username')}</th>
                            <th>{t('users_activity.role')}</th>
                            <th>{t('users_activity.action')}</th>
                            <th>{t('users_activity.timestamp')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.map(log => (
                            <tr key={log.id}>
                                <td>{log.username}</td>
                                <td>{translateRole(log.role)}</td>
                                <td>{translateDescription(log.action_type, log.description)}</td>
                                <td>{formatTimestamp(log.timestamp)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>←</button>
                    )}
                    {currentPage > 2 && (
                        <>
                            <button onClick={() => setCurrentPage(1)}>1</button>
                            {currentPage > 3 && <span>...</span>}
                        </>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(
                            (page) =>
                                page === currentPage ||
                                page === currentPage - 1 ||
                                page === currentPage + 1
                        )
                        .map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={page === currentPage ? 'active' : ''}
                            >
                                {page}
                            </button>
                        ))}
                    {currentPage < totalPages - 1 && (
                        <>
                            {currentPage < totalPages - 2 && <span>...</span>}
                            <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                        </>
                    )}
                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>→</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default UsersActivity;
