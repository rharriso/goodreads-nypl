//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
var http = require('http');
var path = require('path');
var async = require('async');
var express = require('express');
var router = express();
var server = http.createServer(router);
require('dotenv').config();

var goodreads = require('goodreads');
var gr = new goodreads.client({ 
  'key': process.env.GOODREADS_KEY,
  'secret': process.env.GOODREADS_SECRET
});


router.get("/shelves", function(req, res){
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


router.get("/shelf/:shelfName", function(req,  res){
	console.log(req.query.page);
	return gr.getSingleShelf({
		userID: '1309879',
		shelf: req.params.shelfName,
		per_page: 20,
		page: req.query.page || 1
		
	}, function(json) { 
    res.write(JSON.stringify(json));
    return res.end();
  });
});

router.use("/", express.static(path.resolve(__dirname, "client/index.html")));
router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Goodreads NYPL server listening at", addr.address + ":" + addr.port);
});
