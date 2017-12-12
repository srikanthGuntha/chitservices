var mongojs = require('mongojs');
var connectionString = "mongodb://127.0.0.1:27017/";
var database = "dbchits";
var collections = ["users", "stockentries"];

var restDbConnStr = "mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits";

module.exports = {
  db: mongojs(restDbConnStr , collections)
};