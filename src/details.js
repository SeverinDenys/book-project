import "./styles/main.scss";
import { createElementAndInsert } from "./utils";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16),
  );
}

const book = JSON.parse(localStorage.getItem("currentBook"));
 

let editingComment = null;

if (!book) {
  window.location.href = "/";
}

const bookContainer = document.getElementById("book-container");

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

const starsItems = ["", "", "", "", ""];
starsItems.forEach(() => {
  createElementAndInsert("span", "stars-container__star", { innerText: "★" }, starsContainer);
});

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

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

const editCommentHandler = (editIcon) => {
  editIcon.addEventListener("click", () => {
    const reviewContainer = editIcon.closest(".review-container");
    const reviewId = reviewContainer.getAttribute("data-id");
    const reviewText = reviewContainer.querySelector(".review-container__text");
    const textAreaText = document.querySelector(".textarea__text");
    textAreaText.value = reviewText.innerText;
    textAreaText.scrollIntoView({ behavior: "smooth" });

    const currentComment = reviews.find((item) => item.id === reviewId);

    if (currentComment) {
      editingComment = currentComment;
    }
    /// somehow it should just be able to click on post btn save the comment and rerender it in the same container it was takes
  });
};

const deleteIconFunc = (deleteIcon) => {
  deleteIcon.addEventListener("click", () => {
    const reviewContainer = deleteIcon.closest(".review-container");
    if (reviewContainer) {
      const reviewId = reviewContainer.getAttribute("data-id");
      reviewContainer.remove();

      reviews = reviews.filter((r) => r.id !== reviewId);
      // //r.id !== reviewId: Includes all reviews except the one with the matching reviewId.
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }
  });
};

reviewBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const textAreaEl = document.querySelector(".textarea__text");

  if (!editingComment) {
    // There is no editing comment
    const textAreaElValue = textAreaEl.value.trim();
    // Clear previous error messages if any
    const existingError = document.querySelector(".form__input-error");
    if (existingError) {
      existingError.remove();
    }

    if (textAreaElValue === "") {
      const inputError = createElementAndInsert("p", "form__input-error", { innerText: "No review added" });
      textAreaEl.insertAdjacentElement("afterend", inputError);
      return;
    }

    const newReview = { text: textAreaElValue, id: uuidv4(), bookId: book.id };
    reviews.push(newReview);

    localStorage.setItem("reviews", JSON.stringify(reviews));

    const reviewContainer = createElementAndInsert("div", "review-container", null, formReview);
    reviewContainer.setAttribute("data-id", newReview.id);

    createElementAndInsert("p", "review-container__text", { innerText: newReview.text }, reviewContainer);

    const iconsContainer = createElementAndInsert("div", "review-container__icons-container", null, reviewContainer);

    const editIcon = createElementAndInsert(
      "img",
      "icon-edit",
      { src: "public/images/icons-edit.png", alt: "Edit" },
      iconsContainer,
    );

    const deleteIcon = createElementAndInsert(
      "img",
      "icon-delete",
      { src: "public/images/icons-delete.png", alt: "Delete" },
      iconsContainer,
    );

    editCommentHandler(editIcon);

    deleteIconFunc(deleteIcon);
  }

  if (editingComment) {
    const textAreaEl = document.querySelector(".textarea__text");
    const textAreaElValue = textAreaEl.value.trim();
    const comment = document.querySelector("[data-id] p");

    if (comment) {
      comment.innerText = textAreaElValue;
    }

    reviews = reviews.map((item) => {
      if (item.id === editingComment.id) {
        return {
          ...item,
          text: textAreaElValue,
        };
      } else {
        return item;
      }
    });
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  textAreaEl.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  reviews
    .filter((review) => review.bookId === book.id)
    .forEach((review) => {
      const reviewContainer = createElementAndInsert("div", "review-container", null, formReview);
      reviewContainer.setAttribute("data-id", review.id);

      createElementAndInsert("p", "review-container__text", { innerText: review.text }, reviewContainer);

      const iconsContainer = createElementAndInsert("div", "review-container__icons-container", null, reviewContainer);

      const editIcon = createElementAndInsert(
        "img",
        "icon-edit",
        { src: "public/images/icons-edit.png", alt: "Edit" },
        iconsContainer,
      );

      const deleteIcon = createElementAndInsert(
        "img",
        "icon-delete",
        { src: "public/images/icons-delete.png", alt: "Delete" },
        iconsContainer,
      );

      editCommentHandler(editIcon);
      deleteIconFunc(deleteIcon);
    });
});
