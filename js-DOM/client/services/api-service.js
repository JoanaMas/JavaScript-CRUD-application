const serverAddress = 'http://localhost:3000'; // serveris turi sutapti su CLI gauta serverio nuoroda

// Knygų parsiuntimas

const getBooks = async () => {
    const response = await fetch(`${serverAddress}/books`);
    const books = await response.json();

    return books;
}

// Trinimo funkcija
// Fetch turi default metodą GET, jei norime naudoti kokį nors kitą metodą, turime pakeisti jį perduodami antru parametru funkcijai objektą ir nurodydami metodą kurio norime. Šiuo aveju DELETE.

const deleteBook = async (id) => {
    const response = await fetch(`${serverAddress}/books/${id}`, {
        method: 'DELETE'
    });
    const books = await response.json();
    return books;
}

const createBook = async (bookProps) => {
    const response = await fetch(`${serverAddress}/books`, {
        // Atliekant post metodą, taip pat turime sukurti header, kuris nurodo iš kokio serverio yra siunčiama data.
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        // JavaScript objektą turime pavesti į JSON
        body: JSON.stringify(bookProps)
    });

    const books = await response.json();
    return books;
}

// DARBINE FUNKCIJA

const updateBook = async (id, bookProps) => {
    const response = await fetch(`${serverAddress}/books/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        // JavaScript objektą turime pavesti į JSON
        body: JSON.stringify(bookProps)
    });

    const books = await response.json();
    return books;
}


const ApiService = {
    getBooks,
    deleteBook,
    createBook,
    updateBook,
};


export default ApiService;