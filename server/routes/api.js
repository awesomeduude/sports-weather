const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  return res.json({user: req.user})
})

module.exports = router
