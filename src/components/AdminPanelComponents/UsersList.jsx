import React from 'react';
import { useTranslation } from 'react-i18next';

const UserList = ({ users, currentUser, onChangeRole, onDelete }) => {
    const {t} = useTranslation();
    return (
        <ul className="user-list grid-layout">
            {users.map((user) => (
                <li key={user.id} className="user-item">
                    <div className="user-info">
                        <strong>{user.username}</strong>
                        <p>{t('email')}: {user.email}</p>
                        <p>
                            {t('role')}:
                            <select
                                value={user.role}
                                onChange={(e) => onChangeRole(user.id, e.target.value)}
                                style={{
                                    marginLeft: '10px',
                                    padding: '5px',
                                    borderRadius: '6px',
                                    border: '1px solid #ccc',
                                    fontFamily: 'monospace',
                                    background: '#e0deef96'
                                }}
                            >
                                <option value="user">{t('user')}</option>
                                <option value="admin">{t('admin-person')}</option>
                                <option value="superadmin">{t('superadmin')}</option>
                            </select>
                        </p>
                    </div>

                    <div className="user-actions" style={{ marginTop: '15px', textAlign: 'center' }}>
                        <button
                            className="primary-btn"
                            onClick={() => onDelete(user.id, user.role)}
                            disabled={currentUser.role !== 'superadmin'}
                            style={{
                                width: '100%',
                                backgroundColor: currentUser.role !== 'superadmin' ? '#ccc' : 'slateblue',
                                color: currentUser.role !== 'superadmin' ? '#666' : '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '10px',
                                cursor: currentUser.role !== 'superadmin' ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {t('delete')}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
