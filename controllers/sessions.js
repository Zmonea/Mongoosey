const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')


sessions.get('/user/:username', (req, res) => {
  res.render('sessions/logged.ejs', {
    currentUser: req.session.currentUser,
  });
});



sessions.get('/new', (req, res) => {
  
  res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
})


sessions.post('/', (req, res) => {
  
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    
    if (err) {
      console.log(err)
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      
      res.send('<a  href="/">Sorry, no user found </a>')
    } else {
 
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
       
        req.session.currentUser = foundUser
        
        res.redirect(`/sessions/user/${req.session.currentUser.username}`);
      } else {
     
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/gear')
  })
})

module.exports = sessions