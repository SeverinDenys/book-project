import "./styles/main.scss";
const apiKey = import.meta.env.VITE_API_KEY;

const inputBtn = document.getElementById("form__button");

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
        const bookAuthor = bookItems[0].volumeInfo.authors;
        const bookTitle = bookItems[0].volumeInfo.title;
        const bookImg = bookItems[0].volumeInfo.imageLinks.thumbnail;
        const bookDescription = bookItems[0].volumeInfo.description;
        const bookPageCount = `${bookItems[0].volumeInfo.pageCount} pages`;

        // create a bookInfoContainer
        const bookInfoContainer = document.createElement("div");
        bookInfoContainer.classList.add("bookInfo");

        // create bookInfoTitle
        const bookInfoTitle = document.createElement("h1");
        bookInfoTitle.classList.add("bookInfo__title");
        bookInfoTitle.innerText = bookTitle;
        bookInfoContainer.appendChild(bookInfoTitle);

        // create bookInfoAuthor
        const bookInfoAuthor = document.createElement("h2");
        bookInfoAuthor.classList.add("bookInfo__author");
        bookInfoAuthor.innerText = bookAuthor;
        bookInfoContainer.appendChild(bookInfoAuthor);

        // create bookInfoImage
        const bookInfoImg = document.createElement("img");
        bookInfoImg.classList.add("bookInfo__imageContainer--image");
        bookInfoImg.src = bookImg;
        bookInfoContainer.appendChild(bookInfoImg);

        // create bookInfoDescription
        const bookInfoDescription = document.createElement("h2");
        bookInfoDescription.classList.add("bookInfo__description");
        bookInfoDescription.innerText = bookDescription;
        bookInfoContainer.appendChild(bookInfoDescription);

        // create bookInfoPages
        const bookInfoPages = document.createElement("h3");
        bookInfoPages.classList.add("bookInfo__pageCount");
        bookInfoPages.innerText = bookPageCount;
        bookInfoContainer.appendChild(bookInfoPages);

        bookContainer.appendChild(bookInfoContainer);

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
