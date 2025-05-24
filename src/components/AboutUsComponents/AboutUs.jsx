import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation(); // Use for tranclation words in page

  return (
    <section id="about" className="about-section">
      <h2 className="about-title">{t('about_us_title')}</h2>
      <div className="about-content">
        <p className="about-text">{t('about_us_text')}</p>
      </div>
    </section>
  );
};

export default AboutUs;
