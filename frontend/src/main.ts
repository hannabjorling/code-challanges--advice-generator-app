import 'bootstrap/dist/css/bootstrap.css'
import '/styles/style.css'

const quoteEl = document.querySelector('p')!
const adviseEl = document.querySelector('span')!
const nextBtn = document.querySelector('button')

interface Quote {
  id: number,
  advice: string,
}

let quotes: Quote[] = []

const fetchQuotes = async () => {
  const response = await fetch('https://api.adviceslip.com/advice')

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`)
  }

  return await response.json() as Quote[]
}

const getQuotes = async () => {
  quotes = await fetchQuotes()

  renderQuotes()
}

const renderQuotes = () => {
  quoteEl.innerText =
    Object.values(quotes)
      .map((quote) => `"${quote.advice}"`)
      .join('')

  adviseEl.innerText =
    Object.values(quotes)
      .map((quote) => ` #${quote.id}`)
      .join('')
}

nextBtn?.addEventListener('click', () => {
  getQuotes()
})

getQuotes()