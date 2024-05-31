const express = require('express');
const router = express.Router();


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  router.get('/', (req, res) => {
    res.send('Home Page');
  });
  router.get('/profile', (req, res) => {
      if (!req.isAuthenticated()) return res.status(401).send('Not logged in');
      res.send(`Hello, ${req.user.name}`);
    });
    
  
  module.exports = router;