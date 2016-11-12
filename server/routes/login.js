const express = require('express')


const router = express.Router()

router.get('/login', (req,res) => {
  res.render('login.pug')
})

router.post('/login', (req,res) => {
  const { name, email, password, cpassword } = req.body
  console.log(name + ' ' + password)


  req.checkBody('name', 'Name is Required').notEmpty()
  req.checkBody('email', 'Email is Required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('password', 'Password is Required').notEmpty()
  req.checkBody('cpassword', 'Passwords do not match').equals(password)

  const errors = req.validationErrors()
  console.log(errors)
  errors ? res.render('login.pug',{errors:errors}): console.log('PASSED')

})

module.exports = router
