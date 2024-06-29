
(function(){
document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('add-book-form');
    const searchButton = document.getElementById('search-button');
    const bookList = document.getElementById('books');

    // Fetch and display books
    const fetchBooks = async () => {
        const response = await fetch('http://localhost:3000/api/books');
        const books = await response.json();
        bookList.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            bookList.appendChild(li);
        });
    };

    // Add a new book
    bookForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(bookForm);
        const book = {
            title: formData.get('title'),
            author: formData.get('author'),
            description: formData.get('description'),
        };
        await fetch('http://localhost:3000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        });
        bookForm.reset();
        fetchBooks();
    });

    // Search for books
    searchButton.addEventListener('click', async () => {
        const title = document.getElementById('search-title').value;
        const author = document.getElementById('search-author').value;
        const query = new URLSearchParams({ title, author }).toString();
        const response = await fetch(`http://localhost:3000/api/books/search?${query}`);
        const books = await response.json();
        bookList.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author}`;
            bookList.appendChild(li);
        });
    });

    fetchBooks();
});
});