import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';

const Slide = ({active, image, subtitle, title}) => {    
    const { t } = useTranslation(); // Use for tranclation words in page
    const {currentUser} = useSelector(state => state.auth);
    const login = t('slider.login')
    const singUp = t('slider.sign')

    return (
        <div
            className={`slide ${active ? 'active' : ''}`}
            style={{backgroundImage: `url(${image})`}}
        >
            <div className="photo-P">{subtitle}</div>
            <div className="photo-H">{title}</div>
            <div className="photo_buttons">
                {
                    currentUser ? "" :
                        <>
                            <RouterLink to="/login">
                                <button className="btn1">{login}</button>
                            </RouterLink>
                            <RouterLink to="/register">
                                <button className="btn2">{singUp}</button>
                            </RouterLink>
                        </>
                }
            </div>
        </div>
    );
};

export default Slide;