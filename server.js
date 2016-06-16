var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017";

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/', function(req, res) {
    var user = req.body.user;
    console.log('user', user);
    // MongoClient.connect(url, function(err, db) {
    //     var collection = db.collection('bucket_list');
    //     collection.find({user: user}).toArray(function(err, docs) {
    //         res.json(docs);
    //         db.close();
    //     });
    // });
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at %s', "http://localhost:3000");
});
