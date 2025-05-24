import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearMessages } from '../../redux/store/authSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../style/AuthModal.css';

const MotionModalContent = motion.div;

const RegisterModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearMessages());
        return () => dispatch(clearMessages());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                onClose();
                navigate('/login');
            }, 1000);
        }
    }, [success, onClose, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordMismatch(true);
            return;
        }
        setPasswordMismatch(false);
        dispatch(clearMessages());
        dispatch(registerUser({ username, email, password, birth_date: birthDate }));
    };

    const handleClose = () => {
        onClose();
        navigate('/');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay"
            style={{
                backgroundImage: `url(/img.jpg)`,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <MotionModalContent
                className="modal-content"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
            >
                <div className="modal-header">
                    <h2>{t('register')}</h2>
                    <button onClick={handleClose} className="close-button" style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        color: '#333',
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}>✖</button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">{t('username')}</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t('enter_username_reg')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{t('email')}</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('enter_email')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthDate">{t('birth_date')}</label>
                            <input
                                type="date"
                                id="birthDate"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{t('password')}</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('enter_password')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">{t('confirm_password')}</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder={t('confirm_your_password')}
                                required
                            />
                        </div>

                        {passwordMismatch && <p className="error-text">{t('passwords_not_match')}</p>}
                        {error && <p className="error-text">{error}</p>}
                        {success && <p className="success-text">{t('registration_success')}</p>}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading || !username || !password || !confirmPassword}
                        >
                            {loading ? t('loading') : t('register')}
                        </button>
                    </form>

                    <div className="switch-auth-text">
                        {t('already_have_account')} <a href="/login">{t('login_here')}</a>
                    </div>
                </div>
            </MotionModalContent>
        </div>
    );
};

export default RegisterModal;
