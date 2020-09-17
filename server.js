const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const {graphqlHTTP} = require('express-graphql');
const {GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull} = require('graphql')
const data = require('./data')

const BookType = new GraphQLObjectType({
    name:'Book',
    description:'Ceci represente ' +
        'un livre ecrit par un auteur',
    fields:() => ({
        id:{type:GraphQLNonNull(GraphQLInt)},
        titre:{type:GraphQLNonNull(GraphQLString)},
        authorId:{type:GraphQLNonNull(GraphQLInt)},
        author:{
            type:AuthorType,
            resolve:(book) => {
                return data.authors.find(a => a.id === book.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    description:'Ceci represente un auteur et ces livres',
    fields:() => ({
        id:{type:GraphQLNonNull(GraphQLInt)},
        name:{type:GraphQLNonNull(GraphQLString)},
        books:{
            type:GraphQLList(BookType),
            resolve:(author)=>{
                return data.books.filter(b => b.authorId === author.id)
            }
        },
    })
});

const RootQueryType =
    new GraphQLObjectType({
    name:'Query',
    description:'Root Query',
    fields:() => ({
        books:{
            type:GraphQLList(BookType),
            description:'La liste des livres',
            resolve:() => data.books
        },
        authors:{
            type:GraphQLList(AuthorType),
            description:'La liste des auteurs',
            resolve:() => data.authors
        },
        book:{
            type:BookType,
            description:'A single Book',
            args:{
                id:{type:GraphQLNonNull(GraphQLInt)}
            },
            resolve:(source,args)=>
                data.books.find(b => b.id === args.id)
        },
        author:{
            type:AuthorType,
            description:'A single author',
            args:{
                id:{type:GraphQLNonNull(GraphQLInt)}
            },
            resolve:(source,args)=>data.authors.find(a => a.id === args.id)
        }
    })
});

const RootMutationType = new GraphQLObjectType({
   name:'Mutation',
   description:'Root Mutation',
   fields:() => ({
       addBook:{
           type:BookType,
           description:'Add a Book',
           args:{
               titre:{type:GraphQLNonNull(GraphQLString)},
               name:{type:GraphQLNonNull(GraphQLString)}
           },
           resolve:(source,args)=>{
               let idAuthor = 0;
               const isAuthor = data.authors.find(a => a.name === args.name);
               if(isAuthor === undefined){
                   const author = {id:data.authors.length + 1,name:args.name}
                   data.authors.push(author);
                   idAuthor = author.id;
               }
               else
               {
                   idAuthor = isAuthor.id;
               }
               const book = {id:data.books.length + 1, titre:args.titre,authorId:idAuthor};
               data.books.push(book);
               return book;
           }
       },
       addAuthor:{
           type:AuthorType,
           description:'Add a Author',
           args:{
               name:{type:GraphQLNonNull(GraphQLString)}
           },
           resolve:(source,args)=>{
               const author = {id:data.authors.length + 1,name:args.name};
               const findAuthor = data.authors.find(a => a.name === args.name);
               if(findAuthor === undefined){
                   data.authors.push(author);
                   return author
               }
               else {
                   return findAuthor;
               }
           }
       }
   })
});

const schema = new GraphQLSchema({
    query:RootQueryType,
    mutation:RootMutationType
})
app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema:schema
}))

app.listen(port,()=>{
    console.log(`Listen at http://localhost:${port}`)
});
