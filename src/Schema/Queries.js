import authors from '../Data/Authors.js';
import books from '../Data/Books.js';
import libraries from '../Data/Libraries.js';
import clients from '../Data/Clients.js';
import borrowedBooks from '../Data/BorrowedBooks.js';

const queries = {
    authors: () => authors,
    author: (_, { id }) => authors.find(author => author.id === id),
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id),
    libraries: () => libraries,
    library: (_, { id }) => libraries.find(library => library.id === id),
    clients: () => clients,
    client: (_, { id }) => clients.find(client => client.id === id),
    borrowedBooks: () => borrowedBooks,
    borrowedBook: (_, { id }) => borrowedBooks.find(borrowedBook => borrowedBook.id === id),

    authorId: (_, { name }) => authors.find(author => author.name === name), 
    libraryId: (_, { name }) => libraries.find(library => library.name === name), 
    clientId: (_, { name }) => clients.find(client => client.name === name),
    bookId: (_, { name }) => books.find(book => book.title === name),
};

export default queries;