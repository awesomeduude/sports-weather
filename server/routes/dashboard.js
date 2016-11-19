const express = require('express')
const router = express.Router()

function loggedIn(req, res, next) {
  console.log(req.user);
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
router.get('/dashboard', loggedIn, (req,res) => {
    res.render('dashboard.pug', {name:req.user.name, signedIn: req.user ? true : false})
})

module.exports = router
