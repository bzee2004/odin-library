const myLibrary = [];

const counter = {
    count: 0
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    console.log(read)
    this.read = read ? 'Yes' : 'No';
    this.info = () => {
        const readMsg = read ? 'read' : 'not read yet'
        const info = `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`
        return info;
    }
}

Book.prototype.changeRead = function() {
    this.read = this.read == 'Yes' ? 'No' : 'Yes';
}

function addBookToLibrary(title, author, pages, read=false) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(counter.count++, newBook);
    displayBook(newBook);
}

const bookshelf = document.querySelector('tbody');
function displayBook(book) {
    const bookId = counter.count-1;

    const row = bookshelf.insertRow();
    row.setAttribute('id', `book-${bookId}`);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.setAttribute('id', bookId)
    removeButton.addEventListener('click', (e) => {
        myLibrary.splice(myLibrary.indexOf(+e.target.id), 2);
        const child = document.querySelector(`#book-${e.target.id}`);
        bookshelf.removeChild(child);
    })

    const hasRead = document.createElement('p');
    hasRead.textContent = book.read;
    hasRead.classList.add('read');
    hasRead.setAttribute('id', bookId);
    hasRead.addEventListener('click', (e) => {
        const child = myLibrary[myLibrary.indexOf(+e.target.id)+1];
        const p = document.getElementById(+e.target.id);
        child.changeRead();
        p.textContent = child.read;
    })

    row.insertCell(0).textContent = book.title;
    row.insertCell(1).textContent = book.author;
    row.insertCell(2).textContent = book.pages;
    row.insertCell(3).appendChild(hasRead);
    row.insertCell(4).appendChild(removeButton);
}

// Handle opening and closing of dialog
const openDialog = document.querySelector('#openDialog');
const closeDialog = document.querySelector('#closeDialog')
const bookDialog = document.querySelector('#addBookDialog');
openDialog.addEventListener('click', () => {
    bookDialog.showModal();
})

closeDialog.addEventListener('click', () => {
    bookDialog.close();
})

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(e.target.title.value, e.target.author.value, e.target.pages.value, e.target.read.value == 'true');

    e.target.title.value='';
    e.target.author.value='';
    e.target.pages.value='';

    e.target.title.focus();
})





// ------------- TESTING --------------------

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, true);
addBookToLibrary('The Odyssey', 'Homer', 541);
addBookToLibrary('Book Title 3', 'Me', 21);

// for (let index in myLibrary) {
//     displayBook(myLibrary[index]);
// }