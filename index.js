//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
var path = require('path');
var express = require('express');
var server = express();
require('dotenv').config();
const GOODREADS_EDIT_ACCOUNT_URL = 'https://www.goodreads.com/user/edit';

var goodreads = require('goodreads');
var gr = new goodreads.client({
  'key': process.env.GOODREADS_KEY,
  'secret': process.env.GOODREADS_SECRET
});

server.get('/showUser/:username', function (req, res) {
  return gr.showUser(req.params.userName, function(json) {
    res.write(JSON.stringify(json));
    return res.end();
  });
});

server.get('/shelves/:userId', function(req, res){
  return gr.getShelves(req.params.userId, function(json) {
    var shelvesData = json.GoodreadsResponse.shelves[0].user_shelf.map(function(s){
      return {
        title: s.name[0],
        count: s.book_count[0],
        key: s.id[0]._
      };
    });

    res.write(JSON.stringify(shelvesData));
    return res.end();
  });
});


server.get('/shelf/:shelfName', function(req,  res){
  return gr.getSingleShelf({
    userID: '1309879',
    shelf: req.params.shelfName,
    per_page: 20,
    order: req.query.sortDir || 'a',
    page: req.query.page || 1,
    sort: req.query.sortProp || 'position'

  }, function(json) {
    var bookArr = json.GoodreadsResponse.books[0].book.map(function(b){
      var author = b.authors[0].author[0].name[0];
      var title = b.title[0];

      return {
        author: author,
        imageUrl: b.image_url[0],
        key: author+'-'+title.replace(' ', '-'),
        numPages: b.num_pages[0],
        title: title
      };
    });

    res.write(JSON.stringify({
      raw: json.GoodreadsResponse,
      books: bookArr
    }));

    return res.end();
  });
});

server.use('/', express.static(path.resolve(__dirname, 'client/index.html')));
server.use(express.static(path.resolve(__dirname, 'client')));

server.configure(function(){
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
  console.log('Goodreads NYPL server listening at', server.address + ':' + server.port);
});
