import {timer} from './modules/timer.js';

const init = () => {
  const deadlines = document.querySelectorAll('[data-deadline]');

  deadlines.forEach(e => {
    timer(e);
  });
};

init();
