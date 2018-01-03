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
	},
	getchitgroups: function(req, res) {
		try {
			var myMongoMod = function(chits, ourCallBack){
				var finalArray = [];
				async.forEachLimit(chits, 1, function(chit, userCallback){

					// console.log(chit);

				    async.waterfall([
				        function(callback) {
				            db.branches.find({_id:new mongo.ObjectID(chit.branchid)},{branchname:1},function(err,result){
								callback(null, result[0].branchname);
							});
				        },
				        function(arg1, callback) {
				            db.chitids.find({_id:new mongo.ObjectID(chit.chituid)},{chitid:1},function(err, result){
				            	console.log(result[0]);
								callback(null, arg1, result[0].chitid);
							});
				        },
				        function(arg1, arg2, callback) {
				            chit.branch = arg1;
				            chit.chituniqid = arg2;
				            finalArray.push(chit);
				            callback(null, finalArray);
				        }
				    ], function (err, result) {
				        userCallback();
				        if(chits.length === result.length){
				        	ourCallBack(result);
				        }
				    });
				}, function(err){
				    console.log("User For Loop Completed");
				});
			}
			db.chits.find().toArray(function (err, chits) {
				if(err) res.json(utils.response("failure", {"errmsg": err}));

				console.log("4444" , chits);

				myMongoMod(chits, function(finallresult){
					res.json(utils.response("success", finallresult));
				});
			});
		} catch(err) {
			res.json(utils.response("failure", {"errmsg": err}));
		}
	}
};

module.exports = common;