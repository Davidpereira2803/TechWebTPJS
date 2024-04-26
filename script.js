const addBehaviorToCard = (book) => {
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
    books.forEach(addBehaviorToCard)

    const panels = document.querySelectorAll(".box")
    panels.forEach(addBehaviorToPanel)
}

document.addEventListener('DOMContentLoaded', main)
