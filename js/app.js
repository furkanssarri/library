// Form control constants
const formElement = document.querySelectorAll(".form-row");
const submitBtn = document.querySelector("#submit");

// Variables
let titleValue;
let authorValue;
let pageValue;
let readStatus;
let nextId = 1;

const library = [];

const myLib = [
   {
      name: "The Lord of the Rings",
      author: "J.R.R Tolkien",
      pages: 672
   },
   {
      name: "Tutunamayanlar",
      author: "Oğuz Atay",
      pages: 451
   },
   {
      name: "The Hobbit",
      author: "J.R.R. Tolkien",
      pages: 871
   },
   {
      name: "Aylak Adam",
      author: "Yusuf Atılgan",
      pages: 217
   }
]

// EventListeners
eventListeners();
function eventListeners() {
   // document.addEventListener("DOMContentLoaded", readLocalStorage);
   formElement.forEach(element => {
      element.addEventListener("keyup", (e) => {
         let newValue = e.target.value.trim();
         if (e.target.id === "title") {
            titleValue = newValue;
         } else if (e.target.id === "author") {
            authorValue = newValue;
         } else if (e.target.id === "pages") {
            pageValue = +newValue;
         }
      });
   });
   submitBtn.addEventListener("click", addBookToLibrary);
   // submitBtn.addEventListener("click", readLocalStorage);
}

function readLocalStorage() {
   const itemsFromLocalStorage = localStorage.getItem("library");
   const libraryObject = JSON.parse(itemsFromLocalStorage);
}

// function setLocalStorage(item) {
//    localStorage.setItem("library", JSON.stringify(item));
//    displayEachBook(item);
// }



function Book(title, author, pages, isRead) {
   this.id = nextId++;
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
   title = titleValue;
   author = authorValue;
   pages = pageValue;

   if (document.getElementById("isRead").checked) {
      isRead = true;
      readStatus = "Read";
   } else {
      isRead = false;
      readStatus = "Not read";
   }
   const newBook = new Book(title, author, pages, isRead)
   library.push(newBook);
   // setLocalStorage(newBook)
   
   // localStorage.setItem("library", JSON.stringify(library));
   // console.log(newBook);
   // console.log(library);
   displayEachBook(library);
   clearInputs();

}

function displayEachBook(library) {

   let tBody = document.querySelector("#t-body");
   tBody.textContent = "";
   library.forEach(book => {
      let newTRow = document.createElement("tr");
         let idCell = document.createElement("td");
         idCell.textContent = book.id;
         let titleCell = document.createElement("td");
         titleCell.textContent = book.title;
         let authorCell = document.createElement("td");
         authorCell.textContent = book.author;
         let pageCell = document.createElement("td");
         pageCell.textContent = book.pages;
         let isReadCell = document.createElement("td");
         isReadCell.textContent = book.isRead ? "Read" : "Not read";
         let markReadCell = document.createElement("td");
         let markReadBtn = document.createElement("button");
         markReadBtn.setAttribute("type", "button");
         markReadBtn.classList = "btn btn-warning";
         markReadBtn.id = "markRead"
         markReadBtn.textContent = book.isRead ? "Mark Not Read" : "Mark Read";
         markReadCell.appendChild(markReadBtn);
         let removeCell = document.createElement("td");
         let removeBtn = document.createElement("button");
         removeBtn.classList = "btn btn-danger";
         removeBtn.id = "remove";
         removeBtn.setAttribute("type", "button");
         removeBtn.textContent = "Remove";
         removeCell.appendChild(removeBtn);


         newTRow.appendChild(idCell);
         newTRow.appendChild(titleCell);
         newTRow.appendChild(authorCell);
         newTRow.appendChild(pageCell);
         newTRow.appendChild(isReadCell);
         newTRow.appendChild(markReadCell);
         newTRow.appendChild(removeCell);
         tBody.appendChild(newTRow);

         markReadBtn.addEventListener("click", markBookRead);
         removeBtn.addEventListener("click", removeItem);
   });
}

function clearInputs() {
   formElement.forEach((element) => {
      element.firstElementChild.nextElementSibling.value = "";
      element.firstElementChild.nextElementSibling.checked = false;
   });
   
}

function markBookRead(e) {
   if (e.target.id === "markRead") {
      let eventId = Number(e.target.parentElement.parentElement.firstElementChild.textContent);
      library.forEach(book => {
         if (book.id === eventId) {
            if (book.isRead === false) {
               book.isRead = true;
            } else if (book.isRead === true) {
               book.isRead = false;
            }
            e.target.textContent = book.isRead ? "Mark Not Read" : "Mark Read";
            e.target.parentElement.previousSibling.textContent = book.isRead ? "Read" : "Not read";
         }
      });
   }
}

function removeItem(e) {
   if (e.target.id === "remove") {
      e.target.parentElement.parentElement.remove();
   }
}