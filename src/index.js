import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

/* App */
import App from './routes/App';

/* i18n */
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

ReactDOM.render(
  <Suspense fallback='loading'>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Suspense>,
  document.getElementById('app')
);
