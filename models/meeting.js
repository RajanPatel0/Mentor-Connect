const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },  // or use startTime and endTime if you want more precise scheduling
    link: { type: String, required: true } // Link to the video meeting (e.g., Zoom or Google Meet link)
});

module.exports = mongoose.model('Meeting', meetingSchema);
