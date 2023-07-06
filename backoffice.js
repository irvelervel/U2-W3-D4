// nella pagina backoffice è presente un form che creerà un nuovo evento e lo invierà alle API di Epicode!
// l'oggetto che le nostre API si "aspettano" di ricevere è formato così:
// name -> string
// description -> string
// price -> string/number
// time -> string

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

  fetch(URL, {
    method: 'POST', // dichiaro che la mia operazione è di CREAZIONE, quindi uso il method 'POST'
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
      } else {
        // se finisco qua vuol dire che l'evento NON è stato salvato correttamente
        throw new Error("Errore nel salvataggio dell'evento")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
