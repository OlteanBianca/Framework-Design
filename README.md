# GraphQL Library Management

## Description

A GraphQL-based library management system that allows users to manage clients, books, authors, libraries, and borrowed books efficiently.

## Features

- **Client Management**: Add, update, and delete client information.
- **Book Management**: Manage books, including adding new books, updating details, and deleting entries.
- **Author Management**: Maintain author information and associate authors with books.
- **Library Management**: Manage libraries, including what books each of them contains.
- **Borrowed Book Management**: Track borrowed books, including due dates and client information.

## Technologies Used

- **GraphQL**: A query language for your API.
- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A web application framework for Node.js.
- **Apollo Server**: A GraphQL server library for Node.js.
- **React Apollo**: A GraphQL client for React.

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OlteanBianca/Framework-Design-Server.git
   ```

2. Start the development server:

   ```bash
   node src/index.js
   ```

3. Access the application in your web browser at `http://localhost:4000/graphql`.

## Usage

All the definitions for the schema can be found in `./Schema/Definitions.js`

GraphQL definition for an entity example:

```bash
type Book {
    id: ID!
    title: String!
    genre: String!
    author: Author
    library: Library
    totalCopies: Int!
    availableCopies: Int!
  }
```

GraphQL definition for the queries example:

```bash
type Query {
    authors: [Author]
    author(id: ID!): Author 
    books: [Book]
    book(id: ID!): Book
  }
```

GraphQL definition for the mutations(operations) example:
```bash
type Mutation {
    addAuthor(name: String!): Author
    updateAuthor(id: ID!, name: String!): Author
    updateLibrary(id: ID!, name: String!): Library
    deleteAuthor(id: ID!): Author
    deleteBook(id: ID!): Book
  }
```

## How to test the application

At the address `http://localhost:4000/graphql` the Apollo GraphQl Sandbox is opened. In this studio all queries and mutations can be run.

Query to view all the books:
```bash
query Books {
  books {
    id
    title
    genre
    author {
      id
      name
      books {
        id
        title
        genre
        totalCopies
        availableCopies
      }
    }
    library {
      id
      name
    }
    totalCopies
    availableCopies
  }
}
```