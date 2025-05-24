import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/store/authSlice';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('lang', lng);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (currentUser) {
            try {
                await fetch('http://127.0.0.1:5000/auth/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: currentUser.email, theme: newTheme }),
                });
            } catch (err) {
                console.error('Failed to save theme on server:', err);
            }
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div id="header">
            <div id="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>SERENITY</h1>
                </Link>
            </div>

            <nav className="navigation">
                {location.pathname === '/profile' && (
                    <Link to="/dashboard">{t('dashboard')}</Link>
                )}
                <Link to="/dashboard/tests">{t('tests')}</Link>
                <Link to="/dashboard/analytics">{t('analytic')}</Link>
                {(currentUser?.role === 'admin' || currentUser?.role === 'superadmin') && (
                    <Link to="/admin">{t('admin')}</Link>
                )}
            </nav>

            <div className="right-panel">
                <button
                    onClick={toggleTheme}
                    style={{
                        marginLeft: '15px',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: '#615997',
                        color: 'white',
                        fontSize: '14px',
                        fontFamily: 'monospace'
                    }}
                >
                    {theme === 'light' ? t('dark_mode') : t('light_mode')}
                </button>
                <div className="language-switcher">
                    <button
                        onClick={() => changeLanguage(currentLang === 'en' ? 'ru' : 'en')}
                        className="language-toggle-btn"
                    >
                        {currentLang === 'en' ? 'RU' : 'EN'}
                    </button>
                </div>

                <div id="cabinet">
                    <Link to="/profile">
                        <img
                            src="https://cdn0.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-1/24/1014-1024.png"
                            width="25"
                            alt="User cabinet"
                        />
                    </Link>
                </div>

                {currentUser && (
                    <Link
                        to="#"
                        onClick={handleLogout}
                        style={{
                            fontSize: '23px',
                            textDecoration: 'none',
                            color: 'rgb(35 31 32)',
                            borderRadius: '50%',
                            background: 'transparent',
                            border: 'none',
                        }}
                    >
                        ✖
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Header;
