import React from 'react';
import ReactDOM from 'react-dom/client';
import AutomationOrbit from '../components/ui/automation-orbit';
import { GrowthWidget } from '../components/ui/growth-widget';

// Render Automation Orbit
const orbitElement = document.getElementById('orbit-root');
if (orbitElement) {
    ReactDOM.createRoot(orbitElement).render(
        <React.StrictMode>
            <AutomationOrbit />
        </React.StrictMode>
    );
}

// Render Growth Widget
const growthElement = document.getElementById('growth-widget-root');
if (growthElement) {
    ReactDOM.createRoot(growthElement).render(
        <React.StrictMode>
            <GrowthWidget />
        </React.StrictMode>
    );
}
