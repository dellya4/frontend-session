import React from 'react';
import RegisterModal from '../components/RegisterPageComponents/RegisterModal';

const RegisterPage = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f0f4ff' }}>
            <RegisterModal isOpen={true} onClose={() => {}} />
        </div>
    );
};

export default RegisterPage;
