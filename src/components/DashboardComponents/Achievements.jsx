import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../style/Dashboard.css';

const Achievements = () => {
    const { t } = useTranslation();

    const achievements = [
        { id: 1, title: t('achievements.step'), description: t('achievements.step_desc'), earned: true },
        { id: 2, title: t('achievements.streak'), description: t('achievements.streak_desc'), earned: true },
        { id: 3, title: t('achievements.explorer'), description: t('achievements.explorer_desc'), earned: false },
        { id: 4, title: t('achievements.journal'), description: t('achievements.journal_desc'), earned: false },
        { id: 5, title: t('achievements.champion'), description: t('achievements.champion_desc'), earned: false },
        { id: 6, title: t('achievements.master'), description: t('achievements.master_desc'), earned: false }
    ];

    return (
        <div className="achievements-section">
            <h2 className="achievements-title">{t('achievements.title')}</h2>
            <div className="achievements-grid">
                {achievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                    >
                        <div className="achievement-icon">
                            {achievement.earned ? '🏆' : '🔒'}
                        </div>
                        <h3>{achievement.title}</h3>
                        <p>{achievement.description}</p>
                        <div className="achievement-status">
                            {achievement.earned ? t('achievements.earned') : t('achievements.locked')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
