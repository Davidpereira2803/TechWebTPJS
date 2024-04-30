let books = [
    {id: 1, name: "Harry Potter", author: "David Pereira", price: 10, sold: false},
    {id: 2, name: "Harry Potter 2", author: "David Pereira", price: 8, sold: false},
    {id: 3, name: "Harry Potter 3", author: "David Pereira", price: 20, sold: true},
];

let $availableList = $("#availableList");
let $soldList = $("#soldList");


const renderBooks = () => {
    $availableList.empty();
    $soldList.empty();

    books.forEach(function (book) {
        const $div = $("<div>")
            .addClass("book")
            .attr("book", book.id)
            .appendTo(book.sold ? $soldList : $availableList);

        $("<div>")
            .text(`${book.name} - ${book.author} - ${book.price}€ - ${book.id}`)
            .appendTo($div);

            $("<button>")
            .text("Delete")
            .addClass("delete")
            .click(function () {
                deleteBook(book.id);
            })
            .appendTo($div);
    });

    $(".delete").click(function () {
        const bookId = $(this).parent().attr("book");
        deleteBook(bookId);
    });
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

function addBook(event) {
    event.preventDefault();

    const name = $("#bookName").val();
    const author = $("#bookAuthor").val();
    const price = $("#bookPrice").val();
    const id = $("#bookId").val();

    books.push({id, name, author, price, sold: false});
    renderBooks();

    const newBook = $(`[book=${id}]`)[0]; 
    newBook.setAttribute('draggable', true); 
    addBehaviorToBook(newBook);

    $("#book-name").val("");
    $("#book-author").val("");
    $("#book-price").val("");
}

function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        renderBooks();

        const remainingBooks = document.querySelectorAll(".book");
        remainingBooks.forEach(addBehaviorToBook);
    }
}

const main = () => {
    renderBooks();
    const wbooks = document.querySelectorAll(".book")
    wbooks.forEach((book) => {
        book.setAttribute('draggable', true)
    })
    wbooks.forEach(addBehaviorToBook)

    const panels = document.querySelectorAll(".box")
    panels.forEach(addBehaviorToPanel)
}

document.addEventListener('DOMContentLoaded', main)
