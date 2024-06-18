import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;
const inputBtn = document.getElementById("form__button");

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
      inputEl.value = ""; // Clear the input value
      inputEl.placeholder = "Use capital letter";
    } else {
      inputEl.style.setProperty("border", "none");
      inputEl.value = ""; // Clear the input value
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

        // filter english language books

        bookContainer.innerText = "";
        const filteredEnglishBooks = bookItems.filter((englishBook) => {
          return englishBook.volumeInfo.language === "en" && englishBook.volumeInfo.pageCount > 0;
        });

        console.log(filteredEnglishBooks);

        // mapping individual books in english
        const mappedBooksInEnglish = () => {
          filteredEnglishBooks.map((englishBook) => {
            const booksContainer = document.createElement("div");
            booksContainer.classList.add("bookInfo");

            //create book Title
            const bookTitle = document.createElement("h1");
            bookTitle.classList.add("bookInfo__title");
            bookTitle.innerText = englishBook.volumeInfo.title;
            booksContainer.appendChild(bookTitle);

            //create book Author
            const bookAuthor = document.createElement("h1");
            bookAuthor.classList.add("bookInfo__author");
            bookAuthor.innerText = englishBook.volumeInfo.authors;
            booksContainer.appendChild(bookAuthor);

            //create book categories
            const bookCategories = document.createElement("p");
            bookCategories.classList.add("bookInfo__categories");
            bookCategories.innerText = englishBook.volumeInfo.categories;
            booksContainer.appendChild(bookCategories);

            //create image Element
            let imgElement = document.createElement("img");
            imgElement.classList.add("bookInfo__imageContainer--image");
            imgElement.src = englishBook.volumeInfo.imageLinks.thumbnail;
            booksContainer.appendChild(imgElement);

            // create bookSnippet
            const bookSnippet = document.createElement("h2");
            bookSnippet.innerText = englishBook.searchInfo.textSnippet;
            bookSnippet.classList.add("bookInfo__snippet");
            booksContainer.appendChild(bookSnippet);

            // create pagesCount
            const bookPagesCount = document.createElement("h3");
            bookPagesCount.innerText = `${englishBook.volumeInfo.pageCount} pages`;
            bookPagesCount.classList.add("bookInfo__pageCount");
            booksContainer.appendChild(bookPagesCount);

            booksContainer.addEventListener("click", () => {
              const description = booksContainer.querySelector(".bookInfo__description");
              const publishedDate = booksContainer.querySelector(".bookInfo__publishedDate");
              const publisher = booksContainer.querySelector(".bookInfo__publisher");
              const ratingHolder = booksContainer.querySelector(".rating-container");
              const formReviewHolder = booksContainer.querySelector(".form-review");
              if (description && publishedDate && publisher && ratingHolder && formReviewHolder) {
                description.remove();
                publishedDate.remove();
                publisher.remove();
                ratingHolder.remove();
                formReviewHolder.remove();
              } else {
                // create description
                const bookDescription = document.createElement("p");
                bookDescription.innerText = englishBook.volumeInfo.description;
                bookDescription.classList.add("bookInfo__description");
                booksContainer.appendChild(bookDescription);

                // create published date
                const bookPublishedDate = document.createElement("p");
                bookPublishedDate.innerText = englishBook.volumeInfo.publishedDate;
                bookPublishedDate.classList.add("bookInfo__publishedDate");
                booksContainer.appendChild(bookPublishedDate);

                // create published date
                const bookPublisher = document.createElement("p");
                bookPublisher.innerText = englishBook.volumeInfo.publisher;
                bookPublisher.classList.add("bookInfo__publisher");
                booksContainer.appendChild(bookPublisher);

                // create star rating system start
                const ratingContainer = document.createElement("div");
                ratingContainer.classList.add("rating-container");

                const header = document.createElement("p");
                header.classList.add("rating-container__text");
                header.innerText = "Rate this book?";
                ratingContainer.appendChild(header);

                const starsContainer = document.createElement("div");
                starsContainer.classList.add("star-container");
                ratingContainer.appendChild(starsContainer);

                // new version of creating star rating using map
                const starsItems = ["", "", "", "", ""];
                starsItems.map(() => {
                  const starItem = document.createElement("span");
                  starItem.classList.add("stars-container__star");
                  starItem.innerText = "★";
                  starsContainer.appendChild(starItem);
                });

                // Add the star rating functionality using map
                const stars = starsContainer.querySelectorAll(".stars-container__star");
                const starArray = [...stars];
                starArray.map((star, index) => {
                  star.addEventListener("click", () => {
                    starArray.map((star, index1) => {
                      index >= index1 ? star.classList.add("active") : star.classList.remove("active");
                    });
                  });
                });

                booksContainer.appendChild(ratingContainer);

                // create star rating system end

                // create review form start

                const formReviewContainer = document.createElement("div");

                const formReview = document.createElement("form");
                formReview.classList.add("form-review");
                const formTextarea = document.createElement("div");
                formTextarea.classList.add("textarea");
                const textAreaText = document.createElement("textarea");
                textAreaText.placeholder = "Describe your experience";
                textAreaText.cols = 30;
                textAreaText.classList.add("textarea__text");
                formTextarea.appendChild(textAreaText);

                formReview.appendChild(formTextarea);

                const formReviewBtnHolder = document.createElement("div");
                formReviewBtnHolder.classList.add("form-review__btnHolder");

                const reviewBtn = document.createElement("button");
                reviewBtn.classList.add("btn");
                reviewBtn.type = "submit";
                reviewBtn.innerText = "Post";
                formReviewBtnHolder.appendChild(reviewBtn);

                formReview.appendChild(formReviewBtnHolder);
                formReviewContainer.appendChild(formReview);
                formReviewContainer;

                booksContainer.appendChild(formReviewContainer);
              }
              // create user experience form end
            });

            // append all the information inside one main container
            bookContainer.appendChild(booksContainer);
          });
        };
        mappedBooksInEnglish();
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
