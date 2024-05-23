import gql from 'graphql-tag';

const definitions = gql`
  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    genre: String!
    author: Author
    library: Library
    totalCopies: Int!
    availableCopies: Int!
  }

  type Library {
    id: ID!
    name: String!
    books: [Book]
  }

  type Client {
    id: ID!
    name: String!
    borrowedBooks: [BorrowedBook]
  }

  type BorrowedBook {
    id: ID!
    book: Book!
    client: Client!
    borrowedDate: String!
    dueDate: String!
  }

  type Query {
    authors: [Author]
    author(id: ID!): Author 
    books: [Book]
    book(id: ID!): Book
    libraries: [Library]
    library(id: ID!): Library
    clients: [Client]
    client(id: ID!): Client 
    borrowedBooks: [BorrowedBook]
    borrowedBook(id: ID!): BorrowedBook
    authorId(name: String!): Author
    libraryId(name: String!): Library
    clientId(name: String!): Client
    bookId(name: String!): Book
  }

  type Mutation {
    addAuthor(name: String!): Author
    addBook(title: String!, genre: String!, authorId: ID!, libraryId: ID!, totalCopies: Int!): Book
    addLibrary(name: String!): Library
    addClient(name: String!): Client
    addBorrowedBook(bookId: ID!, clientId: ID!, borrowedDate: String!, dueDate: String!): BorrowedBook
    updateAuthor(id: ID!, name: String!): Author
    updateBook(id: ID!, title: String, genre: String, authorId: ID, libraryId: ID, totalCopies: Int, availableCopies: Int!): Book
    updateLibrary(id: ID!, name: String!): Library
    updateClient(id: ID!, name: String!): Client
    updateBorrowedBook(id: ID!, bookId: ID, clientId: ID, borrowedDate: String, dueDate: String): BorrowedBook
    deleteAuthor(id: ID!): Author
    deleteBook(id: ID!): Book
    deleteLibrary(id: ID!): Library
    deleteClient(id: ID!): Client
    deleteBorrowedBook(id: ID!): BorrowedBook
  }
`;

export default definitions;

    // getAuthorId(name: String!): Author
    // getLibraryId(name: String!): Library
    // getClientId(name: String!): Client