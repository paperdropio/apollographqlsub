var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = express.Router();
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const port = 4000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  
  type UserStatus {
    isOnline: Boolean
    lastSeenOn: String
  }

  type User {
    id: Int, 
    email: String,
    status: UserStatus
    friends: [User]
  }

  type Query {
    getUserStatus(id: [Int]!): [UserStatus]
    getUser(id: Int!): User
  }

  type Mutation {
    updateUserStatus(id: Int!, isOnline: Boolean!): UserStatus
  }

  type Subscription {
    onUserStatusChange(id: Int!): UserStatus
    @aws_subscribe(mutations: ["updateUserStatus"])
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.use('/', router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
