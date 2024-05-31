const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  description:  {
    type: String,
    
  },
  date:  {
    type: Date,
     },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' }
});

module.exports = mongoose.model('Event', EventSchema);
