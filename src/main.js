import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;
const inputBtn = document.getElementById("form__button");
const container = document.querySelector(".container");
const bookContainer = document.getElementById("book-container");
let multipleContainer = document.querySelector(".multiple-book-container");

if (!multipleContainer) {
  console.log("Creating multiple-book-container");
  multipleContainer = document.createElement("div");
  multipleContainer.classList.add("multiple-book-container");
  bookContainer.appendChild(multipleContainer);
}

const createBookElement = (book) => {
  const booksContainer = document.createElement("div");
  booksContainer.classList.add("bookInfo");

  const bookTitle = document.createElement("h1");
  bookTitle.classList.add("bookInfo__title");
  bookTitle.innerText = book.volumeInfo.title || "Unknown Title";
  booksContainer.appendChild(bookTitle);

  const bookAuthor = document.createElement("h1");
  bookAuthor.classList.add("bookInfo__author");
  bookAuthor.innerText = book.volumeInfo.authors?.join(", ") || "Unknown Author";
  booksContainer.appendChild(bookAuthor);

  const bookCategories = document.createElement("p");
  bookCategories.classList.add("bookInfo__categories");
  bookCategories.innerText = book.volumeInfo.categories?.join(", ") || "Uncategorized";
  booksContainer.appendChild(bookCategories);

  let imgElement = document.createElement("img");
  imgElement.classList.add("bookInfo__imageContainer--image");
  imgElement.src = book.volumeInfo.imageLinks?.thumbnail || 'path/to/default-image.jpg';
  booksContainer.appendChild(imgElement);

  const bookSnippet = document.createElement("h2");
  bookSnippet.innerText = book.searchInfo?.textSnippet || "No snippet available";
  bookSnippet.classList.add("bookInfo__snippet");
  booksContainer.appendChild(bookSnippet);

  const bookPagesCount = document.createElement("h3");
  bookPagesCount.innerText = `${book.volumeInfo.pageCount || "Unknown"} pages`;
  bookPagesCount.classList.add("bookInfo__pageCount");
  booksContainer.appendChild(bookPagesCount);

  return booksContainer;
};

inputBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const inputEl = document.querySelector(".form__input");
  const inputElValue = inputEl.value;

  if (!checkBtnValidity(inputElValue)) {
    return;
  }

  const booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputElValue}&key=${apiKey}`;

  try {
    const response = await fetch(booksUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const userData = await response.json();
    console.log("API Response:", userData);

    if (!userData.items || userData.items.length === 0) {
      console.log("No books found");
      bookContainer.innerText = "No books found";
      return;
    }

    bookContainer.innerText = "";
    multipleContainer.innerText = "";
    let englishBook = userData.items.find(item => item.volumeInfo.language === "en");

    if (englishBook) {
      console.log("Found English book:", englishBook);
      const bookElement = createBookElement(englishBook);
      bookContainer.appendChild(bookElement);

      let moreItemsBtn = document.querySelector(".button-more");
      if (!moreItemsBtn) {
        moreItemsBtn = document.createElement("button");
        moreItemsBtn.classList.add("button-more");
        moreItemsBtn.innerText = "Show more";
        container.appendChild(moreItemsBtn);
      }

      moreItemsBtn.addEventListener("click", () => {
        console.log('Show more clicked');
        bookContainer.innerText = "";
        multipleContainer.innerText = "";

        const filteredEnglishBooks = userData.items.filter((book) => {
          return book.volumeInfo.language === "en" && book.volumeInfo.pageCount > 0;
        });

        console.log("Filtered English Books:", filteredEnglishBooks);

        if (filteredEnglishBooks.length > 0) {
          filteredEnglishBooks.forEach((book, index) => {
            const bookElement = createBookElement(book);
            multipleContainer.appendChild(bookElement);
            console.log("Multiple container display:", getComputedStyle(multipleContainer).display);
            console.log("Multiple container visibility:", getComputedStyle(multipleContainer).visibility);
            console.log("Multiple container dimensions:", multipleContainer.getBoundingClientRect());
            console.log(`Appended book ${index + 1}:`, book.volumeInfo.title);
          });
          console.log("Final container contents:", multipleContainer.innerHTML);
        } else {
          console.log("No additional English books found");
          multipleContainer.innerText = "No additional English books found";
        }

        moreItemsBtn.remove();
        multipleContainer.style.display = "flex";
        multipleContainer.style.flexWrap = 'wrap';
        multipleContainer.style.gap = '20px';
        multipleContainer.style.border = '5px solid red';
        multipleContainer.style.padding = '20px';
        console.log("Multiple container contents:", multipleContainer.innerHTML);
      });
    } else {
      console.log("No English books found");
      bookContainer.innerText = "No English books found";
    }
  } catch (error) {
    console.error("Error:", error);
    bookContainer.innerText = "An error occurred while fetching books";
  }

  resetInput();
});

const checkBtnValidity = (inputElValue) => {
  const pattern = /^[A-Za-z]+$/;
  const inputEl = document.querySelector(".form__input");

  if (!pattern.test(inputElValue)) {
    inputEl.style.setProperty("border", "2px solid red", "important");
    inputEl.value = "";
    inputEl.placeholder = "Wrong title";
    return false;
  } else if (inputElValue.charAt(0) !== inputElValue.charAt(0).toUpperCase()) {
    inputEl.style.setProperty("border", "2px solid red", "important");
    inputEl.value = "";
    inputEl.placeholder = "Use capital letter";
    return false;
  } else {
    inputEl.style.setProperty("border", "none");
    inputEl.placeholder = "Search for the book";
    return true;
  }
};

const resetInput = () => {
  document.querySelector(".form__input").value = "";
};

console.log("DOM structure:", bookContainer.outerHTML);
console.log("Multiple container child count:", multipleContainer.children.length);

