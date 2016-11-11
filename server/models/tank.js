const mongoose = require('mongoose')

const schema = new mongoose.Schema({ name: 'string', size: 'string' })
const Tank = mongoose.model('Tank', schema)

module.exports = Tank
