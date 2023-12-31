# GuessTheNumberJS
___
## Описание:
- Это интерактивное веб-приложение, в котором компьютер загадывает число, а пользователь пытается его угадать.


- Базовая механика:
  - В начале игры компьютер загадывает случайное число в пределах от 1 до 100.
  - Пользователь должен вводить свое предположение в текстовое поле.
  - После каждой попытки компьютер сообщает, было ли загаданное число больше или меньше предложенного.


- Система подсказок:
  - Каждые три неудачные попытки пользователь получает подсказку о том, является ли число четным или нечетным.
    - Если пользователь введет число за пределами диапазона (например, меньше 1 или больше 100), выводится предупреждение.


- Возможность выбирать диапазон чисел (например, от 1 до 1000).
- Счетчик попыток, показывающий, сколько попыток потребовалось пользователю для угадывания.
- Возможность начать игру заново без перезагрузки страницы.


___

### Как использовать
- Введите ваш вариант числа в текстовое поле и отправьте форму.
- Следите за подсказками компьютера и попробуйте угадать число.
___

## Реализация:
- **Константы:**
  - В файле `domIds.js` определены идентификаторы для управления интерфейсом.
  - В файле `messages.js` предоставлены сообщения, используемые при взаимодействии с пользователем.


- **Утилиты (`utils.js`):**
  - `getRandomNumber(from, to)`: Генерация случайного числа в заданном диапазоне.
  - `isNumber(number)`: Проверка, является ли значение числом.
  - `updateElementText(elementId, message)`: Обновление текстового содержимого элемента.
  - `clearInput(inputId)`: Очистка поля ввода с указанным идентификатором.
  - `saveAttempt(number)`: Добавление новой попытки в блок с историей.
  - `clearAttempts()`: Очистка блока с историей.
  - `updateAttemptsCount(attemptsCount)`: Обновление отображаемого количества попыток.
  - `showHint(text)`: Отображение подсказки.
  - `hideHint()`: Скрытие подсказки.
  - `disableInput()`: Отключение ввода пользователя.
  - `enableInput()`: Включение ввода пользователя.


- **`gameModel`:**
  - `isWin`: Флаг, указывающий, выиграна ли игра.
  - `attempts`: Количество попыток.
  - `minNumber`, `maxNumber`: Минимальное и максимальное число в диапазоне.
  - `targetNumber`: Загаданное число.
  - `OUT_OF_BOUNDARIES_MESSAGE`: Сообщение о том, что введенное число вне допустимого диапазона.
  - `checkGuess(number)`: Метод проверки угадывания числа.
  - `isTargetNumberEven()`: Метод проверки, является ли загаданное число четным.


- `gameView`: Объект с методами для обновления интерфейса.


- `gameController`: Объект с методами для управления игрой.


- **`index.js`:**
  - Обработчики событий для кнопок и полей ввода.
  - Инициализация элементов интерфейса.
___

## Используемые библиотеки и технологии:
- HTML5, CSS3, JavaScript:
  - Основные технологии для разработки веб-приложения.
- Минификация кода

