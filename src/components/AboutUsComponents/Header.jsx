// Header.jsx (для AboutUs)
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/store/authSlice';
import { setTheme } from '../../redux/store/themeSlice';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [localTheme, setLocalTheme] = useState(localStorage.getItem('theme') || 'light');
    const { t, i18n } = useTranslation();  // Use for tranclation words in page
    const currentLang = i18n.language || 'en'; // Use for determine current language 

    const changeLanguage = (lng) => { // Function which change language in the page
        i18n.changeLanguage(lng);
        localStorage.setItem('lang', lng);
    };

    useEffect(() => { // Functuon which save theme 
        document.documentElement.setAttribute('data-theme', localTheme);
        dispatch(setTheme(localTheme));
    }, [localTheme, dispatch]);

    const handleLogout = () => { // Function which make logout
        dispatch(logout());
        navigate('/');
    };

    const toggleTheme = async () => { // Asynchronous action which change theme
        const newTheme = localTheme === 'light' ? 'dark' : 'light';
        setLocalTheme(newTheme);
        dispatch(setTheme(newTheme));
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (currentUser) { // Add save new theme on backend server
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

    return (
        <div id="header">
            <div id="logo">
                <h1>SERENITY</h1>
            </div>
            <nav className="navigation">
                <a href="#about">{t('about')}</a>
                <a href="#news">{t('news')}</a>
                {!currentUser && <RouterLink to="/register">{t('signup')}</RouterLink>}
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
                    {localTheme === 'light' ? t('dark_mode') : t('light_mode')}
                </button>
                <div className="language-switcher">
                    <button
                        onClick={() => changeLanguage(currentLang === 'en' ? 'ru' : 'en')}
                        className="language-toggle-btn"
                    >
                        {currentLang === 'en' ? 'RU' : 'EN'}
                    </button>
                </div>
                <RouterLink to={currentUser ? "/dashboard" : "/register"}> {/* If person not authorized - get to register, else to dashboard */}
                    <img
                        src="https://cdn0.iconfinder.com/data/icons/pixel-perfect-at-24px-volume-1/24/1014-1024.png"
                        width="25"
                        alt="User cabinet"
                    />
                </RouterLink>
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
