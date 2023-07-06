// la pagina detail.html è una pagina di "dettaglio": mostrerà solamente informazioni su UN evento specifico
// ma come facciamo a creare un'UNICA pagina che potenzialmente mostri i dettagli di un QUALSIASI evento?
// dobbiamo fornire alla pagina un riferimento all'evento di cui vogliamo mostrare i dettagli:
// lo facciamo tramite un parametro nell'URL che abbiamo (a nostra scelta) chiamato "id"

// ora che la pagina dettaglio ha l'id dell'evento da recuperare, possiamo fare una chiamata GET
// molto specifica che ci ritornerà (invece che l'array di tutti gli eventi) solo UN oggetto
// che rappresenta i dettagli dell'evento che ci interessa

// SE https://striveschool-api.herokuapp.com/api/agenda ci tornava TUTTI gli eventi
// ecco che https://striveschool-api.herokuapp.com/api/agenda/64a6881eda53c10014a96894 ci tornerà solo quel dettaglio

// al caricamento della pagina, ora prendiamo quell'id e lo utilizziamo per fare una GET dei dettagli dell'evento
// e riempiamo la pagina con questi dettagli

const URL = 'https://striveschool-api.herokuapp.com/api/agenda/'

// recuperiamo il parametro "id" dalla address bar:
const addressBarContent = new URLSearchParams(location.search)

const eventId = addressBarContent.get('id')
console.log('EVENTID', eventId)
console.log(URL + eventId)

// faccio una fetch per i dettagli del singolo evento con eventId recuperato dalla barra degli indirizzi
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
    // manipolo il DOM
    // nascondo lo spinner
    const spinnerContainer = document.getElementById('spinner-container')
    spinnerContainer.classList.add('d-none')
    let newCol = document.createElement('div')
    newCol.classList.add('col', 'col-12', 'col-sm-6', 'text-center')
    newCol.innerHTML = `
          <div class="card">
              <img
                src="https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?w=1380&t=st=1688627778~exp=1688628378~hmac=e7aa687afd23b37e4ba220945675dfcd73dce37b849eefef1257dc1822086397"
                class="card-img-top"
                alt="concert placeholder image"
              />
              <div class="card-body">
                <h5 class="card-title">${detail.name}</h5>
                <p class="card-text">
                  ${detail.description}
                </p>
                <p class="card-text">
                  ${detail.time}
                </p>
                <p class="card-text fw-bold">
                  ${detail.price}€
                </p>
                <div>
                <a href="./backoffice.html?id=${detail._id}" class="btn btn-warning">MODIFICA EVENTO</a>
                <button type="button" class="btn btn-danger">ELIMINA EVENTO</button>
                </div>
              </div>
            </div>
        `
    const eventsRow = document.getElementById('events-row')
    eventsRow.appendChild(newCol)

    // assegno al pulsante elimina il suo comportamento
    let deleteButton = document.querySelector('.btn-danger')
    deleteButton.addEventListener('click', function () {
      // dobbiamo eliminare la risorsa con una fetch con method "DELETE"
      // come funziona una fetch con method "DELETE"? semplicissima :)
      fetch(URL + eventId, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            // abbiamo eliminato l'evento con successo!
            alert('EVENTO ELIMINATO!')
            location.assign('index.html')
          } else {
            // c'è stato un problema nell'eliminazione dell'evento
            throw new Error("Problema nell'eliminazione dell'evento")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  })
  .catch((err) => {
    console.log(err)
  })

//  GET    -> URL oppure URL + ID se volete una risorsa specifica
//  POST   -> URL
//  PUT    -> URL + ID
//  DELETE -> URL + ID
