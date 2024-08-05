import "./styles/main.scss";

import { createElementAndInsert } from "./utils";

const book = JSON.parse(localStorage.getItem("currentBook"));
console.log("book:", book);
const bookId = book.id;
console.log("bookId:", bookId);

// const bookId =

if (!book) {
  // TODO if there is no book
  window.location.href = "/";
}

const bookContainer = document.getElementById("book-container");

// let data = localStorage.getItem('commentes')

const booksContainerHolder = createElementAndInsert("div", "bookInfo");

const ratingContainer = createElementAndInsert("div", "rating-container");

const starsContainer = createElementAndInsert("div", "star-container");

const formReviewContainer = document.createElement("div");

const formReviewBtnHolder = createElementAndInsert("div", "form-review__btnHolder");

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

// creating star rating system
const starsItems = ["", "", "", "", ""]; // TODO
starsItems.forEach(() => {
  createElementAndInsert("span", "stars-container__star", { innerText: "★" }, starsContainer);
});
// Add the star rating functionality using map
const stars = starsContainer.querySelectorAll(".stars-container__star");
const starArray = [...stars];
starArray.forEach((star, index) => {
  star.addEventListener("click", () => {
    starArray.forEach((star, index1) => {
      index >= index1 ? star.classList.add("active") : star.classList.remove("active");
    });
  });
});

formReviewContainer.appendChild(formReviewBtnHolder);
booksContainerHolder.appendChild(formReviewContainer);
bookContainer.appendChild(booksContainerHolder);

const formReview = createElementAndInsert("form", "form-review");
const formTextareaDiv = createElementAndInsert("div", "textarea");

createElementAndInsert(
  "textarea",
  "textarea__text",
  { placeholder: "Describe your experience!", cols: 30 },
  formTextareaDiv,
);

const reviewBtn = createElementAndInsert("button", "btn", { type: "button", innerText: "Post" }, formReviewBtnHolder);

formReview.appendChild(formTextareaDiv);
formReviewBtnHolder.appendChild(reviewBtn);
formReview.appendChild(formReviewBtnHolder);
bookContainer.appendChild(formReview);

// adding functionality to reviewBtn start

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

reviewBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const textAreaEl = document.querySelector(".textarea__text");
  const textAreaElValue = textAreaEl.value.trim(); // the trim() method of String values removes whitespace from both ends of this string and returns a new string, without modifying the original

  const reviewContainer = createElementAndInsert("div", "review-container", null, bookContainer);
  createElementAndInsert("p", "review-container__text", { innerText: textAreaElValue }, reviewContainer);

  textAreaEl.value = "";
  textAreaEl.placeholder = "Describe your experience!";

  // CREATE LOCAL STORAGE FUNCTIONALITY
  // doesn't work with dom elements - needs to be converted to array or object first

  // Retrieve existing reviews from localStorage or if none - create an empty array

  const newReview = { text: textAreaElValue };
  reviews.push(newReview);

  localStorage.setItem("reviews", JSON.stringify(reviews));

  console.log("reviews:", reviews);
});

window.addEventListener("DOMContentLoaded", () => {
  reviews.forEach((review) => {
    const reviewContainer = createElementAndInsert("div", "review-container", null, bookContainer);
    createElementAndInsert("p", "review-container__text", { innerText: review.text }, reviewContainer);
  });
});
// adding functionality to reviewBtn end

// нам треба спочатку отримати id книги - done;
// нам треба перевірити, что коли ми завантажуємо сторінку цей id вже має коментарі

// console.log(book)
// data = {
//   [book.id]: [
//     {comment: 'fsdas'},
//     {comment: '312312'},
//     {comment: '312312312312312'}
//   ],
//   [book.id]: [
//     {comment: 'fsdas'},
//     {comment: '312312'}
//   ],
// }

// localStorage.setItem('commentes', JSON.stringify(data))
