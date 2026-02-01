import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Users,
    Ticket,
    Vote,
    HandHeart,
    MessageSquare,
    AlertCircle,
    Utensils
} from 'lucide-react';
import './style.css';

const Sidebar = ({ userRole, onLogout }) => {

    // Format role for display
    const displayRole = userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User';

    return (
        <div className="sidebar">
            <div className="logo-container">
                <div className="logo-icon">HM</div>
                <h1 className="logo-text">Hostel Mess</h1>
            </div>

            <nav className="nav-menu">
                <NavLink to="/mess-committee" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Users size={20} />
                    <span>Mess Committee</span>
                </NavLink>

                <NavLink to="/token-allocation" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Ticket size={20} />
                    <span>Token Allocation</span>
                </NavLink>

                <NavLink to="/poll" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Vote size={20} />
                    <span>Poll</span>
                </NavLink>

                <NavLink to="/volunteers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <HandHeart size={20} />
                    <span>Volunteers</span>
                </NavLink>

                <NavLink to="/feedback" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <MessageSquare size={20} />
                    <span>Feedback</span>
                </NavLink>

                <NavLink to="/complaint" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <AlertCircle size={20} />
                    <span>Complaint</span>
                </NavLink>

                <NavLink to="/menu-processing" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Utensils size={20} />
                    <span>Menu Processing</span>
                </NavLink>

                {/* Warden Only Link */}
                {userRole === 'warden' && (
                    <NavLink to="/students" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Users size={20} />
                        <span>Student List</span>
                    </NavLink>
                )}
            </nav>

            <div className="user-profile">
                <div className="avatar">{displayRole.slice(0, 2).toUpperCase()}</div>
                <div className="user-info">
                    <p className="user-name">Current User</p>
                    <p className="user-role">{displayRole} Account</p>
                </div>
                <button className="logout-btn" onClick={onLogout} title="Logout">
                    ↪
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
