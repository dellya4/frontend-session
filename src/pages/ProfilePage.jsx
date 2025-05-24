import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../redux/store/themeSlice'; 
import Header from '../components/DashboardComponents/Header';
import { useTranslation } from 'react-i18next'; 

const ProfilePage = () => {
    // Take current user from Redux
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({ username: '', email: '', birth_date: '' });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const { t } = useTranslation(); // for translation

    // Functuon for loadin profile from backend
    const fetchProfile = useCallback(async () => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/auth/profile?email=${currentUser.email}`);
            const data = await res.json();
            setProfile(data);
            setForm({
                username: data.username || '',
                email: data.email || '',
                birth_date: data.birth_date || ''
            });
            // Installing the theme from the backend
            dispatch(setTheme(data.theme || 'light'));
            document.documentElement.setAttribute('data-theme', data.theme || 'light');
            localStorage.setItem('theme', data.theme || 'light');
        } catch (err) {
            console.error(err);
        }
    }, [currentUser.email, dispatch]);

    // We load the profile when mounting, if the user is logged in
    useEffect(() => {
        if (currentUser?.email) {
            fetchProfile();
        }
    }, [currentUser, fetchProfile]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Saving updated profile data
    const handleSave = async () => {
        try {
            const res = await fetch('http://127.0.0.1:5000/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentUser.email, ...form }),
            });
            await res.json();
            setMessage('Profile updated!');
            fetchProfile();
        } catch (err) {
            setMessage('Failed to update profile');
        }
    };

    // Loading picture to backend
    const handlePhotoUpload = async () => {
        const formData = new FormData();
        formData.append('email', currentUser.email);
        formData.append('file', file);

        try {
            await fetch('http://127.0.0.1:5000/auth/profile/upload', {
                method: 'POST',
                body: formData
            });
            setMessage('Photo uploaded!');
            fetchProfile();
        } catch (err) {
            setMessage('Upload failed');
        }
    };

    return (
        <>
            <Header />
            <div className="page-container">
                <h2 className="page-title">{t('profile.title')}</h2>
                {message && (
                    <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}

                {profile && (
                    <div className="profile-card">
                        <div className="profile-avatar-section">
                            <img
                                src={file ? URL.createObjectURL(file) : (profile.avatar_url || '/default-avatar.png')}
                                alt="Avatar"
                                className="profile-avatar"
                            />
                            <div className="avatar-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    id="avatar-upload"
                                    className="avatar-input"
                                />
                                <label htmlFor="avatar-upload" className="primary-btn upload-btn">
                                    {t('profile.choose_photo')}
                                </label>
                                <button
                                    className="primary-btn"
                                    onClick={handlePhotoUpload}
                                    disabled={!file}
                                >
                                    {t('profile.upload_photo')}
                                </button>
                            </div>
                        </div>

                        <div className="profile-form">
                            <div className="form-group">
                                <label htmlFor="username">{t('profile.username')}</label>
                                <input
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder={t('profile.username_placeholder')}
                                    style={{ width: '240px' }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">{t('profile.email')}</label>
                                <input
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    readOnly
                                    placeholder={t('profile.email_placeholder')}
                                    style={{ width: '240px' }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birth_date">{t('profile.birth_date')}</label>
                                <input
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    value={form.birth_date}
                                    onChange={handleChange}
                                    style={{ width: '240px' }}
                                />
                            </div>
                            <button className="primary-btn save-btn" onClick={handleSave}>
                                 {t('profile.save_changes')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfilePage;