//Selectors
const addModalBtn = document.getElementById('modal-btn');
const modal = document.getElementById('modal-box-container');
const closeModalBtn = document.getElementById('close-modal');
const bookForm = document.getElementById('addBookForm');
const cardContainer= document.getElementById("bookCardContainer");
const cards = document.getElementsByClassName('card');
const bookReadBtn = document.getElementsByClassName('read-btn');
const bookDelBtns = document.getElementsByClassName('del-btn');


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
    
    
    let card = myLibrary.map((val, index) =>{
        return `
        <div class="card">
            <p class="book-name">${val.book_name}</p>
            <p class="book-author">${val.book_author}</p>
            <p class="book-pages">${val.book_pages}</p>
            <div class="btn-group">
                <input type="image" 
                    src="./assets/icons/eye.svg" 
                    class="read-btn" data-id="${index}" 
                    alt="read_btn"
                >
                <input 
                    type="image" 
                    src="./assets/icons/delete.svg" 
                    class="del-btn" data-id="${index}" 
                    alt="delete_btn"
                >
            </div>
        </div>    
        `
    }).join('');
    cardContainer.innerHTML= card; //render card into the seleted element


    modalBoxHandle();

    // Modal Box
    bookForm.reset(); // reset form after submit
    modal.style.visibility = "hidden"; // hide modal after sumit
}
//Getting Form Data
bookForm.addEventListener('submit' ,  Book);


function delBook(e) {
        let cardID = parseInt( e.target.getAttribute('data-id') );
        console.log(cardID);
        let updatedLibrary = myLibrary.splice(cardID , 1);

        if(myLibrary.length != updatedLibrary.length){
            // console.log(myLibrary.length + ',' + updatedArr.length);
            myLibrary = updatedLibrary;
            console.log(myLibrary);
            // let card = myLibrary.map((val, index) =>{
            //     return `
            //     <div class="card">
            //         <p class="book-name">${val.book_name}</p>
            //         <p class="book-author">${val.book_author}</p>
            //         <p class="book-pages">${val.book_pages}</p>
            //         <div class="btn-group">
            //             <input type="image" 
            //                 src="./assets/icons/eye.svg" 
            //                 class="read-btn" data-id="${index}" 
            //                 alt="read_btn"
            //             >
            //             <input 
            //                 type="image" 
            //                 src="./assets/icons/delete.svg" 
            //                 class="del-btn" data-id="${index}" 
            //                 alt="delete_btn"
            //             >
            //         </div>
            //     </div>    
            //     `
            // }).join('');
            // cardContainer.innerHTML= card; //render card into the seleted element
        }
    }


function modalBoxHandle(){
    if (cards.length>0) {
        Array.from(bookDelBtns).map(delBtn => {
            delBtn.addEventListener('click', delBook);
        });   
    }else{
        modal.style.visibility = "visible"; // show modal box
    }
}
modalBoxHandle();


