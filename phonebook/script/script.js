'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    return footer;
  };

  const footerText = title => {
    const p = document.createElement('p');
    p.style.margin = '0';
    p.textContent = `Все права защищены ©${title}`;

    return p;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="first-name" style="cursor:pointer">Имя</th>
        <th class="second-name" style="cursor:pointer">Фамилия</th>
        <th>Телефон</th>
        <th></th>
      </tr>
    `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" 
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" 
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
          id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const form = createForm();
    const footer = createFooter();
    const footerLogo = footerText(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
    app.append(header, main);
    main.after(footer);
    footer.footerContainer.append(footerLogo);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    tdDel.append(buttonDel);
    buttonDel.classList.add('del-icon');

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel: ${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    const edit = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.style.background = 'url("./phonebook/img/edit.svg")';
    editBtn.style.backgroundRepeat = 'no-repeat';
    editBtn.style.height = '22px';
    editBtn.style.width = '22px';
    editBtn.style.border = 'none';
    edit.append(editBtn);

    tr.append(tdDel, tdName, tdSurname, tdPhone, edit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

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

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);
    const {list, logo, btnAdd, formOverlay, btnDel} = phoneBook;
    // Функционал
    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);

    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay ||
          target.classList.contains('close')) {
        formOverlay.classList.remove('is-visible');
      }
    });

    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });

    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
      }
    });

    const contactName = document.querySelector('.first-name');
    const contactSurname = document.querySelector('.second-name');
    const contactRows = document.querySelectorAll('.contact');

    contactName.addEventListener('click', () => {
      const sortedRows = Array.from(contactRows).slice(0)
          .sort((rowA, rowB) => (
          rowA.cells[1].textContent > rowB.cells[1].textContent ? 1 : -1));
      list.append(...sortedRows);
    });

    contactSurname.addEventListener('click', () => {
      const sortedRows = Array.from(contactRows).slice(0)
          .sort((rowA, rowB) => (
          rowA.cells[2].textContent > rowB.cells[2].textContent ? 1 : -1));
      list.append(...sortedRows);
    });
  };

  window.phoneBookInit = init;
}

// contactName.addEventListener('click', () => {
//   const sortedRows = Array.from(contactRows).slice(0);
//   sortedRows.sort((rowA, rowB) => {
//     if (rowA.cells[1].textContent > rowB.cells[1].textContent) {
//       return 1;
//     }
//     if (rowA.cells[1].textContent < rowB.cells[1].textContent) {
//       return -1;
//     }
//   });
//   list.append(...sortedRows);
// });

// contactSurname.addEventListener('click', () => {
//   const sortedRows = Array.from(contactRows).slice(0);
//   sortedRows.sort((rowA, rowB) => {
//     if (rowA.cells[2].textContent > rowB.cells[2].textContent) {
//       return 1;
//     }
//     if (rowA.cells[2].textContent < rowB.cells[2].textContent) {
//       return -1;
//     }
//   });
//   list.append(...sortedRows);
// });
