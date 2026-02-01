const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    members: { type: String, default: 'All Committee Members' },
    hostel: { type: String, required: true },
    status: { type: String, default: 'Scheduled' } // Scheduled, Rescheduled, Cancelled
}, { timestamps: true });

module.exports = mongoose.model('Meeting', meetingSchema);
