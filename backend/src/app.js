const express = require('express');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const meetingRoutes = require('./routes/meetingRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;
