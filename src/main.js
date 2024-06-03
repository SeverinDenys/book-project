import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;

const inputBtn = document.querySelector(".form__button");
const bookInfoTitle = document.querySelector(".bookInfo__title");
const bookInfoAuthor = document.querySelector(".bookInfo__author");
const bookInfoDescription = document.querySelector(
  ".bookInfo__description"
);
const bookInfoPageCount = document.querySelector(
  ".bookInfo__pageCount"
);

 

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
        revealBackground();
        bookInfoAuthor.innerText =
          userData.items[0].volumeInfo.authors;
        bookInfoTitle.innerText = userData.items[0].volumeInfo.title;
        bookInfoDescription.innerText =
          userData.items[0].volumeInfo.description;
        bookInfoPageCount.innerText = `${userData.items[0].volumeInfo.pageCount} pages`;
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

const revealBackground = () => {
  const bookInfoContainer = document.querySelector(".bookInfo");
  bookInfoContainer.style.visibility = "visible";
};
