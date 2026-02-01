import React from 'react';
import Sidebar from './Sidebar';
import './style.css';

const Layout = ({ children, userRole, onLogout }) => {
    return (
        <div className="app-layout">
            <Sidebar userRole={userRole} onLogout={onLogout} />
            <main className="main-content">
                <header className="top-header">
                    <h2 className="page-title">Dashboard</h2>
                    <div className="header-actions">
                        <button className="icon-btn">🔔</button>
                        <button className="icon-btn">⚙️</button>
                    </div>
                </header>
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
