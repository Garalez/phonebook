export const getStorage = key => {
  const objFromStorage = JSON.parse(localStorage.getItem(key));
  if (objFromStorage === null) {
    return [];
  } else {
    return objFromStorage;
  }
};

export const setStorage = (key, obj) => {
  const getData = getStorage('contacts');
  if (Array.isArray(obj)) {
    getData.splice(0, getData.length, ...obj);
  } else {
    getData.push(obj);
  }
  const newData = JSON.stringify(getData);
  localStorage.setItem(key, newData);
};


export const removeStorage = phoneNumber => {
  const getDataFromStorage = getStorage('contacts');
  getDataFromStorage.forEach((item, index) => {
    if (phoneNumber === item.phone) {
      getDataFromStorage.splice([index], 1);
      setStorage('contacts', getDataFromStorage);
    }
  });
};

