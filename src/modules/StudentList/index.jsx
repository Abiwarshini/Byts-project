import React, { useState } from 'react';
import '../MessCommiteeMeeting/style.css'; // Reusing some basic container styles

const StudentList = () => {
    const [filters, setFilters] = useState({
        dept: '',
        year: '',
        room: ''
    });

    // Mock Data
    const students = [
        { id: 1, name: 'Arun Kumar', rollNo: '21CSR001', dept: 'CSE', year: '3', room: 'A-101', hostel: 'Kaveri' },
        { id: 2, name: 'Balaji S', rollNo: '21ITR005', dept: 'IT', year: '3', room: 'A-102', hostel: 'Kaveri' },
        { id: 3, name: 'Chandru M', rollNo: '22MEC012', dept: 'MECH', year: '2', room: 'B-205', hostel: 'Bhavani' },
        { id: 4, name: 'Dinesh K', rollNo: '23ECE044', dept: 'ECE', year: '1', room: 'C-005', hostel: 'Amaravathi' },
        { id: 5, name: 'Eswar P', rollNo: '20CIV088', dept: 'CIVIL', year: '4', room: 'A-101', hostel: 'Kaveri' },
    ];

    const filteredStudents = students.filter(student => {
        return (
            (filters.dept === '' || student.dept === filters.dept) &&
            (filters.year === '' || student.year === filters.year) &&
            (filters.room === '' || student.room.toLowerCase().includes(filters.room.toLowerCase()))
        );
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="module-container">
            <h2>Student List</h2>

            {/* Filter Section */}
            <div className="filters-container" style={{ display: 'flex', gap: '15px', marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '12px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#4a5568' }}>Department</label>
                    <select name="dept" value={filters.dept} onChange={handleFilterChange} style={filterStyle}>
                        <option value="">All Departments</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#4a5568' }}>Year</label>
                    <select name="year" value={filters.year} onChange={handleFilterChange} style={filterStyle}>
                        <option value="">All Years</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px', color: '#4a5568' }}>Room Number</label>
                    <input
                        type="text"
                        name="room"
                        placeholder="Search Room..."
                        value={filters.room}
                        onChange={handleFilterChange}
                        style={filterStyle}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="table-container" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ background: '#f1f5f9', color: '#475569', textAlign: 'left' }}>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Roll No</th>
                            <th style={thStyle}>Dept</th>
                            <th style={thStyle}>Year</th>
                            <th style={thStyle}>Room</th>
                            <th style={thStyle}>Hostel</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map(student => (
                                <tr key={student.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                    <td style={tdStyle}>{student.name}</td>
                                    <td style={tdStyle}>{student.rollNo}</td>
                                    <td style={tdStyle}><span style={badgeStyle}>{student.dept}</span></td>
                                    <td style={tdStyle}>{student.year}</td>
                                    <td style={tdStyle}>{student.room}</td>
                                    <td style={tdStyle}>{student.hostel}</td>
                                    <td style={tdStyle}>
                                        <button style={actionBtnStyle}>View</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#a0aec0' }}>No students found matching criteria.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Inline styles for simplicity in this module 
const filterStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e0',
    fontSize: '14px',
    outline: 'none',
    minWidth: '150px'
};

const thStyle = {
    padding: '12px 16px',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const tdStyle = {
    padding: '16px',
    fontSize: '14px',
    color: '#2d3748'
};

const badgeStyle = {
    background: '#e2e8f0',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#4a5568'
};

const actionBtnStyle = {
    background: 'none',
    border: '1px solid #4318FF',
    color: '#4318FF',
    padding: '4px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
};

export default StudentList;
