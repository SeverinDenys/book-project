import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;

const bookInfoImage = document.getElementById("bookInfo__image");
const inputBtn = document.getElementById("form__button");
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
        console.log(userData);
        revealBackground();
        bookInfoAuthor.innerText =
          userData.items[0].volumeInfo.authors;
        bookInfoTitle.innerText = userData.items[0].volumeInfo.title;
        bookInfoDescription.innerText =
          userData.items[0].volumeInfo.description;
        bookInfoPageCount.innerText = `${userData.items[0].volumeInfo.pageCount} pages`;

        // creating an image to google books
        if (userData.items[0].volumeInfo.imageLinks) {
          bookInfoImage.src =
            userData.items[0].volumeInfo.imageLinks.thumbnail;
        } else {
          console.log("There is no image cover");
        }

        // filter english language books
        const booksEnglish = userData.items;
        console.log(booksEnglish);

        const filteredEnglishBooks = booksEnglish.filter(
          (bookEnglish) => {
            return bookEnglish.volumeInfo.language === "en";
            // why it needs to be return?
          }
        );
        console.log(filteredEnglishBooks);
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
