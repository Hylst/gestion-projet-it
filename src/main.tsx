// SPDX-FileCopyrightText: 2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProgressProvider } from './lib/progress';
import './styles/index.css';
import './styles/print.css';
import './styles/editorial.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </React.StrictMode>,
);

if ('serviceWorker' in navigator && window.location.pathname.startsWith('/gestion-projet-it/')) {
  navigator.serviceWorker.register('/gestion-projet-it/sw.js').catch(() => undefined);
}
