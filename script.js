let books = [];
let soldBooks = [];

function addBook() {
    const name = document.getElementById('bookName').value;
    const author = document.getElementById('bookAuthor').value;
    const price = document.getElementById('bookPrice').value;
    const id = document.getElementById('bookId').value;
    if(name && author && price && id){
        const book = {id, name, author, price};
        books.push(book);
        updateBookList();
    }
}

function updateBookList() {
    const saleList = document.getElementById('books');
    saleList.innerHTML = '';
    books.forEach(book => {
        const div = document.createElement('div');
        const name = document.createElement('p');
        const author = document.createElement('p');
        const id = document.createElement('p');
        const price = document.createElement('p');
        name.innerHTML = `${book.name}`;
        author.innerHTML = `${book.author}`;
        id.innerHTML = `${book.id}`;
        price.innerHTML = `${book.price}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent ='Deleted'
        deleteBtn.onclick = () => deleteBook(book.id);
        div.appendChild(deleteBtn);
        saleList.appendChild(div);
    });

    const soldList = document.getElementById('soldList');
    soldList.innerHTML = '';
    soldBooks.forEach(book => {
        const div = document.createElement('div');
        const name = document.createElement('p');
        const author = document.createElement('p');
        const id = document.createElement('p');
        const price = document.createElement('p');
        name.innerHTML = `${book.name}`;
        author.innerHTML = `${book.author}`;
        id.innerHTML = `${book.id}`;
        price.innerHTML = `${book.price}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.onclick = () => deleteBook(book.id);
        li.appendChild(deleteBtn);
        soldList.appendChild(div);
    });
}

function deleteBook(bookId) {
    const bookIndex = soldBooks.findIndex(book => book.id === bookId);
    if (bookIndex > -1) {
        soldBooks.splice(bookIndex, 1);
        updateBookLists();
    }
}

const addBehaviorToBook = (book) => {
    if (!book.id) {
        book.id = window.crypto.randomUUID()
    }

    book.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("book_1", event.target.id)
    })

    book.addEventListener('dragend', (event) => {
        event.preventDefault()
    })
}

const addBehaviorToPanel = (panel) => {
    panel.addEventListener('dragover', (event) => {
        event.preventDefault()
    })

    panel.addEventListener('drop', (event) => {
        console.log(event)
        const dragged_card_id = event.dataTransfer.getData("book_1")
        console.log(dragged_card_id)

        event.target.appendChild(document.getElementById(dragged_card_id))
    })
}

const main = () => {
    const books = document.querySelectorAll(".book")
    books.forEach((book) => {
        book.setAttribute('draggable', true)
    })
    books.forEach(addBehaviorToBook)

    const panels = document.querySelectorAll(".box")
    panels.forEach(addBehaviorToPanel)
    updateBookList();
}

document.addEventListener('DOMContentLoaded', main)
