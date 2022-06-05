const { ApolloServer } = require('apollo-server');//import apollo server
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
//const { link } = require('fs/promises');
const prisma = new PrismaClient()
const { getUserId } = require('./utils');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

//temp data

  // 1
  const resolvers = {
    Query,
    Mutation,
    User,
    Link,    
   
  }

// 3 create a server
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
  ////post(name:String!,age:Int!):student_info!
  //post(description:String!,url:!):Link!
  //https://graphql.org/graphql-js/mutations-and-input-types/