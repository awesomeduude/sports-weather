import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import { database } from './keys'

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


const schema = new mongoose.Schema({ name: 'string', size: 'string' })
const Tank = mongoose.model('Tank', schema)

app.post('/tanks', (req,res) => {
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

app.get('/', (req,res) => {
  res.send('Hello, World!')
})

mongoose.connect(process.env.MONGODB_URI || database)

app.listen(process.env.PORT || 3000, () => {
  console.log('***************Listening on port 3000***************');
})
