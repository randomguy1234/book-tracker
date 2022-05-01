const {gql}= require('apollo-server-express');

const typeDefs= gql`
# grqphql version of user model
type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

# grqphql version of book model
type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
}

# unsure of how to create auth type
type Auth {
    token: ID!
    user: User
}

# query and mutation is below
type Query {
    me(username:String!): User
    users: [User]
}
`;




module.exports= typeDefs;

/**
 * type Mutation {
    login
    addUser
    saveBook
    removeBook
}
 */