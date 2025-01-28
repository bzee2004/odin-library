const myLibrary = {};

const body = document.querySelector('body');

const bookshelf = document.querySelector('.shelf');
const popup = document.querySelector('.popup-display');
const popupText = document.querySelector('.popup-display h3');

const openDialog = document.querySelector('#openDialog');
const closeDialog = document.querySelector('#closeDialog')
const bookDialog = document.querySelector('#addBookDialog');

const form = document.querySelector('form');

const counter = {
    count: 0
}

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read ? 'Yes' : 'No';
//     this.info = () => {
//         const readMsg = read ? 'read' : 'not read yet'
//         const info = `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`
//         return info;
//     }
// }

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        const readMsg = read ? 'read' : 'not read yet'
        const info = `${this.title} by ${this.author}, ${this.pages} pages, ${readMsg}`
        return info;
    }
    changeRead() {
        this.read = this.read == 'Yes' ? 'No' : 'Yes';
    }
}

// Book.prototype.changeRead = function() {
//     this.read = this.read == 'Yes' ? 'No' : 'Yes';
// }

function addBookToLibrary(title, author, pages, read=false) {
    const newBook = new Book(title, author, pages, read);
    myLibrary[counter.count++] = newBook;
    // myLibrary.push(counter.count++, newBook);
    displayBook(newBook);
}

function displayBook(book) {
    const bookId = counter.count-1;

    const colors = [Math.random()*256, Math.random()*256, Math.random()*256];

    const newBook = document.createElement('div');
    newBook.classList.add('book');
    newBook.style.backgroundColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
    newBook.setAttribute('id', bookId);

    const newBookAfter = document.createElement('div');
    newBookAfter.classList.add('bookAfter');
    newBookAfter.style.backgroundColor = `rgb(${colors[0]+50}, ${colors[1]+50}, ${colors[2]+50})`;

    newBook.appendChild(newBookAfter);

    newBook.addEventListener('click', (e) => {

        const infoWindow = document.createElement('div');
        infoWindow.classList.add('info-window');

        const infoWindowClose = document.createElement('button');
        infoWindowClose.classList.add('info-window-close');
        infoWindowClose.textContent = 'Close';
        infoWindowClose.addEventListener('click', (e) => {
            body.removeChild(infoWindow);
        })

        const infoData = document.createElement('div');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        title.textContent = myLibrary[+e.target.id].title;
        author.textContent = myLibrary[+e.target.id].author.trim() != '' ? `by ${myLibrary[+e.target.id].author}` : 'N/A';
        pages.textContent = myLibrary[+e.target.id].pages != '' ? `${myLibrary[+e.target.id].pages} pages` : '0 pages';
        infoData.appendChild(title)
        infoData.appendChild(author)
        infoData.appendChild(pages)

        infoWindow.appendChild(infoWindowClose);
        infoWindow.appendChild(infoData);
        body.appendChild(infoWindow);
    })
    newBook.addEventListener('mousemove', (e) => {
        popup.style.display = 'block';
        popup.style.top = `${e.clientY+30 + window.scrollY}px`;
        popup.style.left = `${e.clientX-45}px`;
        popupText.textContent = myLibrary[+e.target.id].title;
        // popupText.textContent = myLibrary[myLibrary.indexOf(+e.target.id)+1].title;
    })
    newBook.addEventListener('mouseleave', (e) => {
        popup.style.display = 'none';
    })
    bookshelf.insertBefore(newBook, openDialog);
}

// Handle opening and closing of dialog
openDialog.addEventListener('click', () => {
    bookDialog.showModal();
})

closeDialog.addEventListener('click', () => {
    bookDialog.close();
})

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary(e.target.title.value, e.target.author.value, e.target.pages.value, e.target.read.value == 'true');

    e.target.title.value='';
    e.target.author.value='';
    e.target.pages.value='';

    e.target.title.focus();
})


// ------------- TESTING --------------------

addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);
addBookToLibrary('Filler', 'Me', 102903);

addBookToLibrary('The Hobbit', 'J.R.R Tolkien', 295, true);
addBookToLibrary('The Odyssey', 'Homer', 541);
addBookToLibrary('Book Title 3', 'Me', 21);





// old code, used when displaying on a table, place in displayBook function

// const bookshelf = document.querySelector('tbody');

// const row = bookshelf.insertRow();
// row.setAttribute('id', `book-${bookId}`);

// const removeButton = document.createElement('button');
// removeButton.textContent = 'Remove';
// removeButton.setAttribute('id', bookId)
// removeButton.addEventListener('click', (e) => {
//     myLibrary.splice(myLibrary.indexOf(+e.target.id), 2);
//     const child = document.querySelector(`#book-${+e.target.id}`);
//     bookshelf.removeChild(child);
// })

// const hasRead = document.createElement('p');
// hasRead.textContent = book.read;
// hasRead.classList.add('read');
// hasRead.setAttribute('id', bookId);
// hasRead.addEventListener('click', (e) => {
//     const child = myLibrary[myLibrary.indexOf(+e.target.id)+1];
//     const p = document.getElementById(+e.target.id);
//     child.changeRead();
//     p.textContent = child.read;
// })

// row.insertCell(0).textContent = book.title;
// row.insertCell(1).textContent = book.author;
// row.insertCell(2).textContent = book.pages;
// row.insertCell(3).appendChild(hasRead);
// row.insertCell(4).appendChild(removeButton);