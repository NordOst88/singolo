/* Header */
const menu = document.querySelector('.nav');

menu.addEventListener('click', (event) => {
    menu.querySelectorAll('.nav__link').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

document.addEventListener('scroll', onScroll)

function onScroll(event) {
	const curPos = window.scrollY;
	const blocks = document.querySelectorAll('body>*');
	const links = document.querySelectorAll('nav a');

	blocks.forEach((el) =>{
		if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos){
			links.forEach((a) => {
				a.classList.remove('active');
				if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
					a.classList.add('active');
				}
			})
		}
	});
};

/* Slider. Активация экранов телефонов */

const blackScreenVertical = document.querySelector('.black-screen.vertical');
const blackScreenVertical2 = document.querySelector('.black-screen.vertical2');
const blackScreenHorizontal = document.querySelector('.black-screen.horizontal');

document.querySelector('.iPhone.iPhone_vertical').addEventListener('click', (event) => {
    if (blackScreenVertical.style.display == 'none') {
        blackScreenVertical.style.display = 'block';
    } else {
        blackScreenVertical.style.display = 'none';
    }
});

blackScreenVertical.addEventListener('click',(event) => {
    blackScreenVertical.style.display = 'none';
});

document.querySelector('.iPhone.iPhone_vertical2').addEventListener('click', (event) => {
    if (blackScreenVertical2.style.display == 'none') {
        blackScreenVertical2.style.display = 'block';
    } else {
        blackScreenVertical2.style.display = 'none';
    }
});

blackScreenVertical2.addEventListener('click',(event) => {
    blackScreenVertical2.style.display = 'none';
});

document.querySelector('.iPhone.iPhone_horizontal').addEventListener('click', (event) => {
    if (blackScreenHorizontal.style.display == 'none') {
        blackScreenHorizontal.style.display = 'block';
    } else {
        blackScreenHorizontal.style.display = 'none';
    }
});

blackScreenHorizontal.addEventListener('click',(event) => {
    blackScreenHorizontal.style.display = 'none';
});

/* Slider. Переключение слайдов */

let items = document.querySelectorAll('.slides-container .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('current', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('current');
		isEnabled = true;
	});
}

function previousItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function nextItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.arrow.arrow_prev').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.arrow.arrow_next').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

/* Portfolio. Переключение табов */

const tags = document.querySelector('.tags');

tags.addEventListener('click', (event) => {
    tags.querySelectorAll('ul li').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

function itemsOrder(n) {
	let itemsInRow = 4;
	let nthChilds = [];
	for (let i = 1; i <= itemsInRow; i++) {
		nthChilds = document.querySelectorAll(`.layout-4-columns img:nth-child(${i})`);
		if (i < n) {
			nthChilds.forEach(el => el.style.order = i);
		} else {
			nthChilds.forEach(el => el.style.order = i - itemsInRow);
		}; 
	};
};

document.querySelector('.tags__all').addEventListener('click', function() {
	document.querySelectorAll('.layout-4-columns img').forEach(el => el.style.order = 0);
});

document.querySelector('.tags__web').addEventListener('click', function() {
	itemsOrder(4);
});

document.querySelector('.tags__graphic').addEventListener('click', function() {
	itemsOrder(3);
});

document.querySelector('.tags__art').addEventListener('click', function() {
	itemsOrder(2);
});

/* Portfolio. Взаимодействие с картинками */

const portfolioImages = document.querySelectorAll('.layout-4-columns img');

portfolioImages.forEach(el => el.addEventListener('click', (event) => {
	if (el.classList.contains('selected-img')) {
		el.classList.remove('selected-img');
	} else {
    	portfolioImages.forEach(el => el.classList.remove('selected-img'));
		event.target.classList.add('selected-img');
	};
}));

/* Get a quote */

const button = document.getElementById('submit');
const closeButton = document.getElementById('close-btn');

button.addEventListener('click', () => {
    const subject = document.getElementById('subject').value.toString();
	const describe = document.getElementById('details').value.toString();
	const form = document.querySelector('form');
	
	if (subject == '') {
		document.getElementById('subject-result').innerText = 'Без темы';
	} else {
		document.getElementById('subject-result').innerText = 'Тема: ' + subject;
	};
	
	if (describe == '') {
		document.getElementById('describe-result').innerText = 'Без описания';
	} else {
		document.getElementById('describe-result').innerText = 'Описание: ' + describe;
	};	
	
	if (form.checkValidity()){
		document.getElementById('message-block').classList.remove('hidden');
	};
	
});

closeButton.addEventListener('click', () => {
	document.getElementById('subject-result').innerText = '';
	document.getElementById('describe-result').innerText = '';
	document.getElementById('message-block').classList.add('hidden');
	document.getElementById('submit-form').reset();
});
