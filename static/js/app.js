const base = require('../css/base.sass');
const nav = require('../css/nav.sass');
const login = require('../css/login.sass');
const normalize = require('../css/normalize.sass')
const events = require('../css/events.sass')

const axios = require('axios')

document.getElementById('event-btn').onclick = () => {
  document.querySelector('.event-table ~ form').style.display = 'block'
}

const deleteLinks = document.querySelectorAll('.fa-trash-o');

Array.from(deleteLinks).forEach((trashcan) => {
  trashcan.onclick = function(e) {
      if (!confirm('Are you sure you want to delete this event?')) {
          e.preventDefault();
      } else {
        console.log('to delete event');
        const event = trashcan.parentElement.parentElement
        const id = event.children[0].innerText
        const time = event.children[2].innerText
        console.log('id', id);
        console.log('time', time);

        axios({
          method: 'delete',
          url: '/events',
          data: {
            id,
            time
          }
        })
      }
  }
})
