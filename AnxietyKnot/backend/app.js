// express app (node.js app taking advtange of express framework)
// tool we want to use for creating routes

// imports
const express = require('express');
// parses incoming request bodies and extracts the stream of data
const bodyParser = require('body-parser');
const Post = require('./models/post')
const mongoose = require('mongoose');

// creating express app
const app = express();

mongoose.connect("mongodb+srv://hornunjb:UnOQUPwiXXaCz90a@cluster0.ltjdk.mongodb.net/AnxietyKnot?retryWrites=true&w=majority")
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

// bodyParser is depracted, might want to find another solution down the road (still works)
// parses our request body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* 'use' uses middleware on incoming request - takes a function that takes a request and response
  along with 'next' which allows a request to continue its journey if you are using the response
  for somewhere else - without 'next' the request will not reach any other middlewares */

// since our hosts are on different ports and want to communicate we need to set headers to avoid a CORS error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// handle incoming post requests, passing a path argument all requests that target localhost:3000/api/posts will reach this middleware
app.post("/api/posts", (req, res, next) => {
  // using body parser we can access the 'body' field
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    // return data in a json format showing it was a sucesss with status code 201
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

// handle incoming get requests, passing a path argument, all requests that target localhost:3000/api/posts will reach this middleware
app.get('/api/posts',(req, res, next) => {
  Post.find().then(documents => {
    // return data in a json format showing it was a sucesss with status code 200
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
});

// export our express app along with its middlewares
module.exports = app;
