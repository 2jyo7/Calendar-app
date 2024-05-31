const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('./models/User');

dotenv.config()

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', eventRoutes);
app.use('/api', userRoutes);

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({ 
        googleId: profile.id, 
        email: profile.emails[0].value, 
        name: profile.displayName,
        accessToken,
        refreshToken
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});


mongoose.connect("mongodb://0.0.0.0:27017/calendars")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

