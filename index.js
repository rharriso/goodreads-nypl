//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');
var server = express();
require('dotenv').config();

debugger

var goodreads = require('goodreads');
var gr = new goodreads.client({ 
  'key': process.env.GOODREADS_KEY,
  'secret': process.env.GOODREADS_SECRET
});


server.get("/shelves", function(req, res){
  return gr.getShelves('1309879', function(json) {
    var shelvesData = json.GoodreadsResponse.shelves[0].user_shelf.map(function(s){
      return {
        title: s.name[0],
        count: s.book_count[0],
        key: s.id[0]._
      };	
    })	

    res.write(JSON.stringify(shelvesData));
    return res.end();
  });
});


server.get("/shelf/:shelfName", function(req,  res){
  return gr.getSingleShelf({
    userID: '1309879',
    shelf: req.params.shelfName,
    per_page: 200,
    page: req.query.page || 1

  }, function(json) { 
    var bookArr = json.GoodreadsResponse.books[0].book.map(function(b){
      var author = b.authors[0].author[0].name[0]; 
      var title = b.title[0];

      return {
        title: title,
        author: author,
        key: author+"-"+title.replace(" ", "-")
      };
    });
    res.write(JSON.stringify({
      books: bookArr
    }));
    return res.end();
  });
});

server.use("/", express.static(path.resolve(__dirname, "client/index.html")));
server.use(express.static(path.resolve(__dirname, 'client')));

server.configure(function(){
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Goodreads NYPL server listening at", server.address + ":" + server.port);
});
