import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.sass';
import App from './components/App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
