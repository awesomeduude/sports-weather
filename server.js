var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


var schema = new mongoose.Schema({ name: 'string', size: 'string' })
var Tank = mongoose.model('Tank', schema)

app.post('/tanks', function(req,res) {
  Tank.create({
    name:req.body.name,
    size: req.body.size
  },
  function (err, small) {
    if (err) {
      res.send({'success':false})
    } else {
      res.send({'success':true})
    }
  })
})

app.get('/', function(req,res) {
  res.send('Hello, World!')
})

mongoose.connect(process.env.MONGODB_URI)

app.listen(process.env.PORT || 3000, function() {
  console.log('***************Listening on port 3000***************');
})
