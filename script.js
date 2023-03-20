let books = [];
const addButton = document.getElementById("add-books");
const bookList = document.querySelector(".book-list");
const title = document.getElementById("title");
const author = document.getElementById("author");
// handle dynamically creating book list html content
function createBookList() {
  bookList.innerHTML = "";
  books.forEach((book) => {
    if (book.title !== "" && book.author !== "") {
      bookList.innerHTML += `
      <div class='book-title'>${book.title}</div>
        <div class='book-author'>${book.author} </div>
        <button class='removes' id='${book.id}'>Remove</button>
      <hr />
      `;
    }
    // while creating a book element each time create event listener
    // for every remove button of the book list html element
    const removeButton = document.getElementById(book.id.toString()); // remove0
    removeButton.addEventListener("click", (e) => {
      console.log(Number(e.target.id));
      const bookId = Number(Number(e.target.id));
      removeBooks(bookId);
    });
  });
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
  localStorage.setItem("bookdata", JSON.stringify(books));
}
//  function to remove books  // 0, 1, 2, 3,
function removeBooks(bookId) {
  books = books.filter((book) => book.id !== bookId);
  // shift ids of books array elements starting from the removed element
  books.forEach((book) => {
    if (book.id > bookId) book.id -= 1;
  });
  // update book list html content with every action of removing books
  let singleBook = "";
  bookList.innerHTML = "";
  books.forEach((book) => {
    if (books.title !== "" && book.author !== "") {
      singleBook += `
      <div class='book-title'>${book.title}</div>
        <div class='book-author'>${book.author} </div>
        <button class='removes' id='${book.id}'>Remove</button>
      <hr />
      `;
    }
  });
  bookList.innerHTML = singleBook;
  localStorage.setItem("bookdata", JSON.stringify(books));
  title.focus();
}
const titles = document.getElementById("title");
const authors = document.getElementById("author");
//   handle button click event for add books
addButton.addEventListener("click", (e) => {
  addBooks(titles, authors);
  titles.value = "";
  authors.value = "";
  e.preventDefault();
});
