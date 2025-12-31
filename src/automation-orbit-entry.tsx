import React from 'react';
import ReactDOM from 'react-dom/client';
import AutomationOrbit from '../components/ui/automation-orbit';
import '../components/ui/globals.css';

const rootElement = document.getElementById('orbit-root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <AutomationOrbit />
        </React.StrictMode>
    );
}
