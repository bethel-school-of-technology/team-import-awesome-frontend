import { createRoot } from 'react-dom/client';
import App from './App';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/app.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <App />
    //followed the directions on an error message to fix create react app
    //said react no longer supported and needed to move to createRoot
);
