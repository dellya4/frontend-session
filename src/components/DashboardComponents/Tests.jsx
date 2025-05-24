import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { testsData } from '../../assets/testData';
import { useSelector } from 'react-redux';
import '../../style/Dashboard.css';
import { useTranslation } from 'react-i18next';

const Tests = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector(state => state.auth.currentUser);
    const userKey = currentUser?.username || 'guest';
    const { t } = useTranslation();
    const testSectionRef = useRef(null);

    useEffect(() => {
        if (location.state?.fromRecommendation && testSectionRef.current) {
            testSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [location]);

    const isTestAvailable = (testKey) => {
        const saved = localStorage.getItem(`test-${testKey}-${userKey}-timestamp`);
        if (!saved) return true;
        const lastPassed = parseInt(saved, 10);
        const now = Date.now();
        return now - lastPassed > 30 * 60 * 1000;
    };

    return (
        <div className="page-container" ref={testSectionRef} id="tests">
            <h2 className="page-title">{t('tests-title')}</h2>
            <div className="tests-grid">
                {Object.entries(testsData).map(([key, test]) => {
                    const available = isTestAvailable(key);
                    return (
                        <div className="test-card" key={key}>
                            <h3>{t(`test_titles.${key}`)}</h3>
                            <p>{test.questions.length} {t('questions')} · {Math.ceil(test.questions.length / 2)} {t('min')}</p>
                            <button
                                className="primary-btn"
                                onClick={() => navigate(`/test/${key}`)}
                                disabled={!available}
                                style={{
                                    backgroundColor: available ? '' : '#ccc',
                                    color: available ? '' : '#888',
                                    cursor: available ? 'pointer' : 'not-allowed',
                                }}
                            >
                                {available ? t('start') : t('aviable')}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tests;
