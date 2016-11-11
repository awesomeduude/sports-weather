const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { database } = require('./keys')
const routes = require('./routes/tanks')
const path = require('path')

const app = express()

app.use('/build',express.static(path.join(__dirname,'..','/build')))

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'/views'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/', routes)


mongoose.connect(process.env.MONGODB_URI || database)

app.listen(process.env.PORT || 3000, () => {
  console.log('***************Listening on port 3000***************');
})
