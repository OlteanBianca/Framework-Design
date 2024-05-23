import queries from './Queries.js';
import mutations from './Mutations.js';

import borrowedBooks from '../Data/BorrowedBooks.js';
import books from '../Data/Books.js';
import authors from '../Data/Authors.js';
import libraries from '../Data/Libraries.js';
import clients from '../Data/Clients.js';

const resolvers = {
  Query: queries,
  Mutation: mutations,
  Author: {
    books: (author) => books.filter(book => book.authorId === author.id),
  },
  Book: {
    author: (book) =>  authors.find(author => author.id === book.authorId),
    library: (book) => libraries.find(library => library.id === book.libraryId),
  },
  Library: {
    books: (library) => books.filter(book => book.libraryId === library.id),
  },
  Client: {
    borrowedBooks: (client) => borrowedBooks.filter(book => book.clientId === client.id),
  },
  BorrowedBook: {
    book: (borrowedBook) => books.find(book => book.id === borrowedBook.bookId),
    client: (borrowedBook) => clients.find(client => client.id === borrowedBook.clientId),
  },
};

export default resolvers;