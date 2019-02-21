const cards = []

function createBody({ title, subtitle, text, link }) {
  const body = document.createElement('div')
  body.classList.add('card-body')

  const t = document.createElement('h4')
  t.classList.add('title')
  t.innerText = title

  const st = document.createElement('h6')
  st.classList.add('sub-title')
  st.classList.add('mb-2')
  st.classList.add('text-muted')
  st.innerText = subtitle

  const txt = document.createElement('p')
  txt.classList.add('text')
  txt.innerText = text

  const l = document.createElement('a')
  l.classList.add('link')
  l.innerHTML = link
  l.setAttribute('href', link)
  body.appendChild(t)
  body.appendChild(st)
  body.appendChild(txt)
  body.appendChild(l)

  return body
}

function createCard(e) {
  const card = document.createElement('div')
  card.classList.add('card')
  card.classList.add('cardTemplate')
  card.setAttribute('style', 'width: 20rem;')
  card.appendChild(createBody(e))
  return card
}

function init() {
  const main = document.getElementsByClassName("main")[0]

  document.addEventListener('onCreateCard', function (el) {
    main.appendChild(createCard(el.detail))
  })

  fetch('/cards.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      data.map(function (e) {

        const event = new CustomEvent('onCreateCard', { detail: e });

        document.dispatchEvent(event);
      })
    })




}



