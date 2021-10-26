const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')


users.get('/new', (req, res) => {
    res.render('users/new.ejs')
  })

users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    User.create(req.body, (err, createdUser) => {
      console.log('user was created ', createdUser)
      createdUser.gold = 300;
      res.redirect('/sessions/new')
    })
})
  

  module.exports = users