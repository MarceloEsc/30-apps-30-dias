import data from './conteudo.js';

const container = document.getElementById('container');
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const comecar = document.getElementById('start');
const contn = document.getElementById('continue');
const explanation = document.getElementById('explanation');
const modal = document.querySelector('.modal-back');
const details = document.getElementById('details');
const restart = document.getElementById('restart');

quoteInputElement.addEventListener('input', () => {
	const arrayQuote = quoteDisplayElement.querySelectorAll('span');
	const arrayValue = quoteInputElement.value.split('');
	let correct = true;

	arrayQuote.forEach((characterSpan, index) => {
		const character = arrayValue[index];
		if (character == null) {
			characterSpan.classList.remove('correct');
			characterSpan.classList.remove('incorrect');
			correct = false;
		} else if (character === characterSpan.innerText) {
			characterSpan.classList.add('correct');
			characterSpan.classList.remove('incorrect');
		} else {
			characterSpan.classList.remove('correct');
			characterSpan.classList.add('incorrect');
			correct = false;
		}
	});
	if (correct) stopTimer();
});

comecar.addEventListener('click', () => {
	timerElement.style.display = 'block';
	container.style.display = 'block';
	comecar.style.display = 'none';
	restart.style.display = 'block';
	confirm();
});
contn.addEventListener('click', () => {
	contn.style.display = 'none';
	explanation.style.display = 'none';
	confirm();
});

explanation.onclick = () => modalOpen();

modal.onclick = e => {
	if (e.target.classList.contains('modal-inside')) return

	modal.style.display = 'none';
}

restart.onclick = () => location.href = '?';

function confirm() {
	startTimer();
	renderNewQuote();
}

function getRandomQuote() {
	let random = data.character.length;
	let id = Math.floor(Math.random() * random);

	let detailsToSend = data.character[id].details;
	let contentToSend = data.character[id].content;

	modalLoad(detailsToSend);
	return contentToSend;
}

async function renderNewQuote() {
	let quote = await getRandomQuote();
	quoteDisplayElement.innerText = '';
	quote.split('').forEach((character) => {
		const characterSpan = document.createElement('span');
		characterSpan.innerText = character;
		quoteDisplayElement.appendChild(characterSpan);
	});
	quoteInputElement.value = null;
}

function modalLoad(detalhe) {
	details.innerHTML = detalhe;
}
function modalOpen() {
	modal.style.display = 'block';
}

let startTime, gameTimer;

function startTimer() {
	timerElement.innerText = 0;
	startTime = new Date();
	gameTimer = setInterval(() => {
		timer.innerText = getTimerTime();
	}, 1000);
}

function getTimerTime() {
	return Math.floor((new Date() - startTime) / 1000);
}

function stopTimer() {
	clearInterval(gameTimer);
	contn.style.display = 'block';
	explanation.style.display = 'block';
}
