import "./styles/main.scss";
const apiKey = "AIzaSyDdAPb7kkGFovTYwv7NJ3ii1A5mcjuU8UI";

const inputBtn = document.querySelector(".form__button");

// display the input API request

inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputEl = document.querySelector(".form__input").value;

  const booksUrl = `https://www.googleapis.com/books/v1/volumes?q=${inputEl}&key=${apiKey}`;
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
        console.log("User Data:", userData);
        console.log(userData.items[0].searchInfo);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const resetInput = () => {
    document.querySelector(".form__input").value = "";
  };
  booksInformation();
  resetInput();
});
