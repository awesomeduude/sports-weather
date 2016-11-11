const express = require('express')

const Tank = require('../models/tank')

let router = express.Router()

router.get('/', (req,res) => {
  res.render('layout.pug', {
      title: 'Home',
      signedIn: false
    })
})

router.post('/tanks', (req,res) => {

  Tank.create({
    name:req.body.name,
    size: req.body.size
  },
  (err, small) => {
    if (err) {
      res.send({'success':false})
    } else {
      res.send({'success':true})
    }
  })
})

module.exports = router
