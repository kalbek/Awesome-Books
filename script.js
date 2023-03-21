let books = [];
const addButton = document.getElementById("add-books");
const bookList = document.querySelector(".book-list");
const title = document.getElementById("title");
const author = document.getElementById("author");
// handle dynamically creating book list html content
function createBookList() {
  bookList.innerHTML = "";
  books.forEach((book, index) => {
    if (book.title !== "" && book.author !== "") {
      bookList.innerHTML += `
      <div class='book-title'>${book.title}</div>
        <div class='book-author'>${book.author} </div>
        <button class='removes' id='${book.id}'>Remove</button>
      <hr />
      `;
    }
  });

  books.forEach((book, index) => {
    // while creating a book element each time create event listener
    // for every remove button of the book list html element
    const removeButton = document.getElementById(index.toString()); // remove0
    removeButton.addEventListener("click", () => {
      console.log(Number(index));
      const bookId = Number(Number(index));
      console.log("book Id: ", removeButton);
      removeBooks(bookId);
    });
    console.log(removeButton)
  });
  // console.log(bookList);
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
  console.log("book id: ", bookId);
  // first remove event listener for the book
  const removeButton = document.getElementById(bookId.toString());
  removeButton.removeEventListener("click", () => {});
  books = books.filter((book) => book.id !== bookId);
  // shift ids of books array elements starting from the removed element
  books.forEach((book) => {
    if (book.id > bookId) book.id -= 1;
  });
  // update book list html content with every action of removing books
  createBookList();
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
