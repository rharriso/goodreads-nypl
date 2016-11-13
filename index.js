//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
var _ = require('lodash');
var path = require('path');
var express = require('express');
var server = express();
require('dotenv').config();
//const GOODREADS_EDIT_ACCOUNT_URL = 'https://www.goodreads.com/user/edit';

var goodreads = require('goodreads');
var gr = new goodreads.client({
  key: process.env.GOODREADS_KEY,
  secret: process.env.GOODREADS_SECRET
});


function processBookResponse(res, books) {
  if (!books) {
    return [];
  }

  var bookArr = books.map(function (b){
    var author = _.get(b, 'authors[0].author[0].name[0]');
    author = author || _.get(b, 'author[0].name[0]');
    var title = b.title[0];

    return {
      id: b.id[0]._,
      author: author,
      imageUrl: b.image_url[0],
      key: author + '-' + title.replace(' ', '-'),
      numPages: _.get(b, 'num_pages[0]'),
      title: title
    };
  });

  res.write(JSON.stringify({
    books: bookArr
  }));

  return res.end();
}


server.get('/showUser/:username', function (req, res) {
  return gr.showUser(req.params.username, function (json) {
    const userData = json.GoodreadsResponse.user[0];
    const resp = {
      id: userData.id[0],
      imageUrl: userData.image_url[0],
      name: userData.name[0],
      smallImageUrl: userData.small_image_url[0],
      username: userData.user_name[0]
    };

    res.write(JSON.stringify(resp));
    return res.end();
  });
});


server.get('/shelves/:userId', function (req, res){
  return gr.getShelves(req.params.userId, function (json) {
    var shelvesData = json.GoodreadsResponse.shelves[0].user_shelf.map(function (s){
      return {
        title: s.name[0],
        count: s.book_count[0],
        key: s.name[0]
      };
    });

    res.write(JSON.stringify(shelvesData));
    return res.end();
  });
});


server.get('/shelf/:shelfName', function (req,  res){
  return gr.getSingleShelf({
    userID: req.query.userId,
    shelf: req.params.shelfName,
    perPage: 20,
    order: req.query.sortDir || 'a',
    page: req.query.page || 1,
    sort: req.query.sortProp || 'position'

  }, function (json) {
    const books = _.get(json, 'GoodreadsResponse.books[0].book');
    return processBookResponse(res, books);
  });
});

server.get('/search', function (req,  res){
  return gr.searchBooks(req.query.q, function (json) {
    const books = _.get(json, 'GoodreadsResponse.search[0].results[0].work', []).map(function(result){
      return result.best_book[0];
    });
    return processBookResponse(res, books);
  });
});

server.use('/', express.static(path.resolve(__dirname, 'client/index.html')));
server.use(express.static(path.resolve(__dirname, 'client')));

server.configure(function (){
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function (){
  console.log('Goodreads NYPL server listening at', server.address + ':' + server.port);
});
