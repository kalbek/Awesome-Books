function main() {
  let books = [];
  const addButton = document.getElementById("add-books");
  const bookList = document.querySelector(".book-list");
  // handle dynamically creating book list html content
  function createBookList(currentBooks) {
    let singleBook = "";
    currentBooks.map((book) => {
      if (books.length !== 0)
        singleBook += `
                  <div class="book-title">${book.title} </div>
                  <div class="book-author">${book.author} </div>
                  <button class='removes' id='remove${book.id}'>Remove</button>
                  <hr />
              `;
    });
    bookList.innerHTML = singleBook;
 
  }
  // handle adding books to books array
  function addBooks(titles, authors) {
    books.push({
      id: books.length,
      title: titles.value,
      author: authors.value,
    });
    // update book list html content with every action of adding books
    createBookList(books);
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
}
main();
