import "./styles/main.scss";

import { createElementAndInsert } from "./utils";

const book = JSON.parse(localStorage.getItem("currentBook"));

const booksContainerHolder = document.createElement("div");
const bookContainer = document.getElementById("book-container");
booksContainerHolder.classList.add("bookInfo");

const ratingContainer = document.createElement("div");
ratingContainer.classList.add("rating-container");

const starsContainer = document.createElement("div");
starsContainer.classList.add("star-container");

const formReviewContainer = document.createElement("div");
const formReviewBtnHolder = document.createElement("div");
formReviewBtnHolder.classList.add("form-review__btnHolder");

createElementAndInsert("h1", "bookInfo__title", { innerText: book.volumeInfo.title }, booksContainerHolder);
createElementAndInsert("h1", "bookInfo__authors", { innerText: book.volumeInfo.authors }, booksContainerHolder);
createElementAndInsert("p", "bookInfo__categories", { innerText: book.volumeInfo.categories }, booksContainerHolder);
createElementAndInsert(
  "img",
  "bookInfo__imageContainer--image",
  { src: book.volumeInfo.imageLinks.thumbnail, alt: book.volumeInfo.title },
  booksContainerHolder,
);
createElementAndInsert("h2", "bookInfo__snippet", { innerText: book.searchInfo.textSnippet }, booksContainerHolder);
createElementAndInsert(
  "h3",
  "bookInfo__pageCount",
  { innerText: `${book.volumeInfo.pageCount} pages` },
  booksContainerHolder,
);
createElementAndInsert("p", "bookInfo__description", { innerText: book.volumeInfo.description }, booksContainerHolder);
createElementAndInsert(
  "p",
  "bookInfo__publishedDate",
  { innerText: `Published Date:  ${book.volumeInfo.publishedDate} ` },
  booksContainerHolder,
);
createElementAndInsert(
  "p",
  "bookInfo__publisher",
  { innerText: `  Published by: ${book.volumeInfo.publisher} ` },
  booksContainerHolder,
);

booksContainerHolder.appendChild(ratingContainer);
createElementAndInsert("p", "rating-container__text", { innerText: "Rate this book?" }, booksContainerHolder);

booksContainerHolder.appendChild(starsContainer);
const starsItems = ["", "", "", "", ""];
starsItems.forEach(() => {
  createElementAndInsert("span", "stars-container__star", { innerText: "★" }, starsContainer);
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

formReviewContainer.appendChild(formReviewBtnHolder);
booksContainerHolder.appendChild(formReviewContainer);
bookContainer.appendChild(booksContainerHolder);
