const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/mentormentee");

const scheduleSchema = new mongoose.Schema({
  start: { type: String, required: true },  // Use String to store time in "HH:MM" format
  end: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  details: { type: String },
  role: { type: String, enum: ['mentor', 'mentee'], required: true },
  industry:  { type: String, required: true },
  level:  { type: String, required: true },
  language:  { type: String, required: true },
  schedule: {
    monday: scheduleSchema,
    tuesday: scheduleSchema,
    wednesday: scheduleSchema,
    thursday: scheduleSchema,
    friday: scheduleSchema,
    saturday: scheduleSchema,
    sunday: scheduleSchema
  }
});


module.exports = mongoose.model('User', userSchema)