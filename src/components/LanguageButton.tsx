import React from 'react';

/* Styles */
import '../styles/LanguageButton.styl';

/* i18n */
import { useTranslation } from 'react-i18next';

const LanguageButton = () => {
  const { i18n } = useTranslation(['LanguageButton']);
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  const handleLanguage = () => {
    if (i18n.language === 'es') {
      changeLanguage('en');
    } else if (i18n.language === 'en') {
      changeLanguage('es');
    }
    return true;
  };

  return (
    <button
      className="LanguageButton"
      type="button"
      onClick={() => handleLanguage()}
    >
      {i18n.language === 'en' ? 'Es' : 'En'}
    </button>
  );
};

export default LanguageButton;
