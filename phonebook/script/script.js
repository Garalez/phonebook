import control from './modules/control.js';
const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
  sortRows,
} = control;

import {renderPhoneBook, renderContacts} from './modules/render.js';

import {getStorage, removeStorage} from './modules/serviceStorage.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    // Функционал

    const getDataFromStorage = getStorage('contacts');
    const allRow = renderContacts(list, getDataFromStorage);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    sortRows(list);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    removeStorage();
  };

  window.phoneBookInit = init;
}
