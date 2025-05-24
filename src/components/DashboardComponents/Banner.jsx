import React from 'react';
import {useSelector} from 'react-redux';
import '../../style/Dashboard.css'
import { useTranslation } from 'react-i18next';

const Banner = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const username = currentUser?.username || 'Guest';
    const {mood} = useSelector((state) => state.mood);
    const {t} = useTranslation();

    const pickMood = () => {
        switch (mood) {
            case "happy":
                return <button className="mood-btn happy">😊 {t('happy')}</button>
            case "normal":
                return <button className="mood-btn neutral">😐 {t('neutral')}</button>
            case "sad":
                return <button className="mood-btn sad">😔 {t('sad')}</button>
            case "anxious":
                return <button className="mood-btn anxious">😰 {t('anxious')}</button>
            default:
                return <button className="mood-btn neutral">😐 {t('neutral')}</button>
        }
    }

    return (
        <div className="banner">
        <div className="banner-content">
                <h2>{t('hello')}{username}!</h2>
            {
                mood ? <p>{t('how')}</p> : ""
            }
            <div className="mood-options">
                    {
                        !mood ?
                            <>
                                <button className="mood-btn happy">😊 {t('happy')}</button>
                                <button className="mood-btn neutral">😐 {t('neutral')}</button>
                                <button className="mood-btn sad">😔 {t('sad')}</button>
                                <button className="mood-btn anxious">😰 {t('anxious')}</button>
                            </>
                            :
                            pickMood()
                    }

                </div>
            </div>
        </div>
    );
};

export default Banner;
