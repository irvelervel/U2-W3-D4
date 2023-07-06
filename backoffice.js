// nella pagina backoffice è presente un form che creerà un nuovo evento e lo invierà alle API di Epicode!
// l'oggetto che le nostre API si "aspettano" di ricevere è formato così:
// name -> string
// description -> string
// price -> string/number
// time -> string

const URL = 'https://striveschool-api.herokuapp.com/api/agenda/'

// parte finale della lezione: ora la pagina backoffice ha un doppio funzionamento:
// 1) può creare nuovi eventi
// 2) la voglio abilitare anche alla modifica di un evento esistente

// recuperiamo il parametro "id" dalla address bar:
const addressBarContent = new URLSearchParams(location.search)

const eventId = addressBarContent.get('id')
console.log('EVENTID', eventId)
if (eventId) {
  // siamo in modalità MODIFICA!
  // cambio la label del bottone
  document.querySelector('.btn-primary').innerText = 'Modifica evento'
  // cambio il contenuto dell'h1
  document.querySelector('h1').innerText = 'EpiTicket - Modifica evento'
  // devo anche ripopolare il form con i dettagli dell'evento a cui faccio riferimento (con _id === eventId)
  fetch(URL + eventId)
    .then((res) => {
      if (res.ok) {
        return res.json() // ho bisogno dei dettagli dell'evento!
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((detail) => {
      console.log('DETAIL', detail)
      // ripopolo il form
      const nameInput = document.getElementById('event-name')
      const descriptionInput = document.getElementById('event-description')
      const priceInput = document.getElementById('event-price')
      const timeInput = document.getElementById('event-time')

      nameInput.value = detail.name
      descriptionInput.value = detail.description
      priceInput.value = detail.price
      // reidratiamo l'input time con l'ora proveniente dal DB ma senza lo .000Z
      timeInput.value = detail.time.split('.')[0] // prendo tutto quello che sta prima del punto nella stringa time
    })
    .catch((err) => console.log(err))
}

// dobbiamo recuperare i valori dai campi, impacchettarli in un oggetto e inviare questo oggetto tramite
// una fetch con method POST

// prendiamo un riferimento al form
const eventForm = document.getElementById('event-form')
eventForm.addEventListener('submit', function (e) {
  e.preventDefault()
  console.log('raccolgo i dati dal form')

  // prendiamo i riferimenti agli input field
  const nameInput = document.getElementById('event-name')
  const descriptionInput = document.getElementById('event-description')
  const priceInput = document.getElementById('event-price')
  const timeInput = document.getElementById('event-time')

  // ora raccolgo i loro .value e impacchetto il mio oggetto:
  const newEvent = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    time: timeInput.value,
  }

  console.log('ecco i valori recuperati dal form:', newEvent)

  // ora inviamo il nostro newEvent alle API :)
  // faremo una chiamata con method POST
  // in un'architettura RESTful

  const URL = 'https://striveschool-api.herokuapp.com/api/agenda'

  // const urlToUse = eventId ? URL + '/' + eventId : URL
  let urlToUse
  if (eventId) {
    urlToUse = URL + '/' + eventId
  } else {
    urlToUse = URL
  }
  // urlToUse diventa https://striveschool-api.herokuapp.com/api/agenda/64a68193da53c10014a96886 se c'è un eventId
  // oppure diventa solamente https://striveschool-api.herokuapp.com/api/agenda se non c'è un eventId

  let methodToUse
  if (eventId) {
    methodToUse = 'PUT'
  } else {
    methodToUse = 'POST'
  }

  fetch(urlToUse, {
    method: methodToUse, // dichiaro che la mia operazione è di CREAZIONE, quindi uso il method 'POST'
    body: JSON.stringify(newEvent), // il body accetta solamente una stringa su HTTP
    headers: {
      // qua inserireste anche l'authorization, se presente...
      // Authorization: '',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        // se finisco qua, la promise è stata completata e il codice di ritorno è 200 o 201 etc.
        // l'evento è stato salvato correttamente!
        alert('EVENTO SALVATO!')
        // svuoto il form
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        timeInput.value = ''
        location.assign('index.html')
      } else {
        // se finisco qua vuol dire che l'evento NON è stato salvato correttamente
        throw new Error("Errore nel salvataggio dell'evento")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
