const express = require('express')
const router = express.Router()

router.get('/signout', (req,res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router
