import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { logUserAction } from '../utils/logAction'; 
import '../style/ResetPassword.css'
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        await logUserAction('unknown', 'password_reset_failed', `Reset failed: ${data.error}`);
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage('Password reset successful!');

      await logUserAction('unknown', 'password_reset_success', 'Password was reset successfully');

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div
      className="reset-password-container"
      style={{ backgroundImage: `url(/img.jpg)` }}
    >
      <div className="reset-password-content">
        <h2 className="page-title">{t('new-pass-title')}</h2>
        <form onSubmit={handleReset}>
          <div className="form-group">
            <label htmlFor="new-password">{t('new-pass')}</label>
            <input
              id="new-password"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t('new-pass-plcholder')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">{t('new-pass-confirm')}</label>
            <input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('confirm-pass-plcholder')}
            />
          </div>
          <button className="primary-btn" type="submit">
            {t('reset-pass')}
          </button>
        </form>
        {message && <p className={`message ${message.includes('successful') ? 'success' : 'error'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;