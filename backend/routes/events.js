const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create a new event
router.post('/events', async (req, res) => {
  const { title, description, date, user } = req.body;
  const event = new Event({ title, description, date, user });
  try {
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().populate('user');
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read a single event
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('user');
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an event
router.put('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
