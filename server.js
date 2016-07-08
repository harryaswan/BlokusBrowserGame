var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var db_name = "blokus";

//provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/savelog', function(req, res) {
    var data = req.body.data;
    var gameID = req.body.game;
    MongoClient.connect(mongodb_connection_string, function(err, db) {
        var collection = db.collection('game_logs');
        collection.update({game: gameID}, {game: gameID, data: data}, {upsert: true});
        db.close();
        res.status(200).end();
    });
});

app.post('/loadlog', function(req, res) {
    var gameID = req.body.game;
    MongoClient.connect(mongodb_connection_string, function(err, db) {
        var collection = db.collection('game_logs');
        collection.find({game: gameID}).toArray(function(err, docs) {
            res.json(docs);
            db.close();
        });
    });
});

app.use(express.static('client/build'));

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


var server = app.listen(server_port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Blokus by BlokHeedz is Running on "+server_ip_address+":"+server_port);
});
