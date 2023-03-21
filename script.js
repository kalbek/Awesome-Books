let books = [];
const addButton = document.getElementById('add-books');
const bookList = document.querySelector('.book-list');
const title = document.getElementById('title');
const author = document.getElementById('author');
const titles = document.getElementById('title');
const authors = document.getElementById('author');
class Books {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  static removeBooks = (bookId) => {
    // first remove event listener for the book
    const removeButton = document.getElementById(bookId.toString());
    removeButton.removeEventListener('click', () => {});
    books = books.filter((book) => book.id !== bookId);
    // shift ids of books array elements starting from the removed element
    books.forEach((book) => {
      if (book.id > bookId) book.id -= 1;
    });
    // update book list html content with every action of removing books
    // replace with updating
    bookList.innerHTML = '';
    books.forEach((book) => {
      bookList.innerHTML += `
      <div class='flex'>
      <div class='flex-spaced w-100' id='${book.id % 2 === 0 ? 'evens' : 'odds'}'>
        <div class ='flex book-title-authors'>
          <div class='book-title'>"${book.title}" by </div>
          <div class='book-author'>&nbsp;${book.author} </div>
        </div>
        <div class='container'> 
         <button class='removes' id='${book.id}'>Remove</button>
      </div>
      </div>
    </div>
    `;
    });
    books.forEach((book) => {
      // while creating a book element each time create event listener
      // for every remove button of the book list html element
      const removeButton = document.getElementById(book.id.toString()); // remove0
      removeButton.addEventListener('click', () => {
        const bookId = Number(Number(book.id));
        Books.removeBooks(bookId);
      });
    });
    localStorage.setItem('bookdata', JSON.stringify(books));
    title.focus();
  };

  // handle dynamically creating book list html content
  static createBookList = () => {
    bookList.innerHTML = '';
    books.forEach((book) => {
      bookList.innerHTML += `
      <div class='flex'>
        <div class='flex-spaced w-100' id='${book.id % 2 === 0 ? 'evens' : 'odds'}'>
          <div class ='flex book-title-authors'>
            <div class='book-title'>"${book.title}" by </div>
            <div class='book-author'>&nbsp;${book.author} </div>
          </div>
          <div class='container'> 
           <button class='removes' id='${book.id}'>Remove</button>
        </div>
        </div>
      </div>
   
        `;
    });
    books.forEach((book) => {
      // for every remove button of the book list html element
      const removeButton = document.getElementById(book.id.toString());
      if (removeButton !== null) {
        removeButton.addEventListener('click', () => {
          const bookId = Number(Number(book.id));
          Books.removeBooks(bookId);
        });
      }
    });
  };

  static createBookList = () => {
    bookList.innerHTML = '';
    books.forEach((book) => {
      bookList.innerHTML += `
      <div class='flex'>
        <div class='flex-spaced w-100' id='${book.id % 2 === 0 ? 'evens' : 'odds'}'>
          <div class ='flex book-title-authors'>
            <div class='book-title'>"${book.title}" by </div>
            <div class='book-author'>&nbsp;${book.author} </div>
          </div>
          <div class='container'> 
           <button class='removes' id='${book.id}'>Remove</button>
        </div>
        </div>
      </div>
        `;
    });
    books.forEach((book) => {
      // for every remove button of the book list html element
      const removeButton = document.getElementById(book.id.toString());
      if (removeButton !== null) {
        removeButton.addEventListener('click', () => {
          const bookId = Number(Number(book.id));
          Books.removeBooks(bookId);
        });
      }
    });
  };

  // handle adding books to books array
  static addBooks = (titles, authors) => {
    books.push({
      id: books.length,
      title: titles.value,
      author: authors.value,
    });
    // update book list html content with every action of adding books
    Books.createBookList();
    title.focus();
    localStorage.setItem('bookdata', JSON.stringify(books));
  };
}
//   handle button click event for add books
addButton.addEventListener('click', (e) => {
  Books.addBooks(titles, authors);
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
  Books.createBookList();
  this.title.focus();
};
