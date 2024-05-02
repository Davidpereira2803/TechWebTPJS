// liste avec les livres, nom, id, auteur, prix, et status de vente
let books = [
    {id: 1, name: "Harry Potter", author: "David Pereira", price: 10, sold: false},
    {id: 2, name: "Harry Potter 2", author: "David Pereira", price: 8, sold: false},
    {id: 3, name: "Harry Potter 3", author: "David Pereira", price: 20, sold: true},
];

// listes qui representent les livres disponibles et vendus
let $availableList = $("#availableList");
let $soldList = $("#soldList");

// updateBooks est une fonction qui permet de mettre les livres de la liste dans le HTML
const updateBooks = () => {
    // Il faut a chaque fois mettre les listes vides
    $availableList.empty();
    $soldList.empty();

    /* 
        Pour chaque livre dans books on crée un div avec la classe "book" après on implemente un 
        div avec le contenu du livre actuel (book), puis on ajoute le button Delete qui declanche la 
        fonction deleteBook(id)
    */
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
}

// bookBehavior permet au livres d'etre bouger et placer 
const bookBehavior = (book) => {
    if (!book.id) {
        book.id = window.crypto.randomUUID()
    }

    book.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("book_1", event.target.id)
    })

    book.addEventListener('dragend', (event) => {
        event.preventDefault()
        if(book.sold == false) book.sold = true;
        else book.sold = false;
    })
}

// boxBehavior permet de poser les livres
const boxBehavior = (box) => {
    box.addEventListener('dragover', (event) => {
        event.preventDefault()
    })

    box.addEventListener('drop', (event) => {
        console.log(event)
        const dragged_book_id = event.dataTransfer.getData("book_1")
        console.log(dragged_book_id)

        event.target.appendChild(document.getElementById(dragged_book_id))
    })
}


// addBook permet d'ajouter un livre a la liste des disponibles
function addBook(event) {
    event.preventDefault();

    // On défine les valeurs du livres, pour cela on prend les valeurs des inputs avec les classes suivantes
    const name = $("#bookName").val();
    const author = $("#bookAuthor").val();
    const price = $("#bookPrice").val();
    const id = $("#bookId").val();

    // on rajoute le nouveu livre et on met la liste à jour
    if(name != "" && author != "" && price !="" && id !=""){
        books.push({id, name, author, price, sold: false});
        updateBooks();
    }

    // On doit mettre le paramètre du nouveau livre 'draggable' comme true pour pouvoir le bouger
    const newBook = $(`[book=${id}]`)[0]; 
    newBook.setAttribute('draggable', true); 
    bookBehavior(newBook);
    

    // On remet les valeurs des inputs à vide pour le prochain livre
    $("#bookName").val("");
    $("#bookAuthor").val("");
    $("#bookPrice").val("");
    $("#bookId").val("");
}


// deleteBook permet de supprimer un livre par un button
function deleteBook(id) {
    // On prend le livre de la liste avec l'id passer comme parametre
    const index = books.findIndex(book => book.id === id);
    // Si cette id existe -> different de -1, on enleve le livre et on met à jour la liste
    if (index !== -1) {
        books.splice(index, 1);
        updateBooks();

        /*
            Après avoir modifier la liste il faut appeler la fonction bookBehavior pour tous les livres
            afin d
            */ 
        const newList = document.querySelectorAll(".book");
        newList.forEach(bookBehavior);
    }
}

// main est appele apres que la page est completement contruite
const main = () => {
    // initialiser les livres
    updateBooks();

    // il faut donner l'attribue draggable comme true pour pouvoir bouger les elements(livres)
    const booksList = document.querySelectorAll(".book")
    booksList.forEach((book) => {
        book.setAttribute('draggable', true)
    })
    booksList.forEach(bookBehavior)

    const panels = document.querySelectorAll(".box")
    panels.forEach(boxBehavior)
}

document.addEventListener('DOMContentLoaded', main)
