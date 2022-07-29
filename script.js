// максимальное количество попыток
const attempsLimit = 6;

// переменная для номера попытки
var attemp = 1;

// случайное число для выбора слова
let rand = Math.floor(Math.random() * words.length);

// Выбираем игровое слово
let word = words[rand].split('');
console.log(word);

// подцепляем кнопки ввода букв
const buttonLettersBlock = document.querySelector('.button-letters');
const buttonLetters = document.querySelectorAll('.button-letter');

// подцепляем кнопку submit и ресет
const submitButton = document.querySelector('.button-submit');
const resetButton = document.querySelector('.button-reset');

// подцепляем инпут, в который игрок вводит слово
const input = document.querySelector('.game-input');

// Запускаем проверку слова при нажатии кнопки ПРОВЕРИТЬ или Enter
submitButton.onclick = checkWord;
document.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        checkWord();
    }
})

function checkWord() {
    // считываем фразу из инпута и приводим ее к массиву
    let userWord = document.querySelector('.game-input').value.split('');

    // стираем фразу из инпута
    input.value = '';

    // проверяем, чтобы введенное слово было ровно 5 символов
    if (userWord.length > 5 || userWord.length < 5) {
        return alert('В слове должно быть ровно 5 букв')
    }

    // Получаем элементы для текущего вывода и выводим в них слово
    letterContainers = [];
    let wins = 0;
    for (i = 0; i < 5; i++) {
        letterContainers[i] = document.querySelector('.letter-' + attemp + '-' + (i + 1));
        letterContainers[i].innerHTML = userWord[i];
        // проверяем, угадали ли букву
        // если да, то она зеленая
        if (userWord[i] == word[i]) {
            letterContainers[i].classList.add('green');
            for (j = 0; j < 33; j++) {
                if (buttonLetters[j].innerHTML == userWord[i]) {
                    if (buttonLetters[j].classList.contains('yellow')) {
                        buttonLetters[j].classList.remove('yellow');
                    }
                    buttonLetters[j].classList.add('green');
                }
            }
            wins++;
        }
        // если не на своем место, то желтая
        else if (word.includes(userWord[i])) {
            letterContainers[i].classList.add('yellow');
            for (j = 0; j < 33; j++) {
                if (buttonLetters[j].innerHTML == userWord[i]) {
                    if (buttonLetters[j].classList.contains('green')) {
                        break;
                    } else {
                        buttonLetters[j].classList.add('yellow');
                    }
                }
            }
        }
        // если вообще не угадали, то темно-серая
        else {
            letterContainers[i].classList.add('grey');
            for (j = 0; j < 33; j++) {
                if (buttonLetters[j].innerHTML == userWord[i]) {
                    if (buttonLetters[j].classList.contains('green')) {
                        break;
                    } else if (buttonLetters[j].classList.contains('yellow')) {
                        break;
                    } else {
                        buttonLetters[j].classList.add('grey');
                    }
                }
            }
        }
    }
    // условие победы
    if (wins == 5) {
        alert("Вы победили. Загаданное слово было: " + word.join(''));
        location.reload();
    }
    // прибавляем счетчик попыток
    attemp++;
    // проверяем оставшиеся попытки
    if (attemp == attempsLimit + 1) {
        alert("Игра окончена. Загаданное слово было: " + word.join(''));
        location.reload();
    }
}

// Вешаем обработчик на кнопки букв 
buttonLettersBlock.addEventListener('click', function (event) {
    if (event.target.closest('.button-letter')) {
        let inputLetter = event.target.closest('.button-letter').innerHTML;
        document.querySelector('.game-input').value += inputLetter;
    }
})
// вешаем обработчик на кнопку СТЕРЕТЬ
resetButton.addEventListener('click', function (e) {
    let userWord = input.value.split('');
    userWord.pop();
    input.value = userWord.join('');

})


