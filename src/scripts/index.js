import { MESSAGES } from './constants/messages.js';
import { DOM_IDS } from './constants/domIds.js';
import {
    getRandomNumber,
    isNumber,
    updateElementText,
    clearInput,
    saveAttempt,
    clearAttempts,
    updateAttemptsCount,
    showHint,
    hideHint,
    disableInput,
    enableInput
} from './utils.js';

// Задаем значения по умолчанию для минимального числа и максимального числа
const DEFAULT_MIN_NUMBER = 1;
const DEFAULT_MAX_NUMBER = 100;

// Создаем модель игры
const gameModel = {
    isWin: false, // Флаг, указывает была ли игра выиграна
    attempts: 0, // Количество попыток
    minNumber: DEFAULT_MIN_NUMBER, // Минимальное число в диапазоне
    maxNumber: DEFAULT_MAX_NUMBER, // Максимальное число в диапазоне
    targetNumber: getRandomNumber(DEFAULT_MIN_NUMBER, DEFAULT_MAX_NUMBER), // Загаданное число
    OUT_OF_BOUNDARIES_MESSAGE: MESSAGES.OUT_OF_BOUNDARIES(DEFAULT_MIN_NUMBER, DEFAULT_MAX_NUMBER), // Сообщение о том, что введенное число вне допустимого диапазона
    // Метод проверки угадывания числа
    checkGuess(number) {
        this.attempts++;

        // Проверяем, совпадает ли введенное число с загаданным
        if (parseInt(number) === this.targetNumber) {
            this.isWin = true;
            return MESSAGES.WIN;
        } else if (number > this.targetNumber) {
            return MESSAGES.LESS_THAN_CURRENT;
        } else {
            return MESSAGES.GREATER_THAN_CURRENT;
        }
    },
    // Метод проверки, является ли загаданное число четным
    isTargetNumberEven() {
        return this.targetNumber % 2 === 0;
    },
};

// Обработчик вводимого числа
const checkGuess = (number, model) => {
    // Проверяем, является ли введенное значение числом
    if (!isNumber(number)) {
        updateElementText(DOM_IDS.MESSAGE, 'Введите корректное число');
        return;
    }

    // Проверяем, находится ли введенное число в пределах допустимого диапазона
    const isWithinBoundaries = number >= model.minNumber && number <= model.maxNumber;

    if (!isWithinBoundaries) {
        // Если число вне допустимого диапазона, выводим сообщение
        updateElementText(DOM_IDS.MESSAGE, model.OUT_OF_BOUNDARIES_MESSAGE);
        return;
    }

    // Получаем результат проверки числа
    const guessResult = model.checkGuess(number);
    // Проверяем, является ли текущая попытка третьей
    const isThirdAttempt = model.attempts % 3 === 0;

    // Обновляем интерфейс в соответствии с результатами попытки
    updateElementText(DOM_IDS.MESSAGE, guessResult);
    saveAttempt(number);
    updateAttemptsCount(model.attempts);
    clearInput(DOM_IDS.GUESS_INPUT);

    if (model.isWin) {
        // Если игра выиграна, отключаем ввод
        disableInput();
    } else if (isThirdAttempt) {
        // Если это 3 попытка, показываем подсказку о четности загаданного числа
        showHint(`Загаданное число ${model.isTargetNumberEven() ? 'четное' : 'нечетное'}`);
    }
};

// Функция перезапуска игры
const restartGame = (minNumber, maxNumber, model) => {
    // Проверяем, что введенные значения являются числами
    const isMinValid = isNumber(minNumber);
    const isMaxValid = isNumber(maxNumber);

    // Проверяем, что введенный диапазон чисел является допустимым
    const isRangeValid = +minNumber < +maxNumber;

    if (!isMinValid || !isMaxValid || !isRangeValid) {
        // Если введенные значения некорректны, выводим сообщение об ошибке
        updateElementText(DOM_IDS.MESSAGE, 'Введите корректный диапазон чисел');
        return;
    }

    model.isWin = false; // Сбрасываем флаг выигрыша
    model.attempts = 0; // Сбрасываем количество попыток

    // Устанавливаем значения минимального и максимального чисел
    model.minNumber = +minNumber;
    model.maxNumber = +maxNumber;

    // Получаем новое число в пределах нового диапазона
    model.targetNumber = getRandomNumber(model.minNumber, model.maxNumber);
    model.OUT_OF_BOUNDARIES_MESSAGE = MESSAGES.OUT_OF_BOUNDARIES(model.minNumber, model.maxNumber);

    // Обновляем сообщение в интерфейсе
    updateElementText(
        DOM_IDS.MESSAGE,
        `Я загадал число от ${model.minNumber} до ${model.maxNumber}, попробуйте его отгадать`
    );
    // Сбрасываем количества и историю попыток
    updateElementText(DOM_IDS.ATTEMPTS_COUNT, '');
    clearAttempts();
    hideHint();
    updateElementText(DOM_IDS.HINT, '');
    clearInput(); // Очищаем поле ввода и включаем возможность ввода
    enableInput();
};

// Объект представления игры и методы для обновления интерфейса
const gameView = {
    updateElementText,
    clearInput,
    saveAttempt,
    clearAttempts,
    updateAttemptsCount,
    showHint,
    hideHint,
};

// Объект контроллера игры и методы для управления игрой
const gameController = {
    disableInput,
    enableInput,
    handleGuess: (number) => checkGuess(
        number,
        gameModel,
        gameView,
        gameController
    ),
    restartGame: (minNumber, maxNumber) => restartGame(
        minNumber,
        maxNumber,
        gameModel,
        gameView,
        gameController
    ),
};

// Получаем элементы для кнопок и полей ввода
const restartButton = document.querySelector(`#${DOM_IDS.RESTART_BTN}`);
const settingsButton = document.querySelector(`#${DOM_IDS.SETTINGS_BTN}`);
const settingsMenu = document.querySelector(`#${DOM_IDS.SETTINGS_MENU}`);
const minNumberInput = settingsMenu.querySelector(`#${DOM_IDS.MIN_NUMBER_INPUT}`);
const maxNumberInput = settingsMenu.querySelector(`#${DOM_IDS.MAX_NUMBER_INPUT}`);
const guessForm = document.querySelector(`#${DOM_IDS.GUESS_FORM}`);

// Обработчик для кнопки - Отправить
guessForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = document.querySelector(`#${DOM_IDS.GUESS_INPUT}`).value;
    gameController.handleGuess(inputValue);
});

// Обработчик для кнопки - Настройки
settingsButton.addEventListener('click', () => {
    settingsButton.classList.toggle('active');
    settingsMenu.classList.toggle('visible');
});

// Обработчик для кнопки - Перезапуск
restartButton.addEventListener('click', () => {
    gameController.restartGame(minNumberInput.value, maxNumberInput.value);
});
