import "./styles/main.scss";
import { createElementAndInsert } from "./utils";
const API_KEY = import.meta.env.VITE_API_KEY;

const inputBtn = document.getElementById("form__button");
const container = document.querySelector(".container");
const otherBooksContainer = document.getElementById("multiple-book-container");

let moreItemsBtn;
let lessItemsBtn;
let bookItems = [];

const isEnglishBookWithPages = (englishItem) =>
  englishItem.volumeInfo.language === "en" && englishItem.volumeInfo.pageCount > 0;

const createMoreItemsBtn = () => {
  if (moreItemsBtn) {
    return;
  } else {
    moreItemsBtn = createElementAndInsert("button", "button-more", { innerText: "Show more" }, container);
  }
};

const createLessItemsBtn = () => {
  if (lessItemsBtn) {
    return;
  } else {
    lessItemsBtn = createElementAndInsert("button", "button-less", { innerText: "Show less" }, container);
  }
};

const showInputValueBook = (bookContainer) => {
  let englishObject = bookItems.find(isEnglishBookWithPages);

  if (englishObject) {
    const booksContainerHolder = document.createElement("div");
    booksContainerHolder.classList.add("bookInfo");

    createElementAndInsert(
      "h1",
      "bookInfo__title",
      { innerText: englishObject.volumeInfo.title },
      booksContainerHolder,
    );
    createElementAndInsert(
      "h1",
      "bookInfo__authors",
      { innerText: englishObject.volumeInfo.authors },
      booksContainerHolder,
    );
    createElementAndInsert(
      "p",
      "bookInfo__categories",
      { innerText: englishObject.volumeInfo.categories },
      booksContainerHolder,
    );
    createElementAndInsert(
      "img",
      "bookInfo__imageContainer--image",
      { src: englishObject.volumeInfo.imageLinks.thumbnail, alt: englishObject.volumeInfo.title },
      booksContainerHolder,
    );
    createElementAndInsert(
      "h2",
      "bookInfo__snippet",
      {
        innerText:
          englishObject.searchInfo?.textSnippet ||
          englishObject.volumeInfo.description ||
          "No description available",
      },
      booksContainerHolder,
    );
    createElementAndInsert(
      "h3",
      "bookInfo__pageCount",
      { innerText: `${englishObject.volumeInfo.pageCount} pages` },
      booksContainerHolder,
    );

    booksContainerHolder.addEventListener("click", () => {
      localStorage.setItem("currentBook", JSON.stringify(englishObject));
      window.location.href = "./details.html";
    });

    bookContainer.appendChild(booksContainerHolder);

    createMoreItemsBtn();

    moreItemsBtn.addEventListener("click", showMoreBooks);
  } else {
    alert("There are no English books");
  }
};

const showMoreBooks = () => {
  const filteredEnglishBooks = bookItems.filter(isEnglishBookWithPages);
  otherBooksContainer.innerText = "";
  createBooksList(filteredEnglishBooks);

  //// now it works but i need explanation if it is possible to fix and make easier to use.

  moreItemsBtn.remove();
  moreItemsBtn = null; // clear the reference so it can be re-created
  createLessItemsBtn();
  lessItemsBtn.addEventListener("click", showLessBooks);
};

const showLessBooks = () => {
  otherBooksContainer.innerText = "";

  lessItemsBtn.remove();
  lessItemsBtn = null;
  createMoreItemsBtn();
  moreItemsBtn.addEventListener("click", showMoreBooks);
};

const checkBtnValidity = (inputElValue, inputEl) => {
  // Allow letters, spaces, and common punctuation characters
  const pattern = /^[A-Za-z\s.,'!]+$/;
  const inputError = document.createElement("p");

  inputError.classList.add("form__input-error");

  if (!pattern.test(inputElValue)) {
    inputError.innerText = "Wrong book title";
    inputEl.insertAdjacentElement("afterend", inputError);

    return false;
  } else if (inputElValue.charAt(0) !== inputElValue.charAt(0).toUpperCase()) {
    inputError.innerText = "Use capital letter";
    inputEl.insertAdjacentElement("afterend", inputError);
    inputEl.value = "";

    return false; // this case works
  } else {
    inputEl.style.setProperty("border", "none");
    inputEl.placeholder = "Search for the book";

    return true;
  }
};

const createBooksList = (books) => {
  books
    .filter((_, i) => i > 0)
    .forEach((book) => {
      const booksContainer = document.createElement("div");
      booksContainer.classList.add("bookInfo");

      createElementAndInsert("h1", "bookInfo__title", { innerText: book.volumeInfo.title }, booksContainer);

      createElementAndInsert("h1", "bookInfo__authors", { innerText: book.volumeInfo.authors }, booksContainer);

      createElementAndInsert("p", "bookInfo__categories", { innerText: book.volumeInfo.categories }, booksContainer);

      createElementAndInsert(
        "img",
        "bookInfo__imageContainer--image",
        { src: book.volumeInfo.imageLinks.thumbnail, alt: book.volumeInfo.title },
        booksContainer,
      );
      createElementAndInsert(
        "h2",
        "bookInfo__snippet",
        { innerText: book?.searchInfo?.textSnippet || book.volumeInfo.description || "No description available" },
        booksContainer,
      );

      createElementAndInsert(
        "h3",
        "bookInfo__pageCount",
        { innerText: ` ${book.volumeInfo.pageCount} pages ` },
        booksContainer,
      );

      booksContainer.addEventListener("click", () => {
        localStorage.setItem("currentBook", JSON.stringify(book));
        window.location.href = "./details.html";
      });

      otherBooksContainer.appendChild(booksContainer);
    });
};

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputEl = document.querySelector(".form__input");
  const inputElValue = inputEl.value;
  const booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputElValue}&key=${API_KEY}`;

  // Clear previous errors
  const previousError = document.querySelector(".form__input-error");
  if (previousError) {
    previousError.remove();
  }

  if (!checkBtnValidity(inputElValue, inputEl)) {
    return;
  }

  const booksInformation = async () => {
    await fetch(booksUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        const bookContainer = document.getElementById("book-container");

        bookItems = userData.items;
        bookContainer.innerText = "";

        showInputValueBook(bookContainer);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  booksInformation();
  resetInput();
});

const resetInput = () => {
  document.querySelector(".form__input").value = "";
};
