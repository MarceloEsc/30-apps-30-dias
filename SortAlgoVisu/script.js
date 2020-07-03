const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let valuesArr = new Array();
let lastValuesArr = [];
let valuesNumbers = 50;
const offsetX = Math.round(1920 / valuesNumbers);
const offsetY = 18;

function setup(func) {
	for (let index = 0; index < valuesNumbers; index++) {
		valuesArr.push(Math.floor(Math.random() * 50) + 1);
	}
	lastValuesArr = [ ...valuesArr ];
	console.log(valuesArr);

	draw(false);

	console.log('Iniciando a ordenação: ' + func + 'Sort');

	switch (func) {
		case 'bubble':
			valuesArr = bubbleSort(valuesArr);
			break;
		case 'quick':
			valuesArr = quickSort(valuesArr, 0, valuesArr.length - 1);
			break;
		case 'merge':
			valuesArr = mergeSort(valuesArr);
			break;
	}

	console.log(valuesArr);

	setTimeout(() => {
		draw(true);
		valuesArr = [];
	}, 2000);
}
// setup('quick');

function draw(delay) {
	let hasDelay = delay ? 500 : 0;

	let x = 0;
	let y = 1080;
	ctx.fillStyle = '#9696c8';

	lastValuesArr.forEach((value) => {
		ctx.clearRect(x - 1, y, offsetX + 2, -value * 1000);
		x += offsetX;
	});
	x = 0;
	valuesArr.forEach((value) => {
		setTimeout(() => {
			ctx.fillRect(x, y, offsetX, -value * offsetY);
			x += offsetX;
		}, hasDelay);
	});
}

function bubbleSort(unsortedValuesArr) {
	const arrLength = unsortedValuesArr.length;
	if (arrLength <= 1) return unsortedValuesArr;

	for (let i = 0; i < arrLength; i++) {
		for (let j = 0; j < arrLength - i; j++) {
			if (unsortedValuesArr[j] > unsortedValuesArr[j + 1]) {
				swap(unsortedValuesArr, j, j + 1);
			}
		}
	}
	return unsortedValuesArr;
}

function quickSort(unsortedValuesArr, lo, hi) {
	if (unsortedValuesArr.length > 1) {
		const mid = partition(unsortedValuesArr, lo, hi);

		if (lo < mid - 1) quickSort(unsortedValuesArr, lo, mid - 1);

		if (mid < hi) quickSort(unsortedValuesArr, mid, hi);
	}

	return unsortedValuesArr;
}

function partition(unsortedValuesArr, lo, hi) {
	const pivot = unsortedValuesArr[Math.floor((lo + hi) / 2)];
	let left = lo;
	let right = hi;

	if (lo == hi) return lo;

	while (left <= right) {
		while (unsortedValuesArr[left] < pivot) {
			left++;
		}

		while (unsortedValuesArr[right] > pivot) {
			right--;
		}

		if (left <= right) {
			swap(unsortedValuesArr, left, right);
			left++;
			right--;
		}
	}

	return left;
}

function swap(unsortedValuesArr, a, b) {
	const temp = unsortedValuesArr[a];
	unsortedValuesArr[a] = unsortedValuesArr[b];
	unsortedValuesArr[b] = temp;
}

function mergeSort(unsortedValuesArr) {
	const arrLength = unsortedValuesArr.length;
	if (arrLength <= 1) return unsortedValuesArr;

	const middle = Math.floor(arrLength / 2);

	const left = unsortedValuesArr.slice(0, middle);
	const right = unsortedValuesArr.slice(middle);

	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	let resultArray = [],
		leftIndex = 0,
		rightIndex = 0;

	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex] < right[rightIndex]) {
			resultArray.push(left[leftIndex]);
			leftIndex++;
		} else {
			resultArray.push(right[rightIndex]);
			rightIndex++;
		}
	}
	return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
