var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Chitids = require('../models/chitid');

var branches = {
	getchitids: function(req, res) {
		Chitids.find({userid: req.sessionuid}, function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	getpopulate: function(req, res){
		Chitids.find({userid: req.sessionuid}).populate('userid branch').exec(function(err, result) {
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	savechitids: function(req, res){
		var chitidsdata = new Chitids({
	        chitid: req.body.chitid,
	        branch: req.body.branch,
	        userid: req.sessionuid
	    });

		chitidsdata.save(function(err, result){
			console.log("err", err);
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	updatechitids: function(req, res){
		let chitiddata = req.body;
		let chitid = req.actionid;

		delete chitiddata._id;

		Chitids.update({ _id: chitid }, { $set: chitiddata}, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	},
	deletechitids: function(req, res){
		let chitid = req.actionid;
		
		Chitids.findOneAndRemove({ _id: chitid }, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	}
}

module.exports = branches;