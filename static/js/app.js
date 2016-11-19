const base = require('../css/base.sass');
const nav = require('../css/nav.sass');
const login = require('../css/login.sass');
const normalize = require('../css/normalize.sass')
const events = require('../css/events.sass')

console.log('asdf');
document.getElementById('event-btn').onclick = () => {
  document.querySelector('.event-table ~ form').style.display = 'block'
}
