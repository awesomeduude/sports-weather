const normalize = require('../css/normalize.sass')
const base = require('../css/base.sass');
const nav = require('../css/nav.sass');
const login = require('../css/login.sass');
const events = require('../css/events.sass')

const axios = require('axios')

const eventBtn = document.getElementById('event-btn');
if (eventBtn) {
  eventBtn.onclick = () => {
    document.querySelector('.event-table ~ form').style.display = 'block'
  }
}

const deleteLinks = document.querySelectorAll('.fa-trash-o');

if (deleteLinks.length) {
  Array.from(deleteLinks).forEach((trashcan) => {
    trashcan.onclick = function(e) {
        if (!confirm('Are you sure you want to delete this event?')) {
            e.preventDefault();
        } else {
          const event = trashcan.parentElement.parentElement
          const id = event.children[0].innerText
          const time = event.children[2].innerText

          axios.delete('/events', {
            data: {
              id,
              time
            }
          })
          .then((res) => {
            window.location.href = '/events'
          })
          .catch((err) => {
            console.log(err);
          });

        }
    }
  })
}
