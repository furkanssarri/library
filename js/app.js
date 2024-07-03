const library = new Array();
let nextId = 1;

eventListeners();

function eventListeners() {
   window.addEventListener("DOMContentLoaded", getItemsFromStorage);
}

function getItemsFromStorage() {
   let getString = localStorage.getItem("library");
   let getArr = JSON.parse(getString);
   addBookToUi(getArr)
}

function Book(id, title, author, pages, isRead) {
   this.id = nextId++;
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.isRead = isRead;
   // this.showInfo = function () {
   //    return `The book number ${this.id}, named${this.title} by ${this.author} is ${this.pages} long and the user has ${this.isRead()} it.`;
   // }
}
function addBookToLibrary(newBook) {
   library.push(newBook);
   // addBookToUi(library)
}

function addLibraryToStorage() {
   let setString = JSON.stringify(library);
   let storeLib = localStorage.setItem("library", setString);
   addBookToUi(storeLib);
}

function addBookToUi(storeLib) {
   let getString = localStorage.getItem("library");
   let getArr = JSON.parse(getString);
   const tbody = document.getElementById("t-body");
   
   getArr.forEach(function callback(book, index) {
      var tr = document.createElement("tr");
      for (const property in book) {
         if (Object.hasOwnProperty.call(book, property)) {
            const prop = book[property];
            
            var cell = document.createElement("td");
            cell.textContent = prop;
            tr.appendChild(cell);
         }
         tbody.appendChild(tr);
      }
   });

}