import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProgressProvider } from './lib/progress';
import './styles/index.css';
import './styles/print.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </React.StrictMode>,
);
