const addNewBookBtn = document.querySelector(".add-new-book-btn");
const author = document.querySelector(".author");
const title = document.querySelector(".title");
const numberOfPagesBtn = document.querySelector(".number-of-pages");
const dialogEl = document.querySelector("#myDialog");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const titleInput = document.querySelector("#title-input");
const pagesInput = document.querySelector("#pages-input");
const authorInput = document.querySelector("#author-input");
const selectInput = document.querySelector("#select-input");
const library = document.querySelector(".library");
const addBtn = document.querySelector(".add-btn");
const bookForm = document.querySelector(".book-form");
const existingCard = document.querySelectorAll(".card");

closeDialogBtn.addEventListener("click", () => dialogEl.close());

const myLibrary = [];

function Book(bookTitle, bookAuthor, totalPages, readStatus) {
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = totalPages;
    this.hasReadIt = readStatus;
}

addNewBookBtn.addEventListener("click", () => {
    dialogEl.showModal();
});

addBtn.addEventListener("click", () => {
    const titleValue = titleInput.value.trim();
    const authorValue = authorInput.value.trim();
    const pagesValue = pagesInput.value.trim();
    const readValue = selectInput.value.trim();

    if (!titleValue || !authorValue || !pagesValue || !readValue) {
        alert("Bro, fill out the form!");
        return;
    }

    const newBook = new Book(titleValue, authorValue, pagesValue, readValue);
    console.log(newBook);

    myLibrary.push(newBook);
    displayCards(newBook);

    bookForm.reset();
    dialogEl.close();
});

function displayCards(book) {
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const titlePTag = document.createElement("p");
    titlePTag.classList.add("title");
    titlePTag.textContent = `${book.title}`;

    const authorPTag = document.createElement("p");
    authorPTag.classList.add("author");
    authorPTag.textContent = `${book.author}`;

    const pagesPTag = document.createElement("p");
    pagesPTag.classList.add("number-of-pages");
    pagesPTag.textContent = `Number of pages: ${book.pages}`;

    const hasReadPTag = document.createElement("p");
    hasReadPTag.classList.add("hasRead");
    hasReadPTag.textContent = book.hasReadIt.includes("Yes") ? `Has read it` : "Not read it";

    const btnOnCardDiv = document.createElement("div");
    btnOnCardDiv.classList.add("card-btn");

    const deleteBookBtn = document.createElement("button");
    const hasReadBtnOnCard = document.createElement("button");

    deleteBookBtn.classList.add("delete-book");
    deleteBookBtn.textContent = "delete";

    hasReadBtnOnCard.classList.add("hasReadBtn");
    hasReadBtnOnCard.textContent = book.hasReadIt ;

    deleteBookBtn.addEventListener("click", () => {
        newCard.remove();
        const index = myLibrary.indexOf(book);
        if (index > -1) {
            myLibrary.splice(index, 1);
        }
    });

    hasReadBtnOnCard.addEventListener("click", () => {
        book.hasReadIt = book.hasReadIt === "Yes" ? "No" : "Yes";
        
        hasReadPTag.textContent = book.hasReadIt === "Yes" ? `Has read it` : "Not read it";
        hasReadBtnOnCard.textContent = book.hasReadIt === "Yes" ? `Has read it` : "Not read it";
    });

    library.appendChild(newCard);
    newCard.appendChild(titlePTag);
    newCard.appendChild(authorPTag);
    newCard.appendChild(pagesPTag);
    newCard.appendChild(hasReadPTag);
    newCard.appendChild(btnOnCardDiv);
    btnOnCardDiv.appendChild(deleteBookBtn);
    btnOnCardDiv.appendChild(hasReadBtnOnCard);
}

existingCard.forEach(card => {
    const bookTitle = card.querySelector(".title").textContent.trim();
    const bookAuthor = card.querySelector(".author").textContent.trim();
    const pagesValue = card.querySelector(".number-of-pages").textContent.replace("Number of pages: ", "").trim();
    const readStatus = card.querySelector(".hasRead").textContent.includes("Has read it") ? "Yes" : "No";

    const existingBook = new Book(bookTitle, bookAuthor, pagesValue, readStatus);
    myLibrary.push(existingBook);

    const deleteButton = card.querySelector(".delete-book");
    deleteButton.addEventListener("click", () => {
        const index = myLibrary.indexOf(existingBook);
        if (index > -1) {
            myLibrary.splice(index, 1);
        }
        card.remove();
    });

    const toggleReadButton = card.querySelector(".hasReadBtn");
    toggleReadButton.addEventListener("click", () => {
        existingBook.hasReadIt = existingBook.hasReadIt === "Yes" ? "No" : "Yes";
        const hasReadPTag = card.querySelector(".hasRead");
        hasReadPTag.textContent = existingBook.hasReadIt === "Yes" ? `Have read it` : "Not read it";
        toggleReadButton.textContent = existingBook.hasReadIt === "Yes" ? `Have read it` : "Not read it";
    });

    console.log("Library initialized with existing cards:", myLibrary);
});