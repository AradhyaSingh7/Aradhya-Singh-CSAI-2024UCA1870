const allBooksList = [
  { title: "The Da Vinci Code", author: "Dan Brown", imgSrc: "images/daVinci.jpg", review:"images/r1.png"},
  { title: "A Tale Of Two Cities", author: "Charles Dickens", imgSrc: "images/book2.jpg",review:"images/r2.png" },
  { title: "To Kill A Mockingbird", author: "Harper Lee", imgSrc: "images/book3.jpg",review:"images/r3.png" },
  { title: "1984", author: "George Orwell", imgSrc: "images/book4.jpg",review:"images/r4.png" },
  { title: "Pride and Prejudice", author: "Jane Austen", imgSrc: "images/book5.jpg", review:"images/r5.png"},
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", imgSrc: "images/book6.jpg", review:"images/r2.png" },
  { title: "Murder On The Orient Express", author: "Agatha Christie", imgSrc: "images/book7.jpg", review:"images/r1.png" },
  { title: "Little Women", author: "Louisa May Alcott", imgSrc: "images/book8.jpg",review:"images/r3.png"},
  { title: "The Book Thief", author: "Markus Zusak", imgSrc: "images/book9.jpg", review:"images/r4.png"},
  { title: "The Silent Patient", author: "Alex Michaelides", imgSrc: "images/book10.jpg",review:"images/r1.png" },
  { title: "The Lord Of The Rings", author: "J.R.R Tolkein", imgSrc: "images/book11.jpg",review:"images/r5.png" },
  { title: "Three Men In A Boat", author: "Jerome K. Jerome", imgSrc: "images/book12.jpg",review:"images/r2.png" },
];

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("index.html")) {
    attachAddToMyBooksListeners();
  } else if (window.location.pathname.includes("allBooks.html")) {
    displayAllBooks();
  } else if (window.location.pathname.includes("myBooks.html")) {
    displayMyBooks();
  }
});

function addToMyBooks(bookDetails) {
  const myBooks = JSON.parse(localStorage.getItem("myBooks")) || [];
  
  const bookExists = myBooks.some((book) => book.title === bookDetails.title);
  if (!bookExists) {
    myBooks.push(bookDetails);
    localStorage.setItem("myBooks", JSON.stringify(myBooks));
    alert(`${bookDetails.title} has been added to your MyBooks!`);
  } else {
    alert(`${bookDetails.title} is already in your MyBooks.`);
  }
}

function displayAllBooks() {
  const booksContainer = document.querySelector(".books");
  booksContainer.innerHTML = allBooksList
    .map(
      (book) => `
      <div class="book">
        <img src="${book.imgSrc}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <img src="${book.review}" alt="Review Stars">
        <button class="add-to-mybooks">Add to MyBooks</button>
      </div>
    `
    )
    .join("");

  attachAddToMyBooksListeners();
}

function displayMyBooks() {
  const myBooksContainer = document.querySelector(".myBooks");
  const myBooks = JSON.parse(localStorage.getItem("myBooks")) || [];

  if (myBooks.length === 0) {
    myBooksContainer.innerHTML = "<p>Your MyBooks collection is empty.</p>";
  } else {
    myBooksContainer.innerHTML = myBooks
      .map(
        (book) => `
        <div class="book">
          <img src="${book.imgSrc}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
        </div>
      `
      )
      .join("");
  }
}

function attachAddToMyBooksListeners() {
  const addToMyBooksButtons = document.querySelectorAll(".add-to-mybooks");
  addToMyBooksButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookElement = e.target.parentElement;
      const bookDetails = {
        title: bookElement.querySelector("h3").innerText,
        author: bookElement.querySelector("p").innerText,
        imgSrc: bookElement.querySelector("img").src,
      };
      addToMyBooks(bookDetails);
    });
  });
}

function searchBooks() {
  const searchInput = document.getElementById("searchBar").value.toLowerCase();
  const booksContainer = document.querySelector(".books");

  const filteredBooks = allBooksList.filter(
    (book) =>
      book.title.toLowerCase().includes(searchInput) ||
      book.author.toLowerCase().includes(searchInput)
  );

  if (filteredBooks.length > 0) {
    booksContainer.innerHTML = filteredBooks
      .map(
        (book) => `
        <div class="book">
          <img src="${book.imgSrc}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <button class="add-to-mybooks">Add to MyBooks</button>
        </div>
      `
      )
      .join("");

    attachAddToMyBooksListeners();
  } else {
    booksContainer.innerHTML = `<p>No books found for "${searchInput}".</p>`;
  }
}
