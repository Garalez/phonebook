import {renderPhoneBook, renderContacts} from './script/render';
import {getStorage, removeStorage} from './script/serviceStorage';
import control from './script/control';
const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
  sortRows,
} = control;

import './scss/index.scss';


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
