const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')


quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')

    let correct = true
    arrayQuote.forEach((CharacterSpan, index) => {
        const Character = arrayValue[index]
        if (Character == null) {
            CharacterSpan.classList.remove('correct')
            CharacterSpan.classList.remove('incorrect')
            correct = false
        } else if (Character === CharacterSpan.innerText) {
            CharacterSpan.classList.add('correct')
            CharacterSpan.classList.remove('incorrect')
        } else {
            CharacterSpan.classList.remove('correct')
            CharacterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(Character => {
        const CharacterSpan = document.createElement('span')
        CharacterSpan.innerText = Character
        quoteDisplayElement.appendChild(CharacterSpan)
    });
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
   return Math.floor((new Date() - startTime) / 1000)
}


renderNewQuote()