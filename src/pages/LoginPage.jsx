import React from 'react';
import LoginModal from '../components/LoginPageComponents/LoginModal';

const LoginPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f4ff' }}>
            <LoginModal isOpen={true} onClose={() => {}} />
        </div>
    );
};

export default LoginPage;
