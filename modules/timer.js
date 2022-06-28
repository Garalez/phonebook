export const timer = item => {
  const title = document.createElement('p');
  title.classList.add('timer__title');
  title.textContent = 'До конца акции осталось:';

  const countsWrapper = document.createElement('div');
  countsWrapper.style.display = 'flex';
  countsWrapper.style.gap = '15px';

  const daysCounter = document.createElement('p');
  daysCounter.classList.add('timer__item', 'timer__item_days');

  const daysDigitCounter = document.createElement('span');
  daysDigitCounter.classList.add('timer__count', 'timer__count_days');

  const daysUnits = document.createElement('span');
  daysUnits.classList.add('timer__units', 'timer__units_day');

  const hoursCounter = document.createElement('p');
  hoursCounter.classList.add('timer__item', 'timer__count_hours');

  const hoursDigitCounter = document.createElement('span');
  hoursDigitCounter.classList.add('timer__count', 'timer__count_hours');

  const hoursUnits = document.createElement('span');
  hoursUnits.classList.add('timer__units', 'timer__units_hours');

  const minutesCounter = document.createElement('p');
  minutesCounter.classList.add('timer__item', 'timer__item_minutes');

  const minutesDigitCounter = document.createElement('span');
  minutesDigitCounter.classList.add('timer__count', 'timer__count_minutes');

  const minutesUnits = document.createElement('span');
  minutesUnits.classList.add('timer__units', 'timer__units_minutes');

  const secondsCounter = document.createElement('p');
  secondsCounter.classList.add('timer__item', 'timer__item_seconds');

  const secondsDigitCounter = document.createElement('span');
  secondsDigitCounter.classList.add('timer__count',
      'timer__count_seconds');

  const secondsUnits = document.createElement('span');
  secondsUnits.classList.add('timer__units', 'timer__units_seconds');

  daysCounter.append(daysDigitCounter, daysUnits);
  hoursCounter.append(hoursDigitCounter, hoursUnits);
  minutesCounter.append(minutesDigitCounter, minutesUnits);
  countsWrapper.append(daysCounter, hoursCounter, minutesCounter);
  item.append(title, countsWrapper);

  const declension = (value, words) => {
    value = Math.abs(value) % 100;
    const num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };

  const getTimeRemaining = () => {
    const deadline = item.dataset.deadline;
    console.log('deadline: ', deadline);
    const getDate = new Date(deadline).
        toLocaleString('en-US', {timeZone: 'Europe/Moscow'});
    const dateStop = new Date(getDate).getTime();
    const dateNow = Date.now();
    const timeRemaining = dateStop - dateNow;

    const seconds = Math.floor(timeRemaining / 1000 % 60);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return {timeRemaining, seconds, minutes, hours, days};
  };

  const start = () => {
    const timer = getTimeRemaining();
    const days = ['День', 'Дня', 'Дней'];
    const hours = ['Час', 'Часа', 'Часов'];
    const minutes = ['Минута', 'Минуты', 'Минут'];
    const seconds = ['Секунда', 'Секунды', 'Секунд'];

    daysDigitCounter.textContent = timer.days.toLocaleString(
        'ru', {minimumIntegerDigits: 2});
    daysUnits.textContent = declension(timer.days, days);

    hoursDigitCounter.textContent = timer.hours.toLocaleString(
        'ru', {minimumIntegerDigits: 2});
    hoursUnits.textContent = declension(timer.hours, hours);

    minutesDigitCounter.textContent = timer.minutes.toLocaleString(
        'ru', {minimumIntegerDigits: 2});
    minutesUnits.textContent = declension(timer.minutes, minutes);

    const intervalId = setTimeout(start, 1000);

    if (timer.days <= 0) {
      daysCounter.remove();

      secondsCounter.append(secondsDigitCounter, secondsUnits);

      item.style.backgroundColor = 'green';
      countsWrapper.append(secondsCounter);

      secondsDigitCounter.textContent = timer.seconds.toLocaleString(
          'ru', {minimumIntegerDigits: 2});
      secondsUnits.textContent = declension(timer.seconds, seconds);

      secondsCounter.textContent = `
        ${timer.seconds.toLocaleString('ru', {minimumIntegerDigits: 2})} 
        ${declension(timer.seconds, seconds)}`;
    }

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      item.remove();
    }
  };
  start();
};

