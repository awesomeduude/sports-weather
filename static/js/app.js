const normalize = require('../css/normalize.sass')
const base = require('../css/base.sass');
const nav = require('../css/nav.sass');
const login = require('../css/login.sass');
const events = require('../css/events.sass')

const axios = require('axios')

const eventBtn = document.getElementById('event-btn');
if (eventBtn) {
  eventBtn.onclick = () => {
    document.querySelector('.event-table ~ .add-event').style.display = 'none'
    document.querySelector('.event-table ~ .form').style.display = 'block'
  }
}

const deleteLinks = document.querySelectorAll('.fa-trash-o');

if (deleteLinks.length) {
  Array.from(deleteLinks).forEach((trashcan) => {
    trashcan.onclick = (e) => {
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
            console.log('RESP00N$$$e');
          })
          .catch((err) => {
            console.log(err);
          });

        }
    }
  })
}

const editLinks = document.querySelectorAll('.fa-pencil-square-o')

if (editLinks.length) {
  //For Each edit icon
  Array.from(editLinks).forEach((pencilIcon) => {
    pencilIcon.onclick = (e) => {
      document.querySelector('.event-table ~ .add-event').style.display = 'none'
      const form = document.querySelector('.event-table ~ .form')
      form.style.display = 'block'

      //the row of evnts
      const event = pencilIcon.parentElement.parentElement
      const eventData = getEventData(event)
      console.log('b4 fillform', eventData);
      fillForm(eventData)

      const submitbtn = document.querySelector('button[type="submit"]')

      submitbtn.innerText = 'Edit'
      submitbtn.setAttribute('data-method', 'put')

    }

  })
}
document.querySelector('.event-form').onsubmit = function(e) {
  if (document.querySelector('.event-form button[type="submit"]').getAttribute('data-method') === 'put') {
    e.preventDefault()
    console.log('putteddd');
    console.log('eee333', e);
    const eventData = getEventDataFromForm(e)

    axios.put('/events', {
      data: {
        eventData
      }
    }).then((res) => {
      //window.location.href = '/events'
      console.log('respon$$e', res);
    })
  }
}
function getEventDataFromForm(e) {
  let eventData = {}
  let type = ''
  for (var i=0; i<=10; i+=2) {
    type = e.target[i].name
    eventData[type] = e.target[i].value
  }
  return eventData
  console.log('from form', eventData);
}

function getEventData(event) {
  let eventData = {}
  let type = ''
  //the rows with id, title, time etc.
  const headers = document.querySelector('.event-table').children[0].children[0].children

  Array.from(event.children).forEach((data, i) => {

    type = headers[i].innerText.toLowerCase()
    if (type !== 'actions') {
      if (type === 'event') {
        eventData['title'] = data.innerText
      } else {
        eventData[type] = data.innerText
      }

    }
  })
  return eventData
}
function fillForm(eventData) {
  const { title, city, date, description, state, id } = eventData
  document.getElementById('title').value = title
  document.getElementById('date').value = date
  document.getElementById('description').value = description
  document.getElementById('city').value = city
  document.getElementById('state').value = state
  document.getElementById('id').value = id

}
