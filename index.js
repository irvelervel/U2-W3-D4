const getEventData = function () {
  const URL = 'https://striveschool-api.herokuapp.com/api/agenda'
  // sarà un'operazione di GET, quindi non ho bisogno di specificare il secondo parametro di fetch
  // perchè il method è quello predefinito, quest'API non necessità autenticazione, essendo un'operazione
  // di GET non dobbiamo passare nessun body etc.
  fetch(URL)
    .then((res) => {
      console.log('Response della GET', res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nella chiamata API')
      }
    })
    .then((events) => {
      // entriamo qua se abbiamo ritornato res.json() dal .then() precedente
      console.log('EVENTS', events)
      // abbiamo gli eventi salvati!
      //
    })
    .catch((err) => {
      console.log(err)
    })
}

getEventData()
