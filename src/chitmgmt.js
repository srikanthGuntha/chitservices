var db = require("../config/dbconfig").db;
var utils = require("../utils/response");
var mongo = require('mongodb');
var utils = require("../utils/response");

var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var ChitMgmtModel = require('../models/chitmgmtmodel');

var chitsmgmt = {
	getmanagementchits: function(req, res) {
		ChitMgmtModel.find({userid: mongoose.Types.ObjectId(req.sessionuid)}, function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	savemanagementchits: function(req, res){
		var chitmgmt = new ChitMgmtModel({
	        chitid: req.body.chitid,
	        userid: mongoose.Types.ObjectId(req.sessionuid)
	    });

		chitmgmt.save(function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	}
}

module.exports = chitsmgmt;