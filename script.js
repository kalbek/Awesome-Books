let books = [];
const addButton = document.getElementById('add-books');
const bookList = document.querySelector('.book-list');
const title = document.getElementById('title');
const author = document.getElementById('author');
//  function to remove books
function removeBooks(bookId) {
  books = books.filter((book) => book.id != bookId);
  // shift ids of books array elements starting from the removed element
  books.forEach((book) => {
    if (book.id > bookId) book.id -= 1;
  });
  // update book list html content with every action of removing books
  createBookList(books);
  localStorage.setItem('bookdata', JSON.stringify(books));
  title.focus();
}

// handle dynamically creating book list html content
function createBookList() {
  let singleBook = '';
  bookList.innerHTML = '';
  books.map((book) => {
    if (books.title !== '' && book.author !== '') {
      singleBook += `
      <div class='book-title'>${book.title}</div>
        <div class='book-author'>${book.author} </div>
        <button class='removes' id='remove${book.id}'>Remove</button>
      <hr />
      `;
    }
    return;
  });
  bookList.innerHTML = singleBook;
  // while creating a book element each time create event listener
  // for every remove button of the book list html element
  for (let i = 0; i < books.length; i += 1) {
    const removeButton = document.getElementById('remove' + i); // remove0
    removeButton.addEventListener('click', () => {
      const bookId = removeButton.id.slice(6);
      removeBooks(bookId);
    });
  }
}

// handle adding books to books array
function addBooks(titles, authors) {
  books.push({
    id: books.length,
    title: titles.value,
    author: authors.value,
  });
  // update book list html content with every action of adding books
  createBookList();
  title.focus();
  localStorage.setItem('bookdata', JSON.stringify(books));
}

const titles = document.getElementById('title');
const authors = document.getElementById('author');
//   handle button click event for add books
addButton.addEventListener('click', (e) => {
  addBooks(titles, authors);
  titles.value = '';
  authors.value = '';
  e.preventDefault();
});

// preserve data on browsers on page load
window.onload = () => {
  // assigning form fields to a variable.
  const form = document.querySelector('#form');
  // handling event for every change in input field
  form.addEventListener('input', () => {
    const fields = { title, author, books };
    // storing input values to a local storage.
    fields.title = title.value;
    fields.author = author.value;
    localStorage.setItem('data', JSON.stringify(fields));
  });
  // parsing the data.
  const data = JSON.parse(localStorage.getItem('data'));
  const bookdata = JSON.parse(localStorage.getItem('bookdata'));
  // assining values to input fields from local storage on page load.
  if (data !== null && data !== undefined) {
    title.value = data.title;
    author.value = data.author;
  }
  books = bookdata;
  createBookList();
  title.focus();
};
