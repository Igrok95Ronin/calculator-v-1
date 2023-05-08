"use strict";

const navLinks = document.querySelectorAll("nav a");
for (let i = 0; i < navLinks.length; i++) {
	let link = navLinks[i]
	if (link.getAttribute('href') == window.location.pathname) {
		link.classList.add("live");
		break;
	}
}

//Calculator
const
	mainForms__data = document.querySelector(".mainForms__data"),//форма ввода
	mainForms__btn = document.querySelector(".mainForms__btn"),//кнопка отправки
	inputs = document.querySelectorAll("input"),//все инпуты
	errors = document.querySelector(".errors"),//Строка ошибок
	myBotton = document.getElementById('myBotton'),//Плавная прокрутка при загрузке страницы
	author = document.querySelector('.author'),//Автор
	technology = document.querySelector('.technology'),//Получаем ссылку на технология
	dR = document.querySelector('.dR');//Показать имя автора

mainForms__data.focus()//Авто фокус


//Обработка нажатие кнопок экранной клавиатуры
function inputClickEvents(inputs) {
	inputs.forEach(input => {
		if (input.type === "button" && input.value !== "C") {
			input.addEventListener('click', () => {
				mainForms__data.value += input.value
				mainForms__data.focus()//Авто фокус при клике на виртуальную клавиатуру
				mainForms__btn.removeAttribute("disabled")
				errors.textContent = '';// Очищаем сообщение об ошибке, если ввод корректный
				if(mainForms__data.value.includes(' ')){//Проверка на пробел в инпуте
					mainForms__btn.setAttribute("disabled","disabled")
					console.log('++ ')
				}
				// Вызываем функцию для проверки и блокировки двойных арифметических операций
				blockingDoubleArithmeticOperations(mainForms__data);
			})
		}
		if (input.value === "C") {
			input.addEventListener('click', () => {
				mainForms__data.value = ""
				errors.textContent = '';// Очищаем сообщение об ошибке, если ввод корректный
				mainForms__btn.setAttribute("disabled","disabled")
			})
		}


	})
}
inputClickEvents(inputs)//события клика инпутов


//Валидация формы
function validateInput(mainForms__data) {
	const regex = /^[0-9+\-*/% .]*$/; // Регулярное выражение для разрешенных символов

	mainForms__data.addEventListener('input', (e) => {
		const value = mainForms__data.value.trim();
		if (value === '') {
			errors.textContent = 'Ты ошибся или пытаешься меня обмануть! Поле не может быть пустым или содержать пробелы';
		} else if (!regex.test(value)) {
			errors.textContent = 'Ты ошибся или пытаешься меня обмануть! Нельзя вводить строковые значения';
			// Если введенный символ не соответствует регулярному выражению, удаляем его
			mainForms__data.value = mainForms__data.value.replace(/[^0-9+\-*/% .]/g, '');
		} else {
			errors.textContent = ''; // Очищаем сообщение об ошибке, если ввод корректный
		}

		if (mainForms__data.value.length > 0) {//Проверяем поля на пустоту
			mainForms__btn.removeAttribute("disabled")
		}

		if(e.target.value.includes(' ')){//Проверка на пробел в инпуте
			mainForms__btn.setAttribute("disabled","disabled")
			console.log('+')
		}
		blockingDoubleArithmeticOperations (mainForms__data)

	});
}
validateInput(mainForms__data)


//Заменяем повторяющиеся арифметические операции
function blockingDoubleArithmeticOperations(mainForms__dataP) {
	const regex = /[-+*/%]{2,}/; // Регулярное выражение для двух и более арифметических операций подряд
	let value = mainForms__dataP.value;

	if (regex.test(value)) {
		// Заменяем повторяющиеся арифметические операции на последнюю введенную операцию
		mainForms__dataP.value = value.replace(regex, (match) => {
			return match[match.length - 1];
		});
	}
}


//Прокрутка при загрузке страницы
function ScrollingOnPageLoad(myBotton) {
	window.addEventListener('load', () => {
		// Прокрутите до элемента
		myBotton.scrollIntoView({behavior: 'smooth',block: 'start'})
	})
}
ScrollingOnPageLoad(myBotton)


//Автор
function iAuthor(author, dR) {
	author.addEventListener('click', () => {
		dR.textContent = "Dilmaev Rizvan"
	})
}
iAuthor(author, dR)


//Использованные технология
function showUsedTechnology(technology) {
	technology.addEventListener('click', () => {
		errors.innerHTML = "<span class='html'>HTML</span>" +
			"<span class='css'> CSS </span> " +
			"<span class='js'>JS </span>" +
			"<span class='golang'>GO </span>" +
			"<span class='mysql'> MYSQL</span>"
	})
}
showUsedTechnology(technology)