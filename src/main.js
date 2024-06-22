import "./styles/main.scss";

const apiKey = import.meta.env.VITE_API_KEY;
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const singleBookContainer = document.getElementById("single-book-container");
const multipleBookContainer = document.getElementById("multiple-book-container");
const showMoreButton = document.getElementById("show-more-button");

let allBooks = [];

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (searchTerm && checkInputValidity(searchTerm)) {
    singleBookContainer.innerHTML = "";
    multipleBookContainer.innerHTML = "";
    showMoreButton.style.display = "none";
    await fetchBooks(searchTerm);
  }
});

showMoreButton.addEventListener("click", () => {
  displayMultipleBooks();
});

function checkInputValidity(input) {
  const pattern = /^[A-Z][a-zA-Z\s]*$/;
  if (!pattern.test(input)) {
    searchInput.style.border = "2px solid red";
    searchInput.value = "";
    searchInput.placeholder = input.charAt(0) !== input.charAt(0).toUpperCase()
      ? "Use capital letter"
      : "Invalid input";
    return false;
  }
  searchInput.style.border = "none";
  searchInput.placeholder = "Search for the book";
  return true;
}

async function fetchBooks(query) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      allBooks = data.items.filter(book => book.volumeInfo.language === "en");
      displaySingleBook(allBooks[0]);
      if (allBooks.length > 1) {
        showMoreButton.style.display = "block";
      }
    } else {
      singleBookContainer.innerHTML = "<p>No books found.</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    singleBookContainer.innerHTML = "<p>An error occurred while fetching books.</p>";
  }
}

function displaySingleBook(book) {
  const bookElement = createBookElement(book, true);
  singleBookContainer.appendChild(bookElement);
}

function displayMultipleBooks() {
  multipleBookContainer.innerHTML = "";
  allBooks.slice(1).forEach(book => {
    const bookElement = createBookElement(book, false);
    multipleBookContainer.appendChild(bookElement);
  });
  showMoreButton.style.display = "none";
}

function createBookElement(book, isSingle) {
  const { title, authors, categories, imageLinks, description, pageCount } = book.volumeInfo;

  const bookDiv = document.createElement("div");
  bookDiv.className = isSingle ? "bookInfo" : "bookInfo bookInfo--small";

  bookDiv.innerHTML = `
    <h2 class="bookInfo__title">${title || 'Unknown Title'}</h2>
    <p class="bookInfo__author">${authors ? authors.join(', ') : 'Unknown Author'}</p>
    ${categories ? `<p class="bookInfo__categories">${categories.join(', ')}</p>` : ''}
    ${imageLinks ? `<img src="${imageLinks.thumbnail}" alt="${title}" class="bookInfo__imageContainer--image">` : ''}
    ${isSingle ? `<p class="bookInfo__description">${description || 'No description available'}</p>` : ''}
    <p class="bookInfo__pageCount">${pageCount ? `${pageCount} pages` : 'Unknown page count'}</p>
  `;

  if (!isSingle) {
    bookDiv.addEventListener('click', () => {
      console.log(`Clicked ${title}`);
    });
  }

  return bookDiv;
}

searchInput.addEventListener('input', () => {
  searchInput.style.border = 'none';
});