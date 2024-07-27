import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;
const inputBtn = document.getElementById("form__button");
const container = document.querySelector(".container");
const otherBooksContainer = document.getElementById("multiple-book-container");
let moreItemsBtn = document.querySelector(".button-more");
let lessItemsBtn = document.querySelector(".button-less");

const isEnglishBookWithPages = (englishItem) =>
  englishItem.volumeInfo.language === "en" && englishItem.volumeInfo.pageCount > 0;

const createElementAndInsert = (tag, className, properties, container) => {
  const el = document.createElement(tag);
  el.classList.add(className);

  for (let key in properties) {
    el[key] = properties[key];
  }

  container.appendChild(el);
};

const createMoreItemsBtn = () => {
  if (!moreItemsBtn) {
    moreItemsBtn = document.createElement("button");
    moreItemsBtn.classList.add("button-more");
    moreItemsBtn.innerText = "Show more";
    container.appendChild(moreItemsBtn);
  }
};

const createLessItemsBtn = () => {
  if (!lessItemsBtn) {
    lessItemsBtn = document.createElement("button");
    lessItemsBtn.classList.add("button-less");
    lessItemsBtn.innerText = "Show less";
    container.appendChild(lessItemsBtn);
  }
};

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputEl = document.querySelector(".form__input");
  const inputElValue = inputEl.value;
  const booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputElValue}&key=${apiKey}`;

  // Clear previous errors
  const previousError = document.querySelector(".form__input-error");
  if (previousError) {
    previousError.remove();
  }

  const checkBtnValidity = () => {
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

  if (!checkBtnValidity()) {
    //// need explanation
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
        console.log(userData);

        const bookContainer = document.getElementById("book-container");

        const bookItems = userData.items;

        bookContainer.innerText = "";

        const showInputValueBook = () => {
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
              { innerText: englishObject.searchInfo.textSnippet },
              booksContainerHolder,
            );
            createElementAndInsert(
              "h3",
              "bookInfo__pageCount",
              { innerText: `${englishObject.volumeInfo.pageCount} pages` },
              booksContainerHolder,
            );

            bookContainer.appendChild(booksContainerHolder);

            createMoreItemsBtn();

            moreItemsBtn.addEventListener("click", showMoreBooks);
          } else {
            alert("There are no English books");
          }
        };

        const showMoreBooks = () => {
          // bookContainer.innerText = "";

          const filteredEnglishBooks = bookItems.filter(isEnglishBookWithPages);

          console.log(filteredEnglishBooks);

          const mappedBooksInEnglish = () => {
            filteredEnglishBooks
              .filter((_, i) => i > 0)
              .map((englishBook) => {
                const booksContainer = document.createElement("div");
                booksContainer.classList.add("bookInfo");

                createElementAndInsert(
                  "h1",
                  "bookInfo__title",
                  { innerText: englishBook.volumeInfo.title },
                  booksContainer,
                );

                createElementAndInsert(
                  "h1",
                  "bookInfo__authors",
                  { innerText: englishBook.volumeInfo.authors },
                  booksContainer,
                );

                createElementAndInsert(
                  "p",
                  "bookInfo__categories",
                  { innerText: englishBook.volumeInfo.categories },
                  booksContainer,
                );

                createElementAndInsert(
                  "img",
                  "bookInfo__imageContainer--image",
                  { src: englishBook.volumeInfo.imageLinks.thumbnail, alt: englishBook.volumeInfo.title },
                  booksContainer,
                );

                createElementAndInsert(
                  "h2",
                  "bookInfo__snippet",
                  { innerText: englishBook.searchInfo.textSnippet },
                  booksContainer,
                );

                createElementAndInsert(
                  "h3",
                  "bookInfo__pageCount",
                  { innerText: ` ${englishBook.volumeInfo.pageCount} pages ` },
                  booksContainer,
                );

                otherBooksContainer.appendChild(booksContainer);
              });
          };
          mappedBooksInEnglish();

          //// troubles starting here
          //// now it works but i need explanation if it is possible to fix and make easier to use.

          moreItemsBtn.remove();
          moreItemsBtn = null; // clear the reference so it can be re-created
          createLessItemsBtn();
          lessItemsBtn.addEventListener("click", showLessBooks);
        };

        const showLessBooks = () => {
          otherBooksContainer.innerText = ""; // Clear all additional books

          lessItemsBtn.remove();
          lessItemsBtn = null;
          createMoreItemsBtn();
          moreItemsBtn.addEventListener("click", showMoreBooks);
        };

        showInputValueBook();
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
