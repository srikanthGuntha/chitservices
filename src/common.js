var mongo = require('mongodb');
var async = require("async");
var db = require("../config/dbconfig").db;
var utils = require("../utils/response");

var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Chit = require('../models/chit');

var common = {
	getpopulatechits: function(req, res){
		Chit.find().populate('branch chitid').exec(function(err, result) {
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	}
};

module.exports = common;