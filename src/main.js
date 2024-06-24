import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;
const inputBtn = document.getElementById("form__button");
const container = document.querySelector(".container");
let moreItemsBtn = document.querySelector(".button-more");
let lessItemsBtn = document.querySelector(".button-less");
let form = document.querySelector(".form");

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
    const pattern = /^[A-Za-z0-9\s.,'!]+$/;
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
      return false;
    } else {
      inputEl.style.setProperty("border", "none");
      inputEl.placeholder = "Search for the book";
      return true;
    }
  };

  if (!checkBtnValidity()) {
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
          let englishObject = bookItems.find((englishItem) => englishItem.volumeInfo.language === "en");

          if (englishObject) {
            const booksContainerHolder = document.createElement("div");
            booksContainerHolder.classList.add("bookInfo");

            const bookInfoTitle = document.createElement("h1");
            bookInfoTitle.classList.add("bookInfo__title");
            bookInfoTitle.innerText = englishObject.volumeInfo.title;
            booksContainerHolder.appendChild(bookInfoTitle);

            const bookInfoAuthor = document.createElement("h1");
            bookInfoAuthor.classList.add("bookInfo__author");
            bookInfoAuthor.innerText = englishObject.volumeInfo.authors;
            booksContainerHolder.appendChild(bookInfoAuthor);

            const bookInfoCategories = document.createElement("p");
            bookInfoCategories.classList.add("bookInfo__categories");
            bookInfoCategories.innerText = englishObject.volumeInfo.categories;
            booksContainerHolder.appendChild(bookInfoCategories);

            let imgInfoElement = document.createElement("img");
            imgInfoElement.classList.add("bookInfo__imageContainer--image");
            imgInfoElement.src = englishObject.volumeInfo.imageLinks.thumbnail;
            booksContainerHolder.appendChild(imgInfoElement);

            const bookInfoSnippet = document.createElement("h2");
            bookInfoSnippet.innerText = englishObject.searchInfo.textSnippet;
            bookInfoSnippet.classList.add("bookInfo__snippet");
            booksContainerHolder.appendChild(bookInfoSnippet);

            const bookInfoPagesCount = document.createElement("h3");
            bookInfoPagesCount.innerText = `${englishObject.volumeInfo.pageCount} pages`;
            bookInfoPagesCount.classList.add("bookInfo__pageCount");
            booksContainerHolder.appendChild(bookInfoPagesCount);
            bookContainer.appendChild(booksContainerHolder);

            createMoreItemsBtn();

            moreItemsBtn.addEventListener("click", showMoreBooks);
          } else {
            alert("There are no English books");
          }
        };

        const showMoreBooks = () => {
          bookContainer.innerText = "";

          const filteredEnglishBooks = bookItems.filter((englishBook) => {
            return englishBook.volumeInfo.language === "en" && englishBook.volumeInfo.pageCount > 0;
          });

          console.log(filteredEnglishBooks);

          const mappedBooksInEnglish = () => {
            filteredEnglishBooks.map((englishBook) => {
              const booksContainer = document.createElement("div");
              booksContainer.classList.add("bookInfo");

              const bookTitle = document.createElement("h1");
              bookTitle.classList.add("bookInfo__title");
              bookTitle.innerText = englishBook.volumeInfo.title;
              booksContainer.appendChild(bookTitle);

              const bookAuthor = document.createElement("h1");
              bookAuthor.classList.add("bookInfo__author");
              bookAuthor.innerText = englishBook.volumeInfo.authors;
              booksContainer.appendChild(bookAuthor);

              const bookCategories = document.createElement("p");
              bookCategories.classList.add("bookInfo__categories");
              bookCategories.innerText = englishBook.volumeInfo.categories;
              booksContainer.appendChild(bookCategories);

              let imgElement = document.createElement("img");
              imgElement.classList.add("bookInfo__imageContainer--image");
              imgElement.src = englishBook.volumeInfo.imageLinks.thumbnail;
              booksContainer.appendChild(imgElement);

              const bookSnippet = document.createElement("h2");
              bookSnippet.innerText = englishBook.searchInfo.textSnippet;
              bookSnippet.classList.add("bookInfo__snippet");
              booksContainer.appendChild(bookSnippet);

              const bookPagesCount = document.createElement("h3");
              bookPagesCount.innerText = `${englishBook.volumeInfo.pageCount} pages`;
              bookPagesCount.classList.add("bookInfo__pageCount");
              booksContainer.appendChild(bookPagesCount);

              bookContainer.appendChild(booksContainer);
            });
          };
          mappedBooksInEnglish();
          moreItemsBtn.remove();
          createLessItemsBtn();
          lessItemsBtn.addEventListener("click", showLessBooks);
        };

        const showLessBooks = () => {
          while (bookContainer.children.length > 1) {
            bookContainer.removeChild(bookContainer.children[1]);
          }
          lessItemsBtn.remove();
          // moreItemsBtn = null; // clear the reference so it can be re-created
          createMoreItemsBtn();
        };

        createMoreItemsBtn();

        moreItemsBtn.addEventListener("click", showMoreBooks);

        // line 181 - 192 why it works that way? + line 192 doesn't show again more books
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
