const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const validator = require('express-validator')
const path = require('path')

const { database } = require('./keys')
const tanks = require('./routes/tanks')
const login = require('./routes/login')

const app = express()

app.use('/build',express.static(path.join(__dirname,'..','/build')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(validator())

app.use('/', tanks)

app.use('/', login)

mongoose.connect(process.env.MONGODB_URI || require('./keys').database)

app.listen(process.env.PORT || 3000, () => {
  console.log('***************Listening on port 3000***************');
})
