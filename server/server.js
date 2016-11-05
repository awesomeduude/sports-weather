var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var { database } = require('./keys')
var routes = require('./routes/tanks')

let app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', routes)

mongoose.connect(process.env.MONGODB_URI || database)

app.listen(process.env.PORT || 3000, () => {
  console.log('***************Listening on port 3000***************');
})
