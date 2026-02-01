import React, { useState, useEffect } from 'react';
import { MessageSquare, User, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../../utils/api';
import './style.css';

const Complaint = () => {
    const [userRole, setUserRole] = useState('student');
    const [currentUser, setCurrentUser] = useState(null);
    const [complaints, setComplaints] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        category: 'Food',
        description: '',
        isAnonymous: false
    });

    const [replyText, setReplyText] = useState({}); // Map of complaintId -> reply text
    const [activeReplyId, setActiveReplyId] = useState(null);

    const categories = ['Food', 'Cleanliness', 'Maintenance', 'Discipline', 'Others'];

    useEffect(() => {
        const role = localStorage.getItem('userRole');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

        setUserRole(role);
        setCurrentUser(user);

        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const data = await api.get('/complaints');
            setComplaints(data);
        } catch (error) {
            console.error("Failed to fetch complaints", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.description) return;

        try {
            await api.post('/complaints', formData);
            alert("Complaint submitted successfully");
            setFormData({
                category: 'Food',
                description: '',
                isAnonymous: false
            });
            fetchComplaints();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleReplySubmit = async (complaintId) => {
        if (!replyText[complaintId]) return;

        try {
            await api.post(`/complaints/${complaintId}/reply`, { text: replyText[complaintId] });
            setReplyText({ ...replyText, [complaintId]: '' });
            setActiveReplyId(null);
            fetchComplaints();
        } catch (error) {
            alert(error.message);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="complaint-container" style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ color: '#2b3674', margin: 0 }}>Complaints & Grievances</h2>
                {userRole === 'student' && (
                    <span style={{ fontSize: '14px', color: '#718096', background: '#e2e8f0', padding: '5px 10px', borderRadius: '15px' }}>
                        Hostel: <strong>{currentUser?.hostel}</strong>
                    </span>
                )}
            </div>

            {/* Student Complaint Form */}
            {userRole === 'student' && (
                <div className="complaint-form-card" style={formCardStyle}>
                    <h3 style={{ marginTop: 0, color: '#2d3748', fontSize: '18px' }}>Post a New Complaint</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={labelStyle}>Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}>
                                    <input
                                        type="checkbox"
                                        name="isAnonymous"
                                        checked={formData.isAnonymous}
                                        onChange={handleInputChange}
                                        style={{ width: '18px', height: '18px', marginRight: '8px', accentColor: '#4318FF' }}
                                    />
                                    <span style={{ color: '#4a5568', fontWeight: '500' }}>Submit Anonymously</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label style={labelStyle}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your issue in detail..."
                                style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                                required
                            />
                        </div>

                        <button type="submit" style={btnStyle}>
                            <Send size={16} style={{ marginRight: '8px' }} />
                            Post Complaint
                        </button>
                    </form>
                </div>
            )}

            {/* Complaints List */}
            <div className="complaints-list">
                <h3 style={{ color: '#2b3674', margin: '30px 0 15px' }}>
                    {userRole === 'student' ? 'My Recent Complaints' : `Complaints from ${currentUser?.hostel}`}
                </h3>

                {complaints.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', border: '1px dashed #cbd5e0' }}>
                        <CheckCircle size={40} color="#48bb78" style={{ marginBottom: '10px' }} />
                        <p style={{ color: '#718096' }}>No complaints found.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {complaints.map(complaint => (
                            <div key={complaint.id} className="complaint-card" style={cardStyle}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <div style={avatarStyle}>
                                            {complaint.isAnonymous && userRole !== 'student' ? '?' : (complaint.studentName ? complaint.studentName[0] : 'U')}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 4px 0', color: '#2d3748' }}>
                                                {complaint.isAnonymous
                                                    ? <span style={{ fontStyle: 'italic', color: '#718096' }}>Anonymous Student</span>
                                                    : complaint.studentName
                                                }
                                            </h4>
                                            <div style={{ fontSize: '12px', color: '#718096', display: 'flex', gap: '10px' }}>
                                                <span>{formatDate(complaint.date)}</span>
                                                <span style={{ background: '#edf2f7', padding: '0 6px', borderRadius: '4px' }}>{complaint.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '5px 10px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: complaint.status === 'Resolved' ? '#def7ec' : '#fff5f5',
                                        color: complaint.status === 'Resolved' ? '#03543f' : '#c53030'
                                    }}>
                                        {complaint.status}
                                    </div>
                                </div>

                                <p style={{ margin: '0 0 20px 0', color: '#4a5568', lineHeight: '1.5' }}>
                                    {complaint.description}
                                </p>

                                {/* Replies Section */}
                                {complaint.replies.length > 0 && (
                                    <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', borderLeft: '3px solid #4318FF' }}>
                                        {complaint.replies.map(reply => (
                                            <div key={reply.id} style={{ marginBottom: '10px' }}>
                                                <div style={{ fontSize: '13px', fontWeight: '600', color: '#2d3748', marginBottom: '4px', display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>{reply.responderName} <span style={{ fontWeight: '400', color: '#718096' }}>({reply.responderRole})</span></span>
                                                    <span style={{ fontWeight: '400', color: '#a0aec0', fontSize: '11px' }}>{formatDate(reply.date)}</span>
                                                </div>
                                                <p style={{ margin: 0, fontSize: '14px', color: '#4a5568' }}>{reply.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Warden Reply Action */}
                                {(userRole === 'warden' || userRole === 'caretaker') && (
                                    <div style={{ marginTop: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
                                        {activeReplyId === complaint.id ? (
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <input
                                                    type="text"
                                                    placeholder="Write a reply..."
                                                    value={replyText[complaint.id] || ''}
                                                    onChange={(e) => setReplyText({ ...replyText, [complaint.id]: e.target.value })}
                                                    style={{ ...inputStyle, margin: 0 }}
                                                />
                                                <button
                                                    onClick={() => handleReplySubmit(complaint.id)}
                                                    style={{ ...btnStyle, padding: '8px 15px', width: 'auto' }}
                                                >
                                                    Reply
                                                </button>
                                                <button
                                                    onClick={() => setActiveReplyId(null)}
                                                    style={{ ...btnStyle, background: 'none', color: '#718096', border: '1px solid #cbd5e0', padding: '8px 15px', width: 'auto' }}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setActiveReplyId(complaint.id)}
                                                style={{ background: 'none', border: 'none', color: '#4318FF', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}
                                            >
                                                <MessageSquare size={16} /> Reply to Student
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const formCardStyle = {
    background: 'white',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9'
};

const cardStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    border: '1px solid #e2e8f0'
};

const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '8px'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: '14px'
};

const btnStyle = {
    background: '#4318FF',
    color: 'white',
    padding: '12px 25px',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#ebf8ff',
    color: '#3182ce',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px'
};

export default Complaint;
