//Selectors
const addModalBtn = document.getElementById("modal-btn");
const modal = document.getElementById("modal-box-container");
const closeModalBtn = document.getElementById("close-modal");
const bookForm = document.getElementById("addBookForm");
const cardContainer = document.getElementById("bookCardContainer");
const cards = document.getElementsByClassName("card");
const bookReadBtns = document.getElementsByClassName("read-btn");
const bookDelBtns = document.getElementsByClassName("del-btn");

let bookId = Math.floor(Math.random() * 100);
let bookIdSetter = (document.getElementById("book_id").value = bookId);

//Show Modal Box
addModalBtn.addEventListener("click", () => {
  modal.style.visibility = "visible";

  let bookId = Math.floor(Math.random() * 100);
  document.getElementById("book_id").value = bookId;
});

closeModalBtn.addEventListener("click", () => {
  modal.style.visibility = "hidden";
  bookForm.reset(); // reset form on close modal
});

let myLibrary = [];

/*
 * * Add Book
 */
function Book(e) {
  e.preventDefault(); // Prevent refresh after form submission
  const myFormData = new FormData(e.target);

  //const formDataObj = {};
  //myFormData.forEach((value, key) => (formDataObj[key] = value));

  const formDataObj = Object.fromEntries(myFormData.entries());
  myLibrary.push(formDataObj);

  let card = myLibrary
    .map((val, index) => {
      return `
        <div class="card">
            <p class="book-name">${val.book_name}</p>
            <p class="book-author">${val.book_author}</p>
            <p class="book-pages">${val.book_pages}</p>
            <div class="btn-group">
            ${
              val.read_status === "yes"
                ? ` <input type="image" 
                src="./assets/icons/eye.svg" 
                class="read-btn" data-id="${index}" 
                alt="read_btn"
                >`
                : `<input type="image" 
                src="./assets/icons/eye-outline.svg" 
                class="read-btn" data-id="${index}" 
                alt="read_btn"
                >`
            }
                
                <input 
                    type="image" 
                    src="./assets/icons/delete.svg" 
                    class="del-btn" data-id="${index}" 
                    alt="delete_btn"
                >
            </div>
        </div>    
        `;
    })
    .join("");
  cardContainer.innerHTML = card; //render card into the seleted element

  addDelFeature();
  addReadUnread();
  // Modal Box
  bookForm.reset(); // reset form after submit
  modal.style.visibility = "hidden"; // hide modal after sumit
}
//Getting Form Data
bookForm.addEventListener("submit", Book);

/* 
 ! Delete Book Feature
*/

function delBook(e) {
  let cardID = parseInt(e.target.getAttribute("data-id"));
  const removeBook = myLibrary.findIndex(
    (item) => item.book_id === myLibrary[cardID].book_id
  );

  if (removeBook >= 0) {
    myLibrary.splice(removeBook, 1);
    let card = myLibrary
      .map((val, index) => {
        return `
                    <div class="card">
                        <p class="book-name">${val.book_name}</p>
                        <p class="book-author">${val.book_author}</p>
                        <p class="book-pages">${val.book_pages}</p>
                        <div class="btn-group">
                        ${
                          val.read_status === "yes"
                            ? ` <input type="image" 
                            src="./assets/icons/eye.svg" 
                            class="read-btn" data-id="${index}" 
                            alt="read_btn"
                            >`
                            : `<input type="image" 
                            src="./assets/icons/eye-outline.svg" 
                            class="read-btn" data-id="${index}" 
                            alt="read_btn"
                            >`
                        }
                            <input 
                                type="image" 
                                src="./assets/icons/delete.svg" 
                                class="del-btn" data-id="${index}" 
                                alt="delete_btn"
                            >
                        </div>
                    </div>    
                    `;
      })
      .join("");
    cardContainer.innerHTML = card; //render card into the seleted element

    addDelFeature();
  }
}

function addDelFeature() {
  if (cards.length > 0) {
    Array.from(bookDelBtns).map((delBtn) => {
      delBtn.addEventListener("click", delBook);
    });
  } else {
    modal.style.visibility = "visible"; // show modal box
  }
}
addDelFeature();

/*
 * Read/Unread Feature
 */
function readUnread(e) {
  let btnID = parseInt(e.target.getAttribute("data-id"));
  let bookStatus = myLibrary[btnID].read_status;

  if (bookStatus === "yes") {
    myLibrary[btnID].read_status = "no";
    e.target.setAttribute("src", "./assets/icons/eye-outline.svg");
  } else if (bookStatus === "no") {
    myLibrary[btnID].read_status = "yes";
    e.target.setAttribute("src", "./assets/icons/eye.svg");
  }
}

function addReadUnread() {
  if (myLibrary.length > 0) {
    Array.from(bookReadBtns).map((readBtn) => {
      readBtn.addEventListener("click", readUnread);
    });
  }
}
addReadUnread();
