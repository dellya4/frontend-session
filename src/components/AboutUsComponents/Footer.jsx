import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();  // Use for tranclation words in page

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>SERENITY</h3>
        </div>
        <div className="footer-links">
          <a href="#about">{t('footer_about')}</a>
          <a href="#contact">{t('footer_contact')}</a>
          <a href="#privacy">{t('footer_privacy')}</a>
        </div>
        <div className="footer-copyright">
          <p>{t('footer_copy')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
