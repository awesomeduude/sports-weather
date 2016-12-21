const express = require('express')
const router = express.Router()

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
router.get('/dashboard', loggedIn, (req,res) => {
  console.log(req.user);
    res.render('dashboard.pug', {name:req.user.name, signedIn: req.user ? true : false})
})

module.exports = router
