var utils = require("../utils/response");
var mongoose = require('mongoose');
mongoose.connect("mongodb://dbchits:dbchits123@ds135196.mlab.com:35196/dbchits", {
	useMongoClient: true
});

var Branch = require('../models/branch');

var branches = {
	getbranches: function(req, res) {
		Branch.find({userid: req.sessionuid}, function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	savebranches: function(req, res){
		var branch = new Branch({
	        branchname: req.body.branchname,
	        userid: req.sessionuid
	    });

		branch.save(function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	updatebranches: function(req, res){
		let branch = req.body;
		let branchid = req.actionid;

		delete branch._id;

		Branch.update({ _id: branchid }, { $set: branch}, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	},
	deletebranches: function(req, res){
		let branchid = req.actionid;
		
		Branch.findOneAndRemove({ _id: branchid }, function(err, result){
			if(err) res.json(utils.response("failure", {"errmsg": err}));
			res.json(utils.response("success", result));
		});
	},
	getonebranch: function(req, res) {
		let uniquebranchid = req.body.id;
		Branches.find({_id: uniquebranchid, userid: req.sessionuid}, function(err, result){
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	},
	getpopulatebranches: function(req, res){
		Branch.find({userid: req.sessionuid}).populate('userid', "firstname").exec(function(err, result) {
			console.log("errr ", err);
			console.log('Story title: ', result);
			if (err) res.json(utils.response("failure", { "errmsg": err }));

			res.json(utils.response("success", result));
		});
	}
}

module.exports = branches;