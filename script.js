//Selectors
const addModalBtn = document.getElementById('modal-btn');
const modal = document.getElementById('modal-box-container');
const closeModalBtn = document.getElementById('close-modal');
const bookForm = document.getElementById('addBookForm');


//Show Modal Box
addModalBtn.addEventListener("click", () => {
    modal.style.visibility = "visible";
});

closeModalBtn.addEventListener('click', () => {
    modal.style.visibility = "hidden";
    bookForm.reset(); // reset form on close modal
});


let myLibrary = [];


function Book(e){
    e.preventDefault(); // Prevent refresh after form submission
    const myFormData = new FormData(e.target);
    
    //const formDataObj = {};
    //myFormData.forEach((value, key) => (formDataObj[key] = value));

    const formDataObj = Object.fromEntries(myFormData.entries());
    myLibrary.push(formDataObj);
    
    
    const card = myLibrary.map((val) =>{
        return `
        <div class="card">
            <p class="book-name">${val.book_name}</p>
            <p class="book-author">${val.book_author}</p>
            <p class="book-pages">${val.book_pages}</p>
            <div class="btn-group">
                <input type="image" src="./assets/icons/eye.svg" class="read-btn" alt="read_btn">
                <input type="image" src="./assets/icons/delete.svg" class="del-btn" alt="delete_btn">
            </div>
        </div>    
        `
    }).join('');
    document.getElementById("bookCardContainer").innerHTML= card;
    
    
    
    bookForm.reset(); // reset form after submit
    modal.style.visibility = "hidden"; // hide modal after sumit
}

//Getting Form Data
bookForm.addEventListener('submit' ,  Book);