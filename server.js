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
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var goodreads = require('goodreads');
var gr = new goodreads.client({ 
  'key': "sRdquosmKQPAD84gKb0qQ",
  'secret': "lnJccQqCjK2TPK2KH8iRuBszoesL6GQSeGOnHilbTA"
});

router.get("/", function(req, res){
  return gr.getShelves('1309879', function(json) {
    if (json) {
      var h1 = React.createElement("h1", null, "fucking why though");
      res.write(ReactDOMServer.renderToString(h1));
      res.write(JSON.stringify(json));
      return res.end();
    }
  });
});

router.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
