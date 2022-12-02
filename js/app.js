/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

// BookConstructor
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookId = Math.random().toFixed(1);
  }
}

// BookDataList: add or remove
class BookStorage {
  constructor() {
    this.bookData = [];
  }

  // Add Book to the list
  addBook(newItem) {
    this.bookData.push(newItem);
    localStorage.setItem('BookDataBase', JSON.stringify(this.bookData));
    DisplayBooks(newItem);
  }

  // Remove book from the list
  removeBook(bookId) {
    const removedBook = document.getElementById(bookId);
    removedBook.remove();
    this.bookData = this.bookData.filter((e) => e.bookId !== bookId);
    localStorage.setItem('BookDataBase', JSON.stringify(this.bookData));
  }
}

const savebook = new BookStorage();
const title = document.querySelector('.title');
const author = document.querySelector('.author');

// Retriving Input Data
function getInputData() {
  const insertbook = new Book(title.value, author.value);
  return insertbook;
}

// Add button function
const addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', () => {
  const item = getInputData();
  savebook.addBook(item);
});

// Display Book section
function DisplayBooks(i) {
  const bookListSection = document.querySelector('#book__lists');

  // displaying Book in section
  const display = document.createElement('div');
  display.classList.add('bookItem');
  display.setAttribute('id', i.bookId);
  display.innerHTML = `<p>"${i.title}" by ${i.author}</p>`;

  // Removing book from section
  const remove = document.createElement('button');
  remove.innerHTML = 'Remove';
  remove.addEventListener('click', () => savebook.removeBook(i.bookId));
  display.appendChild(remove);

  // Separating line between input and list
  const hr = document.createElement('h2');
  hr.innerHTML = '<hr/>';
  display.appendChild(hr);

  // inserting display into section
  bookListSection.appendChild(display);
}

const date = new Date().toLocaleString();
document.querySelector('#date').innerHTML = date;

const listSection = document.querySelector('#bookSection');
const list = document.querySelector('.list');
const addNewBooks = document.querySelector('#addNewBooks');
const contact = document.querySelector('#contact__info');

list.addEventListener('click', () => {
  listSection.style.display = 'flex';
  addNewBooks.style.display = 'none';
  contact.style.display = 'none';
});

window.addEventListener('load', () => {
  listSection.style.display = 'flex';
  addNewBooks.style.display = 'none';
  contact.style.display = 'none';
});

const addNewBtn = document.querySelector('.addNew');

addNewBtn.addEventListener('click', () => {
  listSection.style.display = 'none';
  addNewBooks.style.display = 'flex';
  contact.style.display = 'none';
});

const contactBtn = document.querySelector('.contact');

contactBtn.addEventListener('click', () => {
  listSection.style.display = 'none';
  addNewBooks.style.display = 'none';
  contact.style.display = 'flex';
});

window.onload = () => {
  savebook.bookData = JSON.parse(localStorage.getItem('BookDataBase' || '[]'));
  if (savebook.bookData === null) {
    savebook.bookData = [];
    return;
  }
  savebook.bookData.forEach((item) => DisplayBooks(item));
};
