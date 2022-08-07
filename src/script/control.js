import createElements from './createElements';
const {createRow} = createElements;
import * as data from './serviceStorage';

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.remove('is-visible');
    });
    openModal();
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
      target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    const phoneNumber = target.
        parentNode.parentNode.childNodes[3].textContent;
    if (target.closest('.del-icon')) {
      data.removeStorage(phoneNumber);
      target.closest('.contact').remove();
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list);
    data.setStorage('contacts', newContact);
    form.reset();
    closeModal();
  });
};

const sortRows = (list) => {
  const contactName = document.querySelector('.first-name');
  const contactSurname = document.querySelector('.second-name');
  const contactRows = document.querySelectorAll('.contact');
  const getDataFromStorage = data.getStorage('contacts');

  contactName.addEventListener('click', () => {
    const sortByName = getDataFromStorage.sort((nameA, nameB) => (
      nameA.name > nameB.name ? 1 : -1));
    data.setStorage('contacts', sortByName);

    const sortedRows = Array.from(contactRows).slice(0)
        .sort((rowA, rowB) => (
    rowA.cells[1].textContent > rowB.cells[1].textContent ? 1 : -1));
    list.append(...sortedRows);
  });

  contactSurname.addEventListener('click', () => {
    const sortBySurname = getDataFromStorage.sort((nameA, nameB) => (
      nameA.surname > nameB.surname ? 1 : -1));
    data.setStorage('contacts', sortBySurname);

    const sortedRows = Array.from(contactRows).slice(0)
        .sort((rowA, rowB) => (
        rowA.cells[2].textContent > rowB.cells[2].textContent ? 1 : -1));
    list.append(...sortedRows);
  });
};

export default {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
  sortRows,
};
