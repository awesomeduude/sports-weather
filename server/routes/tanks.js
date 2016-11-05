var express = require('express')

var Tank = require('../models/tank')

let router = express.Router()

router.get('/', (req,res) => {
  res.send('Hello, World!')
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
