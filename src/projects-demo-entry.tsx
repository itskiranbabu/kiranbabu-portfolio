import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlowingEffectDemo } from '../components/ui/demo';
import '../components/ui/globals.css';

const rootElement = document.getElementById('projects-demo-root');

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <div className="py-20">
                <div className="text-center mb-12">
                    <span className="section-badge">Premium Tech Stack</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Built with Excellence</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Leveraging the most modern tools and frameworks to deliver high-performance,
                        scalable, and visually stunning digital solutions.
                    </p>
                </div>
                <GlowingEffectDemo />
            </div>
        </React.StrictMode>
    );
}
