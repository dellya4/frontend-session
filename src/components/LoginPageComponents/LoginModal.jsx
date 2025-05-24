import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearMessages } from '../../redux/store/authSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../style/AuthModal.css';

const MotionModalContent = motion.div;

const LoginModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearMessages());
        return () => dispatch(clearMessages());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearMessages());

        dispatch(loginUser({ username, password }))
            .unwrap()
            .then(() => {
                navigate('/dashboard');
            })
            .catch(() => {
                console.warn(t('login_failed'));
            });
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
                    <h2>{t('login')}</h2>
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
                            <label htmlFor="username">{t('username_or_email')}</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t('enter_username')}
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

                        {error && <p className="error-text">{t('login_failed')}</p>}
                        {success && <p className="success-text">{t('login_success')}</p>}

                        <button type="submit" className="submit-btn" disabled={loading || !username || !password}>
                            {loading ? t('loading') : t('login')}
                        </button>
                    </form>

                    <div className="switch-auth-text">
                        {t('not_registered')} <a href="/register">{t('create_account')}</a>
                    </div>
                    <div className="switch-auth-text">
                        <a href="/forgot-password">{t('forgot_password')}</a>
                    </div>
                </div>
            </MotionModalContent>
        </div>
    );
};

export default LoginModal;
