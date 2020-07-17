var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var express = require('express');
var path = require('path');
var port = process.env.PORT;
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.sendfile("index.html");
});

io.on('connect', socket => {
  console.log('connect');
});

io.on("connection", function(socket) {
  socket.on("buzz", function(msg) {
    io.sockets.in(msg[0]).emit("buzz", msg[1]);
  });
  socket.on("unbuzz", function(msg) {
    io.sockets.in(msg[0]).emit("unbuzz", msg[1]);
  });
  socket.on("join-room", function(msg) {
    socket.join(msg);
  });
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server is started at http://:%s:%s", host, port);
});
