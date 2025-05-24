import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Header = ({ extraLinkText, extraLinkTo = "/admin" }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const currentUser = useSelector((state) => state.auth.currentUser);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('lang', lng);
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

    const displayLinkText = extraLinkText || t('userlist');

    return (
        <div id="header">
            <div id="logo">
                <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h1>SERENITY</h1>
                </RouterLink>
            </div>

            <nav className="navigation">
                <RouterLink
                    to="/dashboard"
                    style={{ fontSize: '16px', padding: '6px 12px', textAlign: 'center' }}
                >
                    {t('dashboard')}
                </RouterLink>

                <RouterLink
                    to={extraLinkTo}
                    style={{ fontSize: '16px', padding: '6px 12px', textAlign: 'center' }}
                >
                    {displayLinkText.toUpperCase()}
                </RouterLink>
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
            </div>
        </div>
    );
};

export default Header;
