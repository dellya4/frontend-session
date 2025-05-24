import React, { useState } from 'react';
import { logUserAction } from '../utils/logAction';
import '../style/ResetPassword.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ResetPasswordRequest = ({ onClose, redirectTo = '/login' }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation(); // for translation

  // Handler for sending a password reset request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to request a password reset
      const res = await fetch('http://127.0.0.1:5000/auth/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      await logUserAction(email, 'password_reset_requested', 'User requested password reset');

      setMessage(t('link-message'));
    } catch (err) {
      setMessage(err.message);
    };
  };
  // Closing the form and redirecting
  const handleClose = () => {
    onClose();
    navigate(redirectTo);
  };

  return (
    <div
      className="reset-password-container"
      style={{ backgroundImage: `url(/img.jpg)` }}
    >
      <div className="reset-password-content">
        <h2 className="page-title">{t('reset-pass')}</h2>
        <button
          onClick={handleClose}
          className="close-button"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: 'rgb(62, 62, 62)',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ✖
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('enter_email')}:</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <button className="primary-btn" type="submit">
            {t('send_link')}
          </button>
        </form>
        {message && <p className={`message ${message.includes('sent') ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordRequest;