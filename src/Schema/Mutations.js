import borrowedBooks from '../Data/BorrowedBooks.js';
import books from '../Data/Books.js';
import authors from '../Data/Authors.js';
import libraries from '../Data/Libraries.js';
import clients from '../Data/Clients.js';
import { v4 as uuidv4 } from 'uuid';

const mutations = {
  addAuthor: (_, { name }) => {
    if (name === undefined)
      return null;

    const newAuthor = { id: uuidv4(), name };
    authors.push(newAuthor);
    return newAuthor;
  },

  addBook: (_, { title, genre, authorId, libraryId, totalCopies }) => {
    if (title === undefined || genre === undefined || authorId === undefined || libraryId === undefined || totalCopies === undefined ||
      totalCopies < 1)
      return null;

    const newBook = { id: uuidv4(), title, genre, authorId, libraryId, totalCopies, availableCopies: totalCopies };
    books.push(newBook);
    return newBook;
  },

  addLibrary: (_, { name }) => {
    if (name === undefined)
      return null;

    const newLibrary = { id: uuidv4(), name, bookIds: [] };
    libraries.push(newLibrary);
    return newLibrary;
  },

  addClient: (_, { name }) => {
    if (name === undefined)
      return null;

    const newClient = { id: uuidv4(), name, borrowedBookIds: [] };
    clients.push(newClient);
    return newClient;
  },

  addBorrowedBook: (_, { bookId, clientId, borrowedDate, dueDate }) => {
    if (bookId === undefined || clientId === undefined || borrowedDate === undefined || dueDate === undefined)
      return null;

    const book = books.find(book => book.id === bookId);
    if (book.availableCopies > 0) {
      const newBorrowedBook = { id: uuidv4(), bookId, clientId, borrowedDate, dueDate };
      borrowedBooks.push(newBorrowedBook);
      book.availableCopies -= 1;
      const client = clients.find(client => client.id === clientId);
      client.borrowedBookIds.push(newBorrowedBook.id);
      return newBorrowedBook;
    }
    return null;
  },

  updateAuthor: (_, { id, name }) => {
    if (id === undefined || name === undefined)
      return null;

    const author = authors.find(author => author.id === id);
    if (author) {
      author.name = name;
    }
    return author;
  },

  updateBook: (_, { id, title, genre, authorId, libraryId, totalCopies, availableCopies }) => {
    if (title === undefined || genre === undefined || authorId === undefined || libraryId === undefined || totalCopies === undefined
      || availableCopies === undefined || totalCopies < 0 || availableCopies < 0)
      return null;

    const book = books.find(book => book.id === id);
    if (book) {
      book.title = title;
      book.genre = genre;
      book.authorId = authorId;
      book.libraryId = libraryId;
      book.totalCopies = totalCopies;
      book.availableCopies = availableCopies;
    }
    return book;
  },

  updateLibrary: (_, { id, name }) => {
    if (id === undefined || name === undefined)
      return null;

    const library = libraries.find(library => library.id === id);
    if (library) {
      library.name = name;
    }
    return library;
  },

  updateClient: (_, { id, name }) => {
    if (id === undefined || name === undefined)
      return null;

    const client = clients.find(client => client.id === id);
    if (client) {
      client.name = name;
    }
    return client;
  },

  updateBorrowedBook: (_, { id, bookId, clientId, borrowedDate, dueDate }) => {
    if (id === undefined || bookId === undefined || clientId === undefined || borrowedDate === undefined || dueDate === undefined)
      return null;

    const borrowedBook = borrowedBooks.find(borrowedBook => borrowedBook.id === id);
    if (borrowedBook) {
      if (bookId !== undefined) borrowedBook.bookId = bookId;
      if (clientId !== undefined) borrowedBook.clientId = clientId;
      if (borrowedDate !== undefined) borrowedBook.borrowedDate = borrowedDate;
      if (dueDate !== undefined) borrowedBook.dueDate = dueDate;
    }
    return borrowedBook;
  },

  deleteAuthor: (_, { id }) => {
    if (id === undefined)
      return null;

    const authorIndex = authors.findIndex(author => author.id === id);
    if (authorIndex > -1) {
      const [deletedAuthor] = authors.splice(authorIndex, 1);
      return deletedAuthor;
    }
    return null;
  },

  deleteBook: (_, { id }) => {
    if (id === undefined)
      return null;

    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex > -1) {
      const [deletedBook] = books.splice(bookIndex, 1);
      return deletedBook;
    }
    return null;
  },

  deleteLibrary: (_, { id }) => {
    if (id === undefined)
      return null;

    const libraryIndex = libraries.findIndex(library => library.id === id);
    if (libraryIndex > -1) {
      const [deletedLibrary] = libraries.splice(libraryIndex, 1);
      return deletedLibrary;
    }
    return null;
  },

  deleteClient: (_, { id }) => {
    if (id === undefined)
      return null;

    const clientIndex = clients.findIndex(client => client.id === id);
    if (clientIndex > -1) {
      const [deletedClient] = clients.splice(clientIndex, 1);
      return deletedClient;
    }
    return null;
  },

  deleteBorrowedBook: (_, { id }) => {
    if (id === undefined)
      return null;

    const borrowedBookIndex = borrowedBooks.findIndex(borrowedBook => borrowedBook.id === id);
    if (borrowedBookIndex > -1) {
      const [deletedBorrowedBook] = borrowedBooks.splice(borrowedBookIndex, 1);
      const book = books.find(book => book.id === deletedBorrowedBook.bookId);
      book.availableCopies += 1;
      const client = clients.find(client => client.id === deletedBorrowedBook.clientId);
      const borrowedBookIdIndex = client.borrowedBookIds.findIndex(borrowedBookId => borrowedBookId === id);
      client.borrowedBookIds.splice(borrowedBookIdIndex, 1);
      return deletedBorrowedBook;
    }
    return null;
  }
};

export default mutations;