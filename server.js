
var express = require('express')
var bodyParser = require('body-parser')
var app = express()


app.use(bodyParser.urlencoded({ extended: false }))
    router.use(bodyParser.json())


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


const api = require('./server/routing/api')
app.use('/api',api);

var express = require('express')
const bodyparser = require('body-parser');
var app = express()





app.listen(3000)