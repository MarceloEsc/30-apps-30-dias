const sortBtns = document.querySelectorAll('.options p');
const startBtn = document.querySelector('.start');
let currentSort = 'bubble',
	timerId;

startBtn.onclick = () => {
	startBtn.setAttribute('disabled', true);
	startBtn.style.backgroundColor = '#ddd';
	setup(currentSort);

	setTimeout(() => {
		startBtn.removeAttribute('disabled');
		startBtn.style.backgroundColor = '#fff';
	}, 1550);
};

sortBtns.forEach((btn) => {
	btn.onclick = () => {
		deselectBtn();
		selectSort(btn.id);
	};
});

function deselectBtn() {
	sortBtns.forEach((btn) => btn.classList.remove('selected'));
}

function selectSort(id) {
	sortBtns.forEach((btn) => {
		if (btn.id == id) {
			btn.classList.add('selected');
			currentSort = id;
		}
	});
}
