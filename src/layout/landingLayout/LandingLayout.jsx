import React from 'react';
import './style.css';

function LandingLayout({nav, content, footer}) {
    return (
        <div className="container">
            <div style={{width:"100%"}}>
                {nav}
            </div>
            <div className="content">
                {content}
            </div>
            <div style={{width:"100%"}}>
                {footer}
            </div>
        </div>
    );
}

export default LandingLayout;