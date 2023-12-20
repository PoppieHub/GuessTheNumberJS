import { DOM_IDS } from './constants/domIds.js';

// Генерируем случайное число в заданном диапазоне
export const getRandomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;

// Проверка, является ли переданное значение числом
export const isNumber = (number) => !isNaN(parseInt(number));

// Обновляем текстовый элемент с указанным идентификатором
export const updateElementText = (elementId, message) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
};

// Очищаем ввод указанным идентификатором
export const clearInput = (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = '';
    }
};

// Добавляем новую попытку в блок, где история попыток
export const saveAttempt = (number) => {
    const attemptsBlock = document.getElementById(DOM_IDS.ATTEMPTS_ITEMS);
    if (attemptsBlock) {
        const historyItem = document.createElement('div');
        historyItem.textContent = +number;
        attemptsBlock.append(historyItem);
    }
};

// Очищаем блок с историей попыток
export const clearAttempts = () => {
    const attemptsBlock = document.getElementById(DOM_IDS.ATTEMPTS_ITEMS);
    if (attemptsBlock) {
        attemptsBlock.innerHTML = '';
    }
};

// Обновляем количество попыток в блоке
export const updateAttemptsCount = (attemptsCount) => {
    const attemptsCountBlock = document.getElementById(DOM_IDS.ATTEMPTS_COUNT);
    if (attemptsCountBlock) {
        attemptsCountBlock.textContent = `Ваши попытки (${attemptsCount}): `;
    }
};

// Показывает подсказку
export const showHint = (text) => {
    const hintElement = document.getElementById(DOM_IDS.HINT);
    if (hintElement && !hintElement.classList.contains('visible')) {
        hintElement.textContent = text;
        hintElement.classList.add('visible');
        setTimeout(() => {
            hintElement.classList.remove('visible');
        }, 3000);
    }
};

// Скрывает подсказку
export const hideHint = () => {
    const hintElement = document.getElementById(DOM_IDS.HINT);
    if (hintElement && hintElement.classList.contains('visible')) {
        hintElement.classList.remove('visible');
    }
};

// Отключает ввод пользователя
export const disableInput = () => {
    document.getElementById(DOM_IDS.GUESS_INPUT).disabled = true;
    document.getElementById(DOM_IDS.GUESS_SUBMIT).disabled = true;
};

// Включает ввод пользователя
export const enableInput = () => {
    document.getElementById(DOM_IDS.GUESS_INPUT).disabled = false;
    document.getElementById(DOM_IDS.GUESS_SUBMIT).disabled = false;
};