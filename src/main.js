import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;
const inputBtn = document.getElementById("form__button");
const container = document.querySelector(".container");

// display the input API request

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputEl = document.querySelector(".form__input");
  const inputElValue = inputEl.value;
  const booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputElValue}&key=${apiKey}`;

  // check validity of btn input
  const checkBtnValidity = () => {
    const pattern = /^[A-Za-z]+$/;
    if (!pattern.test(inputElValue)) {
      inputEl.style.setProperty("border", "2px solid red", "important");
      inputEl.value = "";
      inputEl.placeholder = "Wrong title";
    } else if (inputElValue.charAt(0) !== inputElValue.charAt(0).toUpperCase()) {
      inputEl.style.setProperty("border", "2px solid red", "important");
      inputEl.value = "";
      inputEl.placeholder = "Use capital letter";
    } else {
      inputEl.style.setProperty("border", "none");
      inputEl.value = "";
      inputEl.placeholder = "Search for the book";
      return true;
    }
  };

  if (!checkBtnValidity()) {
    return; // exit if the input is invalid
  }

  // main book project functionality
  const booksInformation = async () => {
    await fetch(booksUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        // Process the retrieved user data
        console.log(userData);

        // SEARCH FOR THE BOOK FUNCTIONALITY
        const bookContainer = document.getElementById("book-container");
        const bookItems = userData.items;

        bookContainer.innerText = "";

        // showing the book from inputValue
        const showInputValueBook = () => {
          // find first object in english
          let englishObject = bookItems.find((englishItem) => englishItem.volumeInfo.language === "en");

          if (englishObject) {
            const booksContainerHolder = document.createElement("div");
            booksContainerHolder.classList.add("bookInfo");

            // create book Title
            const bookInfoTitle = document.createElement("h1");
            bookInfoTitle.classList.add("bookInfo__title");
            bookInfoTitle.innerText = englishObject.volumeInfo.title;
            booksContainerHolder.appendChild(bookInfoTitle);

            //create book Author
            const bookInfoAuthor = document.createElement("h1");
            bookInfoAuthor.classList.add("bookInfo__author");
            bookInfoAuthor.innerText = englishObject.volumeInfo.authors;
            booksContainerHolder.appendChild(bookInfoAuthor);

            //create book categories
            const bookInfoCategories = document.createElement("p");
            bookInfoCategories.classList.add("bookInfo__categories");
            bookInfoCategories.innerText = englishObject.volumeInfo.categories;
            booksContainerHolder.appendChild(bookInfoCategories);

            //create image Element
            let imgInfoElement = document.createElement("img");
            imgInfoElement.classList.add("bookInfo__imageContainer--image");
            imgInfoElement.src = englishObject.volumeInfo.imageLinks.thumbnail;
            booksContainerHolder.appendChild(imgInfoElement);

            // create bookSnippet
            const bookInfoSnippet = document.createElement("h2");
            bookInfoSnippet.innerText = englishObject.searchInfo.textSnippet;
            bookInfoSnippet.classList.add("bookInfo__snippet");
            booksContainerHolder.appendChild(bookInfoSnippet);

            // create pagesCount
            const bookInfoPagesCount = document.createElement("h3");
            bookInfoPagesCount.innerText = `${englishObject.volumeInfo.pageCount} pages`;
            bookInfoPagesCount.classList.add("bookInfo__pageCount");
            booksContainerHolder.appendChild(bookInfoPagesCount);
            bookContainer.appendChild(booksContainerHolder);

            // create "showMoreBtn"
            // how to rewrite this part of code start //

            let moreItemsBtn = document.querySelector(".button-more");
            if (!moreItemsBtn) {
              let moreItemsBtn = document.createElement("button");
              moreItemsBtn.classList.add("button-more");
              moreItemsBtn.innerText = "Show more";
              container.appendChild(moreItemsBtn);
            }

            // how to rewrite this part of code end //
          } else {
            alert("There are no english books");
          }
        };
        showInputValueBook();

        // filter english language books

        // bookContainer.innerText = "";
        // const filteredEnglishBooks = bookItems.filter((englishBook) => {
        //   return englishBook.volumeInfo.language === "en" && englishBook.volumeInfo.pageCount > 0;
        // });

        // console.log(filteredEnglishBooks);

        // // mapping individual books in english
        // const mappedBooksInEnglish = () => {
        //   filteredEnglishBooks.map((englishBook) => {
        //     const booksContainer = document.createElement("div");
        //     booksContainer.classList.add("bookInfo");

        //     //create book Title
        //     const bookTitle = document.createElement("h1");
        //     bookTitle.classList.add("bookInfo__title");
        //     bookTitle.innerText = englishBook.volumeInfo.title;
        //     booksContainer.appendChild(bookTitle);

        //     //create book Author
        //     const bookAuthor = document.createElement("h1");
        //     bookAuthor.classList.add("bookInfo__author");
        //     bookAuthor.innerText = englishBook.volumeInfo.authors;
        //     booksContainer.appendChild(bookAuthor);

        //     //create book categories
        //     const bookCategories = document.createElement("p");
        //     bookCategories.classList.add("bookInfo__categories");
        //     bookCategories.innerText = englishBook.volumeInfo.categories;
        //     booksContainer.appendChild(bookCategories);

        //     //create image Element
        //     let imgElement = document.createElement("img");
        //     imgElement.classList.add("bookInfo__imageContainer--image");
        //     imgElement.src = englishBook.volumeInfo.imageLinks.thumbnail;
        //     booksContainer.appendChild(imgElement);

        //     // create bookSnippet
        //     const bookSnippet = document.createElement("h2");
        //     bookSnippet.innerText = englishBook.searchInfo.textSnippet;
        //     bookSnippet.classList.add("bookInfo__snippet");
        //     booksContainer.appendChild(bookSnippet);

        //     // create pagesCount
        //     const bookPagesCount = document.createElement("h3");
        //     bookPagesCount.innerText = `${englishBook.volumeInfo.pageCount} pages`;
        //     bookPagesCount.classList.add("bookInfo__pageCount");
        //     booksContainer.appendChild(bookPagesCount);

        //     booksContainer.addEventListener("click", () => {
        //       const description = booksContainer.querySelector(".bookInfo__description");
        //       const publishedDate = booksContainer.querySelector(".bookInfo__publishedDate");
        //       const publisher = booksContainer.querySelector(".bookInfo__publisher");
        //       // const ratingHolder = booksContainer.querySelector(".rating-container");
        //       // const formReviewHolder = booksContainer.querySelector(".form-review");
        //       if (description && publishedDate && publisher) {
        //         description.remove();
        //         publishedDate.remove();
        //         publisher.remove();
        //       } else {
        //         // create description
        //         const bookDescription = document.createElement("p");
        //         bookDescription.innerText = englishBook.volumeInfo.description;
        //         bookDescription.classList.add("bookInfo__description");
        //         booksContainer.appendChild(bookDescription);

        //         // create published date
        //         const bookPublishedDate = document.createElement("p");
        //         bookPublishedDate.innerText = englishBook.volumeInfo.publishedDate;
        //         bookPublishedDate.classList.add("bookInfo__publishedDate");
        //         booksContainer.appendChild(bookPublishedDate);

        //         // create published date
        //         const bookPublisher = document.createElement("p");
        //         bookPublisher.innerText = englishBook.volumeInfo.publisher;
        //         bookPublisher.classList.add("bookInfo__publisher");
        //         booksContainer.appendChild(bookPublisher);

        //         // create star rating system start
        //         const ratingContainer = document.createElement("div");
        //         ratingContainer.classList.add("rating-container");

        //         const header = document.createElement("p");
        //         header.classList.add("rating-container__text");
        //         header.innerText = "Rate this book?";
        //         ratingContainer.appendChild(header);
        //       }
        //     });

        //     // append all the information inside one main container
        //     bookContainer.appendChild(booksContainer);
        //   });
        // };
        // mappedBooksInEnglish();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  booksInformation();
  resetInput();
});

// additional functions

const resetInput = () => {
  document.querySelector(".form__input").value = "";
};
