import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;
const inputBtn = document.getElementById("form__button");

// create a star rating system
// const stars = document.querySelectorAll(".stars-container__star");
// stars.forEach((star, index) => {
//   star.addEventListener("click", () => {
//     stars.forEach((star, index1) => {
//       index >= index1 ? star.classList.add("active") : star.classList.remove("active");
//     });
//   });
// });
// display the input API request

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputElValue = document.querySelector(".form__input").value;
  const booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputElValue}&key=${apiKey}`;

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

        const filteredEnglishBooks = bookItems.filter((englishBook) => {
          return englishBook.volumeInfo.language === "en";
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

            // create description
            const bookDescription = document.createElement("h2");
            bookDescription.innerText = englishBook.volumeInfo.description;
            bookDescription.classList.add("bookInfo__description");
            booksContainer.appendChild(bookDescription);

            const reduceBookDescription = (description) => {
              const maxLength = 200;
              if (description.length > maxLength) {
                return description.substring(0, maxLength) + ` ...`;
              } else {
                return description;
              }
            };

            const reducedBookDescription = reduceBookDescription(bookDescription.innerText);
            bookDescription.innerText = reducedBookDescription;

            // create pagesCount
            const bookPagesCount = document.createElement("h3");
            bookPagesCount.innerText = `${englishBook.volumeInfo.pageCount} pages`;
            bookPagesCount.classList.add("bookInfo__pageCount");
            booksContainer.appendChild(bookPagesCount);

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

            for (let i = 0; i < 5; i++) {
              const starItem = document.createElement("span");
              starItem.classList.add("stars-container__star");
              starItem.innerText = "★";
              starsContainer.appendChild(starItem);
            }

            // Add the star rating functionality
            const stars = starsContainer.querySelectorAll(".stars-container__star");
            stars.forEach((star, index) => {
              star.addEventListener("click", () => {
                stars.forEach((star, index1) => {
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

            // create user experience form end

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
