import React, { useState, useEffect } from 'react';
import './style.css';

const MessCommiteeMeeting = () => {
  const [userRole, setUserRole] = useState('student');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) setUserRole(role);
  }, []);

  return (
    <div className="mess-committee-meeting-container">
      <h2>Mess Committee Meeting</h2>

      {/* Warden Only: Schedule Meeting Form */}
      {userRole === 'warden' && (
        <div className="schedule-meeting-section" style={{ marginBottom: '30px', padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginTop: 0, color: '#2b3674' }}>Schedule New Meeting</h3>

          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Time</label>
              <input type="time" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Venue</label>
              <input type="text" placeholder="e.g. Conference Hall" style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Members to Attend</label>
              <select style={inputStyle}>
                <option>All Committee Members</option>
                <option>Student Representatives Only</option>
                <option>Wardens Only</option>
              </select>
            </div>

            <button type="button" style={btnStyle}>Schedule Meeting</button>
          </form>
        </div>
      )}

      {/* Common View: Upcoming Meetings */}
      <div className="upcoming-meetings">
        <h3 style={{ color: '#2b3674' }}>Upcoming Meetings</h3>

        <div className="meeting-card" style={cardStyle}>
          <div style={dateBoxStyle}>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>FEB</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>15</span>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 5px 0' }}>Monthly Menu Review</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#718096' }}>Venue: Central Hall • Time: 10:00 AM</p>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#4318FF', fontWeight: '500' }}>
              Status: Scheduled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '600',
  color: '#4a5568',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #cbd5e0',
  outline: 'none',
  boxSizing: 'border-box'
};

const btnStyle = {
  gridColumn: '1 / -1',
  background: '#4318FF',
  color: 'white',
  padding: '12px 20px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer',
  width: 'fit-content'
};

const cardStyle = {
  display: 'flex',
  gap: '15px',
  background: 'white',
  padding: '15px',
  borderRadius: '12px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  border: '1px solid #f1f5f9',
  alignItems: 'center'
};

const dateBoxStyle = {
  background: '#4318FF',
  color: 'white',
  padding: '10px',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '50px'
};

export default MessCommiteeMeeting;
